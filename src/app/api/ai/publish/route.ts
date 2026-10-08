import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitizePlainText, sanitizeRichText, sanitizeSlug } from '@/lib/sanitize';
import {
  checkDuplicateSlug,
  getGameBySlug,
  getGameById,
  getAuthorBySlug,
  getNewsBySlug,
  getNewsById,
  insertNewsItem,
  updateNewsItem,
  getGuideBySlug,
  getGuideById,
  insertGuide,
  updateGuide,
  insertGame,
  updateGame,
  getCharacterBySlug,
  getCharacterById,
  insertCharacter,
  updateCharacter,
  getItemBySlug,
  getItemById,
  insertItem,
  updateItem,
  getRedeemCodes,
  getRedeemCodeById,
  insertRedeemCode,
  updateRedeemCode,
  getEventBySlug,
  getEventById,
  insertEventItem,
  updateEventItem,
  getTierListBySlug,
  insertTierList,
  updateTierList,
} from '@/lib/db';
import { ContentStatus } from '@/lib/types';

// =============================================================================
// Security & Schema Constraints
// =============================================================================

const ALLOWED_ROOT_KEYS = new Set([
  'type',
  'operation',
  'id',
  'title',
  'name',
  'slug',
  'excerpt',
  'content',
  'description',
  'imageUrl',
  'image_url',
  'image',
  'thumbnail',
  'coverImage',
  'cover_image',
  'bannerUrl',
  'banner_url',
  'bannerImage',
  'banner_image',
  'portrait',
  'fullImage',
  'full_image',
  'icon',
  'gameSlug',
  'game_slug',
  'game_id',
  'authorSlug',
  'author_slug',
  'author_id',
  'author',
  'status',
  'publishedAt',
  'published_at',
  'category',
  'tags',
  'difficulty',
  'reading_time',
  'metaTitle',
  'meta_title',
  'metaDescription',
  'meta_description',
  'no_index',
  // Games
  'developer',
  'publisher',
  'releaseDate',
  'release_date',
  'platforms',
  'genres',
  'rating',
  'officialUrl',
  'official_url',
  // Characters
  'role',
  'element',
  'weapon',
  'rarity',
  'skills',
  'talents',
  'recommendedBuild',
  'recommended_build',
  'recommendedWeapons',
  'recommended_weapons',
  'recommendedTeam',
  'recommended_team',
  'materials',
  // Items
  'type_detail',
  'stats',
  'howToGet',
  'how_to_get',
  // Redeem Codes
  'code',
  'reward',
  'expiredAt',
  'expired_at',
  'source',
  // Events
  'startDate',
  'start_date',
  'endDate',
  'end_date',
  'rewards',
  // Tier Lists
  'version',
  'tiers',
]);

const TYPE_MAP: Record<string, 'games' | 'news' | 'guides' | 'characters' | 'items' | 'redeem-codes' | 'events' | 'tier-lists'> = {
  game: 'games',
  games: 'games',
  news: 'news',
  guide: 'guides',
  guides: 'guides',
  character: 'characters',
  characters: 'characters',
  item: 'items',
  items: 'items',
  'redeem-code': 'redeem-codes',
  'redeem-codes': 'redeem-codes',
  redeem_codes: 'redeem-codes',
  code: 'redeem-codes',
  event: 'events',
  events: 'events',
  'tier-list': 'tier-lists',
  'tier-lists': 'tier-lists',
  tier_lists: 'tier-lists',
};

// =============================================================================
// Helper: Audit Logger
// =============================================================================

function logAudit(entry: {
  timestamp: string;
  operation?: string;
  type?: string;
  slug?: string;
  status: 'SUCCESS' | 'FAILURE';
  reason?: string;
  ip?: string;
}) {
  const parts = [
    `[AI_PUBLISH_AUDIT]`,
    entry.timestamp,
    `op=${entry.operation || 'UNKNOWN'}`,
    `type=${entry.type || 'unknown'}`,
    `slug=${entry.slug || 'none'}`,
    `status=${entry.status}`,
    entry.ip ? `ip=${entry.ip}` : '',
    entry.reason ? `info="${entry.reason.replace(/"/g, "'")}"` : '',
  ].filter(Boolean);
  console.log(parts.join(' | '));
}

// =============================================================================
// Helper: Authentication
// =============================================================================

function authenticateRequest(request: Request): { ok: boolean; status?: number; error?: string } {
  const expectedToken = process.env.AI_CONTENT_PUBLISH_TOKEN;
  if (!expectedToken || expectedToken.trim().length === 0) {
    return {
      ok: false,
      status: 401,
      error: 'Unauthorized: AI_CONTENT_PUBLISH_TOKEN is not configured on the server',
    };
  }

  const authHeader = request.headers.get('authorization');
  let providedToken: string | undefined;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    providedToken = authHeader.slice(7).trim();
  } else {
    providedToken = request.headers.get('x-ai-publish-token')?.trim();
  }

  if (!providedToken) {
    return {
      ok: false,
      status: 401,
      error: 'Unauthorized: Missing authentication token. Provide Bearer token or x-ai-publish-token header',
    };
  }

  // Constant-time comparison to prevent timing attacks
  const bufExpected = Buffer.from(expectedToken);
  const bufProvided = Buffer.from(providedToken);
  if (bufExpected.length !== bufProvided.length || !crypto.timingSafeEqual(bufExpected, bufProvided)) {
    return {
      ok: false,
      status: 401,
      error: 'Unauthorized: Invalid authentication token',
    };
  }

  return { ok: true };
}

// =============================================================================
// Helper: Cache Revalidation
// =============================================================================

function triggerRevalidation(type: string, slug: string, gameSlug?: string): string[] {
  const paths: string[] = ['/', '/sitemap.xml'];

  switch (type) {
    case 'news':
      paths.push('/news', `/news/${slug}`);
      if (gameSlug) paths.push(`/games/${gameSlug}/news`);
      break;
    case 'guides':
      paths.push('/guides', `/guides/${slug}`);
      if (gameSlug) paths.push(`/games/${gameSlug}/guides`);
      break;
    case 'games':
      paths.push('/games', `/games/${slug}`);
      break;
    case 'characters':
      paths.push('/characters');
      if (gameSlug) {
        paths.push(`/games/${gameSlug}/characters`, `/games/${gameSlug}/characters/${slug}`);
      }
      break;
    case 'items':
      paths.push('/items');
      if (gameSlug) {
        paths.push(`/games/${gameSlug}/items`, `/games/${gameSlug}/items/${slug}`);
      }
      break;
    case 'redeem-codes':
      paths.push('/redeem-codes');
      if (gameSlug) paths.push(`/games/${gameSlug}/redeem-codes`);
      break;
    case 'events':
      paths.push('/events');
      if (gameSlug) paths.push(`/games/${gameSlug}/events`);
      break;
    case 'tier-lists':
      paths.push('/tier-list', `/tier-list/${slug}`);
      if (gameSlug) paths.push(`/games/${gameSlug}/tier-list`);
      break;
  }

  const triggered: string[] = [];
  for (const path of paths) {
    try {
      revalidatePath(path);
      triggered.push(path);
    } catch {
      // Revalidation may fail silently in mock/test environments
    }
  }
  return triggered;
}

// =============================================================================
// Helper: Status Normalizer
// =============================================================================

function normalizeContentStatus(rawStatus?: string): ContentStatus {
  const upper = (rawStatus || 'PUBLISHED').toUpperCase();
  if (upper === 'DRAFT' || upper === 'REVIEW' || upper === 'ARCHIVED') {
    return upper as ContentStatus;
  }
  return 'PUBLISHED';
}

// =============================================================================
// HTTP Handlers for Disallowed Methods (Enforcing DELETE is Not Available)
// =============================================================================

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method GET not allowed. Use POST /api/ai/publish' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'DELETE operation is strictly forbidden on this endpoint' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method PUT not allowed. Use POST /api/ai/publish with operation="UPDATE"' },
    { status: 405 }
  );
}

// =============================================================================
// Primary Endpoint: POST /api/ai/publish
// =============================================================================

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();
  const ip = getClientIp(request);

  // 1. Rate Limiting Check
  const rateLimit = checkRateLimit(`ai-publish:${ip}`, 60, 60_000);
  if (!rateLimit.allowed) {
    logAudit({
      timestamp,
      status: 'FAILURE',
      reason: `Rate limit exceeded. Reset in ${rateLimit.resetInSeconds}s`,
      ip,
    });
    return NextResponse.json(
      { success: false, error: `Rate limit exceeded. Silakan coba kembali dalam ${rateLimit.resetInSeconds} detik.` },
      { status: 429 }
    );
  }

  // 2. Authentication Check
  const auth = authenticateRequest(request);
  if (!auth.ok) {
    logAudit({
      timestamp,
      status: 'FAILURE',
      reason: auth.error,
      ip,
    });
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status || 401 });
  }

  // 3. Body Parsing
  let body: Record<string, any>;
  try {
    body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new Error('Body must be a valid JSON object');
    }
  } catch (err: any) {
    logAudit({
      timestamp,
      status: 'FAILURE',
      reason: `Invalid JSON payload: ${err.message}`,
      ip,
    });
    return NextResponse.json({ success: false, error: 'Payload tidak valid: JSON malformed' }, { status: 400 });
  }

  // 4. Strict Rejection of Unknown Fields
  const unknownFields = Object.keys(body).filter((key) => !ALLOWED_ROOT_KEYS.has(key));
  if (unknownFields.length > 0) {
    logAudit({
      timestamp,
      status: 'FAILURE',
      reason: `Rejected unknown field(s): ${unknownFields.join(', ')}`,
      ip,
    });
    return NextResponse.json(
      { success: false, error: `Field tidak dikenal: ${unknownFields.join(', ')}` },
      { status: 400 }
    );
  }

  // 5. Operation Validation & Strict Ban on DELETE
  const rawOperation = (body.operation || 'CREATE').toString().trim().toUpperCase();
  if (rawOperation === 'DELETE') {
    logAudit({
      timestamp,
      operation: 'DELETE',
      type: body.type,
      status: 'FAILURE',
      reason: 'DELETE operation requested but strictly forbidden',
      ip,
    });
    return NextResponse.json(
      { success: false, error: 'DELETE operation is strictly forbidden on this endpoint' },
      { status: 405 }
    );
  }

  if (rawOperation !== 'CREATE' && rawOperation !== 'UPDATE') {
    logAudit({
      timestamp,
      operation: rawOperation,
      type: body.type,
      status: 'FAILURE',
      reason: `Invalid operation: ${rawOperation}`,
      ip,
    });
    return NextResponse.json(
      { success: false, error: `Operasi "${rawOperation}" tidak didukung. Hanya CREATE dan UPDATE yang diizinkan.` },
      { status: 400 }
    );
  }
  const operation: 'CREATE' | 'UPDATE' = rawOperation;

  // 6. Content Type Validation
  const rawType = (body.type || '').toString().trim().toLowerCase();
  const canonicalType = TYPE_MAP[rawType];
  if (!canonicalType) {
    logAudit({
      timestamp,
      operation,
      type: rawType,
      status: 'FAILURE',
      reason: `Unsupported content type: ${rawType}`,
      ip,
    });
    return NextResponse.json(
      {
        success: false,
        error: `Tipe konten "${body.type}" tidak didukung. Tipe yang didukung: games, news, guides, characters, items, redeem-codes, events, tier-lists.`,
      },
      { status: 400 }
    );
  }

  // 7. Slug Extraction & Sanitization
  const rawTitleOrName = body.title || body.name || body.code || '';
  const rawSlugCandidate = body.slug || rawTitleOrName;
  const slug = sanitizeSlug(String(rawSlugCandidate || ''));

  if (!slug || slug.length < 2) {
    logAudit({
      timestamp,
      operation,
      type: canonicalType,
      status: 'FAILURE',
      reason: 'Invalid slug',
      ip,
    });
    return NextResponse.json({ success: false, error: 'Slug tidak valid atau terlalu pendek (minimal 2 karakter)' }, { status: 400 });
  }

  // 8. Game Relation Validation
  const gameSlugInput = body.gameSlug || body.game_slug;
  let resolvedGameId: string | undefined = body.game_id ? sanitizePlainText(String(body.game_id), 60) : undefined;
  let resolvedGameSlug: string | undefined = undefined;

  if (gameSlugInput) {
    const sanitizedGameSlug = sanitizeSlug(String(gameSlugInput));
    const foundGame = await getGameBySlug(sanitizedGameSlug);
    if (!foundGame) {
      logAudit({
        timestamp,
        operation,
        type: canonicalType,
        slug,
        status: 'FAILURE',
        reason: `Game relation not found: ${gameSlugInput}`,
        ip,
      });
      return NextResponse.json(
        { success: false, error: `Game relation invalid: Game dengan slug "${gameSlugInput}" tidak ditemukan` },
        { status: 400 }
      );
    }
    resolvedGameId = foundGame.id;
    resolvedGameSlug = foundGame.slug;
  } else if (resolvedGameId) {
    const foundGame = await getGameById(resolvedGameId);
    if (foundGame) {
      resolvedGameSlug = foundGame.slug;
    }
  }

  // Types where game relation is strictly required for CREATE
  const REQUIRES_GAME_RELATION = ['guides', 'characters', 'items', 'redeem-codes', 'events', 'tier-lists'];
  if (operation === 'CREATE' && REQUIRES_GAME_RELATION.includes(canonicalType) && !resolvedGameId) {
    logAudit({
      timestamp,
      operation,
      type: canonicalType,
      slug,
      status: 'FAILURE',
      reason: 'Missing gameSlug relation',
      ip,
    });
    return NextResponse.json(
      { success: false, error: `gameSlug wajib disertakan untuk konten bertipe ${canonicalType}` },
      { status: 400 }
    );
  }

  // 9. Author Relation Validation
  const authorSlugInput = body.authorSlug || body.author_slug;
  let resolvedAuthorId: string | undefined = body.author_id ? sanitizePlainText(String(body.author_id), 60) : undefined;
  let resolvedAuthorName: string | undefined = body.author ? sanitizePlainText(String(body.author), 100) : undefined;
  let resolvedAuthorSlug: string | undefined = undefined;

  if (authorSlugInput) {
    const sanitizedAuthorSlug = sanitizeSlug(String(authorSlugInput));
    const foundAuthor = await getAuthorBySlug(sanitizedAuthorSlug);
    if (!foundAuthor) {
      logAudit({
        timestamp,
        operation,
        type: canonicalType,
        slug,
        status: 'FAILURE',
        reason: `Author relation not found: ${authorSlugInput}`,
        ip,
      });
      return NextResponse.json(
        { success: false, error: `Author relation invalid: Author dengan slug "${authorSlugInput}" tidak ditemukan` },
        { status: 400 }
      );
    }
    resolvedAuthorId = foundAuthor.id;
    resolvedAuthorName = foundAuthor.name;
    resolvedAuthorSlug = foundAuthor.slug;
  } else {
    resolvedAuthorId = resolvedAuthorId || 'author-seraphi-editorial';
    resolvedAuthorName = resolvedAuthorName || 'Tim Editorial Seraphi';
    resolvedAuthorSlug = 'seraphi-editorial';
  }

  // 10. Duplicate Slug Check on CREATE
  const TABLE_BY_TYPE: Record<string, 'games' | 'characters' | 'guides' | 'news' | 'items' | 'events' | 'tier_lists'> = {
    games: 'games',
    characters: 'characters',
    guides: 'guides',
    news: 'news',
    items: 'items',
    events: 'events',
    'tier-lists': 'tier_lists',
  };

  const targetTable = TABLE_BY_TYPE[canonicalType];
  if (operation === 'CREATE' && targetTable) {
    const isDuplicate = await checkDuplicateSlug(targetTable, slug);
    if (isDuplicate) {
      logAudit({
        timestamp,
        operation,
        type: canonicalType,
        slug,
        status: 'FAILURE',
        reason: `Duplicate slug "${slug}" in table ${targetTable}`,
        ip,
      });
      return NextResponse.json(
        { success: false, error: `Duplicate slug: Konten dengan slug "${slug}" sudah ada di database.` },
        { status: 409 }
      );
    }
  }

  // ===========================================================================
  // 11. Execute CREATE / UPDATE Dispatch
  // ===========================================================================
  try {
    let resultId = '';
    let resultPublished = true;

    if (canonicalType === 'news') {
      if (operation === 'CREATE') {
        const title = sanitizePlainText(body.title || '', 200);
        const content = sanitizeRichText(body.content || '', 50000);
        if (!title || title.length < 5) {
          return NextResponse.json({ success: false, error: 'Judul berita minimal 5 karakter' }, { status: 400 });
        }
        if (!content || content.length < 20) {
          return NextResponse.json({ success: false, error: 'Konten berita minimal 20 karakter' }, { status: 400 });
        }

        const excerpt = sanitizePlainText(body.excerpt || title, 400);
        const thumbnail = sanitizePlainText(
          body.imageUrl || body.image_url || body.thumbnail || body.coverImage || body.cover_image || '/images/placeholder-news.svg',
          500
        );
        const status = normalizeContentStatus(body.status);
        resultPublished = status === 'PUBLISHED';
        const category = sanitizePlainText(body.category || 'Update', 50);
        const tags = Array.isArray(body.tags)
          ? body.tags.map((t: any) => sanitizePlainText(String(t), 30)).filter(Boolean)
          : ['News', category];
        const publishedAt = body.publishedAt || body.published_at || new Date().toISOString();

        const id = `news-${slug}-${Date.now().toString(36)}`;
        const inserted = await insertNewsItem({
          id,
          game_id: resolvedGameId || null,
          title,
          slug,
          excerpt,
          content,
          category,
          thumbnail,
          author: resolvedAuthorName,
          author_id: resolvedAuthorId,
          author_slug: resolvedAuthorSlug,
          published_at: publishedAt,
          status,
          tags,
          meta_title: body.metaTitle ? sanitizePlainText(String(body.metaTitle), 200) : undefined,
          meta_description: body.metaDescription ? sanitizePlainText(String(body.metaDescription), 400) : undefined,
        });
        resultId = inserted.id;
      } else {
        const existing = (await getNewsBySlug(slug)) || (body.id ? await getNewsById(body.id) : null);
        if (!existing) {
          return NextResponse.json({ success: false, error: `News dengan slug "${slug}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const title = body.title ? sanitizePlainText(body.title, 200) : existing.title;
        const content = body.content ? sanitizeRichText(body.content, 50000) : existing.content;
        const excerpt = body.excerpt ? sanitizePlainText(body.excerpt, 400) : existing.excerpt;
        const thumbnail = (body.imageUrl || body.image_url || body.thumbnail || body.coverImage || body.cover_image)
          ? sanitizePlainText(body.imageUrl || body.image_url || body.thumbnail || body.coverImage || body.cover_image, 500)
          : existing.thumbnail;
        const status = body.status ? normalizeContentStatus(body.status) : existing.status;
        resultPublished = status === 'PUBLISHED';
        const category = body.category ? sanitizePlainText(body.category, 50) : existing.category;
        const tags = Array.isArray(body.tags)
          ? body.tags.map((t: any) => sanitizePlainText(String(t), 30)).filter(Boolean)
          : existing.tags;

        await updateNewsItem(existing.id, {
          title,
          slug,
          excerpt,
          content,
          category,
          thumbnail,
          status,
          tags,
          game_id: resolvedGameId || existing.game_id || null,
          author: resolvedAuthorName || existing.author,
          author_id: resolvedAuthorId || existing.author_id,
          author_slug: resolvedAuthorSlug || existing.author_slug,
        });
        resultId = existing.id;
      }
    } else if (canonicalType === 'guides') {
      if (operation === 'CREATE') {
        const title = sanitizePlainText(body.title || '', 200);
        const content = sanitizeRichText(body.content || '', 50000);
        if (!title || title.length < 5) {
          return NextResponse.json({ success: false, error: 'Judul guide minimal 5 karakter' }, { status: 400 });
        }
        if (!content || content.length < 20) {
          return NextResponse.json({ success: false, error: 'Konten guide minimal 20 karakter' }, { status: 400 });
        }

        const excerpt = sanitizePlainText(body.excerpt || title, 400);
        const thumbnail = sanitizePlainText(
          body.imageUrl || body.image_url || body.thumbnail || body.coverImage || body.cover_image || '/images/placeholder-guide.svg',
          500
        );
        const status = normalizeContentStatus(body.status);
        resultPublished = status === 'PUBLISHED';
        const category = sanitizePlainText(body.category || 'Build', 50);
        const difficulty = sanitizePlainText(body.difficulty || 'Menengah', 50);
        const readingTime = Number(body.reading_time || Math.max(2, Math.ceil(content.split(/\s+/).length / 180)));
        const tags = Array.isArray(body.tags)
          ? body.tags.map((t: any) => sanitizePlainText(String(t), 30)).filter(Boolean)
          : ['Guide', category];

        const id = `guide-${slug}-${Date.now().toString(36)}`;
        const inserted = await insertGuide({
          id,
          game_id: resolvedGameId!,
          title,
          slug,
          category,
          excerpt,
          content,
          thumbnail,
          author: resolvedAuthorName,
          author_id: resolvedAuthorId,
          author_slug: resolvedAuthorSlug,
          difficulty,
          reading_time: readingTime,
          published_at: body.publishedAt || body.published_at || new Date().toISOString(),
          status,
          tags,
          meta_title: body.metaTitle ? sanitizePlainText(String(body.metaTitle), 200) : undefined,
          meta_description: body.metaDescription ? sanitizePlainText(String(body.metaDescription), 400) : undefined,
        });
        resultId = inserted.id;
      } else {
        const existing = (await getGuideBySlug(slug)) || (body.id ? await getGuideById(body.id) : null);
        if (!existing) {
          return NextResponse.json({ success: false, error: `Guide dengan slug "${slug}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const title = body.title ? sanitizePlainText(body.title, 200) : existing.title;
        const content = body.content ? sanitizeRichText(body.content, 50000) : existing.content;
        const excerpt = body.excerpt ? sanitizePlainText(body.excerpt, 400) : existing.excerpt;
        const thumbnail = (body.imageUrl || body.image_url || body.thumbnail || body.coverImage || body.cover_image)
          ? sanitizePlainText(body.imageUrl || body.image_url || body.thumbnail || body.coverImage || body.cover_image, 500)
          : (existing.thumbnail || existing.featured_image || '');
        const status = body.status ? normalizeContentStatus(body.status) : existing.status;
        resultPublished = status === 'PUBLISHED';
        const category = body.category ? sanitizePlainText(body.category, 50) : existing.category;
        const difficulty = body.difficulty ? sanitizePlainText(body.difficulty, 50) : (existing.difficulty || 'Menengah');
        const readingTime = Number(body.reading_time || existing.reading_time || Math.max(2, Math.ceil(content.split(/\s+/).length / 180)));
        const tags = Array.isArray(body.tags)
          ? body.tags.map((t: any) => sanitizePlainText(String(t), 30)).filter(Boolean)
          : (existing.tags || ['Guide']);

        await updateGuide(existing.id, {
          title,
          slug,
          category,
          excerpt,
          content,
          thumbnail,
          status,
          tags,
          difficulty,
          reading_time: readingTime,
          game_id: resolvedGameId || existing.game_id,
          author: resolvedAuthorName || existing.author,
          author_id: resolvedAuthorId || existing.author_id,
          author_slug: resolvedAuthorSlug || existing.author_slug,
        });
        resultId = existing.id;
      }
    } else if (canonicalType === 'games') {
      if (operation === 'CREATE') {
        const name = sanitizePlainText(body.name || body.title || '', 200);
        if (!name || name.length < 2) {
          return NextResponse.json({ success: false, error: 'Nama game minimal 2 karakter' }, { status: 400 });
        }
        const coverImage = sanitizePlainText(
          body.imageUrl || body.image_url || body.coverImage || body.cover_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
          500
        );
        const bannerImage = sanitizePlainText(
          body.bannerUrl || body.banner_url || body.bannerImage || body.banner_image || coverImage,
          500
        );
        const description = sanitizeRichText(body.content || body.description || body.excerpt || `${name} overview.`, 10000);
        const developer = sanitizePlainText(body.developer || 'Pengembang Resmi', 100);
        const publisher = sanitizePlainText(body.publisher || 'Penerbit Resmi', 100);
        const releaseDate = sanitizePlainText(body.releaseDate || body.release_date || new Date().toISOString().slice(0, 10), 50);
        const platforms = Array.isArray(body.platforms) ? body.platforms : ['PC', 'Mobile'];
        const genres = Array.isArray(body.genres) ? body.genres : ['Action', 'RPG'];
        const status = sanitizePlainText(body.status || 'RELEASED', 50);
        const rating = Number(body.rating || 4.5);
        const officialUrl = sanitizePlainText(body.officialUrl || body.official_url || '', 500);

        const id = `game-${slug}`;
        const inserted = await insertGame({
          id,
          name,
          slug,
          cover_image: coverImage,
          banner_image: bannerImage,
          description,
          developer,
          publisher,
          release_date: releaseDate,
          platforms,
          genres,
          status,
          rating,
          official_url: officialUrl,
        });
        resultId = inserted.id;
      } else {
        const existing = (await getGameBySlug(slug)) || (body.id ? await getGameById(body.id) : null);
        if (!existing) {
          return NextResponse.json({ success: false, error: `Game dengan slug "${slug}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const name = (body.name || body.title) ? sanitizePlainText(body.name || body.title, 200) : existing.name;
        const coverImage = (body.imageUrl || body.image_url || body.coverImage || body.cover_image)
          ? sanitizePlainText(body.imageUrl || body.image_url || body.coverImage || body.cover_image, 500)
          : existing.cover_image;
        const bannerImage = (body.bannerUrl || body.banner_url || body.bannerImage || body.banner_image)
          ? sanitizePlainText(body.bannerUrl || body.banner_url || body.bannerImage || body.banner_image, 500)
          : existing.banner_image;
        const description = (body.content || body.description || body.excerpt)
          ? sanitizeRichText(body.content || body.description || body.excerpt, 10000)
          : existing.description;
        const developer = body.developer ? sanitizePlainText(body.developer, 100) : existing.developer;
        const publisher = body.publisher ? sanitizePlainText(body.publisher, 100) : existing.publisher;
        const releaseDate = (body.releaseDate || body.release_date) ? sanitizePlainText(body.releaseDate || body.release_date, 50) : existing.release_date;
        const platforms = Array.isArray(body.platforms) ? body.platforms : existing.platforms;
        const genres = Array.isArray(body.genres) ? body.genres : existing.genres;
        const status = body.status ? sanitizePlainText(body.status, 50) : existing.status;
        const rating = body.rating !== undefined ? Number(body.rating) : existing.rating;
        const officialUrl = (body.officialUrl || body.official_url) ? sanitizePlainText(body.officialUrl || body.official_url, 500) : existing.official_url;

        await updateGame(existing.id, {
          name,
          slug,
          cover_image: coverImage,
          banner_image: bannerImage,
          description,
          developer,
          publisher,
          release_date: releaseDate,
          platforms,
          genres,
          status,
          rating,
          official_url: officialUrl,
        });
        resultId = existing.id;
      }
    } else if (canonicalType === 'characters') {
      if (operation === 'CREATE') {
        const name = sanitizePlainText(body.name || body.title || '', 100);
        if (!name || name.length < 2) {
          return NextResponse.json({ success: false, error: 'Nama karakter minimal 2 karakter' }, { status: 400 });
        }
        const portrait = sanitizePlainText(
          body.imageUrl || body.image_url || body.portrait || 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800',
          500
        );
        const fullImage = sanitizePlainText(
          body.fullImage || body.full_image || body.bannerUrl || body.banner_url || portrait,
          500
        );
        const description = sanitizeRichText(body.content || body.description || `${name} character overview.`, 10000);
        const role = sanitizePlainText(body.role || 'DPS', 50);
        const element = sanitizePlainText(body.element || 'Neutral', 50);
        const weapon = sanitizePlainText(body.weapon || 'Sword', 50);
        const rarity = Number(body.rarity || 5);
        const releaseDate = sanitizePlainText(body.releaseDate || body.release_date || new Date().toISOString().slice(0, 10), 50);
        const status = normalizeContentStatus(body.status);
        resultPublished = status === 'PUBLISHED';

        const id = `char-${slug}-${Date.now().toString(36)}`;
        const inserted = await insertCharacter({
          id,
          game_id: resolvedGameId!,
          name,
          slug,
          portrait,
          full_image: fullImage,
          description,
          role,
          element,
          weapon,
          rarity,
          release_date: releaseDate,
          skills: Array.isArray(body.skills) ? body.skills : [],
          talents: Array.isArray(body.talents) ? body.talents : [],
          recommended_build: body.recommended_build || body.recommendedBuild || {
            main_role: role,
            best_artifacts: 'Standar Set',
            main_stats: 'ATK / Crit Rate',
            sub_stats: 'Crit DMG / Energy Recharge',
            summary: 'Build standar DPS optimal.',
          },
          recommended_weapons: Array.isArray(body.recommended_weapons) ? body.recommended_weapons : [],
          recommended_team: Array.isArray(body.recommended_team) ? body.recommended_team : [],
          materials: Array.isArray(body.materials) ? body.materials : [],
          status,
        });
        resultId = inserted.id;
      } else {
        const existing = (await getCharacterBySlug(slug, resolvedGameSlug)) || (body.id ? await getCharacterById(body.id) : null);
        if (!existing) {
          return NextResponse.json({ success: false, error: `Karakter dengan slug "${slug}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const name = (body.name || body.title) ? sanitizePlainText(body.name || body.title, 100) : existing.name;
        const portrait = (body.imageUrl || body.image_url || body.portrait)
          ? sanitizePlainText(body.imageUrl || body.image_url || body.portrait, 500)
          : existing.portrait;
        const fullImage = (body.fullImage || body.full_image || body.bannerUrl || body.banner_url)
          ? sanitizePlainText(body.fullImage || body.full_image || body.bannerUrl || body.banner_url, 500)
          : existing.full_image;
        const description = (body.content || body.description)
          ? sanitizeRichText(body.content || body.description, 10000)
          : existing.description;
        const role = body.role ? sanitizePlainText(body.role, 50) : existing.role;
        const element = body.element ? sanitizePlainText(body.element, 50) : existing.element;
        const weapon = body.weapon ? sanitizePlainText(body.weapon, 50) : existing.weapon;
        const rarity = body.rarity !== undefined ? Number(body.rarity) : existing.rarity;
        const releaseDate = (body.releaseDate || body.release_date)
          ? sanitizePlainText(body.releaseDate || body.release_date, 50)
          : existing.release_date;
        const status = body.status ? normalizeContentStatus(body.status) : existing.status;
        resultPublished = status === 'PUBLISHED';

        await updateCharacter(existing.id, {
          name,
          slug,
          portrait,
          full_image: fullImage,
          description,
          role,
          element,
          weapon,
          rarity,
          release_date: releaseDate,
          status,
          game_id: resolvedGameId || existing.game_id,
        });
        resultId = existing.id;
      }
    } else if (canonicalType === 'items') {
      if (operation === 'CREATE') {
        const name = sanitizePlainText(body.name || body.title || '', 100);
        if (!name || name.length < 2) {
          return NextResponse.json({ success: false, error: 'Nama item minimal 2 karakter' }, { status: 400 });
        }
        const icon = sanitizePlainText(
          body.imageUrl || body.image_url || body.icon || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800',
          500
        );
        const type = sanitizePlainText(body.type_detail || body.category || 'Equipment', 50);
        const rarity = Number(body.rarity || 4);
        const description = sanitizeRichText(body.content || body.description || `${name} item description.`, 10000);
        const howToGet = sanitizePlainText(body.howToGet || body.how_to_get || 'Drop Dungeon / Crafting', 200);
        const stats = typeof body.stats === 'object' && body.stats ? body.stats : {};

        const id = `item-${slug}-${Date.now().toString(36)}`;
        const inserted = await insertItem({
          id,
          game_id: resolvedGameId!,
          name,
          slug,
          type,
          rarity,
          icon,
          description,
          stats,
          how_to_get: howToGet,
        });
        resultId = inserted.id;
      } else {
        const existing = (await getItemBySlug(slug, resolvedGameSlug)) || (body.id ? await getItemById(body.id) : null);
        if (!existing) {
          return NextResponse.json({ success: false, error: `Item dengan slug "${slug}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const name = (body.name || body.title) ? sanitizePlainText(body.name || body.title, 100) : existing.name;
        const icon = (body.imageUrl || body.image_url || body.icon)
          ? sanitizePlainText(body.imageUrl || body.image_url || body.icon, 500)
          : existing.icon;
        const type = (body.type_detail || body.category) ? sanitizePlainText(body.type_detail || body.category, 50) : existing.type;
        const rarity = body.rarity !== undefined ? Number(body.rarity) : existing.rarity;
        const description = (body.content || body.description)
          ? sanitizeRichText(body.content || body.description, 10000)
          : existing.description;
        const howToGet = (body.howToGet || body.how_to_get)
          ? sanitizePlainText(body.howToGet || body.how_to_get, 200)
          : existing.how_to_get;
        const stats = typeof body.stats === 'object' && body.stats ? body.stats : existing.stats;

        await updateItem(existing.id, {
          name,
          slug,
          type,
          rarity,
          icon,
          description,
          stats,
          how_to_get: howToGet,
          game_id: resolvedGameId || existing.game_id,
        });
        resultId = existing.id;
      }
    } else if (canonicalType === 'redeem-codes') {
      if (operation === 'CREATE') {
        const code = sanitizePlainText(body.code || body.title || slug, 50).toUpperCase();
        const reward = sanitizePlainText(body.reward || body.content || body.excerpt || 'Hadiah in-game gratis', 255);
        if (!code || code.length < 3) {
          return NextResponse.json({ success: false, error: 'Kode redeem minimal 3 karakter' }, { status: 400 });
        }
        const rawStatus = (body.status || 'ACTIVE').toUpperCase();
        const status: 'ACTIVE' | 'EXPIRED' = rawStatus === 'EXPIRED' ? 'EXPIRED' : 'ACTIVE';
        const expiredAt = sanitizePlainText(body.expiredAt || body.expired_at || 'Tidak ada batas waktu', 100);
        const source = sanitizePlainText(body.source || 'Official Community', 100);

        const id = `code-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
        const inserted = await insertRedeemCode({
          id,
          game_id: resolvedGameId!,
          code,
          reward,
          status,
          expired_at: expiredAt,
          source,
          last_checked: new Date().toISOString(),
          verified_at: new Date().toISOString(),
          verification_provider: 'OfficialProvider',
        });
        resultId = inserted.id;
      } else {
        const targetGameId = resolvedGameId || (resolvedGameSlug ? (await getGameBySlug(resolvedGameSlug))?.id : undefined);
        const existingList = await getRedeemCodes(targetGameId);
        const codeTarget = (body.code || slug).toUpperCase();
        const existing = existingList.find((c) => c.code.toUpperCase() === codeTarget || c.id === body.id);
        if (!existing) {
          return NextResponse.json({ success: false, error: `Redeem code "${codeTarget}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const code = body.code ? sanitizePlainText(body.code, 50).toUpperCase() : existing.code;
        const reward = (body.reward || body.content || body.excerpt)
          ? sanitizePlainText(body.reward || body.content || body.excerpt, 255)
          : existing.reward;
        const rawStatus = (body.status || existing.status).toUpperCase();
        const status: 'ACTIVE' | 'EXPIRED' = rawStatus === 'EXPIRED' ? 'EXPIRED' : 'ACTIVE';
        const expiredAt = (body.expiredAt || body.expired_at)
          ? sanitizePlainText(body.expiredAt || body.expired_at, 100)
          : existing.expired_at;
        const source = body.source ? sanitizePlainText(body.source, 100) : existing.source;

        await updateRedeemCode(existing.id, {
          code,
          reward,
          status,
          expired_at: expiredAt,
          source,
          last_checked: new Date().toISOString(),
          game_id: resolvedGameId || existing.game_id,
        });
        resultId = existing.id;
      }
    } else if (canonicalType === 'events') {
      if (operation === 'CREATE') {
        const title = sanitizePlainText(body.title || body.name || '', 200);
        if (!title || title.length < 3) {
          return NextResponse.json({ success: false, error: 'Judul event minimal 3 karakter' }, { status: 400 });
        }
        const description = sanitizeRichText(body.content || body.description || body.excerpt || `${title} event details.`, 10000);
        const image = sanitizePlainText(
          body.imageUrl || body.image_url || body.image || body.bannerImage || body.banner_image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
          500
        );
        const startDate = sanitizePlainText(body.startDate || body.start_date || new Date().toISOString(), 50);
        const endDate = sanitizePlainText(body.endDate || body.end_date || new Date(Date.now() + 86400000 * 14).toISOString(), 50);
        const status = body.status === 'UPCOMING' || body.status === 'ENDED' ? body.status : 'ACTIVE';
        const officialUrl = sanitizePlainText(body.officialUrl || body.official_url || '', 500);
        const rewards = body.rewards ? (typeof body.rewards === 'string' ? sanitizePlainText(body.rewards, 500) : body.rewards) : 'Hadiah Eksklusif In-Game';

        const id = `event-${slug}-${Date.now().toString(36)}`;
        const inserted = await insertEventItem({
          id,
          game_id: resolvedGameId!,
          title,
          slug,
          description,
          image,
          banner_image: image,
          start_date: startDate,
          end_date: endDate,
          status,
          official_url: officialUrl,
          rewards,
        });
        resultId = inserted.id;
      } else {
        const existing = (await getEventBySlug(slug)) || (body.id ? await getEventById(body.id) : null);
        if (!existing) {
          return NextResponse.json({ success: false, error: `Event dengan slug "${slug}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const title = (body.title || body.name) ? sanitizePlainText(body.title || body.name, 200) : existing.title;
        const description = (body.content || body.description || body.excerpt)
          ? sanitizeRichText(body.content || body.description || body.excerpt, 10000)
          : existing.description;
        const image = (body.imageUrl || body.image_url || body.image || body.bannerImage || body.banner_image)
          ? sanitizePlainText(body.imageUrl || body.image_url || body.image || body.bannerImage || body.banner_image, 500)
          : existing.image;
        const startDate = (body.startDate || body.start_date)
          ? sanitizePlainText(body.startDate || body.start_date, 50)
          : existing.start_date;
        const endDate = (body.endDate || body.end_date)
          ? sanitizePlainText(body.endDate || body.end_date, 50)
          : existing.end_date;
        const status = body.status
          ? (body.status === 'UPCOMING' || body.status === 'ENDED' ? body.status : 'ACTIVE')
          : existing.status;
        const officialUrl = (body.officialUrl || body.official_url)
          ? sanitizePlainText(body.officialUrl || body.official_url, 500)
          : existing.official_url;
        const rewards = body.rewards !== undefined ? (typeof body.rewards === 'string' ? sanitizePlainText(body.rewards, 500) : body.rewards) : existing.rewards;

        await updateEventItem(existing.id, {
          title,
          slug,
          description,
          image,
          banner_image: image,
          start_date: startDate,
          end_date: endDate,
          status,
          official_url: officialUrl,
          rewards,
          game_id: resolvedGameId || existing.game_id,
        });
        resultId = existing.id;
      }
    } else if (canonicalType === 'tier-lists') {
      if (operation === 'CREATE') {
        const title = sanitizePlainText(body.title || body.name || '', 200);
        if (!title || title.length < 3) {
          return NextResponse.json({ success: false, error: 'Judul tier list minimal 3 karakter' }, { status: 400 });
        }
        const description = sanitizeRichText(body.content || body.description || `${title} tier list analysis.`, 10000);
        const version = sanitizePlainText(body.version || '1.0', 50);
        const tiers = Array.isArray(body.tiers) ? body.tiers : [];

        const id = `tier-${slug}-${Date.now().toString(36)}`;
        const inserted = await insertTierList({
          id,
          game_id: resolvedGameId!,
          title,
          slug,
          description,
          version,
          tiers,
        });
        resultId = inserted.id;
      } else {
        const existing = await getTierListBySlug(slug);
        if (!existing) {
          return NextResponse.json({ success: false, error: `Tier list dengan slug "${slug}" tidak ditemukan untuk di-update` }, { status: 404 });
        }
        const title = (body.title || body.name) ? sanitizePlainText(body.title || body.name, 200) : existing.title;
        const description = (body.content || body.description)
          ? sanitizeRichText(body.content || body.description, 10000)
          : existing.description;
        const version = body.version ? sanitizePlainText(body.version, 50) : existing.version;
        const tiers = Array.isArray(body.tiers) ? body.tiers : existing.tiers;

        await updateTierList(existing.id, {
          title,
          slug,
          description,
          version,
          tiers,
          game_id: resolvedGameId || existing.game_id,
        });
        resultId = existing.id;
      }
    }

    // 12. Trigger On-Demand Next.js Cache Revalidation
    triggerRevalidation(canonicalType, slug, resolvedGameSlug);

    // 13. Audit Success Log
    logAudit({
      timestamp,
      operation,
      type: canonicalType,
      slug,
      status: 'SUCCESS',
      ip,
    });

    // 14. Return Success Response
    const responseStatusCode = operation === 'CREATE' ? 201 : 200;
    return NextResponse.json(
      {
        success: true,
        type: canonicalType,
        id: resultId,
        slug,
        published: resultPublished,
      },
      { status: responseStatusCode }
    );
  } catch (err: any) {
    logAudit({
      timestamp,
      operation,
      type: canonicalType,
      slug,
      status: 'FAILURE',
      reason: err.message,
      ip,
    });
    return NextResponse.json(
      {
        success: false,
        error: `Gagal memproses ${operation} untuk ${canonicalType}: ${err.message}`,
      },
      { status: 500 }
    );
  }
}

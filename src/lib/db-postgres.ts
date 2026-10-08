import { Pool, PoolClient } from 'pg';
import {
  Game,
  Character,
  Guide,
  News,
  RedeemCode,
  EventItem,
  Item,
  TierList,
  AdSlotConfig,
  AdminUser,
  ContactMessage,
  Author,
  ProductionContentStats,
  DashboardStats,
} from './types';
import { hashPassword } from './auth';
import { isProductionMode } from './seo';
import { DatabaseAdapter, GlobalSearchResult } from './db-adapter';

declare global {
  // eslint-disable-next-line no-var
  var _seraphi_pg_pool: Pool | undefined;
}

export function toPgSql(sql: string): string {
  let paramIndex = 1;
  return sql.replace(/\?/g, () => `$${paramIndex++}`);
}

export function getPostgresPool(): Pool {
  if (globalThis._seraphi_pg_pool) {
    return globalThis._seraphi_pg_pool;
  }

  const connectionString = process.env.DATABASE_URL || '';
  const isNeon = connectionString.includes('neon.tech');

  const pool = new Pool({
    connectionString,
    ssl: isNeon || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client:', err);
  });

  globalThis._seraphi_pg_pool = pool;
  return pool;
}

function safeJsonParse<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function mapGame(row: any): Game {
  return {
    ...row,
    platforms: safeJsonParse(row.platforms, []),
    genres: safeJsonParse(row.genres, []),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    no_index: Boolean(row.no_index),
  };
}

function mapCharacter(row: any): Character {
  return {
    ...row,
    skills: safeJsonParse(row.skills, []),
    talents: safeJsonParse(row.talents, []),
    recommended_build: safeJsonParse(row.recommended_build, {}),
    recommended_weapons: safeJsonParse(row.recommended_weapons, []),
    recommended_team: safeJsonParse(row.recommended_team, []),
    materials: safeJsonParse(row.materials, []),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    no_index: Boolean(row.no_index),
  };
}

function mapGuide(row: any): Guide {
  return {
    ...row,
    tags: safeJsonParse(row.tags, []),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    faq: safeJsonParse(row.faq, []),
    related_characters: safeJsonParse(row.related_character_ids || row.related_characters, []),
    related_items: safeJsonParse(row.related_items, []),
    no_index: Boolean(row.no_index),
    // UI aliases
    thumbnail: row.featured_image || row.thumbnail || '',
    published_at: row.created_at,
    // author resolved later if needed; keep author_id for admin use
  };
}

function mapNews(row: any): News {
  return {
    ...row,
    tags: safeJsonParse(row.tags, []),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    no_index: Boolean(row.no_index),
    // UI aliases
    thumbnail: row.featured_image || row.thumbnail || '',
    published_at: row.created_at,
  };
}

function mapItem(row: any): Item {
  return {
    ...row,
    stats: safeJsonParse(row.stats, {}),
    is_demo: Boolean(row.is_demo),
  };
}

function mapAuthor(row: any): Author {
  return { ...row };
}

function mapTierList(row: any): TierList {
  return {
    ...row,
    tiers: safeJsonParse(row.tiers, []),
  };
}

function mapAdSlot(row: any): AdSlotConfig {
  return {
    ...row,
    is_active: Boolean(row.is_active),
  };
}

export class PostgresAdapter implements DatabaseAdapter {
  readonly provider = 'postgres' as const;

  private get pool(): Pool {
    return getPostgresPool();
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const pgSql = toPgSql(sql);
    const res = await this.pool.query(pgSql, params);
    return res.rows as T[];
  }

  async get<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  async run(sql: string, params: any[] = []): Promise<{ changes?: number }> {
    const pgSql = toPgSql(sql);
    const res = await this.pool.query(pgSql, params);
    return { changes: res.rowCount || 0 };
  }

  async exec(sql: string): Promise<void> {
    await this.pool.query(sql);
  }

  async close(): Promise<void> {
    if (globalThis._seraphi_pg_pool) {
      await globalThis._seraphi_pg_pool.end();
      globalThis._seraphi_pg_pool = undefined;
    }
  }

  async checkDuplicateSlug(
    table: 'games' | 'characters' | 'guides' | 'news' | 'items' | 'authors',
    slug: string,
    excludeId?: string
  ): Promise<boolean> {
    let query = `SELECT id FROM ${table} WHERE LOWER(slug) = LOWER($1)`;
    const params: any[] = [slug.trim()];
    if (excludeId) {
      query += ' AND id != $2';
      params.push(excludeId);
    }
    const res = await this.pool.query(query, params);
    return res.rows.length > 0;
  }

  async getAuthors(): Promise<Author[]> {
    const res = await this.pool.query('SELECT * FROM authors ORDER BY name ASC');
    return res.rows.map(mapAuthor);
  }

  async getAuthorBySlug(slug: string): Promise<Author | null> {
    const res = await this.pool.query('SELECT * FROM authors WHERE slug = $1', [slug]);
    return res.rows.length > 0 ? mapAuthor(res.rows[0]) : null;
  }

  async getAuthorById(id: string): Promise<Author | null> {
    const res = await this.pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return res.rows.length > 0 ? mapAuthor(res.rows[0]) : null;
  }

  async insertAuthor(author: Author): Promise<void> {
    await this.pool.query(
      `
      INSERT INTO authors (id, name, slug, avatar, bio, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        avatar = EXCLUDED.avatar,
        bio = EXCLUDED.bio,
        role = EXCLUDED.role,
        updated_at = EXCLUDED.updated_at
    `,
      [
        author.id,
        author.name,
        author.slug,
        author.avatar,
        author.bio,
        author.role || 'Contributor',
        author.created_at,
        author.updated_at,
      ]
    );
  }

  async updateAuthor(id: string, updates: Partial<Author>): Promise<void> {
    const existing = await this.getAuthorById(id);
    if (!existing) throw new Error('Author not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    await this.pool.query(
      `
      UPDATE authors SET name = $1, slug = $2, avatar = $3, bio = $4, role = $5, updated_at = $6
      WHERE id = $7
    `,
      [merged.name, merged.slug, merged.avatar, merged.bio, merged.role, merged.updated_at, id]
    );
  }

  async deleteAuthor(id: string): Promise<void> {
    await this.pool.query('DELETE FROM authors WHERE id = $1', [id]);
  }

  async getGuidesByAuthor(authorId: string): Promise<Guide[]> {
    let query = 'SELECT * FROM guides WHERE (author_id = $1 OR author_id = (SELECT id FROM authors WHERE slug = $1))';
    if (isProductionMode()) {
      query += " AND status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)";
    }
    query += ' ORDER BY created_at DESC';
    const res = await this.pool.query(query, [authorId]);
    return res.rows.map(mapGuide);
  }

  async getNewsByAuthor(authorId: string): Promise<News[]> {
    let query = 'SELECT * FROM news WHERE (author_id = $1 OR author_id = (SELECT id FROM authors WHERE slug = $1))';
    if (isProductionMode()) {
      query += " AND status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)";
    }
    query += ' ORDER BY created_at DESC';
    const res = await this.pool.query(query, [authorId]);
    return res.rows.map(mapNews);
  }

  async getGames(publishedOnly = true): Promise<Game[]> {
    let query = 'SELECT * FROM games';
    const conditions: string[] = [];
    if (publishedOnly) {
      conditions.push("status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')");
    }
    if (isProductionMode()) {
      conditions.push('(is_demo = 0 OR is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY rating DESC, name ASC';
    const res = await this.pool.query(query);
    return res.rows.map(mapGame);
  }

  async getGameBySlug(slug: string): Promise<Game | null> {
    let query = 'SELECT * FROM games WHERE slug = $1';
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    const res = await this.pool.query(query, [slug]);
    return res.rows.length > 0 ? mapGame(res.rows[0]) : null;
  }

  async getGameById(id: string): Promise<Game | null> {
    const res = await this.pool.query('SELECT * FROM games WHERE id = $1', [id]);
    return res.rows.length > 0 ? mapGame(res.rows[0]) : null;
  }

  async insertGame(data: Omit<Game, 'created_at' | 'updated_at'>): Promise<Game> {
    const now = new Date().toISOString();
    const game: Game = {
      ...data,
      created_at: now,
      updated_at: now,
      views: 0,
      is_demo: data.is_demo ?? false,
      no_index: data.no_index ?? false,
    };
    await this.pool.query(
      `
      INSERT INTO games (
        id, name, slug, cover_image, banner_image, description,
        developer, publisher, release_date, platforms, genres,
        status, rating, official_url, created_at, updated_at, views, is_demo,
        meta_title, meta_description, no_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        cover_image = EXCLUDED.cover_image,
        banner_image = EXCLUDED.banner_image,
        description = EXCLUDED.description,
        developer = EXCLUDED.developer,
        publisher = EXCLUDED.publisher,
        release_date = EXCLUDED.release_date,
        platforms = EXCLUDED.platforms,
        genres = EXCLUDED.genres,
        status = EXCLUDED.status,
        rating = EXCLUDED.rating,
        official_url = EXCLUDED.official_url,
        updated_at = EXCLUDED.updated_at,
        is_demo = EXCLUDED.is_demo,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        no_index = EXCLUDED.no_index
    `,
      [
        game.id,
        game.name,
        game.slug,
        game.cover_image,
        game.banner_image,
        game.description,
        game.developer,
        game.publisher,
        game.release_date,
        JSON.stringify(game.platforms),
        JSON.stringify(game.genres),
        game.status,
        game.rating,
        game.official_url,
        game.created_at,
        game.updated_at,
        game.views ?? 0,
        game.is_demo ? 1 : 0,
        game.meta_title || null,
        game.meta_description || null,
        game.no_index ? 1 : 0,
      ]
    );
    return game;
  }

  async updateGame(id: string, updates: Partial<Game>): Promise<void> {
    const existing = await this.getGameById(id);
    if (!existing) throw new Error('Game not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    await this.pool.query(
      `
      UPDATE games SET
        name = $1, slug = $2, cover_image = $3, banner_image = $4, description = $5,
        developer = $6, publisher = $7, release_date = $8, platforms = $9, genres = $10,
        status = $11, rating = $12, official_url = $13, updated_at = $14, is_demo = $15,
        meta_title = $16, meta_description = $17, no_index = $18
      WHERE id = $19
    `,
      [
        merged.name,
        merged.slug,
        merged.cover_image,
        merged.banner_image,
        merged.description,
        merged.developer,
        merged.publisher,
        merged.release_date,
        JSON.stringify(merged.platforms),
        JSON.stringify(merged.genres),
        merged.status,
        merged.rating,
        merged.official_url,
        merged.updated_at,
        merged.is_demo ? 1 : 0,
        merged.meta_title || null,
        merged.meta_description || null,
        merged.no_index ? 1 : 0,
        id,
      ]
    );
  }

  async deleteGame(id: string): Promise<void> {
    await this.pool.query('DELETE FROM games WHERE id = $1', [id]);
  }

  async getCharacters(gameIdOrSlug?: string, publishedOnly = true): Promise<Character[]> {
    let query = `
      SELECT c.*, g.slug as game_slug
      FROM characters c
      LEFT JOIN games g ON c.game_id = g.id
    `;
    const conditions: string[] = [];
    const params: any[] = [];
    if (gameIdOrSlug) {
      params.push(gameIdOrSlug);
      conditions.push(`(c.game_id = $${params.length} OR g.slug = $${params.length})`);
    }
    if (publishedOnly) {
      conditions.push("c.status = 'PUBLISHED'");
    }
    if (isProductionMode()) {
      conditions.push('(c.is_demo = 0 OR c.is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY c.rarity DESC, c.name ASC';
    const res = await this.pool.query(query, params);
    return res.rows.map(mapCharacter);
  }

  async getCharacterBySlug(slug: string, gameSlug?: string): Promise<Character | null> {
    let query = `
      SELECT c.*, g.slug as game_slug
      FROM characters c
      LEFT JOIN games g ON c.game_id = g.id
      WHERE c.slug = $1
    `;
    const params: any[] = [slug];
    if (gameSlug) {
      params.push(gameSlug);
      query += ` AND g.slug = $${params.length}`;
    }
    if (isProductionMode()) {
      query += ' AND (c.is_demo = 0 OR c.is_demo IS NULL)';
    }
    const res = await this.pool.query(query, params);
    return res.rows.length > 0 ? mapCharacter(res.rows[0]) : null;
  }

  async getCharacterById(id: string): Promise<Character | null> {
    const res = await this.pool.query('SELECT * FROM characters WHERE id = $1', [id]);
    return res.rows.length > 0 ? mapCharacter(res.rows[0]) : null;
  }

  async insertCharacter(data: Omit<Character, 'created_at' | 'updated_at'>): Promise<Character> {
    const now = new Date().toISOString();
    const char: Character = {
      ...data,
      created_at: now,
      updated_at: now,
      views: 0,
      is_demo: data.is_demo ?? false,
      no_index: data.no_index ?? false,
    };
    await this.pool.query(
      `
      INSERT INTO characters (
        id, game_id, name, slug, portrait, full_image, description,
        role, element, weapon, rarity, release_date, skills, talents,
        recommended_build, recommended_weapons, recommended_team,
        materials, status, created_at, updated_at, views, is_demo,
        meta_title, meta_description, no_index
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
      ON CONFLICT (id) DO UPDATE SET
        game_id = EXCLUDED.game_id,
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        portrait = EXCLUDED.portrait,
        full_image = EXCLUDED.full_image,
        description = EXCLUDED.description,
        role = EXCLUDED.role,
        element = EXCLUDED.element,
        weapon = EXCLUDED.weapon,
        rarity = EXCLUDED.rarity,
        release_date = EXCLUDED.release_date,
        skills = EXCLUDED.skills,
        talents = EXCLUDED.talents,
        recommended_build = EXCLUDED.recommended_build,
        recommended_weapons = EXCLUDED.recommended_weapons,
        recommended_team = EXCLUDED.recommended_team,
        materials = EXCLUDED.materials,
        status = EXCLUDED.status,
        updated_at = EXCLUDED.updated_at,
        is_demo = EXCLUDED.is_demo,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        no_index = EXCLUDED.no_index
    `,
      [
        char.id,
        char.game_id,
        char.name,
        char.slug,
        char.portrait,
        char.full_image,
        char.description,
        char.role,
        char.element,
        char.weapon,
        char.rarity,
        char.release_date,
        JSON.stringify(char.skills || []),
        JSON.stringify(char.talents || []),
        JSON.stringify(char.recommended_build || {}),
        JSON.stringify(char.recommended_weapons || []),
        JSON.stringify(char.recommended_team || []),
        JSON.stringify(char.materials || []),
        char.status,
        char.created_at,
        char.updated_at,
        char.views ?? 0,
        char.is_demo ? 1 : 0,
        char.meta_title || null,
        char.meta_description || null,
        char.no_index ? 1 : 0,
      ]
    );
    return char;
  }

  async updateCharacter(id: string, updates: Partial<Character>): Promise<void> {
    const existing = await this.getCharacterById(id);
    if (!existing) throw new Error('Character not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    await this.pool.query(
      `
      UPDATE characters SET
        game_id = $1, name = $2, slug = $3, portrait = $4, full_image = $5, description = $6,
        role = $7, element = $8, weapon = $9, rarity = $10, release_date = $11, skills = $12,
        talents = $13, recommended_build = $14, recommended_weapons = $15, recommended_team = $16,
        materials = $17, status = $18, updated_at = $19, is_demo = $20,
        meta_title = $21, meta_description = $22, no_index = $23
      WHERE id = $24
    `,
      [
        merged.game_id,
        merged.name,
        merged.slug,
        merged.portrait,
        merged.full_image,
        merged.description,
        merged.role,
        merged.element,
        merged.weapon,
        merged.rarity,
        merged.release_date,
        JSON.stringify(merged.skills || []),
        JSON.stringify(merged.talents || []),
        JSON.stringify(merged.recommended_build || {}),
        JSON.stringify(merged.recommended_weapons || []),
        JSON.stringify(merged.recommended_team || []),
        JSON.stringify(merged.materials || []),
        merged.status,
        merged.updated_at,
        merged.is_demo ? 1 : 0,
        merged.meta_title || null,
        merged.meta_description || null,
        merged.no_index ? 1 : 0,
        id,
      ]
    );
  }

  async deleteCharacter(id: string): Promise<void> {
    await this.pool.query('DELETE FROM characters WHERE id = $1', [id]);
  }

  async getGuides(options?: {
    gameIdOrSlug?: string;
    category?: string;
    tag?: string;
    limit?: number;
    publishedOnly?: boolean;
    onlyPublished?: boolean;
  }): Promise<Guide[]> {
    let query = `
      SELECT gu.*, g.slug as game_slug
      FROM guides gu
      LEFT JOIN games g ON gu.game_id = g.id
    `;
    const conditions: string[] = [];
    const params: any[] = [];
    if (options?.gameIdOrSlug) {
      params.push(options.gameIdOrSlug);
      conditions.push(`(gu.game_id = $${params.length} OR g.slug = $${params.length})`);
    }
    if (options?.category) {
      params.push(options.category);
      conditions.push(`gu.category = $${params.length}`);
    }
    if (options?.tag) {
      params.push(`%"${options.tag}"%`);
      conditions.push(`gu.tags LIKE $${params.length}`);
    }
    const shouldPublishOnly =
      options?.onlyPublished !== undefined
        ? options.onlyPublished
        : options?.publishedOnly !== false;
    if (shouldPublishOnly) {
      conditions.push("gu.status = 'PUBLISHED'");
    }
    if (isProductionMode()) {
      conditions.push('(gu.is_demo = 0 OR gu.is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY gu.created_at DESC';
    if (options?.limit) {
      query += ` LIMIT ${Number(options.limit)}`;
    }
    const res = await this.pool.query(query, params);
    return res.rows.map(mapGuide);
  }

  async getGuideBySlug(slug: string): Promise<Guide | null> {
    let query = 'SELECT * FROM guides WHERE slug = $1';
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    const res = await this.pool.query(query, [slug]);
    return res.rows.length > 0 ? mapGuide(res.rows[0]) : null;
  }

  async getGuideById(id: string): Promise<Guide | null> {
    const res = await this.pool.query('SELECT * FROM guides WHERE id = $1', [id]);
    return res.rows.length > 0 ? mapGuide(res.rows[0]) : null;
  }

  async insertGuide(data: Omit<Guide, 'created_at' | 'updated_at' | 'views'>): Promise<Guide> {
    const now = new Date().toISOString();
    const guide: Guide = {
      ...data,
      created_at: now,
      updated_at: now,
      views: 0,
      is_demo: data.is_demo ?? false,
      no_index: data.no_index ?? false,
      // Resolve aliases
      featured_image: data.featured_image || data.thumbnail || '',
    };
    await this.pool.query(
      `
      INSERT INTO guides (
        id, game_id, author_id, title, slug, excerpt, content, category,
        difficulty, reading_time, featured_image, status, created_at,
        updated_at, views, is_demo, meta_title, meta_description, no_index,
        tags, faq, canonical_url, related_guide_ids, related_character_ids
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      ON CONFLICT (id) DO UPDATE SET
        game_id = EXCLUDED.game_id,
        author_id = EXCLUDED.author_id,
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        category = EXCLUDED.category,
        difficulty = EXCLUDED.difficulty,
        reading_time = EXCLUDED.reading_time,
        featured_image = EXCLUDED.featured_image,
        status = EXCLUDED.status,
        updated_at = EXCLUDED.updated_at,
        is_demo = EXCLUDED.is_demo,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        no_index = EXCLUDED.no_index,
        tags = EXCLUDED.tags,
        faq = EXCLUDED.faq,
        canonical_url = EXCLUDED.canonical_url,
        related_guide_ids = EXCLUDED.related_guide_ids,
        related_character_ids = EXCLUDED.related_character_ids
    `,
      [
        guide.id,
        guide.game_id,
        guide.author_id || 'author-1',
        guide.title,
        guide.slug,
        guide.excerpt,
        guide.content,
        guide.category,
        guide.difficulty || 'medium',
        guide.reading_time || 5,
        guide.featured_image || guide.thumbnail || '',
        guide.status,
        guide.created_at || guide.published_at || new Date().toISOString(),
        guide.updated_at,
        guide.views ?? 0,
        guide.is_demo ? 1 : 0,
        guide.meta_title || null,
        guide.meta_description || null,
        guide.no_index ? 1 : 0,
        JSON.stringify(guide.tags || []),
        JSON.stringify(guide.faq || []),
        guide.canonical_url || null,
        JSON.stringify(guide.related_guide_ids || guide.related_characters || []),
        JSON.stringify(guide.related_character_ids || []),
      ]
    );
    return mapGuide({ ...guide, tags: JSON.stringify(guide.tags || []) });
  }

  async updateGuide(id: string, updates: Partial<Guide>): Promise<void> {
    const existing = await this.getGuideById(id);
    if (!existing) throw new Error('Guide not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    const featuredImage = merged.featured_image || merged.thumbnail || '';
    await this.pool.query(
      `
      UPDATE guides SET
        game_id = $1, author_id = $2, title = $3, slug = $4, excerpt = $5, content = $6, category = $7,
        difficulty = $8, reading_time = $9, featured_image = $10, status = $11, updated_at = $12,
        is_demo = $13, meta_title = $14, meta_description = $15, no_index = $16, tags = $17,
        faq = $18, canonical_url = $19, related_guide_ids = $20, related_character_ids = $21
      WHERE id = $22
    `,
      [
        merged.game_id,
        merged.author_id || 'author-1',
        merged.title,
        merged.slug,
        merged.excerpt,
        merged.content,
        merged.category,
        merged.difficulty || 'medium',
        merged.reading_time || 5,
        featuredImage,
        merged.status,
        merged.updated_at,
        merged.is_demo ? 1 : 0,
        merged.meta_title || null,
        merged.meta_description || null,
        merged.no_index ? 1 : 0,
        JSON.stringify(merged.tags || []),
        JSON.stringify(merged.faq || []),
        merged.canonical_url || null,
        JSON.stringify(merged.related_guide_ids || merged.related_characters || []),
        JSON.stringify(merged.related_character_ids || []),
        id,
      ]
    );
  }

  async deleteGuide(id: string): Promise<void> {
    await this.pool.query('DELETE FROM guides WHERE id = $1', [id]);
  }

  async getNews(options?: {
    gameIdOrSlug?: string;
    category?: string;
    limit?: number;
    publishedOnly?: boolean;
    onlyPublished?: boolean;
  }): Promise<News[]> {
    let query = `
      SELECT nw.*, g.slug as game_slug
      FROM news nw
      LEFT JOIN games g ON nw.game_id = g.id
    `;
    const conditions: string[] = [];
    const params: any[] = [];
    if (options?.gameIdOrSlug) {
      params.push(options.gameIdOrSlug);
      conditions.push(`(nw.game_id = $${params.length} OR g.slug = $${params.length})`);
    }
    if (options?.category) {
      params.push(options.category);
      conditions.push(`nw.category = $${params.length}`);
    }
    const shouldPublishOnly =
      options?.onlyPublished !== undefined
        ? options.onlyPublished
        : options?.publishedOnly !== false;
    if (shouldPublishOnly) {
      conditions.push("nw.status = 'PUBLISHED'");
    }
    if (isProductionMode()) {
      conditions.push('(nw.is_demo = 0 OR nw.is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY nw.created_at DESC';
    if (options?.limit) {
      query += ` LIMIT ${Number(options.limit)}`;
    }
    const res = await this.pool.query(query, params);
    return res.rows.map(mapNews);
  }

  async getNewsBySlug(slug: string): Promise<News | null> {
    let query = 'SELECT * FROM news WHERE slug = $1';
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    const res = await this.pool.query(query, [slug]);
    return res.rows.length > 0 ? mapNews(res.rows[0]) : null;
  }

  async getNewsById(id: string): Promise<News | null> {
    const res = await this.pool.query('SELECT * FROM news WHERE id = $1', [id]);
    return res.rows.length > 0 ? mapNews(res.rows[0]) : null;
  }

  async insertNewsItem(data: Omit<News, 'created_at' | 'updated_at' | 'views'>): Promise<News> {
    const now = new Date().toISOString();
    const item: News = {
      ...data,
      created_at: now,
      updated_at: now,
      views: 0,
      is_demo: data.is_demo ?? false,
      no_index: data.no_index ?? false,
      // Resolve aliases
      featured_image: data.featured_image || data.thumbnail || '',
    };
    await this.pool.query(
      `
      INSERT INTO news (
        id, game_id, author_id, title, slug, excerpt, content, category,
        featured_image, status, created_at, updated_at, views, is_demo,
        meta_title, meta_description, no_index, tags
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT (id) DO UPDATE SET
        game_id = EXCLUDED.game_id,
        author_id = EXCLUDED.author_id,
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        category = EXCLUDED.category,
        featured_image = EXCLUDED.featured_image,
        status = EXCLUDED.status,
        updated_at = EXCLUDED.updated_at,
        is_demo = EXCLUDED.is_demo,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        no_index = EXCLUDED.no_index,
        tags = EXCLUDED.tags
    `,
      [
        item.id,
        item.game_id || null,
        item.author_id || 'author-1',
        item.title,
        item.slug,
        item.excerpt,
        item.content,
        item.category,
        item.featured_image || item.thumbnail || '',
        item.status,
        item.created_at || item.published_at || new Date().toISOString(),
        item.updated_at,
        item.views ?? 0,
        item.is_demo ? 1 : 0,
        item.meta_title || null,
        item.meta_description || null,
        item.no_index ? 1 : 0,
        JSON.stringify(item.tags || []),
      ]
    );
    return mapNews({ ...item, tags: JSON.stringify(item.tags || []) });
  }

  async updateNewsItem(id: string, updates: Partial<News>): Promise<void> {
    const existing = await this.getNewsById(id);
    if (!existing) throw new Error('News item not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    const featuredImage = merged.featured_image || merged.thumbnail || '';
    await this.pool.query(
      `
      UPDATE news SET
        game_id = $1, author_id = $2, title = $3, slug = $4, excerpt = $5, content = $6, category = $7,
        featured_image = $8, status = $9, updated_at = $10, is_demo = $11,
        meta_title = $12, meta_description = $13, no_index = $14, tags = $15
      WHERE id = $16
    `,
      [
        merged.game_id || null,
        merged.author_id || 'author-1',
        merged.title,
        merged.slug,
        merged.excerpt,
        merged.content,
        merged.category,
        featuredImage,
        merged.status,
        merged.updated_at,
        merged.is_demo ? 1 : 0,
        merged.meta_title || null,
        merged.meta_description || null,
        merged.no_index ? 1 : 0,
        JSON.stringify(merged.tags || []),
        id,
      ]
    );
  }

  async deleteNewsItem(id: string): Promise<void> {
    await this.pool.query('DELETE FROM news WHERE id = $1', [id]);
  }

  async getRedeemCodes(gameIdOrSlug?: string, activeOnly = false): Promise<RedeemCode[]> {
    let query = `
      SELECT rc.*, g.name as game_name, g.slug as game_slug
      FROM redeem_codes rc
      LEFT JOIN games g ON rc.game_id = g.id
    `;
    const conditions: string[] = [];
    const params: any[] = [];
    if (gameIdOrSlug) {
      params.push(gameIdOrSlug);
      conditions.push(`(rc.game_id = $${params.length} OR g.slug = $${params.length})`);
    }
    if (activeOnly) {
      conditions.push("rc.status = 'ACTIVE'");
    }
    if (isProductionMode()) {
      conditions.push('(rc.is_demo = 0 OR rc.is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += " ORDER BY CASE WHEN rc.status = 'ACTIVE' THEN 0 ELSE 1 END, rc.created_at DESC";
    const res = await this.pool.query(query, params);
    return res.rows.map((rc) => ({
      ...rc,
      verified_at: rc.verified_at || rc.last_checked,
      is_demo: Boolean(rc.is_demo),
    }));
  }

  async getRedeemCodeById(id: string): Promise<RedeemCode | null> {
    const res = await this.pool.query('SELECT * FROM redeem_codes WHERE id = $1', [id]);
    if (res.rows.length === 0) return null;
    const rc = res.rows[0];
    return {
      ...rc,
      verified_at: rc.verified_at || rc.last_checked,
      is_demo: Boolean(rc.is_demo),
    };
  }

  async insertRedeemCode(data: Omit<RedeemCode, 'created_at' | 'updated_at'>): Promise<RedeemCode> {
    const now = new Date().toISOString();
    const code: RedeemCode = {
      ...data,
      created_at: now,
      updated_at: now,
      verified_at: data.verified_at || now,
      verification_provider: data.verification_provider || 'ManualProvider',
      is_demo: data.is_demo ?? false,
    };
    await this.pool.query(
      `
      INSERT INTO redeem_codes (
        id, game_id, code, reward, status, expired_at, source,
        last_checked, verified_at, verification_provider, created_at, updated_at, is_demo
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET
        game_id = EXCLUDED.game_id,
        code = EXCLUDED.code,
        reward = EXCLUDED.reward,
        status = EXCLUDED.status,
        expired_at = EXCLUDED.expired_at,
        source = EXCLUDED.source,
        last_checked = EXCLUDED.last_checked,
        verified_at = EXCLUDED.verified_at,
        verification_provider = EXCLUDED.verification_provider,
        updated_at = EXCLUDED.updated_at,
        is_demo = EXCLUDED.is_demo
    `,
      [
        code.id,
        code.game_id,
        code.code,
        code.reward,
        code.status,
        code.expired_at || null,
        code.source || 'Official',
        code.last_checked,
        code.verified_at || now,
        code.verification_provider || 'ManualProvider',
        code.created_at,
        code.updated_at,
        code.is_demo ? 1 : 0,
      ]
    );
    return code;
  }

  async updateRedeemCode(id: string, updates: Partial<RedeemCode>): Promise<void> {
    const existing = await this.getRedeemCodeById(id);
    if (!existing) throw new Error('Redeem code not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    await this.pool.query(
      `
      UPDATE redeem_codes SET
        game_id = $1, code = $2, reward = $3, status = $4, expired_at = $5,
        source = $6, last_checked = $7, verified_at = $8, verification_provider = $9, updated_at = $10
      WHERE id = $11
    `,
      [
        merged.game_id,
        merged.code,
        merged.reward,
        merged.status,
        merged.expired_at || null,
        merged.source || null,
        merged.last_checked,
        merged.verified_at || merged.last_checked,
        merged.verification_provider || 'ManualProvider',
        merged.updated_at,
        id,
      ]
    );
  }

  async deleteRedeemCode(id: string): Promise<void> {
    await this.pool.query('DELETE FROM redeem_codes WHERE id = $1', [id]);
  }

  async getEvents(options?: { gameId?: string; status?: string }): Promise<(EventItem & { game_name?: string; game_slug?: string })[]> {
    let query = `
      SELECT ev.*, g.name as game_name, g.slug as game_slug
      FROM events ev
      LEFT JOIN games g ON ev.game_id = g.id
    `;
    const params: any[] = [];
    const whereClauses: string[] = [];
    if (options?.gameId) {
      params.push(options.gameId);
      whereClauses.push(`ev.game_id = $${params.length}`);
    }
    if (options?.status) {
      params.push(options.status);
      whereClauses.push(`ev.status = $${params.length}`);
    }
    if (isProductionMode()) {
      whereClauses.push('(ev.is_demo = 0 OR ev.is_demo IS NULL)');
    }
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }
    query += " ORDER BY CASE WHEN ev.status = 'ACTIVE' THEN 0 WHEN ev.status = 'UPCOMING' THEN 1 ELSE 2 END, ev.start_date DESC";
    const res = await this.pool.query(query, params);
    return res.rows.map((ev) => ({
      ...ev,
      image: ev.image || ev.banner_image || '',
      banner_image: ev.banner_image || ev.image || '',
      rewards: safeJsonParse(ev.rewards, []),
      is_demo: Boolean(ev.is_demo),
    }));
  }

  async insertEventItem(data: Omit<EventItem, 'created_at' | 'updated_at'>): Promise<EventItem> {
    const now = new Date().toISOString();
    const ev: EventItem = {
      ...data,
      created_at: now,
      updated_at: now,
      is_demo: data.is_demo ?? false,
    };
    await this.pool.query(
      `
      INSERT INTO events (
        id, game_id, title, slug, description, type,
        start_date, end_date, rewards, banner_image, created_at, updated_at, is_demo
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET
        game_id = EXCLUDED.game_id,
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        description = EXCLUDED.description,
        type = EXCLUDED.type,
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date,
        rewards = EXCLUDED.rewards,
        banner_image = EXCLUDED.banner_image,
        updated_at = EXCLUDED.updated_at,
        is_demo = EXCLUDED.is_demo
    `,
      [
        ev.id,
        ev.game_id,
        ev.title,
        ev.slug || ev.id,
        ev.description,
        ev.type || 'EVENT',
        ev.start_date,
        ev.end_date,
        JSON.stringify(ev.rewards || []),
        ev.banner_image || ev.image || '',
        ev.created_at,
        ev.updated_at,
        ev.is_demo ? 1 : 0,
      ]
    );
    return ev;
  }

  async deleteEventItem(id: string): Promise<void> {
    await this.pool.query('DELETE FROM events WHERE id = $1', [id]);
  }

  async getItems(gameId?: string): Promise<Item[]> {
    let query = 'SELECT * FROM items';
    const params: any[] = [];
    const conditions: string[] = [];
    if (gameId) {
      params.push(gameId);
      conditions.push(`game_id = $${params.length}`);
    }
    if (isProductionMode()) {
      conditions.push('(is_demo = 0 OR is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY rarity DESC, name ASC';
    const res = await this.pool.query(query, params);
    return res.rows.map(mapItem);
  }

  async getItemById(id: string): Promise<Item | null> {
    const res = await this.pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return res.rows.length > 0 ? mapItem(res.rows[0]) : null;
  }

  async getItemBySlug(slug: string, gameSlug?: string): Promise<Item | null> {
    let query = `
      SELECT it.*, g.slug as game_slug
      FROM items it
      LEFT JOIN games g ON it.game_id = g.id
      WHERE it.slug = $1
    `;
    const params: any[] = [slug];
    if (gameSlug) {
      params.push(gameSlug);
      query += ` AND g.slug = $${params.length}`;
    }
    if (isProductionMode()) {
      query += ' AND (it.is_demo = 0 OR it.is_demo IS NULL)';
    }
    const res = await this.pool.query(query, params);
    return res.rows.length > 0 ? mapItem(res.rows[0]) : null;
  }

  async insertItem(data: Omit<Item, 'created_at' | 'updated_at'>): Promise<Item> {
    const now = new Date().toISOString();
    const item: Item = {
      ...data,
      created_at: now,
      updated_at: now,
      is_demo: data.is_demo ?? false,
    };
    await this.pool.query(
      `
      INSERT INTO items (
        id, game_id, name, slug, type, rarity, icon, description, stats, how_to_get, created_at, updated_at, is_demo
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET
        game_id = EXCLUDED.game_id,
        name = EXCLUDED.name,
        slug = EXCLUDED.slug,
        type = EXCLUDED.type,
        rarity = EXCLUDED.rarity,
        icon = EXCLUDED.icon,
        description = EXCLUDED.description,
        stats = EXCLUDED.stats,
        how_to_get = EXCLUDED.how_to_get,
        updated_at = EXCLUDED.updated_at,
        is_demo = EXCLUDED.is_demo
    `,
      [
        item.id,
        item.game_id,
        item.name,
        item.slug,
        item.type,
        item.rarity,
        item.icon,
        item.description,
        JSON.stringify(item.stats || {}),
        item.how_to_get,
        item.created_at,
        item.updated_at,
        item.is_demo ? 1 : 0,
      ]
    );
    return item;
  }

  async updateItem(id: string, updates: Partial<Item>): Promise<void> {
    const existing = await this.getItemById(id);
    if (!existing) throw new Error('Item not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    await this.pool.query(
      `
      UPDATE items SET
        game_id = $1, name = $2, slug = $3, type = $4, rarity = $5, icon = $6,
        description = $7, stats = $8, how_to_get = $9, updated_at = $10, is_demo = $11
      WHERE id = $12
    `,
      [
        merged.game_id,
        merged.name,
        merged.slug,
        merged.type,
        merged.rarity,
        merged.icon,
        merged.description,
        JSON.stringify(merged.stats || {}),
        merged.how_to_get,
        merged.updated_at,
        merged.is_demo ? 1 : 0,
        id,
      ]
    );
  }

  async deleteItem(id: string): Promise<void> {
    await this.pool.query('DELETE FROM items WHERE id = $1', [id]);
  }

  async getTierLists(gameIdOrSlug?: string): Promise<TierList[]> {
    let query = `
      SELECT tl.*, g.name as game_name, g.slug as game_slug
      FROM tier_lists tl
      LEFT JOIN games g ON tl.game_id = g.id
    `;
    const params: any[] = [];
    const conditions: string[] = [];
    if (gameIdOrSlug) {
      params.push(gameIdOrSlug);
      conditions.push(`(tl.game_id = $${params.length} OR g.slug = $${params.length})`);
    }
    if (isProductionMode()) {
      conditions.push('(tl.is_demo = 0 OR tl.is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY tl.updated_at DESC';
    const res = await this.pool.query(query, params);
    return res.rows.map(mapTierList);
  }

  async getTierListBySlug(slug: string): Promise<TierList | null> {
    let query = `
      SELECT tl.*, g.name as game_name, g.slug as game_slug
      FROM tier_lists tl
      LEFT JOIN games g ON tl.game_id = g.id
      WHERE tl.slug = $1
    `;
    if (isProductionMode()) {
      query += ' AND (tl.is_demo = 0 OR tl.is_demo IS NULL)';
    }
    const res = await this.pool.query(query, [slug]);
    return res.rows.length > 0 ? mapTierList(res.rows[0]) : null;
  }

  async getAdSlots(): Promise<AdSlotConfig[]> {
    const res = await this.pool.query('SELECT * FROM ad_slots ORDER BY slot_type ASC');
    return res.rows.map(mapAdSlot);
  }

  async getAdSlotById(id: string): Promise<AdSlotConfig | null> {
    const res = await this.pool.query('SELECT * FROM ad_slots WHERE id = $1', [id]);
    return res.rows.length > 0 ? mapAdSlot(res.rows[0]) : null;
  }

  async updateAdSlot(id: string, updates: Partial<AdSlotConfig>): Promise<void> {
    const existing = await this.getAdSlotById(id);
    if (!existing) throw new Error('Ad slot not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    await this.pool.query(
      `
      UPDATE ad_slots SET
        is_active = $1, image_url = $2, target_url = $3, label = $4, updated_at = $5
      WHERE id = $6
    `,
      [
        merged.is_active ? 1 : 0,
        merged.image_url || null,
        merged.target_url || null,
        merged.label || null,
        merged.updated_at,
        id,
      ]
    );
  }

  async getPopularGames(limit = 5): Promise<Game[]> {
    let query = "SELECT * FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')";
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    query += ` ORDER BY views DESC, rating DESC LIMIT ${Number(limit)}`;
    const res = await this.pool.query(query);
    return res.rows.map(mapGame);
  }

  async getPopularGuides(limit = 5): Promise<Guide[]> {
    let query = `
      SELECT gu.*, g.slug as game_slug
      FROM guides gu
      LEFT JOIN games g ON gu.game_id = g.id
      WHERE gu.status = 'PUBLISHED'
    `;
    if (isProductionMode()) {
      query += ' AND (gu.is_demo = 0 OR gu.is_demo IS NULL)';
    }
    query += ` ORDER BY gu.views DESC LIMIT ${Number(limit)}`;
    const res = await this.pool.query(query);
    return res.rows.map(mapGuide);
  }

  async getPopularCharacters(limit = 5): Promise<Character[]> {
    let query = `
      SELECT c.*, g.slug as game_slug
      FROM characters c
      LEFT JOIN games g ON c.game_id = g.id
      WHERE c.status = 'PUBLISHED'
    `;
    if (isProductionMode()) {
      query += ' AND (c.is_demo = 0 OR c.is_demo IS NULL)';
    }
    query += ` ORDER BY c.views DESC LIMIT ${Number(limit)}`;
    const res = await this.pool.query(query);
    return res.rows.map(mapCharacter);
  }

  async getPopularNews(limit = 5): Promise<News[]> {
    let query = `
      SELECT nw.*, g.slug as game_slug
      FROM news nw
      LEFT JOIN games g ON nw.game_id = g.id
      WHERE nw.status = 'PUBLISHED'
    `;
    if (isProductionMode()) {
      query += ' AND (nw.is_demo = 0 OR nw.is_demo IS NULL)';
    }
    query += ` ORDER BY nw.views DESC LIMIT ${Number(limit)}`;
    const res = await this.pool.query(query);
    return res.rows.map(mapNews);
  }

  async incrementViews(table: 'games' | 'characters' | 'guides' | 'news', idOrSlug: string): Promise<void> {
    try {
      await this.pool.query(
        `UPDATE ${table} SET views = COALESCE(views, 0) + 1 WHERE id = $1 OR slug = $2`,
        [idOrSlug, idOrSlug]
      );
    } catch (err) {
      console.error(`Error incrementing views on ${table} (Postgres):`, err);
    }
  }

  async searchAll(query: string): Promise<GlobalSearchResult> {
    const rawTerm = query.trim();
    const term = `%${rawTerm}%`;
    const prefixTerm = `${rawTerm}%`;
    const prodFilter = isProductionMode();

    const gamesQuery = `
      SELECT * FROM games
      WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')
        ${prodFilter ? 'AND (is_demo = 0 OR is_demo IS NULL)' : ''}
        AND (name ILIKE $1 OR description ILIKE $2 OR developer ILIKE $3 OR genres ILIKE $4 OR slug ILIKE $5)
      ORDER BY
        CASE
          WHEN LOWER(name) = LOWER($6) THEN 1
          WHEN LOWER(name) LIKE LOWER($7) THEN 2
          WHEN LOWER(slug) LIKE LOWER($8) THEN 3
          ELSE 4
        END ASC, rating DESC
      LIMIT 10
    `;
    const gamesRes = await this.pool.query(gamesQuery, [
      term,
      term,
      term,
      term,
      term,
      rawTerm,
      prefixTerm,
      term,
    ]);
    const games = gamesRes.rows.map(mapGame);

    const charsQuery = `
      SELECT c.*, g.name as game_name, g.slug as game_slug
      FROM characters c
      LEFT JOIN games g ON c.game_id = g.id
      WHERE c.status = 'PUBLISHED'
        ${prodFilter ? 'AND (c.is_demo = 0 OR c.is_demo IS NULL)' : ''}
        AND (c.name ILIKE $1 OR c.description ILIKE $2 OR c.role ILIKE $3 OR c.element ILIKE $4 OR c.slug ILIKE $5)
      ORDER BY
        CASE
          WHEN LOWER(c.name) = LOWER($6) THEN 1
          WHEN LOWER(c.name) LIKE LOWER($7) THEN 2
          WHEN LOWER(c.slug) LIKE LOWER($8) THEN 3
          ELSE 4
        END ASC, c.rarity DESC
      LIMIT 15
    `;
    const charsRes = await this.pool.query(charsQuery, [
      term,
      term,
      term,
      term,
      term,
      rawTerm,
      prefixTerm,
      term,
    ]);
    const characters = charsRes.rows.map((r: any) => ({
      ...mapCharacter(r),
      game_name: r.game_name,
      game_slug: r.game_slug,
    }));

    const guidesQuery = `
      SELECT gu.*, g.name as game_name, g.slug as game_slug
      FROM guides gu
      LEFT JOIN games g ON gu.game_id = g.id
      WHERE gu.status = 'PUBLISHED'
        ${prodFilter ? 'AND (gu.is_demo = 0 OR gu.is_demo IS NULL)' : ''}
        AND (gu.title ILIKE $1 OR gu.excerpt ILIKE $2 OR gu.tags ILIKE $3 OR gu.category ILIKE $4 OR gu.slug ILIKE $5 OR gu.content ILIKE $6)
      ORDER BY
        CASE
          WHEN LOWER(gu.title) = LOWER($7) THEN 1
          WHEN LOWER(gu.title) LIKE LOWER($8) THEN 2
          WHEN LOWER(gu.slug) LIKE LOWER($9) THEN 3
          ELSE 4
        END ASC, gu.created_at DESC
      LIMIT 15
    `;
    const guidesRes = await this.pool.query(guidesQuery, [
      term,
      term,
      term,
      term,
      term,
      term,
      rawTerm,
      prefixTerm,
      term,
    ]);
    const guides = guidesRes.rows.map((r: any) => ({
      ...mapGuide(r),
      game_name: r.game_name,
      game_slug: r.game_slug,
    }));

    const newsQuery = `
      SELECT nw.*, g.name as game_name
      FROM news nw
      LEFT JOIN games g ON nw.game_id = g.id
      WHERE nw.status = 'PUBLISHED'
        ${prodFilter ? 'AND (nw.is_demo = 0 OR nw.is_demo IS NULL)' : ''}
        AND (nw.title ILIKE $1 OR nw.excerpt ILIKE $2 OR nw.tags ILIKE $3 OR nw.category ILIKE $4 OR nw.slug ILIKE $5)
      ORDER BY
        CASE
          WHEN LOWER(nw.title) = LOWER($6) THEN 1
          WHEN LOWER(nw.title) LIKE LOWER($7) THEN 2
          WHEN LOWER(nw.slug) LIKE LOWER($8) THEN 3
          ELSE 4
        END ASC, nw.created_at DESC
      LIMIT 15
    `;
    const newsRes = await this.pool.query(newsQuery, [
      term,
      term,
      term,
      term,
      term,
      rawTerm,
      prefixTerm,
      term,
    ]);
    const news = newsRes.rows.map((r: any) => ({
      ...mapNews(r),
      game_name: r.game_name,
    }));

    const itemsQuery = `
      SELECT it.*, g.name as game_name
      FROM items it
      LEFT JOIN games g ON it.game_id = g.id
      WHERE (1=1)
        ${prodFilter ? 'AND (it.is_demo = 0 OR it.is_demo IS NULL)' : ''}
        AND (it.name ILIKE $1 OR it.description ILIKE $2 OR it.type ILIKE $3 OR it.slug ILIKE $4)
      ORDER BY
        CASE
          WHEN LOWER(it.name) = LOWER($5) THEN 1
          WHEN LOWER(it.name) LIKE LOWER($6) THEN 2
          WHEN LOWER(it.slug) LIKE LOWER($7) THEN 3
          ELSE 4
        END ASC, it.rarity DESC
      LIMIT 15
    `;
    const itemsRes = await this.pool.query(itemsQuery, [
      term,
      term,
      term,
      term,
      rawTerm,
      prefixTerm,
      term,
    ]);
    const items = itemsRes.rows.map((r: any) => ({
      ...mapItem(r),
      game_name: r.game_name,
    }));

    const codesQuery = `
      SELECT rc.*, g.name as game_name
      FROM redeem_codes rc
      LEFT JOIN games g ON rc.game_id = g.id
      WHERE (1=1)
        ${prodFilter ? 'AND (rc.is_demo = 0 OR rc.is_demo IS NULL)' : ''}
        AND (rc.code ILIKE $1 OR rc.reward ILIKE $2)
      ORDER BY
        CASE
          WHEN LOWER(rc.code) = LOWER($3) THEN 1
          WHEN LOWER(rc.code) LIKE LOWER($4) THEN 2
          ELSE 3
        END ASC,
        CASE WHEN rc.status = 'ACTIVE' THEN 0 ELSE 1 END ASC
      LIMIT 10
    `;
    const codesRes = await this.pool.query(codesQuery, [term, term, rawTerm, prefixTerm]);
    const redeem_codes = codesRes.rows.map((rc: any) => ({
      ...rc,
      verified_at: rc.verified_at || rc.last_checked,
    }));

    return {
      games,
      characters,
      guides,
      news,
      items,
      redeem_codes,
    };
  }

  async getAdminUser(username: string): Promise<AdminUser | null> {
    const res = await this.pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    return res.rows.length > 0 ? (res.rows[0] as AdminUser) : null;
  }

  async syncAdminUserFromEnv(): Promise<void> {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'seraphi_Secur3_2026_Prod!';
    const passwordHash = hashPassword(password);
    await this.pool.query(
      `
      INSERT INTO admin_users (id, username, password_hash, role, created_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash
    `,
      ['admin-1', username, passwordHash, 'superadmin', new Date().toISOString()]
    );
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const [
      gamesCountRes,
      charsCountRes,
      guidesCountRes,
      newsCountRes,
      codesCountRes,
      eventsCountRes,
      publishedGamesRes,
      publishedCharsRes,
      publishedGuidesRes,
      publishedNewsRes,
      activeCodesRes,
      upcomingEventsRes,
      draftGuidesRes,
      gameViewsRes,
      charViewsRes,
      guideViewsRes,
      newsViewsRes,
      recentGuidesRes,
      recentNewsRes,
      recentGamesRes,
    ] = await Promise.all([
      this.pool.query('SELECT COUNT(*) as count FROM games'),
      this.pool.query('SELECT COUNT(*) as count FROM characters'),
      this.pool.query('SELECT COUNT(*) as count FROM guides'),
      this.pool.query('SELECT COUNT(*) as count FROM news'),
      this.pool.query('SELECT COUNT(*) as count FROM redeem_codes'),
      this.pool.query('SELECT COUNT(*) as count FROM events'),
      this.pool.query("SELECT COUNT(*) as count FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')"),
      this.pool.query("SELECT COUNT(*) as count FROM characters WHERE status = 'PUBLISHED'"),
      this.pool.query("SELECT COUNT(*) as count FROM guides WHERE status = 'PUBLISHED'"),
      this.pool.query("SELECT COUNT(*) as count FROM news WHERE status = 'PUBLISHED'"),
      this.pool.query("SELECT COUNT(*) as count FROM redeem_codes WHERE status = 'ACTIVE'"),
      this.pool.query("SELECT COUNT(*) as count FROM events WHERE status = 'ACTIVE'"),
      this.pool.query("SELECT COUNT(*) as count FROM guides WHERE status IN ('DRAFT', 'REVIEW')"),
      this.pool.query('SELECT COALESCE(SUM(views), 0) as total FROM games'),
      this.pool.query('SELECT COALESCE(SUM(views), 0) as total FROM characters'),
      this.pool.query('SELECT COALESCE(SUM(views), 0) as total FROM guides'),
      this.pool.query('SELECT COALESCE(SUM(views), 0) as total FROM news'),
      this.pool.query("SELECT id, title, slug, updated_at, 'guide' as type FROM guides ORDER BY updated_at DESC LIMIT 5"),
      this.pool.query("SELECT id, title, slug, updated_at, 'news' as type FROM news ORDER BY updated_at DESC LIMIT 5"),
      this.pool.query("SELECT id, name as title, slug, updated_at, 'game' as type FROM games ORDER BY updated_at DESC LIMIT 5"),
    ]);

    const gamesCount = Number(gamesCountRes.rows[0]?.count || 0);
    const charsCount = Number(charsCountRes.rows[0]?.count || 0);
    const guidesCount = Number(guidesCountRes.rows[0]?.count || 0);
    const newsCount = Number(newsCountRes.rows[0]?.count || 0);
    const codesCount = Number(codesCountRes.rows[0]?.count || 0);
    const eventsCount = Number(eventsCountRes.rows[0]?.count || 0);

    const publishedGames = Number(publishedGamesRes.rows[0]?.count || 0);
    const publishedChars = Number(publishedCharsRes.rows[0]?.count || 0);
    const publishedGuides = Number(publishedGuidesRes.rows[0]?.count || 0);
    const publishedNews = Number(publishedNewsRes.rows[0]?.count || 0);
    const activeCodes = Number(activeCodesRes.rows[0]?.count || 0);
    const upcomingEvents = Number(upcomingEventsRes.rows[0]?.count || 0);
    const draftGuides = Number(draftGuidesRes.rows[0]?.count || 0);

    const totalViews =
      Number(gameViewsRes.rows[0]?.total || 0) +
      Number(charViewsRes.rows[0]?.total || 0) +
      Number(guideViewsRes.rows[0]?.total || 0) +
      Number(newsViewsRes.rows[0]?.total || 0);

    const allRecent = [
      ...recentGuidesRes.rows,
      ...recentNewsRes.rows,
      ...recentGamesRes.rows,
    ];
    const recentlyUpdated = allRecent
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 8);

    return {
      gamesCount,
      charsCount,
      guidesCount,
      newsCount,
      codesCount,
      eventsCount,
      publishedGames,
      publishedChars,
      publishedGuides,
      publishedNews,
      activeCodes,
      upcomingEvents,
      draftGuides,
      recentlyUpdated,
      totalGames: gamesCount,
      totalCharacters: charsCount,
      totalGuides: guidesCount,
      totalNews: newsCount,
      totalRedeemCodes: codesCount,
      activeRedeemCodes: activeCodes,
      totalEvents: eventsCount,
      activeEvents: upcomingEvents,
      totalViews,
    };
  }

  async getProductionContentStats(): Promise<ProductionContentStats> {
    const [gamesRes, charsRes, guidesRes, newsRes, itemsRes, codesRes, eventsRes] = await Promise.all([
      this.pool.query(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
          SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
          SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
          SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
          SUM(CASE WHEN status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED') AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
        FROM games
      `),
      this.pool.query(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
          SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
          SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
          SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
          SUM(CASE WHEN status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
        FROM characters
      `),
      this.pool.query(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
          SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
          SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
          SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
          SUM(CASE WHEN status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
        FROM guides
      `),
      this.pool.query(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
          SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
          SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
          SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
          SUM(CASE WHEN status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
        FROM news
      `),
      this.pool.query(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
          SUM(CASE WHEN (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
        FROM items
      `),
      this.pool.query(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
          SUM(CASE WHEN (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
        FROM redeem_codes
      `),
      this.pool.query(`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
          SUM(CASE WHEN (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
        FROM events
      `),
    ]);

    const g = gamesRes.rows[0] || {};
    const c = charsRes.rows[0] || {};
    const gu = guidesRes.rows[0] || {};
    const n = newsRes.rows[0] || {};
    const it = itemsRes.rows[0] || {};
    const rc = codesRes.rows[0] || {};
    const ev = eventsRes.rows[0] || {};

    const published_real =
      Number(g.published_prod_count || 0) +
      Number(c.published_prod_count || 0) +
      Number(gu.published_prod_count || 0) +
      Number(n.published_prod_count || 0) +
      Number(it.published_prod_count || 0) +
      Number(rc.published_prod_count || 0) +
      Number(ev.published_prod_count || 0);

    const published_demo =
      Number(g.demo_count || 0) +
      Number(c.demo_count || 0) +
      Number(gu.demo_count || 0) +
      Number(n.demo_count || 0) +
      Number(it.demo_count || 0) +
      Number(rc.demo_count || 0) +
      Number(ev.demo_count || 0);

    const draft =
      Number(g.draft_count || 0) +
      Number(c.draft_count || 0) +
      Number(gu.draft_count || 0) +
      Number(n.draft_count || 0);

    const review =
      Number(g.review_count || 0) +
      Number(c.review_count || 0) +
      Number(gu.review_count || 0) +
      Number(n.review_count || 0);

    const archived =
      Number(g.archived_count || 0) +
      Number(c.archived_count || 0) +
      Number(gu.archived_count || 0) +
      Number(n.archived_count || 0);

    return {
      published_real,
      published_demo,
      draft,
      review,
      archived,
      has_demo_warning: published_demo > 0,
      games: { total: Number(g.total || 0), demo_count: Number(g.demo_count || 0), published_prod_count: Number(g.published_prod_count || 0) },
      characters: { total: Number(c.total || 0), demo_count: Number(c.demo_count || 0), published_prod_count: Number(c.published_prod_count || 0) },
      guides: { total: Number(gu.total || 0), demo_count: Number(gu.demo_count || 0), published_prod_count: Number(gu.published_prod_count || 0) },
      news: { total: Number(n.total || 0), demo_count: Number(n.demo_count || 0), published_prod_count: Number(n.published_prod_count || 0) },
      items: { total: Number(it.total || 0), demo_count: Number(it.demo_count || 0), published_prod_count: Number(it.published_prod_count || 0) },
      redeem_codes: { total: Number(rc.total || 0), demo_count: Number(rc.demo_count || 0), published_prod_count: Number(rc.published_prod_count || 0) },
      events: { total: Number(ev.total || 0), demo_count: Number(ev.demo_count || 0), published_prod_count: Number(ev.published_prod_count || 0) },
    };
  }

  async toggleDemoStatus(
    table: 'games' | 'characters' | 'guides' | 'news' | 'items' | 'redeem_codes' | 'events',
    id: string
  ): Promise<boolean> {
    const res = await this.pool.query(`SELECT is_demo FROM ${table} WHERE id = $1`, [id]);
    if (res.rows.length === 0) throw new Error('Record not found');
    const newStatus = res.rows[0].is_demo === 1 ? 0 : 1;
    await this.pool.query(`UPDATE ${table} SET is_demo = $1 WHERE id = $2`, [newStatus, id]);
    return newStatus === 1;
  }

  async insertContactMessage(msg: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ContactMessage> {
    const id = `msg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const now = new Date().toISOString();
    const entry: ContactMessage = {
      id,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      status: 'UNREAD',
      created_at: now,
    };
    await this.pool.query(
      `
      INSERT INTO contact_messages (id, name, email, subject, message, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [entry.id, entry.name, entry.email, entry.subject, entry.message, entry.status, entry.created_at]
    );
    return entry;
  }

  async getContactMessages(status?: string): Promise<ContactMessage[]> {
    let query = 'SELECT * FROM contact_messages';
    const params: any[] = [];
    if (status) {
      params.push(status);
      query += ' WHERE status = $1';
    }
    query += ' ORDER BY created_at DESC';
    const res = await this.pool.query(query, params);
    return res.rows as ContactMessage[];
  }

  async updateContactMessageStatus(id: string, status: 'UNREAD' | 'READ' | 'ARCHIVED'): Promise<void> {
    await this.pool.query('UPDATE contact_messages SET status = $1 WHERE id = $2', [status, id]);
  }

  async deleteContactMessage(id: string): Promise<void> {
    await this.pool.query('DELETE FROM contact_messages WHERE id = $1', [id]);
  }
}

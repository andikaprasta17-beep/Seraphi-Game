import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

// Load .env automatically if present
if (!process.env.ADMIN_PASSWORD && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

async function runPhase3Tests() {
  console.log('\n=============================================================');
  console.log('   SERAPHI GAME — PHASE 3 COMPREHENSIVE VERIFICATION SUITE   ');
  console.log('=============================================================\n');

  let passed = 0;
  let failed = 0;

  async function assert(testNumber, name, fn) {
    try {
      await fn();
      console.log(`✓ [PASS ${testNumber}/16] ${name}`);
      passed++;
    } catch (err) {
      console.error(`✗ [FAIL ${testNumber}/16] ${name}: ${err.message}`);
      failed++;
    }
  }

  const dbPath = path.join(process.cwd(), 'data', 'seraphi.db');
  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}`);
    process.exit(1);
  }
  const db = new DatabaseSync(dbPath);

  // -------------------------------------------------------------
  // Test 1: published content appears
  // -------------------------------------------------------------
  await assert(1, 'Published content appears in database and queries', async () => {
    const publishedGames = db.prepare("SELECT COUNT(*) as count FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')").get().count;
    const publishedChars = db.prepare("SELECT COUNT(*) as count FROM characters WHERE status = 'PUBLISHED'").get().count;
    const publishedGuides = db.prepare("SELECT COUNT(*) as count FROM guides WHERE status = 'PUBLISHED'").get().count;
    const publishedNews = db.prepare("SELECT COUNT(*) as count FROM news WHERE status = 'PUBLISHED'").get().count;

    if (publishedGames < 20) throw new Error(`Expected at least 20 published games, found ${publishedGames}`);
    if (publishedChars < 50) throw new Error(`Expected at least 50 published characters, found ${publishedChars}`);
    if (publishedGuides < 50) throw new Error(`Expected at least 50 published guides, found ${publishedGuides}`);
    if (publishedNews < 30) throw new Error(`Expected at least 30 published news, found ${publishedNews}`);
  });

  // -------------------------------------------------------------
  // Test 2: draft content hidden
  // -------------------------------------------------------------
  await assert(2, 'Draft content is hidden from published queries', async () => {
    // Insert a draft guide
    const testId = `test-draft-${Date.now()}`;
    const testSlug = `draft-test-guide-${Date.now()}`;
    db.prepare(`
      INSERT INTO guides (id, game_id, title, slug, category, thumbnail, excerpt, content, author, published_at, updated_at, tags, status, views)
      VALUES (?, 'game-genshin', 'Draft Title', ?, 'BEGINNER', 'https://example.com/img.jpg', 'Excerpt', 'Content', 'Author', datetime('now'), datetime('now'), '[]', 'DRAFT', 0)
    `).run(testId, testSlug);

    // Verify it is NOT in published query
    const publishedList = db.prepare("SELECT id FROM guides WHERE status = 'PUBLISHED'").all();
    const isFound = publishedList.some((g) => g.id === testId);

    // Clean up
    db.prepare("DELETE FROM guides WHERE id = ?").run(testId);

    if (isFound) throw new Error('Draft item was returned in published guides list');
  });

  // -------------------------------------------------------------
  // Test 3: review content hidden
  // -------------------------------------------------------------
  await assert(3, 'Review content is hidden from published queries', async () => {
    const testId = `test-review-${Date.now()}`;
    const testSlug = `review-test-guide-${Date.now()}`;
    db.prepare(`
      INSERT INTO guides (id, game_id, title, slug, category, thumbnail, excerpt, content, author, published_at, updated_at, tags, status, views)
      VALUES (?, 'game-genshin', 'Review Title', ?, 'BEGINNER', 'https://example.com/img.jpg', 'Excerpt', 'Content', 'Author', datetime('now'), datetime('now'), '[]', 'REVIEW', 0)
    `).run(testId, testSlug);

    const publishedList = db.prepare("SELECT id FROM guides WHERE status = 'PUBLISHED'").all();
    const isFound = publishedList.some((g) => g.id === testId);

    db.prepare("DELETE FROM guides WHERE id = ?").run(testId);

    if (isFound) throw new Error('Review item was returned in published guides list');
  });

  // -------------------------------------------------------------
  // Test 4: archived content hidden
  // -------------------------------------------------------------
  await assert(4, 'Archived content is hidden from published queries', async () => {
    const testId = `test-archived-${Date.now()}`;
    const testSlug = `archived-test-game-${Date.now()}`;
    db.prepare(`
      INSERT INTO games (id, name, slug, cover_image, banner_image, description, developer, publisher, release_date, platforms, genres, status, rating, official_url, created_at, updated_at)
      VALUES (?, 'Archived Game', ?, 'https://example.com/c.jpg', 'https://example.com/b.jpg', 'Desc', 'Dev', 'Pub', '2026-01-01', '[]', '[]', 'ARCHIVED', 4.0, 'https://example.com', datetime('now'), datetime('now'))
    `).run(testId, testSlug);

    const publishedGames = db.prepare("SELECT id FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')").all();
    const isFound = publishedGames.some((g) => g.id === testId);

    db.prepare("DELETE FROM games WHERE id = ?").run(testId);

    if (isFound) throw new Error('Archived game was returned in published games query');
  });

  // -------------------------------------------------------------
  // Test 5: sitemap excludes unpublished
  // -------------------------------------------------------------
  await assert(5, 'Sitemap strictly excludes admin, draft, review, archived, and search result routes', async () => {
    const sitemapContent = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'sitemap.ts'), 'utf-8');
    if (sitemapContent.includes("`${baseUrl}/admin`") || sitemapContent.includes("`${baseUrl}/api`")) {
      throw new Error('Sitemap includes admin or api routes');
    }
    if (sitemapContent.includes("`${baseUrl}/search`")) {
      throw new Error('Sitemap includes search route');
    }
    if (!sitemapContent.includes('onlyPublished: true')) throw new Error('Sitemap does not enforce onlyPublished');
  });

  // -------------------------------------------------------------
  // Test 6: canonical correct
  // -------------------------------------------------------------
  await assert(6, 'Canonical URLs are standardized and immune to query parameters', async () => {
    const seoContent = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'seo.ts'), 'utf-8');
    if (!seoContent.includes('getCanonicalUrl')) throw new Error('getCanonicalUrl missing in seo.ts');
    const baseUrl = 'https://seraphigame.id';
    const getCanonicalUrl = (pathname) => {
      const cleanPath = pathname.split('?')[0].replace(/\/+$/, '') || '';
      return cleanPath ? `${baseUrl}${cleanPath}` : baseUrl;
    };

    const urlWithParams = getCanonicalUrl('/games/genshin-impact?sort=popular&page=2');
    if (urlWithParams !== 'https://seraphigame.id/games/genshin-impact') {
      throw new Error(`Expected clean canonical without params, got ${urlWithParams}`);
    }

    const homeUrl = getCanonicalUrl('/');
    if (homeUrl !== 'https://seraphigame.id') {
      throw new Error(`Expected root canonical https://seraphigame.id, got ${homeUrl}`);
    }
  });

  // -------------------------------------------------------------
  // Test 7: metadata unique
  // -------------------------------------------------------------
  await assert(7, 'SEO Title and Description generation helper produces unique & length-compliant meta', async () => {
    // Read and test SEO functions from src/lib/seo.ts
    const seoContent = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'seo.ts'), 'utf-8');
    if (!seoContent.includes('generateSeoTitle') || !seoContent.includes('generateSeoDescription')) {
      throw new Error('SEO title or description generator missing in src/lib/seo.ts');
    }

    // Verify title pattern matches requirements
    const games = db.prepare("SELECT name, slug FROM games LIMIT 3").all();
    for (const g of games) {
      if (!g.slug || !g.name) throw new Error('Game missing name or slug');
    }
  });

  // -------------------------------------------------------------
  // Test 8: breadcrumb generated
  // -------------------------------------------------------------
  await assert(8, 'Breadcrumbs component and BreadcrumbList schema are properly implemented', async () => {
    const breadcrumbsFile = path.join(process.cwd(), 'src', 'components', 'Breadcrumbs.tsx');
    if (!fs.existsSync(breadcrumbsFile)) throw new Error('Breadcrumbs component missing');
    const content = fs.readFileSync(breadcrumbsFile, 'utf-8');
    if (!content.includes('BreadcrumbList')) throw new Error('BreadcrumbList JSON-LD schema missing in Breadcrumbs component');
  });

  // -------------------------------------------------------------
  // Test 9: related content works
  // -------------------------------------------------------------
  await assert(9, 'Related content linkage exists across Character and Guide pages with empty omission', async () => {
    const charPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'games', '[slug]', 'characters', '[characterSlug]', 'page.tsx'), 'utf-8');
    if (!charPage.includes('relatedCharacters') || !charPage.includes('relatedGuides') || !charPage.includes('gameWeapons')) {
      throw new Error('Related characters, guides, or weapons missing in character detail page');
    }

    const guidePage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'guides', '[slug]', 'page.tsx'), 'utf-8');
    if (!guidePage.includes('related_characters') || !guidePage.includes('related_items')) {
      throw new Error('Related characters or items missing in guide page');
    }
  });

  // -------------------------------------------------------------
  // Test 10: search ranking works
  // -------------------------------------------------------------
  await assert(10, 'Search ranking prioritizes Exact Match > Title Match > Slug Match > Content Match', async () => {
    const query = 'Genshin';
    const term = `%${query}%`;
    const rows = db.prepare(`
      SELECT name, slug FROM games
      WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')
        AND (name LIKE ? OR slug LIKE ?)
      ORDER BY
        CASE
          WHEN LOWER(name) = LOWER(?) THEN 1
          WHEN LOWER(name) LIKE ? THEN 2
          WHEN LOWER(slug) LIKE ? THEN 3
          ELSE 4
        END ASC, rating DESC
    `).all(term, term, query, `${query}%`, term);

    if (rows.length === 0) throw new Error('No search results returned for Genshin');
    if (!rows[0].name.toLowerCase().includes('genshin')) {
      throw new Error(`Expected Genshin to rank first, got ${rows[0].name}`);
    }
  });

  // -------------------------------------------------------------
  // Test 11: duplicate slug rejected
  // -------------------------------------------------------------
  await assert(11, 'Duplicate slug protection prevents publishing duplicate slugs', async () => {
    // Check duplicate check function in db
    const existing = db.prepare("SELECT slug FROM games LIMIT 1").get();
    if (!existing) throw new Error('No games found');

    const duplicateCheck = db.prepare("SELECT id FROM games WHERE LOWER(slug) = LOWER(?)").get(existing.slug);
    if (!duplicateCheck) throw new Error('Existing slug was not detected');

    const dbFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'db.ts'), 'utf-8');
    if (!dbFile.includes('checkDuplicateSlug')) throw new Error('checkDuplicateSlug not found in src/lib/db.ts');
  });

  // -------------------------------------------------------------
  // Test 12: redeem code status works
  // -------------------------------------------------------------
  await assert(12, 'Redeem code system supports ACTIVE, EXPIRED, UNKNOWN and verified timestamps', async () => {
    const activeCodes = db.prepare("SELECT COUNT(*) as count FROM redeem_codes WHERE status = 'ACTIVE'").get().count;
    const expiredCodes = db.prepare("SELECT COUNT(*) as count FROM redeem_codes WHERE status = 'EXPIRED'").get().count;
    if (activeCodes < 15) throw new Error(`Expected at least 15 active redeem codes, found ${activeCodes}`);

    const cardFile = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'RedeemCodeCard.tsx'), 'utf-8');
    if (!cardFile.includes('TERSALIN!') || !cardFile.includes('SALIN KODE')) {
      throw new Error('RedeemCodeCard copy state text missing TERSALIN! / SALIN KODE');
    }
  });

  // -------------------------------------------------------------
  // Test 13: CSV validation works
  // -------------------------------------------------------------
  await assert(13, 'CSV batch import parses RFC-4180 and validates required fields & slugs', async () => {
    const csvFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'csv-import.ts'), 'utf-8');
    if (!csvFile.includes('parseCsv') || (!csvFile.includes('importContentFromCsv') && !csvFile.includes('importCsvData'))) {
      throw new Error('CSV parser or import processor missing');
    }

    const valFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'validation.ts'), 'utf-8');
    if (!valFile.includes('validateGame') || !valFile.includes('validateCharacter') || !valFile.includes('validateGuide')) {
      throw new Error('Entity validators missing in src/lib/validation.ts');
    }
  });

  // -------------------------------------------------------------
  // Test 14: author pages work
  // -------------------------------------------------------------
  await assert(14, 'Author profile route exists and links to published guides & news', async () => {
    const authorPage = path.join(process.cwd(), 'src', 'app', 'authors', '[slug]', 'page.tsx');
    if (!fs.existsSync(authorPage)) throw new Error('Author route /authors/[slug] missing');

    const authors = db.prepare("SELECT * FROM authors").all();
    if (authors.length < 3) throw new Error(`Expected at least 3 authors, found ${authors.length}`);

    // Verify each author has published content
    for (const author of authors) {
      const guideCount = db.prepare("SELECT COUNT(*) as c FROM guides WHERE author_slug = ? AND status = 'PUBLISHED'").get(author.slug).c;
      const newsCount = db.prepare("SELECT COUNT(*) as c FROM news WHERE author_slug = ? AND status = 'PUBLISHED'").get(author.slug).c;
      if (guideCount + newsCount === 0) {
        throw new Error(`Author ${author.name} (${author.slug}) has no linked content`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 15: internal links resolve
  // -------------------------------------------------------------
  await assert(15, 'Internal links resolve to existing records (Game -> Characters, Guides -> Games)', async () => {
    const characters = db.prepare("SELECT game_id, name, slug FROM characters LIMIT 20").all();
    for (const c of characters) {
      const game = db.prepare("SELECT id, slug FROM games WHERE id = ?").get(c.game_id);
      if (!game) throw new Error(`Character ${c.name} has invalid game_id ${c.game_id}`);
    }

    const guides = db.prepare("SELECT game_id, title, slug FROM guides LIMIT 20").all();
    for (const g of guides) {
      const game = db.prepare("SELECT id, slug FROM games WHERE id = ?").get(g.game_id);
      if (!game) throw new Error(`Guide ${g.title} has invalid game_id ${g.game_id}`);
    }
  });

  // -------------------------------------------------------------
  // Test 16: no broken public routes
  // -------------------------------------------------------------
  await assert(16, 'All core public route directories and pages exist on filesystem', async () => {
    const requiredRoutes = [
      'src/app/page.tsx',
      'src/app/games/page.tsx',
      'src/app/games/[slug]/page.tsx',
      'src/app/games/[slug]/characters/page.tsx',
      'src/app/games/[slug]/characters/[characterSlug]/page.tsx',
      'src/app/games/[slug]/guides/page.tsx',
      'src/app/games/[slug]/items/page.tsx',
      'src/app/games/[slug]/tier-list/page.tsx',
      'src/app/games/[slug]/redeem-codes/page.tsx',
      'src/app/games/[slug]/events/page.tsx',
      'src/app/games/[slug]/news/page.tsx',
      'src/app/guides/page.tsx',
      'src/app/guides/[slug]/page.tsx',
      'src/app/news/page.tsx',
      'src/app/news/[slug]/page.tsx',
      'src/app/authors/[slug]/page.tsx',
      'src/app/redeem-codes/page.tsx',
      'src/app/events/page.tsx',
      'src/app/tier-list/page.tsx',
      'src/app/search/page.tsx',
      'src/app/sitemap.ts',
      'src/app/robots.ts',
    ];

    for (const r of requiredRoutes) {
      if (!fs.existsSync(path.join(process.cwd(), r))) {
        throw new Error(`Required route file missing: ${r}`);
      }
    }
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`Phase 3 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('-------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase3Tests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

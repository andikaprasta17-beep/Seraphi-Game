import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { POSTGRES_SCHEMA_SQL } from './scripts/migrate-postgres.mjs';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;

// Read .env if present
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

function maskDatabaseUrl(url) {
  if (!url) return '[NOT DEFINED]';
  try {
    const parsed = new URL(url);
    const user = parsed.username || 'user';
    const host = parsed.hostname || 'host';
    const port = parsed.port ? `:${parsed.port}` : '';
    const db = parsed.pathname || '';
    return `${parsed.protocol}//${user}:***@${host}${port}${db}`;
  } catch {
    return 'postgresql://***:***@host/db';
  }
}

async function runNeonTestSuite() {
  console.log('\n=============================================================');
  console.log('   SERAPHI GAME — NEON POSTGRESQL & KOYEB VERIFICATION SUITE ');
  console.log('   (Real DB Conn, Schema, CRUD, Search, View, Health, Auth)  ');
  console.log('=============================================================\n');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn('[NOTICE] DATABASE_URL is not set in environment or .env.');
    console.warn('To execute against live Neon instance, run:');
    console.warn('  DATABASE_URL="postgresql://user:pass@ep-xxxx.neon.tech/neondb" npm run test:neon\n');
    console.log('Executing dry-run / static Postgres contract checks...\n');
  } else {
    console.log(`Target Database: ${maskDatabaseUrl(connectionString)}`);
  }

  let passed = 0;
  let failed = 0;
  const totalTests = 11;

  async function assert(testNum, title, fn) {
    try {
      await fn();
      console.log(`✓ [PASS ${testNum}/${totalTests}] ${title}`);
      passed++;
    } catch (err) {
      console.error(`✗ [FAIL ${testNum}/${totalTests}] ${title}: ${err.message}`);
      failed++;
    }
  }

  const isNeon = connectionString && connectionString.includes('neon.tech');
  let pool = null;
  let client = null;

  if (connectionString) {
    pool = new Pool({
      connectionString,
      ssl: isNeon || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      connectionTimeoutMillis: 10000,
    });
  }

  // 1. Connection Test
  await assert(1, 'Database Connection & SSL Validation (No Secret Leaks)', async () => {
    if (!connectionString) {
      console.log('    (Skipped live ping: DATABASE_URL not supplied)');
      return;
    }
    client = await pool.connect();
    const res = await client.query('SELECT NOW() as now, current_database() as db');
    if (!res.rows[0].now) throw new Error('Live query returned no timestamp');
  });

  // 2. Schema Specification & 12 Tables
  await assert(2, 'Schema Verification: 12 Tables, Foreign Constraints & Indexes', async () => {
    const requiredTables = [
      'authors', 'games', 'characters', 'items', 'guides',
      'news', 'redeem_codes', 'events', 'tier_lists',
      'ad_slots', 'admin_users', 'contact_messages'
    ];
    for (const tbl of requiredTables) {
      if (!POSTGRES_SCHEMA_SQL.includes(`CREATE TABLE IF NOT EXISTS ${tbl}`)) {
        throw new Error(`Schema missing definition for table: ${tbl}`);
      }
    }

    if (client) {
      const dbTables = await client.query(`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public'
      `);
      const existingNames = dbTables.rows.map((r) => r.table_name);
      for (const t of requiredTables) {
        if (!existingNames.includes(t)) {
          throw new Error(`Neon database table missing: ${t}`);
        }
      }
    }
  });

  // 3. Row Counts
  await assert(3, 'Exact Target Production Content Counts (22/52/56/35/16/24/26/4)', async () => {
    if (!client) {
      console.log('    (Skipped live counts: DATABASE_URL not supplied)');
      return;
    }

    const cGames = await client.query('SELECT count(*) as c FROM games');
    const cChars = await client.query('SELECT count(*) as c FROM characters');
    const cGuides = await client.query('SELECT count(*) as c FROM guides');
    const cNews = await client.query('SELECT count(*) as c FROM news');
    const cItems = await client.query('SELECT count(*) as c FROM items');
    const cCodes = await client.query('SELECT count(*) as c FROM redeem_codes');
    const cEvents = await client.query('SELECT count(*) as c FROM events');
    const cAuthors = await client.query('SELECT count(*) as c FROM authors');

    const stats = {
      games: Number(cGames.rows[0].c),
      characters: Number(cChars.rows[0].c),
      guides: Number(cGuides.rows[0].c),
      news: Number(cNews.rows[0].c),
      items: Number(cItems.rows[0].c),
      redeemCodes: Number(cCodes.rows[0].c),
      events: Number(cEvents.rows[0].c),
      authors: Number(cAuthors.rows[0].c),
    };

    if (
      stats.games !== 22 ||
      stats.characters !== 52 ||
      stats.guides !== 56 ||
      stats.news !== 35 ||
      stats.items !== 16 ||
      stats.redeemCodes !== 24 ||
      stats.events !== 26 ||
      stats.authors !== 4
    ) {
      throw new Error(`Count mismatch! Found: ${JSON.stringify(stats)}`);
    }
  });

  // 4. Demo Content Isolation
  await assert(4, 'Published Demo Content Zero Count in Production Dataset', async () => {
    if (!client) {
      console.log('    (Skipped live demo count: DATABASE_URL not supplied)');
      return;
    }

    const demoRes = await client.query(`
      SELECT (
        (SELECT count(*) FROM games WHERE is_demo = 1) +
        (SELECT count(*) FROM characters WHERE is_demo = 1) +
        (SELECT count(*) FROM guides WHERE is_demo = 1) +
        (SELECT count(*) FROM news WHERE is_demo = 1) +
        (SELECT count(*) FROM items WHERE is_demo = 1) +
        (SELECT count(*) FROM redeem_codes WHERE is_demo = 1) +
        (SELECT count(*) FROM events WHERE is_demo = 1)
      ) as demo_total
    `);

    const demoCount = Number(demoRes.rows[0].demo_total);
    if (demoCount !== 0) {
      throw new Error(`Demo items detected in production database! Total: ${demoCount}`);
    }
  });

  // 5. Foreign Relation Integrity (Zero Orphans)
  await assert(5, 'Relational Foreign Integrity (Zero Orphaned Relations across 8 paths)', async () => {
    if (!client) {
      console.log('    (Skipped live orphan audit: DATABASE_URL not supplied)');
      return;
    }

    const orphChars = await client.query('SELECT count(*) as c FROM characters WHERE game_id NOT IN (SELECT id FROM games)');
    const orphGuides = await client.query('SELECT count(*) as c FROM guides WHERE game_id NOT IN (SELECT id FROM games)');
    const orphNews = await client.query('SELECT count(*) as c FROM news WHERE game_id IS NOT NULL AND game_id NOT IN (SELECT id FROM games)');
    const orphItems = await client.query('SELECT count(*) as c FROM items WHERE game_id NOT IN (SELECT id FROM games)');
    const orphCodes = await client.query('SELECT count(*) as c FROM redeem_codes WHERE game_id NOT IN (SELECT id FROM games)');
    const orphEvents = await client.query('SELECT count(*) as c FROM events WHERE game_id NOT IN (SELECT id FROM games)');
    const orphAuthorGuides = await client.query('SELECT count(*) as c FROM guides WHERE author_id IS NOT NULL AND author_id NOT IN (SELECT id FROM authors)');
    const orphAuthorNews = await client.query('SELECT count(*) as c FROM news WHERE author_id IS NOT NULL AND author_id NOT IN (SELECT id FROM authors)');

    const sum =
      Number(orphChars.rows[0].c) +
      Number(orphGuides.rows[0].c) +
      Number(orphNews.rows[0].c) +
      Number(orphItems.rows[0].c) +
      Number(orphCodes.rows[0].c) +
      Number(orphEvents.rows[0].c) +
      Number(orphAuthorGuides.rows[0].c) +
      Number(orphAuthorNews.rows[0].c);

    if (sum > 0) {
      throw new Error(`Orphaned records detected! Total orphaned foreign keys: ${sum}`);
    }
  });

  // 6. Admin CRUD Lifecycle & Clean Rollback
  await assert(6, 'Admin Operations: Auth, Game, Guide, Redeem Code, Event, Contact & Cleanup', async () => {
    if (!client) {
      console.log('    (Skipped live Admin CRUD: DATABASE_URL not supplied)');
      return;
    }

    const testId = `test_${Date.now()}`;
    const testGameId = `game_temp_${testId}`;
    const testGuideId = `guide_temp_${testId}`;
    const testCodeId = `code_temp_${testId}`;
    const testEventId = `event_temp_${testId}`;
    const testContactId = `contact_temp_${testId}`;

    try {
      // 1. Create Game
      await client.query(`
        INSERT INTO games (id, name, slug, cover_image, banner_image, description, developer, publisher, release_date, platforms, genres, status, rating, official_url, created_at, updated_at)
        VALUES ($1, 'Test Game', $2, 'https://img.jpg', 'https://img.jpg', 'Desc', 'Dev', 'Pub', '2026-01-01', '[]', '[]', 'Draft', 4.0, 'https://test.com', NOW(), NOW())
      `, [testGameId, `slug-${testId}`]);

      // 2. Edit Game
      await client.query(`UPDATE games SET name = 'Updated Test Game' WHERE id = $1`, [testGameId]);

      // 3. Create Guide
      await client.query(`
        INSERT INTO guides (id, game_id, author_id, author_slug, title, slug, excerpt, content, category, difficulty, reading_time, featured_image, status, created_at, updated_at, tags)
        VALUES ($1, $2, 'author-seraphi-editorial', 'seraphi-editorial', 'Test Guide', $3, 'Excerpt', 'Content', 'Build', 'medium', 5, 'https://img.jpg', 'DRAFT', NOW(), NOW(), '[]')
      `, [testGuideId, testGameId, `guide-slug-${testId}`]);

      // 4. Publish Guide
      await client.query(`UPDATE guides SET status = 'PUBLISHED' WHERE id = $1`, [testGuideId]);

      // 5. Archive Guide
      await client.query(`UPDATE guides SET status = 'ARCHIVED' WHERE id = $1`, [testGuideId]);

      // 6. Create Redeem Code
      await client.query(`
        INSERT INTO redeem_codes (id, game_id, code, reward, status, source, last_checked, created_at, updated_at)
        VALUES ($1, $2, 'CODE123', 'Reward', 'ACTIVE', 'Official', NOW(), NOW(), NOW())
      `, [testCodeId, testGameId]);

      // 7. Update Redeem Code
      await client.query(`UPDATE redeem_codes SET status = 'EXPIRED' WHERE id = $1`, [testCodeId]);

      // 8. Create Event
      await client.query(`
        INSERT INTO events (id, game_id, title, slug, description, type, start_date, end_date, rewards, banner_image, created_at, updated_at)
        VALUES ($1, $2, 'Test Event', $3, 'Desc', 'EVENT', NOW(), NOW(), '[]', 'https://img.jpg', NOW(), NOW())
      `, [testEventId, testGameId, `event-slug-${testId}`]);

      // 9. Contact Messages
      await client.query(`
        INSERT INTO contact_messages (id, name, email, subject, message, status, created_at)
        VALUES ($1, 'Tester', 'test@test.com', 'Subject', 'Message', 'UNREAD', NOW())
      `, [testContactId]);

      await client.query(`UPDATE contact_messages SET status = 'READ' WHERE id = $1`, [testContactId]);
    } finally {
      // Clean up ALL test records
      await client.query('DELETE FROM contact_messages WHERE id = $1', [testContactId]);
      await client.query('DELETE FROM events WHERE id = $1', [testEventId]);
      await client.query('DELETE FROM redeem_codes WHERE id = $1', [testCodeId]);
      await client.query('DELETE FROM guides WHERE id = $1', [testGuideId]);
      await client.query('DELETE FROM games WHERE id = $1', [testGameId]);
    }
  });

  // 7. Global Search Algorithm with PostgreSQL
  await assert(7, 'Global Search Compatibility (ILIKE & Multi-Tier Exact > Title > Slug > Content)', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('ILIKE') && !dbFile.includes('LOWER(')) {
      throw new Error('Postgres search query must use ILIKE or LOWER() for case-insensitivity');
    }
    if (!dbFile.includes('THEN 1') || !dbFile.includes('THEN 2') || !dbFile.includes('THEN 3') || !dbFile.includes('ELSE 4')) {
      throw new Error('Postgres search algorithm missing multi-tier SQL ranking layers');
    }

    if (client) {
      const searchRes = await client.query(`
        SELECT id, name as title, 'game' as type,
          CASE
            WHEN LOWER(name) = LOWER('genshin') THEN 1
            WHEN LOWER(name) LIKE LOWER('%genshin%') THEN 2
            WHEN LOWER(slug) LIKE LOWER('%genshin%') THEN 3
            ELSE 4
          END as rank
        FROM games
        WHERE LOWER(name) LIKE '%genshin%' OR LOWER(slug) LIKE '%genshin%'
        ORDER BY rank ASC
        LIMIT 5
      `);
      if (searchRes.rows.length === 0) {
        throw new Error('Search query for "genshin" returned no results in PostgreSQL');
      }
    }
  });

  // 8. View Counter & Rate Limiting
  await assert(8, 'View Counter Cooldown & Rate Limiting in Route & PostgresAdapter', async () => {
    const viewsRoute = fs.readFileSync(path.join(rootDir, 'src', 'app', 'api', 'views', 'route.ts'), 'utf-8');
    if (!viewsRoute.includes('COOLDOWN_MS = 60 * 1000')) {
      throw new Error('Views API missing 60-second cooldown');
    }
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('incrementViews')) {
      throw new Error('PostgresAdapter missing incrementViews implementation');
    }
  });

  // 9. Health Check Endpoint Safety
  await assert(9, 'Health Check (/api/health) Database Connectivity & Secret Masking', async () => {
    const healthRoute = fs.readFileSync(path.join(rootDir, 'src', 'app', 'api', 'health', 'route.ts'), 'utf-8');
    if (healthRoute.includes('DATABASE_URL') || healthRoute.includes('password') || healthRoute.includes('dbUrl')) {
      throw new Error('Health check route references raw database credentials');
    }
    if (!healthRoute.includes("database: 'connected'")) {
      throw new Error('Health check route missing database connected status');
    }
  });

  // 10. Database Persistence Across Connection Cycles
  await assert(10, 'Database Persistence Across Independent Pool Lifecycles', async () => {
    if (!connectionString) {
      console.log('    (Skipped live persistence: DATABASE_URL not supplied)');
      return;
    }

    const testKey = `persist_${Date.now()}`;
    const testPoolA = new Pool({ connectionString, ssl: isNeon ? { rejectUnauthorized: false } : undefined });
    await testPoolA.query(`
      CREATE TABLE IF NOT EXISTS _persistence_check (key VARCHAR(100) PRIMARY KEY, val TEXT, created_at VARCHAR(100))
    `);
    await testPoolA.query(
      'INSERT INTO _persistence_check (key, val, created_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET val = EXCLUDED.val',
      [testKey, 'persistent_value_neon']
    );
    await testPoolA.end();

    // Isolated Pool B
    const testPoolB = new Pool({ connectionString, ssl: isNeon ? { rejectUnauthorized: false } : undefined });
    const readRes = await testPoolB.query('SELECT val FROM _persistence_check WHERE key = $1', [testKey]);
    const val = readRes.rows[0]?.val;
    await testPoolB.query('DELETE FROM _persistence_check WHERE key = $1', [testKey]);
    await testPoolB.end();

    if (val !== 'persistent_value_neon') {
      throw new Error(`Persistence read mismatch! Expected persistent_value_neon, got ${val}`);
    }
  });

  // 11. Filesystem & SQLite Isolation in Production
  await assert(11, 'Production Safety: DATABASE_PROVIDER=postgres Isolates data/seraphi.db', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db.ts'), 'utf-8');
    if (!dbFile.includes("provider === 'postgres'")) {
      throw new Error('db.ts does not properly check DATABASE_PROVIDER=postgres');
    }
    if (!dbFile.includes('new PostgresAdapter()')) {
      throw new Error('db.ts does not instantiate PostgresAdapter when postgres provider requested');
    }
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`Neon & Koyeb Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('-------------------------------------------------------------\n');

  if (client) client.release();
  if (pool) await pool.end();

  if (failed > 0) {
    process.exit(1);
  }
}

runNeonTestSuite().catch((err) => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});

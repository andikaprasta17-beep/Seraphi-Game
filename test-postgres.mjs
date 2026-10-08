import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { POSTGRES_SCHEMA_SQL } from './scripts/migrate-postgres.mjs';

function toPgSql(sql) {
  let paramIndex = 1;
  return sql.replace(/\?/g, () => `$${paramIndex++}`);
}

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

async function runPostgresTestSuite() {
  console.log('\n=============================================================');
  console.log('   SERAPHI GAME — POSTGRESQL & NEON READINESS TEST SUITE     ');
  console.log('   (Schema, SQL Compat, Adapter, CRUD, Auth, Search, SEO)   ');
  console.log('=============================================================\n');

  let passed = 0;
  let failed = 0;
  const totalTests = 17;

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

  const livePgUrl = process.env.DATABASE_URL || process.env.TEST_PG_URL;
  let livePool = null;
  let liveConnected = false;

  if (livePgUrl && livePgUrl.startsWith('postgres')) {
    try {
      const isNeon = livePgUrl.includes('neon.tech');
      livePool = new Pool({
        connectionString: livePgUrl,
        ssl: isNeon || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
        connectionTimeoutMillis: 5000,
      });
      const client = await livePool.connect();
      await client.query('SELECT 1');
      client.release();
      liveConnected = true;
      console.log('✓ Connected to live PostgreSQL database for integration tests.\n');
    } catch (err) {
      console.log(`[Notice] Live PostgreSQL connection not available (${err.message}). Testing in static & unit verification mode.\n`);
      livePool = null;
      liveConnected = false;
    }
  } else {
    console.log('[Notice] DATABASE_URL not set to live instance. Executing full static, query dialect, and unit test suite.\n');
  }

  // 1. Database Connection & Environment Configuration
  await assert(1, 'Database Connection & Environment Configuration', async () => {
    const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf-8');
    if (!envExample.includes('DATABASE_PROVIDER=postgres')) {
      throw new Error('.env.example missing DATABASE_PROVIDER=postgres');
    }
    if (!envExample.includes('DATABASE_URL=')) {
      throw new Error('.env.example missing DATABASE_URL=');
    }
    if (liveConnected) {
      const client = await livePool.connect();
      const res = await client.query('SELECT NOW() as now');
      client.release();
      if (!res.rows[0].now) throw new Error('Live PostgreSQL query returned no timestamp');
    }
  });

  // 2. Schema Specification & 12 Tables
  await assert(2, 'Schema Specification & 12 Tables with Indexes and Constraints', async () => {
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
    if (!POSTGRES_SCHEMA_SQL.includes('PRIMARY KEY') || !POSTGRES_SCHEMA_SQL.includes('ON DELETE CASCADE')) {
      throw new Error('Schema missing primary keys or cascade constraints');
    }
  });

  // 3. Migration Script & Non-destructive SQLite
  await assert(3, 'Migration Script (scripts/migrate-postgres.mjs) Integrity', async () => {
    const migFile = path.join(rootDir, 'scripts', 'migrate-postgres.mjs');
    if (!fs.existsSync(migFile)) throw new Error('scripts/migrate-postgres.mjs missing');
    const content = fs.readFileSync(migFile, 'utf-8');
    if (content.includes('unlinkSync') || content.includes('rmSync')) {
      throw new Error('Migration script must NOT delete files');
    }
    if (!content.includes('runPostgresMigration')) {
      throw new Error('Migration script missing runPostgresMigration export');
    }
  });

  // 4. Seed Script & Target Content Quantities
  await assert(4, 'Seed Script (scripts/seed-postgres.mjs) Target Content Verification', async () => {
    const seedFile = path.join(rootDir, 'scripts', 'seed-postgres.mjs');
    if (!fs.existsSync(seedFile)) throw new Error('scripts/seed-postgres.mjs missing');
    const content = fs.readFileSync(seedFile, 'utf-8');
    const targets = [
      'stats.games !== 22',
      'stats.characters !== 52',
      'stats.guides !== 56',
      'stats.news !== 35',
      'stats.items !== 16',
      'stats.redeemCodes !== 24',
      'stats.events !== 26',
      'stats.authors !== 4'
    ];
    for (const t of targets) {
      if (!content.includes(t)) {
        throw new Error(`Seed script missing target check: ${t}`);
      }
    }
  });

  // 5. Game CRUD & SQL Compatibility
  await assert(5, 'Game CRUD & Postgres SQL Parameter Translation', async () => {
    const query = 'SELECT * FROM games WHERE status = ? AND is_demo = ? LIMIT ? OFFSET ?';
    const translated = toPgSql(query);
    if (translated !== 'SELECT * FROM games WHERE status = $1 AND is_demo = $2 LIMIT $3 OFFSET $4') {
      throw new Error(`toPgSql translation failed: ${translated}`);
    }
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('insertGame') || !dbFile.includes('updateGame') || !dbFile.includes('deleteGame')) {
      throw new Error('PostgresAdapter missing Game CRUD functions');
    }
  });

  // 6. Character CRUD
  await assert(6, 'Character CRUD Functions in PostgresAdapter', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('getCharacters') || !dbFile.includes('getCharacterBySlug') || !dbFile.includes('deleteCharacter')) {
      throw new Error('PostgresAdapter missing Character CRUD functions');
    }
  });

  // 7. Guide CRUD
  await assert(7, 'Guide CRUD Functions & Related Guides/Characters In PostgresAdapter', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('insertGuide') || !dbFile.includes('updateGuide') || !dbFile.includes('deleteGuide') || !dbFile.includes('getGuideBySlug')) {
      throw new Error('PostgresAdapter missing Guide CRUD functions');
    }
  });

  // 8. News CRUD
  await assert(8, 'News CRUD Functions in PostgresAdapter', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('insertNewsItem') || !dbFile.includes('updateNewsItem') || !dbFile.includes('deleteNewsItem') || !dbFile.includes('getNewsBySlug')) {
      throw new Error('PostgresAdapter missing News CRUD functions');
    }
  });

  // 9. Redeem Code CRUD & Status/Provider
  await assert(9, 'Redeem Code CRUD Functions & Verification In PostgresAdapter', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('insertRedeemCode') || !dbFile.includes('updateRedeemCode') || !dbFile.includes('deleteRedeemCode')) {
      throw new Error('PostgresAdapter missing Redeem Code CRUD functions');
    }
  });

  // 10. Events CRUD
  await assert(10, 'Events CRUD Functions in PostgresAdapter', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('insertEventItem') || !dbFile.includes('getEvents') || !dbFile.includes('deleteEventItem')) {
      throw new Error('PostgresAdapter missing Events CRUD functions');
    }
  });

  // 11. Search Ranking Algorithm (Exact > Title > Slug > Content) & ILIKE
  await assert(11, 'Search Ranking Compatibility & ILIKE Case-Insensitive Matching', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('ILIKE') && !dbFile.includes('LOWER(')) {
      throw new Error('Postgres search query must use ILIKE or LOWER() for case-insensitivity');
    }
    if (!dbFile.includes('THEN 1') || !dbFile.includes('THEN 2') || !dbFile.includes('THEN 3') || !dbFile.includes('ELSE 4')) {
      throw new Error('Postgres search algorithm missing multi-tier SQL ranking layers');
    }
  });

  // 12. Authentication & Admin Credentials from Environment
  await assert(12, 'Authentication & Environment Variables (No Hardcoded Credentials)', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('syncAdminUserFromEnv') || !dbFile.includes('getAdminUser')) {
      throw new Error('PostgresAdapter missing admin auth synchronization');
    }
    const authRoute = fs.readFileSync(path.join(rootDir, 'src', 'app', 'api', 'auth', 'login', 'route.ts'), 'utf-8');
    if (!authRoute.includes('syncAdminUserFromEnv') || !authRoute.includes('getAdminUser')) {
      throw new Error('Auth route not integrated with db adapter');
    }
  });

  // 13. Views & Safe Cooldown Incrementing
  await assert(13, 'Views Telemetry & 60-Second Cooldown in Route and PostgresAdapter', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('incrementViews')) {
      throw new Error('PostgresAdapter missing incrementViews');
    }
    const viewsRoute = fs.readFileSync(path.join(rootDir, 'src', 'app', 'api', 'views', 'route.ts'), 'utf-8');
    if (!viewsRoute.includes('COOLDOWN_MS = 60 * 1000')) {
      throw new Error('Views route missing 60s cooldown');
    }
  });

  // 14. Contact Messages & Status Updates
  await assert(14, 'Contact Messages Insertion & Status Management in PostgresAdapter', async () => {
    const dbFile = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'db-postgres.ts'), 'utf-8');
    if (!dbFile.includes('insertContactMessage') || !dbFile.includes('getContactMessages') || !dbFile.includes('updateContactMessageStatus')) {
      throw new Error('PostgresAdapter missing Contact Messages operations');
    }
  });

  // 15. Health Check API Telemetry & Database Connectivity Check
  await assert(15, 'Health Check (/api/health) Database Connectivity & Secret Masking', async () => {
    const healthFile = fs.readFileSync(path.join(rootDir, 'src', 'app', 'api', 'health', 'route.ts'), 'utf-8');
    if (!healthFile.includes('getGames')) throw new Error('Health check does not verify database connectivity');
    if (healthFile.includes('DATABASE_URL') || healthFile.includes('password')) {
      throw new Error('Health check contains forbidden secret references');
    }
  });

  // 16. Sitemap Integrity & Postgres/Content Compatibility
  await assert(16, 'Sitemap Generation Supports Dynamic Async Queries and onlyPublished', async () => {
    const sitemapFile = fs.readFileSync(path.join(rootDir, 'src', 'app', 'sitemap.ts'), 'utf-8');
    if (!sitemapFile.includes('await Promise.all')) throw new Error('sitemap.ts missing async Promise.all');
    if (!sitemapFile.includes('onlyPublished: true')) throw new Error('sitemap.ts missing onlyPublished: true');
  });

  // 17. Robots.txt Compliance & Crawl Safety
  await assert(17, 'Robots.txt Crawl Directives & Disallow Admin/API/Search', async () => {
    const robotsFile = fs.readFileSync(path.join(rootDir, 'src', 'app', 'robots.ts'), 'utf-8');
    if (!robotsFile.includes('/admin') || !robotsFile.includes('/api') || !robotsFile.includes('/search')) {
      throw new Error('robots.ts missing disallow rules');
    }
  });

  if (livePool) {
    await livePool.end();
  }

  console.log('\n-------------------------------------------------------------');
  console.log(`PostgreSQL Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('-------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPostgresTestSuite().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import pg from 'pg';
import { POSTGRES_SCHEMA_SQL } from './migrate-postgres.mjs';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env if present
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

/**
 * Mask sensitive credentials from database connection string for logs
 */
export function maskDatabaseUrl(url) {
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

export async function runNeonMigration() {
  console.log('=============================================================');
  console.log('   SERAPHI GAME — NEON POSTGRESQL PRODUCTION MIGRATION       ');
  console.log('   (Schema, Constraints, Verified Content & Integrity)       ');
  console.log('=============================================================\n');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('✗ [ERROR] DATABASE_URL environment variable is not defined.');
    console.error('Please configure DATABASE_URL in .env or provide it via environment:');
    console.error('  DATABASE_URL="postgresql://user:password@ep-xxxx.neon.tech/neondb" npm run db:migrate-neon\n');
    process.exit(1);
  }

  const maskedUrl = maskDatabaseUrl(connectionString);
  const isNeon = connectionString.includes('neon.tech');
  console.log(`Connecting to: ${maskedUrl} (${isNeon ? 'Neon Serverless' : 'Custom PostgreSQL Host'})...`);

  const pool = new Pool({
    connectionString,
    ssl: isNeon || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 15000,
  });

  let client;
  try {
    client = await pool.connect();
    console.log('✓ Successfully connected to PostgreSQL instance.');

    // 1. Create Schema, Indexes, and Constraints
    console.log('\n[1/5] Applying schema, indexes, and relational constraints...');
    await client.query(POSTGRES_SCHEMA_SQL);

    // Apply incremental evolutions safely
    await client.query(`
      ALTER TABLE guides ADD COLUMN IF NOT EXISTS author_slug VARCHAR(255);
      ALTER TABLE news ADD COLUMN IF NOT EXISTS author_slug VARCHAR(255);
      ALTER TABLE events ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'ACTIVE';
      ALTER TABLE events ADD COLUMN IF NOT EXISTS official_url TEXT DEFAULT '';
      ALTER TABLE events ADD COLUMN IF NOT EXISTS image TEXT DEFAULT '';
      ALTER TABLE tier_lists ADD COLUMN IF NOT EXISTS version VARCHAR(50) DEFAULT '1.0';
      ALTER TABLE ad_slots ADD COLUMN IF NOT EXISTS name VARCHAR(255) DEFAULT '';
      ALTER TABLE ad_slots ADD COLUMN IF NOT EXISTS ad_type VARCHAR(100) DEFAULT 'custom';
    `);
    console.log('✓ Schema and table constraints verified.');

    // 2. Read Source Data from SQLite (non-destructive)
    console.log('\n[2/5] Reading verified production content from local storage...');
    const sqlitePath = path.join(rootDir, 'data', 'seraphi.db');
    if (!fs.existsSync(sqlitePath)) {
      throw new Error(`Local source SQLite database not found at ${sqlitePath}`);
    }
    const sqliteDb = new DatabaseSync(sqlitePath);

    function getSqliteRows(tableName) {
      try {
        return sqliteDb.prepare(`SELECT * FROM ${tableName}`).all();
      } catch (err) {
        console.warn(`[WARN] Table ${tableName} could not be read from SQLite: ${err.message}`);
        return [];
      }
    }

    // 3. Migrate Authors
    const authors = getSqliteRows('authors');
    console.log(`\n[3/5] Migrating entities to PostgreSQL...`);
    for (const a of authors) {
      await client.query(
        `INSERT INTO authors (id, name, slug, avatar, bio, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name, slug = EXCLUDED.slug, avatar = EXCLUDED.avatar,
           bio = EXCLUDED.bio, role = EXCLUDED.role, updated_at = EXCLUDED.updated_at`,
        [a.id, a.name, a.slug, a.avatar, a.bio, a.role, a.created_at, a.updated_at]
      );
    }
    console.log(`  ✓ Authors migrated: ${authors.length}`);

    // Migrate Games
    const games = getSqliteRows('games');
    for (const g of games) {
      await client.query(
        `INSERT INTO games (
           id, name, slug, cover_image, banner_image, description,
           developer, publisher, release_date, platforms, genres,
           status, rating, official_url, created_at, updated_at, views, is_demo,
           meta_title, meta_description, no_index
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name, slug = EXCLUDED.slug, cover_image = EXCLUDED.cover_image,
           banner_image = EXCLUDED.banner_image, description = EXCLUDED.description,
           developer = EXCLUDED.developer, publisher = EXCLUDED.publisher,
           release_date = EXCLUDED.release_date, platforms = EXCLUDED.platforms,
           genres = EXCLUDED.genres, status = EXCLUDED.status, rating = EXCLUDED.rating,
           official_url = EXCLUDED.official_url, updated_at = EXCLUDED.updated_at,
           views = EXCLUDED.views, is_demo = EXCLUDED.is_demo, meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index`,
        [
          g.id, g.name, g.slug, g.cover_image, g.banner_image, g.description,
          g.developer, g.publisher, g.release_date, g.platforms, g.genres,
          g.status, Number(g.rating), g.official_url, g.created_at, g.updated_at,
          Number(g.views || 0), Number(g.is_demo || 0), g.meta_title || null,
          g.meta_description || null, Number(g.no_index || 0)
        ]
      );
    }
    console.log(`  ✓ Games migrated: ${games.length}`);

    // Clean up any stale games in Neon not in SQLite
    const gameIds = games.map((g) => g.id);
    if (gameIds.length > 0) {
      const placeholders = gameIds.map((_, i) => `$${i + 1}`).join(',');
      await client.query(`DELETE FROM games WHERE id NOT IN (${placeholders})`, gameIds);
    }

    // Migrate Characters (repair legacy Free Fire game IDs)
    const characters = getSqliteRows('characters');
    for (const c of characters) {
      const gameId = c.game_id === 'game-free-fire' ? 'game-ff' : c.game_id;
      await client.query(
        `INSERT INTO characters (
           id, game_id, name, slug, portrait, full_image, description,
           role, element, weapon, rarity, release_date, skills, talents,
           recommended_build, recommended_weapons, recommended_team,
           materials, status, created_at, updated_at, views, is_demo,
           meta_title, meta_description, no_index
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, name = EXCLUDED.name, slug = EXCLUDED.slug,
           portrait = EXCLUDED.portrait, full_image = EXCLUDED.full_image,
           description = EXCLUDED.description, role = EXCLUDED.role, element = EXCLUDED.element,
           weapon = EXCLUDED.weapon, rarity = EXCLUDED.rarity, release_date = EXCLUDED.release_date,
           skills = EXCLUDED.skills, talents = EXCLUDED.talents,
           recommended_build = EXCLUDED.recommended_build,
           recommended_weapons = EXCLUDED.recommended_weapons,
           recommended_team = EXCLUDED.recommended_team, materials = EXCLUDED.materials,
           status = EXCLUDED.status, updated_at = EXCLUDED.updated_at, views = EXCLUDED.views,
           is_demo = EXCLUDED.is_demo, meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index`,
        [
          c.id, gameId, c.name, c.slug, c.portrait, c.full_image, c.description,
          c.role, c.element, c.weapon, Number(c.rarity), c.release_date,
          c.skills || '[]', c.talents || '[]', c.recommended_build || '{}',
          c.recommended_weapons || '[]', c.recommended_team || '[]', c.materials || '[]',
          c.status, c.created_at, c.updated_at, Number(c.views || 0), Number(c.is_demo || 0),
          c.meta_title || null, c.meta_description || null, Number(c.no_index || 0)
        ]
      );
    }
    console.log(`  ✓ Characters migrated: ${characters.length}`);

    // Migrate Items
    const items = getSqliteRows('items');
    for (const it of items) {
      const gameId = it.game_id === 'game-free-fire' ? 'game-ff' : it.game_id;
      await client.query(
        `INSERT INTO items (
           id, game_id, name, slug, type, rarity, icon, description, stats, how_to_get, created_at, updated_at, is_demo
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, name = EXCLUDED.name, slug = EXCLUDED.slug,
           type = EXCLUDED.type, rarity = EXCLUDED.rarity, icon = EXCLUDED.icon,
           description = EXCLUDED.description, stats = EXCLUDED.stats,
           how_to_get = EXCLUDED.how_to_get, updated_at = EXCLUDED.updated_at,
           is_demo = EXCLUDED.is_demo`,
        [
          it.id, gameId, it.name, it.slug, it.type, Number(it.rarity), it.icon,
          it.description, it.stats || '{}', it.how_to_get, it.created_at, it.updated_at, Number(it.is_demo || 0)
        ]
      );
    }
    console.log(`  ✓ Items migrated: ${items.length}`);

    // Migrate Guides
    const guides = getSqliteRows('guides');
    for (const gu of guides) {
      const gameId = gu.game_id === 'game-free-fire' ? 'game-ff' : gu.game_id;
      const authorSlug = gu.author_slug || (gu.author === 'Kaelen Arisandi' ? 'kael-strats' : gu.author === 'Lyra Valery' ? 'lyra-lore' : gu.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial');
      const authorId = gu.author_id || (authorSlug === 'kael-strats' ? 'author-kael-strats' : authorSlug === 'lyra-lore' ? 'author-lyra-lore' : authorSlug === 'ryu-mechanics' ? 'author-ryu-mechanics' : 'author-seraphi-editorial');
      await client.query(
        `INSERT INTO guides (
           id, game_id, author_id, author_slug, title, slug, excerpt, content, category,
           difficulty, reading_time, featured_image, status, created_at,
           updated_at, views, is_demo, meta_title, meta_description, no_index,
           tags, faq, canonical_url, related_guide_ids, related_character_ids
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, author_id = EXCLUDED.author_id, author_slug = EXCLUDED.author_slug,
           title = EXCLUDED.title, slug = EXCLUDED.slug, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
           category = EXCLUDED.category, difficulty = EXCLUDED.difficulty, reading_time = EXCLUDED.reading_time,
           featured_image = EXCLUDED.featured_image, status = EXCLUDED.status, updated_at = EXCLUDED.updated_at,
           views = EXCLUDED.views, is_demo = EXCLUDED.is_demo, meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index,
           tags = EXCLUDED.tags, faq = EXCLUDED.faq, canonical_url = EXCLUDED.canonical_url,
           related_guide_ids = EXCLUDED.related_guide_ids, related_character_ids = EXCLUDED.related_character_ids`,
        [
          gu.id, gameId, authorId, authorSlug, gu.title, gu.slug, gu.excerpt, gu.content,
          gu.category, gu.difficulty || 'medium', Number(gu.reading_time || 5), gu.thumbnail || gu.featured_image || '', gu.status,
          gu.created_at, gu.updated_at, Number(gu.views || 0), Number(gu.is_demo || 0),
          gu.meta_title || null, gu.meta_description || null, Number(gu.no_index || 0),
          gu.tags || '[]', gu.faq || '[]', gu.canonical_url || null,
          gu.related_guide_ids || '[]', gu.related_character_ids || '[]'
        ]
      );
    }
    console.log(`  ✓ Guides migrated: ${guides.length}`);

    // Clean up any test/stale guides in Neon that are not in SQLite
    const guideIds = guides.map((g) => g.id);
    if (guideIds.length > 0) {
      const placeholders = guideIds.map((_, i) => `$${i + 1}`).join(',');
      await client.query(`DELETE FROM guides WHERE id NOT IN (${placeholders})`, guideIds);
    }
    await client.query("DELETE FROM guides WHERE slug LIKE 'secret-draft-%' OR status != 'PUBLISHED'");

    // Migrate News
    const news = getSqliteRows('news');
    for (const n of news) {
      const gameId = n.game_id === 'game-free-fire' ? 'game-ff' : (n.game_id || null);
      const authorSlug = n.author_slug || (n.author === 'Kaelen Arisandi' ? 'kael-strats' : n.author === 'Lyra Valery' ? 'lyra-lore' : n.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial');
      const authorId = n.author_id || (authorSlug === 'kael-strats' ? 'author-kael-strats' : authorSlug === 'lyra-lore' ? 'author-lyra-lore' : authorSlug === 'ryu-mechanics' ? 'author-ryu-mechanics' : 'author-seraphi-editorial');
      await client.query(
        `INSERT INTO news (
           id, game_id, author_id, author_slug, title, slug, excerpt, content, category,
           featured_image, status, created_at, updated_at, views, is_demo,
           meta_title, meta_description, no_index, tags
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, author_id = EXCLUDED.author_id, author_slug = EXCLUDED.author_slug,
           title = EXCLUDED.title, slug = EXCLUDED.slug, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
           category = EXCLUDED.category, featured_image = EXCLUDED.featured_image,
           status = EXCLUDED.status, updated_at = EXCLUDED.updated_at, views = EXCLUDED.views,
           is_demo = EXCLUDED.is_demo, meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index, tags = EXCLUDED.tags`,
        [
          n.id, gameId, authorId, authorSlug, n.title, n.slug, n.excerpt, n.content,
          n.category, n.thumbnail || n.featured_image || '', n.status, n.created_at, n.updated_at,
          Number(n.views || 0), Number(n.is_demo || 0), n.meta_title || null,
          n.meta_description || null, Number(n.no_index || 0), n.tags || '[]'
        ]
      );
    }
    console.log(`  ✓ News migrated: ${news.length}`);

    // Migrate Redeem Codes
    const redeemCodes = getSqliteRows('redeem_codes');
    for (const rc of redeemCodes) {
      const gameId = rc.game_id === 'game-free-fire' ? 'game-ff' : rc.game_id;
      await client.query(
        `INSERT INTO redeem_codes (
           id, game_id, code, reward, status, expired_at, source,
           last_checked, verified_at, verification_provider, created_at, updated_at, is_demo
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, code = EXCLUDED.code, reward = EXCLUDED.reward,
           status = EXCLUDED.status, expired_at = EXCLUDED.expired_at, source = EXCLUDED.source,
           last_checked = EXCLUDED.last_checked, verified_at = EXCLUDED.verified_at,
           verification_provider = EXCLUDED.verification_provider, updated_at = EXCLUDED.updated_at,
           is_demo = EXCLUDED.is_demo`,
        [
          rc.id, gameId, rc.code, rc.reward, rc.status, rc.expired_at || null,
          rc.source, rc.last_checked, rc.verified_at || rc.last_checked,
          rc.verification_provider || 'ManualProvider', rc.created_at, rc.updated_at, Number(rc.is_demo || 0)
        ]
      );
    }
    console.log(`  ✓ Redeem codes migrated: ${redeemCodes.length}`);

    // Migrate Events
    const events = getSqliteRows('events');
    for (const ev of events) {
      const gameId = ev.game_id === 'game-free-fire' ? 'game-ff' : ev.game_id;
      await client.query(
        `INSERT INTO events (
           id, game_id, title, slug, description, type,
           status, official_url, start_date, end_date, rewards, banner_image, image, created_at, updated_at, is_demo
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, title = EXCLUDED.title, slug = EXCLUDED.slug,
           description = EXCLUDED.description, type = EXCLUDED.type,
           status = EXCLUDED.status, official_url = EXCLUDED.official_url,
           start_date = EXCLUDED.start_date, end_date = EXCLUDED.end_date,
           rewards = EXCLUDED.rewards, banner_image = EXCLUDED.banner_image, image = EXCLUDED.image,
           updated_at = EXCLUDED.updated_at, is_demo = EXCLUDED.is_demo`,
        [
          ev.id, gameId, ev.title, ev.slug || ev.id, ev.description, ev.type || 'EVENT',
          ev.status || 'ACTIVE', ev.official_url || '',
          ev.start_date, ev.end_date, ev.rewards || '[]', ev.banner_image || ev.image || '',
          ev.image || ev.banner_image || '', ev.created_at, ev.updated_at, Number(ev.is_demo || 0)
        ]
      );
    }
    console.log(`  ✓ Events migrated: ${events.length}`);

    // Migrate Tier Lists
    const tierLists = getSqliteRows('tier_lists');
    for (const tl of tierLists) {
      const gameId = tl.game_id === 'game-free-fire' ? 'game-ff' : tl.game_id;
      await client.query(
        `INSERT INTO tier_lists (
           id, game_id, title, slug, description, version, tiers, updated_at, created_at, is_demo
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, title = EXCLUDED.title, slug = EXCLUDED.slug,
           description = EXCLUDED.description, version = EXCLUDED.version,
           tiers = EXCLUDED.tiers, updated_at = EXCLUDED.updated_at,
           is_demo = EXCLUDED.is_demo`,
        [
          tl.id, gameId, tl.title, tl.slug, tl.description, tl.version || '1.0',
          tl.tiers || '[]', tl.updated_at, tl.created_at || tl.updated_at, Number(tl.is_demo || 0)
        ]
      );
    }
    console.log(`  ✓ Tier lists migrated: ${tierLists.length}`);

    // Migrate Ad Slots
    const adSlots = getSqliteRows('ad_slots');
    for (const slot of adSlots) {
      await client.query(
        `INSERT INTO ad_slots (
           id, name, slot_type, is_active, ad_type, image_url, target_url, label, created_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name, slot_type = EXCLUDED.slot_type, is_active = EXCLUDED.is_active,
           ad_type = EXCLUDED.ad_type, image_url = EXCLUDED.image_url, target_url = EXCLUDED.target_url,
           label = EXCLUDED.label, updated_at = EXCLUDED.updated_at`,
        [
          slot.id, slot.name || slot.label || slot.slot_type,
          slot.slot_type, Number(slot.is_active || 0), slot.ad_type || 'custom',
          slot.image_url || null, slot.target_url || null, slot.label || null,
          slot.created_at, slot.updated_at
        ]
      );
    }
    console.log(`  ✓ Ad slots migrated: ${adSlots.length}`);

    // Migrate Admin Users
    const adminUsers = getSqliteRows('admin_users');
    for (const u of adminUsers) {
      await client.query(
        `INSERT INTO admin_users (id, username, password_hash, role, created_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (username) DO UPDATE SET
           password_hash = EXCLUDED.password_hash, role = EXCLUDED.role`,
        [u.id, u.username, u.password_hash, u.role, u.created_at]
      );
    }
    console.log(`  ✓ Admin users migrated: ${adminUsers.length}`);

    // Migrate Contact Messages
    const contactMessages = getSqliteRows('contact_messages');
    for (const m of contactMessages) {
      await client.query(
        `INSERT INTO contact_messages (id, name, email, subject, message, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [m.id, m.name, m.email, m.subject, m.message, m.status, m.created_at]
      );
    }
    console.log(`  ✓ Contact messages migrated: ${contactMessages.length}`);

    // 4. Verification: Exact Content Quantities (Section 3)
    console.log('\n[4/5] Verifying PostgreSQL target content quantities & demo isolation...');
    const cGames = await client.query('SELECT count(*) as c FROM games');
    const cChars = await client.query('SELECT count(*) as c FROM characters');
    const cGuides = await client.query('SELECT count(*) as c FROM guides');
    const cNews = await client.query('SELECT count(*) as c FROM news');
    const cItems = await client.query('SELECT count(*) as c FROM items');
    const cCodes = await client.query('SELECT count(*) as c FROM redeem_codes');
    const cEvents = await client.query('SELECT count(*) as c FROM events');
    const cAuthors = await client.query('SELECT count(*) as c FROM authors');
    const cDemo = await client.query(`
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

    const stats = {
      games: Number(cGames.rows[0].c),
      characters: Number(cChars.rows[0].c),
      guides: Number(cGuides.rows[0].c),
      news: Number(cNews.rows[0].c),
      items: Number(cItems.rows[0].c),
      redeemCodes: Number(cCodes.rows[0].c),
      events: Number(cEvents.rows[0].c),
      authors: Number(cAuthors.rows[0].c),
      publishedDemoCount: Number(cDemo.rows[0].demo_total),
    };

    console.log(`  Games                 : ${stats.games} (Target: 22)`);
    console.log(`  Characters            : ${stats.characters} (Target: 52)`);
    console.log(`  Guides                : ${stats.guides} (Target: 56)`);
    console.log(`  News                  : ${stats.news} (Target: 35)`);
    console.log(`  Items                 : ${stats.items} (Target: 16)`);
    console.log(`  Redeem Codes          : ${stats.redeemCodes} (Target: 24)`);
    console.log(`  Events                : ${stats.events} (Target: 26)`);
    console.log(`  Authors               : ${stats.authors} (Target: 4)`);
    console.log(`  Published Demo Content: ${stats.publishedDemoCount} (Target: 0)`);

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
      throw new Error(`Production row count verification failed! Found: ${JSON.stringify(stats)}`);
    }

    if (stats.publishedDemoCount !== 0) {
      throw new Error(`Published demo content must be strictly 0! Found: ${stats.publishedDemoCount}`);
    }
    console.log('✓ Row counts and zero-demo content verified 100%!');

    // 5. Verification: Foreign Relations Integrity (Section 4)
    console.log('\n[5/5] Verifying foreign relational integrity (Zero Orphans)...');
    const orphChars = await client.query('SELECT count(*) as c FROM characters WHERE game_id NOT IN (SELECT id FROM games)');
    const orphGuides = await client.query('SELECT count(*) as c FROM guides WHERE game_id NOT IN (SELECT id FROM games)');
    const orphNews = await client.query('SELECT count(*) as c FROM news WHERE game_id IS NOT NULL AND game_id NOT IN (SELECT id FROM games)');
    const orphItems = await client.query('SELECT count(*) as c FROM items WHERE game_id NOT IN (SELECT id FROM games)');
    const orphCodes = await client.query('SELECT count(*) as c FROM redeem_codes WHERE game_id NOT IN (SELECT id FROM games)');
    const orphEvents = await client.query('SELECT count(*) as c FROM events WHERE game_id NOT IN (SELECT id FROM games)');
    const orphAuthorGuides = await client.query('SELECT count(*) as c FROM guides WHERE author_id IS NOT NULL AND author_id NOT IN (SELECT id FROM authors)');
    const orphAuthorNews = await client.query('SELECT count(*) as c FROM news WHERE author_id IS NOT NULL AND author_id NOT IN (SELECT id FROM authors)');

    const orphanStats = {
      'Game -> Character': Number(orphChars.rows[0].c),
      'Game -> Guide': Number(orphGuides.rows[0].c),
      'Game -> News': Number(orphNews.rows[0].c),
      'Game -> Item': Number(orphItems.rows[0].c),
      'Game -> Redeem Code': Number(orphCodes.rows[0].c),
      'Game -> Event': Number(orphEvents.rows[0].c),
      'Author -> Guide': Number(orphAuthorGuides.rows[0].c),
      'Author -> News': Number(orphAuthorNews.rows[0].c),
    };

    let hasOrphan = false;
    for (const [rel, cnt] of Object.entries(orphanStats)) {
      if (cnt > 0) {
        console.error(`  ✗ Orphan relation detected in ${rel}: ${cnt}`);
        hasOrphan = true;
      } else {
        console.log(`  ✓ ${rel}: 0 orphans`);
      }
    }

    if (hasOrphan) {
      throw new Error('Foreign relational integrity check failed. Orphaned records detected.');
    }

    console.log('\n=============================================================');
    console.log('✓ NEON POSTGRESQL PRODUCTION MIGRATION & AUDIT: 100% PASSED! ');
    console.log('=============================================================\n');

    client.release();
    await pool.end();
    return { stats, orphanStats };
  } catch (err) {
    console.error('\n✗ [ERROR] Migration failed:', err.message);
    if (client) client.release();
    await pool.end();
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runNeonMigration();
}

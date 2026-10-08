import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import pg from 'pg';
import { runPostgresMigration, POSTGRES_SCHEMA_SQL } from './migrate-postgres.mjs';

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

export async function runPostgresSeed() {
  console.log('=============================================================');
  console.log('   SERAPHI GAME — POSTGRESQL PRODUCTION DATA SEED            ');
  console.log('   Target: Neon Free PostgreSQL                              ');
  console.log('=============================================================\n');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('[ERROR] DATABASE_URL environment variable is not defined.');
    console.error('Please configure DATABASE_URL=postgresql://user:pass@host/dbname in .env or environment.');
    process.exit(1);
  }

  const isNeon = connectionString.includes('neon.tech');
  const pool = new Pool({
    connectionString,
    ssl: isNeon || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 10000,
  });

  try {
    const client = await pool.connect();
    console.log('✓ Connected to PostgreSQL database.');

    // Ensure schema exists
    await client.query(POSTGRES_SCHEMA_SQL);

    // Run migration/seed logic
    const sqlitePath = path.join(rootDir, 'data', 'seraphi.db');
    if (!fs.existsSync(sqlitePath)) {
      throw new Error(`Source SQLite database not found at ${sqlitePath}`);
    }

    const sqliteDb = new DatabaseSync(sqlitePath);
    console.log('Reading production seed dataset from SQLite source...');

    // Seed Authors
    const authors = sqliteDb.prepare('SELECT * FROM authors').all();
    for (const a of authors) {
      await client.query(
        `INSERT INTO authors (id, name, slug, avatar, bio, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name, slug = EXCLUDED.slug, avatar = EXCLUDED.avatar,
           bio = EXCLUDED.bio, role = EXCLUDED.role, updated_at = EXCLUDED.updated_at`,
        [a.id, a.name, a.slug, a.avatar, a.bio, a.role || 'Contributor', a.created_at, a.updated_at]
      );
    }

    // Seed Games
    const games = sqliteDb.prepare('SELECT * FROM games').all();
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
           developer = EXCLUDED.developer, publisher = EXCLUDED.publisher, release_date = EXCLUDED.release_date,
           platforms = EXCLUDED.platforms, genres = EXCLUDED.genres, status = EXCLUDED.status,
           rating = EXCLUDED.rating, official_url = EXCLUDED.official_url, updated_at = EXCLUDED.updated_at,
           views = EXCLUDED.views, is_demo = EXCLUDED.is_demo, meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index`,
        [
          g.id, g.name, g.slug, g.cover_image, g.banner_image, g.description,
          g.developer, g.publisher, g.release_date, g.platforms, g.genres,
          g.status, Number(g.rating), g.official_url, g.created_at, g.updated_at,
          Number(g.views || 0), 0, g.meta_title || null,
          g.meta_description || null, Number(g.no_index || 0)
        ]
      );
    }

    // Seed Characters
    const characters = sqliteDb.prepare('SELECT * FROM characters').all();
    for (const c of characters) {
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
           portrait = EXCLUDED.portrait, full_image = EXCLUDED.full_image, description = EXCLUDED.description,
           role = EXCLUDED.role, element = EXCLUDED.element, weapon = EXCLUDED.weapon, rarity = EXCLUDED.rarity,
           release_date = EXCLUDED.release_date, skills = EXCLUDED.skills, talents = EXCLUDED.talents,
           recommended_build = EXCLUDED.recommended_build, recommended_weapons = EXCLUDED.recommended_weapons,
           recommended_team = EXCLUDED.recommended_team, materials = EXCLUDED.materials, status = EXCLUDED.status,
           updated_at = EXCLUDED.updated_at, views = EXCLUDED.views, is_demo = EXCLUDED.is_demo,
           meta_title = EXCLUDED.meta_title, meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index`,
        [
          c.id, c.game_id, c.name, c.slug, c.portrait, c.full_image, c.description,
          c.role, c.element, c.weapon, Number(c.rarity), c.release_date, c.skills, c.talents,
          c.recommended_build, c.recommended_weapons, c.recommended_team, c.materials,
          c.status, c.created_at, c.updated_at, Number(c.views || 0), 0,
          c.meta_title || null, c.meta_description || null, Number(c.no_index || 0)
        ]
      );
    }

    // Seed Items
    const items = sqliteDb.prepare('SELECT * FROM items').all();
    for (const it of items) {
      await client.query(
        `INSERT INTO items (
           id, game_id, name, slug, type, rarity, icon, description, stats, how_to_get, created_at, updated_at, is_demo
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, name = EXCLUDED.name, slug = EXCLUDED.slug, type = EXCLUDED.type,
           rarity = EXCLUDED.rarity, icon = EXCLUDED.icon, description = EXCLUDED.description,
           stats = EXCLUDED.stats, how_to_get = EXCLUDED.how_to_get, updated_at = EXCLUDED.updated_at,
           is_demo = EXCLUDED.is_demo`,
        [
          it.id, it.game_id, it.name, it.slug, it.type, Number(it.rarity), it.icon,
          it.description, it.stats, it.how_to_get, it.created_at, it.updated_at, 0
        ]
      );
    }

    // Seed Guides
    const guides = sqliteDb.prepare('SELECT * FROM guides').all();
    for (const gu of guides) {
      await client.query(
        `INSERT INTO guides (
           id, game_id, author_id, title, slug, excerpt, content, category,
           difficulty, reading_time, featured_image, status, created_at,
           updated_at, views, is_demo, meta_title, meta_description, no_index,
           tags, faq, canonical_url, related_guide_ids, related_character_ids
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, author_id = EXCLUDED.author_id, title = EXCLUDED.title,
           slug = EXCLUDED.slug, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
           category = EXCLUDED.category, difficulty = EXCLUDED.difficulty, reading_time = EXCLUDED.reading_time,
           featured_image = EXCLUDED.featured_image, status = EXCLUDED.status, updated_at = EXCLUDED.updated_at,
           views = EXCLUDED.views, is_demo = EXCLUDED.is_demo, meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index,
           tags = EXCLUDED.tags, faq = EXCLUDED.faq, canonical_url = EXCLUDED.canonical_url,
           related_guide_ids = EXCLUDED.related_guide_ids, related_character_ids = EXCLUDED.related_character_ids`,
        [
          gu.id, gu.game_id, gu.author_id || 'author-1', gu.title, gu.slug, gu.excerpt, gu.content,
          gu.category, gu.difficulty, Number(gu.reading_time), gu.featured_image, gu.status,
          gu.created_at, gu.updated_at, Number(gu.views || 0), 0,
          gu.meta_title || null, gu.meta_description || null, Number(gu.no_index || 0),
          gu.tags || '[]', gu.faq || '[]', gu.canonical_url || null,
          gu.related_guide_ids || '[]', gu.related_character_ids || '[]'
        ]
      );
    }

    // Seed News
    const news = sqliteDb.prepare('SELECT * FROM news').all();
    for (const n of news) {
      await client.query(
        `INSERT INTO news (
           id, game_id, author_id, title, slug, excerpt, content, category,
           featured_image, status, created_at, updated_at, views, is_demo,
           meta_title, meta_description, no_index, tags
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, author_id = EXCLUDED.author_id, title = EXCLUDED.title,
           slug = EXCLUDED.slug, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
           category = EXCLUDED.category, featured_image = EXCLUDED.featured_image,
           status = EXCLUDED.status, updated_at = EXCLUDED.updated_at, views = EXCLUDED.views,
           is_demo = EXCLUDED.is_demo, meta_title = EXCLUDED.meta_title,
           meta_description = EXCLUDED.meta_description, no_index = EXCLUDED.no_index, tags = EXCLUDED.tags`,
        [
          n.id, n.game_id || null, n.author_id || 'author-1', n.title, n.slug, n.excerpt, n.content,
          n.category, n.featured_image, n.status, n.created_at, n.updated_at,
          Number(n.views || 0), 0, n.meta_title || null,
          n.meta_description || null, Number(n.no_index || 0), n.tags || '[]'
        ]
      );
    }

    // Seed Redeem Codes
    const redeemCodes = sqliteDb.prepare('SELECT * FROM redeem_codes').all();
    for (const rc of redeemCodes) {
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
          rc.id, rc.game_id, rc.code, rc.reward, rc.status, rc.expired_at || null,
          rc.source, rc.last_checked, rc.verified_at || rc.last_checked,
          rc.verification_provider || 'ManualProvider', rc.created_at, rc.updated_at, 0
        ]
      );
    }

    // Seed Events
    const events = sqliteDb.prepare('SELECT * FROM events').all();
    for (const ev of events) {
      await client.query(
        `INSERT INTO events (
           id, game_id, title, slug, description, type,
           start_date, end_date, rewards, banner_image, created_at, updated_at, is_demo
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, title = EXCLUDED.title, slug = EXCLUDED.slug,
           description = EXCLUDED.description, type = EXCLUDED.type, start_date = EXCLUDED.start_date,
           end_date = EXCLUDED.end_date, rewards = EXCLUDED.rewards, banner_image = EXCLUDED.banner_image,
           updated_at = EXCLUDED.updated_at, is_demo = EXCLUDED.is_demo`,
        [
          ev.id, ev.game_id, ev.title, ev.slug, ev.description, ev.type,
          ev.start_date, ev.end_date, ev.rewards || '[]', ev.banner_image,
          ev.created_at, ev.updated_at, 0
        ]
      );
    }

    // Verification of exact target counts
    console.log('\n--- VERIFYING PRODUCTION CONTENT QUANTITIES IN POSTGRESQL ---');
    const [cGames, cChars, cGuides, cNews, cItems, cCodes, cEvents, cAuthors] = await Promise.all([
      client.query('SELECT count(*) as c FROM games'),
      client.query('SELECT count(*) as c FROM characters'),
      client.query('SELECT count(*) as c FROM guides'),
      client.query('SELECT count(*) as c FROM news'),
      client.query('SELECT count(*) as c FROM items'),
      client.query('SELECT count(*) as c FROM redeem_codes'),
      client.query('SELECT count(*) as c FROM events'),
      client.query('SELECT count(*) as c FROM authors'),
    ]);

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

    console.log(`  Games        : ${stats.games} (Target: 22)`);
    console.log(`  Characters   : ${stats.characters} (Target: 52)`);
    console.log(`  Guides       : ${stats.guides} (Target: 56)`);
    console.log(`  News         : ${stats.news} (Target: 35)`);
    console.log(`  Items        : ${stats.items} (Target: 16)`);
    console.log(`  Redeem Codes : ${stats.redeemCodes} (Target: 24)`);
    console.log(`  Events       : ${stats.events} (Target: 26)`);
    console.log(`  Authors      : ${stats.authors} (Target: 4)`);

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
      throw new Error(
        `Production seed counts mismatch! Expected: 22/52/56/35/16/24/26/4. Found: ${JSON.stringify(stats)}`
      );
    }

    console.log('\n=============================================================');
    console.log('✓ POSTGRESQL PRODUCTION SEED VERIFIED SUCCESSFULLY (100% MATCH)!');
    console.log('=============================================================');

    client.release();
    await pool.end();
  } catch (err) {
    console.error('\n[ERROR] Seeding failed:', err.message);
    await pool.end();
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPostgresSeed();
}

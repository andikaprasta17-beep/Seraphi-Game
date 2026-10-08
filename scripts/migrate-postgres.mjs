import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import pg from 'pg';

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

export const POSTGRES_SCHEMA_SQL = `
-- 1. Authors Table
CREATE TABLE IF NOT EXISTS authors (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  avatar TEXT NOT NULL,
  bio TEXT NOT NULL,
  role VARCHAR(100) NOT NULL DEFAULT 'Contributor',
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_authors_slug ON authors(slug);

-- 2. Games Table
CREATE TABLE IF NOT EXISTS games (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  cover_image TEXT NOT NULL,
  banner_image TEXT NOT NULL,
  description TEXT NOT NULL,
  developer VARCHAR(255) NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  release_date VARCHAR(50) NOT NULL,
  platforms TEXT NOT NULL,
  genres TEXT NOT NULL,
  status VARCHAR(50) NOT NULL,
  rating DOUBLE PRECISION NOT NULL,
  official_url TEXT NOT NULL,
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  views INTEGER DEFAULT 0,
  is_demo INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  no_index INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_games_slug ON games(slug);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_games_is_demo ON games(is_demo);

-- 3. Characters Table
CREATE TABLE IF NOT EXISTS characters (
  id VARCHAR(100) PRIMARY KEY,
  game_id VARCHAR(100) NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  portrait TEXT NOT NULL,
  full_image TEXT NOT NULL,
  description TEXT NOT NULL,
  role VARCHAR(100) NOT NULL,
  element VARCHAR(100) NOT NULL,
  weapon VARCHAR(100) NOT NULL,
  rarity INTEGER NOT NULL,
  release_date VARCHAR(50) NOT NULL,
  skills TEXT NOT NULL,
  talents TEXT NOT NULL,
  recommended_build TEXT NOT NULL,
  recommended_weapons TEXT NOT NULL,
  recommended_team TEXT NOT NULL,
  materials TEXT NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  views INTEGER DEFAULT 0,
  is_demo INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  no_index INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_characters_game_id ON characters(game_id);
CREATE INDEX IF NOT EXISTS idx_characters_slug ON characters(slug);
CREATE INDEX IF NOT EXISTS idx_characters_status ON characters(status);
CREATE INDEX IF NOT EXISTS idx_characters_is_demo ON characters(is_demo);

-- 4. Items Table
CREATE TABLE IF NOT EXISTS items (
  id VARCHAR(100) PRIMARY KEY,
  game_id VARCHAR(100) NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  rarity INTEGER NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  stats TEXT NOT NULL,
  how_to_get TEXT NOT NULL,
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  is_demo INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_items_game_id ON items(game_id);
CREATE INDEX IF NOT EXISTS idx_items_slug ON items(slug);
CREATE INDEX IF NOT EXISTS idx_items_is_demo ON items(is_demo);

-- 5. Guides Table
CREATE TABLE IF NOT EXISTS guides (
  id VARCHAR(100) PRIMARY KEY,
  game_id VARCHAR(100) NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  author_id VARCHAR(100) REFERENCES authors(id) ON DELETE SET NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  reading_time INTEGER NOT NULL,
  featured_image TEXT NOT NULL,
  author_slug VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  views INTEGER DEFAULT 0,
  is_demo INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  no_index INTEGER DEFAULT 0,
  tags TEXT NOT NULL,
  faq TEXT,
  canonical_url TEXT,
  related_guide_ids TEXT,
  related_character_ids TEXT
);
CREATE INDEX IF NOT EXISTS idx_guides_game_id ON guides(game_id);
CREATE INDEX IF NOT EXISTS idx_guides_slug ON guides(slug);
CREATE INDEX IF NOT EXISTS idx_guides_status ON guides(status);
CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category);
CREATE INDEX IF NOT EXISTS idx_guides_is_demo ON guides(is_demo);
CREATE INDEX IF NOT EXISTS idx_guides_author_id ON guides(author_id);

-- 6. News Table
CREATE TABLE IF NOT EXISTS news (
  id VARCHAR(100) PRIMARY KEY,
  game_id VARCHAR(100) REFERENCES games(id) ON DELETE SET NULL,
  author_id VARCHAR(100) REFERENCES authors(id) ON DELETE SET NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  featured_image TEXT NOT NULL,
  author_slug VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  views INTEGER DEFAULT 0,
  is_demo INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  no_index INTEGER DEFAULT 0,
  tags TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_news_game_id ON news(game_id);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_is_demo ON news(is_demo);
CREATE INDEX IF NOT EXISTS idx_news_author_id ON news(author_id);

-- 7. Redeem Codes Table
CREATE TABLE IF NOT EXISTS redeem_codes (
  id VARCHAR(100) PRIMARY KEY,
  game_id VARCHAR(100) NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  code VARCHAR(100) NOT NULL,
  reward TEXT NOT NULL,
  status VARCHAR(50) NOT NULL,
  expired_at VARCHAR(100),
  source VARCHAR(255) NOT NULL,
  last_checked VARCHAR(100) NOT NULL,
  verified_at VARCHAR(100),
  verification_provider VARCHAR(100) DEFAULT 'ManualProvider',
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  is_demo INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_redeem_codes_game_id ON redeem_codes(game_id);
CREATE INDEX IF NOT EXISTS idx_redeem_codes_status ON redeem_codes(status);
CREATE INDEX IF NOT EXISTS idx_redeem_codes_is_demo ON redeem_codes(is_demo);

-- 8. Events Table
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(100) PRIMARY KEY,
  game_id VARCHAR(100) NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
  official_url TEXT DEFAULT '',
  start_date VARCHAR(100) NOT NULL,
  end_date VARCHAR(100) NOT NULL,
  rewards TEXT NOT NULL,
  banner_image TEXT NOT NULL,
  image TEXT DEFAULT '',
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  is_demo INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_events_game_id ON events(game_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_is_demo ON events(is_demo);

-- 9. Tier Lists Table
CREATE TABLE IF NOT EXISTS tier_lists (
  id VARCHAR(100) PRIMARY KEY,
  game_id VARCHAR(100) NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  version VARCHAR(50) NOT NULL DEFAULT '1.0',
  tiers TEXT NOT NULL,
  updated_at VARCHAR(100) NOT NULL,
  created_at VARCHAR(100) NOT NULL,
  is_demo INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_tier_lists_game_id ON tier_lists(game_id);
CREATE INDEX IF NOT EXISTS idx_tier_lists_slug ON tier_lists(slug);

-- 10. Ad Slots Table
CREATE TABLE IF NOT EXISTS ad_slots (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL DEFAULT '',
  slot_type VARCHAR(100) NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 0,
  ad_type VARCHAR(100) NOT NULL DEFAULT 'custom',
  image_url TEXT,
  target_url TEXT,
  label VARCHAR(255),
  created_at VARCHAR(100) NOT NULL,
  updated_at VARCHAR(100) NOT NULL
);

-- 11. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at VARCHAR(100) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- 12. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at VARCHAR(100) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
`;

export async function runPostgresMigration() {
  console.log('=============================================================');
  console.log('   SERAPHI GAME — POSTGRESQL SCHEMA & DATA MIGRATION         ');
  console.log('   Target: Neon Free PostgreSQL / Koyeb Free Web Service     ');
  console.log('=============================================================\n');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('[ERROR] DATABASE_URL environment variable is not defined.');
    console.error('Please configure DATABASE_URL=postgresql://user:pass@host/dbname in .env or environment.');
    process.exit(1);
  }

  const isNeon = connectionString.includes('neon.tech');
  console.log(`Connecting to PostgreSQL (${isNeon ? 'Neon Serverless' : 'Custom Host'})...`);

  const pool = new Pool({
    connectionString,
    ssl: isNeon || process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 10000,
  });

  try {
    const client = await pool.connect();
    console.log('✓ Successfully connected to PostgreSQL database.\n');

    // 1. Create Schema and Indexes
    console.log('Applying PostgreSQL schema and indexes...');
    await client.query(POSTGRES_SCHEMA_SQL);
    console.log('✓ All 12 tables and indexes verified/created.\n');

    // 2. Data Migration from SQLite
    const sqlitePath = path.join(rootDir, 'data', 'seraphi.db');
    if (!fs.existsSync(sqlitePath)) {
      console.log('Notice: SQLite source database (data/seraphi.db) not found. Skipping data transfer.');
      client.release();
      await pool.end();
      return;
    }

    console.log(`Transferring existing data from SQLite (${sqlitePath})...`);
    console.log('(Note: SQLite source database will NOT be modified or deleted)\n');
    const sqliteDb = new DatabaseSync(sqlitePath);

    // Helper to safely fetch table rows from SQLite
    const getSqliteRows = (tableName) => {
      try {
        return sqliteDb.prepare(`SELECT * FROM ${tableName}`).all();
      } catch (err) {
        console.warn(`  [Notice] Could not read SQLite table '${tableName}': ${err.message}`);
        return [];
      }
    };

    // Migrate Authors
    const authors = getSqliteRows('authors');
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
    console.log(`✓ Authors migrated: ${authors.length}`);

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
           developer = EXCLUDED.developer, publisher = EXCLUDED.publisher, release_date = EXCLUDED.release_date,
           platforms = EXCLUDED.platforms, genres = EXCLUDED.genres, status = EXCLUDED.status,
           rating = EXCLUDED.rating, official_url = EXCLUDED.official_url, updated_at = EXCLUDED.updated_at,
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
    console.log(`✓ Games migrated: ${games.length}`);

    // Migrate Characters
    const characters = getSqliteRows('characters');
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
          c.status, c.created_at, c.updated_at, Number(c.views || 0), Number(c.is_demo || 0),
          c.meta_title || null, c.meta_description || null, Number(c.no_index || 0)
        ]
      );
    }
    console.log(`✓ Characters migrated: ${characters.length}`);

    // Migrate Items
    const items = getSqliteRows('items');
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
          it.description, it.stats, it.how_to_get, it.created_at, it.updated_at, Number(it.is_demo || 0)
        ]
      );
    }
    console.log(`✓ Items migrated: ${items.length}`);

    // Migrate Guides
    const guides = getSqliteRows('guides');
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
          gu.created_at, gu.updated_at, Number(gu.views || 0), Number(gu.is_demo || 0),
          gu.meta_title || null, gu.meta_description || null, Number(gu.no_index || 0),
          gu.tags || '[]', gu.faq || '[]', gu.canonical_url || null,
          gu.related_guide_ids || '[]', gu.related_character_ids || '[]'
        ]
      );
    }
    console.log(`✓ Guides migrated: ${guides.length}`);

    // Migrate News
    const news = getSqliteRows('news');
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
          Number(n.views || 0), Number(n.is_demo || 0), n.meta_title || null,
          n.meta_description || null, Number(n.no_index || 0), n.tags || '[]'
        ]
      );
    }
    console.log(`✓ News migrated: ${news.length}`);

    // Migrate Redeem Codes
    const redeemCodes = getSqliteRows('redeem_codes');
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
          rc.verification_provider || 'ManualProvider', rc.created_at, rc.updated_at, Number(rc.is_demo || 0)
        ]
      );
    }
    console.log(`✓ Redeem codes migrated: ${redeemCodes.length}`);

    // Migrate Events
    const events = getSqliteRows('events');
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
          ev.created_at, ev.updated_at, Number(ev.is_demo || 0)
        ]
      );
    }
    console.log(`✓ Events migrated: ${events.length}`);

    // Migrate Tier Lists
    const tierLists = getSqliteRows('tier_lists');
    for (const tl of tierLists) {
      await client.query(
        `INSERT INTO tier_lists (
           id, game_id, title, slug, description, tiers, updated_at, created_at, is_demo
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE SET
           game_id = EXCLUDED.game_id, title = EXCLUDED.title, slug = EXCLUDED.slug,
           description = EXCLUDED.description, tiers = EXCLUDED.tiers, updated_at = EXCLUDED.updated_at,
           is_demo = EXCLUDED.is_demo`,
        [
          tl.id, tl.game_id, tl.title, tl.slug, tl.description,
          tl.tiers || '[]', tl.updated_at, tl.created_at, Number(tl.is_demo || 0)
        ]
      );
    }
    console.log(`✓ Tier lists migrated: ${tierLists.length}`);

    // Migrate Ad Slots
    const adSlots = getSqliteRows('ad_slots');
    for (const slot of adSlots) {
      await client.query(
        `INSERT INTO ad_slots (
           id, slot_type, is_active, image_url, target_url, label, created_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           slot_type = EXCLUDED.slot_type, is_active = EXCLUDED.is_active,
           image_url = EXCLUDED.image_url, target_url = EXCLUDED.target_url,
           label = EXCLUDED.label, updated_at = EXCLUDED.updated_at`,
        [
          slot.id, slot.slot_type, Number(slot.is_active || 0), slot.image_url || null,
          slot.target_url || null, slot.label || null, slot.created_at, slot.updated_at
        ]
      );
    }
    console.log(`✓ Ad slots migrated: ${adSlots.length}`);

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
    console.log(`✓ Admin users migrated: ${adminUsers.length}`);

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
    console.log(`✓ Contact messages migrated: ${contactMessages.length}`);

    console.log('\n=============================================================');
    console.log('✓ POSTGRESQL DATA MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('=============================================================');

    client.release();
    await pool.end();
  } catch (err) {
    console.error('\n[ERROR] Migration failed:', err.message);
    await pool.end();
    process.exit(1);
  }
}

// Execute when invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPostgresMigration();
}

import type { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
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
import {
  ALL_SEED_GAMES,
  ALL_SEED_CHARACTERS,
  ALL_SEED_GUIDES,
  ALL_SEED_NEWS,
  ALL_SEED_REDEEM_CODES,
  ALL_SEED_EVENTS,
  ALL_SEED_ITEMS,
  SEED_TIER_LISTS,
  SEED_AD_SLOTS,
  SEED_AUTHORS,
} from './data-seed';
import { hashPassword } from './auth';
import { isProductionMode } from './seo';
import { DatabaseAdapter, GlobalSearchResult } from './db-adapter';

// Safe runtime loader for DatabaseSync (node:sqlite is built into Node.js >= 22.5)
// Allows Node.js 18.20.8 (e.g. Hypercloudhost / cPanel Passenger) to run without module resolution errors
let _DatabaseSyncClass: any = null;
function getDatabaseSyncClass(): any {
  if (_DatabaseSyncClass) return _DatabaseSyncClass;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const sqliteModule = require('node:sqlite');
    _DatabaseSyncClass = sqliteModule.DatabaseSync;
    return _DatabaseSyncClass;
  } catch {
    return null;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var _seraphi_sqlite_db: DatabaseSync | undefined;
}

export function getSqliteDatabase(): DatabaseSync {
  if (globalThis._seraphi_sqlite_db) {
    return globalThis._seraphi_sqlite_db;
  }

  const DatabaseSyncClass = getDatabaseSyncClass();
  if (!DatabaseSyncClass) {
    throw new Error(
      'node:sqlite is not available in Node.js < 22.5. ' +
      'For Node.js 18 (e.g. Hypercloudhost / cPanel), please configure DATABASE_PROVIDER=postgres with DATABASE_URL.'
    );
  }

  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'seraphi.db');
  const db = new DatabaseSyncClass(dbPath) as DatabaseSync;

  db.exec('PRAGMA busy_timeout = 10000;');
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');

  initSchema(db);
  runMigrations(db);
  createIndexes(db);
  syncSeedData(db);

  globalThis._seraphi_sqlite_db = db;
  return db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS authors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      avatar TEXT NOT NULL,
      bio TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Contributor',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      cover_image TEXT NOT NULL,
      banner_image TEXT NOT NULL,
      description TEXT NOT NULL,
      developer TEXT NOT NULL,
      publisher TEXT NOT NULL,
      release_date TEXT NOT NULL,
      platforms TEXT NOT NULL,
      genres TEXT NOT NULL,
      status TEXT NOT NULL,
      rating REAL NOT NULL,
      official_url TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      views INTEGER DEFAULT 0,
      is_demo INTEGER DEFAULT 0,
      meta_title TEXT,
      meta_description TEXT,
      no_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS characters (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      portrait TEXT NOT NULL,
      full_image TEXT NOT NULL,
      description TEXT NOT NULL,
      role TEXT NOT NULL,
      element TEXT NOT NULL,
      weapon TEXT NOT NULL,
      rarity INTEGER NOT NULL,
      release_date TEXT NOT NULL,
      skills TEXT NOT NULL,
      talents TEXT NOT NULL,
      recommended_build TEXT NOT NULL,
      recommended_weapons TEXT NOT NULL,
      recommended_team TEXT NOT NULL,
      materials TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      views INTEGER DEFAULT 0,
      is_demo INTEGER DEFAULT 0,
      meta_title TEXT,
      meta_description TEXT,
      no_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      type TEXT NOT NULL,
      rarity INTEGER NOT NULL,
      icon TEXT NOT NULL,
      description TEXT NOT NULL,
      stats TEXT NOT NULL,
      how_to_get TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_demo INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS guides (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      author_id TEXT,
      author TEXT DEFAULT 'Redaksi Seraphi',
      author_slug TEXT DEFAULT 'seraphi-editorial',
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      reading_time INTEGER NOT NULL,
      featured_image TEXT NOT NULL,
      thumbnail TEXT DEFAULT '',
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      published_at TEXT DEFAULT '',
      updated_at TEXT NOT NULL,
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

    CREATE TABLE IF NOT EXISTS news (
      id TEXT PRIMARY KEY,
      game_id TEXT,
      author_id TEXT,
      author TEXT DEFAULT 'Redaksi Seraphi',
      author_slug TEXT DEFAULT 'seraphi-editorial',
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      featured_image TEXT NOT NULL,
      thumbnail TEXT DEFAULT '',
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      published_at TEXT DEFAULT '',
      updated_at TEXT NOT NULL,
      views INTEGER DEFAULT 0,
      is_demo INTEGER DEFAULT 0,
      meta_title TEXT,
      meta_description TEXT,
      no_index INTEGER DEFAULT 0,
      tags TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS redeem_codes (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      code TEXT NOT NULL,
      reward TEXT NOT NULL,
      status TEXT NOT NULL,
      expired_at TEXT,
      source TEXT NOT NULL,
      last_checked TEXT NOT NULL,
      verified_at TEXT,
      verification_provider TEXT DEFAULT 'ManualProvider',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_demo INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      rewards TEXT NOT NULL,
      banner_image TEXT NOT NULL,
      image TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'ACTIVE',
      official_url TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      is_demo INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tier_lists (
      id TEXT PRIMARY KEY,
      game_id TEXT NOT NULL,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      version TEXT NOT NULL DEFAULT '1.0',
      tiers TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      is_demo INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS ad_slots (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      slot_type TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 0,
      ad_type TEXT NOT NULL DEFAULT 'custom',
      image_url TEXT,
      target_url TEXT,
      label TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

function runMigrations(db: DatabaseSync) {
  const addColumnIfNotExists = (table: string, column: string, columnDef: string) => {
    try {
      const tableInfo = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
      const columnExists = tableInfo.some((col) => col.name === column);
      if (!columnExists) {
        db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${columnDef}`);
      }
    } catch (err) {
      console.error(`Migration error adding ${column} to ${table}:`, err);
    }
  };

  const tablesWithDemo = ['games', 'characters', 'guides', 'news', 'items', 'redeem_codes', 'events', 'tier_lists'];
  for (const t of tablesWithDemo) {
    addColumnIfNotExists(t, 'is_demo', 'INTEGER DEFAULT 0');
  }

  const contentTables = ['games', 'characters', 'guides', 'news'];
  for (const t of contentTables) {
    addColumnIfNotExists(t, 'meta_title', 'TEXT');
    addColumnIfNotExists(t, 'meta_description', 'TEXT');
    addColumnIfNotExists(t, 'no_index', 'INTEGER DEFAULT 0');
  }

  addColumnIfNotExists('guides', 'author_id', 'TEXT');
  addColumnIfNotExists('guides', 'author', "TEXT DEFAULT 'Redaksi Seraphi'");
  addColumnIfNotExists('guides', 'published_at', "TEXT DEFAULT ''");
  addColumnIfNotExists('guides', 'difficulty', "TEXT DEFAULT 'medium'");
  addColumnIfNotExists('guides', 'reading_time', 'INTEGER DEFAULT 5');
  addColumnIfNotExists('guides', 'featured_image', "TEXT DEFAULT ''");
  addColumnIfNotExists('guides', 'thumbnail', "TEXT DEFAULT ''");
  addColumnIfNotExists('guides', 'faq', 'TEXT');
  addColumnIfNotExists('guides', 'canonical_url', 'TEXT');
  addColumnIfNotExists('guides', 'related_guide_ids', 'TEXT');
  addColumnIfNotExists('guides', 'related_character_ids', 'TEXT');

  try {
    const guidesCols = (db.prepare('PRAGMA table_info(guides)').all() as { name: string }[]).map((c) => c.name);
    if (guidesCols.includes('thumbnail')) {
      db.exec("UPDATE guides SET featured_image = thumbnail WHERE featured_image IS NULL OR featured_image = ''");
    }
  } catch {}

  addColumnIfNotExists('guides', 'created_at', 'TEXT');
  try {
    const guidesCols = (db.prepare('PRAGMA table_info(guides)').all() as { name: string }[]).map((c) => c.name);
    if (guidesCols.includes('published_at')) {
      db.exec("UPDATE guides SET created_at = published_at WHERE created_at IS NULL OR created_at = ''");
    }
  } catch {}

  addColumnIfNotExists('guides', 'author_slug', 'TEXT');
  try {
    db.exec(`
      UPDATE guides SET author_slug = CASE
        WHEN author = 'Kaelen Arisandi' OR author_id = 'author-kael-strats' THEN 'kael-strats'
        WHEN author = 'Lyra Valery' OR author_id = 'author-lyra-lore' THEN 'lyra-lore'
        WHEN author = 'Ryu Pratama' OR author_id = 'author-ryu-mechanics' THEN 'ryu-mechanics'
        ELSE 'seraphi-editorial'
      END WHERE author_slug IS NULL OR author_slug = ''
    `);
  } catch {}

  addColumnIfNotExists('news', 'author_id', 'TEXT');
  addColumnIfNotExists('news', 'author', "TEXT DEFAULT 'Redaksi Seraphi'");
  addColumnIfNotExists('news', 'author_slug', 'TEXT');
  addColumnIfNotExists('news', 'published_at', "TEXT DEFAULT ''");
  addColumnIfNotExists('news', 'featured_image', "TEXT DEFAULT ''");
  addColumnIfNotExists('news', 'thumbnail', "TEXT DEFAULT ''");
  addColumnIfNotExists('news', 'created_at', 'TEXT');

  try {
    const newsCols = (db.prepare('PRAGMA table_info(news)').all() as { name: string }[]).map((c) => c.name);
    if (newsCols.includes('thumbnail')) {
      db.exec("UPDATE news SET featured_image = thumbnail WHERE featured_image IS NULL OR featured_image = ''");
    }
    if (newsCols.includes('published_at')) {
      db.exec("UPDATE news SET created_at = published_at WHERE created_at IS NULL OR created_at = ''");
    }
    db.exec(`
      UPDATE news SET author_slug = CASE
        WHEN author = 'Kaelen Arisandi' OR author_id = 'author-kael-strats' THEN 'kael-strats'
        WHEN author = 'Lyra Valery' OR author_id = 'author-lyra-lore' THEN 'lyra-lore'
        WHEN author = 'Ryu Pratama' OR author_id = 'author-ryu-mechanics' THEN 'ryu-mechanics'
        ELSE 'seraphi-editorial'
      END WHERE author_slug IS NULL OR author_slug = ''
    `);
  } catch {}

  addColumnIfNotExists('events', 'status', "TEXT DEFAULT 'ACTIVE'");
  addColumnIfNotExists('events', 'official_url', "TEXT DEFAULT ''");
  addColumnIfNotExists('events', 'slug', 'TEXT');
  addColumnIfNotExists('events', 'type', "TEXT DEFAULT 'EVENT'");
  addColumnIfNotExists('events', 'banner_image', "TEXT DEFAULT ''");
  addColumnIfNotExists('events', 'image', "TEXT DEFAULT ''");

  try {
    const eventsCols = (db.prepare('PRAGMA table_info(events)').all() as { name: string }[]).map((c) => c.name);
    if (eventsCols.includes('slug')) {
      db.exec("UPDATE events SET slug = id WHERE slug IS NULL OR slug = ''");
    }
    if (eventsCols.includes('image')) {
      db.exec("UPDATE events SET banner_image = image WHERE banner_image IS NULL OR banner_image = ''");
    }
    if (eventsCols.includes('status')) {
      db.exec("UPDATE events SET status = 'ACTIVE' WHERE status IS NULL OR status = ''");
    }
    if (eventsCols.includes('official_url')) {
      db.exec("UPDATE events SET official_url = '' WHERE official_url IS NULL");
    }
  } catch {}

  // Relational repair for legacy Free Fire IDs
  try {
    db.exec("UPDATE events SET game_id = 'game-ff' WHERE game_id = 'game-free-fire'");
    db.exec("UPDATE characters SET game_id = 'game-ff' WHERE game_id = 'game-free-fire'");
    db.exec("UPDATE guides SET game_id = 'game-ff' WHERE game_id = 'game-free-fire'");
    db.exec("UPDATE news SET game_id = 'game-ff' WHERE game_id = 'game-free-fire'");
    db.exec("UPDATE redeem_codes SET game_id = 'game-ff' WHERE game_id = 'game-free-fire'");
  } catch {}

  addColumnIfNotExists('tier_lists', 'version', "TEXT DEFAULT '1.0'");
  addColumnIfNotExists('tier_lists', 'created_at', 'TEXT');
  try {
    db.exec("UPDATE tier_lists SET created_at = updated_at WHERE created_at IS NULL OR created_at = ''");
  } catch {}

  addColumnIfNotExists('ad_slots', 'name', "TEXT DEFAULT ''");
  addColumnIfNotExists('ad_slots', 'ad_type', "TEXT DEFAULT 'custom'");
  addColumnIfNotExists('ad_slots', 'created_at', 'TEXT');
  addColumnIfNotExists('ad_slots', 'updated_at', 'TEXT');
  try {
    const now = new Date().toISOString();
    db.exec(`UPDATE ad_slots SET created_at = '${now}' WHERE created_at IS NULL OR created_at = ''`);
    db.exec(`UPDATE ad_slots SET updated_at = '${now}' WHERE updated_at IS NULL OR updated_at = ''`);
  } catch {}

  addColumnIfNotExists('redeem_codes', 'verified_at', 'TEXT');
  addColumnIfNotExists('redeem_codes', 'verification_provider', "TEXT DEFAULT 'ManualProvider'");
}

function createIndexes(db: DatabaseSync) {
  try {
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_characters_game_id ON characters(game_id);
      CREATE INDEX IF NOT EXISTS idx_characters_status ON characters(status);
      CREATE INDEX IF NOT EXISTS idx_characters_slug ON characters(slug);
      CREATE INDEX IF NOT EXISTS idx_characters_is_demo ON characters(is_demo);

      CREATE INDEX IF NOT EXISTS idx_guides_game_id ON guides(game_id);
      CREATE INDEX IF NOT EXISTS idx_guides_status ON guides(status);
      CREATE INDEX IF NOT EXISTS idx_guides_slug ON guides(slug);
      CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category);
      CREATE INDEX IF NOT EXISTS idx_guides_is_demo ON guides(is_demo);
      CREATE INDEX IF NOT EXISTS idx_guides_author_id ON guides(author_id);

      CREATE INDEX IF NOT EXISTS idx_news_game_id ON news(game_id);
      CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
      CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
      CREATE INDEX IF NOT EXISTS idx_news_is_demo ON news(is_demo);
      CREATE INDEX IF NOT EXISTS idx_news_author_id ON news(author_id);

      CREATE INDEX IF NOT EXISTS idx_items_game_id ON items(game_id);
      CREATE INDEX IF NOT EXISTS idx_items_slug ON items(slug);
      CREATE INDEX IF NOT EXISTS idx_items_is_demo ON items(is_demo);

      CREATE INDEX IF NOT EXISTS idx_redeem_codes_game_id ON redeem_codes(game_id);
      CREATE INDEX IF NOT EXISTS idx_redeem_codes_status ON redeem_codes(status);
      CREATE INDEX IF NOT EXISTS idx_redeem_codes_is_demo ON redeem_codes(is_demo);

      CREATE INDEX IF NOT EXISTS idx_events_game_id ON events(game_id);
      CREATE INDEX IF NOT EXISTS idx_events_is_demo ON events(is_demo);
      CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);

      CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
    `);
  } catch (err) {
    console.error('Error creating indexes:', err);
  }
}

function syncSeedData(db: DatabaseSync) {
  // Authors
  const insertAuthorStmt = db.prepare(`
    INSERT OR REPLACE INTO authors (
      id, name, slug, avatar, bio, role, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const author of SEED_AUTHORS) {
    insertAuthorStmt.run(
      author.id,
      author.name,
      author.slug,
      author.avatar,
      author.bio,
      author.role,
      author.created_at,
      author.updated_at
    );
  }

  // Games
  const insertGameStmt = db.prepare(`
    INSERT OR REPLACE INTO games (
      id, name, slug, cover_image, banner_image, description,
      developer, publisher, release_date, platforms, genres,
      status, rating, official_url, created_at, updated_at, views, is_demo,
      meta_title, meta_description, no_index
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const game of ALL_SEED_GAMES) {
    insertGameStmt.run(
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
      game.views || 0,
      game.is_demo ? 1 : 0,
      game.meta_title || null,
      game.meta_description || null,
      game.no_index ? 1 : 0
    );
  }

  // Characters
  const insertCharacterStmt = db.prepare(`
    INSERT OR REPLACE INTO characters (
      id, game_id, name, slug, portrait, full_image, description,
      role, element, weapon, rarity, release_date, skills, talents,
      recommended_build, recommended_weapons, recommended_team,
      materials, status, created_at, updated_at, views, is_demo,
      meta_title, meta_description, no_index
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const char of ALL_SEED_CHARACTERS) {
    insertCharacterStmt.run(
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
      JSON.stringify(char.skills),
      JSON.stringify(char.talents),
      JSON.stringify(char.recommended_build),
      JSON.stringify(char.recommended_weapons),
      JSON.stringify(char.recommended_team),
      JSON.stringify(char.materials),
      char.status,
      char.created_at,
      char.updated_at,
      char.views || 0,
      char.is_demo ? 1 : 0,
      char.meta_title || null,
      char.meta_description || null,
      char.no_index ? 1 : 0
    );
  }

  // Items
  const insertItemStmt = db.prepare(`
    INSERT OR REPLACE INTO items (
      id, game_id, name, slug, type, rarity, icon, description, stats, how_to_get, created_at, updated_at, is_demo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const item of ALL_SEED_ITEMS) {
    insertItemStmt.run(
      item.id,
      item.game_id,
      item.name,
      item.slug,
      item.type,
      item.rarity,
      item.icon,
      item.description,
      JSON.stringify(item.stats),
      item.how_to_get,
      item.created_at,
      item.updated_at,
      item.is_demo ? 1 : 0
    );
  }

  // Guides
  const insertGuideStmt = db.prepare(`
    INSERT OR REPLACE INTO guides (
      id, game_id, author_id, author, author_slug, title, slug, excerpt, content, category,
      difficulty, reading_time, featured_image, thumbnail, status, created_at, published_at,
      updated_at, views, is_demo, meta_title, meta_description, no_index,
      tags, faq, canonical_url, related_guide_ids, related_character_ids
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const guide of ALL_SEED_GUIDES) {
    const authorSlug = guide.author_slug || (guide.author === 'Kaelen Arisandi' ? 'kael-strats' : guide.author === 'Lyra Valery' ? 'lyra-lore' : guide.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial');
    insertGuideStmt.run(
      guide.id,
      guide.game_id === 'game-free-fire' ? 'game-ff' : guide.game_id,
      guide.author_id || (authorSlug === 'kael-strats' ? 'author-kael-strats' : authorSlug === 'lyra-lore' ? 'author-lyra-lore' : authorSlug === 'ryu-mechanics' ? 'author-ryu-mechanics' : 'author-seraphi-editorial'),
      guide.author || 'Redaksi Seraphi',
      authorSlug,
      guide.title,
      guide.slug,
      guide.excerpt,
      guide.content,
      guide.category,
      guide.difficulty || 'medium',
      guide.reading_time || 5,
      guide.featured_image || guide.thumbnail || '',
      guide.thumbnail || guide.featured_image || '',
      guide.status,
      guide.created_at || guide.published_at || new Date().toISOString(),
      guide.published_at || guide.created_at || new Date().toISOString(),
      guide.updated_at,
      guide.views || 0,
      guide.is_demo ? 1 : 0,
      guide.meta_title || null,
      guide.meta_description || null,
      guide.no_index ? 1 : 0,
      JSON.stringify(guide.tags || []),
      JSON.stringify(guide.faq || []),
      guide.canonical_url || null,
      JSON.stringify(guide.related_guide_ids || guide.related_characters || []),
      JSON.stringify(guide.related_character_ids || [])
    );
  }

  // News
  const insertNewsStmt = db.prepare(`
    INSERT OR REPLACE INTO news (
      id, game_id, author_id, author, author_slug, title, slug, excerpt, content, category,
      featured_image, thumbnail, status, created_at, published_at, updated_at, views, is_demo,
      meta_title, meta_description, no_index, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const newsItem of ALL_SEED_NEWS) {
    const authorSlug = newsItem.author_slug || (newsItem.author === 'Kaelen Arisandi' ? 'kael-strats' : newsItem.author === 'Lyra Valery' ? 'lyra-lore' : newsItem.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial');
    insertNewsStmt.run(
      newsItem.id,
      newsItem.game_id === 'game-free-fire' ? 'game-ff' : (newsItem.game_id || null),
      newsItem.author_id || (authorSlug === 'kael-strats' ? 'author-kael-strats' : authorSlug === 'lyra-lore' ? 'author-lyra-lore' : authorSlug === 'ryu-mechanics' ? 'author-ryu-mechanics' : 'author-seraphi-editorial'),
      newsItem.author || 'Redaksi Seraphi',
      authorSlug,
      newsItem.title,
      newsItem.slug,
      newsItem.excerpt,
      newsItem.content,
      newsItem.category,
      newsItem.featured_image || newsItem.thumbnail || '',
      newsItem.thumbnail || newsItem.featured_image || '',
      newsItem.status,
      newsItem.created_at || newsItem.published_at || new Date().toISOString(),
      newsItem.published_at || newsItem.created_at || new Date().toISOString(),
      newsItem.updated_at,
      newsItem.views || 0,
      newsItem.is_demo ? 1 : 0,
      newsItem.meta_title || null,
      newsItem.meta_description || null,
      newsItem.no_index ? 1 : 0,
      JSON.stringify(newsItem.tags || [])
    );
  }

  // Redeem Codes
  const insertRedeemCodeStmt = db.prepare(`
    INSERT OR REPLACE INTO redeem_codes (
      id, game_id, code, reward, status, expired_at, source,
      last_checked, verified_at, verification_provider, created_at, updated_at, is_demo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const rc of ALL_SEED_REDEEM_CODES) {
    insertRedeemCodeStmt.run(
      rc.id,
      rc.game_id === 'game-free-fire' ? 'game-ff' : rc.game_id,
      rc.code,
      rc.reward,
      rc.status,
      rc.expired_at || null,
      rc.source,
      rc.last_checked,
      rc.verified_at || rc.last_checked,
      rc.verification_provider || 'ManualProvider',
      rc.created_at,
      rc.updated_at,
      rc.is_demo ? 1 : 0
    );
  }

  // Events
  const insertEventStmt = db.prepare(`
    INSERT OR REPLACE INTO events (
      id, game_id, title, slug, description, type,
      status, official_url, start_date, end_date, rewards, banner_image, image, created_at, updated_at, is_demo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const ev of ALL_SEED_EVENTS) {
    insertEventStmt.run(
      ev.id,
      ev.game_id === 'game-free-fire' ? 'game-ff' : ev.game_id,
      ev.title,
      ev.slug || ev.id,
      ev.description,
      ev.type || 'EVENT',
      ev.status || 'ACTIVE',
      ev.official_url || '',
      ev.start_date,
      ev.end_date,
      JSON.stringify(ev.rewards || []),
      ev.banner_image || ev.image || '',
      ev.image || ev.banner_image || '',
      ev.created_at,
      ev.updated_at,
      ev.is_demo ? 1 : 0
    );
  }

  // Tier Lists
  const insertTierListStmt = db.prepare(`
    INSERT OR REPLACE INTO tier_lists (
      id, game_id, title, slug, description, version, tiers, updated_at, created_at, is_demo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const tl of SEED_TIER_LISTS) {
    insertTierListStmt.run(
      tl.id,
      tl.game_id === 'game-free-fire' ? 'game-ff' : tl.game_id,
      tl.title,
      tl.slug,
      tl.description,
      tl.version || '1.0',
      JSON.stringify(tl.tiers),
      tl.updated_at,
      tl.created_at || tl.updated_at,
      tl.is_demo ? 1 : 0
    );
  }

  // Ad Slots
  const insertAdSlotStmt = db.prepare(`
    INSERT OR REPLACE INTO ad_slots (
      id, name, slot_type, is_active, ad_type, image_url, target_url, label, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const slot of SEED_AD_SLOTS) {
    insertAdSlotStmt.run(
      slot.id,
      slot.name || slot.label || slot.slot_type,
      slot.slot_type,
      slot.is_active ? 1 : 0,
      slot.ad_type || 'custom',
      slot.image_url || null,
      slot.target_url || null,
      slot.label || null,
      slot.created_at || new Date().toISOString(),
      slot.updated_at || new Date().toISOString()
    );
  }

  // Admin User
  const defaultUser = process.env.ADMIN_USERNAME || 'admin';
  const defaultPass = process.env.ADMIN_PASSWORD || 'seraphi_Secur3_2026_Prod!';
  const insertAdmin = db.prepare(`
    INSERT OR IGNORE INTO admin_users (id, username, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertAdmin.run(
    'admin-1',
    defaultUser,
    hashPassword(defaultPass),
    'superadmin',
    new Date().toISOString()
  );
}

// Helpers
function mapGame(row: any): Game {
  return {
    ...row,
    platforms: JSON.parse(row.platforms || '[]'),
    genres: JSON.parse(row.genres || '[]'),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    no_index: Boolean(row.no_index),
  };
}

function mapCharacter(row: any): Character {
  return {
    ...row,
    skills: JSON.parse(row.skills || '[]'),
    talents: JSON.parse(row.talents || '[]'),
    recommended_build: JSON.parse(row.recommended_build || '{}'),
    recommended_weapons: JSON.parse(row.recommended_weapons || '[]'),
    recommended_team: JSON.parse(row.recommended_team || '[]'),
    materials: JSON.parse(row.materials || '[]'),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    no_index: Boolean(row.no_index),
  };
}

function mapGuide(row: any): Guide {
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    faq: row.faq ? JSON.parse(row.faq) : [],
    related_characters: row.related_character_ids
      ? JSON.parse(row.related_character_ids)
      : row.related_characters
        ? JSON.parse(row.related_characters)
        : [],
    related_items: row.related_items ? JSON.parse(row.related_items) : [],
    no_index: Boolean(row.no_index),
    // UI aliases
    thumbnail: row.featured_image || row.thumbnail || '',
    published_at: row.created_at,
    author_slug: row.author_slug || (row.author === 'Kaelen Arisandi' ? 'kael-strats' : row.author === 'Lyra Valery' ? 'lyra-lore' : row.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial'),
  };
}

function mapNews(row: any): News {
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    views: Number(row.views || 0),
    is_demo: Boolean(row.is_demo),
    no_index: Boolean(row.no_index),
    // UI aliases
    thumbnail: row.featured_image || row.thumbnail || '',
    published_at: row.created_at,
    author_slug: row.author_slug || (row.author === 'Kaelen Arisandi' ? 'kael-strats' : row.author === 'Lyra Valery' ? 'lyra-lore' : row.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial'),
  };
}

function mapItem(row: any): Item {
  return {
    ...row,
    stats: JSON.parse(row.stats || '{}'),
    is_demo: Boolean(row.is_demo),
  };
}

function mapAuthor(row: any): Author {
  return { ...row };
}

function mapTierList(row: any): TierList {
  return {
    ...row,
    tiers: JSON.parse(row.tiers || '[]'),
  };
}

function mapAdSlot(row: any): AdSlotConfig {
  return {
    ...row,
    is_active: Boolean(row.is_active),
  };
}

export class SqliteAdapter implements DatabaseAdapter {
  readonly provider = 'sqlite' as const;

  private get db(): DatabaseSync {
    return getSqliteDatabase();
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return this.db.prepare(sql).all(...params) as T[];
  }

  async get<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const row = this.db.prepare(sql).get(...params);
    return (row as T) || null;
  }

  async run(sql: string, params: any[] = []): Promise<{ changes?: number }> {
    const info = this.db.prepare(sql).run(...params) as any;
    return { changes: info?.changes };
  }

  async exec(sql: string): Promise<void> {
    this.db.exec(sql);
  }

  async close(): Promise<void> {
    // DatabaseSync is process-managed
  }

  async checkDuplicateSlug(
    table: 'games' | 'characters' | 'guides' | 'news' | 'items' | 'authors',
    slug: string,
    excludeId?: string
  ): Promise<boolean> {
    let query = `SELECT id FROM ${table} WHERE LOWER(slug) = LOWER(?)`;
    const params: any[] = [slug.trim()];
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    const row = this.db.prepare(query).get(...params);
    return Boolean(row);
  }

  async getAuthors(): Promise<Author[]> {
    const rows = this.db.prepare('SELECT * FROM authors ORDER BY name ASC').all();
    return rows.map(mapAuthor);
  }

  async getAuthorBySlug(slug: string): Promise<Author | null> {
    const row = this.db.prepare('SELECT * FROM authors WHERE slug = ?').get(slug);
    return row ? mapAuthor(row) : null;
  }

  async getAuthorById(id: string): Promise<Author | null> {
    const row = this.db.prepare('SELECT * FROM authors WHERE id = ?').get(id);
    return row ? mapAuthor(row) : null;
  }

  async insertAuthor(author: Author): Promise<void> {
    this.db.prepare(`
      INSERT INTO authors (id, name, slug, avatar, bio, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      author.id,
      author.name,
      author.slug,
      author.avatar,
      author.bio,
      author.role || 'Contributor',
      author.created_at,
      author.updated_at
    );
  }

  async updateAuthor(id: string, updates: Partial<Author>): Promise<void> {
    const existing = await this.getAuthorById(id);
    if (!existing) throw new Error('Author not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.db.prepare(`
      UPDATE authors SET name = ?, slug = ?, avatar = ?, bio = ?, role = ?, updated_at = ?
      WHERE id = ?
    `).run(merged.name, merged.slug, merged.avatar, merged.bio, merged.role, merged.updated_at, id);
  }

  async deleteAuthor(id: string): Promise<void> {
    this.db.prepare('DELETE FROM authors WHERE id = ?').run(id);
  }

  async getGuidesByAuthor(authorId: string): Promise<Guide[]> {
    let query = 'SELECT * FROM guides WHERE (author_id = ? OR author_id = (SELECT id FROM authors WHERE slug = ?))';
    if (isProductionMode()) {
      query += " AND status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)";
    }
    query += ' ORDER BY created_at DESC';
    const rows = this.db.prepare(query).all(authorId, authorId);
    return rows.map(mapGuide);
  }

  async getNewsByAuthor(authorId: string): Promise<News[]> {
    let query = 'SELECT * FROM news WHERE (author_id = ? OR author_id = (SELECT id FROM authors WHERE slug = ?))';
    if (isProductionMode()) {
      query += " AND status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)";
    }
    query += ' ORDER BY created_at DESC';
    const rows = this.db.prepare(query).all(authorId, authorId);
    return rows.map(mapNews);
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
    const rows = this.db.prepare(query).all();
    return rows.map(mapGame);
  }

  async getGameBySlug(slug: string): Promise<Game | null> {
    let query = 'SELECT * FROM games WHERE slug = ?';
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    const row = this.db.prepare(query).get(slug);
    return row ? mapGame(row) : null;
  }

  async getGameById(id: string): Promise<Game | null> {
    const row = this.db.prepare('SELECT * FROM games WHERE id = ?').get(id);
    return row ? mapGame(row) : null;
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
    this.db.prepare(`
      INSERT INTO games (
        id, name, slug, cover_image, banner_image, description,
        developer, publisher, release_date, platforms, genres,
        status, rating, official_url, created_at, updated_at, views, is_demo,
        meta_title, meta_description, no_index
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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
      game.no_index ? 1 : 0
    );
    return game;
  }

  async updateGame(id: string, updates: Partial<Game>): Promise<void> {
    const existing = await this.getGameById(id);
    if (!existing) throw new Error('Game not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.db.prepare(`
      UPDATE games SET
        name = ?, slug = ?, cover_image = ?, banner_image = ?, description = ?,
        developer = ?, publisher = ?, release_date = ?, platforms = ?, genres = ?,
        status = ?, rating = ?, official_url = ?, updated_at = ?, is_demo = ?,
        meta_title = ?, meta_description = ?, no_index = ?
      WHERE id = ?
    `).run(
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
      id
    );
  }

  async deleteGame(id: string): Promise<void> {
    this.db.prepare('DELETE FROM games WHERE id = ?').run(id);
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
      conditions.push('(c.game_id = ? OR g.slug = ?)');
      params.push(gameIdOrSlug, gameIdOrSlug);
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
    const rows = this.db.prepare(query).all(...params);
    return rows.map(mapCharacter);
  }

  async getCharacterBySlug(slug: string, gameSlug?: string): Promise<Character | null> {
    let query = `
      SELECT c.*, g.slug as game_slug
      FROM characters c
      LEFT JOIN games g ON c.game_id = g.id
      WHERE c.slug = ?
    `;
    const params: any[] = [slug];
    if (gameSlug) {
      query += ' AND g.slug = ?';
      params.push(gameSlug);
    }
    if (isProductionMode()) {
      query += ' AND (c.is_demo = 0 OR c.is_demo IS NULL)';
    }
    const row = this.db.prepare(query).get(...params);
    return row ? mapCharacter(row) : null;
  }

  async getCharacterById(id: string): Promise<Character | null> {
    const row = this.db.prepare('SELECT * FROM characters WHERE id = ?').get(id);
    return row ? mapCharacter(row) : null;
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
    this.db.prepare(`
      INSERT INTO characters (
        id, game_id, name, slug, portrait, full_image, description,
        role, element, weapon, rarity, release_date, skills, talents,
        recommended_build, recommended_weapons, recommended_team,
        materials, status, created_at, updated_at, views, is_demo,
        meta_title, meta_description, no_index
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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
      char.no_index ? 1 : 0
    );
    return char;
  }

  async updateCharacter(id: string, updates: Partial<Character>): Promise<void> {
    const existing = await this.getCharacterById(id);
    if (!existing) throw new Error('Character not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.db.prepare(`
      UPDATE characters SET
        game_id = ?, name = ?, slug = ?, portrait = ?, full_image = ?, description = ?,
        role = ?, element = ?, weapon = ?, rarity = ?, release_date = ?, skills = ?,
        talents = ?, recommended_build = ?, recommended_weapons = ?, recommended_team = ?,
        materials = ?, status = ?, updated_at = ?, is_demo = ?,
        meta_title = ?, meta_description = ?, no_index = ?
      WHERE id = ?
    `).run(
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
      id
    );
  }

  async deleteCharacter(id: string): Promise<void> {
    this.db.prepare('DELETE FROM characters WHERE id = ?').run(id);
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
      conditions.push('(gu.game_id = ? OR g.slug = ?)');
      params.push(options.gameIdOrSlug, options.gameIdOrSlug);
    }
    if (options?.category) {
      conditions.push('gu.category = ?');
      params.push(options.category);
    }
    if (options?.tag) {
      conditions.push("gu.tags LIKE ?");
      params.push(`%"${options.tag}"%`);
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
      query += ` LIMIT ${options.limit}`;
    }
    const rows = this.db.prepare(query).all(...params);
    return rows.map(mapGuide);
  }

  async getGuideBySlug(slug: string): Promise<Guide | null> {
    let query = 'SELECT * FROM guides WHERE slug = ?';
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    const row = this.db.prepare(query).get(slug);
    return row ? mapGuide(row) : null;
  }

  async getGuideById(id: string): Promise<Guide | null> {
    const row = this.db.prepare('SELECT * FROM guides WHERE id = ?').get(id);
    return row ? mapGuide(row) : null;
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
      // Resolve aliases: accept both thumbnail/featured_image, author/author_id
      featured_image: data.featured_image || data.thumbnail || '',
    };
    const authorSlug = guide.author_slug || (guide.author === 'Kaelen Arisandi' ? 'kael-strats' : guide.author === 'Lyra Valery' ? 'lyra-lore' : guide.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial');
    this.db.prepare(`
      INSERT INTO guides (
        id, game_id, author_id, author, author_slug, title, slug, excerpt, content, category,
        difficulty, reading_time, featured_image, thumbnail, status, created_at, published_at,
        updated_at, views, is_demo, meta_title, meta_description, no_index,
        tags, faq, canonical_url, related_guide_ids, related_character_ids
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      guide.id,
      guide.game_id,
      guide.author_id || (authorSlug === 'kael-strats' ? 'author-kael-strats' : authorSlug === 'lyra-lore' ? 'author-lyra-lore' : authorSlug === 'ryu-mechanics' ? 'author-ryu-mechanics' : 'author-seraphi-editorial'),
      guide.author || 'Redaksi Seraphi',
      authorSlug,
      guide.title,
      guide.slug,
      guide.excerpt,
      guide.content,
      guide.category,
      guide.difficulty || 'medium',
      guide.reading_time || 5,
      guide.featured_image || guide.thumbnail || '',
      guide.thumbnail || guide.featured_image || '',
      guide.status,
      guide.created_at || guide.published_at || new Date().toISOString(),
      guide.published_at || guide.created_at || new Date().toISOString(),
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
      JSON.stringify(guide.related_character_ids || [])
    );
    return mapGuide({ ...guide, tags: JSON.stringify(guide.tags || []) });
  }

  async updateGuide(id: string, updates: Partial<Guide>): Promise<void> {
    const existing = await this.getGuideById(id);
    if (!existing) throw new Error('Guide not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    const featuredImage = merged.featured_image || merged.thumbnail || '';
    this.db.prepare(`
      UPDATE guides SET
        game_id = ?, author_id = ?, title = ?, slug = ?, excerpt = ?, content = ?, category = ?,
        difficulty = ?, reading_time = ?, featured_image = ?, status = ?, updated_at = ?,
        is_demo = ?, meta_title = ?, meta_description = ?, no_index = ?, tags = ?,
        faq = ?, canonical_url = ?, related_guide_ids = ?, related_character_ids = ?
      WHERE id = ?
    `).run(
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
      id
    );
  }

  async deleteGuide(id: string): Promise<void> {
    this.db.prepare('DELETE FROM guides WHERE id = ?').run(id);
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
      conditions.push('(nw.game_id = ? OR g.slug = ?)');
      params.push(options.gameIdOrSlug, options.gameIdOrSlug);
    }
    if (options?.category) {
      conditions.push('nw.category = ?');
      params.push(options.category);
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
      query += ` LIMIT ${options.limit}`;
    }
    const rows = this.db.prepare(query).all(...params);
    return rows.map(mapNews);
  }

  async getNewsBySlug(slug: string): Promise<News | null> {
    let query = 'SELECT * FROM news WHERE slug = ?';
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    const row = this.db.prepare(query).get(slug);
    return row ? mapNews(row) : null;
  }

  async getNewsById(id: string): Promise<News | null> {
    const row = this.db.prepare('SELECT * FROM news WHERE id = ?').get(id);
    return row ? mapNews(row) : null;
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
    const authorSlug = item.author_slug || (item.author === 'Kaelen Arisandi' ? 'kael-strats' : item.author === 'Lyra Valery' ? 'lyra-lore' : item.author === 'Ryu Pratama' ? 'ryu-mechanics' : 'seraphi-editorial');
    this.db.prepare(`
      INSERT INTO news (
        id, game_id, author_id, author, author_slug, title, slug, excerpt, content, category,
        featured_image, thumbnail, status, created_at, published_at, updated_at, views, is_demo,
        meta_title, meta_description, no_index, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      item.id,
      item.game_id || null,
      item.author_id || (authorSlug === 'kael-strats' ? 'author-kael-strats' : authorSlug === 'lyra-lore' ? 'author-lyra-lore' : authorSlug === 'ryu-mechanics' ? 'author-ryu-mechanics' : 'author-seraphi-editorial'),
      item.author || 'Redaksi Seraphi',
      authorSlug,
      item.title,
      item.slug,
      item.excerpt,
      item.content,
      item.category,
      item.featured_image || item.thumbnail || '',
      item.thumbnail || item.featured_image || '',
      item.status,
      item.created_at || item.published_at || new Date().toISOString(),
      item.published_at || item.created_at || new Date().toISOString(),
      item.updated_at,
      item.views ?? 0,
      item.is_demo ? 1 : 0,
      item.meta_title || null,
      item.meta_description || null,
      item.no_index ? 1 : 0,
      JSON.stringify(item.tags || [])
    );
    return mapNews({ ...item, tags: JSON.stringify(item.tags || []) });
  }

  async updateNewsItem(id: string, updates: Partial<News>): Promise<void> {
    const existing = await this.getNewsById(id);
    if (!existing) throw new Error('News item not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    const featuredImage = merged.featured_image || merged.thumbnail || '';
    this.db.prepare(`
      UPDATE news SET
        game_id = ?, author_id = ?, title = ?, slug = ?, excerpt = ?, content = ?, category = ?,
        featured_image = ?, status = ?, updated_at = ?, is_demo = ?,
        meta_title = ?, meta_description = ?, no_index = ?, tags = ?
      WHERE id = ?
    `).run(
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
      id
    );
  }

  async deleteNewsItem(id: string): Promise<void> {
    this.db.prepare('DELETE FROM news WHERE id = ?').run(id);
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
      conditions.push('(rc.game_id = ? OR g.slug = ?)');
      params.push(gameIdOrSlug, gameIdOrSlug);
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
    const rows = this.db.prepare(query).all(...params) as any[];
    return rows.map((rc) => ({
      ...rc,
      verified_at: rc.verified_at || rc.last_checked,
      is_demo: Boolean(rc.is_demo),
    }));
  }

  async getRedeemCodeById(id: string): Promise<RedeemCode | null> {
    const row = this.db.prepare('SELECT * FROM redeem_codes WHERE id = ?').get(id) as any;
    if (!row) return null;
    return {
      ...row,
      verified_at: row.verified_at || row.last_checked,
      is_demo: Boolean(row.is_demo),
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
    this.db.prepare(`
      INSERT INTO redeem_codes (
        id, game_id, code, reward, status, expired_at, source,
        last_checked, verified_at, verification_provider, created_at, updated_at, is_demo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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
      code.is_demo ? 1 : 0
    );
    return code;
  }

  async updateRedeemCode(id: string, updates: Partial<RedeemCode>): Promise<void> {
    const existing = await this.getRedeemCodeById(id);
    if (!existing) throw new Error('Redeem code not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.db.prepare(`
      UPDATE redeem_codes SET
        game_id = ?, code = ?, reward = ?, status = ?, expired_at = ?,
        source = ?, last_checked = ?, verified_at = ?, verification_provider = ?, updated_at = ?
      WHERE id = ?
    `).run(
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
      id
    );
  }

  async deleteRedeemCode(id: string): Promise<void> {
    this.db.prepare('DELETE FROM redeem_codes WHERE id = ?').run(id);
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
      whereClauses.push('ev.game_id = ?');
      params.push(options.gameId);
    }
    if (options?.status) {
      whereClauses.push('ev.status = ?');
      params.push(options.status);
    }
    if (isProductionMode()) {
      whereClauses.push('(ev.is_demo = 0 OR ev.is_demo IS NULL)');
    }
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }
    query += " ORDER BY CASE WHEN ev.status = 'ACTIVE' THEN 0 WHEN ev.status = 'UPCOMING' THEN 1 ELSE 2 END, ev.start_date DESC";
    const rows = this.db.prepare(query).all(...params) as any[];
    return rows.map((ev) => ({
      ...ev,
      image: ev.image || ev.banner_image || '',
      banner_image: ev.banner_image || ev.image || '',
      rewards: typeof ev.rewards === 'string' && ev.rewards.startsWith('[') ? JSON.parse(ev.rewards) : ev.rewards,
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
    this.db.prepare(`
      INSERT INTO events (
        id, game_id, title, slug, description, type,
        status, official_url, start_date, end_date, rewards, banner_image, image, created_at, updated_at, is_demo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      ev.id,
      ev.game_id,
      ev.title,
      ev.slug || ev.id,
      ev.description,
      ev.type || 'EVENT',
      ev.status || 'ACTIVE',
      ev.official_url || '',
      ev.start_date,
      ev.end_date,
      JSON.stringify(ev.rewards || []),
      ev.banner_image || ev.image || '',
      ev.image || ev.banner_image || '',
      ev.created_at,
      ev.updated_at,
      ev.is_demo ? 1 : 0
    );
    return ev;
  }

  async deleteEventItem(id: string): Promise<void> {
    this.db.prepare('DELETE FROM events WHERE id = ?').run(id);
  }

  async getItems(gameId?: string): Promise<Item[]> {
    let query = 'SELECT * FROM items';
    const params: any[] = [];
    const conditions: string[] = [];
    if (gameId) {
      conditions.push('game_id = ?');
      params.push(gameId);
    }
    if (isProductionMode()) {
      conditions.push('(is_demo = 0 OR is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY rarity DESC, name ASC';
    const rows = this.db.prepare(query).all(...params);
    return rows.map(mapItem);
  }

  async getItemById(id: string): Promise<Item | null> {
    const row = this.db.prepare('SELECT * FROM items WHERE id = ?').get(id);
    return row ? mapItem(row) : null;
  }

  async getItemBySlug(slug: string, gameSlug?: string): Promise<Item | null> {
    let query = `
      SELECT it.*, g.slug as game_slug
      FROM items it
      LEFT JOIN games g ON it.game_id = g.id
      WHERE it.slug = ?
    `;
    const params: any[] = [slug];
    if (gameSlug) {
      query += ' AND g.slug = ?';
      params.push(gameSlug);
    }
    if (isProductionMode()) {
      query += ' AND (it.is_demo = 0 OR it.is_demo IS NULL)';
    }
    const row = this.db.prepare(query).get(...params);
    return row ? mapItem(row) : null;
  }

  async insertItem(data: Omit<Item, 'created_at' | 'updated_at'>): Promise<Item> {
    const now = new Date().toISOString();
    const item: Item = {
      ...data,
      created_at: now,
      updated_at: now,
      is_demo: data.is_demo ?? false,
    };
    this.db.prepare(`
      INSERT INTO items (
        id, game_id, name, slug, type, rarity, icon, description, stats, how_to_get, created_at, updated_at, is_demo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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
      item.is_demo ? 1 : 0
    );
    return item;
  }

  async updateItem(id: string, updates: Partial<Item>): Promise<void> {
    const existing = await this.getItemById(id);
    if (!existing) throw new Error('Item not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.db.prepare(`
      UPDATE items SET
        game_id = ?, name = ?, slug = ?, type = ?, rarity = ?, icon = ?,
        description = ?, stats = ?, how_to_get = ?, updated_at = ?, is_demo = ?
      WHERE id = ?
    `).run(
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
      id
    );
  }

  async deleteItem(id: string): Promise<void> {
    this.db.prepare('DELETE FROM items WHERE id = ?').run(id);
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
      conditions.push('(tl.game_id = ? OR g.slug = ?)');
      params.push(gameIdOrSlug, gameIdOrSlug);
    }
    if (isProductionMode()) {
      conditions.push('(tl.is_demo = 0 OR tl.is_demo IS NULL)');
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY tl.updated_at DESC';
    const rows = this.db.prepare(query).all(...params);
    return rows.map(mapTierList);
  }

  async getTierListBySlug(slug: string): Promise<TierList | null> {
    let query = `
      SELECT tl.*, g.name as game_name, g.slug as game_slug
      FROM tier_lists tl
      LEFT JOIN games g ON tl.game_id = g.id
      WHERE tl.slug = ?
    `;
    if (isProductionMode()) {
      query += ' AND (tl.is_demo = 0 OR tl.is_demo IS NULL)';
    }
    const row = this.db.prepare(query).get(slug);
    return row ? mapTierList(row) : null;
  }

  async getAdSlots(): Promise<AdSlotConfig[]> {
    const rows = this.db.prepare('SELECT * FROM ad_slots ORDER BY slot_type ASC').all();
    return rows.map(mapAdSlot);
  }

  async getAdSlotById(id: string): Promise<AdSlotConfig | null> {
    const row = this.db.prepare('SELECT * FROM ad_slots WHERE id = ?').get(id);
    return row ? mapAdSlot(row) : null;
  }

  async updateAdSlot(id: string, updates: Partial<AdSlotConfig>): Promise<void> {
    const existing = await this.getAdSlotById(id);
    if (!existing) throw new Error('Ad slot not found');
    const merged = { ...existing, ...updates, updated_at: new Date().toISOString() };
    this.db.prepare(`
      UPDATE ad_slots SET
        is_active = ?, image_url = ?, target_url = ?, label = ?, updated_at = ?
      WHERE id = ?
    `).run(
      merged.is_active ? 1 : 0,
      merged.image_url || null,
      merged.target_url || null,
      merged.label || null,
      merged.updated_at,
      id
    );
  }

  async getPopularGames(limit = 5): Promise<Game[]> {
    let query = "SELECT * FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')";
    if (isProductionMode()) {
      query += ' AND (is_demo = 0 OR is_demo IS NULL)';
    }
    query += ` ORDER BY views DESC, rating DESC LIMIT ${limit}`;
    const rows = this.db.prepare(query).all();
    return rows.map(mapGame);
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
    query += ` ORDER BY gu.views DESC LIMIT ${limit}`;
    const rows = this.db.prepare(query).all();
    return rows.map(mapGuide);
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
    query += ` ORDER BY c.views DESC LIMIT ${limit}`;
    const rows = this.db.prepare(query).all();
    return rows.map(mapCharacter);
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
    query += ` ORDER BY nw.views DESC LIMIT ${limit}`;
    const rows = this.db.prepare(query).all();
    return rows.map(mapNews);
  }

  async incrementViews(table: 'games' | 'characters' | 'guides' | 'news', idOrSlug: string): Promise<void> {
    try {
      this.db.prepare(`UPDATE ${table} SET views = COALESCE(views, 0) + 1 WHERE id = ? OR slug = ?`).run(idOrSlug, idOrSlug);
    } catch (err) {
      console.error(`Error incrementing views on ${table}:`, err);
    }
  }

  async searchAll(query: string): Promise<GlobalSearchResult> {
    const rawTerm = query.trim();
    const term = `%${rawTerm}%`;
    const prodFilter = isProductionMode();

    const games = (this.db.prepare(`
      SELECT * FROM games
      WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')
        ${prodFilter ? 'AND (is_demo = 0 OR is_demo IS NULL)' : ''}
        AND (name LIKE ? OR description LIKE ? OR developer LIKE ? OR genres LIKE ? OR slug LIKE ?)
      ORDER BY
        CASE
          WHEN LOWER(name) = LOWER(?) THEN 1
          WHEN LOWER(name) LIKE ? THEN 2
          WHEN LOWER(slug) LIKE ? THEN 3
          ELSE 4
        END ASC, rating DESC
      LIMIT 10
    `).all(term, term, term, term, term, rawTerm, `${rawTerm}%`, term) as any[]).map(mapGame);

    const characters = (this.db.prepare(`
      SELECT c.*, g.name as game_name, g.slug as game_slug
      FROM characters c
      LEFT JOIN games g ON c.game_id = g.id
      WHERE c.status = 'PUBLISHED'
        ${prodFilter ? 'AND (c.is_demo = 0 OR c.is_demo IS NULL)' : ''}
        AND (c.name LIKE ? OR c.description LIKE ? OR c.role LIKE ? OR c.element LIKE ? OR c.slug LIKE ?)
      ORDER BY
        CASE
          WHEN LOWER(c.name) = LOWER(?) THEN 1
          WHEN LOWER(c.name) LIKE ? THEN 2
          WHEN LOWER(c.slug) LIKE ? THEN 3
          ELSE 4
        END ASC, c.rarity DESC
      LIMIT 15
    `).all(term, term, term, term, term, rawTerm, `${rawTerm}%`, term) as any[]).map((r: any) => ({
      ...mapCharacter(r),
      game_name: r.game_name,
      game_slug: r.game_slug,
    }));

    const guides = (this.db.prepare(`
      SELECT gu.*, g.name as game_name, g.slug as game_slug
      FROM guides gu
      LEFT JOIN games g ON gu.game_id = g.id
      WHERE gu.status = 'PUBLISHED'
        ${prodFilter ? 'AND (gu.is_demo = 0 OR gu.is_demo IS NULL)' : ''}
        AND (gu.title LIKE ? OR gu.excerpt LIKE ? OR gu.tags LIKE ? OR gu.category LIKE ? OR gu.slug LIKE ? OR gu.content LIKE ?)
      ORDER BY
        CASE
          WHEN LOWER(gu.title) = LOWER(?) THEN 1
          WHEN LOWER(gu.title) LIKE ? THEN 2
          WHEN LOWER(gu.slug) LIKE ? THEN 3
          ELSE 4
        END ASC, gu.created_at DESC
      LIMIT 15
    `).all(term, term, term, term, term, term, rawTerm, `${rawTerm}%`, term) as any[]).map((r: any) => ({
      ...mapGuide(r),
      game_name: r.game_name,
      game_slug: r.game_slug,
    }));

    const news = (this.db.prepare(`
      SELECT nw.*, g.name as game_name
      FROM news nw
      LEFT JOIN games g ON nw.game_id = g.id
      WHERE nw.status = 'PUBLISHED'
        ${prodFilter ? 'AND (nw.is_demo = 0 OR nw.is_demo IS NULL)' : ''}
        AND (nw.title LIKE ? OR nw.excerpt LIKE ? OR nw.tags LIKE ? OR nw.category LIKE ? OR nw.slug LIKE ?)
      ORDER BY
        CASE
          WHEN LOWER(nw.title) = LOWER(?) THEN 1
          WHEN LOWER(nw.title) LIKE ? THEN 2
          WHEN LOWER(nw.slug) LIKE ? THEN 3
          ELSE 4
        END ASC, nw.created_at DESC
      LIMIT 15
    `).all(term, term, term, term, term, rawTerm, `${rawTerm}%`, term) as any[]).map((r: any) => ({
      ...mapNews(r),
      game_name: r.game_name,
    }));

    const items = (this.db.prepare(`
      SELECT it.*, g.name as game_name
      FROM items it
      LEFT JOIN games g ON it.game_id = g.id
      WHERE (1=1)
        ${prodFilter ? 'AND (it.is_demo = 0 OR it.is_demo IS NULL)' : ''}
        AND (it.name LIKE ? OR it.description LIKE ? OR it.type LIKE ? OR it.slug LIKE ?)
      ORDER BY
        CASE
          WHEN LOWER(it.name) = LOWER(?) THEN 1
          WHEN LOWER(it.name) LIKE ? THEN 2
          WHEN LOWER(it.slug) LIKE ? THEN 3
          ELSE 4
        END ASC, it.rarity DESC
      LIMIT 15
    `).all(term, term, term, term, rawTerm, `${rawTerm}%`, term) as any[]).map((r: any) => ({
      ...mapItem(r),
      game_name: r.game_name,
    }));

    const redeem_codes = (this.db.prepare(`
      SELECT rc.*, g.name as game_name
      FROM redeem_codes rc
      LEFT JOIN games g ON rc.game_id = g.id
      WHERE (1=1)
        ${prodFilter ? 'AND (rc.is_demo = 0 OR rc.is_demo IS NULL)' : ''}
        AND (rc.code LIKE ? OR rc.reward LIKE ?)
      ORDER BY
        CASE
          WHEN LOWER(rc.code) = LOWER(?) THEN 1
          WHEN LOWER(rc.code) LIKE ? THEN 2
          ELSE 3
        END ASC,
        CASE WHEN rc.status = 'ACTIVE' THEN 0 ELSE 1 END ASC
      LIMIT 10
    `).all(term, term, rawTerm, `${rawTerm}%`) as any[]).map((rc) => ({
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
    const row = this.db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
    return (row as AdminUser) || null;
  }

  async syncAdminUserFromEnv(): Promise<void> {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'seraphi_Secur3_2026_Prod!';
    const passwordHash = hashPassword(password);
    const existing = await this.getAdminUser(username);
    if (existing) {
      this.db.prepare('UPDATE admin_users SET password_hash = ? WHERE username = ?').run(passwordHash, username);
    } else {
      this.db.prepare(`
        INSERT INTO admin_users (id, username, password_hash, role, created_at)
        VALUES (?, ?, ?, ?, ?)
      `).run('admin-1', username, passwordHash, 'superadmin', new Date().toISOString());
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const gamesCount = (this.db.prepare('SELECT COUNT(*) as c FROM games').get() as any)?.c || 0;
    const charsCount = (this.db.prepare('SELECT COUNT(*) as c FROM characters').get() as any)?.c || 0;
    const guidesCount = (this.db.prepare('SELECT COUNT(*) as c FROM guides').get() as any)?.c || 0;
    const newsCount = (this.db.prepare('SELECT COUNT(*) as c FROM news').get() as any)?.c || 0;
    const codesCount = (this.db.prepare('SELECT COUNT(*) as c FROM redeem_codes').get() as any)?.c || 0;
    const eventsCount = (this.db.prepare('SELECT COUNT(*) as c FROM events').get() as any)?.c || 0;

    const publishedGames = (this.db.prepare("SELECT COUNT(*) as c FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED')").get() as any)?.c || 0;
    const publishedChars = (this.db.prepare("SELECT COUNT(*) as c FROM characters WHERE status = 'PUBLISHED'").get() as any)?.c || 0;
    const publishedGuides = (this.db.prepare("SELECT COUNT(*) as c FROM guides WHERE status = 'PUBLISHED'").get() as any)?.c || 0;
    const publishedNews = (this.db.prepare("SELECT COUNT(*) as c FROM news WHERE status = 'PUBLISHED'").get() as any)?.c || 0;
    const activeCodes = (this.db.prepare("SELECT COUNT(*) as c FROM redeem_codes WHERE status = 'ACTIVE'").get() as any)?.c || 0;
    const upcomingEvents = (this.db.prepare("SELECT COUNT(*) as c FROM events WHERE status = 'ACTIVE'").get() as any)?.c || 0;
    const draftGuides = (this.db.prepare("SELECT COUNT(*) as c FROM guides WHERE status IN ('DRAFT', 'REVIEW')").get() as any)?.c || 0;

    const gameViews = (this.db.prepare('SELECT SUM(views) as total FROM games').get() as any)?.total || 0;
    const charViews = (this.db.prepare('SELECT SUM(views) as total FROM characters').get() as any)?.total || 0;
    const guideViews = (this.db.prepare('SELECT SUM(views) as total FROM guides').get() as any)?.total || 0;
    const newsViews = (this.db.prepare('SELECT SUM(views) as total FROM news').get() as any)?.total || 0;

    const recentGuides = (this.db.prepare("SELECT id, title, slug, updated_at, 'guide' as type FROM guides ORDER BY updated_at DESC LIMIT 5").all() as any[]);
    const recentNews = (this.db.prepare("SELECT id, title, slug, updated_at, 'news' as type FROM news ORDER BY updated_at DESC LIMIT 5").all() as any[]);
    const recentGames = (this.db.prepare("SELECT id, name as title, slug, updated_at, 'game' as type FROM games ORDER BY updated_at DESC LIMIT 5").all() as any[]);

    const recentlyUpdated = [...recentGuides, ...recentNews, ...recentGames]
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
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
      totalViews: gameViews + charViews + guideViews + newsViews,
    };
  }

  async getProductionContentStats(): Promise<ProductionContentStats> {
    const games = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
        SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
        SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
        SUM(CASE WHEN status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED') AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
      FROM games
    `).get() as any;

    const characters = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
        SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
        SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
        SUM(CASE WHEN status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
      FROM characters
    `).get() as any;

    const guides = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
        SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
        SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
        SUM(CASE WHEN status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
      FROM guides
    `).get() as any;

    const news = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN status = 'DRAFT' THEN 1 ELSE 0 END) as draft_count,
        SUM(CASE WHEN status = 'REVIEW' THEN 1 ELSE 0 END) as review_count,
        SUM(CASE WHEN status = 'ARCHIVED' THEN 1 ELSE 0 END) as archived_count,
        SUM(CASE WHEN status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
      FROM news
    `).get() as any;

    const items = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
      FROM items
    `).get() as any;

    const redeem_codes = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
      FROM redeem_codes
    `).get() as any;

    const events = this.db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_demo = 1 THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN (is_demo = 0 OR is_demo IS NULL) THEN 1 ELSE 0 END) as published_prod_count
      FROM events
    `).get() as any;

    const published_real =
      Number(games?.published_prod_count || 0) +
      Number(characters?.published_prod_count || 0) +
      Number(guides?.published_prod_count || 0) +
      Number(news?.published_prod_count || 0) +
      Number(items?.published_prod_count || 0) +
      Number(redeem_codes?.published_prod_count || 0) +
      Number(events?.published_prod_count || 0);

    const published_demo =
      Number(games?.demo_count || 0) +
      Number(characters?.demo_count || 0) +
      Number(guides?.demo_count || 0) +
      Number(news?.demo_count || 0) +
      Number(items?.demo_count || 0) +
      Number(redeem_codes?.demo_count || 0) +
      Number(events?.demo_count || 0);

    const draft =
      Number(games?.draft_count || 0) +
      Number(characters?.draft_count || 0) +
      Number(guides?.draft_count || 0) +
      Number(news?.draft_count || 0);

    const review =
      Number(games?.review_count || 0) +
      Number(characters?.review_count || 0) +
      Number(guides?.review_count || 0) +
      Number(news?.review_count || 0);

    const archived =
      Number(games?.archived_count || 0) +
      Number(characters?.archived_count || 0) +
      Number(guides?.archived_count || 0) +
      Number(news?.archived_count || 0);

    return {
      published_real,
      published_demo,
      draft,
      review,
      archived,
      has_demo_warning: published_demo > 0,
      games: { total: games?.total || 0, demo_count: games?.demo_count || 0, published_prod_count: games?.published_prod_count || 0 },
      characters: { total: characters?.total || 0, demo_count: characters?.demo_count || 0, published_prod_count: characters?.published_prod_count || 0 },
      guides: { total: guides?.total || 0, demo_count: guides?.demo_count || 0, published_prod_count: guides?.published_prod_count || 0 },
      news: { total: news?.total || 0, demo_count: news?.demo_count || 0, published_prod_count: news?.published_prod_count || 0 },
      items: { total: items?.total || 0, demo_count: items?.demo_count || 0, published_prod_count: items?.published_prod_count || 0 },
      redeem_codes: { total: redeem_codes?.total || 0, demo_count: redeem_codes?.demo_count || 0, published_prod_count: redeem_codes?.published_prod_count || 0 },
      events: { total: events?.total || 0, demo_count: events?.demo_count || 0, published_prod_count: events?.published_prod_count || 0 },
    };
  }

  async toggleDemoStatus(
    table: 'games' | 'characters' | 'guides' | 'news' | 'items' | 'redeem_codes' | 'events',
    id: string
  ): Promise<boolean> {
    const row = this.db.prepare(`SELECT is_demo FROM ${table} WHERE id = ?`).get(id) as any;
    if (!row) throw new Error('Record not found');
    const newStatus = row.is_demo === 1 ? 0 : 1;
    this.db.prepare(`UPDATE ${table} SET is_demo = ? WHERE id = ?`).run(newStatus, id);
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
    this.db.prepare(`
      INSERT INTO contact_messages (id, name, email, subject, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      entry.id,
      entry.name,
      entry.email,
      entry.subject,
      entry.message,
      entry.status,
      entry.created_at
    );
    return entry;
  }

  async getContactMessages(status?: string): Promise<ContactMessage[]> {
    let query = 'SELECT * FROM contact_messages';
    const params: any[] = [];
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';
    return this.db.prepare(query).all(...params) as any[];
  }

  async updateContactMessageStatus(id: string, status: 'UNREAD' | 'READ' | 'ARCHIVED'): Promise<void> {
    this.db.prepare('UPDATE contact_messages SET status = ? WHERE id = ?').run(status, id);
  }

  async deleteContactMessage(id: string): Promise<void> {
    this.db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);
  }
}

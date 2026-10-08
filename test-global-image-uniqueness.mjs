/**
 * STRICT GLOBAL IMAGE URL UNIQUENESS TEST SUITE
 * Validates that all 281 image slots across all 8 categories have 100% unique URLs,
 * with zero duplicates and zero cross-entity overlap across:
 * 1. SQLite Database (data/seraphi.db)
 * 2. Neon PostgreSQL Database (if DATABASE_URL is available)
 */

import { DatabaseSync } from 'node:sqlite';
import pg from 'pg';
import fs from 'fs';

console.log('=============================================================');
console.log('   SERAPHI GAME — STRICT GLOBAL IMAGE UNIQUENESS TEST       ');
console.log('=============================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------
// 1. Audit SQLite Database (Local Development & Default Provider)
// -------------------------------------------------------------
console.log('[TEST 1/2] Auditing SQLite Database (data/seraphi.db)...');

const db = new DatabaseSync('./data/seraphi.db');

const sqliteSlots = [];

const games = db.prepare('SELECT id, name, cover_image, banner_image FROM games').all();
for (const g of games) {
  sqliteSlots.push({ id: g.id, entity: g.name, cat: 'Game Cover', url: g.cover_image });
  sqliteSlots.push({ id: g.id, entity: g.name, cat: 'Game Banner', url: g.banner_image });
}

const characters = db.prepare('SELECT id, name, portrait, full_image FROM characters').all();
for (const c of characters) {
  sqliteSlots.push({ id: c.id, entity: c.name, cat: 'Character Portrait', url: c.portrait });
  sqliteSlots.push({ id: c.id, entity: c.name, cat: 'Character Full Image', url: c.full_image });
}

const guides = db.prepare('SELECT id, title, thumbnail, featured_image FROM guides').all();
for (const gd of guides) {
  sqliteSlots.push({ id: gd.id, entity: gd.title, cat: 'Guide Thumbnail', url: gd.thumbnail });
}

const news = db.prepare('SELECT id, title, thumbnail, featured_image FROM news').all();
for (const n of news) {
  sqliteSlots.push({ id: n.id, entity: n.title, cat: 'News Thumbnail', url: n.thumbnail });
}

const items = db.prepare('SELECT id, name, icon FROM items').all();
for (const it of items) {
  sqliteSlots.push({ id: it.id, entity: it.name, cat: 'Item Icon', url: it.icon });
}

const events = db.prepare('SELECT id, title, banner_image, image FROM events').all();
for (const ev of events) {
  sqliteSlots.push({ id: ev.id, entity: ev.title, cat: 'Event Banner', url: ev.banner_image });
}

assert(games.length === 22, `Games count is 22 (got ${games.length})`);
assert(characters.length === 52, `Characters count is 52 (got ${characters.length})`);
assert(guides.length === 56, `Guides count is 56 (got ${guides.length})`);
assert(news.length === 35, `News count is 35 (got ${news.length})`);
assert(items.length === 16, `Items count is 16 (got ${items.length})`);
assert(events.length === 26, `Events count is 26 (got ${events.length})`);
assert(sqliteSlots.length === 281, `Total SQLite image slots is 281 (got ${sqliteSlots.length})`);

const sqliteUrlMap = new Map();
for (const s of sqliteSlots) {
  const list = sqliteUrlMap.get(s.url) || [];
  list.push(s);
  sqliteUrlMap.set(s.url, list);
}

assert(sqliteUrlMap.size === 281, `Total unique URLs in SQLite is 281 (got ${sqliteUrlMap.size})`);

let sqliteDupes = 0;
let sqliteCrossOverlap = 0;
for (const [url, occurrences] of sqliteUrlMap.entries()) {
  if (occurrences.length > 1) {
    sqliteDupes++;
    sqliteCrossOverlap += (occurrences.length - 1);
    console.error(`    Duplicate URL: ${url}`);
    occurrences.forEach(o => console.error(`      - [${o.cat}] ${o.entity} (${o.id})`));
  }
}

assert(sqliteDupes === 0, `SQLite duplicate URLs is 0 (got ${sqliteDupes})`);
assert(sqliteCrossOverlap === 0, `SQLite cross-entity overlap is 0 (got ${sqliteCrossOverlap})`);

// Verify guides thumbnail == featured_image
const guideFeaturedDiff = db.prepare('SELECT count(*) as c FROM guides WHERE thumbnail != featured_image').get();
assert(Number(guideFeaturedDiff.c) === 0, `Guides thumbnail equals featured_image (diff: ${guideFeaturedDiff.c})`);

// Verify news thumbnail == featured_image
const newsFeaturedDiff = db.prepare('SELECT count(*) as c FROM news WHERE thumbnail != featured_image').get();
assert(Number(newsFeaturedDiff.c) === 0, `News thumbnail equals featured_image (diff: ${newsFeaturedDiff.c})`);

// Verify events banner_image == image
const eventImageDiff = db.prepare('SELECT count(*) as c FROM events WHERE banner_image != image').get();
assert(Number(eventImageDiff.c) === 0, `Events banner_image equals image (diff: ${eventImageDiff.c})`);


// -------------------------------------------------------------
// 2. Audit Neon PostgreSQL Database (Production Target)
// -------------------------------------------------------------
console.log('\n[TEST 2/2] Auditing Neon PostgreSQL Database...');

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^DATABASE_URL=(.+)$/);
    if (match) {
      dbUrl = match[1].trim().replace(/^["']|["']$/g, '');
      break;
    }
  }
}

if (!dbUrl) {
  console.log('  ⚠️ Skipping Neon audit: DATABASE_URL not found in environment.');
} else {
  try {
    const client = new pg.Client({ connectionString: dbUrl });
    await client.connect();

    const pgGames = (await client.query('SELECT id, name, cover_image, banner_image FROM games')).rows;
    const pgChars = (await client.query('SELECT id, name, portrait, full_image FROM characters')).rows;
    const pgGuides = (await client.query('SELECT id, title, featured_image FROM guides')).rows;
    const pgNews = (await client.query('SELECT id, title, featured_image FROM news')).rows;
    const pgItems = (await client.query('SELECT id, name, icon FROM items')).rows;
    const pgEvents = (await client.query('SELECT id, title, banner_image FROM events')).rows;

    const pgSlots = [];
    for (const g of pgGames) {
      pgSlots.push({ id: g.id, entity: g.name, cat: 'Game Cover', url: g.cover_image });
      pgSlots.push({ id: g.id, entity: g.name, cat: 'Game Banner', url: g.banner_image });
    }
    for (const c of pgChars) {
      pgSlots.push({ id: c.id, entity: c.name, cat: 'Character Portrait', url: c.portrait });
      pgSlots.push({ id: c.id, entity: c.name, cat: 'Character Full Image', url: c.full_image });
    }
    for (const gd of pgGuides) {
      pgSlots.push({ id: gd.id, entity: gd.title, cat: 'Guide Thumbnail', url: gd.featured_image });
    }
    for (const n of pgNews) {
      pgSlots.push({ id: n.id, entity: n.title, cat: 'News Thumbnail', url: n.featured_image });
    }
    for (const it of pgItems) {
      pgSlots.push({ id: it.id, entity: it.name, cat: 'Item Icon', url: it.icon });
    }
    for (const ev of pgEvents) {
      pgSlots.push({ id: ev.id, entity: ev.title, cat: 'Event Banner', url: ev.banner_image });
    }

    assert(pgGames.length === 22, `Neon games count is 22 (got ${pgGames.length})`);
    assert(pgChars.length === 52, `Neon characters count is 52 (got ${pgChars.length})`);
    assert(pgGuides.length === 56, `Neon guides count is 56 (got ${pgGuides.length})`);
    assert(pgNews.length === 35, `Neon news count is 35 (got ${pgNews.length})`);
    assert(pgItems.length === 16, `Neon items count is 16 (got ${pgItems.length})`);
    assert(pgEvents.length === 26, `Neon events count is 26 (got ${pgEvents.length})`);
    assert(pgSlots.length === 281, `Total Neon image slots is 281 (got ${pgSlots.length})`);

    const pgUrlMap = new Map();
    for (const s of pgSlots) {
      const list = pgUrlMap.get(s.url) || [];
      list.push(s);
      pgUrlMap.set(s.url, list);
    }

    assert(pgUrlMap.size === 281, `Total unique URLs in Neon is 281 (got ${pgUrlMap.size})`);

    let pgDupes = 0;
    let pgCrossOverlap = 0;
    for (const [url, occurrences] of pgUrlMap.entries()) {
      if (occurrences.length > 1) {
        pgDupes++;
        pgCrossOverlap += (occurrences.length - 1);
        console.error(`    Neon Duplicate URL: ${url}`);
        occurrences.forEach(o => console.error(`      - [${o.cat}] ${o.entity} (${o.id})`));
      }
    }

    assert(pgDupes === 0, `Neon duplicate URLs is 0 (got ${pgDupes})`);
    assert(pgCrossOverlap === 0, `Neon cross-entity overlap is 0 (got ${pgCrossOverlap})`);

    await client.end();
  } catch (err) {
    console.error('  ✗ Error connecting to Neon:', err.message);
    process.exitCode = 1;
  }
}

console.log('\n=============================================================');
if (process.exitCode === 1) {
  console.log(`❌ TEST FAILED: ${passedTests}/${totalTests} checks passed.`);
} else {
  console.log(`✓ STRICT GLOBAL IMAGE UNIQUENESS: ALL ${passedTests}/${totalTests} TESTS PASSED!`);
}
console.log('=============================================================');

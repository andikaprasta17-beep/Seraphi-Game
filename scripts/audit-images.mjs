import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('data/seraphi.db');

console.log('====================================================');
console.log('       SERAPHI GAME — COMPLETE IMAGE AUDIT         ');
console.log('====================================================');

const games = db.prepare('SELECT id, slug, name, cover_image, banner_image FROM games').all();
const characters = db.prepare('SELECT id, slug, name, game_id, portrait, full_image FROM characters').all();
const guides = db.prepare('SELECT id, slug, title, game_id, thumbnail FROM guides').all();
const news = db.prepare('SELECT id, slug, title, game_id, thumbnail FROM news').all();
const items = db.prepare('SELECT id, slug, name, game_id, icon FROM items').all();
const events = db.prepare('SELECT id, slug, title, game_id, banner_image FROM events').all();

console.log(`Entities: ${games.length} Games, ${characters.length} Characters, ${guides.length} Guides, ${news.length} News, ${items.length} Items, ${events.length} Events`);

function auditDupes(name, items, getUrl) {
  const map = new Map();
  for (const it of items) {
    const url = getUrl(it);
    if (!url) continue;
    const base = url.split('?')[0];
    if (!map.has(base)) map.set(base, []);
    map.get(base).push(it.id || it.slug || it.name || it.title);
  }
  let dupeCount = 0;
  for (const [base, list] of map.entries()) {
    if (list.length > 1) {
      dupeCount++;
      console.log(`  [DUPE] ${name}: ${base} shared by: ${list.join(', ')}`);
    }
  }
  if (dupeCount === 0) {
    console.log(`  [PASS] ${name}: 0 duplicates (Total: ${items.length})`);
  }
  return dupeCount;
}

console.log('\n--- Intra-Entity Duplicate Checks ---');
const gCovers = auditDupes('Game Covers', games, g => g.cover_image);
const gBanners = auditDupes('Game Banners', games, g => g.banner_image);
const cPortraits = auditDupes('Character Portraits', characters, c => c.portrait);
const cFulls = auditDupes('Character Full Images', characters, c => c.full_image);
const gdThumbs = auditDupes('Guide Thumbnails', guides, g => g.thumbnail);
const nThumbs = auditDupes('News Thumbnails', news, n => n.thumbnail);
const itIcons = auditDupes('Item Icons', items, i => i.icon);
const evBanners = auditDupes('Event Banners', events, e => e.banner_image);

console.log('\n--- Cross-Entity Collision Audit ---');
const allPhotos = new Map();
function record(url, type, name) {
  if (!url) return;
  const base = url.split('?')[0];
  if (!allPhotos.has(base)) allPhotos.set(base, []);
  allPhotos.get(base).push({ type, name });
}

games.forEach(g => {
  record(g.cover_image, 'GameCover', g.name);
  record(g.banner_image, 'GameBanner', g.name);
});
characters.forEach(c => {
  record(c.portrait, 'CharacterPortrait', `${c.game_id}:${c.name}`);
  record(c.full_image, 'CharacterFull', `${c.game_id}:${c.name}`);
});
guides.forEach(g => record(g.thumbnail, 'GuideThumb', `${g.game_id}:${g.slug}`));
news.forEach(n => record(n.thumbnail, 'NewsThumb', n.slug));
items.forEach(i => record(i.icon, 'ItemIcon', `${i.game_id}:${i.name}`));
events.forEach(e => record(e.banner_image, 'EventBanner', `${e.game_id}:${e.title}`));

let crossEntityDupes = 0;
for (const [base, list] of allPhotos.entries()) {
  const types = new Set(list.map(l => l.type));
  if (types.size > 1) {
    crossEntityDupes++;
    console.log(`  [CROSS-COLLISION] ${base} shared across [${[...types].join(', ')}]:`);
    list.forEach(l => console.log(`     - ${l.type}: ${l.name}`));
  }
}
if (crossEntityDupes === 0) {
  console.log(`  [PASS] Cross-Entity Overlap: 0 collisions across ${allPhotos.size} total distinct image slots!`);
}

console.log('\n--- Specific Target Entities Trace ---');
const targets = ['game-wukong', 'game-mh-wilds', 'game-elden-ring', 'game-minecraft'];
for (const tid of targets) {
  const g = games.find(x => x.id === tid);
  console.log(`Entity: ${g.name} (${g.id})`);
  console.log(`  Cover:  ${g.cover_image}`);
  console.log(`  Banner: ${g.banner_image}`);
}

const targetCovers = targets.map(t => games.find(g => g.id === t).cover_image.split('?')[0]);
const targetUnique = new Set(targetCovers);
console.log(`Target covers unique: ${targetUnique.size === 4 ? 'PASS (4/4 distinct)' : 'FAIL'}`);

console.log('\n====================================================');
console.log(`FINAL AUDIT RESULT: ${gCovers + gBanners + cPortraits + cFulls + gdThumbs + nThumbs + itIcons + evBanners + crossEntityDupes === 0 ? 'PASS (100% CLEAN)' : 'FAIL'}`);
console.log('====================================================');

import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('./data/seraphi.db');

const slots = [];
for (const g of db.prepare('SELECT id, name, cover_image, banner_image FROM games').all()) {
  slots.push({ id: g.id, entity: g.name, cat: 'Game Cover', url: g.cover_image });
  slots.push({ id: g.id, entity: g.name, cat: 'Game Banner', url: g.banner_image });
}
for (const c of db.prepare('SELECT id, name, portrait, full_image FROM characters').all()) {
  slots.push({ id: c.id, entity: c.name, cat: 'Character Portrait', url: c.portrait });
  slots.push({ id: c.id, entity: c.name, cat: 'Character Full Image', url: c.full_image });
}
for (const gd of db.prepare('SELECT id, title, thumbnail FROM guides').all()) {
  slots.push({ id: gd.id, entity: gd.title, cat: 'Guide Thumbnail', url: gd.thumbnail });
}
for (const n of db.prepare('SELECT id, title, thumbnail FROM news').all()) {
  slots.push({ id: n.id, entity: n.title, cat: 'News Thumbnail', url: n.thumbnail });
}
for (const it of db.prepare('SELECT id, name, icon FROM items').all()) {
  slots.push({ id: it.id, entity: it.name, cat: 'Item Icon', url: it.icon });
}
for (const ev of db.prepare('SELECT id, title, banner_image FROM events').all()) {
  slots.push({ id: ev.id, entity: ev.title, cat: 'Event Banner', url: ev.banner_image });
}

console.log(`Checking HTTP status for all ${slots.length} URLs...`);

async function checkUrl(item) {
  try {
    const res = await fetch(item.url, { method: 'HEAD' });
    if (res.status === 200) {
      return { ok: true, status: 200, item };
    }
    // Retry with GET if HEAD is not supported (403/405/etc)
    const getRes = await fetch(item.url, { method: 'GET' });
    return { ok: getRes.status === 200, status: getRes.status, item };
  } catch (err) {
    return { ok: false, error: err.message, item };
  }
}

// Run with concurrency pool of 20
const concurrency = 20;
const results = [];
let idx = 0;

async function worker() {
  while (idx < slots.length) {
    const curIdx = idx++;
    const res = await checkUrl(slots[curIdx]);
    results.push(res);
    if (results.length % 50 === 0 || results.length === slots.length) {
      console.log(`Progress: ${results.length}/${slots.length}`);
    }
  }
}

const workers = Array.from({ length: concurrency }, () => worker());
await Promise.all(workers);

const failed = results.filter(r => !r.ok);
const okCount = results.filter(r => r.ok).length;

console.log(`\n========================================`);
console.log(`HTTP Verification Results:`);
console.log(`Total checked: ${slots.length}`);
console.log(`HTTP 200: ${okCount}`);
console.log(`Broken / Non-200: ${failed.length}`);
if (failed.length > 0) {
  console.log('Failed URLs:');
  failed.forEach(f => console.log(`  - [${f.status || f.error}] ${f.item.cat} (${f.item.entity}): ${f.item.url}`));
}
console.log(`========================================`);

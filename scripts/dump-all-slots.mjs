import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';

const db = new DatabaseSync('./data/seraphi.db');

const slots = [];

const games = db.prepare('SELECT id, name, slug, cover_image, banner_image FROM games ORDER BY id').all();
for (const g of games) {
  slots.push({ category: 'game_cover', id: g.id, entity: g.name, slug: g.slug, url: g.cover_image, field: 'cover_image' });
  slots.push({ category: 'game_banner', id: g.id, entity: g.name, slug: g.slug, url: g.banner_image, field: 'banner_image' });
}

const characters = db.prepare('SELECT id, name, slug, game_id, portrait, full_image FROM characters ORDER BY id').all();
for (const c of characters) {
  slots.push({ category: 'character_portrait', id: c.id, entity: c.name, slug: c.slug, game_id: c.game_id, url: c.portrait, field: 'portrait' });
  slots.push({ category: 'character_full', id: c.id, entity: c.name, slug: c.slug, game_id: c.game_id, url: c.full_image, field: 'full_image' });
}

const guides = db.prepare('SELECT id, title, slug, game_id, thumbnail FROM guides ORDER BY id').all();
for (const gd of guides) {
  slots.push({ category: 'guide_thumbnail', id: gd.id, entity: gd.title, slug: gd.slug, game_id: gd.game_id, url: gd.thumbnail, field: 'thumbnail' });
}

const news = db.prepare('SELECT id, title, slug, game_id, thumbnail FROM news ORDER BY id').all();
for (const n of news) {
  slots.push({ category: 'news_thumbnail', id: n.id, entity: n.title, slug: n.slug, game_id: n.game_id, url: n.thumbnail, field: 'thumbnail' });
}

const items = db.prepare('SELECT id, name, slug, game_id, icon FROM items ORDER BY id').all();
for (const it of items) {
  slots.push({ category: 'item_icon', id: it.id, entity: it.name, slug: it.slug, game_id: it.game_id, url: it.icon, field: 'icon' });
}

const events = db.prepare('SELECT id, title, slug, game_id, banner_image FROM events ORDER BY id').all();
for (const ev of events) {
  slots.push({ category: 'event_banner', id: ev.id, entity: ev.title, slug: ev.slug, game_id: ev.game_id, url: ev.banner_image, field: 'banner_image' });
}

console.log('Total slots:', slots.length);
fs.writeFileSync('temp_audit/all_slots.json', JSON.stringify(slots, null, 2));

const countsByCategory = {};
for (const s of slots) {
  countsByCategory[s.category] = (countsByCategory[s.category] || 0) + 1;
}
console.log('Counts by category:', countsByCategory);

import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';

const db = new DatabaseSync('./data/seraphi.db');

console.log('=== Synchronizing Authentic Assets to SQLite (data/seraphi.db) ===');

// 1. Games (22)
const gameFileMap = {
  'game-apex': { cover: 'apex-cover.jpg', banner: 'apex-banner.jpg' },
  'game-arknights': { cover: 'arknights-cover.jpg', banner: 'arknights-banner.jpg' },
  'game-ba': { cover: 'ba-cover.jpg', banner: 'ba-banner.jpg' },
  'game-cyberpunk': { cover: 'cyberpunk-cover.jpg', banner: 'cyberpunk-banner.jpg' },
  'game-dota2': { cover: 'dota2-cover.jpg', banner: 'dota2-banner.jpg' },
  'game-elden-ring': { cover: 'elden-ring-cover.jpg', banner: 'elden-ring-banner.jpg' },
  'game-ff': { cover: 'ff-cover.jpg', banner: 'ff-banner.jpg' },
  'game-fgo': { cover: 'fgo-cover.jpg', banner: 'fgo-banner.jpg' },
  'game-genshin': { cover: 'genshin-cover.jpg', banner: 'genshin-banner.jpg' },
  'game-hi3': { cover: 'hi3-cover.jpg', banner: 'hi3-banner.jpg' },
  'game-hsr': { cover: 'hsr-cover.jpg', banner: 'hsr-banner.jpg' },
  'game-lol': { cover: 'lol-cover.jpg', banner: 'lol-banner.jpg' },
  'game-mh-wilds': { cover: 'mh-wilds-cover.jpg', banner: 'mh-wilds-banner.jpg' },
  'game-minecraft': { cover: 'minecraft-cover.jpg', banner: 'minecraft-banner.jpg' },
  'game-mlbb': { cover: 'mlbb-cover.jpg', banner: 'mlbb-banner.jpg' },
  'game-overwatch2': { cover: 'overwatch2-cover.jpg', banner: 'overwatch2-banner.jpg' },
  'game-pubgm': { cover: 'pubgm-cover.jpg', banner: 'pubgm-banner.jpg' },
  'game-roblox': { cover: 'roblox-cover.jpg', banner: 'roblox-banner.jpg' },
  'game-valorant': { cover: 'valorant-cover.jpg', banner: 'valorant-banner.jpg' },
  'game-wukong': { cover: 'wukong-cover.jpg', banner: 'wukong-banner.jpg' },
  'game-wuwa': { cover: 'wuwa-cover.jpg', banner: 'wuwa-banner.jpg' },
  'game-zzz': { cover: 'zzz-cover.jpg', banner: 'zzz-banner.jpg' },
};

const updateGame = db.prepare('UPDATE games SET cover_image = ?, banner_image = ? WHERE id = ?');
for (const [id, f] of Object.entries(gameFileMap)) {
  const cUrl = `/images/games/${f.cover}`;
  const bUrl = `/images/games/${f.banner}`;
  updateGame.run(cUrl, bUrl, id);
}
console.log('✓ Updated 22 games');

// 2. Characters (52)
const charFileMap = {
  'char-acheron': 'acheron',
  'char-alok': 'dj-alok',
  'char-amiya': 'amiya',
  'char-artoria-pendragon': 'artoria-pendragon',
  'char-aventurine': 'aventurine',
  'char-beatrix': 'beatrix',
  'char-blade': 'blade',
  'char-bloodhound': 'bloodhound',
  'char-changli': 'changli',
  'char-chou': 'chou',
  'char-dan-heng-imbibitor-lunae': 'dan-heng-imbibitor-lunae',
  'char-destined-one': 'the-destined-one',
  'char-ellen': 'ellen-joe',
  'char-ellen-joe': 'ellen-joe-alt',
  'char-fanny': 'fanny',
  'char-firefly': 'firefly',
  'char-furina': 'furina',
  'char-genji': 'genji',
  'char-gilgamesh': 'gilgamesh',
  'char-hayabusa': 'hayabusa',
  'char-hoshimi-miyabi': 'hoshimi-miyabi',
  'char-hu-tao': 'hu-tao',
  'char-jett': 'jett',
  'char-jingliu': 'jingliu',
  'char-jinhsi': 'jinhsi',
  'char-jinshi': 'jinshi',
  'char-jiyan': 'jiyan',
  'char-johnny-silverhand': 'johnny-silverhand',
  'char-kaedehara-kazuha': 'kaedehara-kazuha',
  'char-kafka': 'kafka',
  'char-kiana': 'kiana-kaslana',
  'char-ling': 'ling',
  'char-malenia': 'malenia',
  'char-misono-mika': 'misono-mika',
  'char-nahida': 'nahida',
  'char-neuvillette': 'neuvillette',
  'char-nicole-demara': 'nicole-demara',
  'char-octane': 'octane',
  'char-omen': 'omen',
  'char-raiden': 'raiden-shogun',
  'char-reyna': 'reyna',
  'char-silverash': 'silverash',
  'char-sorasaki-hina': 'sorasaki-hina',
  'char-sova': 'sova',
  'char-sunao-shiroko': 'sunao-shiroko',
  'char-surtr': 'surtr',
  'char-tracer': 'tracer',
  'char-v-cyberpunk': 'v-cyberpunk',
  'char-wraith': 'wraith',
  'char-yinlin': 'yinlin',
  'char-zhongli': 'zhongli',
  'char-zhu-yuan': 'zhu-yuan',
};

const updateChar = db.prepare('UPDATE characters SET portrait = ?, full_image = ? WHERE id = ?');
for (const [id, slug] of Object.entries(charFileMap)) {
  const pUrl = `/images/characters/${slug}-portrait.webp`;
  const fUrl = `/images/characters/${slug}-full.webp`;
  updateChar.run(pUrl, fUrl, id);
}
console.log('✓ Updated 52 characters');

// 3. Items (16)
const itemFileMap = {
  'item-along-passing-shore': 'along-the-passing-shore.webp',
  'item-along-the-passing-shore': 'along-the-passing-shore-alt.webp',
  'item-blade-of-despair': 'blade-of-despair.webp',
  'item-cor-lapis': 'cor-lapis.webp',
  'item-deep-sea-visitor': 'deep-sea-visitor.webp',
  'item-immortality': 'immortality.webp',
  'item-lumitoile': 'lumitoile.webp',
  'item-mace-heavy-core': 'mace.webp',
  'item-phantom-curse-katana': 'cursed-dual-katana.webp',
  'item-sacrificial-jade': 'sacrificial-jade.webp',
  'item-staff-of-homa': 'staff-of-homa.webp',
  'item-tome-eternal-flow': 'tome-of-the-eternal-flow.webp',
  'item-tome-flowing-sands': 'tome-of-the-eternal-flow-alt.webp',
  'item-vandal': 'vandal-rifle.webp',
  'item-verdant-summit': 'verdant-summit.webp',
  'item-whereabouts-should-dreams-rest': 'whereabouts-should-dreams-rest.webp',
};

const updateItem = db.prepare('UPDATE items SET icon = ? WHERE id = ?');
for (const [id, f] of Object.entries(itemFileMap)) {
  const iUrl = `/images/items/${f}`;
  updateItem.run(iUrl, id);
}
console.log('✓ Updated 16 items');

// 4. Events (26)
const updateEvent = db.prepare('UPDATE events SET banner_image = ?, image = ? WHERE id = ?');
const events = db.prepare('SELECT id, slug FROM events').all();
for (const ev of events) {
  const bUrl = `/images/events/${ev.slug}.jpg`;
  updateEvent.run(bUrl, bUrl, ev.id);
}
console.log(`✓ Updated ${events.length} events`);

// 5. News (35)
const updateNews = db.prepare('UPDATE news SET thumbnail = ?, featured_image = ? WHERE id = ?');
const newsList = db.prepare('SELECT id, slug FROM news').all();
for (const n of newsList) {
  const tUrl = `/images/news/${n.slug}.jpg`;
  updateNews.run(tUrl, tUrl, n.id);
}
console.log(`✓ Updated ${newsList.length} news`);

// 6. Guides (56)
const updateGuide = db.prepare('UPDATE guides SET thumbnail = ?, featured_image = ? WHERE id = ?');
const guidesList = db.prepare('SELECT id, slug FROM guides').all();
for (const g of guidesList) {
  const tUrl = `/images/guides/${g.slug}.jpg`;
  updateGuide.run(tUrl, tUrl, g.id);
}
console.log(`✓ Updated ${guidesList.length} guides`);

console.log('=== All Database Updates Applied Successfully! ===');

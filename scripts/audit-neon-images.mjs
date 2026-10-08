import pg from 'pg';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
let dbUrl = '';
for (const line of envContent.split('\n')) {
  const match = line.match(/^DATABASE_URL=(.+)$/);
  if (match) {
    dbUrl = match[1].trim().replace(/^["']|["']$/g, '');
    break;
  }
}

const client = new pg.Client({ connectionString: dbUrl });

async function checkNeon() {
  await client.connect();
  console.log('Connected to Neon PostgreSQL.');

  const games = (await client.query('SELECT id, name, cover_image, banner_image FROM games')).rows;
  const chars = (await client.query('SELECT id, name, portrait, full_image FROM characters')).rows;
  const guides = (await client.query('SELECT id, title, featured_image FROM guides')).rows;
  const news = (await client.query('SELECT id, title, featured_image FROM news')).rows;
  const items = (await client.query('SELECT id, name, icon FROM items')).rows;
  const events = (await client.query('SELECT id, title, banner_image FROM events')).rows;

  console.log('Counts:', {
    games: games.length,
    chars: chars.length,
    guides: guides.length,
    news: news.length,
    items: items.length,
    events: events.length
  });

  const slots = [];
  for (const g of games) {
    slots.push({ id: g.id, entity: g.name, cat: 'Game Cover', url: g.cover_image });
    slots.push({ id: g.id, entity: g.name, cat: 'Game Banner', url: g.banner_image });
  }
  for (const c of chars) {
    slots.push({ id: c.id, entity: c.name, cat: 'Character Portrait', url: c.portrait });
    slots.push({ id: c.id, entity: c.name, cat: 'Character Full Image', url: c.full_image });
  }
  for (const gd of guides) {
    slots.push({ id: gd.id, entity: gd.title, cat: 'Guide Thumbnail', url: gd.featured_image });
  }
  for (const n of news) {
    slots.push({ id: n.id, entity: n.title, cat: 'News Thumbnail', url: n.featured_image });
  }
  for (const it of items) {
    slots.push({ id: it.id, entity: it.name, cat: 'Item Icon', url: it.icon });
  }
  for (const ev of events) {
    slots.push({ id: ev.id, entity: ev.title, cat: 'Event Banner', url: ev.banner_image });
  }

  console.log(`Total slots: ${slots.length}`);

  const urlMap = new Map();
  for (const s of slots) {
    const list = urlMap.get(s.url) || [];
    list.push(s);
    urlMap.set(s.url, list);
  }

  console.log(`Total unique URLs: ${urlMap.size}`);

  let dupCount = 0;
  for (const [url, list] of urlMap.entries()) {
    if (list.length > 1) {
      dupCount++;
      console.log(`\nDuplicate Neon URL ${dupCount}: ${url}`);
      for (const item of list) {
        console.log(`  - [${item.cat}] ${item.entity} (${item.id})`);
      }
    }
  }

  console.log(`\nNeon duplicate count: ${dupCount}`);

  await client.end();
}

checkNeon().catch(err => {
  console.error('Error querying Neon:', err);
  process.exit(1);
});

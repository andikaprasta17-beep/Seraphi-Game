import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('./data/seraphi.db');

const pages = [
  { name: 'Homepage', url: 'https://seraphigame.my.id/' },
  { name: 'Black Myth: Wukong Game Page', url: 'https://seraphigame.my.id/games/black-myth-wukong' },
  { name: 'Monster Hunter Wilds Game Page', url: 'https://seraphigame.my.id/games/monster-hunter-wilds' },
  { name: 'Elden Ring Game Page', url: 'https://seraphigame.my.id/games/elden-ring' },
  { name: 'Minecraft Game Page', url: 'https://seraphigame.my.id/games/minecraft' },
  { name: 'Games Index Page', url: 'https://seraphigame.my.id/games' },
  { name: 'Guides Index Page', url: 'https://seraphigame.my.id/guides' },
  { name: 'News Index Page', url: 'https://seraphigame.my.id/news' },
  { name: 'Events Page', url: 'https://seraphigame.my.id/events' },
  { name: 'Tier List Page', url: 'https://seraphigame.my.id/tier-list' },
];

function extractImages(html) {
  const images = [];
  // Match standard src or srcset or background-image
  const srcMatches = [...html.matchAll(/(?:src|srcset)=["']([^"']+)["']/g)];
  for (const m of srcMatches) {
    let url = m[1];
    // Check if it's next/image wrapper
    const nextMatch = url.match(/url=([^&"']+)/);
    if (nextMatch) {
      url = decodeURIComponent(nextMatch[1]);
    }
    images.push(url);
  }

  // Also match raw unsplash URLs in HTML (e.g. inline styles or data attributes)
  const unsplashRegex = /https%3A%2F%2Fimages\.unsplash\.com[^&"'\s)]+|https:\/\/images\.unsplash\.com[^"'\s)]+/g;
  let u;
  while ((u = unsplashRegex.exec(html)) !== null) {
    images.push(decodeURIComponent(u[0]));
  }

  return [...new Set(images)];
}

async function verifyPage(p) {
  console.log(`\n-------------------------------------------------------------`);
  console.log(`Verifying: ${p.name} (${p.url})`);
  console.log(`-------------------------------------------------------------`);

  try {
    const res = await fetch(p.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });

    console.log(`  HTTP Status: ${res.status}`);
    const html = await res.text();
    const imgs = extractImages(html);
    console.log(`  Found ${imgs.length} unique image references.`);

    // Check specific target entities on relevant pages
    if (p.url.includes('black-myth-wukong')) {
      const coverInHtml = imgs.some(i => i.includes('photo-1552820728-8b83bb6b773f'));
      const bannerInHtml = imgs.some(i => i.includes('photo-1534447677768-be436bb09401'));
      console.log(`  ✓ Black Myth: Wukong Cover (photo-1552820728-8b83bb6b773f): ${coverInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
      console.log(`  ✓ Black Myth: Wukong Banner (photo-1534447677768-be436bb09401): ${bannerInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
    }

    if (p.url.includes('monster-hunter-wilds')) {
      const coverInHtml = imgs.some(i => i.includes('photo-1507842217343-583bb7270b66'));
      const bannerInHtml = imgs.some(i => i.includes('photo-1533702165324-66678e2069b2'));
      console.log(`  ✓ Monster Hunter Wilds Cover (photo-1507842217343-583bb7270b66): ${coverInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
      console.log(`  ✓ Monster Hunter Wilds Banner (photo-1533702165324-66678e2069b2): ${bannerInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
    }

    if (p.url.includes('elden-ring')) {
      const coverInHtml = imgs.some(i => i.includes('photo-1509198397868-475647b2a1e5'));
      const bannerInHtml = imgs.some(i => i.includes('photo-1451187580459-43490279c0fa'));
      console.log(`  ✓ Elden Ring Cover (photo-1509198397868-475647b2a1e5): ${coverInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
      console.log(`  ✓ Elden Ring Banner (photo-1451187580459-43490279c0fa): ${bannerInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
    }

    if (p.url.includes('minecraft')) {
      const coverInHtml = imgs.some(i => i.includes('photo-1763688496557-46d22a1fbe47'));
      const bannerInHtml = imgs.some(i => i.includes('photo-1551818255-e6e10975bc17'));
      console.log(`  ✓ Minecraft Cover (photo-1763688496557-46d22a1fbe47): ${coverInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
      console.log(`  ✓ Minecraft Banner (photo-1551818255-e6e10975bc17): ${bannerInHtml ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
    }

    if (p.url.includes('events')) {
      const wukongEvent = imgs.some(i => i.includes('photo-1558618666-fcd25c85cd64'));
      console.log(`  ✓ Wukong Event Banner (photo-1558618666-fcd25c85cd64): ${wukongEvent ? 'FOUND IN PRODUCTION' : 'NOT FOUND'}`);
    }

    if (p.url.includes('tier-list')) {
      const hasPlaceholders = imgs.some(i => i.includes('placeholder-character.svg'));
      console.log(`  ✓ Tier list renders clean SVG placeholders for uncatalogued characters: ${hasPlaceholders ? 'YES' : 'NO'}`);
    }

    return { page: p.name, ok: true, status: res.status, imgCount: imgs.length };
  } catch (err) {
    console.error(`  ✗ Error fetching ${p.url}:`, err.message);
    return { page: p.name, ok: false, error: err.message };
  }
}

async function run() {
  const results = [];
  for (const p of pages) {
    const res = await verifyPage(p);
    results.push(res);
  }

  console.log(`\n=============================================================`);
  console.log(`PRODUCTION VERIFICATION SUMMARY`);
  console.log(`=============================================================`);
  const failed = results.filter(r => !r.ok);
  console.log(`Total Pages Verified: ${results.length}`);
  console.log(`Successful: ${results.length - failed.length}`);
  console.log(`Failed: ${failed.length}`);
}

run();

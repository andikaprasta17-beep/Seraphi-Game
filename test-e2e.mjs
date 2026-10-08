import fs from 'node:fs';

// Load .env automatically if running via plain node
if (!process.env.ADMIN_PASSWORD && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

async function runTests() {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'seraphi_Secur3_2026_Prod!';
  let passed = 0;
  let failed = 0;

  const sessionIp = `127.0.2.${(Math.floor(Date.now() / 1000) % 250) + 1}`;
  const originalFetch = globalThis.fetch;
  const fetch = (url, options = {}) => {
    const headers = new Headers(options.headers || {});
    if (!headers.has('x-forwarded-for')) {
      headers.set('x-forwarded-for', sessionIp);
    }
    return originalFetch(url, { ...options, headers });
  };

  async function assert(desc, fn) {
    try {
      await fn();
      console.log(`✓ [PASS] ${desc}`);
      passed++;
    } catch (err) {
      console.error(`✗ [FAIL] ${desc}: ${err.message}`);
      failed++;
    }
  }

  console.log('=== STARTING AUTOMATED INTEGRATION TESTS FOR SERAPHI GAME ===\n');

  // Test 1: Homepage
  await assert('Homepage loads 200 and has SERAPHI GAME title', async () => {
    const res = await fetch(`${baseUrl}/`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('SERAPHI') || !text.includes('GAME')) {
      throw new Error('Branding SERAPHI GAME not found');
    }
    if (!text.includes('Database Game Populer')) {
      throw new Error('Section games not found');
    }
    if (!text.includes('Kode Redeem Terbaru')) {
      throw new Error('Section redeem codes not found');
    }
  });

  // Test 2: Games Catalog
  await assert('Games catalog /games loads 200', async () => {
    const res = await fetch(`${baseUrl}/games`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Genshin Impact') || !text.includes('Honkai: Star Rail')) {
      throw new Error('Expected games not in catalog');
    }
  });

  // Test 3: Game Detail Hub
  await assert('Game Hub /games/genshin-impact loads 200 with tabs', async () => {
    const res = await fetch(`${baseUrl}/games/genshin-impact`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Genshin Impact') || !text.includes('Characters') || !text.includes('Guides &amp; Builds')) {
      throw new Error('Game hub tabs or title missing');
    }
  });

  // Test 4: Game Sub-tabs
  await assert('Game Characters /games/genshin-impact/characters loads 200', async () => {
    const res = await fetch(`${baseUrl}/games/genshin-impact/characters`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Neuvillette') || !text.includes('Furina')) {
      throw new Error('Expected characters missing');
    }
  });

  await assert('Game Tier List /games/genshin-impact/tier-list loads 200', async () => {
    const res = await fetch(`${baseUrl}/games/genshin-impact/tier-list`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('SS') || !text.includes('Neuvillette')) {
      throw new Error('Tier list SS tier missing');
    }
  });

  await assert('Game Redeem Codes /games/genshin-impact/redeem-codes loads 200', async () => {
    const res = await fetch(`${baseUrl}/games/genshin-impact/redeem-codes`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('GENSHINGIFT')) {
      throw new Error('GENSHINGIFT code missing');
    }
  });

  // Test 5: Character Detail
  await assert('Character Detail /games/genshin-impact/characters/neuvillette loads 200 with builds', async () => {
    const res = await fetch(`${baseUrl}/games/genshin-impact/characters/neuvillette`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Neuvillette') || !text.includes('Marechaussee Hunter') || !text.includes('Tome of the Eternal Flow')) {
      throw new Error('Build details or signature weapon missing');
    }
    if (!text.includes('As Water Seeks Equilibrium')) {
      throw new Error('Skill description missing');
    }
  });

  // Test 6: Guides Catalog & Detail
  await assert('Guides Catalog /guides loads 200', async () => {
    const res = await fetch(`${baseUrl}/guides`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Build Neuvillette Terbaik')) {
      throw new Error('Guide card missing');
    }
  });

  await assert('Guide Detail /guides/build-neuvillette-terbaik-senjata-artefak-tim loads 200', async () => {
    const res = await fetch(`${baseUrl}/guides/build-neuvillette-terbaik-senjata-artefak-tim`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Prioritas Talent') || !text.includes('Marechaussee Hunter')) {
      throw new Error('Guide content missing');
    }
  });

  // Test 7: News Catalog & Detail
  await assert('News Catalog /news loads 200', async () => {
    const res = await fetch(`${baseUrl}/news`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Genshin Impact Versi 5.4') || !text.includes('Mobile Legends')) {
      throw new Error('News items missing');
    }
  });

  // Test 8: Global Redeem Codes & Events
  await assert('Global Redeem Codes /redeem-codes loads 200', async () => {
    const res = await fetch(`${baseUrl}/redeem-codes`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('STARRAILGIFT') || !text.includes('GENSHINGIFT')) {
      throw new Error('Redeem codes missing');
    }
  });

  await assert('Global Events /events loads 200', async () => {
    const res = await fetch(`${baseUrl}/events`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Festival Lantern Rite') || !text.includes('515 All-Star Party')) {
      throw new Error('Events missing');
    }
  });

  // Test 9: Global Search
  await assert('Search /search?q=neuvillette categorizes results', async () => {
    const res = await fetch(`${baseUrl}/search?q=neuvillette`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Karakter') || !text.includes('Neuvillette')) {
      throw new Error('Search result for Neuvillette missing');
    }
  });

  // Test 10: SEO Sitemap & Robots
  await assert('Sitemap /sitemap.xml loads 200 with XML URLs', async () => {
    const res = await fetch(`${baseUrl}/sitemap.xml`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('<urlset') || !text.includes('/games/genshin-impact')) {
      throw new Error('Sitemap XML structure missing');
    }
  });

  await assert('Robots /robots.txt loads 200', async () => {
    const res = await fetch(`${baseUrl}/robots.txt`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Disallow: /admin')) {
      throw new Error('Robots admin disallow missing');
    }
  });

  // Test 11: Admin Authentication Security Check
  let adminCookie = '';

  await assert('Compromised demo password seraphi2026! is strictly rejected (401)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'seraphi2026!' }),
    });
    if (res.status !== 401) throw new Error(`Expected 401 for compromised password, got ${res.status}`);
  });

  await assert('Admin Login API accepts hardened environment credentials and returns secure cookie', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: adminUsername, password: adminPassword }),
    });
    if (res.status !== 200) throw new Error(`Login status ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Login response not successful');
    const setCookie = res.headers.get('set-cookie');
    if (!setCookie || !setCookie.includes('seraphi_admin_token')) {
      throw new Error('Auth cookie not received');
    }
    adminCookie = setCookie.split(';')[0];
  });

  // Test 12: Admin Authenticated Session check
  await assert('Admin /api/auth/me returns authenticated true with cookie', async () => {
    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: adminCookie },
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.authenticated || data.user?.username !== 'admin') {
      throw new Error('Session verify failed');
    }
  });

  // Test 13: Admin CRUD Operation (Create and Delete Redeem Code)
  await assert('Admin API creates new redeem code and deletes it', async () => {
    const testCode = 'TEST-' + Date.now().toString(36).toUpperCase();
    const createRes = await fetch(`${baseUrl}/api/admin/redeem-codes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
      body: JSON.stringify({
        game_id: 'game-genshin',
        code: testCode,
        reward: '100 Free Gems Integration Test',
        status: 'ACTIVE',
        source: 'Automated Test Suite',
      }),
    });
    if (createRes.status !== 200) throw new Error(`Create status ${createRes.status}`);
    const createData = await createRes.json();
    const codeId = createData.code?.id;
    if (!codeId) throw new Error('Code ID not returned');

    // Delete it
    const delRes = await fetch(`${baseUrl}/api/admin/redeem-codes?id=${codeId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookie },
    });
    if (delRes.status !== 200) throw new Error(`Delete status ${delRes.status}`);
  });

  // Test 14: About & Contact pages
  await assert('About and Contact pages load 200', async () => {
    const aboutRes = await fetch(`${baseUrl}/about`);
    if (aboutRes.status !== 200) throw new Error(`/about status ${aboutRes.status}`);
    const contactRes = await fetch(`${baseUrl}/contact`);
    if (contactRes.status !== 200) throw new Error(`/contact status ${contactRes.status}`);
  });

  console.log(`\n=== TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();

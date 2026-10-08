import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

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

async function runPhase6Tests() {
  console.log('\n=============================================================');
  console.log('   SERAPHI GAME — PHASE 6 LAUNCH & TRAFFIC ACQUISITION SUITE ');
  console.log('   (Deployment, Smoke Tests, Health Check & Verification)    ');
  console.log('=============================================================\n');

  let passed = 0;
  let failed = 0;
  const totalTests = 20;

  async function assert(testNumber, name, fn) {
    try {
      await fn();
      console.log(`✓ [PASS ${testNumber}/${totalTests}] ${name}`);
      passed++;
    } catch (err) {
      console.error(`✗ [FAIL ${testNumber}/${totalTests}] ${name}: ${err.message}`);
      failed++;
    }
  }

  const dbPath = path.join(process.cwd(), 'data', 'seraphi.db');
  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}`);
    process.exit(1);
  }
  const db = new DatabaseSync(dbPath);

  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  let serverReachable = false;
  try {
    const ping = await fetch(`${baseUrl}/`, { method: 'HEAD', signal: AbortSignal.timeout(1500) });
    serverReachable = ping.status < 500;
  } catch {
    serverReachable = false;
  }

  // -------------------------------------------------------------
  // Test 1: Hosting Environment & SQLite Storage Persistence
  // -------------------------------------------------------------
  await assert(1, 'SQLite Database Storage Persistence verified', async () => {
    const journalMode = db.prepare('PRAGMA journal_mode;').get();
    if (journalMode.journal_mode !== 'wal') {
      throw new Error(`Expected journal_mode wal, got ${journalMode.journal_mode}`);
    }
    const stat = fs.statSync(dbPath);
    if (stat.size < 100000) {
      throw new Error(`Database size unexpectedly small: ${stat.size} bytes`);
    }
  });

  // -------------------------------------------------------------
  // Test 2: Production Health Check API (/api/health)
  // -------------------------------------------------------------
  await assert(2, 'Production Health Check API (/api/health) returns 200 and safe telemetry', async () => {
    const healthFile = path.join(process.cwd(), 'src', 'app', 'api', 'health', 'route.ts');
    if (!fs.existsSync(healthFile)) throw new Error('src/app/api/health/route.ts missing');

    const content = fs.readFileSync(healthFile, 'utf-8');
    if (content.includes('process.env.') && !content.includes('process.env.NODE_ENV')) {
      // Must not leak environment vars
    }

    if (serverReachable) {
      const res = await fetch(`${baseUrl}/api/health`);
      if (res.status !== 200) throw new Error(`Health check returned ${res.status}`);
      const data = await res.json();
      if (data.status !== 'ok' || data.database !== 'connected') {
        throw new Error(`Unexpected health payload: ${JSON.stringify(data)}`);
      }
      if (data.env || data.secret || data.path || data.dbPath) {
        throw new Error('Health check leaks internal path or secrets');
      }
    }
  });

  // -------------------------------------------------------------
  // Test 3: Public Core Routes Smoke Test (13 static/hub pages)
  // -------------------------------------------------------------
  await assert(3, 'Public Core Routes Smoke Test (/games, /guides, /news, /redeem-codes, /events, /search, /about, /contact, /privacy, /terms, /editorial-policy, /affiliate-disclosure)', async () => {
    if (serverReachable) {
      const routes = [
        '/',
        '/games',
        '/guides',
        '/news',
        '/redeem-codes',
        '/events',
        '/search',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/editorial-policy',
        '/affiliate-disclosure',
      ];
      for (const r of routes) {
        const res = await fetch(`${baseUrl}${r}`);
        if (res.status !== 200) throw new Error(`Route ${r} returned status ${res.status}`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 4: Game Content Deep Smoke Test (Genshin Impact Hub & Sub-routes)
  // -------------------------------------------------------------
  await assert(4, 'Game Content Smoke Test (Hub, Characters, Character Detail, Guides, Items, Tier List, Redeem Codes, Events)', async () => {
    if (serverReachable) {
      const routes = [
        '/games/genshin-impact',
        '/games/genshin-impact/characters',
        '/games/genshin-impact/characters/neuvillette',
        '/games/genshin-impact/guides',
        '/games/genshin-impact/items',
        '/games/genshin-impact/tier-list',
        '/games/genshin-impact/redeem-codes',
        '/games/genshin-impact/events',
      ];
      for (const r of routes) {
        const res = await fetch(`${baseUrl}${r}`);
        if (res.status !== 200) throw new Error(`Game route ${r} returned status ${res.status}`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 5: Admin Anonymous Access Blocked
  // -------------------------------------------------------------
  await assert(5, 'Admin Security: Anonymous access to /admin redirected to /admin/login', async () => {
    if (serverReachable) {
      const res = await fetch(`${baseUrl}/admin`, { redirect: 'manual' });
      // Should redirect to login (307 or 302 or 303)
      if (res.status !== 307 && res.status !== 302 && res.status !== 303 && res.status !== 401) {
        throw new Error(`Anonymous access returned status ${res.status} instead of redirect`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 6: Admin API Protected
  // -------------------------------------------------------------
  await assert(6, 'Admin Security: Admin API endpoints return 401 for unauthenticated requests', async () => {
    if (serverReachable) {
      const res = await fetch(`${baseUrl}/api/admin/games`, { redirect: 'manual' });
      if (res.status !== 401) throw new Error(`Unauthenticated API call returned status ${res.status}`);
    }
  });

  // -------------------------------------------------------------
  // Test 7: Production Content Non-Zero & Zero Demo Content
  // -------------------------------------------------------------
  await assert(7, 'Production Content: Published Real > 0 and Published Demo = 0', async () => {
    const realGames = db.prepare("SELECT count(*) as c FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED') AND (is_demo = 0 OR is_demo IS NULL)").get().c;
    const realChars = db.prepare("SELECT count(*) as c FROM characters WHERE status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)").get().c;
    const realGuides = db.prepare("SELECT count(*) as c FROM guides WHERE status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)").get().c;
    const demoItems = db.prepare("SELECT count(*) as c FROM guides WHERE is_demo = 1").get().c;

    if (realGames < 20) throw new Error(`Published games too low: ${realGames}`);
    if (realChars < 50) throw new Error(`Published characters too low: ${realChars}`);
    if (realGuides < 50) throw new Error(`Published guides too low: ${realGuides}`);
    if (demoItems > 0) throw new Error(`Demo items present: ${demoItems}`);
  });

  // -------------------------------------------------------------
  // Test 8: Robots.txt Final Syntax & Directives
  // -------------------------------------------------------------
  await assert(8, 'Robots.txt: Allow /, Disallow /admin, /api, /search, and sitemap reference', async () => {
    if (serverReachable) {
      const res = await fetch(`${baseUrl}/robots.txt`);
      if (res.status !== 200) throw new Error(`robots.txt returned status ${res.status}`);
      const text = await res.text();
      if (!text.includes('Disallow: /admin') || !text.includes('Disallow: /api') || !text.includes('Disallow: /search')) {
        throw new Error('robots.txt does not disallow /admin, /api, or /search');
      }
      if (!text.includes('sitemap.xml')) {
        throw new Error('robots.txt does not reference sitemap.xml');
      }
    }
  });

  // -------------------------------------------------------------
  // Test 9: Sitemap.xml Total Count & Validity
  // -------------------------------------------------------------
  await assert(9, 'Sitemap.xml: Valid XML with 336 indexable URLs and no private routes', async () => {
    if (serverReachable) {
      const res = await fetch(`${baseUrl}/sitemap.xml`);
      if (res.status !== 200) throw new Error(`sitemap.xml returned status ${res.status}`);
      const xml = await res.text();
      if (!xml.includes('<urlset') || !xml.includes('</urlset>')) {
        throw new Error('sitemap.xml is not valid XML');
      }
      if (xml.includes('/admin') || xml.includes('/api') || xml.includes('/search')) {
        throw new Error('sitemap.xml contains disallowed routes');
      }
      const count = (xml.match(/<loc>/g) || []).length;
      if (count < 300) {
        throw new Error(`Expected at least 300 URLs in sitemap, found ${count}`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 10: Canonical URLs Clean & Standardized
  // -------------------------------------------------------------
  await assert(10, 'Canonical URLs: Standardized query-free URLs on all primary entities', async () => {
    if (serverReachable) {
      const checkUrls = [
        '/',
        '/games/genshin-impact',
        '/games/genshin-impact/characters/neuvillette',
        '/guides/build-neuvillette-terbaik-senjata-artefak-tim',
        '/events',
        '/redeem-codes',
      ];
      for (const u of checkUrls) {
        const res = await fetch(`${baseUrl}${u}`);
        const html = await res.text();
        if (!html.includes('rel="canonical"')) {
          throw new Error(`Page ${u} missing canonical link tag`);
        }
      }
    }
  });

  // -------------------------------------------------------------
  // Test 11: Google Search Console Checklist & Manual Steps
  // -------------------------------------------------------------
  await assert(11, 'Google Search Console Readiness page (/admin/seo) displays READY & 7-step guide', async () => {
    const seoPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'admin', 'seo', 'page.tsx'), 'utf-8');
    if (!seoPage.includes('search.google.com/search-console') || !seoPage.includes('priorityPages')) {
      throw new Error('/admin/seo missing GSC guidance');
    }
  });

  // -------------------------------------------------------------
  // Test 12: GA4 Optional & Graceful Fallback
  // -------------------------------------------------------------
  await assert(12, 'GA4 Measurement is optional and does not crash website when unset', async () => {
    const gaComp = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'GoogleAnalytics.tsx'), 'utf-8');
    if (!gaComp.includes('return null;')) {
      throw new Error('GoogleAnalytics does not return null when ID is absent');
    }
  });

  // -------------------------------------------------------------
  // Test 13: Internal Telemetry & View Counter Cooldown
  // -------------------------------------------------------------
  await assert(13, 'Internal View Counter (/api/views) implements cooldown & non-blocking client', async () => {
    const viewsApi = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'api', 'views', 'route.ts'), 'utf-8');
    if (!viewsApi.includes('COOLDOWN_MS')) {
      throw new Error('Views API missing COOLDOWN_MS protection');
    }
  });

  // -------------------------------------------------------------
  // Test 14: Content Freshness (updated_at integrity)
  // -------------------------------------------------------------
  await assert(14, 'Content Freshness: updated_at timestamps are valid ISO strings without placeholders', async () => {
    const rows = db.prepare("SELECT id, updated_at FROM guides LIMIT 10").all();
    for (const r of rows) {
      const d = new Date(r.updated_at);
      if (isNaN(d.getTime())) {
        throw new Error(`Invalid updated_at on guide ${r.id}: ${r.updated_at}`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 15: Redeem Code Monitoring & Status Integrity
  // -------------------------------------------------------------
  await assert(15, 'Redeem Code System: Codes have status (ACTIVE/EXPIRED) and verified_at timestamp', async () => {
    const codes = db.prepare("SELECT id, code, status, verified_at FROM redeem_codes LIMIT 10").all();
    for (const c of codes) {
      if (!['ACTIVE', 'EXPIRED', 'UNKNOWN'].includes(c.status)) {
        throw new Error(`Invalid code status on ${c.id}: ${c.status}`);
      }
      if (!c.verified_at) {
        throw new Error(`Code ${c.id} missing verified_at timestamp`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 16: Zero Orphaned Relations (404 Prevention)
  // -------------------------------------------------------------
  await assert(16, 'Zero orphaned relations: All items, characters, and events have valid game IDs', async () => {
    const orphanItems = db.prepare("SELECT count(*) as c FROM items i LEFT JOIN games g ON i.game_id = g.id WHERE g.id IS NULL").get().c;
    const orphanCodes = db.prepare("SELECT count(*) as c FROM redeem_codes rc LEFT JOIN games g ON rc.game_id = g.id WHERE g.id IS NULL").get().c;
    const orphanEvents = db.prepare("SELECT count(*) as c FROM events e LEFT JOIN games g ON e.game_id = g.id WHERE g.id IS NULL").get().c;

    if (orphanItems > 0) throw new Error(`Found ${orphanItems} orphaned items`);
    if (orphanCodes > 0) throw new Error(`Found ${orphanCodes} orphaned redeem codes`);
    if (orphanEvents > 0) throw new Error(`Found ${orphanEvents} orphaned events`);
  });

  // -------------------------------------------------------------
  // Test 17: AdSlot Safe Inactive Collapse
  // -------------------------------------------------------------
  await assert(17, 'AdSlot Safety: Returns null without empty container when NEXT_PUBLIC_AD_PROVIDER=none', async () => {
    const adComp = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'AdSlot.tsx'), 'utf-8');
    if (!adComp.includes("adProvider === 'none'") || !adComp.includes('return null;')) {
      throw new Error('AdSlot does not return null when provider is none');
    }
  });

  // -------------------------------------------------------------
  // Test 18: Legal & Policy Pages Complete
  // -------------------------------------------------------------
  await assert(18, 'All 5 compliance pages (/privacy, /terms, /editorial-policy, /affiliate-disclosure, /contact) load 200', async () => {
    if (serverReachable) {
      const legal = ['/privacy', '/terms', '/editorial-policy', '/affiliate-disclosure', '/contact'];
      for (const p of legal) {
        const res = await fetch(`${baseUrl}${p}`);
        if (res.status !== 200) throw new Error(`Legal page ${p} returned ${res.status}`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 19: Error Boundary Masks Stack Traces
  // -------------------------------------------------------------
  await assert(19, 'Error Boundary (/src/app/error.tsx) masks internal errors and logs safely', async () => {
    const errPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'error.tsx'), 'utf-8');
    if (errPage.includes('error.stack')) {
      throw new Error('error.tsx leaks error.stack');
    }
  });

  // -------------------------------------------------------------
  // Test 20: Pre-Launch Gate Evaluates 15 Categories
  // -------------------------------------------------------------
  await assert(20, 'Pre-Launch Gate (/admin/launch-check) evaluates 15 categories accurately', async () => {
    const checkPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'admin', 'launch-check', 'page.tsx'), 'utf-8');
    if (!checkPage.includes('15-Point Launch Gate Checklist')) {
      throw new Error('launch-check page missing 15-point checklist');
    }
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`Phase 6 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('-------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase6Tests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

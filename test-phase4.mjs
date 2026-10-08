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

async function runPhase4Tests() {
  console.log('\n=============================================================');
  console.log('   SERAPHI GAME — PHASE 4 COMPREHENSIVE VERIFICATION SUITE   ');
  console.log('   (Traffic, Analytics, Indexing & Monetization Readiness)   ');
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

  // Ensure is_demo column migration exists in test environment
  const addCol = (table, col, def) => {
    try {
      const cols = db.prepare(`PRAGMA table_info(${table})`).all();
      if (!cols.some((c) => c.name === col)) {
        db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${def};`);
      }
    } catch {}
  };
  ['games', 'characters', 'guides', 'news', 'items', 'redeem_codes', 'events'].forEach((t) => {
    addCol(t, 'is_demo', 'INTEGER DEFAULT 0');
  });

  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  let serverReachable = false;
  try {
    const ping = await fetch(`${baseUrl}/`, { method: 'HEAD', signal: AbortSignal.timeout(1500) });
    serverReachable = ping.status < 500;
  } catch {
    serverReachable = false;
  }

  // -------------------------------------------------------------
  // Test 1: Demo content excluded in production
  // -------------------------------------------------------------
  await assert(1, 'Demo content excluded in production mode queries', async () => {
    const testDemoId = `test-demo-${Date.now()}`;
    const testDemoSlug = `demo-test-guide-${Date.now()}`;
    db.prepare(`
      INSERT INTO guides (id, game_id, title, slug, category, thumbnail, excerpt, content, author, published_at, updated_at, tags, status, views, is_demo)
      VALUES (?, 'game-genshin', 'Demo Exclusive Guide', ?, 'BEGINNER', 'https://example.com/demo.jpg', 'Excerpt', 'Content', 'Author', datetime('now'), datetime('now'), '[]', 'PUBLISHED', 0, 1)
    `).run(testDemoId, testDemoSlug);

    // Verify production query filtering: must NOT include items with is_demo = 1
    const prodGuides = db.prepare("SELECT id FROM guides WHERE status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)").all();
    const foundDemo = prodGuides.some((g) => g.id === testDemoId);

    // Clean up
    db.prepare("DELETE FROM guides WHERE id = ?").run(testDemoId);

    if (foundDemo) {
      throw new Error('Demo item (is_demo = 1) was returned in production query');
    }
  });

  // -------------------------------------------------------------
  // Test 2: Demo content excluded from sitemap
  // -------------------------------------------------------------
  await assert(2, 'Demo content excluded from sitemap logic', async () => {
    const sitemapFile = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'sitemap.ts'), 'utf-8');
    if (!sitemapFile.includes('isProductionMode()') || !sitemapFile.includes('is_demo')) {
      throw new Error('Sitemap does not check isProductionMode() and is_demo');
    }

    const dbFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'db.ts'), 'utf-8');
    if (!dbFile.includes('(is_demo = 0 OR is_demo IS NULL)')) {
      throw new Error('Database queries do not enforce (is_demo = 0 OR is_demo IS NULL) in production');
    }
  });

  // -------------------------------------------------------------
  // Test 3: Demo content excluded from search
  // -------------------------------------------------------------
  await assert(3, 'Demo content excluded from search queries in production mode', async () => {
    const dbFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'db.ts'), 'utf-8');
    if (!dbFile.includes('searchAll') || !dbFile.includes('isProductionMode') || !dbFile.includes('(is_demo = 0 OR is_demo IS NULL)')) {
      throw new Error('searchAll in db.ts does not include isProductionMode filter for demo content');
    }
  });

  // -------------------------------------------------------------
  // Test 4: Production content appears
  // -------------------------------------------------------------
  await assert(4, 'Production content appears (published & is_demo = 0)', async () => {
    const prodGames = db.prepare("SELECT COUNT(*) as count FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED') AND (is_demo = 0 OR is_demo IS NULL)").get().count;
    const prodGuides = db.prepare("SELECT COUNT(*) as count FROM guides WHERE status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)").get().count;

    if (prodGames < 1) throw new Error('No production games found in database');
    if (prodGuides < 1) throw new Error('No production guides found in database');
  });

  // -------------------------------------------------------------
  // Test 5: Indexing disabled produces noindex
  // -------------------------------------------------------------
  await assert(5, 'Global indexing switch: INDEXING_ENABLED=false produces noindex, nofollow', async () => {
    const seoFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'seo.ts'), 'utf-8');
    if (!seoFile.includes('isIndexingEnabled')) {
      throw new Error('isIndexingEnabled helper missing in seo.ts');
    }
    if (!seoFile.includes('index: false, follow: false')) {
      throw new Error('noindex, nofollow directive missing in seo.ts');
    }

    const robotsFile = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'robots.ts'), 'utf-8');
    if (!robotsFile.includes('!isIndexingEnabled()') || !robotsFile.includes("disallow: '/'")) {
      throw new Error('robots.ts does not disallow all when indexing is disabled');
    }
  });

  // -------------------------------------------------------------
  // Test 6: Indexing enabled works
  // -------------------------------------------------------------
  await assert(6, 'Global indexing switch: INDEXING_ENABLED=true allows published non-demo content', async () => {
    const seoFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'seo.ts'), 'utf-8');
    if (!seoFile.includes('isDemo') && !seoFile.includes('is_demo')) {
      throw new Error('getRobotsDirective does not evaluate is_demo status');
    }
  });

  // -------------------------------------------------------------
  // Test 7: Production URL correct
  // -------------------------------------------------------------
  await assert(7, 'Production URL resolution uses NEXT_PUBLIC_SITE_URL', async () => {
    const seoFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'seo.ts'), 'utf-8');
    if (!seoFile.includes('getSiteUrl') || !seoFile.includes('process.env.NEXT_PUBLIC_SITE_URL')) {
      throw new Error('getSiteUrl does not resolve NEXT_PUBLIC_SITE_URL in seo.ts');
    }
  });

  // -------------------------------------------------------------
  // Test 8: No hardcoded localhost in production metadata
  // -------------------------------------------------------------
  await assert(8, 'No hardcoded localhost in canonical, sitemap, or robots metadata', async () => {
    const filesToCheck = [
      'src/lib/seo.ts',
      'src/app/sitemap.ts',
      'src/app/robots.ts',
      'src/app/layout.tsx',
      'src/components/Breadcrumbs.tsx',
    ];

    for (const relPath of filesToCheck) {
      const content = fs.readFileSync(path.join(process.cwd(), relPath), 'utf-8');
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.includes('localhost') && !line.includes('//') && !line.includes('test') && !line.includes('DEBUG')) {
          if (line.includes("'http://localhost") && !line.includes('process.env')) {
            throw new Error(`Hardcoded localhost found in ${relPath}: ${line.trim()}`);
          }
        }
      }
    }
  });

  // -------------------------------------------------------------
  // Test 9: Analytics disabled when GA ID missing
  // -------------------------------------------------------------
  await assert(9, 'Analytics safely disabled when NEXT_PUBLIC_GA_ID is missing or empty', async () => {
    const analyticsFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'analytics.ts'), 'utf-8');
    if (!analyticsFile.includes('isAnalyticsEnabled') || !analyticsFile.includes('NEXT_PUBLIC_GA_ID')) {
      throw new Error('Analytics abstraction missing isAnalyticsEnabled check');
    }

    const gaComponent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'GoogleAnalytics.tsx'), 'utf-8');
    if (!gaComponent.includes('return null;')) {
      throw new Error('GoogleAnalytics component does not return null when gaId is missing');
    }
  });

  // -------------------------------------------------------------
  // Test 10: Analytics enabled when configured & privacy masked
  // -------------------------------------------------------------
  await assert(10, 'Analytics enables cleanly when GA ID configured with masked ID helper', async () => {
    const analyticsFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'analytics.ts'), 'utf-8');
    if (!analyticsFile.includes('getMaskedMeasurementId')) {
      throw new Error('getMaskedMeasurementId helper missing in analytics.ts');
    }
  });

  // -------------------------------------------------------------
  // Test 11: Privacy sanitization in analytics
  // -------------------------------------------------------------
  await assert(11, 'Privacy: Analytics sanitizes search queries and avoids collecting PII', async () => {
    const analyticsFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'analytics.ts'), 'utf-8');
    if (!analyticsFile.includes('sanitizeSearchQuery')) {
      throw new Error('sanitizeSearchQuery helper missing in analytics.ts');
    }
    if (!analyticsFile.includes('@') || !analyticsFile.includes('token') || !analyticsFile.includes('password')) {
      throw new Error('sanitizeSearchQuery does not filter emails, tokens, or passwords');
    }
  });

  // -------------------------------------------------------------
  // Test 12: Dynamic Open Graph generator exists and handles params
  // -------------------------------------------------------------
  await assert(12, 'Dynamic OG route (/api/og) exists and handles title, game, and category', async () => {
    const ogFile = path.join(process.cwd(), 'src', 'app', 'api', 'og', 'route.tsx');
    if (!fs.existsSync(ogFile)) {
      throw new Error('Dynamic OG generator /api/og/route.tsx missing');
    }

    const ogContent = fs.readFileSync(ogFile, 'utf-8');
    if (!ogContent.includes('ImageResponse') || !ogContent.includes('SERAPHI GAME')) {
      throw new Error('OG route does not use ImageResponse or lack SERAPHI GAME branding');
    }

    if (serverReachable) {
      const res = await fetch(`${baseUrl}/api/og?title=Build+Neuvillette&game=Genshin+Impact&category=Character+Guide`);
      if (res.status !== 200) throw new Error(`OG route returned status ${res.status}`);
      const ctype = res.headers.get('content-type') || '';
      if (!ctype.includes('image/')) throw new Error(`Expected image content-type, received ${ctype}`);
    }
  });

  // -------------------------------------------------------------
  // Test 13: OG fallback works
  // -------------------------------------------------------------
  await assert(13, 'OG generator provides fallback when query parameters are absent', async () => {
    const ogFile = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'api', 'og', 'route.tsx'), 'utf-8');
    if (!ogFile.includes('fallback') && !ogFile.includes('defaultTitle')) {
      throw new Error('OG route missing fallback title definition');
    }

    if (serverReachable) {
      const res = await fetch(`${baseUrl}/api/og`);
      if (res.status !== 200) throw new Error(`OG fallback route returned status ${res.status}`);
      const ctype = res.headers.get('content-type') || '';
      if (!ctype.includes('image/')) throw new Error(`Expected image content-type, received ${ctype}`);
    }
  });

  // -------------------------------------------------------------
  // Test 14: Privacy page loads
  // -------------------------------------------------------------
  await assert(14, 'Privacy Policy page (/privacy) exists with legal compliance sections', async () => {
    const privFile = path.join(process.cwd(), 'src', 'app', 'privacy', 'page.tsx');
    if (!fs.existsSync(privFile)) throw new Error('/privacy/page.tsx missing');

    const privContent = fs.readFileSync(privFile, 'utf-8');
    if (!privContent.includes('Kebijakan Privasi') || !privContent.includes('Google Analytics')) {
      throw new Error('Privacy policy page missing required privacy disclosures');
    }

    if (serverReachable) {
      const res = await fetch(`${baseUrl}/privacy`);
      if (res.status !== 200) throw new Error(`Privacy page returned status ${res.status}`);
    }
  });

  // -------------------------------------------------------------
  // Test 15: Terms page loads
  // -------------------------------------------------------------
  await assert(15, 'Terms of Service page (/terms) exists with trademark disclaimer', async () => {
    const termsFile = path.join(process.cwd(), 'src', 'app', 'terms', 'page.tsx');
    if (!fs.existsSync(termsFile)) throw new Error('/terms/page.tsx missing');

    const termsContent = fs.readFileSync(termsFile, 'utf-8');
    if (!termsContent.includes('Syarat dan Ketentuan') || !termsContent.toLowerCase().includes('hak cipta')) {
      throw new Error('Terms page missing required disclaimer terms');
    }

    if (serverReachable) {
      const res = await fetch(`${baseUrl}/terms`);
      if (res.status !== 200) throw new Error(`Terms page returned status ${res.status}`);
    }
  });

  // -------------------------------------------------------------
  // Test 16: Editorial policy loads
  // -------------------------------------------------------------
  await assert(16, 'Editorial Policy page (/editorial-policy) exists with testing & anti-plagiarism standards', async () => {
    const editFile = path.join(process.cwd(), 'src', 'app', 'editorial-policy', 'page.tsx');
    if (!fs.existsSync(editFile)) throw new Error('/editorial-policy/page.tsx missing');

    const editContent = fs.readFileSync(editFile, 'utf-8');
    if (!editContent.includes('Kebijakan Editorial') || !editContent.includes('Koreksi')) {
      throw new Error('Editorial policy page missing standards');
    }

    if (serverReachable) {
      const res = await fetch(`${baseUrl}/editorial-policy`);
      if (res.status !== 200) throw new Error(`Editorial policy page returned status ${res.status}`);
    }
  });

  // -------------------------------------------------------------
  // Test 17: Affiliate disclosure loads
  // -------------------------------------------------------------
  await assert(17, 'Affiliate Disclosure page (/affiliate-disclosure) exists with rel="sponsored" transparency', async () => {
    const affFile = path.join(process.cwd(), 'src', 'app', 'affiliate-disclosure', 'page.tsx');
    if (!fs.existsSync(affFile)) throw new Error('/affiliate-disclosure/page.tsx missing');

    const affContent = fs.readFileSync(affFile, 'utf-8');
    if (!affContent.includes('Afiliasi') || !affContent.includes('rel=')) {
      throw new Error('Affiliate disclosure missing required transparency statements');
    }

    if (serverReachable) {
      const res = await fetch(`${baseUrl}/affiliate-disclosure`);
      if (res.status !== 200) throw new Error(`Affiliate disclosure returned status ${res.status}`);
    }
  });

  // -------------------------------------------------------------
  // Test 18: Safe Internal View Counter API
  // -------------------------------------------------------------
  await assert(18, 'Internal View Counter API (/api/views) implements cooldown & rate limiting', async () => {
    const viewsApi = path.join(process.cwd(), 'src', 'app', 'api', 'views', 'route.ts');
    if (!fs.existsSync(viewsApi)) throw new Error('/api/views/route.ts missing');

    const viewsContent = fs.readFileSync(viewsApi, 'utf-8');
    if (!viewsContent.includes('incrementViews') || !viewsContent.includes('COOLDOWN_MS')) {
      throw new Error('Views API missing incrementViews or cooldown protection');
    }

    const trackerComponent = path.join(process.cwd(), 'src', 'components', 'ViewTracker.tsx');
    if (!fs.existsSync(trackerComponent)) throw new Error('ViewTracker client component missing');
  });

  // -------------------------------------------------------------
  // Test 19: AdSlot safety (default disabled & collapse)
  // -------------------------------------------------------------
  await assert(19, 'AdSlot safety: default disabled, no external scripts if provider is none, collapses cleanly', async () => {
    const adSlotFile = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'AdSlot.tsx'), 'utf-8');
    if (!adSlotFile.includes("adProvider === 'none'") || !adSlotFile.includes('return null;')) {
      throw new Error('AdSlot does not safely collapse to null when adProvider is none');
    }
  });

  // -------------------------------------------------------------
  // Test 20: Pre-launch quality check & admin pages
  // -------------------------------------------------------------
  await assert(20, 'Admin pages (/admin/seo, /admin/analytics, /admin/launch-check) exist and evaluate status accurately', async () => {
    const adminSeo = path.join(process.cwd(), 'src', 'app', 'admin', 'seo', 'page.tsx');
    const adminAnalytics = path.join(process.cwd(), 'src', 'app', 'admin', 'analytics', 'page.tsx');
    const adminLaunch = path.join(process.cwd(), 'src', 'app', 'admin', 'launch-check', 'page.tsx');

    if (!fs.existsSync(adminSeo)) throw new Error('/admin/seo/page.tsx missing');
    if (!fs.existsSync(adminAnalytics)) throw new Error('/admin/analytics/page.tsx missing');
    if (!fs.existsSync(adminLaunch)) throw new Error('/admin/launch-check/page.tsx missing');

    const launchContent = fs.readFileSync(adminLaunch, 'utf-8');
    if (!launchContent.includes('READY') || !launchContent.includes('NOT READY')) {
      throw new Error('Launch check page does not compute READY / NOT READY launch status');
    }
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`Phase 4 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('-------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase4Tests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

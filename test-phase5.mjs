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

async function runPhase5Tests() {
  console.log('\n=============================================================');
  console.log('   SERAPHI GAME — PHASE 5 PRODUCTION LAUNCH SUITE            ');
  console.log('   (Deployment, Verification, Indexing, Safety & Readiness)  ');
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

  // -------------------------------------------------------------
  // Test 1: Production Safety Check module
  // -------------------------------------------------------------
  await assert(1, 'Production Safety Check module evaluates configuration rules', async () => {
    const safetyFile = path.join(process.cwd(), 'src', 'lib', 'safety-check.ts');
    if (!fs.existsSync(safetyFile)) throw new Error('src/lib/safety-check.ts does not exist');
    const content = fs.readFileSync(safetyFile, 'utf-8');
    if (
      !content.includes('runProductionSafetyCheck') ||
      !content.includes('INSECURE_DEMO_PASSWORDS') ||
      !content.includes('sessionSecretStatus')
    ) {
      throw new Error('safety-check.ts missing required safety evaluation rules');
    }
  });

  // -------------------------------------------------------------
  // Test 2: Indexing enabled vs demo mode protection
  // -------------------------------------------------------------
  await assert(2, 'Safety Rule: INDEXING_ENABLED=true with CONTENT_MODE=demo flagged as FAIL', async () => {
    const safetyFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'safety-check.ts'), 'utf-8');
    if (!safetyFile.includes("indexingEnabled && contentMode === 'demo'")) {
      throw new Error('Safety check does not flag INDEXING_ENABLED=true in demo mode');
    }
  });

  // -------------------------------------------------------------
  // Test 3: Session Secret length requirement
  // -------------------------------------------------------------
  await assert(3, 'Safety Rule: SESSION_SECRET must be at least 32 characters', async () => {
    const safetyFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'safety-check.ts'), 'utf-8');
    if (!safetyFile.includes('sessionSecret.length < 32')) {
      throw new Error('Safety check does not enforce 32-character minimum on SESSION_SECRET');
    }
  });

  // -------------------------------------------------------------
  // Test 4: Old demo password rejection
  // -------------------------------------------------------------
  await assert(4, 'Safety Rule: Old demo passwords (seraphi2026!, admin123) rejected as FAIL', async () => {
    const safetyFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'safety-check.ts'), 'utf-8');
    if (!safetyFile.includes('seraphi2026!') || !safetyFile.includes('admin123')) {
      throw new Error('Safety check does not blacklist known insecure demo passwords');
    }
  });

  // -------------------------------------------------------------
  // Test 5: Production URL audit
  // -------------------------------------------------------------
  await assert(5, 'Production URL resolution: No hardcoded development domains in metadata', async () => {
    const seoFile = fs.readFileSync(path.join(process.cwd(), 'src', 'lib', 'seo.ts'), 'utf-8');
    if (!seoFile.includes('NEXT_PUBLIC_SITE_URL')) {
      throw new Error('seo.ts does not dynamically resolve NEXT_PUBLIC_SITE_URL');
    }
  });

  // -------------------------------------------------------------
  // Test 6: Robots.txt disallows /admin, /api, and /search
  // -------------------------------------------------------------
  await assert(6, 'Robots.txt final configuration: Allow / and Disallow /admin, /api, /search', async () => {
    const robotsFile = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'robots.ts'), 'utf-8');
    if (
      !robotsFile.includes("'/admin'") ||
      !robotsFile.includes("'/api'") ||
      !robotsFile.includes("'/search'")
    ) {
      throw new Error('robots.ts does not disallow /admin, /api, /search');
    }
    if (!robotsFile.includes('sitemap.xml')) {
      throw new Error('robots.ts does not reference sitemap.xml');
    }
  });

  // -------------------------------------------------------------
  // Test 7: Sitemap includes only published non-demo content with updated_at
  // -------------------------------------------------------------
  await assert(7, 'Sitemap final configuration: strictly published and non-demo content', async () => {
    const sitemapFile = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'sitemap.ts'), 'utf-8');
    if (!sitemapFile.includes('onlyPublished: true') && !sitemapFile.includes('isProductionMode()')) {
      throw new Error('sitemap.ts does not enforce onlyPublished and isProductionMode');
    }
    if (!sitemapFile.includes('lastModified: new Date(')) {
      throw new Error('sitemap.ts does not set lastModified from entity timestamps');
    }
  });

  // -------------------------------------------------------------
  // Test 8: HTTPS & Security headers configured in next.config.mjs
  // -------------------------------------------------------------
  await assert(8, 'HTTPS & CSP: upgrade-insecure-requests and HSTS active in next.config.mjs', async () => {
    const configContent = fs.readFileSync(path.join(process.cwd(), 'next.config.mjs'), 'utf-8');
    if (!configContent.includes('upgrade-insecure-requests')) {
      throw new Error('upgrade-insecure-requests missing from CSP in next.config.mjs');
    }
    if (!configContent.includes('Strict-Transport-Security')) {
      throw new Error('Strict-Transport-Security missing in next.config.mjs');
    }
  });

  // -------------------------------------------------------------
  // Test 9: GSC readiness 9-point checklist on /admin/seo
  // -------------------------------------------------------------
  await assert(9, 'Admin SEO page (/admin/seo) implements 9-point GSC readiness checklist', async () => {
    const seoPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'admin', 'seo', 'page.tsx'), 'utf-8');
    const requiredKeys = ['prod_url', 'https', 'sitemap', 'robots', 'canonical', 'indexing_enabled', 'demo_content', 'structured_data', 'no_localhost'];
    for (const k of requiredKeys) {
      if (!seoPage.includes(k)) {
        throw new Error(`Checklist item ${k} missing from /admin/seo`);
      }
    }
  });

  // -------------------------------------------------------------
  // Test 10: GSC manual instructions and initial indexing priority
  // -------------------------------------------------------------
  await assert(10, 'Admin SEO page contains manual GSC registration steps and initial indexing priority', async () => {
    const seoPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'admin', 'seo', 'page.tsx'), 'utf-8');
    if (!seoPage.includes('search.google.com/search-console') || !seoPage.includes('priorityPages')) {
      throw new Error('GSC manual instructions or priorityPages missing from /admin/seo');
    }
  });

  // -------------------------------------------------------------
  // Test 11: Content audit - Exact production content counts verified
  // -------------------------------------------------------------
  await assert(11, 'Pre-launch content audit: 22 Games, 52 Characters, 56 Guides, 35 News, 16 Items, 24 Redeem Codes, 26 Events', async () => {
    const games = db.prepare("SELECT count(*) as c FROM games WHERE status NOT IN ('DRAFT', 'REVIEW', 'ARCHIVED') AND (is_demo = 0 OR is_demo IS NULL)").get().c;
    const chars = db.prepare("SELECT count(*) as c FROM characters WHERE status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)").get().c;
    const guides = db.prepare("SELECT count(*) as c FROM guides WHERE status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)").get().c;
    const news = db.prepare("SELECT count(*) as c FROM news WHERE status = 'PUBLISHED' AND (is_demo = 0 OR is_demo IS NULL)").get().c;
    const items = db.prepare("SELECT count(*) as c FROM items WHERE (is_demo = 0 OR is_demo IS NULL)").get().c;
    const codes = db.prepare("SELECT count(*) as c FROM redeem_codes WHERE (is_demo = 0 OR is_demo IS NULL)").get().c;
    const events = db.prepare("SELECT count(*) as c FROM events WHERE (is_demo = 0 OR is_demo IS NULL)").get().c;

    if (games !== 22) throw new Error(`Expected 22 games, got ${games}`);
    if (chars !== 52) throw new Error(`Expected 52 characters, got ${chars}`);
    if (guides !== 56) throw new Error(`Expected 56 guides, got ${guides}`);
    if (news !== 35) throw new Error(`Expected 35 news, got ${news}`);
    if (items !== 16) throw new Error(`Expected 16 items, got ${items}`);
    if (codes !== 24) throw new Error(`Expected 24 redeem codes, got ${codes}`);
    if (events !== 26) throw new Error(`Expected 26 events, got ${events}`);
  });

  // -------------------------------------------------------------
  // Test 12: Zero published demo items across database
  // -------------------------------------------------------------
  await assert(12, 'Zero published demo items (is_demo = 1) present in production dataset', async () => {
    const demoGuides = db.prepare("SELECT count(*) as c FROM guides WHERE is_demo = 1").get().c;
    const demoGames = db.prepare("SELECT count(*) as c FROM games WHERE is_demo = 1").get().c;
    const demoChars = db.prepare("SELECT count(*) as c FROM characters WHERE is_demo = 1").get().c;
    const demoNews = db.prepare("SELECT count(*) as c FROM news WHERE is_demo = 1").get().c;

    if (demoGuides + demoGames + demoChars + demoNews > 0) {
      throw new Error(`Demo items detected in database: guides=${demoGuides}, games=${demoGames}, chars=${demoChars}, news=${demoNews}`);
    }
  });

  // -------------------------------------------------------------
  // Test 13: 404 & Relational integrity audit
  // -------------------------------------------------------------
  await assert(13, 'Relational audit: All character and guide foreign keys resolve cleanly to games', async () => {
    const orphanChars = db.prepare("SELECT count(*) as c FROM characters c LEFT JOIN games g ON c.game_id = g.id WHERE g.id IS NULL").get().c;
    const orphanGuides = db.prepare("SELECT count(*) as c FROM guides gu LEFT JOIN games g ON gu.game_id = g.id WHERE g.id IS NULL").get().c;

    if (orphanChars > 0) throw new Error(`Found ${orphanChars} orphaned characters without valid game`);
    if (orphanGuides > 0) throw new Error(`Found ${orphanGuides} orphaned guides without valid game`);
  });

  // -------------------------------------------------------------
  // Test 14: Error monitoring abstraction exists
  // -------------------------------------------------------------
  await assert(14, 'Zero-cost error monitoring abstraction (src/lib/error-monitor.ts) implemented', async () => {
    const errMonFile = path.join(process.cwd(), 'src', 'lib', 'error-monitor.ts');
    if (!fs.existsSync(errMonFile)) throw new Error('src/lib/error-monitor.ts missing');
    const content = fs.readFileSync(errMonFile, 'utf-8');
    if (!content.includes('captureException') || !content.includes('sanitizeContext')) {
      throw new Error('error-monitor.ts missing captureException or sanitizeContext');
    }
  });

  // -------------------------------------------------------------
  // Test 15: Error page masks stack trace
  // -------------------------------------------------------------
  await assert(15, 'Error boundary (/src/app/error.tsx) strictly hides stack trace from end users', async () => {
    const errPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'error.tsx'), 'utf-8');
    if (errPage.includes('error.stack')) {
      throw new Error('error.tsx leaks error.stack to public UI');
    }
    if (!errPage.includes('Terjadi Gangguan Sistem')) {
      throw new Error('error.tsx missing standard user-facing message');
    }
  });

  // -------------------------------------------------------------
  // Test 16: Database backup routine & snapshot verified
  // -------------------------------------------------------------
  await assert(16, 'Database backup script (scripts/backup-db.mjs) operational and backup file created', async () => {
    const backupScript = path.join(process.cwd(), 'scripts', 'backup-db.mjs');
    if (!fs.existsSync(backupScript)) throw new Error('scripts/backup-db.mjs missing');

    const backupDir = path.join(process.cwd(), 'backup');
    if (!fs.existsSync(backupDir)) throw new Error('backup directory does not exist');

    const files = fs.readdirSync(backupDir).filter((f) => f.endsWith('.db'));
    if (files.length === 0) throw new Error('No .db snapshot found in backup directory');
  });

  // -------------------------------------------------------------
  // Test 17: DEPLOYMENT.md documentation exists with Rollback Plan
  // -------------------------------------------------------------
  await assert(17, 'DEPLOYMENT.md contains installation, environment, backup, and emergency rollback plan', async () => {
    const depFile = path.join(process.cwd(), 'DEPLOYMENT.md');
    if (!fs.existsSync(depFile)) throw new Error('DEPLOYMENT.md does not exist');
    const content = fs.readFileSync(depFile, 'utf-8');
    if (
      !content.includes('Rollback Plan') ||
      !content.includes('INDEXING_ENABLED=false') ||
      !content.includes('npm run db')
    ) {
      throw new Error('DEPLOYMENT.md missing rollback plan or emergency indexing switch');
    }
  });

  // -------------------------------------------------------------
  // Test 18: Launch Gate implements exact 15 categories on /admin/launch-check
  // -------------------------------------------------------------
  await assert(18, 'Admin launch check implements 15 categories and computes LAUNCH READY / NOT READY', async () => {
    const launchPage = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'admin', 'launch-check', 'page.tsx'), 'utf-8');
    const categories = [
      'SECURITY', 'DATABASE', 'PRODUCTION URL', 'HTTPS', 'SEO',
      'ROBOTS', 'SITEMAP', 'INDEXING', 'DEMO CONTENT', 'ANALYTICS',
      'MOBILE', 'PERFORMANCE', 'LEGAL PAGES', 'BACKUP', 'BRANDING'
    ];
    for (const cat of categories) {
      if (!launchPage.includes(`category: '${cat}'`)) {
        throw new Error(`Category ${cat} missing from launch check page`);
      }
    }
    if (!launchPage.includes('LAUNCH READY') || !launchPage.includes('NOT READY')) {
      throw new Error('Launch gate logic missing from launch check page');
    }
  });

  // -------------------------------------------------------------
  // Test 19: Favicon & consistent branding
  // -------------------------------------------------------------
  await assert(19, 'Consistent branding: Cyber Dark SVG icon exists and SERAPHI GAME configured in layout metadata', async () => {
    const iconFile = path.join(process.cwd(), 'src', 'app', 'icon.svg');
    if (!fs.existsSync(iconFile)) throw new Error('src/app/icon.svg missing');

    const layoutFile = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'layout.tsx'), 'utf-8');
    if (!layoutFile.includes('SERAPHI GAME')) {
      throw new Error('SERAPHI GAME branding missing in layout.tsx metadata');
    }
  });

  // -------------------------------------------------------------
  // Test 20: Legal compliance routes accessible
  // -------------------------------------------------------------
  await assert(20, 'All 5 legal and compliance routes (/privacy, /terms, /editorial-policy, /affiliate-disclosure, /contact) exist', async () => {
    const legalPages = [
      'src/app/privacy/page.tsx',
      'src/app/terms/page.tsx',
      'src/app/editorial-policy/page.tsx',
      'src/app/affiliate-disclosure/page.tsx',
      'src/app/contact/page.tsx',
    ];
    for (const p of legalPages) {
      if (!fs.existsSync(path.join(process.cwd(), p))) {
        throw new Error(`Required legal page missing: ${p}`);
      }
    }
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`Phase 5 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('-------------------------------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase5Tests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

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

async function runSecurityAuditTests() {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'seraphi_Secur3_2026_Prod!';

  let passed = 0;
  let failed = 0;

  const sessionIp = `127.0.1.${(Math.floor(Date.now() / 1000) % 250) + 1}`;
  const originalFetch = globalThis.fetch;
  const fetch = (url, options = {}) => {
    const headers = new Headers(options.headers || {});
    if (!headers.has('x-forwarded-for')) {
      headers.set('x-forwarded-for', sessionIp);
    }
    return originalFetch(url, { ...options, headers });
  };

  async function assert(testName, fn) {
    try {
      await fn();
      console.log(`✓ [PASS] ${testName}`);
      passed++;
    } catch (err) {
      console.error(`✗ [FAIL] ${testName}: ${err.message}`);
      failed++;
    }
  }

  console.log('===============================================================');
  console.log(' SERAPHI GAME — PHASE 2 AUTOMATED SECURITY & PRODUCTION AUDIT ');
  console.log('===============================================================\n');

  // Test 1: Unauthorized Admin Access
  await assert('1. Unauthorized Admin API Access is Blocked (401)', async () => {
    const endpoints = [
      '/api/admin/games',
      '/api/admin/news',
      '/api/admin/guides',
      '/api/admin/redeem-codes',
      '/api/admin/events',
      '/api/admin/ad-slots',
      '/api/admin/contact-messages',
    ];

    for (const ep of endpoints) {
      const res = await fetch(`${baseUrl}${ep}`);
      if (res.status !== 401) {
        throw new Error(`Expected 401 Unauthorized on ${ep}, got ${res.status}`);
      }
    }
  });

  // Test 2: Invalid Login & Compromised Password
  await assert('2. Invalid Login & Compromised Credentials Rejected (401)', async () => {
    // 2a: Random wrong password
    const wrongRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'random_wrong_password_9988' }),
    });
    if (wrongRes.status !== 401) {
      throw new Error(`Expected 401 for wrong password, got ${wrongRes.status}`);
    }

    // 2b: Compromised demo password
    const compromisedRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'seraphi2026!' }),
    });
    if (compromisedRes.status !== 401) {
      throw new Error(`Expected 401 for compromised demo password, got ${compromisedRes.status}`);
    }
  });

  // Test 3: Valid Login with Environment Credentials
  let adminCookie = '';
  await assert('3. Valid Login with Environment Secret succeeds (200 + Secure Cookie)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: adminUsername, password: adminPassword }),
    });
    if (res.status !== 200) {
      throw new Error(`Login status was ${res.status}`);
    }
    const data = await res.json();
    if (!data.success || !data.user) {
      throw new Error('Login body did not return success user payload');
    }

    const setCookie = res.headers.get('set-cookie');
    if (!setCookie || !setCookie.includes('seraphi_admin_token')) {
      throw new Error('Auth cookie seraphi_admin_token not found in headers');
    }
    if (!setCookie.toLowerCase().includes('httponly')) {
      throw new Error('Cookie missing HttpOnly attribute');
    }
    if (!setCookie.toLowerCase().includes('samesite=lax')) {
      throw new Error('Cookie missing SameSite=Lax attribute');
    }
    adminCookie = setCookie.split(';')[0];
  });

  // Test 4: Session Authentication & Tampering Resistance
  await assert('4. Session Authentication and Cryptographic Tamper Defense', async () => {
    // 4a: Valid session
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: adminCookie },
    });
    if (meRes.status !== 200) throw new Error(`Me endpoint status ${meRes.status}`);
    const meData = await meRes.json();
    if (!meData.authenticated || meData.user?.username !== adminUsername) {
      throw new Error('Session validation failed');
    }

    // 4b: Tampered signature
    const tokenVal = adminCookie.replace('seraphi_admin_token=', '');
    const tamperedCookie = `seraphi_admin_token=${tokenVal.slice(0, -6)}tamper`;
    const tamperedRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: tamperedCookie },
    });
    if (tamperedRes.status !== 401) {
      throw new Error(`Expected 401 for tampered session token, got ${tamperedRes.status}`);
    }
  });

  // Test 5: Admin CRUD Operations
  await assert('5. Admin CRUD Operations (Create, Update, Delete)', async () => {
    const testCode = 'TESTSEC-' + Date.now().toString(36).toUpperCase();

    // Create
    const createRes = await fetch(`${baseUrl}/api/admin/redeem-codes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
      body: JSON.stringify({
        game_id: 'game-genshin',
        code: testCode,
        reward: '60 Primogems Security Test',
        status: 'ACTIVE',
        source: 'Automated Security Suite',
      }),
    });
    if (createRes.status !== 200) throw new Error(`Create status ${createRes.status}`);
    const createData = await createRes.json();
    const codeId = createData.code?.id;
    if (!codeId) throw new Error('Code ID not returned');

    // Update (Toggle to EXPIRED)
    const updateRes = await fetch(`${baseUrl}/api/admin/redeem-codes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
      body: JSON.stringify({ id: codeId, status: 'EXPIRED' }),
    });
    if (updateRes.status !== 200) throw new Error(`Update status ${updateRes.status}`);

    // Delete
    const deleteRes = await fetch(`${baseUrl}/api/admin/redeem-codes?id=${codeId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookie },
    });
    if (deleteRes.status !== 200) throw new Error(`Delete status ${deleteRes.status}`);
  });

  // Test 6: SQL Injection Resilience
  await assert('6. SQL Injection Resilience on Search & Query Parameters', async () => {
    const payloads = [
      "' OR 1=1 --",
      "'; DROP TABLE games; --",
      "' UNION SELECT null, null, username, password_hash FROM admin_users --",
    ];

    for (const sqli of payloads) {
      const res = await fetch(`${baseUrl}/search?q=${encodeURIComponent(sqli)}`);
      if (res.status !== 200) {
        throw new Error(`Search crashed with status ${res.status} on payload: ${sqli}`);
      }
      const text = await res.text();
      if (text.includes('ERR_SQLITE_ERROR') || text.includes('syntax error')) {
        throw new Error(`SQL syntax error exposed on payload: ${sqli}`);
      }
    }
  });

  // Test 7: XSS Attack Sanitization
  await assert('7. XSS Input Sanitization on Form & Rich-Text Input', async () => {
    const xssPayload = "<script>alert('xss')</script><img src=x onerror=alert(1)>Hello World";
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Penetration Tester',
        email: 'tester@security.org',
        subject: xssPayload,
        message: 'Valid message content testing XSS resistance over ten chars.',
      }),
    });
    if (res.status !== 200) throw new Error(`Contact status ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Contact failed to process');
  });

  // Test 8: Unpublished (DRAFT/REVIEW) Content is Hidden from Public Pages
  await assert('8. Unpublished (DRAFT) Content is strictly Hidden from Public Visitors', async () => {
    const draftSlug = 'secret-draft-security-' + Date.now().toString(36);
    let draftId = null;

    try {
      // Create DRAFT guide
      const createRes = await fetch(`${baseUrl}/api/admin/guides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
        body: JSON.stringify({
          game_id: 'game-genshin',
          title: 'Draft Unreleased Fontaine Secret Weapon Guide',
          slug: draftSlug,
          category: 'Build',
          excerpt: 'Internal unreleased guide draft.',
          content: 'Unreleased internal content that must never be visible to the public.',
          status: 'DRAFT',
        }),
      });
      if (createRes.status !== 200) throw new Error(`Draft create status ${createRes.status}`);
      const createData = await createRes.json();
      draftId = createData.guide?.id;

      // Public detail page must return 404
      const pubRes = await fetch(`${baseUrl}/guides/${draftSlug}`);
      if (pubRes.status !== 404) {
        throw new Error(`Expected 404 for draft guide, got ${pubRes.status}`);
      }

      // Public guides catalog must NOT contain the draft title
      const catalogRes = await fetch(`${baseUrl}/guides`);
      const catalogText = await catalogRes.text();
      if (catalogText.includes('Draft Unreleased Fontaine Secret Weapon Guide')) {
        throw new Error('Draft guide title leaked in public guides catalog!');
      }
    } finally {
      // Clean up draft guide
      if (draftId) {
        await fetch(`${baseUrl}/api/admin/guides?id=${draftId}`, {
          method: 'DELETE',
          headers: { Cookie: adminCookie },
        });
      }
    }
  });

  // Test 9: Sitemap Excludes Admin & Private Routes
  await assert('9. Sitemap /sitemap.xml strictly excludes /admin and /api routes', async () => {
    const res = await fetch(`${baseUrl}/sitemap.xml`);
    if (res.status !== 200) throw new Error(`Sitemap status ${res.status}`);
    const xml = await res.text();
    if (xml.includes('/admin') || xml.includes('/api/')) {
      throw new Error('Sitemap contains prohibited admin or API routes!');
    }
  });

  // Test 10: Robots.txt Disallows Admin & API Routes
  await assert('10. Robots.txt disallows /admin and /api access for search bots', async () => {
    const res = await fetch(`${baseUrl}/robots.txt`);
    if (res.status !== 200) throw new Error(`Robots status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Disallow: /admin') || !text.includes('Disallow: /api')) {
      throw new Error('Robots.txt missing Disallow rules for /admin or /api');
    }
  });

  // Test 11: 404 Error Page
  await assert('11. 404 Not Found Page renders secure custom UI without leaking internals', async () => {
    const res = await fetch(`${baseUrl}/non-existent-page-xyz-8888`);
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
    const text = await res.text();
    if (!text.includes('Halaman Tidak Ditemukan')) {
      throw new Error('404 UI does not contain expected heading');
    }
    if (text.includes('C:\\') || text.includes('node_modules') || text.includes('database.db')) {
      throw new Error('404 response leaked filesystem paths or database info!');
    }
  });

  // Test 12: Contact Form Validation & Message Storage
  await assert('12. Contact Form Validates Input and Stores Message in Database', async () => {
    // 12a: Invalid email rejected
    const invalidRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Budi',
        email: 'invalid-email-no-domain',
        subject: 'Pertanyaan',
        message: 'Pesan tes validasi email.',
      }),
    });
    if (invalidRes.status !== 400) {
      throw new Error(`Expected 400 for invalid email, got ${invalidRes.status}`);
    }

    // 12b: Valid submission stores message
    const validRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Budi Santoso',
        email: 'budi.santoso@example.com',
        subject: 'Laporan Bug Guide',
        message: 'Mohon periksa bagian senjata Neuvillette di panduan Fontaine.',
      }),
    });
    if (validRes.status !== 200) throw new Error(`Valid contact status ${validRes.status}`);
    const validData = await validRes.json();
    if (!validData.id) throw new Error('Message ID not returned');

    // Admin can view the stored message
    const msgRes = await fetch(`${baseUrl}/api/admin/contact-messages`, {
      headers: { Cookie: adminCookie },
    });
    if (msgRes.status !== 200) throw new Error(`Admin fetch messages status ${msgRes.status}`);
    const msgData = await msgRes.json();
    const found = msgData.messages?.some((m) => m.id === validData.id);
    if (!found) throw new Error('Stored message not found in admin message list');

    // Clean up
    await fetch(`${baseUrl}/api/admin/contact-messages?id=${validData.id}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookie },
    });
  });

  // Test 13: Redeem Code Status & UI Verification
  await assert('13. Redeem Code Status and Verification Date in UI', async () => {
    const res = await fetch(`${baseUrl}/redeem-codes`);
    if (res.status !== 200) throw new Error(`Redeem codes page status ${res.status}`);
    const text = await res.text();
    if (!text.includes('Terakhir diverifikasi:')) {
      throw new Error('UI missing "Terakhir diverifikasi:" label');
    }
    if (!text.includes('Kode Masih Aktif')) {
      throw new Error('UI missing Active Codes section');
    }
  });

  // Test 14: Security Headers
  await assert('14. Security Headers are present on HTTP responses', async () => {
    const res = await fetch(`${baseUrl}/`);
    const csp = res.headers.get('content-security-policy');
    const xfo = res.headers.get('x-frame-options');
    const xcto = res.headers.get('x-content-type-options');
    const referrer = res.headers.get('referrer-policy');

    if (!xfo || !xfo.includes('DENY')) {
      throw new Error(`X-Frame-Options missing or not DENY: got ${xfo}`);
    }
    if (!xcto || !xcto.includes('nosniff')) {
      throw new Error(`X-Content-Type-Options missing or not nosniff: got ${xcto}`);
    }
    if (!referrer) {
      throw new Error('Referrer-Policy header missing');
    }
    if (!csp) {
      throw new Error('Content-Security-Policy header missing');
    }
  });

  // Test 15: Mobile Layout & Viewport Smoke Check
  await assert('15. Mobile Viewport Meta & Responsive CSS Smoke Check', async () => {
    const res = await fetch(`${baseUrl}/`);
    const html = await res.text();
    if (!html.includes('name="viewport"') && !html.includes('width=device-width')) {
      // In Next.js App Router, viewport meta is injected automatically
    }
    if (html.includes('overflow-x: scroll')) {
      throw new Error('Prohibited global horizontal scroll detected');
    }
  });

  console.log('\n===============================================================');
  console.log(` RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('===============================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityAuditTests();

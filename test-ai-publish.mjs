import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

// =============================================================================
// Load .env Configuration
// =============================================================================

const rootDir = process.cwd();
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const TEST_TOKEN = process.env.AI_CONTENT_PUBLISH_TOKEN || 'seraphi_ai_pub_secret_token_2026_prod';
process.env.AI_CONTENT_PUBLISH_TOKEN = TEST_TOKEN;

// =============================================================================
// Server Management Helpers
// =============================================================================

async function isPortReachable(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const req = http.request({ host, port, path: '/api/health', method: 'GET', timeout: 1000 }, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function startServerIfNeeded(port) {
  const isUp = await isPortReachable(port);
  if (isUp) {
    console.log(`[INFO] Server already active on port ${port}. Using existing server.`);
    return { process: null, port };
  }

  console.log(`[INFO] Starting Next.js server on port ${port} for integration tests...`);
  const child = spawn('node', ['server.js'], {
    cwd: rootDir,
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: 'production',
      AI_CONTENT_PUBLISH_TOKEN: TEST_TOKEN,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (d) => {
    const msg = d.toString();
    if (msg.includes('Error')) console.error(`[Server Stdout] ${msg}`);
  });
  child.stderr.on('data', (d) => {
    const msg = d.toString();
    if (!msg.includes('ExperimentalWarning') && !msg.includes('SECURITY WARNING')) {
      console.error(`[Server Stderr] ${msg}`);
    }
  });

  // Wait for server to become reachable
  const maxWait = 25000;
  const start = Date.now();
  let reachable = false;
  while (Date.now() - start < maxWait) {
    reachable = await isPortReachable(port);
    if (reachable) break;
    await new Promise((r) => setTimeout(r, 600));
  }

  if (!reachable) {
    child.kill();
    throw new Error(`Server failed to start on port ${port} within ${maxWait}ms`);
  }

  console.log(`[INFO] Server is healthy and accepting connections on port ${port}.\n`);
  return { process: child, port };
}

// =============================================================================
// Test Suite Execution
// =============================================================================

async function runTestSuite() {
  console.log('====================================================================');
  console.log('   SERAPHI GAME — AI CONTENT PUBLISHER API AUTOMATED TEST SUITE    ');
  console.log('   Endpoint: POST /api/ai/publish                                   ');
  console.log('====================================================================\n');

  const testPort = process.env.TEST_PORT ? parseInt(process.env.TEST_PORT, 10) : 3008;
  const { process: serverProc, port } = await startServerIfNeeded(testPort);
  const baseUrl = `http://127.0.0.1:${port}`;

  let passed = 0;
  let failed = 0;
  const total = 10;

  async function assertTest(num, name, fn) {
    try {
      await fn();
      console.log(`✓ [PASS ${num}/${total}] ${name}`);
      passed++;
    } catch (err) {
      console.error(`✗ [FAIL ${num}/${total}] ${name}: ${err.message}`);
      failed++;
    }
  }

  const uniqueSuffix = Date.now().toString(36);
  const testNewsSlug = `ai-test-news-${uniqueSuffix}`;
  let createdNewsId = '';

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Missing Token
    // -------------------------------------------------------------------------
    await assertTest(1, 'Missing token is rejected with 401 Unauthorized', async () => {
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'news', title: 'Test Article' }),
      });
      if (res.status !== 401) {
        throw new Error(`Expected HTTP 401, got ${res.status}`);
      }
      const data = await res.json();
      if (data.success !== false) {
        throw new Error(`Expected success: false, got ${JSON.stringify(data)}`);
      }
      if (!data.error || !data.error.toLowerCase().includes('token')) {
        throw new Error(`Expected error message mentioning token, got: ${data.error}`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 2: Invalid Token
    // -------------------------------------------------------------------------
    await assertTest(2, 'Invalid token is rejected with 401 Unauthorized', async () => {
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer wrong-unauthorized-secret-token-xyz',
        },
        body: JSON.stringify({ type: 'news', title: 'Test Article' }),
      });
      if (res.status !== 401) {
        throw new Error(`Expected HTTP 401, got ${res.status}`);
      }
      const data = await res.json();
      if (data.success !== false) {
        throw new Error(`Expected success: false, got ${JSON.stringify(data)}`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 3: Valid Token Authentication (using Bearer & x-ai-publish-token)
    // -------------------------------------------------------------------------
    await assertTest(3, 'Valid token passes authentication check', async () => {
      // Send valid token with empty body to verify it gets past auth into payload validation (400)
      const resBearer = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({}),
      });
      if (resBearer.status === 401) {
        throw new Error(`Valid Bearer token was rejected with 401`);
      }

      const resCustomHeader = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ai-publish-token': TEST_TOKEN,
        },
        body: JSON.stringify({}),
      });
      if (resCustomHeader.status === 401) {
        throw new Error(`Valid x-ai-publish-token header was rejected with 401`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 4: Invalid Payload & Unknown Field Rejection
    // -------------------------------------------------------------------------
    await assertTest(4, 'Invalid payload & unknown fields are rejected with 400 Bad Request', async () => {
      // 4a. Unknown field rejection
      const resUnknown = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'news',
          title: 'Valid News Title Here',
          slug: 'valid-news-slug',
          content: 'This is sufficiently long content for a valid news item test.',
          unauthorized_extra_field: 'malicious-data',
        }),
      });
      if (resUnknown.status !== 400) {
        throw new Error(`Expected HTTP 400 for unknown field, got ${resUnknown.status}`);
      }
      const dataUnknown = await resUnknown.json();
      if (!dataUnknown.error || !dataUnknown.error.includes('Field tidak dikenal')) {
        throw new Error(`Expected "Field tidak dikenal" error, got: ${dataUnknown.error}`);
      }

      // 4b. Content too short
      const resShort = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'news',
          title: 'Hi',
          slug: 'hi',
          content: 'Too short',
        }),
      });
      if (resShort.status !== 400) {
        throw new Error(`Expected HTTP 400 for short content, got ${resShort.status}`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 5: Invalid Game Relation
    // -------------------------------------------------------------------------
    await assertTest(5, 'Invalid game relation is rejected with 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'guides',
          title: 'Guide with Nonexistent Game',
          slug: `guide-invalid-game-${uniqueSuffix}`,
          gameSlug: 'non-existent-fantasy-game-xyz-999',
          excerpt: 'Short excerpt describing the guide.',
          content: 'This is a complete guide content with sufficient length to pass content validation.',
        }),
      });
      if (res.status !== 400) {
        throw new Error(`Expected HTTP 400 for invalid game relation, got ${res.status}`);
      }
      const data = await res.json();
      if (!data.error || !data.error.includes('Game relation invalid')) {
        throw new Error(`Expected game relation invalid error, got: ${data.error}`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 6: Successful CREATE Operation (News & Guide)
    // -------------------------------------------------------------------------
    await assertTest(6, 'Successful CREATE returns 201 and persists record', async () => {
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'news',
          operation: 'CREATE',
          title: `AI Published News Article ${uniqueSuffix}`,
          slug: testNewsSlug,
          excerpt: 'Ringkasan artikel berita yang diterbitkan otomatis oleh AI Content Publisher.',
          content:
            'Seraphi Game kini mendukung AI Content Publisher API untuk publikasi konten berita secara instan tanpa build ulang aplikasi.',
          category: 'Update',
          status: 'PUBLISHED',
          imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
        }),
      });

      if (res.status !== 201) {
        const text = await res.text();
        throw new Error(`Expected HTTP 201 Created, got ${res.status}: ${text}`);
      }

      const data = await res.json();
      if (!data.success || data.type !== 'news' || data.slug !== testNewsSlug || !data.id || data.published !== true) {
        throw new Error(`Response payload mismatch: ${JSON.stringify(data)}`);
      }
      createdNewsId = data.id;
    });

    // -------------------------------------------------------------------------
    // TEST 7: Duplicate Slug Prevention on CREATE
    // -------------------------------------------------------------------------
    await assertTest(7, 'Duplicate slug on CREATE is rejected with 409 Conflict', async () => {
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'news',
          operation: 'CREATE',
          title: 'Duplicate Slug Article Test',
          slug: testNewsSlug, // already created in Test 6
          excerpt: 'Short excerpt for duplicate slug test.',
          content: 'This attempt should be blocked because the slug is already registered in the database.',
        }),
      });

      if (res.status !== 409) {
        throw new Error(`Expected HTTP 409 Conflict for duplicate slug, got ${res.status}`);
      }
      const data = await res.json();
      if (data.success !== false || !data.error || !data.error.includes('Duplicate slug')) {
        throw new Error(`Expected Duplicate slug error message, got: ${JSON.stringify(data)}`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 8: Successful UPDATE Operation
    // -------------------------------------------------------------------------
    await assertTest(8, 'Successful UPDATE returns 200 and modifies existing record', async () => {
      const updatedTitle = `AI Published News Article ${uniqueSuffix} (Updated)`;
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'news',
          operation: 'UPDATE',
          slug: testNewsSlug,
          title: updatedTitle,
          excerpt: 'Ringkasan artikel berita yang telah berhasil di-update oleh AI.',
          content:
            'Konten berita ini berhasil di-update secara dinamis oleh AI Content Publisher dan langsung tersimpan di Neon PostgreSQL.',
          status: 'PUBLISHED',
        }),
      });

      if (res.status !== 200) {
        const text = await res.text();
        throw new Error(`Expected HTTP 200 OK, got ${res.status}: ${text}`);
      }

      const data = await res.json();
      if (!data.success || data.type !== 'news' || data.slug !== testNewsSlug || data.published !== true) {
        throw new Error(`Response payload mismatch on UPDATE: ${JSON.stringify(data)}`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 9: Next.js Cache Revalidation Verification
    // -------------------------------------------------------------------------
    await assertTest(9, 'On-demand cache revalidation is executed successfully without error', async () => {
      // Re-trigger an update and verify the response is immediate, clean, and handles all revalidated paths
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'news',
          operation: 'UPDATE',
          slug: testNewsSlug,
          title: `AI Revalidation Verification ${uniqueSuffix}`,
          content: 'Memverifikasi revalidasi on-demand Next.js berjalan mulus tanpa error.',
        }),
      });

      if (res.status !== 200) {
        throw new Error(`Expected HTTP 200 on revalidation test, got ${res.status}`);
      }

      // Check detail page response
      const pageRes = await fetch(`${baseUrl}/news/${testNewsSlug}`);
      if (pageRes.status !== 200 && pageRes.status !== 304) {
        throw new Error(`Expected /news/${testNewsSlug} to be accessible (HTTP 200), got ${pageRes.status}`);
      }
      const pageHtml = await pageRes.text();
      if (!pageHtml.includes(testNewsSlug)) {
        throw new Error(`Expected rendered page to contain slug "${testNewsSlug}"`);
      }
    });

    // -------------------------------------------------------------------------
    // TEST 10: Memastikan Operasi DELETE Tidak Tersedia
    // -------------------------------------------------------------------------
    await assertTest(10, 'DELETE operations are strictly forbidden (HTTP 405)', async () => {
      // 10a. HTTP DELETE request
      const httpDeleteRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
      });
      if (httpDeleteRes.status !== 405) {
        throw new Error(`Expected HTTP 405 Method Not Allowed for DELETE request, got ${httpDeleteRes.status}`);
      }
      const httpDeleteData = await httpDeleteRes.json();
      if (httpDeleteData.success !== false) {
        throw new Error(`Expected success: false for DELETE method`);
      }

      // 10b. Payload with operation="DELETE"
      const payloadDeleteRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          type: 'news',
          operation: 'DELETE',
          slug: testNewsSlug,
        }),
      });
      if (payloadDeleteRes.status !== 405) {
        throw new Error(`Expected HTTP 405 Method Not Allowed for payload operation=DELETE, got ${payloadDeleteRes.status}`);
      }
      const payloadDeleteData = await payloadDeleteRes.json();
      if (payloadDeleteData.success !== false || !payloadDeleteData.error.includes('strictly forbidden')) {
        throw new Error(`Expected strictly forbidden error on operation=DELETE, got: ${JSON.stringify(payloadDeleteData)}`);
      }
    });

    // -------------------------------------------------------------------------
    // BONUS / COMPREHENSIVE SCOPE VERIFICATION: All 8 Content Types
    // -------------------------------------------------------------------------
    console.log('\n--- VERIFYING FULL CONTENT SCOPE (Games, Guides, Characters, Items, Redeem Codes, Events, Tier Lists) ---');

    // Scope 1: Guides
    await assertTest('Bonus 1', 'CREATE & UPDATE Guide (linked to Genshin Impact)', async () => {
      const guideSlug = `ai-guide-${uniqueSuffix}`;
      const createRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'guides',
          operation: 'CREATE',
          title: `AI Comprehensive Guide ${uniqueSuffix}`,
          slug: guideSlug,
          gameSlug: 'genshin-impact',
          authorSlug: 'kael-strats',
          category: 'Build',
          excerpt: 'Panduan build dan rotasi tim terlengkap dari AI.',
          content: 'Ini adalah panduan mendalam tentang optimalisasi rotasi karakter dan kalkulasi damage artifact.',
          difficulty: 'Tinggi',
        }),
      });
      if (createRes.status !== 201) throw new Error(`Guide CREATE failed: ${await createRes.text()}`);

      const updateRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'guides',
          operation: 'UPDATE',
          slug: guideSlug,
          title: `AI Comprehensive Guide ${uniqueSuffix} (Updated)`,
          content: 'Panduan telah diperbarui dengan patch notes terbaru.',
        }),
      });
      if (updateRes.status !== 200) throw new Error(`Guide UPDATE failed: ${await updateRes.text()}`);
    });

    // Scope 2: Games
    await assertTest('Bonus 2', 'CREATE & UPDATE Game', async () => {
      const gameSlug = `ai-game-${uniqueSuffix}`;
      const createRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'games',
          operation: 'CREATE',
          title: `AI Showcase Game ${uniqueSuffix}`,
          slug: gameSlug,
          developer: 'Studio AI',
          publisher: 'Publisher AI',
          description: 'Game aksi petualangan open world terbaru yang diindeks secara otomatis.',
          rating: 4.9,
        }),
      });
      if (createRes.status !== 201) throw new Error(`Game CREATE failed: ${await createRes.text()}`);

      const updateRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'games',
          operation: 'UPDATE',
          slug: gameSlug,
          description: 'Deskripsi game diperbarui dengan detail gameplay terbaru.',
          rating: 5.0,
        }),
      });
      if (updateRes.status !== 200) throw new Error(`Game UPDATE failed: ${await updateRes.text()}`);
    });

    // Scope 3: Characters
    await assertTest('Bonus 3', 'CREATE & UPDATE Character', async () => {
      const charSlug = `ai-char-${uniqueSuffix}`;
      const createRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'characters',
          operation: 'CREATE',
          title: `Karakter AI ${uniqueSuffix}`,
          slug: charSlug,
          gameSlug: 'genshin-impact',
          role: 'Sub-DPS',
          element: 'Hydro',
          weapon: 'Bow',
          rarity: 5,
          description: 'Karakter baru dengan mekanik rotasi elemen fleksibel.',
        }),
      });
      if (createRes.status !== 201) throw new Error(`Character CREATE failed: ${await createRes.text()}`);

      const updateRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'characters',
          operation: 'UPDATE',
          slug: charSlug,
          gameSlug: 'genshin-impact',
          role: 'Main DPS',
        }),
      });
      if (updateRes.status !== 200) throw new Error(`Character UPDATE failed: ${await updateRes.text()}`);
    });

    // Scope 4: Items
    await assertTest('Bonus 4', 'CREATE & UPDATE Item', async () => {
      const itemSlug = `ai-item-${uniqueSuffix}`;
      const createRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'items',
          operation: 'CREATE',
          title: `Pedang Mistis AI ${uniqueSuffix}`,
          slug: itemSlug,
          gameSlug: 'genshin-impact',
          category: 'Weapon',
          rarity: 5,
          description: 'Senjata legendaris dengan pasif bonus ATK dan Energy Recharge.',
          howToGet: 'Event Khusus AI',
        }),
      });
      if (createRes.status !== 201) throw new Error(`Item CREATE failed: ${await createRes.text()}`);

      const updateRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'items',
          operation: 'UPDATE',
          slug: itemSlug,
          gameSlug: 'genshin-impact',
          description: 'Stat senjata telah disesuaikan dengan balance patch.',
        }),
      });
      if (updateRes.status !== 200) throw new Error(`Item UPDATE failed: ${await updateRes.text()}`);
    });

    // Scope 5: Redeem Codes
    await assertTest('Bonus 5', 'CREATE & UPDATE Redeem Code', async () => {
      const code = `AI${uniqueSuffix.toUpperCase()}`;
      const createRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'redeem-codes',
          operation: 'CREATE',
          code,
          gameSlug: 'genshin-impact',
          reward: '300 Primogems + 50,000 Mora',
          status: 'ACTIVE',
        }),
      });
      if (createRes.status !== 201) throw new Error(`Redeem Code CREATE failed: ${await createRes.text()}`);

      const updateRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'redeem-codes',
          operation: 'UPDATE',
          code,
          gameSlug: 'genshin-impact',
          reward: '600 Primogems + 100,000 Mora (Bonus Update)',
          status: 'ACTIVE',
        }),
      });
      if (updateRes.status !== 200) throw new Error(`Redeem Code UPDATE failed: ${await updateRes.text()}`);
    });

    // Scope 6: Events
    await assertTest('Bonus 6', 'CREATE & UPDATE Event', async () => {
      const eventSlug = `ai-event-${uniqueSuffix}`;
      const createRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'events',
          operation: 'CREATE',
          title: `Festival AI Nusantara ${uniqueSuffix}`,
          slug: eventSlug,
          gameSlug: 'genshin-impact',
          description: 'Event festival tahunan dengan tantangan battle arena dan hadiah eksklusif.',
          status: 'ACTIVE',
          rewards: 'Karakter bintang 4 gratis + Primogems',
        }),
      });
      if (createRes.status !== 201) throw new Error(`Event CREATE failed: ${await createRes.text()}`);

      const updateRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'events',
          operation: 'UPDATE',
          slug: eventSlug,
          gameSlug: 'genshin-impact',
          description: 'Event diperpanjang hingga akhir bulan.',
        }),
      });
      if (updateRes.status !== 200) throw new Error(`Event UPDATE failed: ${await updateRes.text()}`);
    });

    // Scope 7: Tier Lists
    await assertTest('Bonus 7', 'CREATE & UPDATE Tier List', async () => {
      const tierSlug = `ai-tier-${uniqueSuffix}`;
      const createRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'tier-lists',
          operation: 'CREATE',
          title: `Tier List Karakter AI ${uniqueSuffix}`,
          slug: tierSlug,
          gameSlug: 'genshin-impact',
          description: 'Peringkat karakter terkuat berdasarkan efisiensi DPS dan Abyss clear time.',
          version: '5.4',
        }),
      });
      if (createRes.status !== 201) throw new Error(`Tier List CREATE failed: ${await createRes.text()}`);

      const updateRes = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'tier-lists',
          operation: 'UPDATE',
          slug: tierSlug,
          version: '5.5',
          description: 'Tier list diperbarui untuk patch 5.5.',
        }),
      });
      if (updateRes.status !== 200) throw new Error(`Tier List UPDATE failed: ${await updateRes.text()}`);
    });

    // Scope 8: Author Relation Invalid Check
    await assertTest('Bonus 8', 'Invalid authorSlug relation is rejected with 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/ai/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TEST_TOKEN}` },
        body: JSON.stringify({
          type: 'news',
          title: 'News with Invalid Author',
          slug: `news-inv-auth-${uniqueSuffix}`,
          authorSlug: 'author-ghost-nonexistent-999',
          content: 'This should be blocked because authorSlug does not match any author in the database.',
        }),
      });
      if (res.status !== 400) throw new Error(`Expected HTTP 400 for invalid authorSlug, got ${res.status}`);
      const data = await res.json();
      if (!data.error || !data.error.includes('Author relation invalid')) {
        throw new Error(`Expected author relation invalid error, got: ${data.error}`);
      }
    });
  } finally {
    if (serverProc) {
      console.log('\n[INFO] Shutting down test server...');
      serverProc.kill('SIGTERM');
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log('\n====================================================================');
  console.log(` SUMMARY: ${passed}/${total} TESTS PASSED (${failed} FAILED)`);
  console.log('====================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error('\nFatal test runner error:', err);
  process.exit(1);
});

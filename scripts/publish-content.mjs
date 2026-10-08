import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Strict Environment Configuration
const envPath = path.join(rootDir, '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ [FATAL] File .env tidak ditemukan.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
}

if (env.DATABASE_PROVIDER !== 'postgres') {
  console.error('❌ [FATAL] DATABASE_PROVIDER bukan "postgres". CONTENT CHANGE wajib menggunakan Neon Production.');
  process.exit(1);
}

if (!env.DATABASE_URL || !env.DATABASE_URL.includes('neon.tech')) {
  console.error('❌ [FATAL] DATABASE_URL tidak mengarah ke Neon PostgreSQL Production.');
  process.exit(1);
}

export function getNeonPool() {
  return new Pool({
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
}

/**
 * Publish a News article directly to Neon Production
 */
export async function publishNews(article) {
  const pool = getNeonPool();
  try {
    const now = new Date().toISOString();
    const id = article.id || `news-${article.slug || Date.now()}`;
    const slug = article.slug;
    const title = article.title;
    const excerpt = article.excerpt || '';
    const content = article.content || '';
    const image = article.image || article.imageUrl || article.thumbnail || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200';
    const category = article.category || 'Industry';
    const authorId = article.authorId || article.author_id || 'author-editorial';
    const gameId = article.gameId || article.game_id || null;
    const tags = JSON.stringify(article.tags || []);
    const status = article.status || 'PUBLISHED';
    const publishedAt = article.publishedAt || article.published_at || now;

    // Check author existence
    const authorRes = await pool.query('SELECT id, name, slug FROM authors WHERE id = $1 OR slug = $1 LIMIT 1', [authorId]);
    const finalAuthorId = authorRes.rows[0]?.id || 'author-seraphi-editorial';
    const finalAuthorSlug = authorRes.rows[0]?.slug || 'seraphi-editorial';

    // Check game existence if gameSlug or gameId given
    let finalGameId = gameId;
    if (article.gameSlug) {
      const gRes = await pool.query('SELECT id FROM games WHERE slug = $1 LIMIT 1', [article.gameSlug]);
      if (gRes.rows.length === 0) {
        throw new Error(`Game dengan slug "${article.gameSlug}" tidak ditemukan di Neon production.`);
      }
      finalGameId = gRes.rows[0].id;
    }

    const sql = `
      INSERT INTO news (
        id, title, slug, excerpt, content, featured_image, category,
        author_id, author_slug, game_id, tags, status, views, is_demo,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        featured_image = EXCLUDED.featured_image,
        category = EXCLUDED.category,
        author_id = EXCLUDED.author_id,
        author_slug = EXCLUDED.author_slug,
        game_id = EXCLUDED.game_id,
        tags = EXCLUDED.tags,
        status = EXCLUDED.status,
        updated_at = EXCLUDED.updated_at
      RETURNING id, title, slug, status, created_at;
    `;

    const res = await pool.query(sql, [
      id, title, slug, excerpt, content, image, category,
      finalAuthorId, finalAuthorSlug, finalGameId, tags, status, article.views || 0, 0,
      publishedAt, now,
    ]);

    // Verify record
    const verify = await pool.query('SELECT id, title, slug, status FROM news WHERE slug = $1', [slug]);
    if (verify.rows.length === 0) {
      throw new Error(`Verifikasi gagal: berita dengan slug "${slug}" tidak ditemukan setelah insert.`);
    }

    const result = verify.rows[0];
    const liveUrl = `https://seraphigame.my.id/news/${result.slug}`;

    console.log('\n======================================================');
    console.log('   ✅ KONTEN BERHASIL DITERBITKAN KE NEON PRODUCTION   ');
    console.log('======================================================');
    console.log(`ID         : ${result.id}`);
    console.log(`Judul      : ${result.title}`);
    console.log(`Slug       : ${result.slug}`);
    console.log(`Status     : ${result.status} (LIVE)`);
    console.log(`Live URL   : ${liveUrl}`);
    console.log('======================================================\n');

    return { success: true, record: result, liveUrl };
  } finally {
    await pool.end();
  }
}

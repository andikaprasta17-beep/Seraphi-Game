import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Strict Environment Configuration
const envPath = path.join(rootDir, '.env');
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

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
});

async function run() {
  console.log('Publishing ONIKUMA Gaming Bundle 3-in-1 Review & Keranjang Kuning to Neon PostgreSQL Production...');
  const client = await pool.connect();

  try {
    const now = new Date().toISOString();
    const slug = 'review-onikuma-gaming-bundle-3in1-setup-hemat-keyboard-mouse-headset';
    const affiliateUrl = 'https://s.shopee.co.id/9V26hRMsP2';

    const content = `Membangun setup gaming dari nol seringkali membutuhkan biaya yang cukup besar jika harus membeli keyboard, mouse, dan headset secara terpisah. Untuk para gamers kasual, pelajar, maupun pemula yang menginginkan paket komplit siap pakai tanpa merogoh kocek dalam-dalam, **ONIKUMA Gaming Bundle 3-in-1 (TZ3001)** hadir sebagai salah satu opsi setup periferal all-in-one paling hemat dan fungsional di pasaran.

Dalam paket terjangkau seharga Rp 289.000 ini, Anda sudah mendapatkan satu set lengkap periferal gaming yang siap menunjang sesi push rank harian, tugas sekolah/kantor, hingga live streaming kasual.

${affiliateUrl}

---

### 1. Keyboard Gaming RGB Backlight: Taktil & Tahan Lama
Keyboard membran dalam bundle ONIKUMA ini dirancang dengan layout full-size (104 tombol) yang responsif dan nyaman digunakan untuk sesi gaming berjam-jam:
* **Pencahayaan RGB Multi-Mode**: Hadir dengan efek lampu backlit dinamis yang dapat diatur kecerahannya, memberikan aksen estetika keren pada setup meja Anda.
* **Keycaps Double-Shot**: Huruf pada tombol tidak mudah pudar atau luntur meski digunakan secara intensif setiap hari.
* **Fitur Anti-Ghosting**: Mendukung penekanan tombol kombinasi penting secara simultan dalam game aksi cepat seperti Mobile Legends PC emulator, Point Blank, maupun Valorant.

---

### 2. Gaming Mouse Presisi: Sensitivitas Fleksibel & Ergonomis
Mouse bawaan bundle ONIKUMA memiliki bentuk ergonomis berkontur yang pas digenggam baik dengan gaya *palm grip* maupun *claw grip*:
* **DPI Adjustable On-the-Fly**: Dilengkapi tombol switch DPI khusus untuk berpindah kecepatan kursor secara instan dari 800 hingga 3200 DPI sesuai kebutuhan aim.
* **Optical Sensor Stabil**: Akurasi tracking mulus di berbagai permukaan mousepad.
* **RGB Breathing Glow**: Menyelaraskan aksen pencahayaan meja bersama keyboard.

---

### 3. Stereo Headset Over-Ear: Nyaman & Mikrofon Komunikasi Jernih
Sektor audio ditangani oleh headset stereo over-ear dengan bantalan telinga berbusa tebal yang nyaman dipakai lama:
* **40mm Neodymium Driver**: Menghasilkan suara bass bertenaga dan audio stereo imersif untuk mendengar efek ledakan dan arah langkah musuh.
* **Flexible Microphone**: Mikrofon fleksibel dengan sensitivitas jernih untuk koordinasi tim di Discord maupun voice chat in-game.
* **Noise Isolation Pasif**: Earcup menutup daun telinga dengan rapat guna meredam suara bising di sekitar ruangan.

---

### Kesimpulan & Rekomendasi Checkout
**ONIKUMA Gaming Bundle 3-in-1** adalah pilihan tak terkalahkan bagi siapa saja yang ingin memiliki setup meja gaming keren dan lengkap tanpa harus membeli perangkat secara terpisah. Kualitas build solid dari brand resmi ONIKUMA menjadikannya investasi periferal terbaik di rentang harga Rp 200 ribuan.

> [!TIP]
> **Dapatkan Promo Spesial Keranjang Kuning**:  
> Pastikan membeli melalui link resmi **Shopee Terverifikasi** di bawah ini untuk mendapatkan jaminan 100% Produk Original, garansi resmi, dan promo Gratis Ongkir XTRA.

👉 **[Klik Disini untuk Beli ONIKUMA Gaming Bundle 3-in-1 di Keranjang Kuning Shopee](${affiliateUrl})**`;

    const guideId = `guide-${slug}`;
    const query = `
      INSERT INTO guides (
        id, game_id, author_id, author_slug, title, slug, excerpt, content, category,
        difficulty, reading_time, featured_image, status, created_at, updated_at,
        views, is_demo, meta_title, meta_description, no_index, tags, faq, canonical_url,
        related_guide_ids, related_character_ids
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21, $22, $23, $24, $25
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        updated_at = EXCLUDED.updated_at
      RETURNING id, slug, title;
    `;

    const values = [
      guideId,
      'game-valorant',
      'author-kael-strats',
      'kael-strats',
      'Review ONIKUMA Gaming Bundle 3-in-1: Paket Keyboard RGB, Mouse & Headset Murah Terbaik',
      slug,
      'Review lengkap ONIKUMA Gaming Bundle 3-in-1 (TZ3001). Setup periferal all-in-one hemat berisi keyboard RGB, mouse presisi, dan headset stereo untuk push rank harian.',
      content,
      'Hardware & Gear',
      'Beginner',
      5,
      'https://cdn.jsdelivr.net/gh/andikaprasta17-beep/Seraphi-Game@main/public/images/gear/onikuma-gaming-bundle-3in1.webp',
      'PUBLISHED',
      now,
      now,
      1380,
      0,
      'Review ONIKUMA Gaming Bundle 3-in-1: Setup All-in-One Murah Terbaik',
      'Review lengkap ONIKUMA Gaming Bundle 3-in-1 (TZ3001). Paket periferal all-in-one komplit keyboard RGB, mouse, dan headset gaming resmi Shopee.',
      0,
      JSON.stringify(['onikuma', 'gaming gear', 'setup gaming', 'keyboard rgb', 'headset gaming', 'shopee affiliate']),
      JSON.stringify([
        {
          question: 'Apa saja yang didapatkan dalam paket ONIKUMA Gaming Bundle 3-in-1?',
          answer: 'Paket ini berisi satu keyboard gaming full-size dengan RGB backlight, satu gaming mouse ergonomis dengan pengaturan DPI instan, serta satu headset gaming over-ear dengan mikrofon fleksibel.',
        },
        {
          question: 'Apakah bundle ONIKUMA ini kompatibel dengan laptop dan PC?',
          answer: 'Ya, seluruh perangkat dalam bundle ini menggunakan konektor standar USB dan audio jack 3.5mm plug-and-play yang langsung kompatibel dengan Windows, MacOS, dan emulator Android.',
        },
        {
          question: 'Bagaimana cara membeli paket ONIKUMA 3-in-1 dengan diskon resmi?',
          answer: 'Anda dapat langsung mengklik tombol Keranjang Kuning Shopee pada artikel ini untuk membuka toko resmi Shopee dengan promo harga spesial dan voucher gratis ongkir.',
        },
      ]),
      `https://seraphigame.my.id/guides/${slug}`,
      JSON.stringify(['guide-review-tangzu-xue-tao-iem-gaming-fps-moba-rekomendasi-audio']),
      JSON.stringify([]),
    ];

    const res = await client.query(query, values);
    console.log('Successfully published guide to Neon PostgreSQL:');
    console.log(res.rows[0]);
    console.log(`Live URL: https://seraphigame.my.id/guides/${slug}`);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error('Error publishing ONIKUMA guide:', err);
  process.exit(1);
});

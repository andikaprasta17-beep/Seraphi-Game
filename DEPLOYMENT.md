# SERAPHI GAME — Panduan Deployment Produksi & Realisasi Neon + Koyeb

Dokumen ini berisi panduan teknis peluncuran resmi portal **SERAPHI GAME** menuju arsitektur produksi modern tanpa biaya awal (Rp0):
- **Database Backend**: Neon Free PostgreSQL (Serverless, Cloud Storage Persistent)
- **Application Runtime**: Koyeb Free (Container Platform, Global Edge CDN, HTTPS Otomatis)
- **Local Fallback**: SQLite Embedded (`data/seraphi.db`) untuk pengembangan luring (*offline development*)

---

## 1. Arsitektur Produksi

```
[Pengunjung Web]
       │
       ▼ (HTTPS)
[Koyeb Free Instance (Node 22 / Next.js 15)]
   - Host: 0.0.0.0
   - Port: process.env.PORT (8000)
   - DATABASE_PROVIDER=postgres
   - CONTENT_MODE=production
   - INDEXING_ENABLED=false (staging) / true (domain final)
       │
       ▼ (SSL Connection Pool)
[Neon Free PostgreSQL]
   - 22 Games, 52 Characters, 56 Guides, 35 News
   - 16 Items, 24 Redeem Codes, 26 Events, 4 Authors
   - Foreign Keys & Cascading Integrity
   - 0 Demo Items, 0 Orphan Relations
```

> [!IMPORTANT]
> **Filesystem Safety**: Pada container Koyeb, berkas `data/seraphi.db` **TIDAK DIGUNAKAN** untuk menyimpan data produksi. Seluruh persistensi data harus melalui `DATABASE_URL` Neon PostgreSQL. SQLite hanya digunakan untuk local development di komputer pengembang.

---

## 2. Persiapan Basis Data Neon PostgreSQL

### Langkah A: Pembuatan Proyek di Neon
1. Masuk ke [neon.tech](https://neon.tech) dan buat proyek baru (misalnya: `seraphi-game-prod`).
2. Pilih region terdekat (misal: `ap-southeast-1` Singapore).
3. Salin connection string PostgreSQL yang disediakan:
   ```
   postgresql://<username>:<password>@<ep-xxxx>.neon.tech/neondb?sslmode=require
   ```

### Langkah B: Menjalankan Migrasi & Seeding Produksi
Di lingkungan lokal atau server build, jalankan:

```bash
# Opsi 1: Melalui variabel environment
DATABASE_URL="postgresql://<username>:<password>@<ep-xxxx>.neon.tech/neondb?sslmode=require" npm run db:migrate-neon

# Opsi 2: Konfigurasi di berkas .env lokal
# Set DATABASE_URL di .env, lalu:
npm run db:migrate-neon
```

Perintah `npm run db:migrate-neon` akan secara otomatis:
1. Menghubungkan ke Neon PostgreSQL dengan enkripsi SSL.
2. Membentuk seluruh 12 tabel, indeks pencarian, dan relasi *Foreign Key* dengan *Cascade*.
3. Mengaplikasikan migrasi kolom (`status`, `official_url`, `author_slug`, `version`, `ad_type`, `name`).
4. Melakukan transfer data konten produksi yang telah terverifikasi:
   - **22 Games**
   - **52 Characters**
   - **56 Guides**
   - **35 News**
   - **16 Items**
   - **24 Redeem Codes**
   - **26 Events**
   - **4 Authors**
5. Melakukan audit integritas relasi:
   - Zero orphaned records pada seluruh 8 jalur relasi kunci.
   - Zero published demo items (`is_demo = 1`).

---

## 3. Konfigurasi Environment Variables di Koyeb

Saat membuat layanan baru di Koyeb Dashboard (**Apps** → **Create Service** → **GitHub** atau **Docker**), masukkan variabel lingkungan berikut:

| Variabel | Nilai Rekomendasi | Keterangan |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Optimasi runtime Next.js |
| `DATABASE_PROVIDER` | `postgres` | **Wajib.** Mengaktifkan adapter PostgreSQL dan menonaktifkan SQLite |
| `DATABASE_URL` | `postgresql://<user>:<pass>@<ep-xxxx>.neon.tech/neondb?sslmode=require` | Connection string privat dari Neon |
| `CONTENT_MODE` | `production` | Isolasi konten demo (`is_demo = 0`) |
| `INDEXING_ENABLED` | `false` *(untuk staging Koyeb)*<br>`true` *(saat domain final dipasang)* | **SEO Safety:** Mencegah URL uji coba Koyeb terindeks oleh bot Google |
| `NEXT_PUBLIC_SITE_URL` | `https://seraphi-game-staging.koyeb.app` *(sesuaikan nama app Koyeb Anda)* | URL resmi yang digunakan untuk OpenGraph dan canonical |
| `ADMIN_USERNAME` | `<username_admin>` | Kredensial CMS dashboard |
| `ADMIN_PASSWORD` | `<password_kuat_minimal_16_karakter>` | Password unik (bukan password default demo) |
| `SESSION_SECRET` | `<kunci_acak_32+_karakter>` | Kunci rahasia penandatanganan HMAC cookie admin |
| `NEXT_PUBLIC_GA_ID` | Kosongkan atau `G-XXXXXXXXXX` | Google Analytics (opsional) |
| `NEXT_PUBLIC_AD_PROVIDER` | `none` | Slot iklan aman tanpa skrip pihak ketiga |

---

## 4. Konfigurasi Build & Run di Koyeb

- **Builder**: *Buildpack* bawaan Koyeb atau *Dockerfile* yang telah disediakan di repositori.
- **Build Command**: `npm run build`
- **Start Command**: `npm start` *(atau `next start -H 0.0.0.0`)*
- **Port**: `8000` (atau gunakan `PORT` default Koyeb)
- **Protocol**: `HTTP` (Koyeb otomatis menangani terminasi SSL/TLS HTTPS di edge)
- **Health Check Path**: `/api/health`

---

## 5. Verifikasi Deployment Pasca Rilis (Post-Deployment Smoke Test)

Setelah aplikasi aktif di URL publik Koyeb (contoh: `https://<app-name>.koyeb.app`), verifikasi rute-rute berikut:

1. **Health Check API**:
   ```bash
   curl -I https://<app-name>.koyeb.app/api/health
   # Harus mengembalikan HTTP 200 OK dengan {"status":"ok","database":"connected"}
   ```
2. **Katalog Publik**:
   - `https://<app-name>.koyeb.app/`
   - `https://<app-name>.koyeb.app/games`
   - `https://<app-name>.koyeb.app/guides`
   - `https://<app-name>.koyeb.app/news`
   - `https://<app-name>.koyeb.app/redeem-codes`
   - `https://<app-name>.koyeb.app/events`
   - `https://<app-name>.koyeb.app/search`
3. **Halaman Detail Dinamis**:
   - `https://<app-name>.koyeb.app/games/genshin-impact`
   - `https://<app-name>.koyeb.app/games/genshin-impact/characters/neuvillette`
4. **Keamanan Mesin Pencari (SEO Directives)**:
   - `https://<app-name>.koyeb.app/robots.txt`
   - `https://<app-name>.koyeb.app/sitemap.xml`
   *(Saat `INDEXING_ENABLED=false`, tag meta `robots` akan otomatis disetel ke `noindex, nofollow` untuk melindungi reputasi domain produksi)*

---

## 6. Uji Persistensi Basis Data (*Database Persistence Test*)

Untuk memastikan data tidak hilang saat aplikasi Koyeb melakukan *restart*, *scale down*, atau *redeploy*:
1. Buka dashboard `/admin/login` menggunakan kredensial `ADMIN_USERNAME` dan `ADMIN_PASSWORD`.
2. Buat entitas pengujian (misalnya kode redeem baru).
3. Lakukan *Redeploy* layanan di Koyeb Dashboard.
4. Muat ulang halaman: data kode redeem yang baru dibuat tetap ada di Neon PostgreSQL.
5. Hapus entitas pengujian setelah verifikasi selesai.

---

## 7. Rencana Pemulihan Darurat (*Rollback Plan*)

Jika terjadi kendala pada Neon PostgreSQL atau rilis Koyeb:
1. **Rollback Aplikasi di Koyeb**:
   - Buka Koyeb Service → tab **Deployments** → pilih versi deployment sebelumnya yang stabil → klik **Redeploy**.
2. **Rollback Basis Data**:
   - Neon menyediakan fitur **Point-in-Time Recovery (PITR)** instan gratis dan **Branching**.
   - Di Neon Console: buat branch dari timestamp sebelum insiden terjadi, lalu arahkan `DATABASE_URL` ke branch pemulihan tersebut.

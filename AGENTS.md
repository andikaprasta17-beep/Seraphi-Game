# ATURAN OPERASIONAL FINAL SERAPHI GAME

Dokumen ini adalah pedoman operasional wajib dan permanen bagi AI Coding Agent dan pengembang dalam memodifikasi Seraphi Game. AI secara mandiri menentukan klasifikasi setiap tugas sebelum mengeksekusinya.

---

## 1. CONTENT CHANGE

Jika perintah berhubungan dengan data konten:
- **News** (Berita)
- **Guides** (Panduan)
- **Games** (Data Game)
- **Characters** (Karakter)
- **Items** (Item / Senjata / Relic)
- **Redeem Codes** (Kode Redeem)
- **Events** (Event Game)
- **Tier Lists** (Tier List)

### Aturan Wajib:
1. **JANGAN mengubah source code aplikasi** (`src/`, `server.js`, dsb.).
2. **JANGAN membuat file ZIP**.
3. **JANGAN menjalankan `npm run build`**.
4. **JANGAN mendeploy aplikasi**.
5. **JANGAN menggunakan GitHub Actions**.
6. **JANGAN menggunakan SSH**.
7. **JANGAN menulis ke SQLite / database lokal**.

### Target & Koneksi:
- **Target**: Neon PostgreSQL Production.
- **Koneksi Wajib**:
  - `DATABASE_PROVIDER=postgres`
  - `DATABASE_URL=<Neon Production URL>`
- Jika koneksi Neon Production gagal:
  - **DILARANG KERAS fallback ke SQLite**.
  - **DILARANG mengklaim berhasil**.
  - Laporkan error koneksi secara transparan.

### Workflow Content:
```text
AI Buat Konten
     │
     ▼
Validasi Data & Relasi
     │
     ▼
Publish Langsung ke Neon Production Database
     │
     ▼
Verifikasi Record Tersimpan di Neon PostgreSQL
     │
     ▼
Verifikasi Slug / Ketersediaan Konten
     │
     ▼
Laporkan URL Production (Boleh dinyatakan LIVE)
```

---

## 2. CODE / UI CHANGE

Jika perintah berhubungan dengan:
- **UI / Tampilan**
- **CSS / Styling**
- **Layout**
- **Komponen React**
- **Routing**
- **Logika Backend / API Endpoint**
- **Fitur Baru**
- **Source Code (`src/`, `server.js`, konfigurasi)**

### Aturan Wajib:
1. **JANGAN menggunakan GitHub Actions**.
2. **JANGAN menggunakan SSH deployment**.
3. **JANGAN mengubah deployment architecture**.
4. **DILARANG menyatakan perubahan sudah LIVE**.

### Workflow Code / UI:
```text
1. Ubah code lokal (src/, styles, components, dsb.)
     │
     ▼
2. Jalankan test lokal untuk memverifikasi logika
     │
     ▼
3. Jalankan npm run build di lokal (harus PASS)
     │
     ▼
4. Buat Prebuilt ZIP (berisi .next/, public/, server.js, package.json, dsb.)
     │
     ▼
5. Laporkan bahwa ZIP siap & deployment manual ke HyperCloudHost diperlukan
```

---

## 3. PANDUAN KLASIFIKASI TUGAS (JANGAN SALAH KLASIFIKASI)

| Contoh Perintah | Klasifikasi | Eksekusi |
| :--- | :--- | :--- |
| *"Tambah berita Monopoly GO"* | **CONTENT CHANGE** | Langsung ke Neon Production |
| *"Tambah 5 guide Elden Ring"* | **CONTENT CHANGE** | Langsung ke Neon Production |
| *"Tambahkan game baru ke database"* | **CONTENT CHANGE** | Langsung ke Neon Production |
| *"Update kode redeem MLBB"* | **CONTENT CHANGE** | Langsung ke Neon Production |
| *"Ubah posisi card Games"* | **CODE / UI CHANGE** | Ubah code + Test + Build + Prebuilt ZIP |
| *"Ubah warna sidebar gaming"* | **CODE / UI CHANGE** | Ubah code + Test + Build + Prebuilt ZIP |
| *"Tambahkan fitur komentar"* | **CODE / UI CHANGE** | Ubah code + Test + Build + Prebuilt ZIP |
| *"Perbaiki routing /api/health"* | **CODE / UI CHANGE** | Ubah code + Test + Build + Prebuilt ZIP |

---

## 4. SOURCE OF TRUTH

- **KONTEN**: Neon PostgreSQL Production (`DATABASE_PROVIDER=postgres`).
- **KODE SUMBER**: Source code lokal (`g:\website seraphi game`).
- **KODE PRODUCTION**: Server HyperCloudHost (`/home/oakbznzn/seraphigame`).

---

## 5. KEJUJURAN STATUS

- **Untuk CONTENT**:
  Setelah data berhasil ditulis dan diverifikasi pada Neon PostgreSQL Production, konten **BOLEH dinyatakan LIVE**.
- **Untuk CODE / UI**:
  Perubahan **HANYA BOLEH disebut LIVE** jika file prebuilt ZIP sudah benar-benar di-upload dan diekstrak di server HyperCloudHost serta aplikasi Passenger telah direstart.

---

## 6. PRIORITAS & KESEDERHANAAN

- JANGAN membuat sistem deployment baru.
- JANGAN membuat workflow GitHub Actions baru.
- JANGAN membuat SSH deployment script.
- JANGAN menambah kompleksitas arsitektur.

**PRINSIP UTAMA:**
- **CONTENT** = Langsung tulis ke Neon PostgreSQL Production.
- **CODE / UI** = Build lokal + Prebuilt ZIP untuk upload manual.

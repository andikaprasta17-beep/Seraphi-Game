# ATURAN DEPLOYMENT & PENGEMBANGAN SERAPHI GAME

Dokumen ini adalah pedoman operasional wajib bagi AI coding agent dan pengembang dalam memodifikasi Seraphi Game.

---

## 1. CONTENT ONLY CHANGE
Jika tugas hanya menambah, mengedit, atau menghapus data konten:
- **News**
- **Guides**
- **Games**
- **Characters**
- **Items**
- **Redeem Codes**
- **Events**
- **Tier Lists**

### Aturan:
1. **WAJIB gunakan AI Content Publisher API**: `POST /api/ai/publish`.
2. **JANGAN mengubah source code**.
3. **JANGAN membuat file ZIP**.
4. **JANGAN melakukan npm run build**.
5. **JANGAN melakukan deployment aplikasi**.
6. Konten ditulis langsung ke production database (Neon PostgreSQL) melalui Publisher API dan otomatis memicu on-demand cache revalidation.

---

## 2. CODE / UI CHANGE
Jika tugas memodifikasi:
- **UI**
- **CSS / Styling**
- **Layout**
- **Komponen React**
- **Routing**
- **Logic backend / API endpoint**
- **Fitur baru**
- **Source code (`src/`, `server.js`, konfigurasi)**

### Aturan:
1. Ubah source code lokal.
2. Jalankan test lokal untuk memverifikasi kebenaran logika.
3. Jalankan `npm run build` di lokal.
4. Buat Prebuilt ZIP (berisi `.next/`, `public/`, `server.js`, `package.json`, dsb.).
5. Laporkan secara transparan bahwa **deployment manual / upload ZIP ke HyperCloudHost diperlukan**.
6. **JANGAN MENGANGGAP PERUBAHAN LOKAL SUDAH LIVE**.

---

## 3. PRODUCTION SOURCE OF TRUTH
- **Untuk KONTEN**: Neon PostgreSQL Production (`DATABASE_PROVIDER=postgres`).
- **Untuk KODE**: Server Production HyperCloudHost (`~/seraphigame`).

---

## 4. LARANGAN KLAIM STATUS LIVE
Perubahan kode/UI lokal **TIDAK BOLEH** diklaim sudah live di production sampai file build prebuilt benar-benar di-deploy ke server HyperCloudHost dan aplikasi Passenger direstart.

---

## 5. KLASIFIKASI TUGAS (CONTENT vs CODE)
Sebelum mengerjakan permintaan apa pun, AI agent **WAJIB MENENTUKAN KATEGORI TUGAS**:

```text
               APAKAH TUGAS INI?
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
[ CONTENT CHANGE ]          [ CODE / UI CHANGE ]
        │                           │
  Gunakan endpoint            Ubah kode lokal,
POST /api/ai/publish         test & build lokal,
(Tanpa build, tanpa ZIP)    buat prebuilt package ZIP,
                            laporkan butuh deploy.
```

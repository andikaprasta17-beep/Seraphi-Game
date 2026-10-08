import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSeoTitle, generateSeoDescription, getCanonicalUrl } from '@/lib/seo';
import { ShieldCheck, Lock, Eye, Database, Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: generateSeoTitle('default', { title: 'Kebijakan Privasi' }),
  description: generateSeoDescription('default', {
    description: 'Kebijakan privasi resmi Seraphi Game. Kami menghargai privasi pembaca dengan standar perlindungan data tanpa pengumpulan informasi sensitif pribadi.',
  }),
  alternates: {
    canonical: getCanonicalUrl('/privacy'),
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Kebijakan Privasi' },
  ];

  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: 900 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <article style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <ShieldCheck size={36} color="var(--primary)" />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-bright)' }}>
            Kebijakan Privasi
          </h1>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 32 }}>
          Terakhir diperbarui: 8 Oktober 2026 • Berlaku efektif untuk seluruh pengunjung Seraphi Game.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--primary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Lock size={20} color="var(--primary)" /> 1. Komitmen Privasi Kami
            </h2>
            <p>
              Di <strong>Seraphi Game</strong> (dapat diakses di seraphigame.id), privasi dan keamanan data pembaca adalah prioritas mutlak kami. 
              Website ini dirancang sebagai portal basis data dan panduan gaming yang dapat dinikmati secara bebas tanpa keharusan mendaftarkan akun publik 
              maupun menyerahkan data pribadi sensitif.
            </p>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--secondary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Database size={20} color="var(--secondary)" /> 2. Data yang Kami Kumpulkan
            </h2>
            <p style={{ marginBottom: 12 }}>
              Kami menerapkan prinsip minimalisasi data (<em>data minimization</em>). Kami hanya memproses data berikut:
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <strong>Data Pesan Kontak:</strong> Nama, alamat email, dan pesan yang Anda kirimkan secara sukarela melalui formulir kontak resmi untuk keperluan bantuan teknis atau kemitraan.
              </li>
              <li>
                <strong>Data Telemetri Teknis:</strong> Informasi teknis standar peramban (browser type, sistem operasi, resolusi layar, halaman yang dikunjungi) untuk optimalisasi tampilan responsif.
              </li>
              <li>
                <strong>Kueri Pencarian Tersanitasi:</strong> Istilah pencarian diolah tanpa menghubungkannya dengan identitas pribadi, guna mengetahui topik game yang paling dicari komunitas.
              </li>
            </ul>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid #10b981' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Eye size={20} color="#10b981" /> 3. Penggunaan Cookie & Analitik
            </h2>
            <p style={{ marginBottom: 12 }}>
              Kami menggunakan teknologi analitik (seperti Google Analytics 4) dengan fitur <strong>IP Anonymization</strong> aktif. 
              Cookie analitik digunakan semata-mata untuk mengukur metrik agregat seperti jumlah pengunjung, halaman populer, dan durasi membaca.
            </p>
            <p>
              Kami <strong>tidak pernah</strong> menggunakan cookie pelacak lintas situs (cross-site tracking) untuk profiling pribadi atau penjualan data pihak ketiga.
            </p>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid #f59e0b' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={20} color="#f59e0b" /> 4. Hak Pengguna & Kontak Perlindungan Data
            </h2>
            <p style={{ marginBottom: 12 }}>
              Anda berhak menonaktifkan cookie melalui pengaturan peramban masing-masing kapan saja tanpa mengganggu fungsi utama membaca panduan di Seraphi Game.
            </p>
            <p>
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau ingin mengajukan penghapusan pesan kontak yang pernah dikirim, silakan hubungi tim redaksi kami di{' '}
              <a href="mailto:redaksi@seraphigame.id" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                redaksi@seraphigame.id
              </a>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

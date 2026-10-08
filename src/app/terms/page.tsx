import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSeoTitle, generateSeoDescription, getCanonicalUrl } from '@/lib/seo';
import { FileText, ShieldAlert, Award, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: generateSeoTitle('default', { title: 'Syarat dan Ketentuan' }),
  description: generateSeoDescription('default', {
    description: 'Syarat dan ketentuan penggunaan portal Seraphi Game. Ketentuan hak cipta panduan, atribusi merek dagang penerbit game, dan batasan tanggung jawab.',
  }),
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
};

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Syarat dan Ketentuan' },
  ];

  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: 900 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <article style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <FileText size={36} color="var(--primary)" />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-bright)' }}>
            Syarat dan Ketentuan
          </h1>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 32 }}>
          Terakhir diperbarui: 8 Oktober 2026 • Ketentuan berlaku bagi seluruh pengguna layanan Seraphi Game.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--primary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={20} color="var(--primary)" /> 1. Penerimaan Ketentuan
            </h2>
            <p>
              Dengan mengakses dan menggunakan portal <strong>Seraphi Game</strong> (seraphigame.id), Anda menyatakan telah membaca, memahami, 
              dan menyetujui untuk terikat dengan seluruh syarat dan ketentuan ini. Apabila Anda tidak menyetujui salah satu bagian dari ketentuan ini, 
              Anda disarankan untuk menghentikan penggunaan website.
            </p>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--secondary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldAlert size={20} color="var(--secondary)" /> 2. Hak Kekayaan Intelektual & Atribusi Merek
            </h2>
            <p style={{ marginBottom: 12 }}>
              Semua teks artikel, tata letak kurasi, diagram strategi, dan analisis meta yang diproduksi oleh tim editorial Seraphi Game dilindungi oleh hak cipta. 
              Dilarang menyalin atau mendistribusikan ulang konten tanpa menyertakan tautan sumber aktif ke halaman terkait di Seraphi Game.
            </p>
            <p>
              <strong>Disclaimer Merek Dagang:</strong> Seluruh nama game, karakter, gambar tangkapan layar, logo, dan materi in-game yang ditampilkan 
              (seperti Genshin Impact, Honkai: Star Rail, Mobile Legends, Valorant, dll.) adalah merek dagang dan hak cipta milik masing-masing pengembang 
              dan penerbit resmi (miHoYo/HoYoverse, Moonton, Riot Games, Kuro Games, dll.). Seraphi Game adalah portal independen komunitas dan tidak berafiliasi resmi 
              dengan penerbit game terkait kecuali dinyatakan sebaliknya.
            </p>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid #10b981' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <HelpCircle size={20} color="#10b981" /> 3. Batasan Tanggung Jawab (Kode Redeem & Event)
            </h2>
            <p style={{ marginBottom: 12 }}>
              Meskipun kami berupaya memverifikasi setiap kode redeem dan tanggal event sebelum ditayangkan, ketersediaan hadiah, batas kuota penukaran, 
              dan masa aktif kode redeem ditentukan secara sepihak oleh pengembang/penerbit game. 
            </p>
            <p>
              Seraphi Game tidak bertanggung jawab atas kegagalan klaim hadiah in-game akibat kuota yang telah habis atau perubahan kebijakan sepihak dari penerbit game.
            </p>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid #f59e0b' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              4. Perubahan Ketentuan
            </h2>
            <p>
              Seraphi Game berhak memperbarui syarat dan ketentuan ini sewaktu-waktu. Pembaruan akan berlaku efektif segera setelah dipublikasikan pada halaman ini. 
              Untuk pertanyaan hukum dan lisensi, hubungi kami di{' '}
              <a href="mailto:legal@seraphigame.id" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                legal@seraphigame.id
              </a>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

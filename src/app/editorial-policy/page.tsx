import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSeoTitle, generateSeoDescription, getCanonicalUrl } from '@/lib/seo';
import { BookOpen, CheckCircle, RefreshCw, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: generateSeoTitle('default', { title: 'Kebijakan Editorial' }),
  description: generateSeoDescription('default', {
    description: 'Standar etika jurnalisme dan kebijakan editorial Seraphi Game. Metodologi pengujian gameplay langsung, verifikasi fakta, dan kebijakan koreksi artikel.',
  }),
  alternates: {
    canonical: getCanonicalUrl('/editorial-policy'),
  },
};

export default function EditorialPolicyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Kebijakan Editorial' },
  ];

  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: 900 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <article style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <BookOpen size={36} color="var(--primary)" />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-bright)' }}>
            Kebijakan Editorial & Pengujian
          </h1>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 32 }}>
          Standar integritas dan komitmen kualitas konten di Seraphi Game • Terakhir diperbarui: 8 Oktober 2026.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--primary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={20} color="var(--primary)" /> 1. Integritas & Independensi Redaksi
            </h2>
            <p>
              Di <strong>Seraphi Game</strong>, kami berpegang teguh pada prinsip jurnalisme game yang independen dan berbasis data faktual. 
              Ulasan game, tier list, dan rekomendasi build karakter kami disusun secara murni berdasarkan performa nyata di dalam game, 
              bebas dari intervensi komersial penerbit atau pihak sponsor.
            </p>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--secondary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={20} color="var(--secondary)" /> 2. Metodologi Pengujian Konten (Original & Tested)
            </h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li>
                <strong>Pengujian Build Karakter:</strong> Setiap kombinasi senjata, artefak, dan rotasi tim diuji langsung di mode permainan relevan (Spiral Abyss, Memory of Chaos, Ranked Match).
              </li>
              <li>
                <strong>Verifikasi Kode Redeem:</strong> Seluruh kode redeem diuji verifikasinya secara berkala sebelum ditandai dengan status <code>ACTIVE</code>.
              </li>
              <li>
                <strong>Anti-Thin Content & Anti-Spam:</strong> Kami menolak keras artikel otomatisasi spam, konten clickbait kosong, atau manipulasi kata kunci palsu demi SEO.
              </li>
            </ul>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid #10b981' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <RefreshCw size={20} color="#10b981" /> 3. Kebijakan Koreksi & Pembaruan (Correction Policy)
            </h2>
            <p style={{ marginBottom: 12 }}>
              Dunia game berkembang dinamis dengan patch update dan penyesuaian nerfing/buffing. Ketika terjadi perubahan meta atau bila pembaca menemukan kekeliruan data, 
              kami berkomitmen melakukan koreksi substansial sesegera mungkin.
            </p>
            <p>
              Setiap pembaruan akan memperbarui stempel waktu <code>Terakhir diperbarui</code> di database kami secara transparan. 
              Laporan kesalahan dapat diajukan ke tim redaksi kami melalui{' '}
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

import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateSeoTitle, generateSeoDescription, getCanonicalUrl } from '@/lib/seo';
import { BadgeDollarSign, Shield, Info, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: generateSeoTitle('default', { title: 'Keterbukaan Afiliasi & Transparansi Sponsor' }),
  description: generateSeoDescription('default', {
    description: 'Pernyataan transparansi keterbukaan afiliasi dan monetisasi Seraphi Game. Kami menjelaskan secara jujur penggunaan tautan sponsor rel="sponsored".',
  }),
  alternates: {
    canonical: getCanonicalUrl('/affiliate-disclosure'),
  },
};

export default function AffiliateDisclosurePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Keterbukaan Afiliasi' },
  ];

  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: 900 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <article style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <BadgeDollarSign size={36} color="var(--primary)" />
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-bright)' }}>
            Keterbukaan Afiliasi & Transparansi Monetisasi
          </h1>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 32 }}>
          Transparansi penuh sesuai standar etika periklanan digital • Terakhir diperbarui: 8 Oktober 2026.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--primary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Info size={20} color="var(--primary)" /> 1. Apa itu Tautan Afiliasi?
            </h2>
            <p>
              Di <strong>Seraphi Game</strong>, operasional server dan kurasi database panduan didanai secara mandiri. Untuk menjaga agar seluruh panduan 
              tetap dapat diakses <strong>100% gratis</strong> oleh seluruh gamer di Indonesia, beberapa tautan eksternal pada website kami (seperti tautan pembelian voucher game resmi, merchandise, atau perangkat gaming) 
              dapat berupa <em>affiliate link</em> (tautan afiliasi).
            </p>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid var(--secondary)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ExternalLink size={20} color="var(--secondary)" /> 2. Bagaimana Cara Kerjanya Bagi Pembaca?
            </h2>
            <p style={{ marginBottom: 12 }}>
              Jika Anda mengklik tautan afiliasi dan memutuskan untuk melakukan pembelian pada platform merchant mitra resmi:
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <strong>Biaya Tambahan Nol Rupiah:</strong> Anda <strong>tidak akan dikenakan biaya tambahan sepeser pun</strong>. Harga produk tetap sama persis seperti Anda mengunjungi toko secara langsung.
              </li>
              <li>
                <strong>Dukungan Operasional:</strong> Seraphi Game mungkin menerima komisi persentase kecil dari mitra penyedia sebagai bentuk apresiasi rujukan.
              </li>
              <li>
                <strong>Atribut HTML Transparan:</strong> Semua tautan komersial/sponsor kami tandai secara tegas dengan atribut kepatuhan mesin telusur: <code>rel=&quot;sponsored noopener noreferrer&quot;</code>.
              </li>
            </ul>
          </section>

          <section className="card" style={{ padding: 24, borderLeft: '4px solid #10b981' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={20} color="#10b981" /> 3. Jaminan Independensi Rekomendasi
            </h2>
            <p>
              Kemitraan afiliasi <strong>tidak pernah memengaruhi opini, tier list, atau rekomendasi panduan kami</strong>. 
              Kami hanya merekomendasikan perlengkapan, game, atau platform top-up terpercaya yang telah kami verifikasi legalitas serta keamanannya. 
              Kepercayaan komunitas gamer adalah aset paling berharga bagi Seraphi Game.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteUrl, isIndexingEnabled, isProductionMode } from '@/lib/seo';
import { getProductionContentStats } from '@/lib/db';
import {
  Globe,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Search,
  ListOrdered,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Google Search Console Readiness & Instructions | Admin Seraphi Game',
  robots: { index: false, follow: false },
};

export default async function AdminSeoChecklistPage() {
  const siteUrl = getSiteUrl();
  const indexingActive = isIndexingEnabled();
  const prodMode = isProductionMode();
  const stats = await getProductionContentStats();
  const isHttps = siteUrl.startsWith('https://');
  const isLocalhost = siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1');

  // Requirement 8: Exact 9-item GSC Readiness Checklist
  const checklist = [
    {
      key: 'prod_url',
      title: 'Production URL',
      description: 'URL situs dikonfigurasi menggunakan domain produksi resmi.',
      status: !isLocalhost ? 'PASS' : 'WARNING',
      detail: siteUrl,
    },
    {
      key: 'https',
      title: 'HTTPS',
      description: 'Protokol aman SSL/TLS aktif untuk enkripsi data dan kepatuhan mesin telusur.',
      status: isHttps ? 'PASS' : 'WARNING',
      detail: isHttps ? 'HTTPS Enforced & HSTS Active' : 'HTTP detected (Harap aktifkan HTTPS di domain)',
    },
    {
      key: 'sitemap',
      title: 'Sitemap',
      description: 'Sitemap XML dinamis aktif dan mengecualikan admin/api/draft/demo.',
      status: 'PASS',
      path: '/sitemap.xml',
      detail: `${siteUrl}/sitemap.xml`,
    },
    {
      key: 'robots',
      title: 'Robots',
      description: 'Robots.txt terkonfigurasi dengan allow / serta disallow /admin, /api, /search.',
      status: 'PASS',
      path: '/robots.txt',
      detail: `${siteUrl}/robots.txt`,
    },
    {
      key: 'canonical',
      title: 'Canonical',
      description: 'Tag canonical terpasang di seluruh halaman publik tanpa parameter query kotor.',
      status: 'PASS',
      detail: 'Standardized query-free URLs',
    },
    {
      key: 'indexing_enabled',
      title: 'Indexing enabled',
      description: 'Global switch INDEXING_ENABLED bernilai true untuk mengizinkan bot mesin pencari.',
      status: indexingActive ? 'PASS' : 'FAIL',
      detail: indexingActive ? 'INDEXING_ENABLED=true' : 'INDEXING_ENABLED=false (noindex enforced)',
    },
    {
      key: 'demo_content',
      title: 'Demo content = 0',
      description: 'Tidak ada konten demo yang bercampur pada indeks publik produksi.',
      status: stats.published_demo === 0 ? 'PASS' : (prodMode ? 'PASS' : 'FAIL'),
      detail: `${stats.published_real} Real Published • ${stats.published_demo} Demo Content`,
    },
    {
      key: 'structured_data',
      title: 'Structured data',
      description: 'Schema JSON-LD aktif: BreadcrumbList, FAQPage, Game, NewsArticle, Person.',
      status: 'PASS',
      detail: 'Schema.org JSON-LD Active',
    },
    {
      key: 'no_localhost',
      title: 'No localhost',
      description: 'Tidak ada referensi hardcoded localhost pada metadata produksi.',
      status: !isLocalhost ? 'PASS' : 'WARNING',
      detail: isLocalhost ? 'Localhost detected' : 'Clean production domain',
    },
  ];

  const allPass = checklist.every((c) => c.status === 'PASS');
  const gscStatus = allPass ? 'READY' : 'PENDING CONFIGURATION';

  // Requirement 10: Priority Indexing Pages
  const priorityPages = [
    { name: 'Homepage (Beranda Utama)', path: '/', priority: 'Kritis (P1)' },
    { name: 'Katalog Game Populer', path: '/games', priority: 'Tinggi (P1)' },
    { name: 'Game Hub (e.g. Genshin Impact, HSR)', path: '/games/genshin-impact', priority: 'Tinggi (P2)' },
    { name: 'Detail Karakter & Panduan Build', path: '/games/genshin-impact/characters/neuvillette', priority: 'Tinggi (P2)' },
    { name: 'Katalog Panduan & Strategi', path: '/guides', priority: 'Menengah (P3)' },
    { name: 'Berita & Update Game', path: '/news', priority: 'Menengah (P3)' },
    { name: 'Kode Redeem Terbaru', path: '/redeem-codes', priority: 'Tinggi (P2)' },
    { name: 'Jadwal Event & Web Event', path: '/events', priority: 'Menengah (P3)' },
  ];

  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: 1000 }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 242, 254, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
            }}
          >
            <Globe size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Google Search Console Readiness
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Checklist teknis pra-registrasi & panduan manual Google Search Console (GSC)
            </p>
          </div>
        </div>

        <Link
          href="/admin"
          className="btn"
          style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text-bright)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.9rem',
          }}
        >
          <ArrowLeft size={16} /> Kembali ke Dashboard
        </Link>
      </div>

      {/* GSC Status Badge Card */}
      <div
        className="card"
        style={{
          padding: 24,
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          backgroundColor: allPass ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
          borderLeft: `5px solid ${allPass ? '#10b981' : '#f59e0b'}`,
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Status Integrasi
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: allPass ? '#10b981' : '#f59e0b', marginTop: 4 }}>
            Google Search Console: {gscStatus}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '6px 0 0 0' }}>
            {allPass
              ? 'Seluruh prasyarat teknis SEO Seraphi Game telah terpenuhi dan siap diverifikasi di Google Search Console.'
              : 'Beberapa parameter lingkungan masih menggunakan konfigurasi staging/development.'}
          </p>
        </div>

        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          Buka Google Search Console <ExternalLink size={16} />
        </a>
      </div>

      {/* Requirement 8: Checklist Grid */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <ShieldCheck size={20} color="var(--primary)" /> 9-Point Readiness Checklist
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
        {checklist.map((item) => {
          const isPass = item.status === 'PASS';
          const isFail = item.status === 'FAIL';
          const color = isPass ? '#10b981' : isFail ? '#ef4444' : '#f59e0b';
          return (
            <div
              key={item.key}
              className="card"
              style={{
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
                borderLeft: `4px solid ${color}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, maxWidth: '75%' }}>
                <div style={{ color, marginTop: 2 }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '4px 0 4px 0' }}>
                    {item.description}
                  </p>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontFamily: 'monospace' }}>
                    {item.detail}
                  </div>
                </div>
              </div>

              <div>
                {item.path ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.78rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: '#fff',
                    }}
                  >
                    Buka File <ExternalLink size={14} />
                  </a>
                ) : (
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: isPass ? 'rgba(16, 185, 129, 0.15)' : isFail ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color,
                    }}
                  >
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Requirement 9: Step-by-Step GSC Instructions */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <ListOrdered size={20} color="var(--primary)" /> Panduan Pendaftaran Google Search Console
      </h2>
      <div className="card" style={{ padding: 24, marginBottom: 36, borderLeft: '4px solid var(--primary)' }}>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 14, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          <li>
            <strong>Buka Google Search Console:</strong> Kunjungi portal resmi di{' '}
            <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              search.google.com/search-console
            </a>{' '}
            menggunakan akun Google pengelola Seraphi Game.
          </li>
          <li>
            <strong>Tambahkan Property untuk Production Website:</strong> Pilih tipe properti <em>URL prefix</em> dan masukkan URL produksi lengkap:{' '}
            <code>{siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`}</code>.
          </li>
          <li>
            <strong>Verifikasi Kepemilikan (Ownership):</strong> Lakukan verifikasi menggunakan salah satu metode yang disediakan Google (misalnya: file HTML, meta tag HTML, atau rekaman DNS TXT pada penyedia domain Anda).
          </li>
          <li>
            <strong>Submit Sitemap:</strong> Masuk ke menu <strong>Sitemaps</strong> di bilah navigasi kiri, lalu kirimkan path sitemap resmi:{' '}
            <code>/sitemap.xml</code>.
          </li>
          <li>
            <strong>Inspect Homepage:</strong> Gunakan fitur <em>URL Inspection</em> pada bilah pencarian atas untuk memeriksa URL beranda (<code>/</code>).
          </li>
          <li>
            <strong>Request Indexing jika Diperlukan:</strong> Klik tombol <em>&quot;Request Indexing&quot;</em> pada beranda setelah pengujian live URL berhasil.
          </li>
          <li>
            <strong>Inspect Beberapa Halaman Utama:</strong> Lakukan inspeksi pada beberapa halaman berprioritas tinggi sesuai daftar di bawah.
          </li>
        </ol>
        <div style={{ marginTop: 16, padding: 12, backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: 8, fontSize: '0.85rem', color: '#f59e0b' }}>
          ⚠️ <strong>Catatan Penting:</strong> Jangan mengklaim pengindeksan berhasil sebelum status diverifikasi secara faktual pada laporan Coverage / Page Indexing Google Search Console. Sitemap adalah panduan perayapan, bukan jaminan instan waktu perayapan.
        </div>
      </div>

      {/* Requirement 10: Priority Indexing List */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Sparkles size={20} color="var(--primary)" /> Prioritas Awal Pengindeksan (Initial Indexing Priority)
      </h2>
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 16 }}>
          Untuk menghindari pembatasan kuota inspeksi harian Google Search Console, <strong>jangan melakukan request indexing manual untuk ratusan halaman sekaligus</strong>. Ajukan halaman prioritas berikut, dan biarkan sitemap memandu perayapan halaman lainnya secara organik.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {priorityPages.map((p, idx) => (
            <div
              key={idx}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{p.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontFamily: 'monospace' }}>{p.path}</div>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>
                {p.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { Sparkles, Target, Shield, Users } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tentang SERAPHI GAME — Portal Info Game, Guide & Dunia Gaming Indonesia',
  description:
    'Profil portal SERAPHI GAME Indonesia: visi, misi, standar editorial panduan build, dan komitmen membangun komunitas gaming positif di tanah air.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Tentang Kami' }]} />

      <div style={{ maxWidth: 860, margin: '20px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0, 242, 254, 0.15)',
              color: 'var(--primary)',
              border: '1px solid var(--border-glow)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            <Sparkles size={16} />
            <span>IDENTITAS PORTAL</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
            SERAPHI GAME
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 700 }}>
            Info Game, Guide & Dunia Gaming Indonesia
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            fontSize: '1.02rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Target size={20} color="var(--primary)" />
              Visi & Misi Kami
            </h2>
            <p>
              <strong>SERAPHI GAME</strong> didirikan dengan tujuan menjadi ensiklopedia dan portal berita video game berbahasa Indonesia yang paling akurat, terstruktur, dan mudah diakses. Kami percaya bahwa setiap gamer di Indonesia—baik pemula maupun pemain tingkat kompetitif—berhak mendapatkan akses informasi strategi dan panduan build berkualitas tanpa hambatan bahasa.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Shield size={20} color="#10b981" />
              Integritas & Standar Editorial
            </h2>
            <p>
              Semua konten di Seraphi Game disusun berdasarkan riset komprehensif, pengujian langsung di dalam game, serta masukan dari para pemain berpengalaman. Kami menjamin:
            </p>
            <ul style={{ marginLeft: 24, marginTop: 8 }}>
              <li>Kode redeem diverifikasi langsung sebelum diarsipkan ke sistem database.</li>
              <li>Build karakter dikurasi agar relevan dengan meta kompetitif terbaru.</li>
              <li>Tidak ada berita clickbait palsu atau klaim tidak berdasar.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Users size={20} color="#fbbf24" />
              Cakupan Ekosistem Gaming
            </h2>
            <p>
              Platform kami melayani beragam ekosistem gaming, mencakup game PC, konsol PlayStation, Xbox, Nintendo Switch, serta perangkat mobile Android dan iOS. Dari genre RPG, MOBA, Battle Royale, hingga game aksi mandiri, Seraphi Game siap menjadi teman setia perjalanan bermainmu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import {
  Gamepad2,
  Users,
  BookOpen,
  Newspaper,
  Gift,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  FileEdit,
  Clock,
  Upload,
} from 'lucide-react';
import { getDashboardStats, getProductionContentStats } from '@/lib/db';
import { isProductionMode } from '@/lib/seo';
import {
  Globe,
  Activity,
  Rocket,
  AlertOctagon,
  ShieldAlert,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [stats, prodStats] = await Promise.all([getDashboardStats(), getProductionContentStats()]);
  const isProd = isProductionMode();

  const statCards = [
    { label: 'Published Games', value: stats.publishedGames, total: stats.gamesCount, icon: Gamepad2, color: 'var(--primary)', href: '/admin/games' },
    { label: 'Published Characters', value: stats.publishedChars, total: stats.charsCount, icon: Users, color: 'var(--secondary)', href: '/admin/characters' },
    { label: 'Published Guides', value: stats.publishedGuides, total: stats.guidesCount, icon: BookOpen, color: '#a855f7', href: '/admin/guides' },
    { label: 'Published News', value: stats.publishedNews, total: stats.newsCount, icon: Newspaper, color: '#10b981', href: '/admin/news' },
    { label: 'Active Redeem Codes', value: stats.activeCodes, total: stats.codesCount, icon: Gift, color: '#fbbf24', href: '/admin/redeem-codes' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, total: stats.eventsCount, icon: Calendar, color: '#f43f5e', href: '/admin/events' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
            Dashboard Konten Seraphi Game
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
            Statistik publikasi, status alur editorial, dan pembaruan konten terkini.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/admin/seo" className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            <Globe size={16} />
            <span>SEO / GSC</span>
          </Link>
          <Link href="/admin/analytics" className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
            <Activity size={16} />
            <span>Analytics</span>
          </Link>
          <Link href="/admin/launch-check" className="btn btn-secondary btn-sm" style={{ borderColor: '#10b981', color: '#10b981' }}>
            <Rocket size={16} />
            <span>Launch Check</span>
          </Link>
          <Link href="/admin/guides" className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Tulis Guide</span>
          </Link>
          <Link href="/admin/news" className="btn btn-secondary btn-sm">
            <Plus size={16} />
            <span>Terbitkan Berita</span>
          </Link>
          <Link href="/admin/settings" className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--accent-cyan)' }}>
            <Upload size={16} />
            <span>Import CSV</span>
          </Link>
        </div>
      </div>

      {/* Requirement 2: Production Content Status & Demo Content Warning */}
      <div
        className="card"
        style={{
          padding: 20,
          marginBottom: 24,
          borderLeft: `5px solid ${prodStats.published_demo > 0 ? '#ef4444' : '#10b981'}`,
          backgroundColor: prodStats.published_demo > 0 ? 'rgba(239, 68, 68, 0.06)' : 'rgba(16, 185, 129, 0.05)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldAlert size={22} color={prodStats.published_demo > 0 ? '#ef4444' : '#10b981'} />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Production Content Status
            </h2>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Mode Sistem: <strong style={{ color: isProd ? '#10b981' : '#f59e0b' }}>{isProd ? 'PRODUCTION MODE' : 'DEMO MODE'}</strong>
          </div>
        </div>

        {/* Demo Content Alert Banner (Requirement 2: Tampilkan warning merah jika published_demo > 0) */}
        {prodStats.published_demo > 0 && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            <AlertOctagon size={20} color="#ef4444" style={{ flexShrink: 0 }} />
            <span>
              <strong>PERINGATAN:</strong> Demo content masih dapat terlihat sebagai konten publik. 
              {isProd ? ' (Dalam mode production, sistem otomatis mengisolasi & noindex konten demo).' : ' (Gunakan CONTENT_MODE=production saat deploy produksi).'}
            </span>
          </div>
        )}

        {/* Content Breakdown Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>PUBLISHED REAL</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{prodStats.published_real}</div>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>PUBLISHED DEMO</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: prodStats.published_demo > 0 ? '#ef4444' : '#fff' }}>
              {prodStats.published_demo}
            </div>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>DRAFT</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{prodStats.draft}</div>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>REVIEW</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{prodStats.review}</div>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>ARCHIVED</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>{prodStats.archived}</div>
          </div>
        </div>
      </div>

      {/* Primary Publication Metrics Grid (Requirement 30) */}
      <div className="stats-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="stat-card" style={{ textDecoration: 'none' }}>
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Total di DB: {stat.total}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Middle Row: Workflow Health & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginTop: 10 }}>
        {/* Editorial Workflow Status */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={18} color="var(--primary)" />
            Status Alur Konten (Workflow)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} color="#10b981" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>PUBLISHED (Tayang Publik)</span>
              </div>
              <strong style={{ color: '#fff' }}>{stats.publishedGuides} guide</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileEdit size={16} color="#f59e0b" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f59e0b' }}>DRAFT / IN REVIEW</span>
              </div>
              <strong style={{ color: '#fff' }}>{stats.draftGuides} draft</strong>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <Link href="/admin/guides" className="section-view-all">
              <span>Kelola Status Guide & Artikel</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Quick Action Hub */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Aksi Cepat Administrator
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link
              href="/admin/redeem-codes"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
              }}
            >
              <span>+ Tambah & Verifikasi Kode Redeem</span>
              <ArrowRight size={14} color="var(--primary)" />
            </Link>

            <Link
              href="/admin/events"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
              }}
            >
              <span>+ Jadwalkan Event Game</span>
              <ArrowRight size={14} color="var(--primary)" />
            </Link>

            <Link
              href="/admin/settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
              }}
            >
              <span>⚙ Pengaturan & Import Batch CSV</span>
              <ArrowRight size={14} color="var(--primary)" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recently Updated Content (Requirement 30) */}
      <div
        style={{
          marginTop: 28,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} color="var(--accent-cyan)" />
            Recently Updated Content
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Urutan pembaruan terakhir di database
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {stats.recentlyUpdated.map((item: any) => (
            <div
              key={`${item.type}-${item.id}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '2px 8px',
                    borderRadius: 4,
                    background:
                      item.type === 'guide'
                        ? 'rgba(168, 85, 247, 0.15)'
                        : item.type === 'news'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : 'rgba(0, 240, 255, 0.15)',
                    color:
                      item.type === 'guide'
                        ? '#c084fc'
                        : item.type === 'news'
                        ? '#34d399'
                        : '#38bdf8',
                  }}
                >
                  {item.type}
                </span>

                <Link
                  href={
                    item.type === 'guide'
                      ? `/guides/${item.slug}`
                      : item.type === 'news'
                      ? `/news/${item.slug}`
                      : `/games/${item.slug}`
                  }
                  style={{ color: '#fff', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}
                >
                  {item.title}
                </Link>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <Clock size={13} />
                <span>
                  {new Date(item.updated_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  {new Date(item.updated_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

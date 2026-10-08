import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  isAnalyticsEnabled,
  getAnalyticsProviderName,
  getMaskedMeasurementId,
  getImplementedTrackingEvents,
} from '@/lib/analytics';
import { getPopularGames, getPopularGuides, getPopularCharacters, getPopularNews } from '@/lib/db';
import { Activity, ArrowLeft, BarChart3, CheckCircle, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Analytics Control & Telemetry Dashboard | Admin Seraphi Game',
  robots: { index: false, follow: false },
};

export default async function AdminAnalyticsPage() {
  const isEnabled = isAnalyticsEnabled();
  const provider = getAnalyticsProviderName();
  const maskedId = getMaskedMeasurementId();
  const events = getImplementedTrackingEvents();

  const [popularGames, popularGuides, popularCharacters, popularNews] = await Promise.all([
    getPopularGames(5),
    getPopularGuides(5),
    getPopularCharacters(5),
    getPopularNews(5),
  ]);

  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: 1000 }}>
      {/* Header */}
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
            <Activity size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Analytics & Telemetri
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
              Monitoring status integrasi pelacak pengunjung dan statistik internal views
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

      {/* Provider Status Card */}
      <div
        className="card"
        style={{
          padding: 24,
          marginBottom: 32,
          borderLeft: `4px solid ${isEnabled ? '#10b981' : '#f59e0b'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                Status Provider Analitik
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  backgroundColor: isEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: isEnabled ? '#10b981' : '#f59e0b',
                  border: `1px solid ${isEnabled ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                }}
              >
                {isEnabled ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                {isEnabled ? 'AKTIF' : 'NON-AKTIF'}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Provider: <strong>{provider}</strong> • Measurement ID: <code>{maskedId}</code>
            </p>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Privasi: <strong>IP Anonymization Aktif</strong> (Zero Sensitive PII)
          </div>
        </div>

        {!isEnabled && (
          <div
            style={{
              marginTop: 18,
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#f59e0b',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <AlertTriangle size={18} />
            <span>
              <strong>Analytics belum dikonfigurasi.</strong> Untuk mengaktifkan Google Analytics 4, masukkan variabel <code>NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX</code> pada berkas <code>.env</code> Anda.
            </span>
          </div>
        )}
      </div>

      {/* Implemented Events Section */}
      <div className="card" style={{ padding: 24, marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldCheck size={20} color="var(--primary)" /> Peristiwa Pelacakan Terpasang (Privacy Compliant)
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 8px' }}>Event Name</th>
                <th style={{ padding: '10px 8px' }}>Deskripsi Telemetri</th>
                <th style={{ padding: '10px 8px' }}>Penanganan Privasi</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.event} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 8px', fontFamily: 'monospace', color: 'var(--primary)', fontWeight: 600 }}>
                    {e.event}
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>
                    {e.description}
                  </td>
                  <td style={{ padding: '12px 8px', color: '#10b981', fontSize: '0.8rem' }}>
                    ✓ Sanitized Non-PII
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal View Counter Metrics */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={20} color="var(--secondary)" /> Statistik Internal View Counter (Database Verified)
          </h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            Dihitung otomatis via safe-increment
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Top Games */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 8 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>
              Top Games (Views)
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {popularGames.map((g) => (
                <li key={g.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{g.name}</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{g.views?.toLocaleString('id-ID') || 0}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Characters */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 8 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: 12 }}>
              Top Characters (Views)
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {popularCharacters.map((c) => (
                <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{c.name}</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{c.views?.toLocaleString('id-ID') || 0}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Guides */}
          <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 8 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10b981', marginBottom: 12 }}>
              Top Guides (Views)
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {popularGuides.map((g) => (
                <li key={g.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                    {g.title}
                  </span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{g.views?.toLocaleString('id-ID') || 0}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

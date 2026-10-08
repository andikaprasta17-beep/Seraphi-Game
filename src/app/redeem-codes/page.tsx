import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getRedeemCodes, getGames } from '@/lib/db';
import RedeemCodeCard from '@/components/RedeemCodeCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import GamingSidebar from '@/components/GamingSidebar';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Kumpulan Kode Redeem Game Terbaru 2026 — Primogem, Stellar Jade, Diamond Gratis | Seraphi Game',
  description:
    'Daftar lengkap kode redeem aktif untuk Genshin Impact, Honkai Star Rail, Mobile Legends, Valorant, Free Fire, dan Wuthering Waves. 1-klik salin kode instan!',
  alternates: {
    canonical: getCanonicalUrl('/redeem-codes'),
  },
};

interface Props {
  searchParams: Promise<{ game?: string }>;
}

export default async function GlobalRedeemCodesPage({ searchParams }: Props) {
  const { game } = await searchParams;
  const selectedGameId = game || undefined;
  const [games, allCodes, totalCodesList] = await Promise.all([
    getGames(),
    getRedeemCodes(selectedGameId),
    getRedeemCodes(),
  ]);

  const activeCodes = allCodes.filter((c) => c.status === 'ACTIVE');
  const expiredCodes = allCodes.filter((c) => c.status !== 'ACTIVE');

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Kode Redeem' }]} />

      <div style={{ margin: '20px 0 30px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
          Pusat Kode Redeem Game
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 850, fontSize: '1.05rem', lineHeight: 1.6 }}>
          Klaim hadiah gratis resmi dari publisher game favoritmu. Seluruh kode diperiksa secara berkala oleh tim Seraphi Game. Klik tombol &quot;SALIN KODE&quot; untuk mengklaim.
        </p>
      </div>

      <div className="layout-with-sidebar">
        <div>
          {/* Filter by Game */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 28 }}>
        <Link
          href="/redeem-codes"
          className={`btn btn-sm ${!selectedGameId ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          Semua Game ({totalCodesList.length})
        </Link>
        {games.map((g) => {
          const isActive = selectedGameId === g.id;
          return (
            <Link
              key={g.id}
              href={`/redeem-codes?game=${g.id}`}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {g.name}
            </Link>
          );
        })}
      </div>

      {/* Active Codes */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981', marginBottom: 18 }}>
          ✓ Kode Masih Aktif ({activeCodes.length})
        </h2>
        <div className="grid-cards">
          {activeCodes.map((code) => (
            <RedeemCodeCard
              key={code.id}
              id={code.id}
              game_id={code.game_id}
              game_name={code.game_name}
              game_slug={code.game_slug}
              code={code.code}
              reward={code.reward}
              status={code.status}
              last_checked={code.last_checked}
              verified_at={code.verified_at}
              source={code.source}
            />
          ))}
        </div>
      </section>

      {/* Expired Codes */}
      {expiredCodes.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 18 }}>
            ✕ Kode Kedaluwarsa ({expiredCodes.length})
          </h2>
          <div className="grid-cards">
            {expiredCodes.map((code) => (
              <RedeemCodeCard
                key={code.id}
                id={code.id}
                game_id={code.game_id}
                game_name={code.game_name}
                game_slug={code.game_slug}
                code={code.code}
                reward={code.reward}
                status={code.status}
                last_checked={code.last_checked}
                verified_at={code.verified_at}
                source={code.source}
              />
            ))}
          </div>
        </section>
      )}
        </div>

        {/* Gaming Info Sidebar */}
        <aside>
          <div className="sidebar-sticky-wrapper">
            <GamingSidebar hideRedeemCodes />
          </div>
        </aside>
      </div>
    </div>
  );
}


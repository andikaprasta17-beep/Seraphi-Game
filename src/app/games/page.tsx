import React from 'react';
import type { Metadata } from 'next';
import { getGames } from '@/lib/db';
import GameCard from '@/components/GameCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import GamingSidebar from '@/components/GamingSidebar';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Database Game Indonesia — Katalog Lengkap Game PC, Konsol & Mobile',
  description:
    'Jelajahi database lengkap game populer di Indonesia: Genshin Impact, Honkai Star Rail, Mobile Legends, Valorant, Wuthering Waves, dan lainnya.',
};

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Database Game' }]} />

      <div style={{ margin: '20px 0 35px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
          Database Game
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 850, fontSize: '1.05rem', lineHeight: 1.6 }}>
          Pusat informasi terlengkap game PC, PlayStation, Xbox, Nintendo Switch, Android, dan iOS. Pilih game untuk melihat karakter, panduan build, tier list, dan kode redeem aktif.
        </p>
      </div>

      <div className="layout-with-sidebar">
        {/* Main Games Grid */}
        <div>
          <div className="grid-games">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>

        {/* Gaming Info Sidebar */}
        <aside>
          <div className="sidebar-sticky-wrapper">
            <GamingSidebar hideGames />
          </div>
        </aside>
      </div>
    </div>
  );
}


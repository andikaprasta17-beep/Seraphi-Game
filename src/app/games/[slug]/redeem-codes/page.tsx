import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGameBySlug, getRedeemCodes } from '@/lib/db';
import RedeemCodeCard from '@/components/RedeemCodeCard';
import { getCanonicalUrl, getRobotsDirective } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  return {
    title: `Kode Redeem ${game.name} Terbaru 2026 — Masih Aktif & Hadiah Gratis | Seraphi Game`,
    description: `Kumpulan kode redeem ${game.name} terbaru yang masih aktif dan dapat diklaim hari ini. Dapatkan Primogem, Stellar Jade, Diamond, dan item langka gratis!`,
    alternates: {
      canonical: getCanonicalUrl(`/games/${game.slug}/redeem-codes`),
    },
    robots: getRobotsDirective(game.status, undefined, game.is_demo),
  };
}

export default async function GameRedeemCodesPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const codes = await getRedeemCodes(game.id);
  const activeCodes = codes.filter((c) => c.status === 'ACTIVE');
  const expiredCodes = codes.filter((c) => c.status !== 'ACTIVE');

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          Kode Redeem {game.name} Terbaru
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Daftar kode promo dan gift code resmi {game.name}. Klik tombol &quot;SALIN KODE&quot; untuk langsung menyalin ke clipboard.
        </p>
      </div>

      {activeCodes.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', marginBottom: 16 }}>
            ✓ Kode Aktif ({activeCodes.length})
          </h3>
          <div className="grid-cards">
            {activeCodes.map((code) => (
              <RedeemCodeCard
                key={code.id}
                id={code.id}
                game_id={code.game_id}
                game_name={game.name}
                game_slug={game.slug}
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

      {expiredCodes.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 16 }}>
            ✕ Kode Kedaluwarsa (Arsip)
          </h3>
          <div className="grid-cards">
            {expiredCodes.map((code) => (
              <RedeemCodeCard
                key={code.id}
                id={code.id}
                game_id={code.game_id}
                game_name={game.name}
                game_slug={game.slug}
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

      {codes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          Belum ada kode redeem tercatat untuk game ini.
        </div>
      )}
    </div>
  );
}

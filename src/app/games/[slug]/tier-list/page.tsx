import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getTierLists } from '@/lib/db';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  return {
    title: `Tier List ${game.name} Terbaik (Versi Terbaru) — Karakter Paling OP`,
    description: `Tier list karakter dan hero terkuat di ${game.name}. Peringkat SS, S, A, B, C berdasarkan performa Spiral Abyss, MoC, dan meta kompetitif.`,
  };
}

export default async function GameTierListPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const tierLists = await getTierLists(game.id);
  const currentTierList = tierLists[0] || null;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          {currentTierList ? currentTierList.title : `Tier List ${game.name}`}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          {currentTierList
            ? currentTierList.description
            : `Evaluasi meta karakter terkuat untuk ${game.name}.`}
        </p>
      </div>

      {currentTierList ? (
        <div>
          {currentTierList.tiers.map((tierGroup) => {
            const tierClass =
              tierGroup.tier === 'SS'
                ? 'tier-label-ss'
                : tierGroup.tier === 'S'
                ? 'tier-label-s'
                : tierGroup.tier === 'A'
                ? 'tier-label-a'
                : tierGroup.tier === 'B'
                ? 'tier-label-b'
                : 'tier-label-c';

            return (
              <div key={tierGroup.tier} className="tier-row">
                <div className={`tier-label ${tierClass}`}>
                  {tierGroup.tier}
                </div>
                <div className="tier-characters">
                  {tierGroup.characters.map((char) => (
                    <Link
                      key={char.slug}
                      href={`/games/${game.slug}/characters/${char.slug}`}
                      className="tier-char-item"
                      title={`${char.name} (${char.role}) - ${char.reason}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={char.portrait}
                        alt={char.name}
                        className="tier-char-avatar"
                      />
                      <span className="tier-char-name">{char.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          Tier list untuk {game.name} sedang dalam proses kurasi oleh tim analisis Seraphi Game.
        </div>
      )}
    </div>
  );
}

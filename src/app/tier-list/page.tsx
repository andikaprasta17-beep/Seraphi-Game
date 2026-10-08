import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getTierLists } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCanonicalUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Tier List Game Terbaik 2026 — Rekomendasi Karakter Paling Meta',
  description:
    'Kumpulan tier list game populer: Genshin Impact, Honkai Star Rail, Mobile Legends, Wuthering Waves. Ketahui karakter tier SS, S, dan A terbaik.',
  alternates: {
    canonical: getCanonicalUrl('/tier-list'),
  },
};

export default async function GlobalTierListPage() {
  const tierLists = await getTierLists();

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Tier List Meta' }]} />

      <div style={{ margin: '20px 0 35px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
          Tier List Game Populer
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 700, fontSize: '1.05rem', lineHeight: 1.6 }}>
          Evaluasi mendalam peringkat efisiensi karakter, hero, dan agent berdasarkan performa meta kompetitif dan update patch terkini.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {tierLists.map((tl) => (
          <div
            key={tl.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {tl.game_name} • Versi {tl.version}
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginTop: 4 }}>
                  {tl.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
                  {tl.description}
                </p>
              </div>

              {tl.game_slug && (
                <Link href={`/games/${tl.game_slug}/tier-list`} className="btn btn-secondary btn-sm">
                  Lihat Detail {tl.game_name}
                </Link>
              )}
            </div>

            <div>
              {tl.tiers.map((tierGroup) => {
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
                          href={tl.game_slug ? `/games/${tl.game_slug}/characters/${char.slug}` : `/search?q=${char.name}`}
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
          </div>
        ))}
      </div>
    </div>
  );
}

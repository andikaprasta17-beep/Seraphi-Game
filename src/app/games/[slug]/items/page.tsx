import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGameBySlug, getItems } from '@/lib/db';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  return {
    title: `Database Senjata & Item ${game.name} — Stat, Rarity & Cara Mendapatkan`,
    description: `Daftar lengkap senjata, artefak, relic, dan item di ${game.name}. Detail stat base, efek pasif, dan lokasi drop in-game.`,
  };
}

export default async function GameItemsPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const items = await getItems(game.id);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          Database Senjata & Item {game.name}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Daftar senjata, perlengkapan, dan item penting di {game.name} lengkap dengan stat serta cara memperolehnya.
        </p>
      </div>

      {items.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-medium)',
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                    {item.name}
                  </h3>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                      {item.type}
                    </span>
                    <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>
                      {'★'.repeat(item.rarity)}
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.description}
              </p>

              {Object.keys(item.stats).length > 0 && (
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem' }}>
                  {Object.entries(item.stats).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: 'var(--text-muted)' }}>{k}:</span>
                      <strong style={{ color: '#fff', textAlign: 'right', maxWidth: '65%' }}>{v}</strong>
                    </div>
                  ))}
                </div>
              )}

              {item.how_to_get && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
                  <strong>Cara dapat:</strong> {item.how_to_get}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          Database item untuk game ini akan segera diperbarui.
        </div>
      )}
    </div>
  );
}

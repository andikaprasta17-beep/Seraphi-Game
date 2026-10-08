import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGameBySlug, getGuides } from '@/lib/db';
import GuideCard from '@/components/GuideCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  return {
    title: `Panduan & Build ${game.name} — Tips Pemula & Walkthrough`,
    description: `Daftar panduan lengkap ${game.name}: build karakter, rekomendasi senjata, tips pemula, quest guide, dan rute farming tercepat.`,
  };
}

export default async function GameGuidesPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const guides = await getGuides({ gameIdOrSlug: game.id });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          Panduan & Guide {game.name}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Koleksi walkthrough, tips pemula, dan build karakter terlengkap untuk membantu petualanganmu di {game.name}.
        </p>
      </div>

      {guides.length > 0 ? (
        <div className="grid-cards">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          Belum ada panduan untuk game ini. Admin sedang menyiapkan konten terbaru!
        </div>
      )}
    </div>
  );
}

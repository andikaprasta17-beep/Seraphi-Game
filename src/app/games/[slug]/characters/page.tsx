import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGameBySlug, getCharacters } from '@/lib/db';
import CharacterCard from '@/components/CharacterCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  return {
    title: `Daftar Karakter & Hero ${game.name} — Database Lengkap`,
    description: `Katalog lengkap karakter, hero, dan agent di ${game.name}. Temukan build terbaik, rekomendasi senjata, dan panduan tim di Seraphi Game.`,
  };
}

export default async function GameCharactersPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const characters = await getCharacters(game.id);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          Database Karakter {game.name}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Menampilkan {characters.length} karakter terdaftar dalam database. Klik karakter untuk melihat rekomendasi build, artefak, senjata, dan sinergi tim.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} gameSlug={game.slug} />
        ))}
      </div>
    </div>
  );
}

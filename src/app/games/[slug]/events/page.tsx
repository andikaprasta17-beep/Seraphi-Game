import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGameBySlug, getEvents } from '@/lib/db';
import EventCard from '@/components/EventCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  return {
    title: `Jadwal Event & Update ${game.name} — Kalender Hadiah & Durasi`,
    description: `Info event ${game.name} yang sedang berlangsung dan akan datang. Simak tanggal mulai, batas akhir, dan total hadiah gratis yang bisa didapatkan.`,
  };
}

export default async function GameEventsPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const events = await getEvents({ gameId: game.id });

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          Event & Aktivitas {game.name}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          Pantau seluruh event in-game, festival musiman, dan turnamen resmi {game.name}.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="grid-cards">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          Tidak ada event aktif yang tercatat untuk game ini saat ini.
        </div>
      )}
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Newspaper } from 'lucide-react';
import { getGameBySlug, getNews } from '@/lib/db';
import NewsCard from '@/components/NewsCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import { generateSeoTitle, generateSeoDescription, getCanonicalUrl } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  const title = generateSeoTitle({
    type: 'news',
    title: `Berita & Update ${game.name}`,
  });

  const description = generateSeoDescription({
    type: 'news',
    title: `Berita & Update ${game.name}`,
    fallbackText: `Kumpulan berita terbaru, patch notes, banner schedule, dan pengumuman resmi ${game.name} di Seraphi Game.`,
  });

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/games/${game.slug}/news`),
    },
  };
}

export default async function GameNewsPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const newsItems = await getNews({ gameIdOrSlug: game.id, publishedOnly: true });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Breadcrumbs
        items={[
          { label: 'Games', href: '/games' },
          { label: game.name, href: `/games/${game.slug}` },
          { label: 'Berita' },
        ]}
      />

      <div className="section-header">
        <div className="section-title-wrap">
          <Newspaper size={24} color="var(--accent-purple)" />
          <h2 className="section-title">Berita & Pembaruan {game.name}</h2>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {newsItems.length} Berita Tersedia
        </span>
      </div>

      {newsItems.length > 0 ? (
        <div className="grid-cards">
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 40,
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          <p>Belum ada berita yang dipublikasikan khusus untuk {game.name}.</p>
        </div>
      )}

      <AdSlot slotId="ad-article-incontent" />
    </div>
  );
}

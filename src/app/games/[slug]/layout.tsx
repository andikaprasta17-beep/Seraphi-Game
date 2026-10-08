import React from 'react';
import { notFound } from 'next/navigation';
import { getGameBySlug } from '@/lib/db';
import GameHubHeader from '@/components/GameHubHeader';
import Breadcrumbs from '@/components/Breadcrumbs';

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: game.description,
    image: game.cover_image,
    genre: game.genres,
    gamePlatform: game.platforms,
    author: {
      '@type': 'Organization',
      name: game.developer,
    },
    publisher: {
      '@type': 'Organization',
      name: game.publisher,
    },
    datePublished: game.release_date,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: game.rating,
      bestRating: 5,
      ratingCount: 1500,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Database Game', href: '/games' },
            { label: game.name, href: `/games/${game.slug}` },
          ]}
        />
      </div>

      <GameHubHeader game={game} />

      <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
        {children}
      </div>
    </div>
  );
}

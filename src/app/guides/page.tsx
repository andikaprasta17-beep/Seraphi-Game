import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getGuides } from '@/lib/db';
import GuideCard from '@/components/GuideCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Panduan & Build Karakter Game Terlengkap — Tips Pemula & Walkthrough',
  description:
    'Kumpulan guide game, build karakter Genshin Impact, Honkai Star Rail, tips rotasi Mobile Legends, aim Valorant, dan walkthrough boss tersulit di Seraphi Game.',
};

const CATEGORIES = [
  'Semua',
  'Character Build',
  'Beginner Guide',
  'Tips & Tricks',
  'Boss Guide',
  'Walkthrough',
  'Farming Guide',
];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function GuidesCatalogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const currentCategory = category && category !== 'Semua' ? category : undefined;
  const guides = await getGuides({ category: currentCategory });

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Panduan & Guide' }]} />

      <div style={{ margin: '20px 0 30px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
          Panduan & Guide Game
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 700, fontSize: '1.05rem', lineHeight: 1.6 }}>
          Pelajari mekanik gameplay, strategi build karakter terkuat, dan trik menaklukkan boss dari para pemain berpengalaman.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 24 }}>
        {CATEGORIES.map((cat) => {
          const isActive = (!currentCategory && cat === 'Semua') || currentCategory === cat;
          return (
            <Link
              key={cat}
              href={cat === 'Semua' ? '/guides' : `/guides?category=${encodeURIComponent(cat)}`}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      <div className="grid-cards">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getNews } from '@/lib/db';
import NewsCard from '@/components/NewsCard';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Berita Game Terbaru & Update Patch 2026 — Seraphi Game Indonesia',
  description:
    'Kumpulan berita game terbaru hari ini, update patch notes, pengumuman event, transfer tim esports, dan kabar industri gaming dunia terlengkap.',
};

const CATEGORIES = ['Semua', 'Update Patch', 'Announcement', 'Esports', 'Industry', 'Event'];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function NewsCatalogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const currentCategory = category && category !== 'Semua' ? category : undefined;
  const newsList = await getNews({ category: currentCategory });

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Berita Game' }]} />

      <div style={{ margin: '20px 0 30px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
          Berita Game & Update Patch
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 700, fontSize: '1.05rem', lineHeight: 1.6 }}>
          Kabar terbaru dari industri video game global dan lokal, informasi rilis update patch kompetitif, serta perkembangan scene esports terkini.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 24 }}>
        {CATEGORIES.map((cat) => {
          const isActive = (!currentCategory && cat === 'Semua') || currentCategory === cat;
          return (
            <Link
              key={cat}
              href={cat === 'Semua' ? '/news' : `/news?category=${encodeURIComponent(cat)}`}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      <div className="grid-news">
        {newsList.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}

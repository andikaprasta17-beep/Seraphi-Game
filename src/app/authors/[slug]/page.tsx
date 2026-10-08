import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Newspaper, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { getAuthorBySlug, getGuidesByAuthor, getNewsByAuthor } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import GuideCard from '@/components/GuideCard';
import NewsCard from '@/components/NewsCard';
import AdSlot from '@/components/AdSlot';
import { generateSeoTitle, generateSeoDescription, getCanonicalUrl, getSiteUrl } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: 'Penulis Tidak Ditemukan' };

  const title = generateSeoTitle({
    type: 'author',
    title: author.name,
  });

  const description = generateSeoDescription({
    type: 'author',
    title: author.name,
    fallbackText: author.bio,
  });

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/authors/${author.slug}`),
    },
    openGraph: {
      title,
      description,
      type: 'profile',
      images: [{ url: author.avatar, width: 300, height: 300, alt: author.name }],
    },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const [guides, news] = await Promise.all([
    getGuidesByAuthor(author.id || author.slug),
    getNewsByAuthor(author.id || author.slug),
  ]);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    image: author.avatar,
    jobTitle: author.role,
    url: `${getSiteUrl()}/authors/${author.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'SERAPHI GAME',
      url: getSiteUrl(),
    },
  };

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Penulis', href: '/about' },
          { label: author.name },
        ]}
      />

      {/* Author Hero Card */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(20, 24, 38, 0.95), rgba(13, 16, 27, 0.98))',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          borderRadius: 16,
          padding: '36px 32px',
          marginTop: 20,
          marginBottom: 40,
          display: 'flex',
          gap: 28,
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 110,
            height: 110,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--accent-cyan)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
            flexShrink: 0,
          }}
        >
          <img
            src={author.avatar}
            alt={author.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              {author.name}
            </h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                color: 'var(--accent-cyan)',
                padding: '3px 10px',
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={14} /> {author.role}
            </span>
          </div>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.6,
              margin: '0 0 16px 0',
              maxWidth: 750,
            }}
          >
            {author.bio}
          </p>

          <div style={{ display: 'flex', gap: 20, color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={16} color="var(--accent-cyan)" /> {guides.length} Panduan Diterbitkan
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Newspaper size={16} color="var(--accent-purple)" /> {news.length} Artikel Berita
            </span>
          </div>
        </div>
      </section>

      {/* Author Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 40 }}>
        <div>
          {/* Published Guides Section */}
          <section style={{ marginBottom: 48 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: 12,
              }}
            >
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                <BookOpen size={20} color="var(--accent-cyan)" /> Panduan Ditulis oleh {author.name}
              </h2>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{guides.length} Artikel</span>
            </div>

            {guides.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 20,
                }}
              >
                {guides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Belum ada panduan yang diterbitkan oleh penulis ini.
              </p>
            )}
          </section>

          {/* Published News Section */}
          <section>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: 12,
              }}
            >
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Newspaper size={20} color="var(--accent-purple)" /> Berita Ditulis oleh {author.name}
              </h2>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{news.length} Artikel</span>
            </div>

            {news.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 20,
                }}
              >
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Belum ada berita yang diterbitkan oleh penulis ini.
              </p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
              Standar Editorial Seraphi
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Semua konten yang ditulis oleh analis dan kontributor Seraphi Game melalui proses uji mekanik langsung di dalam game dan diverifikasi sebelum dipublikasikan.
            </p>
          </div>

          <AdSlot slotId="sidebar-ad" />
        </aside>
      </div>
    </div>
  );
}

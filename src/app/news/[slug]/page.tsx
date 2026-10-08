import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  User,
  Eye,
  Tag,
  Gamepad2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { getNewsBySlug, getGameById, getNews, getGuides } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsCard from '@/components/NewsCard';
import GuideCard from '@/components/GuideCard';
import ViewTracker from '@/components/ViewTracker';
import {
  generateSeoTitle,
  generateSeoDescription,
  getCanonicalUrl,
  getRobotsDirective,
  getSiteUrl,
} from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item || item.status !== 'PUBLISHED') return { title: 'Berita Tidak Ditemukan' };

  const title = item.meta_title || generateSeoTitle({
    type: 'news',
    title: item.title,
  });

  const description = item.meta_description || generateSeoDescription({
    type: 'news',
    title: item.title,
    fallbackText: item.excerpt,
  });

  const siteUrl = getSiteUrl();
  const ogImageUrl = item.thumbnail || `${siteUrl}/api/og?title=${encodeURIComponent(item.title)}&category=News`;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/news/${item.slug}`),
    },
    robots: getRobotsDirective(item.status, item.no_index, item.is_demo),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: item.published_at || item.created_at,
      modifiedTime: item.updated_at,
      authors: item.author ? [item.author] : [],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: item.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  if (!newsItem || newsItem.status !== 'PUBLISHED') {
    notFound();
  }

  const [game, allRecentNews, allRelatedGuides] = await Promise.all([
    newsItem.game_id ? getGameById(newsItem.game_id) : Promise.resolve(null),
    getNews({ limit: 5 }),
    newsItem.game_id ? getGuides({ gameIdOrSlug: newsItem.game_id, limit: 3 }) : Promise.resolve([]),
  ]);
  const recentNews = allRecentNews.filter((n) => n.id !== newsItem.id).slice(0, 4);
  const relatedGuides = allRelatedGuides;

  const formattedDate = new Date(newsItem.published_at || newsItem.created_at || newsItem.updated_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedUpdatedDate = new Date(newsItem.updated_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const siteUrl = getSiteUrl();

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsItem.title,
    description: newsItem.excerpt,
    image: newsItem.thumbnail,
    datePublished: newsItem.published_at,
    dateModified: newsItem.updated_at,
    author: {
      '@type': 'Person',
      name: newsItem.author,
      ...(newsItem.author_slug ? { url: `${siteUrl}/authors/${newsItem.author_slug}` } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'SERAPHI GAME',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/news/${newsItem.slug}`,
    },
  };

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      {/* Safe Internal View Counter */}
      <ViewTracker type="news" id={newsItem.id} slug={newsItem.slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Berita Game', href: '/news' },
          ...(game ? [{ label: game.name, href: `/games/${game.slug}` }] : []),
          { label: newsItem.title },
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 40, marginTop: 20 }}>
        {/* Main News Content */}
        <article>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
              <span className="news-category-badge" style={{ position: 'static' }}>
                {newsItem.category}
              </span>
              {game && (
                <Link
                  href={`/games/${game.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    background: 'rgba(0, 242, 254, 0.1)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-glow)',
                  }}
                >
                  <Gamepad2 size={13} />
                  <span>{game.name}</span>
                </Link>
              )}
            </div>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1.25, marginBottom: 16 }}>
              {newsItem.title}
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: 16,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={15} color="var(--primary)" />
                Redaksi:{' '}
                {newsItem.author_slug ? (
                  <Link
                    href={`/authors/${newsItem.author_slug}`}
                    style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                  >
                    {newsItem.author}
                  </Link>
                ) : (
                  <strong>{newsItem.author}</strong>
                )}
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={15} />
                Dipublikasikan: {formattedDate}
              </span>

              {/* Dynamic Last Updated (Requirement 21) */}
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={15} color="#10b981" />
                Terakhir diperbarui: {formattedUpdatedDate}
              </span>

              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={15} />
                {(newsItem.views ?? 0).toLocaleString()} dibaca
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              marginBottom: 30,
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={newsItem.thumbnail}
              alt={newsItem.title}
              style={{ width: '100%', height: 'auto', maxHeight: 450, objectFit: 'cover' }}
            />
          </div>

          {/* In-Article Ad Slot */}
          <AdSlot slotId="ad-article-incontent" />

          {/* Article Prose */}
          <div className="prose">
            {newsItem.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {newsItem.tags.length > 0 && (
            <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Tag size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Topik:
                </span>
                {newsItem.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="platform-pill"
                    style={{ fontSize: '0.78rem' }}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Guides for this Game (Requirement 8) */}
          {relatedGuides.length > 0 && (
            <section style={{ marginTop: 40, padding: 20, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <BookOpen size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Panduan Terkait {game?.name}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.slug}`}
                    style={{
                      color: 'var(--primary)',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    ➜ {guide.title}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Ad Slot */}
          <AdSlot slotId="ad-sidebar-1" />

          {/* Recent News */}
          {recentNews.length > 0 && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
                Berita Terkini Lainnya
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {recentNews.map((rn) => (
                  <Link key={rn.id} href={`/news/${rn.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 4 }}>
                      {rn.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {rn.category} • {new Date(rn.published_at || rn.created_at || rn.updated_at).toLocaleDateString('id-ID')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* More News Grid */}
      {recentNews.length > 0 && (
        <section style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 20 }}>
            Berita Terkait
          </h2>
          <div className="grid-news">
            {recentNews.slice(0, 3).map((rn) => (
              <NewsCard key={rn.id} news={rn} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

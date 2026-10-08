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
  HelpCircle,
  Users,
  Package,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { getGuideBySlug, getGameById, getGuides } from '@/lib/db';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import GuideCard from '@/components/GuideCard';
import ViewTracker from '@/components/ViewTracker';
import {
  generateSeoTitle,
  generateSeoDescription,
  getCanonicalUrl,
  generateFaqSchema,
  getRobotsDirective,
  getSiteUrl,
} from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide || guide.status !== 'PUBLISHED') return { title: 'Guide Tidak Ditemukan' };

  const game = guide.game_id ? await getGameById(guide.game_id) : null;

  const title = guide.meta_title || generateSeoTitle({
    type: 'guide',
    title: guide.title,
    gameName: game?.name,
  });

  const description = guide.meta_description || generateSeoDescription({
    type: 'guide',
    title: guide.title,
    gameName: game?.name,
    fallbackText: guide.excerpt,
  });

  const siteUrl = getSiteUrl();
  const ogImageUrl = guide.thumbnail || `${siteUrl}/api/og?title=${encodeURIComponent(guide.title)}&game=${encodeURIComponent(game?.name || '')}&category=Guide`;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/guides/${guide.slug}`),
    },
    robots: getRobotsDirective(guide.status, guide.no_index, guide.is_demo),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: guide.published_at || guide.created_at,
      modifiedTime: guide.updated_at,
      authors: guide.author ? [guide.author] : [],
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: guide.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide || guide.status !== 'PUBLISHED') {
    notFound();
  }

  const [game, guideList] = await Promise.all([
    getGameById(guide.game_id),
    getGuides({ gameIdOrSlug: guide.game_id, limit: 4 }),
  ]);
  const relatedGuides = guideList.filter((g) => g.id !== guide.id).slice(0, 3);

  const formattedDate = new Date(guide.published_at || guide.created_at || guide.updated_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedUpdatedDate = new Date(guide.updated_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const siteUrl = getSiteUrl();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    image: guide.thumbnail,
    datePublished: guide.published_at,
    dateModified: guide.updated_at,
    author: {
      '@type': 'Person',
      name: guide.author,
      ...(guide.author_slug ? { url: `${siteUrl}/authors/${guide.author_slug}` } : {}),
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
      '@id': `${siteUrl}/guides/${guide.slug}`,
    },
  };

  const faqSchema = guide.faq && guide.faq.length > 0 ? generateFaqSchema(guide.faq) : null;

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      {/* Safe Internal View Counter */}
      <ViewTracker type="guides" id={guide.id} slug={guide.slug} />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Conditionally Render FAQ Schema (Requirement 6) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumbs with Schema (Requirement 7) */}
      <Breadcrumbs
        items={[
          { label: 'Panduan & Guide', href: '/guides' },
          ...(game ? [{ label: game.name, href: `/games/${game.slug}` }] : []),
          { label: guide.title },
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 40, marginTop: 20 }}>
        {/* Main Article Content */}
        <article>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
              <span className="guide-category-badge" style={{ position: 'static' }}>
                {guide.category}
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
              {guide.title}
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
              {/* Author link (Requirement 20) */}
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={15} color="var(--primary)" />
                Oleh:{' '}
                {guide.author_slug ? (
                  <Link
                    href={`/authors/${guide.author_slug}`}
                    style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}
                  >
                    {guide.author}
                  </Link>
                ) : (
                  <strong>{guide.author}</strong>
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
                {(guide.views ?? 0).toLocaleString()} pembaca
              </span>
            </div>
          </div>

          {/* Quick Answer / Excerpt Summary (Requirement 5) */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(112, 0, 255, 0.05))',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', marginBottom: 6, textTransform: 'uppercase' }}>
              Ringkasan Singkat / Quick Answer
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
              {guide.excerpt}
            </p>
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
              src={guide.thumbnail}
              alt={guide.title}
              style={{ width: '100%', height: 'auto', maxHeight: 450, objectFit: 'cover' }}
            />
          </div>

          {/* In-Article Ad Slot */}
          <AdSlot slotId="ad-article-incontent" />

          {/* Article Prose Content */}
          <div className="prose">
            {guide.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h2 key={index}>{paragraph.replace('# ', '')}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index}>
                    {paragraph.split('\n').map((li, i) => (
                      <li key={i}>{li.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ')) {
                return (
                  <ol key={index}>
                    {paragraph.split('\n').map((li, i) => (
                      <li key={i}>{li.replace(/^\d+\.\s+/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* FAQ Section (Requirement 6) */}
          {guide.faq && guide.faq.length > 0 && (
            <section style={{ marginTop: 40, marginBottom: 30 }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <HelpCircle size={20} color="var(--primary)" />
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {guide.faq.map((item, idx) => (
                  <details
                    key={idx}
                    open={idx === 0}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 18px',
                    }}
                  >
                    <summary style={{ fontWeight: 700, color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>
                      {item.question}
                    </summary>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: '12px 0 0 0' }}>
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Characters Badge List (Requirement 8) */}
          {guide.related_characters && guide.related_characters.length > 0 && game && (
            <div style={{ marginTop: 30, padding: 16, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                <Users size={16} color="var(--primary)" /> Karakter Terkait:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {guide.related_characters.map((charSlug) => (
                  <Link
                    key={charSlug}
                    href={`/games/${game.slug}/characters/${charSlug}`}
                    className="platform-pill"
                    style={{ textDecoration: 'none', borderColor: 'var(--border-glow)', color: 'var(--primary)' }}
                  >
                    ➜ {charSlug.replace('-', ' ').toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Items Badge List (Requirement 8) */}
          {guide.related_items && guide.related_items.length > 0 && game && (
            <div style={{ marginTop: 16, padding: 16, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                <Package size={16} color="#fbbf24" /> Senjata / Item Terkait:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {guide.related_items.map((itemSlug) => (
                  <Link
                    key={itemSlug}
                    href={`/games/${game.slug}/items`}
                    className="platform-pill"
                    style={{ textDecoration: 'none', borderColor: 'rgba(251, 191, 36, 0.4)', color: '#fbbf24' }}
                  >
                    ➜ {itemSlug.replace('-', ' ').toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {guide.tags.length > 0 && (
            <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Tag size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Topik Terkait:
                </span>
                {guide.tags.map((tag) => (
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
        </article>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Related Game Box */}
          {game && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                Database {game.name}
              </h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={game.cover_image}
                  alt={game.name}
                  style={{ width: 60, height: 80, borderRadius: 6, objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>{game.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Rating: {game.rating} ★</div>
                  <Link
                    href={`/games/${game.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: 8, display: 'inline-flex' }}
                  >
                    Buka Hub Game
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Ad Slot */}
          <AdSlot slotId="ad-sidebar-1" />

          {/* Related Guides in Sidebar */}
          {relatedGuides.length > 0 && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
                Guide Terkait
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {relatedGuides.map((rg) => (
                  <Link key={rg.id} href={`/guides/${rg.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 4 }}>
                      {rg.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {rg.category} • {new Date(rg.published_at || rg.created_at || rg.updated_at).toLocaleDateString('id-ID')}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* More Guides Recommendation Grid */}
      {relatedGuides.length > 0 && (
        <section style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 20 }}>
            Rekomendasi Panduan Selanjutnya
          </h2>
          <div className="grid-cards">
            {relatedGuides.map((rg) => (
              <GuideCard key={rg.id} guide={rg} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

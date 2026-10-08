import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Gift,
  BookOpen,
  Users,
  Calendar,
  Sparkles,
  Newspaper,
  Trophy,
} from 'lucide-react';
import {
  getGameBySlug,
  getCharacters,
  getGuides,
  getRedeemCodes,
  getEvents,
  getNews,
  getTierLists,
} from '@/lib/db';
import CharacterCard from '@/components/CharacterCard';
import GuideCard from '@/components/GuideCard';
import RedeemCodeCard from '@/components/RedeemCodeCard';
import EventCard from '@/components/EventCard';
import NewsCard from '@/components/NewsCard';
import AdSlot from '@/components/AdSlot';
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
  const game = await getGameBySlug(slug);
  if (!game) return { title: 'Game Tidak Ditemukan' };

  const title = game.meta_title || generateSeoTitle({
    type: 'game',
    title: game.name,
  });

  const description = game.meta_description || generateSeoDescription({
    type: 'game',
    title: game.name,
    fallbackText: game.description,
  });

  const siteUrl = getSiteUrl();
  const ogImageUrl = game.cover_image || `${siteUrl}/api/og?title=${encodeURIComponent(game.name)}&game=${encodeURIComponent(game.name)}&category=Database`;

  return {
    title,
    description,
    alternates: {
      canonical: getCanonicalUrl(`/games/${game.slug}`),
    },
    robots: getRobotsDirective(game.status as any, game.no_index, game.is_demo),
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: game.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function GameOverviewPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const [charactersRaw, guides, redeemCodesRaw, eventsRaw, newsItems, tierLists] = await Promise.all([
    getCharacters(game.id),
    getGuides({ gameIdOrSlug: game.id, limit: 3 }),
    getRedeemCodes(game.id),
    getEvents({ gameId: game.id }),
    getNews({ gameIdOrSlug: game.id, limit: 3 }),
    getTierLists(game.id),
  ]);

  const characters = charactersRaw.slice(0, 6);
  const redeemCodes = redeemCodesRaw.filter((c) => c.status === 'ACTIVE').slice(0, 3);
  const events = eventsRaw.slice(0, 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Safe Internal View Counter */}
      <ViewTracker type="games" id={game.id} slug={game.slug} />
      {/* Game Description & Overview */}
      <section
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
        }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} color="var(--primary)" />
          Tentang {game.name}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>
          {game.description}
        </p>
      </section>

      {/* Active Redeem Codes Spotlight */}
      {redeemCodes.length > 0 && (
        <section>
          <div className="section-header">
            <div className="section-title-wrap">
              <Gift size={20} color="#fbbf24" />
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                Kode Redeem Aktif {game.name}
              </h2>
            </div>
            <Link href={`/games/${game.slug}/redeem-codes`} className="section-view-all">
              <span>Semua Kode ({redeemCodesRaw.length})</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards">
            {redeemCodes.map((code) => (
              <RedeemCodeCard
                key={code.id}
                id={code.id}
                game_id={code.game_id}
                game_name={game.name}
                game_slug={game.slug}
                code={code.code}
                reward={code.reward}
                status={code.status}
                last_checked={code.last_checked}
                source={code.source}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Characters Preview */}
      {characters.length > 0 && (
        <section>
          <div className="section-header">
            <div className="section-title-wrap">
              <Users size={20} color="var(--primary)" />
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                Database Karakter & Hero Populer
              </h2>
            </div>
            <Link href={`/games/${game.slug}/characters`} className="section-view-all">
              <span>Semua Karakter</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} gameSlug={game.slug} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Guides Preview */}
      {guides.length > 0 && (
        <section>
          <div className="section-header">
            <div className="section-title-wrap">
              <BookOpen size={20} color="var(--secondary)" />
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                Panduan & Build Terpopuler
              </h2>
            </div>
            <Link href={`/games/${game.slug}/guides`} className="section-view-all">
              <span>Semua Guide</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Latest News Preview */}
      {newsItems.length > 0 && (
        <section>
          <div className="section-header">
            <div className="section-title-wrap">
              <Newspaper size={20} color="var(--accent-purple)" />
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                Berita & Update Terkini
              </h2>
            </div>
            <Link href={`/games/${game.slug}/news`} className="section-view-all">
              <span>Semua Berita</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards">
            {newsItems.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </section>
      )}

      {/* Tier List Preview */}
      {tierLists.length > 0 && (
        <section>
          <div className="section-header">
            <div className="section-title-wrap">
              <Trophy size={20} color="#eab308" />
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                Tier List {game.name}
              </h2>
            </div>
            <Link href={`/games/${game.slug}/tier-list`} className="section-view-all">
              <span>Lihat Tier List Lengkap</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, rgba(20, 24, 38, 0.9), rgba(13, 16, 27, 0.95))',
              border: '1px solid rgba(234, 179, 8, 0.25)',
              borderRadius: 14,
              padding: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 6px 0', color: '#fff' }}>
                {tierLists[0].title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 8px 0' }}>
                {tierLists[0].description}
              </p>
              <span style={{ fontSize: '0.8rem', color: '#eab308', fontWeight: 600 }}>
                Versi: {tierLists[0].version} • Terakhir Diperbarui: {new Date(tierLists[0].updated_at).toLocaleDateString('id-ID')}
              </span>
            </div>

            <Link
              href={`/games/${game.slug}/tier-list`}
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.9rem' }}
            >
              Cek Ranking Meta
            </Link>
          </div>
        </section>
      )}

      {/* Ad Slot */}
      <AdSlot slotId="ad-article-incontent" />

      {/* Events Preview */}
      {events.length > 0 && (
        <section>
          <div className="section-header">
            <div className="section-title-wrap">
              <Calendar size={20} color="#10b981" />
              <h2 className="section-title" style={{ fontSize: '1.3rem' }}>
                Event & Aktivitas Terkini
              </h2>
            </div>
            <Link href={`/games/${game.slug}/events`} className="section-view-all">
              <span>Semua Event</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles, BookOpen, Newspaper, Gift, Calendar, Trophy } from 'lucide-react';
import { getGames, getNews, getGuides, getRedeemCodes, getEvents } from '@/lib/db';
import GameCard from '@/components/GameCard';
import NewsCard from '@/components/NewsCard';
import GuideCard from '@/components/GuideCard';
import RedeemCodeCard from '@/components/RedeemCodeCard';
import EventCard from '@/components/EventCard';
import AdSlot from '@/components/AdSlot';
import { getCanonicalUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
};

export default async function HomePage() {
  const [games, news, guides, redeemCodes, events] = await Promise.all([
    getGames(),
    getNews({ limit: 6 }),
    getGuides({ limit: 6 }),
    getRedeemCodes(),
    getEvents(),
  ]);
  const activeCodes = redeemCodes.slice(0, 6);
  const activeEvents = events.slice(0, 4);

  // Top featured game for the Hero
  const featuredGame = games[0] || null;

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div
            className="hero-banner"
            style={{
              backgroundImage: featuredGame
                ? `url(${featuredGame.banner_image})`
                : 'linear-gradient(135deg, #111827 0%, #1e1b4b 100%)',
            }}
          >
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="hero-tag">
                <Flame size={16} />
                <span>Game Terpopuler Minggu Ini</span>
              </div>
              <h1 className="hero-title">
                {featuredGame ? featuredGame.name : 'Dunia Gaming Indonesia'}
              </h1>
              <p className="hero-desc">
                {featuredGame
                  ? featuredGame.description
                  : 'Temukan database karakter terlengkap, panduan build meta, kode redeem terverifikasi, dan berita game terbaru setiap hari.'}
              </p>
              <div className="hero-actions">
                {featuredGame && (
                  <Link href={`/games/${featuredGame.slug}`} className="btn btn-primary">
                    <span>Eksplorasi {featuredGame.name}</span>
                    <ArrowRight size={18} />
                  </Link>
                )}
                <Link href="/guides" className="btn btn-secondary">
                  <BookOpen size={18} />
                  <span>Jelajahi Guide & Build</span>
                </Link>
                <Link href="/redeem-codes" className="btn btn-secondary">
                  <Gift size={18} />
                  <span>Klaim Kode Redeem</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot Top */}
      <div className="container">
        <AdSlot slotId="ad-home-top" />
      </div>

      {/* 2. Popular Games Grid */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-indicator" />
              <h2 className="section-title">Database Game Populer</h2>
            </div>
            <Link href="/games" className="section-view-all">
              <span>Semua Game</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-games">
            {games.slice(0, 10).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Latest Guides & Character Builds */}
      <section style={{ padding: '40px 0', background: 'rgba(13, 17, 27, 0.4)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-indicator" />
              <h2 className="section-title">Panduan & Build Karakter Terbaru</h2>
            </div>
            <Link href="/guides" className="section-view-all">
              <span>Semua Guide</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest News */}
      <section style={{ padding: '50px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-indicator" />
              <h2 className="section-title">Berita Game & Update Patch</h2>
            </div>
            <Link href="/news" className="section-view-all">
              <span>Semua Berita</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-news">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Redeem Codes Hub */}
      <section style={{ padding: '50px 0', background: 'rgba(13, 17, 27, 0.6)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-indicator" style={{ background: 'var(--gradient-gold)' }} />
              <div>
                <h2 className="section-title">Kode Redeem Terbaru</h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Salin instan kode hadiah aktif yang telah diverifikasi oleh tim editor Seraphi Game.
                </p>
              </div>
            </div>
            <Link href="/redeem-codes" className="section-view-all">
              <span>Lihat Semua Kode</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards">
            {activeCodes.map((code) => (
              <RedeemCodeCard
                key={code.id}
                id={code.id}
                game_id={code.game_id}
                game_name={code.game_name}
                game_slug={code.game_slug}
                code={code.code}
                reward={code.reward}
                status={code.status}
                last_checked={code.last_checked}
                source={code.source}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events */}
      <section style={{ padding: '50px 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-indicator" style={{ background: 'var(--gradient-brand)' }} />
              <h2 className="section-title">Kalender Event Game</h2>
            </div>
            <Link href="/events" className="section-view-all">
              <span>Semua Event</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-cards">
            {activeEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tier List CTA Section */}
      <section style={{ padding: '30px 0 60px' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16, 22, 36, 0.9) 0%, rgba(26, 17, 50, 0.9) 100%)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fbbf24', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 8 }}>
                <Trophy size={18} />
                <span>Meta Analysis & Tier List</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: 8 }}>
                Karakter Mana yang Paling Kuat di Meta Saat Ini?
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 650, lineHeight: 1.6 }}>
                Simak evaluasi performa karakter terlengkap untuk Genshin Impact, Honkai Star Rail, Mobile Legends, dan game lainnya yang diperbarui berkala.
              </p>
            </div>
            <Link href="/tier-list" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <span>Buka Tier List Lengkap</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

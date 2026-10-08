import React from 'react';
import Link from 'next/link';
import { Flame, Gift, Calendar, Trophy, ArrowRight, Star, Users, MessageSquare } from 'lucide-react';
import { getGames, getRedeemCodes, getEvents, getTierLists } from '@/lib/db';
import SidebarCopyButton from './SidebarCopyButton';

interface GamingSidebarProps {
  hideGames?: boolean;
  hideRedeemCodes?: boolean;
  hideEvents?: boolean;
  hideTierList?: boolean;
  className?: string;
}

export default async function GamingSidebar({
  hideGames = false,
  hideRedeemCodes = false,
  hideEvents = false,
  hideTierList = false,
  className = '',
}: GamingSidebarProps) {
  // Fetch data in parallel for optimal performance
  const [games, codes, events, tierLists] = await Promise.all([
    hideGames ? Promise.resolve([]) : getGames().catch(() => []),
    hideRedeemCodes ? Promise.resolve([]) : getRedeemCodes().catch(() => []),
    hideEvents ? Promise.resolve([]) : getEvents().catch(() => []),
    hideTierList ? Promise.resolve([]) : getTierLists().catch(() => []),
  ]);

  const trendingGames = games.slice(0, 4);
  const activeCodes = codes.filter((c) => c.status === 'ACTIVE').slice(0, 3);
  const activeEvents = events.slice(0, 3);

  // Extract SS tier characters from tier lists
  const metaSpotlightChars: Array<{ name: string; portrait: string; game: string; tier: string; slug: string; gameSlug?: string }> = [];
  tierLists.forEach((tl) => {
    const ssTier = tl.tiers?.find((t) => t.tier === 'SS' || t.tier === 'S');
    if (ssTier && ssTier.characters) {
      ssTier.characters.slice(0, 2).forEach((char) => {
        if (metaSpotlightChars.length < 3 && !metaSpotlightChars.some((c) => c.name === char.name)) {
          metaSpotlightChars.push({
            name: char.name,
            portrait: char.portrait,
            game: tl.game_name || 'Game',
            tier: ssTier.tier,
            slug: char.slug,
            gameSlug: tl.game_slug,
          });
        }
      });
    }
  });

  return (
    <div className={`gaming-sidebar ${className}`}>
      {/* 1. Trending Games Widget */}
      {!hideGames && trendingGames.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header">
            <h3 className="sidebar-widget-title">
              <Flame size={16} color="var(--primary)" />
              <span>Trending Games</span>
            </h3>
            <Link href="/games" className="sidebar-widget-action">
              <span>Semua</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="sidebar-list">
            {trendingGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="sidebar-game-item"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={game.cover_image || game.banner_image}
                  alt={game.name}
                  className="sidebar-game-thumb"
                  loading="lazy"
                />
                <div className="sidebar-game-info">
                  <span className="sidebar-game-name">{game.name}</span>
                  <span className="sidebar-game-genre">
                    {game.genres?.slice(0, 2).join(' • ') || 'Action RPG'}
                  </span>
                  <div className="sidebar-game-rating">
                    <Star size={11} fill="#fbbf24" color="#fbbf24" />
                    <span>{game.rating ? game.rating.toFixed(1) : '4.8'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. Fast Redeem Codes Widget */}
      {!hideRedeemCodes && activeCodes.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header">
            <h3 className="sidebar-widget-title">
              <Gift size={16} color="#fbbf24" />
              <span>Kode Redeem Kilat</span>
            </h3>
            <Link href="/redeem-codes" className="sidebar-widget-action">
              <span>Semua</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="sidebar-list">
            {activeCodes.map((code) => (
              <div key={code.id} className="sidebar-code-item">
                <div className="sidebar-code-top">
                  <span className="sidebar-code-game">{code.game_name}</span>
                  <SidebarCopyButton code={code.code} gameName={code.game_name} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <code className="sidebar-code-badge">{code.code}</code>
                </div>
                <p className="sidebar-code-reward">{code.reward}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Meta Tier SS Spotlight Widget */}
      {!hideTierList && metaSpotlightChars.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header">
            <h3 className="sidebar-widget-title">
              <Trophy size={16} color="#ef4444" />
              <span>Meta SS-Tier</span>
            </h3>
            <Link href="/tier-list" className="sidebar-widget-action">
              <span>Tier List</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="sidebar-meta-grid">
            {metaSpotlightChars.map((char) => (
              <Link
                key={char.slug}
                href={char.gameSlug ? `/games/${char.gameSlug}/characters/${char.slug}` : `/tier-list`}
                className="sidebar-meta-char"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={char.portrait}
                  alt={char.name}
                  className="sidebar-meta-avatar"
                  loading="lazy"
                />
                <span className="sidebar-meta-name">{char.name}</span>
                <span className="sidebar-meta-badge">Tier {char.tier}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 4. Active Events Calendar Widget */}
      {!hideEvents && activeEvents.length > 0 && (
        <div className="sidebar-widget">
          <div className="sidebar-widget-header">
            <h3 className="sidebar-widget-title">
              <Calendar size={16} color="#3b82f6" />
              <span>Event Sedang Berlangsung</span>
            </h3>
            <Link href="/events" className="sidebar-widget-action">
              <span>Jadwal</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="sidebar-list">
            {activeEvents.map((evt) => (
              <Link
                key={evt.id}
                href={evt.game_slug ? `/games/${evt.game_slug}/events` : `/events`}
                className="sidebar-event-item"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className={`sidebar-event-status ${
                      evt.status === 'ACTIVE' ? 'live' : 'upcoming'
                    }`}
                  >
                    ● {evt.status === 'ACTIVE' ? 'Live' : 'Upcoming'}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {evt.game_name}
                  </span>
                </div>
                <h4 className="sidebar-event-title">{evt.title}</h4>
                <span className="sidebar-event-date">
                  {new Date(evt.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {new Date(evt.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. Seraphi Community Card */}
      <div className="sidebar-community-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(88, 101, 242, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Users size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff' }}>Komunitas Seraphi</h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Diskusi & Mabar Gaming</span>
          </div>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Dapatkan bocoran update patch, redeem code tercepat, dan tips build eksklusif dari sesama gamer.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <Link
            href="/contact"
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, fontSize: '0.76rem', padding: '6px 10px', justifyContent: 'center' }}
          >
            <MessageSquare size={13} />
            <span>Kontak Kami</span>
          </Link>
          <Link
            href="/about"
            className="btn btn-primary btn-sm"
            style={{ flex: 1, fontSize: '0.76rem', padding: '6px 10px', justifyContent: 'center' }}
          >
            <span>Tentang Kami</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Star, ExternalLink, Calendar, Building } from 'lucide-react';
import { Game } from '@/lib/types';

interface GameHubHeaderProps {
  game: Game;
}

export default function GameHubHeader({ game }: GameHubHeaderProps) {
  const pathname = usePathname();

  const tabs = [
    { label: 'Overview', href: `/games/${game.slug}` },
    { label: 'Characters', href: `/games/${game.slug}/characters` },
    { label: 'Guides & Builds', href: `/games/${game.slug}/guides` },
    { label: 'Items & Weapons', href: `/games/${game.slug}/items` },
    { label: 'Tier List', href: `/games/${game.slug}/tier-list` },
    { label: 'Redeem Codes', href: `/games/${game.slug}/redeem-codes` },
    { label: 'Events', href: `/games/${game.slug}/events` },
    { label: 'News', href: `/games/${game.slug}/news` },
  ];

  const isTabActive = (href: string) => {
    if (href === `/games/${game.slug}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className="game-hub-header"
      style={{
        backgroundImage: `url(${game.banner_image})`,
      }}
    >
      <div className="game-hub-overlay" />
      <div className="container">
        <div className="game-hub-content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.cover_image}
            alt={game.name}
            className="game-hub-cover"
          />

          <div className="game-hub-details">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span className="game-status-badge">{game.status}</span>
              <div className="game-rating-badge" style={{ position: 'static' }}>
                <Star size={12} fill="#fbbf24" color="#fbbf24" />
                <span>{game.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            <h1 className="game-hub-title">{game.name}</h1>

            <div className="game-hub-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Building size={14} />
                {game.developer} ({game.publisher})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={14} />
                Rilis: {new Date(game.release_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              {game.official_url && (
                <a
                  href={game.official_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)' }}
                >
                  <ExternalLink size={14} />
                  Situs Resmi
                </a>
              )}
            </div>

            <div className="game-meta-tags">
              {game.genres.map((g) => (
                <span key={g} className="platform-pill" style={{ borderColor: 'var(--border-glow)' }}>
                  {g}
                </span>
              ))}
              {game.platforms.map((p) => (
                <span key={p} className="platform-pill">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="game-hub-tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`game-tab ${isTabActive(tab.href) ? 'active' : ''}`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

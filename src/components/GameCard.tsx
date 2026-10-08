import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Game } from '@/lib/types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.slug}`} className="game-card">
      <div className="game-cover-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={game.cover_image}
          alt={`Cover game ${game.name}`}
          className="game-cover-img"
          loading="lazy"
        />
        <div className="game-rating-badge">
          <Star size={12} fill="#fbbf24" color="#fbbf24" />
          <span>{game.rating.toFixed(1)}</span>
        </div>
        <div className="game-status-badge">{game.status}</div>
      </div>

      <div className="game-info">
        <h3 className="game-title" title={game.name}>
          {game.name}
        </h3>
        <p className="game-genre">
          {game.genres.slice(0, 2).join(' • ')}
        </p>

        <div className="game-meta-tags">
          {game.platforms.slice(0, 3).map((plat) => (
            <span key={plat} className="platform-pill">
              {plat}
            </span>
          ))}
          {game.platforms.length > 3 && (
            <span className="platform-pill">+{game.platforms.length - 3}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

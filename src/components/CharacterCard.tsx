import React from 'react';
import Link from 'next/link';
import { Character } from '@/lib/types';

interface CharacterCardProps {
  character: Character;
  gameSlug?: string;
}

export default function CharacterCard({ character, gameSlug }: CharacterCardProps) {
  // If gameSlug is not provided directly, we can use the character's game_id
  const targetGameSlug = gameSlug || character.game_id.replace('game-', '');

  return (
    <Link
      href={`/games/${targetGameSlug}/characters/${character.slug}`}
      className="character-card"
    >
      <div className="char-portrait-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={character.portrait}
          alt={`Potret karakter ${character.name}`}
          className="char-portrait-img"
          loading="lazy"
        />
        <div className="char-rarity">
          {'★'.repeat(character.rarity)}
        </div>
        <div className="char-element-badge">
          {character.element}
        </div>
      </div>

      <div className="char-info">
        <h4 className="char-name">{character.name}</h4>
        <p className="char-role">
          {character.role} • {character.weapon}
        </p>
      </div>
    </Link>
  );
}

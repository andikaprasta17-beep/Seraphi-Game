import React from 'react';
import Link from 'next/link';
import { getCharacters, getGames } from '@/lib/db';
import { ExternalLink, Star } from 'lucide-react';

export default async function AdminCharactersPage() {
  const [characters, games] = await Promise.all([getCharacters(undefined, false), getGames()]);

  const getGameSlug = (gameId: string) => {
    const found = games.find((g) => g.id === gameId);
    return found ? found.slug : 'game';
  };

  const getGameName = (gameId: string) => {
    const found = games.find((g) => g.id === gameId);
    return found ? found.name : gameId;
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
          Database Karakter & Hero
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
          Daftar {characters.length} karakter terdaftar dalam database Seraphi Game lengkap dengan data elemen, role, build, dan senjata.
        </p>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Potret</th>
            <th>Nama Karakter</th>
            <th>Game</th>
            <th>Elemen</th>
            <th>Role</th>
            <th>Rarity</th>
            <th>Senjata</th>
            <th style={{ textAlign: 'right' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => {
            const gameSlug = getGameSlug(char.game_id);
            return (
              <tr key={char.id}>
                <td>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={char.portrait}
                    alt={char.name}
                    style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 800, color: '#fff' }}>{char.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {char.slug}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {getGameName(char.game_id)}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      background: 'rgba(0, 242, 254, 0.1)',
                      color: 'var(--primary)',
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {char.element}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {char.role}
                  </span>
                </td>
                <td>
                  <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                    {'★'.repeat(char.rarity)}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {char.weapon}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    href={`/games/${gameSlug}/characters/${char.slug}`}
                    target="_blank"
                    className="btn btn-secondary btn-sm"
                    title="Lihat Halaman Build"
                  >
                    <ExternalLink size={14} />
                    <span>Lihat Build</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Game } from '@/lib/types';
import { Plus, Trash2, ExternalLink, Star } from 'lucide-react';

export default function AdminGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [developer, setDeveloper] = useState('');
  const [publisher, setPublisher] = useState('');
  const [rating, setRating] = useState('4.8');
  const [genres, setGenres] = useState('Action RPG, Gacha');
  const [platforms, setPlatforms] = useState('PC, Android, iOS');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [officialUrl, setOfficialUrl] = useState('');

  const fetchGames = async () => {
    try {
      const res = await fetch('/api/admin/games');
      const data = await res.json();
      if (res.ok) {
        setGames(data.games || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          developer,
          publisher,
          rating: parseFloat(rating),
          genres: genres.split(',').map((s) => s.trim()).filter(Boolean),
          platforms: platforms.split(',').map((s) => s.trim()).filter(Boolean),
          description,
          cover_image: coverImage || '/images/placeholder-game.svg',
          banner_image: bannerImage || '/images/placeholder-game.svg',
          official_url: officialUrl,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        // Reset form
        setName('');
        setSlug('');
        setDescription('');
        fetchGames();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menambahkan game');
      }
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGame = async (id: string, gameName: string) => {
    if (!confirm(`Hapus game "${gameName}" dari database?`)) return;
    try {
      const res = await fetch(`/api/admin/games?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGames((prev) => prev.filter((g) => g.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus game');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
            Manajemen Database Game
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
            Kelola katalog game, judul, slug SEO, cover, banner, dan platform yang didukung.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Tambah Game Baru</span>
        </button>
      </div>

      {/* Table of Games */}
      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat data game...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Nama & Slug</th>
              <th>Pengembang</th>
              <th>Platform</th>
              <th>Genre</th>
              <th>Rating</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.cover_image}
                    alt={game.name}
                    style={{ width: 44, height: 60, borderRadius: 6, objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 800, color: '#fff' }}>{game.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    /games/{game.slug}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{game.developer}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{game.publisher}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 160 }}>
                    {game.platforms.map((p) => (
                      <span key={p} className="platform-pill" style={{ fontSize: '0.65rem' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {game.genres.join(', ')}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#fbbf24', fontWeight: 800 }}>
                    <Star size={13} fill="#fbbf24" />
                    <span>{game.rating}</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <a
                      href={`/games/${game.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                      title="Lihat di Portal"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDeleteGame(game.id, game.name)}
                      className="btn btn-sm"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                      title="Hapus Game"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Game Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              maxWidth: 600,
              width: '100%',
              padding: 28,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              Tambah Game Baru ke Database
            </h2>

            <form onSubmit={handleCreateGame}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Nama Game *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: Zenless Zone Zero"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug URL *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="zenless-zone-zero"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Developer</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="HoYoverse"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Publisher</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="HoYoverse"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Genre (pisahkan koma)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Action RPG, Gacha"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Platform (pisahkan koma)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PC, Android, iOS"
                    value={platforms}
                    onChange={(e) => setPlatforms(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Singkat Game</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Deskripsi game berbahasa Indonesia..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">URL Cover Gambar</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">URL Banner Header</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
                  {submitting ? 'Menyimpan...' : 'Simpan Game'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Guide, Game, ContentStatus } from '@/lib/types';
import { Plus, Trash2, ExternalLink, CheckCircle } from 'lucide-react';

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [gameId, setGameId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Character Build');
  const [author, setAuthor] = useState('Seraphi Editorial');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [status, setStatus] = useState<ContentStatus>('PUBLISHED');

  const fetchData = async () => {
    try {
      const [guidesRes, gamesRes] = await Promise.all([
        fetch('/api/admin/guides'),
        fetch('/api/admin/games'),
      ]);
      const guidesData = await guidesRes.json();
      const gamesData = await gamesRes.json();

      if (guidesRes.ok) setGuides(guidesData.guides || []);
      if (gamesRes.ok) {
        setGames(gamesData.games || []);
        if (gamesData.games?.length > 0 && !gameId) {
          setGameId(gamesData.games[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleStatusChange = async (guideId: string, newStatus: ContentStatus) => {
    try {
      const res = await fetch('/api/admin/guides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: guideId, status: newStatus }),
      });
      if (res.ok) {
        setGuides((prev) =>
          prev.map((g) => (g.id === guideId ? { ...g, status: newStatus } : g))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          title,
          slug,
          category,
          author,
          excerpt,
          content,
          thumbnail: thumbnail || '/images/placeholder-guide.svg',
          status,
          tags: [category],
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setTitle('');
        setSlug('');
        setExcerpt('');
        setContent('');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menambahkan guide');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGuide = async (id: string, guideTitle: string) => {
    if (!confirm(`Hapus panduan "${guideTitle}"?`)) return;
    try {
      const res = await fetch(`/api/admin/guides?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGuides((prev) => prev.filter((g) => g.id !== id));
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
            Manajemen Panduan & Guide
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
            Kelola alur publikasi (Draft, Review, Published, Archived), kategori, dan isi artikel.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Tulis Panduan Baru</span>
        </button>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat data...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul & Slug</th>
              <th>Kategori</th>
              <th>Penulis</th>
              <th>Status Alur</th>
              <th>Views</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide) => (
              <tr key={guide.id}>
                <td>
                  <div style={{ fontWeight: 800, color: '#fff', maxWidth: 360 }}>{guide.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    /guides/{guide.slug}
                  </div>
                </td>
                <td>
                  <span className="guide-category-badge" style={{ position: 'static', display: 'inline-block' }}>
                    {guide.category}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{guide.author}</span>
                </td>
                <td>
                  <select
                    className="form-control"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      width: 'auto',
                      color:
                        guide.status === 'PUBLISHED'
                          ? '#10b981'
                          : guide.status === 'DRAFT'
                          ? '#f59e0b'
                          : guide.status === 'REVIEW'
                          ? '#3b82f6'
                          : '#94a3b8',
                    }}
                    value={guide.status}
                    onChange={(e) => handleStatusChange(guide.id, e.target.value as ContentStatus)}
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </td>
                <td>{(guide.views ?? 0).toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <a
                      href={`/guides/${guide.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                      title="Lihat Halaman Publik"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDeleteGuide(guide.id, guide.title)}
                      className="btn btn-sm"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                      title="Hapus Guide"
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

      {/* Add Guide Modal */}
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
              maxWidth: 700,
              width: '100%',
              padding: 28,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              Tulis Panduan / Guide Baru
            </h2>

            <form onSubmit={handleCreateGuide}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Game Terkait *</label>
                  <select
                    className="form-control"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    required
                  >
                    {games.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kategori *</label>
                  <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Character Build">Character Build</option>
                    <option value="Beginner Guide">Beginner Guide</option>
                    <option value="Walkthrough">Walkthrough</option>
                    <option value="Boss Guide">Boss Guide</option>
                    <option value="Tips & Tricks">Tips & Tricks</option>
                    <option value="Farming Guide">Farming Guide</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Judul Panduan *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: Build Neuvillette Terbaik: Senjata & Artefak"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Slug URL *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Status Alur</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ContentStatus)}
                  >
                    <option value="PUBLISHED">PUBLISHED (Langsung Tayang)</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="REVIEW">REVIEW</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Ringkasan 1-2 kalimat untuk meta description..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Isi Konten Artikel (Markdown Format)</label>
                <textarea
                  className="form-control"
                  rows={6}
                  placeholder="Gunakan # Judul, ## Subjudul, dan paragraf..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
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
                  {submitting ? 'Menyimpan...' : 'Simpan Guide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

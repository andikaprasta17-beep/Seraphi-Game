'use client';

import React, { useState, useEffect } from 'react';
import { News, Game, ContentStatus } from '@/lib/types';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [gameId, setGameId] = useState('');
  const [category, setCategory] = useState('Update Patch');
  const [author, setAuthor] = useState('Redaksi Seraphi');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<ContentStatus>('PUBLISHED');

  const fetchData = async () => {
    try {
      const [newsRes, gamesRes] = await Promise.all([
        fetch('/api/admin/news'),
        fetch('/api/admin/games'),
      ]);
      const newsData = await newsRes.json();
      const gamesData = await gamesRes.json();

      if (newsRes.ok) setNewsList(newsData.news || []);
      if (gamesRes.ok) setGames(gamesData.games || []);
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

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          game_id: gameId || null,
          category,
          author,
          excerpt,
          content,
          status,
          tags: [category],
          thumbnail: '/images/placeholder-news.svg',
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
        alert(data.error || 'Gagal menambahkan berita');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setNewsList((prev) =>
          prev.map((n) => (n.id === id ? { ...n, status: newStatus as any } : n))
        );
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal mengubah status');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteNews = async (id: string, newsTitle: string) => {
    if (!confirm(`Hapus berita "${newsTitle}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNewsList((prev) => prev.filter((n) => n.id !== id));
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
            Manajemen Berita Game
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
            Terbitkan artikel berita, info update patch, turnamen esports, dan pengumuman publisher.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Tulis Berita Baru</span>
        </button>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat berita...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul & Slug</th>
              <th>Kategori</th>
              <th>Penulis</th>
              <th>Status</th>
              <th>Views</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ fontWeight: 800, color: '#fff', maxWidth: 360 }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    /news/{item.slug}
                  </div>
                </td>
                <td>
                  <span className="news-category-badge" style={{ position: 'static', display: 'inline-block' }}>
                    {item.category}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.author}</span>
                </td>
                <td>
                  <select
                    className="form-control"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      width: 'auto',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color:
                        item.status === 'PUBLISHED'
                          ? '#10b981'
                          : item.status === 'REVIEW'
                          ? '#3b82f6'
                          : item.status === 'DRAFT'
                          ? '#f59e0b'
                          : '#94a3b8',
                    }}
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </td>
                <td>{(item.views ?? 0).toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <a
                      href={`/news/${item.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                      title="Lihat Berita"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDeleteNews(item.id, item.title)}
                      className="btn btn-sm"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                      title="Hapus Berita"
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

      {/* Add News Modal */}
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
              Terbitkan Berita Game Baru
            </h2>

            <form onSubmit={handleCreateNews}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Game Terkait (Opsional)</label>
                  <select
                    className="form-control"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                  >
                    <option value="">Umum / Industri Game</option>
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
                    <option value="Update Patch">Update Patch</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Esports">Esports</option>
                    <option value="Industry">Industry</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Judul Berita *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: Genshin Impact Versi Baru Resmi Diumumkan..."
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
                    <option value="PUBLISHED">PUBLISHED (Tayang)</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ringkasan (Excerpt)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Ringkasan singkat berita..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Isi Berita</label>
                <textarea
                  className="form-control"
                  rows={6}
                  placeholder="Tuliskan berita lengkap..."
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
                  {submitting ? 'Menyimpan...' : 'Terbitkan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

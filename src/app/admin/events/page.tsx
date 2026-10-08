'use client';

import React, { useState, useEffect } from 'react';
import { EventItem, Game } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<(EventItem & { game_name?: string })[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [gameId, setGameId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rewards, setRewards] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]);
  const [status, setStatus] = useState<'ACTIVE' | 'UPCOMING' | 'ENDED'>('ACTIVE');
  const [officialUrl, setOfficialUrl] = useState('');

  const fetchData = async () => {
    try {
      const [eventsRes, gamesRes] = await Promise.all([
        fetch('/api/admin/events'),
        fetch('/api/admin/games'),
      ]);
      const eventsData = await eventsRes.json();
      const gamesData = await gamesRes.json();

      if (eventsRes.ok) setEvents(eventsData.events || []);
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

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          title,
          description,
          rewards,
          start_date: new Date(startDate).toISOString(),
          end_date: new Date(endDate).toISOString(),
          status,
          official_url: officialUrl,
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setTitle('');
        setDescription('');
        setRewards('');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menambahkan event');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string, eventTitle: string) => {
    if (!confirm(`Hapus event "${eventTitle}"?`)) return;
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
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
            Manajemen Kalender Event
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
            Jadwalkan event game, atur durasi tanggal, hadiah, dan status tayang.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Tambah Event Baru</span>
        </button>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat event...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul Event</th>
              <th>Game</th>
              <th>Durasi Tanggal</th>
              <th>Status</th>
              <th>Hadiah</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id}>
                <td>
                  <div style={{ fontWeight: 800, color: '#fff' }}>{ev.title}</div>
                </td>
                <td>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    {ev.game_name || 'Game'}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {new Date(ev.start_date).toLocaleDateString('id-ID')} s/d{' '}
                    {new Date(ev.end_date).toLocaleDateString('id-ID')}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      ev.status === 'ACTIVE'
                        ? 'status-active'
                        : ev.status === 'UPCOMING'
                        ? 'status-upcoming'
                        : 'status-expired'
                    }`}
                  >
                    {ev.status}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: '#fbbf24' }}>
                    {ev.rewards || '-'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(ev.id, ev.title)}
                    className="btn btn-sm"
                    style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                    title="Hapus Event"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Event Modal */}
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
              maxWidth: 580,
              width: '100%',
              padding: 28,
            }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              Tambah Event Baru
            </h2>

            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label className="form-label">Game *</label>
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
                <label className="form-label">Judul Event *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: Lantern Rite Festival 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Tanggal Mulai</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tanggal Berakhir</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ringkasan Hadiah</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: 1.600 Primogem, Karakter Bintang 4 Gratis"
                  value={rewards}
                  onChange={(e) => setRewards(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Event</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Penjelasan ringkas aktivitas event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  {submitting ? 'Menyimpan...' : 'Simpan Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

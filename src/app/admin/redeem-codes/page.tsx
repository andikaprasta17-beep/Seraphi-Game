'use client';

import React, { useState, useEffect } from 'react';
import { RedeemCode, Game } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminRedeemCodesPage() {
  const [codes, setCodes] = useState<(RedeemCode & { game_name?: string })[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [gameId, setGameId] = useState('');
  const [code, setCode] = useState('');
  const [reward, setReward] = useState('');
  const [status, setStatus] = useState<'ACTIVE' | 'EXPIRED'>('ACTIVE');
  const [source, setSource] = useState('Verifikasi Editor');

  const fetchData = async () => {
    try {
      const [codesRes, gamesRes] = await Promise.all([
        fetch('/api/admin/redeem-codes'),
        fetch('/api/admin/games'),
      ]);
      const codesData = await codesRes.json();
      const gamesData = await gamesRes.json();

      if (codesRes.ok) setCodes(codesData.codes || []);
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

  const handleCreateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/redeem-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          code: code.toUpperCase().trim(),
          reward,
          status,
          source,
        }),
      });

      if (res.ok) {
        setShowAddModal(false);
        setCode('');
        setReward('');
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menambahkan kode');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'EXPIRED' : 'ACTIVE';
    try {
      const res = await fetch('/api/admin/redeem-codes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setCodes((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
        );
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal mengubah status');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteCode = async (id: string, codeString: string) => {
    if (!confirm(`Hapus kode redeem "${codeString}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      const res = await fetch(`/api/admin/redeem-codes?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCodes((prev) => prev.filter((c) => c.id !== id));
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
            Manajemen Kode Redeem
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
            Kelola kode promosi, gift code, status aktif/kedaluwarsa, dan reward yang diberikan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Tambah Kode Redeem</span>
        </button>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat kode...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Kode Hadiah</th>
              <th>Game</th>
              <th>Hadiah (Rewards)</th>
              <th>Status</th>
              <th>Sumber Verifikasi</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((rc) => (
              <tr key={rc.id}>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fff', fontSize: '1rem', letterSpacing: '0.05em' }}>
                    {rc.code}
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    {rc.game_name || 'Game'}
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                    {rc.reward}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(rc.id, rc.status)}
                    className={`status-badge ${
                      rc.status === 'ACTIVE' ? 'status-active' : 'status-expired'
                    }`}
                    title="Klik untuk mengubah status (Aktif / Kedaluwarsa)"
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    {rc.status} ⇄
                  </button>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rc.source}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => handleDeleteCode(rc.id, rc.code)}
                    className="btn btn-sm"
                    style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                    title="Hapus Kode"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Redeem Code Modal */}
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
              maxWidth: 540,
              width: '100%',
              padding: 28,
            }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              Tambah Kode Redeem Baru
            </h2>

            <form onSubmit={handleCreateCode}>
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
                <label className="form-label">Kode Redeem *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: GENSHINGIFT"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hadiah (Rewards) *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: 60 Primogems, 5 Adventurer EXP"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Status *</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                  >
                    <option value="ACTIVE">ACTIVE (Masih Aktif)</option>
                    <option value="EXPIRED">EXPIRED (Kedaluwarsa)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sumber</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Livestream / Komunitas"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
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
                  {submitting ? 'Menyimpan...' : 'Simpan Kode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

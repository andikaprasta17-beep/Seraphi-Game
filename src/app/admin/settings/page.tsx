'use client';

import React, { useState, useEffect } from 'react';
import { AdSlotConfig } from '@/lib/types';
import { DollarSign, Check, ShieldCheck, Zap, Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [adSlots, setAdSlots] = useState<AdSlotConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  // CSV Import State (Requirement 18)
  const [importType, setImportType] = useState<'games' | 'characters' | 'items' | 'guides'>('games');
  const [csvContent, setCsvContent] = useState('');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    totalRows?: number;
    importedCount?: number;
    errors?: string[];
    error?: string;
  } | null>(null);

  const fetchSlots = async () => {
    try {
      const res = await fetch('/api/admin/ad-slots');
      const data = await res.json();
      if (res.ok) setAdSlots(data.adSlots || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleToggle = async (slot: AdSlotConfig) => {
    setSavingId(slot.id);
    const newActiveState = !slot.is_active;
    try {
      const res = await fetch('/api/admin/ad-slots', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: slot.id,
          is_active: newActiveState,
          image_url: slot.image_url,
          target_url: slot.target_url,
          label: slot.label,
        }),
      });
      if (res.ok) {
        setAdSlots((prev) =>
          prev.map((s) => (s.id === slot.id ? { ...s, is_active: newActiveState } : s))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCsvContent((event.target?.result as string) || '');
    };
    reader.readAsText(file);
  };

  const handleRunImport = async () => {
    if (!csvContent.trim()) {
      alert('Silakan masukkan teks CSV atau pilih file CSV terlebih dahulu.');
      return;
    }
    setImporting(true);
    setImportResult(null);
    try {
      const res = await fetch('/api/admin/import/csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: importType,
          csvText: csvContent,
        }),
      });
      const data = await res.json();
      setImportResult(data);
    } catch (err: any) {
      setImportResult({ success: false, error: err.message || 'Gagal memproses import CSV.' });
    } finally {
      setImporting(false);
    }
  };

  const loadSampleTemplate = () => {
    if (importType === 'games') {
      setCsvContent('name,slug,description,cover_image,banner_image,developer,publisher,release_date,rating,official_url,platforms,genres\n"Contoh Game Baru","contoh-game-baru","Deskripsi game petualangan epik baru.","https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600","https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600","Studio Game","Publisher Official","2026-05-01",4.5,"https://example.com","PC, Android","RPG, Action"');
    } else if (importType === 'characters') {
      setCsvContent('game_id,name,slug,role,element,weapon,rarity,description,portrait\n"game-genshin","Karakter Demo","karakter-demo","DPS","Pyro","Sword",5,"Karakter demo penyerang jarak dekat yang kuat.","https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300"');
    } else if (importType === 'items') {
      setCsvContent('game_id,name,slug,type,rarity,description,how_to_get\n"game-genshin","Pedang Petir","pedang-petir","WEAPON",5,"Pedang legendaris beraliran petir.","Gacha banner senjata"');
    } else if (importType === 'guides') {
      setCsvContent('game_id,title,slug,category,excerpt,content,author\n"game-genshin","Panduan Singkat Demo","panduan-singkat-demo","BEGINNER","Ringkasan cara memulai game dengan cepat.","# Panduan Singkat\nLangkah-langkah bermain secara optimal.","Tim Editorial Seraphi"');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
          Monetisasi & Pengaturan Sistem
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
          Kelola penempatan slot iklan, monetisasi, dan import data massal via CSV (Requirement 18).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 40 }}>
        {/* CSV Batch Import Tool (Requirement 18) */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-xl)',
            padding: 24,
            gridColumn: '1 / -1',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Upload size={20} color="var(--accent-cyan)" />
              Batch Content Import (CSV)
            </h2>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value as any)}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: '0.88rem',
                }}
              >
                <option value="games">Tipe: Games</option>
                <option value="characters">Tipe: Characters</option>
                <option value="items">Tipe: Items / Weapons</option>
                <option value="guides">Tipe: Guides</option>
              </select>
              <button
                type="button"
                onClick={loadSampleTemplate}
                className="btn btn-secondary btn-sm"
              >
                <FileText size={14} />
                Template Format
              </button>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Masukkan data CSV untuk impor massal dengan validasi skema dan proteksi duplikasi slug otomatis.
          </p>

          <div style={{ marginBottom: 14 }}>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
            />
          </div>

          <textarea
            rows={5}
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            placeholder="Atau tempel (paste) data CSV di sini..."
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: 12,
              color: '#fff',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              marginBottom: 14,
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button
              type="button"
              onClick={handleRunImport}
              disabled={importing}
              className="btn btn-primary btn-sm"
            >
              {importing ? 'Memproses Import...' : 'Mulai Batch Import CSV'}
            </button>
          </div>

          {/* Import Result Notification */}
          {importResult && (
            <div
              style={{
                marginTop: 18,
                padding: 16,
                borderRadius: 8,
                border: `1px solid ${importResult.success ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                background: importResult.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {importResult.success ? (
                  <CheckCircle2 size={18} color="#10b981" />
                ) : (
                  <AlertCircle size={18} color="#f87171" />
                )}
                <strong style={{ color: '#fff' }}>
                  {importResult.success ? 'Import Berhasil!' : 'Gagal Import'}
                </strong>
              </div>
              {importResult.success && (
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Total baris: {importResult.totalRows} • Berhasil disimpan: {importResult.importedCount}
                </div>
              )}
              {importResult.error && (
                <div style={{ fontSize: '0.85rem', color: '#f87171' }}>
                  {importResult.error}
                </div>
              )}
              {importResult.errors && importResult.errors.length > 0 && (
                <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: '0.82rem', color: '#f87171' }}>
                  {importResult.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* AdSlots Control */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 24,
            gridColumn: '1 / -1',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <DollarSign size={20} color="var(--primary)" />
            Daftar Slot Iklan Terpasang (AdSlots)
          </h2>

          {loading ? (
            <div style={{ color: 'var(--text-muted)' }}>Memuat slot iklan...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {adSlots.map((slot) => (
                <div
                  key={slot.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 14,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <strong style={{ color: '#fff', fontSize: '1rem' }}>{slot.name}</strong>
                      <span className="platform-pill" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                        {slot.id}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Tipe: {slot.slot_type} • Format:{' '}
                      <span style={{ color: 'var(--primary)' }}>{slot.ad_type}</span>
                    </div>
                    {slot.label && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: 4 }}>
                        Label: {slot.label}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: slot.is_active ? '#10b981' : '#f87171',
                      }}
                    >
                      {slot.is_active ? 'AKTIF (TAYANG)' : 'NONAKTIF'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggle(slot)}
                      className={`btn btn-sm ${slot.is_active ? 'btn-secondary' : 'btn-primary'}`}
                      disabled={savingId === slot.id}
                    >
                      {savingId === slot.id ? 'Memproses...' : slot.is_active ? 'Matikan Slot' : 'Aktifkan Slot'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Free-First Architecture Status */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', marginBottom: 12 }}>
            <ShieldCheck size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
              Free-First Architecture Status
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 14 }}>
            Website dirancang dengan biaya operasional awal <strong>Rp0</strong>. Database berjalan dengan SQLite lokal bawaan Node.js tanpa memerlukan langganan cloud database berbayar.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981' }}>
              <Check size={14} /> Zero Cloud Database Costs (Node Embedded SQLite)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981' }}>
              <Check size={14} /> Vercel / Railway / VPS Free Tier Deployable
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981' }}>
              <Check size={14} /> Google AdSense & Affiliate Link Interfaces Ready
            </div>
          </div>
        </div>

        {/* Affiliate Framework */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a855f7', marginBottom: 12 }}>
            <Zap size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
              Struktur Link Afiliasi (Affiliate Ready)
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 14 }}>
            Skema affiliate terdaftar mendukung mitra resmi seperti Codashop, UniPin, dan Steam Affiliate dengan penandaan parameter pelacakan rel=sponsored secara otomatis.
          </p>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Status: <strong>Ready & Clean</strong> (Tanpa link affiliate tiruan / no spam).
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Pertanyaan Umum');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengirim pesan');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: 30,
          textAlign: 'center',
          color: '#10b981',
        }}
      >
        <CheckCircle2 size={36} style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
          Pesan Terkirim Berhasil!
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Terima kasih, <strong>{name}</strong>! Pesan Anda telah tersimpan dengan aman di sistem SERAPHI GAME. Tim editorial kami akan meninjau dan merespons ke email <strong>{email}</strong> sesegera mungkin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            color: '#f87171',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">Nama Lengkap</label>
          <input
            id="contact-name"
            type="text"
            className="form-control"
            placeholder="Contoh: Budi Santoso"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">Alamat Email</label>
          <input
            id="contact-email"
            type="email"
            className="form-control"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={120}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject" className="form-label">Subjek Pesan</label>
        <select
          id="contact-subject"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="Pertanyaan Umum">Pertanyaan Umum</option>
          <option value="Koreksi Data Guide / Karakter">Koreksi Data Guide / Karakter</option>
          <option value="Kemitraan Iklan & Sponsorship">Kemitraan Iklan & Sponsorship</option>
          <option value="Laporan Kode Redeem Baru">Laporan Kode Redeem Baru</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">Isi Pesan</label>
        <textarea
          id="contact-message"
          className="form-control"
          rows={5}
          placeholder="Tuliskan pesan, saran, atau usulan Anda di sini..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          maxLength={3000}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ marginTop: 8 }}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Mengirimkan Pesan...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Kirimkan Pesan</span>
          </>
        )}
      </button>
    </form>
  );
}

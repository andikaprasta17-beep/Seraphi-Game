import React from 'react';
import Link from 'next/link';
import { Gamepad2, Home, Search, Compass, ShieldAlert } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Halaman Tidak Ditemukan | SERAPHI GAME',
  description: 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan di portal SERAPHI GAME.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 580,
          width: '100%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 32px',
          boxShadow: 'var(--shadow-lg)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(0, 242, 254, 0.1)',
            border: '1px solid var(--border-glow)',
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            boxShadow: '0 0 30px var(--primary-glow)',
          }}
        >
          <Compass size={36} />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '3.5rem',
            fontWeight: 900,
            lineHeight: 1,
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 12,
            letterSpacing: '2px',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 12,
          }}
        >
          Halaman Tidak Ditemukan
        </h1>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Maaf, halaman atau konten gaming yang Anda tuju tidak tersedia, telah diarsipkan, atau tautan yang dimasukkan kurang tepat.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          <Link href="/" className="btn btn-primary">
            <Home size={16} />
            <span>Ke Beranda</span>
          </Link>
          <Link href="/games" className="btn btn-secondary">
            <Gamepad2 size={16} />
            <span>Database Game</span>
          </Link>
          <Link href="/search" className="btn btn-secondary">
            <Search size={16} />
            <span>Pencarian Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

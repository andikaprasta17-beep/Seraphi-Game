'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log sanitized error client-side in dev only, never expose sensitive system details
    if (process.env.NODE_ENV === 'development') {
      console.error('[Seraphi Error Boundary Captured]:', error.message);
    }
  }, [error]);

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
          maxWidth: 540,
          width: '100%',
          background: 'var(--bg-card)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '44px 32px',
          boxShadow: 'var(--shadow-lg)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.2)',
          }}
        >
          <AlertOctagon size={34} />
        </div>

        <h1
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 10,
          }}
        >
          Terjadi Gangguan Sistem
        </h1>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          Sistem mengalami kendala teknis saat memproses permintaan Anda. Untuk menjaga keamanan, informasi internal sistem tidak ditampilkan. Silakan coba muat ulang halaman.
        </p>

        {error.digest && (
          <div
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-dim)',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              marginBottom: 24,
            }}
          >
            Ref: {error.digest}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary"
          >
            <RotateCcw size={16} />
            <span>Coba Muat Ulang</span>
          </button>
          <Link href="/" className="btn btn-secondary">
            <Home size={16} />
            <span>Ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

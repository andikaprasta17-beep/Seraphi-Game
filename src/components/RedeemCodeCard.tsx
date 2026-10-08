'use client';

import React, { useState } from 'react';
import { Copy, Check, Clock, Gift, AlertTriangle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { trackRedeemCodeCopy } from '@/lib/analytics';

interface RedeemCodeCardProps {
  id?: string;
  game_id?: string;
  game_name?: string;
  game_slug?: string;
  code: string;
  reward: string;
  status: 'ACTIVE' | 'EXPIRED' | 'UNKNOWN';
  expired_at?: string;
  source?: string;
  last_checked: string;
  verified_at?: string;
  updated_at?: string;
}

export default function RedeemCodeCard({
  code,
  reward,
  status,
  game_name,
  game_slug,
  last_checked,
  verified_at,
  source,
}: RedeemCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const isExpired = status === 'EXPIRED';
  const verificationDate = verified_at || last_checked;

  const formattedVerification = new Date(verificationDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      trackRedeemCodeCopy(code, game_name);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      trackRedeemCodeCopy(code, game_name);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={`redeem-card ${isExpired ? 'redeem-card-expired' : ''}`}>
      <div className="redeem-card-header">
        {game_slug ? (
          <Link href={`/games/${game_slug}`} className="redeem-game-name">
            {game_name || 'Game'}
          </Link>
        ) : (
          <span className="redeem-game-name">{game_name || 'Game'}</span>
        )}

        <span
          className={`status-badge ${
            status === 'ACTIVE' ? 'status-active' : status === 'EXPIRED' ? 'status-expired' : 'status-unknown'
          }`}
          style={{
            textTransform: 'uppercase',
            fontWeight: 800,
            fontSize: '0.75rem',
            padding: '3px 8px',
            borderRadius: 4,
            ...(status === 'UNKNOWN' ? { background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' } : {}),
          }}
        >
          {status}
        </span>
      </div>

      {isExpired && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 10px',
            marginBottom: 10,
            fontSize: '0.78rem',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <AlertTriangle size={14} />
          <span>Kode ini sudah tidak aktif.</span>
        </div>
      )}

      <div className="redeem-code-box">
        <span
          className="code-text"
          style={{ textDecoration: isExpired ? 'line-through' : 'none', opacity: isExpired ? 0.7 : 1 }}
        >
          {code}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`copy-btn ${copied ? 'copied' : ''}`}
          aria-label={`Salin kode ${code}`}
          title="Salin Kode ke Clipboard"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>TERSALIN!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>SALIN KODE</span>
            </>
          )}
        </button>
      </div>

      <div className="redeem-reward">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <Gift size={16} style={{ color: '#fbbf24', flexShrink: 0, marginTop: 2 }} />
          <span>
            <strong>Hadiah:</strong> {reward}
          </span>
        </div>
      </div>

      <div className="redeem-footer">
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {verified_at ? <ShieldCheck size={13} style={{ color: 'var(--primary)' }} /> : <Clock size={12} />}
          Terakhir diverifikasi: {formattedVerification}
        </span>
        {source && <span>{source}</span>}
      </div>
    </div>
  );
}

import React from 'react';
import { getAdSlots, getAdSlotById } from '@/lib/db';
import { AdSlotConfig } from '@/lib/types';

export type AdPlacement = 'HEADER' | 'SIDEBAR' | 'IN_ARTICLE' | 'FOOTER' | 'banner_top' | 'sidebar' | 'in_article' | 'footer';

interface AdSlotProps {
  slotId?: string;
  placement?: AdPlacement;
  enabled?: boolean;
  className?: string;
  customHtml?: string;
}

function normalizePlacement(p?: AdPlacement): string {
  if (!p) return '';
  const lower = p.toLowerCase();
  if (lower === 'header') return 'banner_top';
  return lower;
}

export default async function AdSlot({
  slotId,
  placement,
  enabled = true,
  className = '',
  customHtml,
}: AdSlotProps) {
  // If explicitly disabled via props, collapse cleanly
  if (enabled === false) {
    return null;
  }

  let adConfig: AdSlotConfig | null = null;

  if (slotId) {
    adConfig = await getAdSlotById(slotId);
  } else if (placement) {
    const normalized = normalizePlacement(placement);
    const allSlots = await getAdSlots();
    adConfig = allSlots.find((s) => s.slot_type.toLowerCase() === normalized && s.is_active) || null;
  }

  // If no slot configured or slot is toggled inactive in CMS, collapse cleanly
  if (!adConfig || !adConfig.is_active) {
    return null;
  }

  // Requirement 16: Never render empty ad containers or 3rd-party scripts if ad provider is 'none' or unconfigured
  const adProvider = process.env.NEXT_PUBLIC_AD_PROVIDER || 'none';
  if (!customHtml && !adConfig.image_url && adProvider === 'none') {
    return null;
  }

  // Safe container identification
  const containerId = slotId || `ad-${normalizePlacement(placement) || 'slot'}`;

  return (
    <aside
      className={`ad-slot-container ${className}`}
      id={`ad-slot-${containerId}`}
      aria-label="Area Iklan Sponsor"
    >
      <div className="ad-slot-box">
        <span className="ad-badge">SPONSOR / IKLAN</span>

        {customHtml ? (
          <div
            className="ad-custom-content"
            dangerouslySetInnerHTML={{ __html: customHtml }}
          />
        ) : adConfig.image_url ? (
          <a
            href={adConfig.target_url || '#'}
            target="_blank"
            rel="sponsored nofollow noopener"
            style={{ display: 'block', textDecoration: 'none' }}
            title="Beli produk langsung di Shopee"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={adConfig.image_url}
              alt={adConfig.label || 'Sponsor Advertisement'}
              className="ad-image"
              loading="lazy"
              style={{ maxHeight: 180, objectFit: 'cover', width: '100%', borderRadius: 'var(--radius-sm)' }}
            />
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, padding: '0 4px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                <span style={{ fontSize: '0.7rem', color: '#ee4d2d', fontWeight: 800, textTransform: 'uppercase' }}>
                  Toko Resmi Shopee
                </span>
                <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700 }}>
                  ★ 4.9
                </span>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
                {adConfig.label || 'TANGZU Xue Tao Gaming IEM'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ee4d2d' }}>
                  Rp 249.000
                </span>
                <span style={{ fontSize: '0.72rem', background: 'linear-gradient(135deg, #f97316, #ee4d2d)', color: '#fff', fontWeight: 800, padding: '4px 10px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Beli &rarr;
                </span>
              </div>
            </div>
          </a>
        ) : (
          <div
            style={{
              padding: '24px 16px',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              textAlign: 'center',
            }}
          >
            <strong>{adConfig.label || 'Ruang Iklan Terverifikasi'}</strong>
            <p style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-dim)' }}>
              Penempatan: {adConfig.slot_type.toUpperCase()} • Google AdSense / Direct Partner Ready
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

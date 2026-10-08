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
            rel="sponsored noopener noreferrer"
            style={{ display: 'block' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={adConfig.image_url}
              alt={adConfig.label || 'Sponsor Advertisement'}
              className="ad-image"
              loading="lazy"
              style={{ maxHeight: 120, objectFit: 'cover', width: '100%' }}
            />
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

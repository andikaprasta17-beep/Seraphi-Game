import React from 'react';
import Link from 'next/link';
import { Sparkles, Users, ExternalLink, ShieldCheck, Gamepad2, Award, Headphones, ShoppingBag } from 'lucide-react';

export default function LeftSponsorRail() {
  return (
    <aside className="sponsor-rail rail-sticky" aria-label="Sponsor & Partner Kiri">
      {/* 1. Header Rail Label */}
      <div className="rail-section-header">
        <Sparkles size={14} color="#00f2fe" />
        <span>SPONSOR PARTNER</span>
      </div>

      {/* 2. Hardware Gaming Sponsor: TANGZU Xue Tao Gaming IEM (Shopee Affiliate) */}
      <div className="sponsor-card">
        <div className="sponsor-card-tag" style={{ color: '#ee4d2d', borderColor: 'rgba(238, 77, 45, 0.4)' }}>
          SHOPEE AFFILIATE
        </div>
        <div className="sponsor-brand-banner" style={{ background: 'linear-gradient(135deg, rgba(238, 77, 45, 0.12) 0%, rgba(14, 20, 32, 0.85) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #f97316 0%, #ee4d2d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.85rem' }}>
              <Headphones size={15} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', margin: 0 }}>TANGZU Xue Tao</h4>
              <span style={{ fontSize: '0.67rem', color: '#ee4d2d', fontWeight: 700 }}>Toko Bass Audio Shopee</span>
            </div>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '6px 0 10px' }}>
            Gaming IEM 10mm Glass Diaphragm & Boom Mic jernih. Deteksi footsteps akurat untuk FPS & MOBA.
          </p>
          <a
            href="https://s.shopee.co.id/20wN4AbcBL"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="sponsor-action-btn"
            style={{ borderColor: 'rgba(238, 77, 45, 0.5)', color: '#ee4d2d', background: 'rgba(238, 77, 45, 0.1)' }}
          >
            <span>Beli di Shopee</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* 3. GPU Tech Sponsor: GeForce RTX */}
      <div className="sponsor-card">
        <div className="sponsor-card-tag" style={{ color: '#76b900', borderColor: 'rgba(118, 185, 0, 0.3)' }}>
          PERFORMANCE SPONSOR
        </div>
        <div className="sponsor-brand-banner" style={{ background: 'linear-gradient(135deg, rgba(118, 185, 0, 0.1) 0%, rgba(14, 20, 32, 0.8) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#76b900', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '0.72rem' }}>
              RTX
            </div>
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', margin: 0 }}>GeForce RTX</h4>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>DLSS 3.5 & Ray Tracing</span>
            </div>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '6px 0 10px' }}>
            Nikmati Black Myth: Wukong & GTA VI dengan frame rate 120+ FPS maksimal.
          </p>
          <a
            href="https://seraphigame.id/partner"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="sponsor-action-btn"
            style={{ borderColor: 'rgba(118, 185, 0, 0.4)', color: '#76b900' }}
          >
            <span>Cek Spesifikasi</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* 4. Discord Community Partner */}
      <div className="sponsor-card community-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', background: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Users size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', margin: 0 }}>Discord Mabar</h4>
            <span style={{ fontSize: '0.7rem', color: '#5865F2', fontWeight: 700 }}>5.400+ Anggota Aktif</span>
          </div>
        </div>
        <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '6px 0 10px' }}>
          Cari party mabar MLBB, Genshin, Valorant & tukar info redeem code tercepat.
        </p>
        <a
          href="https://seraphigame.id/community"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', fontSize: '0.76rem', padding: '6px 10px', justifyContent: 'center' }}
        >
          <span>Gabung Discord</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* 5. Verified Sponsor Badge */}
      <div className="sponsor-verified-badge">
        <ShieldCheck size={14} color="#10b981" />
        <span>Mitra Iklan Terverifikasi Seraphi</span>
      </div>
    </aside>
  );
}

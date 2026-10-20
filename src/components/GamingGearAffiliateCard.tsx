import React from 'react';
import { ExternalLink, ShoppingBag, ShieldCheck, Headphones, Keyboard, Mouse, Mic, Sparkles } from 'lucide-react';

interface AffiliateProduct {
  id: string;
  title: string;
  category: string;
  badgeOfficial: string;
  badgeGuarantee: string;
  highlightTag?: string;
  imageUrl: string;
  imageAlt: string;
  affiliateUrl: string;
  description: string;
  features: Array<{
    icon: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
    color: string;
  }>;
}

const affiliateProducts: AffiliateProduct[] = [
  {
    id: 'tangzu-xue-tao',
    title: 'TANGZU Xue Tao Gaming IEM',
    category: 'Audio Gaming IEM Pro',
    badgeOfficial: 'Toko Resmi Bass Audio',
    badgeGuarantee: 'Garansi Resmi 1 Tahun',
    highlightTag: 'Rekomendasi Utama Earphone Gaming',
    imageUrl: '/images/gear/tangzu-xue-tao-iem.webp',
    imageAlt: 'TANGZU Xue Tao Gaming In-Ear Monitor (IEM) Earphones dengan Boom Mic untuk Deteksi Footsteps',
    affiliateUrl: 'https://s.shopee.co.id/20wN4AbcBL',
    description:
      'IEM gaming kompetitif dari TANGZU yang dirancang khusus untuk meningkatkan akurasi arah langkah kaki (footsteps) dan positioning audio dalam game FPS dan MOBA. Dilengkapi 10mm Dynamic Driver diafragma kaca khusus, detachable boom microphone jernih untuk voice chat Discord, serta fitting ergonomis dengan eartips Tang Sancai.',
    features: [
      { icon: Headphones, label: '10mm Glass Diaphragm Driver', color: '#a855f7' },
      { icon: Mic, label: 'Boom Mic Voice Chat Jernih', color: '#00f2fe' },
      { icon: Sparkles, label: 'Akurasi Footsteps Kompetitif', color: '#38bdf8' },
    ],
  },
  {
    id: 'onikuma-bundle',
    title: 'ONIKUMA Gaming Bundle 3-in-1',
    category: 'Paket Bundle 3-in-1',
    badgeOfficial: 'Toko Resmi Shopee',
    badgeGuarantee: 'Garansi Resmi',
    highlightTag: 'Setup All-in-One Paling Hemat',
    imageUrl: '/images/gear/onikuma-gaming-bundle-3in1.webp',
    imageAlt: 'ONIKUMA Gaming Bundle 3-in-1 - Paket Keyboard, Mouse, dan Headset Gaming',
    affiliateUrl: 'https://s.shopee.co.id/9V26hRMsP2',
    description:
      'Solusi setup komplit all-in-one dari ONIKUMA untuk menunjang performa bermain game Anda. Paket ini menghadirkan perpaduan keyboard gaming dengan pencahayaan RGB dinamis, mouse gaming responsif berakurasi tinggi, serta headset stereo over-ear dengan mikrofon jernih yang nyaman digunakan untuk push rank harian.',
    features: [
      { icon: Keyboard, label: 'Keyboard RGB Backlight', color: '#00f2fe' },
      { icon: Mouse, label: 'Gaming Mouse Presisi', color: '#38bdf8' },
      { icon: Headphones, label: 'Stereo Headset + Mic', color: '#f43f5e' },
    ],
  },
];

export default function GamingGearAffiliateCard() {
  return (
    <section className="gaming-gear-section" aria-labelledby="gear-recommendation-title">
      <div className="section-header">
        <div className="section-title-wrap">
          <div
            className="section-indicator"
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #ee4d2d 100%)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <ShoppingBag size={15} color="#ee4d2d" />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#ee4d2d',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Pilihan Periferal Resmi
              </span>
            </div>
            <h2 id="gear-recommendation-title" className="section-title" style={{ fontSize: '1.45rem' }}>
              Rekomendasi Gear Gaming
            </h2>
          </div>
        </div>
      </div>

      <div className="gaming-gear-grid">
        {affiliateProducts.map((gear) => (
          <div key={gear.id} className="gaming-gear-card">
            {/* Gambar Produk Autentik */}
            <div className="gaming-gear-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gear.imageUrl}
                alt={gear.imageAlt}
                className="gaming-gear-img"
                loading="lazy"
              />
            </div>

            {/* Informasi Produk */}
            <div className="gaming-gear-content">
              <div>
                <div className="gaming-gear-badges">
                  <span className="gear-badge-category">{gear.category}</span>
                  <span className="gear-badge-official">
                    <ShieldCheck size={13} />
                    {gear.badgeOfficial}
                  </span>
                  <span className="gear-badge-guarantee">{gear.badgeGuarantee}</span>
                  {gear.highlightTag && (
                    <span className="gear-badge-highlight">
                      <Sparkles size={11} color="#fbbf24" />
                      {gear.highlightTag}
                    </span>
                  )}
                </div>

                <h3 className="gaming-gear-title">{gear.title}</h3>

                <p className="gaming-gear-desc">{gear.description}</p>

                <div className="gaming-gear-features">
                  {gear.features.map((feat) => {
                    const FeatIcon = feat.icon;
                    return (
                      <span key={feat.label} className="gear-feature-item">
                        <FeatIcon size={14} color={feat.color} />
                        {feat.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="gaming-gear-actions">
                  <a
                    href={gear.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    className="btn-shopee-affiliate"
                    title={`Buka halaman produk ${gear.title} di Shopee`}
                  >
                    <ShoppingBag size={18} />
                    <span>Cek Produk di Shopee</span>
                    <ExternalLink size={16} />
                  </a>
                </div>

                <p className="gear-affiliate-disclosure">
                  *Transparansi: Seraphi Game dapat memperoleh komisi dari pembelian melalui tautan afiliasi ini tanpa biaya tambahan bagi Anda.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


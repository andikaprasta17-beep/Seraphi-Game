import React from 'react';
import { ShoppingCart, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface AffiliateProductCardProps {
  productId?: string;
  title?: string;
  category?: string;
  store?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  rating?: string;
  reviewCount?: string;
  imageUrl?: string;
  imageAlt?: string;
  affiliateUrl?: string;
  features?: string[];
  disclaimer?: string;
  className?: string;
}

export default function AffiliateProductCard({
  productId,
  title,
  category,
  store,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  imageUrl,
  imageAlt,
  affiliateUrl = 'https://s.shopee.co.id/20wN4AbcBL',
  features,
  disclaimer,
  className = '',
}: AffiliateProductCardProps) {
  const isOnikuma =
    productId === 'onikuma-bundle' ||
    (affiliateUrl && affiliateUrl.includes('9V26hRMsP2')) ||
    (title && title.toLowerCase().includes('onikuma'));

  const finalTitle =
    title ||
    (isOnikuma
      ? 'ONIKUMA Gaming Bundle 3-in-1 (Keyboard RGB, Mouse & Headset)'
      : 'TANGZU Xue Tao Gaming In-Ear Monitor (IEM) with Boom Mic');

  const finalCategory = category || (isOnikuma ? 'Paket Gaming Bundle 3-in-1' : 'Audio Gaming IEM Pro');
  const finalStore = store || (isOnikuma ? 'Toko Resmi Shopee • Onikuma Official' : 'Toko Resmi Shopee • Bass Audio');
  const finalPrice = price || (isOnikuma ? 'Rp 289.000' : 'Rp 249.000');
  const finalOriginalPrice = originalPrice || (isOnikuma ? 'Rp 420.000' : 'Rp 350.000');
  const finalDiscount = discount || (isOnikuma ? '-31%' : '-29%');
  const finalRating = rating || (isOnikuma ? '4.8' : '4.9');
  const finalReviewCount = reviewCount || (isOnikuma ? '3.500+ Terjual' : '1.200+ Terjual');
  const finalImageUrl =
    imageUrl ||
    (isOnikuma
      ? 'https://cdn.jsdelivr.net/gh/andikaprasta17-beep/Seraphi-Game@main/public/images/gear/onikuma-gaming-bundle-3in1.webp'
      : 'https://cdn.jsdelivr.net/gh/andikaprasta17-beep/Seraphi-Game@main/public/images/gear/tangzu-xue-tao-iem.webp');
  const finalImageAlt =
    imageAlt ||
    (isOnikuma
      ? 'ONIKUMA Gaming Bundle 3-in-1 - Paket Keyboard, Mouse, dan Headset Gaming'
      : 'Foto Produk TANGZU Xue Tao Gaming IEM Resmi Shopee Bass Audio');
  const finalAffiliateUrl =
    affiliateUrl || (isOnikuma ? 'https://s.shopee.co.id/9V26hRMsP2' : 'https://s.shopee.co.id/20wN4AbcBL');
  const finalFeatures =
    features ||
    (isOnikuma
      ? [
          'Keyboard Gaming RGB Backlight Responsif & Ergonomis',
          'Gaming Mouse Akurasi Tinggi dengan Sensitivitas Presisi',
          'Headset Over-Ear Stereo + Mic Komunikasi Jernih Discord',
        ]
      : [
          '10mm Custom Glass Diaphragm (Akurasi Footsteps Tinggi)',
          'Detachable Boom Mic Jernih untuk Discord & Voice Chat',
          'Eartips Medis Tang Sancai (Isolasi Noise Pasif)',
        ]);
  const finalDisclaimer =
    disclaimer ||
    '*Produk 100% Original Shopee Terverifikasi, Garansi Resmi, Gratis Ongkir XTRA. Checkout langsung melalui Keranjang Kuning.';

  return (
    <aside className={`affiliate-product-box ${className}`} aria-label="Produk Rekomendasi Resmi">
      {/* 1. Gambar Produk yang Bisa Diklik Langsung via Keranjang Kuning */}
      <div className="affiliate-product-media">
        <a
          href={finalAffiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener"
          title={`Beli ${finalTitle} di Keranjang Kuning Shopee`}
          className="affiliate-product-img-link"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={finalImageUrl}
            alt={finalImageAlt}
            className="affiliate-product-img"
            loading="lazy"
          />
          <div className="badge-keranjang-kuning">
            <ShoppingCart size={14} />
            <span>Keranjang Kuning</span>
          </div>
          <span className="affiliate-overlay-pill">
            <ShoppingCart size={12} />
            <span>Klik Beli</span>
          </span>
        </a>
      </div>

      {/* 2. Detail & Informasi Produk */}
      <div className="affiliate-product-details">
        <div>
          <div className="affiliate-product-badge">
            <span className="badge-official">
              <ShieldCheck size={12} />
              {finalStore}
            </span>
            <span className="badge-category">{finalCategory}</span>
            <span className="badge-guarantee">Garansi Resmi</span>
            <div
              style={{
                background: '#ffd000',
                color: '#000',
                padding: '2px 8px',
                borderRadius: 4,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontWeight: 900,
                fontSize: '0.7rem',
              }}
            >
              <ShoppingCart size={12} color="#000" />
              <span>KERANJANG KUNING</span>
            </div>
          </div>

          <h3 className="affiliate-product-name">
            <a
              href={finalAffiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              title={`Buka & Beli ${finalTitle} di Keranjang Kuning Shopee`}
            >
              {finalTitle}
            </a>
          </h3>

          <div className="affiliate-product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-score">{finalRating} / 5</span>
            <span className="rating-count">({finalReviewCount})</span>
          </div>

          {finalFeatures && finalFeatures.length > 0 && (
            <div className="affiliate-product-feature-list">
              {finalFeatures.map((feat, idx) => (
                <div key={idx} className="affiliate-feature-line">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* 3. Harga Produk Diskon Promosi */}
          <div className="affiliate-product-pricing">
            <div className="price-wrap">
              <span className="price-label">Harga Spesial:</span>
              <span className="price-current" style={{ color: '#ffd000' }}>
                {finalPrice}
              </span>
            </div>
            {finalOriginalPrice && <span className="price-original">{finalOriginalPrice}</span>}
            {finalDiscount && <span className="discount-tag">{finalDiscount}</span>}
          </div>

          {/* 4. Tombol Aksi Beli Langsung di Keranjang Kuning Shopee */}
          <div className="affiliate-product-cta">
            <a
              href={finalAffiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="btn-keranjang-kuning"
              title={`Beli ${finalTitle} di Keranjang Kuning Shopee`}
            >
              <div className="cart-icon-bubble">
                <ShoppingCart size={22} color="#000" />
              </div>
              <div className="btn-keranjang-text">
                <span className="btn-keranjang-sub">PRODUK TERVERIFIKASI SHOPEE</span>
                <span className="btn-keranjang-main">Beli di Keranjang Kuning Shopee</span>
              </div>
              <div className="btn-keranjang-price">
                <span>{finalPrice}</span>
                <ExternalLink size={16} />
              </div>
            </a>
          </div>

          <p className="affiliate-disclaimer">{finalDisclaimer}</p>
        </div>
      </div>
    </aside>
  );
}

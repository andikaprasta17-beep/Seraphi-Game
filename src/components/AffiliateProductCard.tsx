import React from 'react';
import { ShoppingBag, ExternalLink, ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export interface AffiliateProductCardProps {
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
  title = 'TANGZU Xue Tao Gaming In-Ear Monitor (IEM) with Boom Mic',
  category = 'Audio Gaming IEM Pro',
  store = 'Toko Resmi Shopee • Bass Audio',
  price = 'Rp 249.000',
  originalPrice = 'Rp 350.000',
  discount = '-29%',
  rating = '4.9',
  reviewCount = '1.200+ Terjual',
  imageUrl = 'https://cdn.jsdelivr.net/gh/andikaprasta17-beep/Seraphi-Game@main/public/images/gear/tangzu-xue-tao-iem.webp',
  imageAlt = 'Foto Produk TANGZU Xue Tao Gaming IEM Resmi Shopee Bass Audio',
  affiliateUrl = 'https://s.shopee.co.id/20wN4AbcBL',
  features = [
    '10mm Custom Glass Diaphragm (Akurasi Footsteps Tinggi)',
    'Detachable Boom Mic Jernih untuk Discord & Voice Chat',
    'Eartips Medis Tang Sancai (Isolasi Noise Pasif)',
  ],
  disclaimer = '*Produk 100% Original, Garansi Resmi Bass Audio Indonesia 1 Tahun, Gratis Ongkir XTRA.',
  className = '',
}: AffiliateProductCardProps) {
  return (
    <aside className={`affiliate-product-box ${className}`} aria-label="Produk Rekomendasi Resmi">
      {/* 1. Gambar Produk yang Bisa Diklik Langsung */}
      <div className="affiliate-product-media">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener"
          title={`Beli ${title} langsung di Shopee`}
          className="affiliate-product-img-link"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className="affiliate-product-img"
            loading="lazy"
          />
          <span className="affiliate-overlay-pill">
            <ShoppingBag size={12} />
            <span>Klik Beli</span>
          </span>
        </a>
      </div>

      {/* 2. Detail & Informasi Produk Langsung Beli */}
      <div className="affiliate-product-details">
        <div>
          <div className="affiliate-product-badge">
            <span className="badge-official">
              <ShieldCheck size={12} />
              {store}
            </span>
            <span className="badge-category">{category}</span>
            <span className="badge-guarantee">Garansi Resmi 1 Thn</span>
          </div>

          <h3 className="affiliate-product-name">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              title={`Beli ${title} di Shopee`}
            >
              {title}
            </a>
          </h3>

          <div className="affiliate-product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-score">{rating} / 5</span>
            <span className="rating-count">({reviewCount})</span>
          </div>

          {features && features.length > 0 && (
            <div className="affiliate-product-feature-list">
              {features.map((feat, idx) => (
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
              <span className="price-current">{price}</span>
            </div>
            {originalPrice && <span className="price-original">{originalPrice}</span>}
            {discount && <span className="discount-tag">{discount}</span>}
          </div>

          {/* 4. Tombol Aksi Beli Langsung di Shopee */}
          <div className="affiliate-product-cta">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="btn-buy-shopee"
              title={`Beli ${title} sekarang di Shopee`}
            >
              <ShoppingBag size={20} />
              <span>BELI SEKARANG DI SHOPEE</span>
              <ExternalLink size={17} />
            </a>
          </div>

          <p className="affiliate-disclaimer">{disclaimer}</p>
        </div>
      </div>
    </aside>
  );
}

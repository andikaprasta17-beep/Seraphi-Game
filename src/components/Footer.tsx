import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <Link href="/" className="brand-logo" style={{ marginBottom: 12, display: 'inline-flex' }}>
              <div className="brand-icon">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="brand-text">SERAPHI</span>
                <span style={{ color: '#fff' }}> GAME</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Portal informasi, database, panduan build karakter, tier list, dan kode redeem game terpercaya berbahasa Indonesia. Dibangun untuk memajukan ekosistem gaming tanah air.
            </p>
            <div style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Tagline: <em>Info Game, Guide & Dunia Gaming Indonesia</em>
            </div>
          </div>

          {/* Quick Links: Game Database */}
          <div>
            <h4 className="footer-col-title">Game Populer</h4>
            <ul className="footer-links">
              <li><Link href="/games/genshin-impact" className="footer-link">Genshin Impact</Link></li>
              <li><Link href="/games/honkai-star-rail" className="footer-link">Honkai: Star Rail</Link></li>
              <li><Link href="/games/mobile-legends" className="footer-link">Mobile Legends</Link></li>
              <li><Link href="/games/valorant" className="footer-link">Valorant</Link></li>
              <li><Link href="/games/wuthering-waves" className="footer-link">Wuthering Waves</Link></li>
              <li><Link href="/games/zenless-zone-zero" className="footer-link">Zenless Zone Zero</Link></li>
            </ul>
          </div>

          {/* Quick Links: Fitur Portal */}
          <div>
            <h4 className="footer-col-title">Kategori Konten</h4>
            <ul className="footer-links">
              <li><Link href="/guides" className="footer-link">Panduan & Build</Link></li>
              <li><Link href="/news" className="footer-link">Berita & Update Patch</Link></li>
              <li><Link href="/tier-list" className="footer-link">Tier List Meta</Link></li>
              <li><Link href="/redeem-codes" className="footer-link">Kode Redeem Aktif</Link></li>
              <li><Link href="/events" className="footer-link">Kalender Event</Link></li>
              <li><Link href="/search" className="footer-link">Pencarian Database</Link></li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="footer-col-title">Informasi & Kebijakan</h4>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link">Tentang Seraphi Game</Link></li>
              <li><Link href="/contact" className="footer-link">Hubungi Kami</Link></li>
              <li><Link href="/privacy" className="footer-link">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="footer-link">Syarat & Ketentuan</Link></li>
              <li><Link href="/editorial-policy" className="footer-link">Kebijakan Editorial</Link></li>
              <li><Link href="/affiliate-disclosure" className="footer-link">Keterbukaan Afiliasi</Link></li>
              <li><Link href="/admin" className="footer-link">Admin Portal</Link></li>
              <li><a href="/sitemap.xml" className="footer-link" target="_blank" rel="noreferrer">Sitemap XML</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong>SERAPHI GAME</strong>. Hak cipta dilindungi undang-undang.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Dibuat dengan <Heart size={14} color="#ef4444" fill="#ef4444" /> untuk Gamer Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}

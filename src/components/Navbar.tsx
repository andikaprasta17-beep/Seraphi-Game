'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Shield, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Games', href: '/games' },
  { label: 'News', href: '/news' },
  { label: 'Guides', href: '/guides' },
  { label: 'Tier List', href: '/tier-list' },
  { label: 'Redeem Codes', href: '/redeem-codes' },
  { label: 'Events', href: '/events' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
            <div className="brand-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <span className="brand-text">SERAPHI</span>
              <span style={{ color: '#fff' }}> GAME</span>
              <span className="brand-badge">ID</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: Search Bar & Admin / Mobile toggle */}
          <div className="header-actions">
            <form onSubmit={handleSearchSubmit} className="search-bar-form">
              <input
                type="text"
                placeholder="Cari game, karakter, guide..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-icon-btn" aria-label="Search">
                <Search size={18} />
              </button>
            </form>

            <Link
              href="/admin"
              className="btn btn-secondary btn-sm"
              title="Admin CMS"
              style={{ padding: '8px 12px' }}
            >
              <Shield size={16} />
              <span style={{ display: 'none' }}>Admin</span>
            </Link>

            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-menu open">
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: 12 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Cari game, karakter, guide..."
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingRight: 40 }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--primary)',
                }}
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <span>{item.label}</span>
              {isActive(item.href) && <span style={{ color: 'var(--primary)' }}>●</span>}
            </Link>
          ))}

          <Link
            href="/admin"
            className="mobile-nav-link"
            onClick={() => setMobileOpen(false)}
            style={{ borderLeft: '4px solid var(--primary)' }}
          >
            <span>Admin Portal CMS</span>
            <Shield size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}

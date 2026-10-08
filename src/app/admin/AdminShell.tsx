'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Gamepad2,
  Users,
  BookOpen,
  Newspaper,
  Gift,
  Calendar,
  DollarSign,
  LogOut,
  ExternalLink,
  Shield,
  Lock,
} from 'lucide-react';

interface AdminShellProps {
  children: React.ReactNode;
  session: { userId: string; username: string } | null;
}

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Database Game', href: '/admin/games', icon: Gamepad2 },
  { label: 'Karakter & Hero', href: '/admin/characters', icon: Users },
  { label: 'Panduan & Guide', href: '/admin/guides', icon: BookOpen },
  { label: 'Berita Game', href: '/admin/news', icon: Newspaper },
  { label: 'Kode Redeem', href: '/admin/redeem-codes', icon: Gift },
  { label: 'Event Game', href: '/admin/events', icon: Calendar },
  { label: 'Monetisasi & Iklan', href: '/admin/settings', icon: DollarSign },
];

export default function AdminShell({ children, session }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, render children directly
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not logged in, prompt to log in
  if (!session) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div
          style={{
            maxWidth: 440,
            width: '100%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: 36,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Lock size={26} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
            Akses Admin Terproteksi
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24, lineHeight: 1.5 }}>
            Anda harus masuk sebagai administrator terlebih dahulu untuk mengelola konten dan pengaturan portal.
          </p>
          <Link href="/admin/login" className="btn btn-primary" style={{ width: '100%' }}>
            Masuk ke Login Admin
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div style={{ padding: '0 8px 20px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07090e',
              }}
            >
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>SERAPHI CMS</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Admin: {session.username}</div>
            </div>
          </div>
        </div>

        <nav>
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${active ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--border-subtle)' }}>
          <Link
            href="/"
            className="admin-nav-item"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--text-muted)' }}
          >
            <ExternalLink size={16} />
            <span>Lihat Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="admin-nav-item"
            style={{ width: '100%', color: '#f87171', marginTop: 4 }}
          >
            <LogOut size={16} />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="admin-content">{children}</main>
    </div>
  );
}

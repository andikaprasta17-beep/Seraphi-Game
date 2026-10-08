import React from 'react';
import type { Metadata } from 'next';
import { Mail, MessageSquare, Handshake } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Hubungi Kami — SERAPHI GAME Indonesia',
  description:
    'Kontak redaksi, kemitraan sponsorship, dan pertanyaan seputar portal informasi gaming SERAPHI GAME.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Hubungi Kami' }]} />

      <div style={{ maxWidth: 860, margin: '20px auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 35 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
            Hubungi Tim Seraphi Game
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Punya pertanyaan, usulan panduan baru, koreksi data build, atau ingin menjalin kemitraan sponsorship & affiliate? Kami siap mendengar dari Anda.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(0, 242, 254, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mail size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                Surel Redaksi & Info
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 6 }}>
                Untuk saran, feedback guide, dan koreksi database.
              </p>
              <a href="mailto:redaksi@seraphigame.id" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                redaksi@seraphigame.id
              </a>
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Handshake size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                Kerjasama & Bisnis
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 6 }}>
                Kemitraan publisher game, slot iklan banner, dan affiliate resmi.
              </p>
              <a href="mailto:partner@seraphigame.id" style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
                partner@seraphigame.id
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 32,
          }}
        >
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <MessageSquare size={18} color="var(--primary)" />
            Kirim Pesan Langsung
          </h2>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}

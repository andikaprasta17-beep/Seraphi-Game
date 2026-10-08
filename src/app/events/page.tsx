import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getEvents } from '@/lib/db';
import EventCard from '@/components/EventCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import GamingSidebar from '@/components/GamingSidebar';
import { getCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Kalender Event Game 2026 — Jadwal Festival, Turnamen & Hadiah Gratis',
  description:
    'Kalender lengkap jadwal event in-game Genshin Impact, Honkai Star Rail, Mobile Legends 515, Valorant Masters, dan event gaming menarik lainnya.',
  alternates: {
    canonical: getCanonicalUrl('/events'),
  },
};

const STATUS_FILTERS = [
  { label: 'Semua Status', value: '' },
  { label: 'Sedang Berlangsung', value: 'ACTIVE' },
  { label: 'Akan Datang', value: 'UPCOMING' },
  { label: 'Telah Berakhir', value: 'ENDED' },
];

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function GlobalEventsPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const currentStatus = status || undefined;
  const events = await getEvents({ status: currentStatus });

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <Breadcrumbs items={[{ label: 'Kalender Event' }]} />

      <div style={{ margin: '20px 0 30px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', marginBottom: 10 }}>
          Kalender Event Game
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 850, fontSize: '1.05rem', lineHeight: 1.6 }}>
          Jangan sampai ketinggalan event musiman, perayaan festival, dan turnamen esports berhadiah mata uang gacha dan skin gratis.
        </p>
      </div>

      <div className="layout-with-sidebar">
        {/* Main Events Catalog */}
        <div>
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 28 }}>
            {STATUS_FILTERS.map((f) => {
              const isActive = (!currentStatus && f.value === '') || currentStatus === f.value;
              return (
                <Link
                  key={f.value}
                  href={f.value ? `/events?status=${f.value}` : '/events'}
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          <div className="grid-cards">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Gaming Info Sidebar */}
        <aside>
          <div className="sidebar-sticky-wrapper">
            <GamingSidebar hideEvents />
          </div>
        </aside>
      </div>
    </div>
  );
}


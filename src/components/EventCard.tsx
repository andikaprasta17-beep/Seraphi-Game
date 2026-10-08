import React from 'react';
import { Calendar, Gift, ExternalLink } from 'lucide-react';
import { EventItem } from '@/lib/types';

interface EventCardProps {
  event: EventItem & { game_name?: string };
}

export default function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.start_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });
  const endDate = new Date(event.end_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="event-card">
      <div className="event-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="event-image"
          loading="lazy"
        />
        <div
          className={`status-badge ${
            event.status === 'ACTIVE'
              ? 'status-active'
              : event.status === 'UPCOMING'
              ? 'status-upcoming'
              : 'status-expired'
          }`}
          style={{ position: 'absolute', top: 12, left: 12 }}
        >
          {event.status === 'ACTIVE' ? 'Sedang Berlangsung' : event.status === 'UPCOMING' ? 'Akan Datang' : 'Berakhir'}
        </div>
      </div>

      <div className="event-content">
        <div className="event-date-badge">
          <Calendar size={13} />
          <span>{startDate} - {endDate}</span>
        </div>

        <h3 className="event-title">{event.title}</h3>
        {event.game_name && (
          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: 8 }}>
            {event.game_name}
          </div>
        )}
        <p className="event-desc">{event.description}</p>

        {event.rewards && (
          <div className="event-rewards">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Gift size={14} />
              <span><strong>Hadiah:</strong> {event.rewards}</span>
            </div>
          </div>
        )}

        {event.official_url && (
          <div style={{ marginTop: 14 }}>
            <a
              href={event.official_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Info Event Resmi</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

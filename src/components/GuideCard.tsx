import React from 'react';
import Link from 'next/link';
import { Clock, Eye } from 'lucide-react';
import { Guide } from '@/lib/types';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const formattedDate = new Date(guide.published_at || guide.created_at || guide.updated_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/guides/${guide.slug}`} className="guide-card">
      <div className="guide-thumb-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={guide.thumbnail}
          alt={guide.title}
          className="guide-thumb-img"
          loading="lazy"
        />
        <div className="guide-category-badge">{guide.category}</div>
      </div>

      <div className="guide-body">
        <h3 className="guide-title">{guide.title}</h3>
        <p className="guide-excerpt">{guide.excerpt}</p>

        <div className="guide-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} />
            {formattedDate}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Eye size={12} />
            {(guide.views ?? 0).toLocaleString()} views
          </span>
        </div>
      </div>
    </Link>
  );
}

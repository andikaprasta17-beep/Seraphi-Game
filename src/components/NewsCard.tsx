import React from 'react';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { News } from '@/lib/types';

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formattedDate = new Date(news.published_at || news.created_at || news.updated_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/news/${news.slug}`} className="news-card">
      <div className="news-thumb-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={news.thumbnail}
          alt={news.title}
          className="news-thumb-img"
          loading="lazy"
        />
        <div className="news-category-badge">{news.category}</div>
      </div>

      <div className="news-body">
        <h3 className="news-title">{news.title}</h3>
        <p className="news-excerpt">{news.excerpt}</p>

        <div className="news-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={12} />
            {formattedDate}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <User size={12} />
            {news.author}
          </span>
        </div>
      </div>
    </Link>
  );
}

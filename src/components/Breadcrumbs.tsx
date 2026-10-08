import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: process.env.NEXT_PUBLIC_SITE_URL || 'https://seraphigame.id',
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      item: item.href
        ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://seraphigame.id'}${item.href}`
        : undefined,
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Home size={14} />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight size={12} className="breadcrumb-separator" />
              {isLast || !item.href ? (
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}

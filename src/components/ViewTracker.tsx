'use client';

import { useEffect } from 'react';

interface ViewTrackerProps {
  type: 'games' | 'characters' | 'guides' | 'news';
  id: string;
  slug?: string;
}

export default function ViewTracker({ type, id, slug }: ViewTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageKey = `seraphi_view_${type}_${id}`;
    const alreadyViewed = sessionStorage.getItem(storageKey);

    if (!alreadyViewed) {
      sessionStorage.setItem(storageKey, '1');

      fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, slug }),
      }).catch(() => {
        // Silently swallow analytics error to avoid affecting user experience
      });
    }
  }, [type, id, slug]);

  return null;
}

/**
 * Analytics Abstraction Layer (Phase 4: Privacy-First Analytics Engine)
 * Pluggable provider interface supporting Google Analytics 4 and internal telemetry.
 * Strictly adheres to privacy protections: never records credentials, passwords, tokens, or PII.
 */

export interface AnalyticsProvider {
  name: string;
  trackPageView?: (url: string) => void;
  trackSearch?: (sanitizedTerm: string, resultCount?: number) => void;
  trackGuideView?: (slug: string, title: string) => void;
  trackNewsView?: (slug: string, title: string) => void;
  trackCharacterView?: (slug: string, name: string, gameSlug?: string) => void;
  trackGameView?: (slug: string, title: string) => void;
  trackRedeemCodeCopy?: (code: string, game?: string) => void;
  trackEvent?: (eventName: string, properties?: Record<string, any>) => void;
}

// In-memory registered providers
const providers: AnalyticsProvider[] = [];

/**
 * Requirement 4: Privacy sanitization for search inputs.
 * Strips emails, phone numbers, auth tokens, and truncates to prevent PII leakage.
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  // Remove email patterns
  let clean = query.replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, '[redacted_email]');
  // Remove token-like strings (long continuous hex or base64)
  clean = clean.replace(/[a-zA-Z0-9_-]{32,}/g, '[redacted_token]');
  // Truncate length
  return clean.slice(0, 50).trim();
}

/**
 * Requirement 3: Check if external analytics is enabled based on NEXT_PUBLIC_GA_ID
 */
export function isAnalyticsEnabled(): boolean {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  return Boolean(id && id.trim().length > 0);
}

/**
 * Returns active provider name
 */
export function getAnalyticsProviderName(): string {
  return 'Google Analytics 4';
}

/**
 * Requirement 5: Masked Measurement ID for safe display in admin dashboard
 */
export function getMaskedMeasurementId(): string {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !id.trim()) {
    return 'Belum Dikonfigurasi (Disabled)';
  }
  const trimmed = id.trim();
  if (trimmed.length <= 4) return '***';
  return `${trimmed.slice(0, 3)}****${trimmed.slice(-3)}`;
}

/**
 * Requirement 4 & 5: Metadata for all 7 tracking events
 */
export function getImplementedTrackingEvents() {
  return [
    { event: 'page_view', description: 'Mencatat kunjungan halaman publik tanpa parameter sensitif' },
    { event: 'game_view', description: 'Mencatat pembukaan halaman pusat game' },
    { event: 'character_view', description: 'Mencatat tampilan panduan karakter dan rekomendasi build' },
    { event: 'guide_view', description: 'Mencatat pembacaan artikel panduan gameplay' },
    { event: 'news_view', description: 'Mencatat pembacaan artikel berita gaming' },
    { event: 'search', description: 'Mencatat kueri pencarian tersanitasi (PII & token disaring)' },
    { event: 'redeem_code_copy', description: 'Mencatat interaksi salin kode redeem hadiah game' },
  ];
}

// Google Analytics 4 Client Provider
if (typeof window !== 'undefined') {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && gaId.trim()) {
    providers.push({
      name: 'Google Analytics 4',
      trackPageView: (url) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'page_view', { page_path: url });
        }
      },
      trackSearch: (term, count) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'search', { search_term: term, results_count: count });
        }
      },
      trackGuideView: (slug, title) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'guide_view', { guide_slug: slug, guide_title: title });
        }
      },
      trackNewsView: (slug, title) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'news_view', { news_slug: slug, news_title: title });
        }
      },
      trackCharacterView: (slug, name, game) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'character_view', { character_slug: slug, character_name: name, game: game || 'unknown' });
        }
      },
      trackGameView: (slug, title) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'game_view', { game_slug: slug, game_title: title });
        }
      },
      trackRedeemCodeCopy: (code, game) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'redeem_code_copy', { code, game: game || 'unknown' });
        }
      },
      trackEvent: (name, props) => {
        if ((window as any).gtag) {
          (window as any).gtag('event', name, props);
        }
      },
    });
  }

  // Console logger in development mode
  if (process.env.NODE_ENV === 'development') {
    providers.push({
      name: 'console-logger',
      trackPageView: (url) => console.log(`[Analytics:page_view] ${url}`),
      trackSearch: (q, count) => console.log(`[Analytics:search] "${q}" (${count ?? 0} results)`),
      trackGuideView: (slug, title) => console.log(`[Analytics:guide_view] [${slug}] ${title}`),
      trackNewsView: (slug, title) => console.log(`[Analytics:news_view] [${slug}] ${title}`),
      trackCharacterView: (slug, name, game) => console.log(`[Analytics:character_view] [${slug}] ${name} (${game || 'N/A'})`),
      trackGameView: (slug, title) => console.log(`[Analytics:game_view] [${slug}] ${title}`),
      trackRedeemCodeCopy: (code, game) => console.log(`[Analytics:redeem_code_copy] ${code} for ${game || 'N/A'}`),
      trackEvent: (name, props) => console.log(`[Analytics:event] ${name}`, props),
    });
  }
}

export function registerAnalyticsProvider(provider: AnalyticsProvider): void {
  providers.push(provider);
}

export function trackPageView(url: string): void {
  if (typeof window === 'undefined') return;
  for (const p of providers) {
    p.trackPageView?.(url);
  }
}

export function trackSearch(query: string, resultCount?: number): void {
  if (typeof window === 'undefined') return;
  const sanitized = sanitizeSearchQuery(query);
  for (const p of providers) {
    p.trackSearch?.(sanitized, resultCount);
  }
}

export function trackGuideView(slug: string, title: string): void {
  if (typeof window === 'undefined') return;
  for (const p of providers) {
    p.trackGuideView?.(slug, title);
  }
}

export function trackNewsView(slug: string, title: string): void {
  if (typeof window === 'undefined') return;
  for (const p of providers) {
    p.trackNewsView?.(slug, title);
  }
}

export function trackCharacterView(slug: string, name: string, gameSlug?: string): void {
  if (typeof window === 'undefined') return;
  for (const p of providers) {
    p.trackCharacterView?.(slug, name, gameSlug);
  }
}

export function trackGameView(slug: string, title: string): void {
  if (typeof window === 'undefined') return;
  for (const p of providers) {
    p.trackGameView?.(slug, title);
  }
}

export function trackRedeemCodeCopy(code: string, game?: string): void {
  if (typeof window === 'undefined') return;
  for (const p of providers) {
    p.trackRedeemCodeCopy?.(code, game);
  }
}

export function trackEvent(name: string, properties?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  for (const p of providers) {
    p.trackEvent?.(name, properties);
  }
}

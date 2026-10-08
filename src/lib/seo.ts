import { ContentStatus, FaqItem } from './types';

const SITE_NAME = 'Seraphi Game';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seraphigame.id';

export interface SeoTitleOptions {
  type: 'game' | 'character' | 'guide' | 'news' | 'author' | 'default';
  name?: string;
  title?: string;
  gameName?: string;
  game_name?: string;
  meta_title?: string;
  customTitle?: string;
}

export interface SeoDescriptionOptions {
  type: 'game' | 'character' | 'guide' | 'news' | 'author' | 'default';
  name?: string;
  title?: string;
  description?: string;
  excerpt?: string;
  fallbackText?: string;
  role?: string;
  element?: string;
  gameName?: string;
  game_name?: string;
  meta_description?: string;
  customDesc?: string;
}

/**
 * Requirement 9: SEO Title Generation helper based on content type.
 * Supports both options object and positional arguments.
 */
export function generateSeoTitle(
  typeOrOptions: 'game' | 'character' | 'guide' | 'news' | 'author' | 'default' | SeoTitleOptions,
  data?: {
    name?: string;
    title?: string;
    game_name?: string;
    meta_title?: string;
  },
  customTitle?: string
): string {
  let type: 'game' | 'character' | 'guide' | 'news' | 'author' | 'default';
  let name = '';
  let title = '';
  let meta_title = '';
  let custom = '';

  if (typeof typeOrOptions === 'object') {
    type = typeOrOptions.type;
    name = typeOrOptions.name || typeOrOptions.title || '';
    title = typeOrOptions.title || typeOrOptions.name || '';
    meta_title = typeOrOptions.meta_title || '';
    custom = typeOrOptions.customTitle || '';
  } else {
    type = typeOrOptions;
    name = data?.name || data?.title || '';
    title = data?.title || data?.name || '';
    meta_title = data?.meta_title || '';
    custom = customTitle || '';
  }

  if (custom && custom.trim()) {
    return custom.trim();
  }
  if (meta_title && meta_title.trim()) {
    return meta_title.trim();
  }

  switch (type) {
    case 'game':
      return `${name} — Info, Karakter, Guide & Redeem Code | ${SITE_NAME}`;
    case 'character':
      return `${name} Build — Senjata, Artifact & Team | ${SITE_NAME}`;
    case 'guide':
      return `${title} — Panduan Lengkap & Tips | ${SITE_NAME}`;
    case 'news':
      return `${title} — Update Game | ${SITE_NAME}`;
    case 'author':
      return `${name} — Profil Kontributor & Penulis | ${SITE_NAME}`;
    default:
      return `${title || name || 'Portal Database Game'} | ${SITE_NAME}`;
  }
}

/**
 * Requirement 10: SEO Meta Description helper (optimized around 140–160 chars).
 * Supports both options object and positional arguments.
 */
export function generateSeoDescription(
  typeOrOptions: 'game' | 'character' | 'guide' | 'news' | 'author' | 'default' | SeoDescriptionOptions,
  data?: {
    name?: string;
    description?: string;
    excerpt?: string;
    role?: string;
    element?: string;
    game_name?: string;
    meta_description?: string;
  },
  customDesc?: string
): string {
  let type: 'game' | 'character' | 'guide' | 'news' | 'author' | 'default';
  let name = '';
  let description = '';
  let excerpt = '';
  let role = '';
  let element = '';
  let game_name = '';
  let meta_description = '';
  let custom = '';

  if (typeof typeOrOptions === 'object') {
    type = typeOrOptions.type;
    name = typeOrOptions.name || typeOrOptions.title || '';
    description = typeOrOptions.description || typeOrOptions.fallbackText || '';
    excerpt = typeOrOptions.excerpt || typeOrOptions.fallbackText || '';
    role = typeOrOptions.role || '';
    element = typeOrOptions.element || '';
    game_name = typeOrOptions.gameName || typeOrOptions.game_name || '';
    meta_description = typeOrOptions.meta_description || '';
    custom = typeOrOptions.customDesc || '';
  } else {
    type = typeOrOptions;
    name = data?.name || '';
    description = data?.description || '';
    excerpt = data?.excerpt || '';
    role = data?.role || '';
    element = data?.element || '';
    game_name = data?.game_name || '';
    meta_description = data?.meta_description || '';
    custom = customDesc || '';
  }

  if (custom && custom.trim()) {
    return truncate(custom.trim(), 160);
  }
  if (meta_description && meta_description.trim()) {
    return truncate(meta_description.trim(), 160);
  }

  let text = '';
  switch (type) {
    case 'game':
      text = `Informasi lengkap ${name}: database karakter, panduan build, tier list, item terbaik, event, dan kode redeem gratis terbaru di ${SITE_NAME}.`;
      break;
    case 'character':
      text = `Panduan build terbaik ${name} (${role || 'Karakter'} ${element || ''}): rekomendasi senjata, artefak, status utama, sub-stat, dan komposisi tim.`;
      break;
    case 'guide':
      text = excerpt || `Panduan terlengkap dan strategi bermain ${game_name ? `untuk ${game_name}` : ''}. Pelajari tips praktis, rekomendasi build, dan trik terbaru.`;
      break;
    case 'news':
      text = excerpt || `Update berita game terkini seputar patch, event, pengumuman karakter baru, dan jadwal rilis resmi di ${SITE_NAME}.`;
      break;
    case 'author':
      text = description || `Kumpulan artikel, ulasan, dan panduan gaming yang ditulis oleh ${name} di portal Seraphi Game.`;
      break;
    default:
      text = description || excerpt || `Portal database game, karakter, panduan build, tier list, dan kode redeem terpercaya di ${SITE_NAME}.`;
      break;
  }

  return truncate(text, 160);
}

function truncate(str: string, maxLen: number): string {
  if (!str) return '';
  const clean = str.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 3).trim() + '...';
}

/**
 * Phase 4: Dynamic Site URL resolver respecting NEXT_PUBLIC_SITE_URL.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://seraphigame.id';
  return url.replace(/\/+$/, '');
}

/**
 * Phase 4: Check if system is running in production content mode.
 */
export function isProductionMode(): boolean {
  return process.env.CONTENT_MODE === 'production';
}

/**
 * Phase 4: Check if global search engine indexing is permitted.
 */
export function isIndexingEnabled(): boolean {
  return process.env.INDEXING_ENABLED !== 'false';
}

/**
 * Requirement 11 / Phase 4: Canonical URL helper avoiding duplicate query parameters.
 */
export function getCanonicalUrl(pathname: string): string {
  // Strip trailing slash and query params
  const cleanPath = pathname.split('?')[0].replace(/\/+$/, '') || '';
  const base = getSiteUrl();
  return cleanPath ? `${base}${cleanPath}` : base;
}

/**
 * Requirement 12 / Phase 4: Indexability directive helper based on content status, demo status, and global switches.
 */
export function getRobotsDirective(
  status?: string,
  noIndexOverride?: boolean,
  isDemo?: boolean
): { index: boolean; follow: boolean } {
  // Global safety kill-switch: if INDEXING_ENABLED=false, noindex everything
  if (!isIndexingEnabled()) {
    return { index: false, follow: false };
  }

  // Explicit override per content
  if (noIndexOverride) {
    return { index: false, follow: false };
  }

  // Non-published content (DRAFT, REVIEW, ARCHIVED) is strictly noindex
  if (status && (status === 'DRAFT' || status === 'REVIEW' || status === 'ARCHIVED')) {
    return { index: false, follow: false };
  }

  // Phase 4: In production mode, demo content (is_demo=1) must not be indexed
  if (isProductionMode() && (isDemo === true || (isDemo as any) === 1)) {
    return { index: false, follow: false };
  }

  return { index: true, follow: true };
}

/**
 * Requirement 6: FAQ Schema Generator.
 * Returns null if no visible FAQ items exist, ensuring honest schema rendering.
 */
export function generateFaqSchema(faqs?: FaqItem[] | null) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

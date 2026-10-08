/**
 * Affiliate and External Commercial Link Utilities
 * Adheres to Google and search engine guidelines for sponsored commercial relationships.
 */

export interface CommercialLinkOptions {
  isAffiliate?: boolean;
  isSponsored?: boolean;
}

/**
 * Generates appropriate `rel` attribute for anchor tags.
 * - Commercial / Affiliate links: `sponsored noopener noreferrer`
 * - Standard External links: `noopener noreferrer`
 */
export function getLinkRel(options?: CommercialLinkOptions): string {
  if (options?.isAffiliate || options?.isSponsored) {
    return 'sponsored noopener noreferrer';
  }
  return 'noopener noreferrer';
}

/**
 * Format an external URL as an explicit affiliate/partner link with optional tracking tags.
 */
export function formatAffiliateUrl(baseUrl: string, partnerTag = 'seraphi'): string {
  if (!baseUrl) return '#';
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('ref', partnerTag);
    url.searchParams.set('utm_source', 'seraphigame');
    url.searchParams.set('utm_medium', 'affiliate');
    return url.toString();
  } catch {
    return baseUrl;
  }
}

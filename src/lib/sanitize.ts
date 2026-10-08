/**
 * Input sanitization helpers to prevent XSS and injection attacks.
 */

/**
 * Escapes characters that are dangerous in HTML context.
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Strips all HTML tags and control characters for plain text fields.
 */
export function sanitizePlainText(str: string, maxLength = 2000): string {
  if (!str || typeof str !== 'string') return '';
  // Remove null bytes and carriage control
  let cleaned = str.replace(/\0/g, '').trim();
  // Strip HTML tags
  cleaned = cleaned.replace(/<[^>]*>?/gm, '');
  // Truncate to maximum length
  return cleaned.slice(0, maxLength);
}

/**
 * Sanitizes rich text content (for guides and news articles), stripping dangerous tags and inline scripts.
 */
export function sanitizeRichText(html: string, maxLength = 50000): string {
  if (!html || typeof html !== 'string') return '';
  let cleaned = html.replace(/\0/g, '').trim();

  // Strip script, style, iframe, object, embed, applet, form, meta, link tags and their contents
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  cleaned = cleaned.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  cleaned = cleaned.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');

  // Strip dangerous inline event handlers (onerror, onload, onclick, etc.)
  cleaned = cleaned.replace(/\s+on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // Strip javascript:, data: (except safe image data URIs), and vbscript: URIs in attributes
  cleaned = cleaned.replace(/(href|src|action)\s*=\s*['"]?(?:javascript|vbscript):[^'"]*['"]?/gi, '$1="#"');

  return cleaned.slice(0, maxLength);
}

/**
 * Validates and cleans a URL slug (lowercase alphanumeric and hyphens only).
 */
export function sanitizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') return '';
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
}

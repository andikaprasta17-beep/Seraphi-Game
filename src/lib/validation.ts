import { sanitizePlainText, sanitizeRichText, sanitizeSlug } from './sanitize';

export const VALID_CONTENT_STATUSES = ['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED'] as const;
export type ContentStatus = typeof VALID_CONTENT_STATUSES[number];

export function isValidContentStatus(status: any): status is ContentStatus {
  return VALID_CONTENT_STATUSES.includes(status);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function validateContactInput(data: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}): ValidationResult<{ name: string; email: string; subject: string; message: string }> {
  const name = sanitizePlainText(data.name || '', 100);
  const email = (data.email || '').trim().toLowerCase().slice(0, 120);
  const subject = sanitizePlainText(data.subject || '', 200);
  const message = sanitizePlainText(data.message || '', 3000);

  if (!name || name.length < 2) {
    return { success: false, error: 'Nama minimal 2 karakter' };
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return { success: false, error: 'Format email tidak valid' };
  }
  if (!subject || subject.length < 3) {
    return { success: false, error: 'Subjek minimal 3 karakter' };
  }
  if (!message || message.length < 10) {
    return { success: false, error: 'Pesan minimal 10 karakter' };
  }

  return {
    success: true,
    data: { name, email, subject, message },
  };
}

export function validateRedeemCodeInput(data: {
  game_id?: string;
  code?: string;
  reward?: string;
  status?: string;
  source?: string;
  expired_at?: string;
}): ValidationResult<{
  game_id: string;
  code: string;
  reward: string;
  status: 'ACTIVE' | 'EXPIRED';
  source: string;
  expired_at: string;
}> {
  const game_id = sanitizePlainText(data.game_id || '', 60);
  const code = sanitizePlainText(data.code || '', 50).toUpperCase();
  const reward = sanitizePlainText(data.reward || '', 255);
  const source = sanitizePlainText(data.source || 'Official Community', 100);
  const expired_at = sanitizePlainText(data.expired_at || 'Tidak ada batas waktu', 100);
  const rawStatus = (data.status || 'ACTIVE').toUpperCase();
  const status = rawStatus === 'EXPIRED' ? 'EXPIRED' : 'ACTIVE';

  if (!game_id) {
    return { success: false, error: 'Game ID wajib diisi' };
  }
  if (!code || code.length < 3) {
    return { success: false, error: 'Kode redeem minimal 3 karakter' };
  }
  if (!reward || reward.length < 3) {
    return { success: false, error: 'Deskripsi hadiah minimal 3 karakter' };
  }

  return {
    success: true,
    data: { game_id, code, reward, status, source, expired_at },
  };
}

export function validateGuideInput(data: {
  game_id?: string;
  title?: string;
  slug?: string;
  category?: string;
  thumbnail?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  status?: string;
  tags?: string[] | string;
}): ValidationResult<{
  game_id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  author: string;
  status: ContentStatus;
  tags: string[];
}> {
  const title = sanitizePlainText(data.title || '', 200);
  const slug = sanitizeSlug(data.slug || title);
  const game_id = sanitizePlainText(data.game_id || '', 60);
  const category = sanitizePlainText(data.category || 'Build', 50);
  const thumbnail = sanitizePlainText(data.thumbnail || '', 500);
  const excerpt = sanitizePlainText(data.excerpt || '', 400);
  const content = sanitizeRichText(data.content || '', 50000);
  const author = sanitizePlainText(data.author || 'Seraphi Editorial', 100);

  let status: ContentStatus = 'PUBLISHED';
  if (data.status && isValidContentStatus(data.status.toUpperCase())) {
    status = data.status.toUpperCase() as ContentStatus;
  }

  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags.map((t) => sanitizePlainText(String(t), 30)).filter(Boolean);
  } else if (typeof data.tags === 'string') {
    tags = data.tags
      .split(',')
      .map((t) => sanitizePlainText(t.trim(), 30))
      .filter(Boolean);
  }

  if (!game_id) return { success: false, error: 'Game ID wajib diisi' };
  if (!title || title.length < 5) return { success: false, error: 'Judul guide minimal 5 karakter' };
  if (!slug || slug.length < 3) return { success: false, error: 'Slug tidak valid' };
  if (!content || content.length < 20) return { success: false, error: 'Konten guide minimal 20 karakter' };

  return {
    success: true,
    data: {
      game_id,
      title,
      slug,
      category,
      thumbnail: thumbnail || '/images/placeholder-guide.svg',
      excerpt: excerpt || title,
      content,
      author,
      status,
      tags: tags.length > 0 ? tags : ['Guide', 'Build'],
    },
  };
}

export function validateNewsInput(data: {
  game_id?: string;
  title?: string;
  slug?: string;
  category?: string;
  thumbnail?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  status?: string;
  tags?: string[] | string;
}): ValidationResult<{
  game_id?: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  author: string;
  status: ContentStatus;
  tags: string[];
}> {
  const title = sanitizePlainText(data.title || '', 200);
  const slug = sanitizeSlug(data.slug || title);
  const game_id = data.game_id ? sanitizePlainText(data.game_id, 60) : undefined;
  const category = sanitizePlainText(data.category || 'Update', 50);
  const thumbnail = sanitizePlainText(data.thumbnail || '', 500);
  const excerpt = sanitizePlainText(data.excerpt || '', 400);
  const content = sanitizeRichText(data.content || '', 50000);
  const author = sanitizePlainText(data.author || 'Seraphi News', 100);

  let status: ContentStatus = 'PUBLISHED';
  if (data.status && isValidContentStatus(data.status.toUpperCase())) {
    status = data.status.toUpperCase() as ContentStatus;
  }

  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags.map((t) => sanitizePlainText(String(t), 30)).filter(Boolean);
  } else if (typeof data.tags === 'string') {
    tags = data.tags
      .split(',')
      .map((t) => sanitizePlainText(t.trim(), 30))
      .filter(Boolean);
  }

  if (!title || title.length < 5) return { success: false, error: 'Judul berita minimal 5 karakter' };
  if (!slug || slug.length < 3) return { success: false, error: 'Slug tidak valid' };
  if (!content || content.length < 20) return { success: false, error: 'Konten berita minimal 20 karakter' };

  return {
    success: true,
    data: {
      game_id,
      title,
      slug,
      category,
      thumbnail: thumbnail || '/images/placeholder-news.svg',
      excerpt: excerpt || title,
      content,
      author,
      status,
      tags: tags.length > 0 ? tags : ['News', 'Update'],
    },
  };
}

export function validateGame(data: any): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    return { valid: false, error: 'Nama game minimal 2 karakter' };
  }
  if (!data.slug || typeof data.slug !== 'string' || data.slug.trim().length < 2) {
    return { valid: false, error: 'Slug game minimal 2 karakter' };
  }
  return { valid: true };
}

export function validateCharacter(data: any): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    return { valid: false, error: 'Nama karakter minimal 2 karakter' };
  }
  if (!data.slug || typeof data.slug !== 'string' || data.slug.trim().length < 2) {
    return { valid: false, error: 'Slug karakter minimal 2 karakter' };
  }
  if (!data.game_id || typeof data.game_id !== 'string') {
    return { valid: false, error: 'Game ID karakter wajib diisi' };
  }
  return { valid: true };
}

export function validateItem(data: any): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    return { valid: false, error: 'Nama item minimal 2 karakter' };
  }
  if (!data.slug || typeof data.slug !== 'string' || data.slug.trim().length < 2) {
    return { valid: false, error: 'Slug item minimal 2 karakter' };
  }
  return { valid: true };
}

export function validateGuide(data: any): { valid: boolean; error?: string } {
  const res = validateGuideInput(data);
  return { valid: res.success, error: res.error };
}


import crypto from 'node:crypto';

// Use SESSION_SECRET or ADMIN_SECRET from environment variables
function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[SECURITY WARNING] SESSION_SECRET is not set in production! Please configure SESSION_SECRET in environment variables.'
      );
    }
    return 'seraphi-dev-session-key-fallback-never-use-in-prod-9834710';
  }
  return secret;
}

const SALT = process.env.AUTH_SALT || 'seraphi-salt-auth-token-9988';

export const AUTH_COOKIE_NAME = 'seraphi_admin_token';

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SALT, 10000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  if (!password || !hash) return false;
  try {
    const checkHash = hashPassword(password);
    const bufA = Buffer.from(checkHash);
    const bufB = Buffer.from(hash);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export function createSessionToken(userId: string, username: string): string {
  const payload = JSON.stringify({
    userId,
    username,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): { userId: string; username: string } | null {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', getSessionSecret())
      .update(encodedPayload)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    if (!payload.userId || !payload.username) {
      return null;
    }

    return { userId: payload.userId, username: payload.username };
  } catch {
    return null;
  }
}

import { NextResponse } from 'next/server';
import { getAdminUser, syncAdminUserFromEnv } from '@/lib/db';
import { verifyPassword, createSessionToken, AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from '@/lib/auth';
import { checkRateLimit, resetRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // Synchronize admin credentials with environment configuration if provided
    await syncAdminUserFromEnv();

    const ip = getClientIp(request);
    // Rate limit: 5 login attempts per 15 minutes per IP
    const rateCheck = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan login gagal. Silakan coba lagi dalam ${rateCheck.resetInSeconds} detik.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.resetInSeconds) },
        }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi dengan benar' },
        { status: 400 }
      );
    }

    const admin = await getAdminUser(username.trim());
    if (!admin) {
      return NextResponse.json(
        { error: 'Kredensial login tidak valid' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Kredensial login tidak valid' },
        { status: 401 }
      );
    }

    // Success: reset rate limit for this IP
    resetRateLimit(`login:${ip}`);

    const token = createSessionToken(admin.id, admin.username);

    const response = NextResponse.json({
      success: true,
      user: { id: admin.id, username: admin.username, role: admin.role },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      ...AUTH_COOKIE_OPTIONS,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}

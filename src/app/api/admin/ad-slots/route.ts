import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { updateAdSlot, getAdSlots } from '@/lib/db';
import { sanitizePlainText } from '@/lib/sanitize';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return false;
  return Boolean(verifySessionToken(token));
}

export async function GET() {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ adSlots: await getAdSlots() });
}

export async function PUT(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, is_active, image_url, target_url, label } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'ID slot iklan wajib disertakan' }, { status: 400 });
    }

    await updateAdSlot(id, {
      is_active: typeof is_active === 'boolean' ? is_active : true,
      image_url: image_url ? sanitizePlainText(image_url, 500) : undefined,
      target_url: target_url ? sanitizePlainText(target_url, 500) : undefined,
      label: label ? sanitizePlainText(label, 100) : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

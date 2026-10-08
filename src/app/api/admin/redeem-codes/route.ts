import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { insertRedeemCode, updateRedeemCode, deleteRedeemCode, getRedeemCodes } from '@/lib/db';
import { validateRedeemCodeInput } from '@/lib/validation';

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
  return NextResponse.json({ codes: await getRedeemCodes() });
}

export async function POST(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = validateRedeemCodeInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.error || 'Data kode redeem tidak valid' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newCode = await insertRedeemCode({
      id: `code-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      game_id: validation.data.game_id,
      code: validation.data.code,
      reward: validation.data.reward,
      status: validation.data.status,
      expired_at: validation.data.expired_at,
      source: validation.data.source,
      last_checked: now,
      verified_at: now,
    });

    return NextResponse.json({ success: true, code: newCode });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'ID kode wajib disertakan' }, { status: 400 });
    }

    if (updates.status && updates.status !== 'ACTIVE' && updates.status !== 'EXPIRED') {
      updates.status = 'ACTIVE';
    }

    // Set verified_at when updated by admin
    updates.verified_at = new Date().toISOString();
    updates.last_checked = new Date().toISOString();

    await updateRedeemCode(id, updates);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID kode wajib disertakan' }, { status: 400 });
    }

    await deleteRedeemCode(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { verifyRedeemCode } from '@/lib/redeem-verification';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code_id, provider } = body;

    if (!code_id) {
      return NextResponse.json({ error: 'code_id wajib disertakan' }, { status: 400 });
    }

    const result = await verifyRedeemCode(code_id, provider || 'manual');

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Gagal memverifikasi redeem code.' },
      { status: 500 }
    );
  }
}

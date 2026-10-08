import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { toggleDemoStatus } from '@/lib/db';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return false;
  return Boolean(verifySessionToken(token));
}

export async function POST(req: NextRequest) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { table, id, is_demo } = body;

    const validTables = ['games', 'characters', 'guides', 'news', 'items', 'redeem_codes', 'events'];
    if (!table || !validTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid content table' }, { status: 400 });
    }

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid content ID' }, { status: 400 });
    }

    await toggleDemoStatus(table, id);

    return NextResponse.json({
      success: true,
      message: `Content ${id} in ${table} updated to is_demo=${Boolean(is_demo)}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to toggle demo status' }, { status: 500 });
  }
}

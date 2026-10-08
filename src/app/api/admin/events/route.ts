import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { insertEventItem, deleteEventItem, getEvents } from '@/lib/db';
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
  return NextResponse.json({ events: await getEvents() });
}

export async function POST(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const game_id = sanitizePlainText(body.game_id || '', 60);
    const title = sanitizePlainText(body.title || '', 200);

    if (!game_id || !title) {
      return NextResponse.json({ error: 'Game ID dan judul event wajib diisi' }, { status: 400 });
    }

    const description = sanitizePlainText(body.description || '', 2000);
    const image = sanitizePlainText(body.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', 500);
    const start_date = sanitizePlainText(body.start_date || new Date().toISOString(), 40);
    const end_date = sanitizePlainText(body.end_date || new Date(Date.now() + 86400000 * 14).toISOString(), 40);
    const status = (body.status === 'UPCOMING' || body.status === 'ENDED') ? body.status : 'ACTIVE';
    const official_url = sanitizePlainText(body.official_url || '', 500);
    const rewards = sanitizePlainText(body.rewards || 'Hadiah in-game eksklusif', 500);

    const newEvent = await insertEventItem({
      id: `event-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      game_id,
      title,
      description,
      image,
      start_date,
      end_date,
      status,
      official_url,
      rewards,
    });

    return NextResponse.json({ success: true, event: newEvent });
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
      return NextResponse.json({ error: 'ID event wajib disertakan' }, { status: 400 });
    }

    await deleteEventItem(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

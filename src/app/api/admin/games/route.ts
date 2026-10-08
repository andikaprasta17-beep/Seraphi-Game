import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { insertGame, updateGame, deleteGame, getGames } from '@/lib/db';
import { sanitizePlainText, sanitizeSlug } from '@/lib/sanitize';

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
  // Admin sees all games including draft and archived
  return NextResponse.json({ games: await getGames(false) });
}

export async function POST(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const rawName = body.name;
    const rawSlug = body.slug;

    if (!rawName || !rawSlug) {
      return NextResponse.json({ error: 'Nama dan slug wajib diisi' }, { status: 400 });
    }

    const name = sanitizePlainText(String(rawName), 100);
    const slug = sanitizeSlug(String(rawSlug));
    const cover_image = sanitizePlainText(body.cover_image || '', 500);
    const banner_image = sanitizePlainText(body.banner_image || '', 500);
    const description = sanitizePlainText(body.description || '', 3000);
    const developer = sanitizePlainText(body.developer || 'Indie Studio', 100);
    const publisher = sanitizePlainText(body.publisher || 'Self-Published', 100);
    const release_date = sanitizePlainText(body.release_date || new Date().toISOString().split('T')[0], 30);
    const status = sanitizePlainText(body.status || 'Active', 30);
    const official_url = sanitizePlainText(body.official_url || '', 500);

    const platforms = Array.isArray(body.platforms)
      ? body.platforms.map((p: any) => sanitizePlainText(String(p), 30))
      : ['PC'];
    const genres = Array.isArray(body.genres)
      ? body.genres.map((g: any) => sanitizePlainText(String(g), 30))
      : ['Action RPG'];

    const newGame = await insertGame({
      id: `game-${slug}-${Date.now().toString(36)}`,
      name,
      slug,
      cover_image: cover_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
      banner_image: banner_image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600',
      description,
      developer,
      publisher,
      release_date,
      platforms,
      genres,
      status,
      rating: Number(body.rating) || 4.5,
      official_url,
    });

    return NextResponse.json({ success: true, game: newGame });
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
      return NextResponse.json({ error: 'ID game wajib disertakan' }, { status: 400 });
    }

    if (updates.name) updates.name = sanitizePlainText(updates.name, 100);
    if (updates.slug) updates.slug = sanitizeSlug(updates.slug);
    if (updates.description) updates.description = sanitizePlainText(updates.description, 3000);

    await updateGame(id, updates);
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
      return NextResponse.json({ error: 'ID game wajib disertakan' }, { status: 400 });
    }

    await deleteGame(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

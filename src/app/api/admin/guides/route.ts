import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { insertGuide, updateGuide, deleteGuide, getGuides } from '@/lib/db';
import { validateGuideInput } from '@/lib/validation';

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
  return NextResponse.json({ guides: await getGuides({ onlyPublished: false }) });
}

export async function POST(request: Request) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = validateGuideInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.error || 'Data guide tidak valid' },
        { status: 400 }
      );
    }

    const newGuide = await insertGuide({
      id: `guide-${validation.data.slug}-${Date.now().toString(36)}`,
      game_id: validation.data.game_id,
      title: validation.data.title,
      slug: validation.data.slug,
      category: validation.data.category,
      thumbnail: validation.data.thumbnail,
      excerpt: validation.data.excerpt,
      content: validation.data.content,
      author: validation.data.author,
      published_at: new Date().toISOString(),
      tags: validation.data.tags,
      status: validation.data.status,
    });

    return NextResponse.json({ success: true, guide: newGuide });
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
      return NextResponse.json({ error: 'ID guide wajib disertakan' }, { status: 400 });
    }

    await updateGuide(id, updates);
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
      return NextResponse.json({ error: 'ID guide wajib disertakan' }, { status: 400 });
    }

    await deleteGuide(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}

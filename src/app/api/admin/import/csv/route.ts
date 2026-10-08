import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { importContentFromCsv } from '@/lib/csv-import';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { entity, csv } = body;

    if (!entity || !['games', 'characters', 'items', 'guides'].includes(entity)) {
      return NextResponse.json(
        { error: 'Entitas tidak valid. Pilih antara games, characters, items, atau guides.' },
        { status: 400 }
      );
    }

    if (!csv || typeof csv !== 'string' || !csv.trim()) {
      return NextResponse.json(
        { error: 'Konten CSV tidak boleh kosong.' },
        { status: 400 }
      );
    }

    const result = await importContentFromCsv(entity as any, csv);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan saat memproses CSV import.' },
      { status: 500 }
    );
  }
}

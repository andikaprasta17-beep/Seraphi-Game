import { NextResponse } from 'next/server';
import { getGames } from '@/lib/db';

export async function GET() {
  try {
    // Perform a lightweight database query to confirm database connectivity
    const games = await getGames(false);
    const dbConnected = Array.isArray(games);

    if (!dbConnected) {
      return NextResponse.json(
        {
          status: 'error',
          service: 'seraphi-game',
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    // Secure response: strictly omits filesystem paths, database paths, secrets, env vars, stack traces
    return NextResponse.json(
      {
        status: 'ok',
        service: 'seraphi-game',
        timestamp: new Date().toISOString(),
        database: 'connected',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch {
    // Never leak stack trace or internal details
    return NextResponse.json(
      {
        status: 'error',
        service: 'seraphi-game',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { incrementViews } from '@/lib/db';

// In-memory view throttling map: key -> timestamp (ms)
// Key: `${clientIp}_${type}_${id}`
const viewCooldowns = new Map<string, number>();
const COOLDOWN_MS = 60 * 1000; // 60 seconds per entity per client

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, id, slug } = body;

    const validTypes = ['games', 'characters', 'guides', 'news'];
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid entity type' }, { status: 400 });
    }

    const targetId = id || slug;
    if (!targetId || typeof targetId !== 'string') {
      return NextResponse.json({ error: 'Invalid entity identifier' }, { status: 400 });
    }

    // IP-based rate limiting / abuse prevention
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const throttleKey = `${ip}_${type}_${targetId}`;
    const now = Date.now();
    const lastViewTime = viewCooldowns.get(throttleKey);

    if (lastViewTime && now - lastViewTime < COOLDOWN_MS) {
      return NextResponse.json({ success: true, throttled: true });
    }

    // Update cooldown timestamp
    viewCooldowns.set(throttleKey, now);

    // Housekeeping: clean up old entries if map grows over 5000 items
    if (viewCooldowns.size > 5000) {
      const expiry = now - COOLDOWN_MS;
      for (const [key, ts] of viewCooldowns.entries()) {
        if (ts < expiry) {
          viewCooldowns.delete(key);
        }
      }
    }

    // Increment safe view counter in database
    await incrementViews(type as any, targetId);

    return NextResponse.json({ success: true, updated: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
  }
}

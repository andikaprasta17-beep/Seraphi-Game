import { NextResponse } from 'next/server';
import { validateContactInput } from '@/lib/validation';
import { insertContactMessage } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    // Rate limit: 20 contact messages per hour per IP
    const rateCheck = checkRateLimit(`contact:${ip}`, 20, 60 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Batas pengiriman pesan tercapai. Silakan coba lagi dalam ${Math.ceil(rateCheck.resetInSeconds / 60)} menit.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.resetInSeconds) },
        }
      );
    }

    const body = await request.json();
    const validation = validateContactInput(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.error || 'Data formulir tidak valid' },
        { status: 400 }
      );
    }

    const savedMessage = await insertContactMessage(validation.data);

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda berhasil dikirim dan tersimpan dengan aman.',
      id: savedMessage.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan sistem saat mengirim pesan' },
      { status: 500 }
    );
  }
}

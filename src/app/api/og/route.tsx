import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Portal Informasi Game, Karakter & Guide Terpercaya';
    const game = searchParams.get('game') || 'Seraphi Game';
    const category = searchParams.get('category') || 'Official Hub';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#070a13',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #151d30 2%, transparent 0%), radial-gradient(circle at 75px 75px, #0e1526 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '60px 70px',
            border: '8px solid #111a2e',
            color: '#f8fafc',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00f2fe, #4facfe)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '24px',
                  color: '#050811',
                }}
              >
                S
              </div>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: '#ffffff',
                }}
              >
                SERAPHI GAME
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 16px',
                borderRadius: '999px',
                backgroundColor: 'rgba(0, 242, 254, 0.12)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                fontSize: '18px',
                fontWeight: 700,
                color: '#00f2fe',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {category}
            </div>
          </div>

          {/* Body Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              margin: '30px 0',
            }}
          >
            {game && game !== 'Seraphi Game' && (
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#38bdf8',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {game}
              </div>
            )}
            <div
              style={{
                fontSize: title.length > 50 ? '48px' : '56px',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#ffffff',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#94a3b8',
              }}
            >
              Database • Guide • Build • Redeem Code
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#00f2fe',
              }}
            >
              seraphigame.id
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err: any) {
    // Ultra-reliable fallback in case of edge runtime rendering anomaly
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#070a13',
            color: '#00f2fe',
            fontSize: '48px',
            fontWeight: 800,
          }}
        >
          SERAPHI GAME
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}

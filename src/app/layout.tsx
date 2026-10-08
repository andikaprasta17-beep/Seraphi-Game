import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getSiteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://seraphigame.id'),
  title: {
    default: 'SERAPHI GAME — Info Game, Guide & Dunia Gaming Indonesia',
    template: '%s | SERAPHI GAME',
  },
  description:
    'Portal database game, berita terbaru, panduan build karakter, tier list, redeem code, dan event gaming terlengkap di Indonesia.',
  keywords: [
    'seraphi game',
    'game indonesia',
    'guide game',
    'build karakter genshin',
    'tier list hsr',
    'kode redeem mlbb',
    'berita game terbaru',
    'database game',
  ],
  authors: [{ name: 'Seraphi Game Editorial' }],
  creator: 'SERAPHI GAME',
  publisher: 'SERAPHI GAME Indonesia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://seraphigame.id',
    siteName: 'SERAPHI GAME',
    title: 'SERAPHI GAME — Info Game, Guide & Dunia Gaming Indonesia',
    description:
      'Portal database game, berita terbaru, panduan build karakter, tier list, redeem code, dan event gaming terlengkap di Indonesia.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'SERAPHI GAME Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERAPHI GAME — Info Game, Guide & Dunia Gaming Indonesia',
    description:
      'Portal database game, berita terbaru, panduan build karakter, tier list, redeem code, dan event gaming terlengkap di Indonesia.',
    images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=630&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <GoogleAnalytics />
        <Navbar />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

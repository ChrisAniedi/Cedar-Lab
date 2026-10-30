import type { Metadata, Viewport } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { company } from '@/lib/data';

// Figtree stands in for Vanity Pass's display face (Uber Move) and is the
// fallback for Cabinet Grotesk, which loads from Fontshare below.
const figtree = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-figtree', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.camuh.com.ng'),
  title: { default: 'Camuh Innovations Limited | Smart Oil & Gas Solutions', template: '%s | Camuh Innovations' },
  description:
    'Oilfield chemicals, IoT & smart sensors, marine consumables, spare parts sourcing and equipment leasing from Port Harcourt, Nigeria.',
  openGraph: {
    title: 'Camuh Innovations Limited | Smart Oil & Gas Solutions',
    description: company.tagline,
    siteName: company.name,
    images: ['/images/scenes/crane-vessel-hero.webp'],
    type: 'website',
    locale: 'en_NG',
  },
};

export const viewport: Viewport = { themeColor: '#050605' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

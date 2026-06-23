import ClientEffects from '@/components/ClientEffects';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ceda Lab — From idea to launch in weeks, not months.',
    template: '%s — Ceda Lab',
  },
  description:
    'Ceda Lab designs, builds, automates and launches SaaS platforms, AI products, websites, MVPs and internal tools for businesses worldwide.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}

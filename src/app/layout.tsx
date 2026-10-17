import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Undangan Pernikahan Ichsan & Ulfa',
  description: 'Dengan memohon rida Allah, Ichsan dan Ulfa mengundang Anda merayakan pernikahan dalam kehangatan keluarga dan keindahan adat Aceh.',
  metadataBase: new URL('https://wedding-omega-drab.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://wedding-omega-drab.vercel.app',
    siteName: 'Pernikahan Ichsan & Ulfa',
    title: 'Undangan Pernikahan Ichsan & Ulfa',
    description: 'Bismillahirrahmanirrahim. Dengan memohon rida Allah, kami mengundang Anda untuk hadir dan memberikan doa restu pada pernikahan Ichsan & Ulfa.',
  },
  twitter: {
    card: 'summary',
    title: 'Undangan Pernikahan Ichsan & Ulfa',
    description: 'Dengan memohon rida Allah, kami mengundang Anda untuk hadir dan memberikan doa restu pada pernikahan Ichsan & Ulfa.',
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#00374b' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preload" href="/fonts/cormorant-infant.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cormorant-upright.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cormorant-unicase.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <noscript><style>{'[data-reveal] { opacity: 1 !important; translate: none !important; pointer-events: auto !important; } .hero-name > span { opacity: 1 !important; filter: none !important; transform: none !important; line-height: normal !important; }'}</style></noscript>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { SideCart } from '@/components/layout/SideCart';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://10qchallenge.in'),
  title: {
    default: '10Q Challenge | Best BITSAT & JEE Crash Course 2026',
    template: '%s | 10Q Challenge',
  },
  description:
    "10Q Challenge - India's most advanced and only reliable online platform for BITSAT, JEE, COMEDK & MET preparation. Live interactive classes, AI mock tests, and 1-on-1 mentorship by BITS Pilani alumni.",
  keywords: [
    'BITSAT 2026',
    'BITSAT Crash Course',
    'BITSAT Mock Test Series',
    'JEE Main 2026',
    '10Q Challenge',
    'COMEDK Test Series',
    'Engineering Mentorship',
    'BITS Pilani Alumni Coaching',
  ],
  authors: [{ name: '10Q Challenge Team', url: 'https://10qchallenge.in' }],
  creator: '10Q Challenge',
  publisher: '10Q Challenge',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/site/assets/img/favicon.png',
    apple: '/site/assets/img/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://10qchallenge.in',
    siteName: '10Q Challenge',
    title: '10Q Challenge | Best BITSAT & JEE Crash Course 2026',
    description:
      'Crack BITSAT & JEE from your place, at your pace with BITS Pilani & IIT Alumni.',
    images: [
      {
        url: '/site/assets/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: '10Q Challenge Exam Prep',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-[#FAFAFD] min-h-screen flex flex-col selection:bg-[#3d2c8d] selection:text-white">
        <AuthProvider>
          <CartProvider>
            {children}
            <SideCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

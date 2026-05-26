import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { WatchlistProvider } from '@/context/WatchlistContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AniStream - Nonton Anime Online',
  description: 'Aplikasi streaming anime modern dengan koleksi terlengkap. Tonton anime favorit Anda dengan kualitas terbaik.',
  keywords: 'anime, streaming, nonton, series',
  authors: [{ name: 'AniStream' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://anistream.vercel.app',
    title: 'AniStream',
    description: 'Streaming anime online gratis',
  },
};

/**
 * Root layout untuk seluruh aplikasi
 * Menggunakan Providers: Theme, Watchlist
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen flex flex-col`}>
        <ThemeProvider>
          <WatchlistProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Suspense } from 'react';
import { fetchTopAnime, fetchSeasonNow } from '@/lib/jikan';
import { Carousel } from '@/components/Carousel';
import { AnimeCard } from '@/components/AnimeCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Homepage dengan 3 section:
 * - Trending anime carousel
 * - Musim ini anime
 * - Rekomendasi
 */
export const revalidate = 3600; // Revalidate setiap jam

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-lg aspect-[2/3] animate-pulse" />
      ))}
    </div>
  );
}

export default async function HomePage() {
  try {
    const [topAnimeRes, seasonNowRes] = await Promise.all([
      fetchTopAnime(),
      fetchSeasonNow(),
    ]);

    const topAnime = topAnimeRes.data || [];
    const seasonNow = seasonNowRes.data || [];

    return (
      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-gray-800 flex items-center justify-center">
          <div className="text-center space-y-4 z-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Selamat Datang di AniStream
            </h1>
            <p className="text-gray-300 text-lg">Tonton anime favorit Anda dengan kualitas terbaik</p>
            <div className="flex gap-4 justify-center">
              <Link href="/search">
                <Button className="bg-purple-600 hover:bg-purple-700">Jelajahi Anime</Button>
              </Link>
              <Link href="/watchlist">
                <Button variant="outline">Watchlist Saya</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Anime */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              🔥 <span>Trending Sekarang</span>
            </h2>
            <Link href="/search?sort=popularity">
              <Button variant="ghost" className="text-gray-400 hover:text-white">Lihat Semua →</Button>
            </Link>
          </div>
          <Suspense fallback={<SkeletonLoader />}>
            <Carousel items={topAnime.slice(0, 20)} autoSlide />
          </Suspense>
        </section>

        {/* Musim Ini */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              🌸 <span>Musim Ini</span>
            </h2>
            <Link href="/search?type=TV">
              <Button variant="ghost" className="text-gray-400 hover:text-white">Lihat Semua →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {seasonNow.slice(0, 12).map((anime: any) => (
              <AnimeCard
                key={anime.mal_id}
                id={anime.mal_id}
                title={anime.title}
                image={anime.images?.jpg?.image_url || 'https://via.placeholder.com/225x318'}
                score={anime.score}
                episodes={anime.episodes}
                status={anime.status}
              />
            ))}
          </div>
        </section>

        {/* Rekomendasi */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              ✨ <span>Rekomendasi Untuk Anda</span>
            </h2>
            <Link href="/search?sort=rating">
              <Button variant="ghost" className="text-gray-400 hover:text-white">Lihat Semua →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topAnime.slice(10, 22).map((anime: any) => (
              <AnimeCard
                key={anime.mal_id}
                id={anime.mal_id}
                title={anime.title}
                image={anime.images?.jpg?.image_url || 'https://via.placeholder.com/225x318'}
                score={anime.score}
                episodes={anime.episodes}
              />
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Memuat Data</h2>
        <p className="text-gray-400 mb-6">Terjadi kesalahan saat mengambil data anime. Silakan coba lagi.</p>
        <Link href="/">
          <Button>Kembali ke Beranda</Button>
        </Link>
      </div>
    );
  }
}

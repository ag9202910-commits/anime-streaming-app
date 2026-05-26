'use client';

import { useWatchlist } from '@/context/WatchlistContext';
import { AnimeCard } from '@/components/AnimeCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trash2, ArrowLeft } from 'lucide-react';

/**
 * Watchlist Page
 * Menampilkan daftar anime yang ditambahkan ke watchlist
 */
export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Watchlist Saya</h1>
          <p className="text-gray-400 mt-2">Daftar anime yang akan Anda tonton</p>
        </div>
      </div>

      {/* Content */}
      {watchlist.length > 0 ? (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4">
              <p className="text-gray-200 text-sm">Total Anime</p>
              <p className="text-3xl font-bold mt-2">{watchlist.length}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg p-4">
              <p className="text-gray-200 text-sm">Ditambahkan Terakhir</p>
              <p className="text-sm font-semibold mt-2 truncate">
                {watchlist[watchlist.length - 1]?.title}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4">
              <p className="text-gray-200 text-sm">Status</p>
              <p className="text-sm font-semibold mt-2">Aktif</p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchlist.map((item) => (
              <div key={item.animeId} className="group relative">
                <AnimeCard
                  id={item.animeId}
                  title={item.title}
                  image={item.image}
                />
                <button
                  onClick={() => removeFromWatchlist(item.animeId)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded opacity-0 group-hover:opacity-100 transition z-10"
                  title="Hapus dari watchlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-2xl font-bold mb-2">Watchlist Kosong</h2>
          <p className="text-gray-400 mb-8">Anda belum menambahkan anime ke watchlist</p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button>Jelajahi Anime</Button>
            </Link>
            <Link href="/search">
              <Button variant="outline">Cari Anime</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
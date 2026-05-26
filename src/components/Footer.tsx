import Link from 'next/link';
import { Heart, Github } from 'lucide-react';

/**
 * Footer komponen dengan links dan info
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 block">
              AniStream
            </Link>
            <p className="text-gray-400 text-sm">Platform streaming anime modern untuk pecinta anime di seluruh dunia.</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-purple-400 transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-purple-400 transition">
                  Cari Anime
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="hover:text-purple-400 transition">
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://jikan.moe" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                  Jikan API
                </a>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                  Next.js
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8">
          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              © {currentYear} AniStream. Dibuat dengan
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              untuk para anime fans
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            ⓘ AniStream adalah aplikasi demo untuk tujuan edukasi. Data anime dari Jikan API. Video menggunakan konten bebas hak cipta.
          </p>
        </div>
      </div>
    </footer>
  );
}

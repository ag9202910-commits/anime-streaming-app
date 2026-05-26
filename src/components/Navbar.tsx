'use client';
import Link from 'next/link';
import { Search, Sun, Moon, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

/**
 * Navbar komponen dengan fitur:
 * - Search bar dengan autocomplete
 * - Theme toggle (dark/light)
 * - Link ke profile & watchlist
 */
export function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-pink-400 transition">
            AniStream
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari anime..."
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/watchlist">
            <Button variant="ghost" size="icon" title="Watchlist">
              <Bookmark className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle tema">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}

'use client';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/context/WatchlistContext';
import { useState } from 'react';

interface WatchlistBtnProps {
  animeId: number;
  title: string;
  image: string;
}

/**
 * Button untuk menambah/menghapus dari watchlist
 * Dengan visual feedback
 */
export function WatchlistBtn({ animeId, title, image }: WatchlistBtnProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [showFeedback, setShowFeedback] = useState(false);

  const inWatchlist = isInWatchlist(animeId);

  const handleClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(animeId);
    } else {
      addToWatchlist({ animeId, title, image, addedAt: new Date() });
    }
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        variant={inWatchlist ? 'default' : 'outline'}
        className={inWatchlist ? 'bg-purple-600 hover:bg-purple-700' : ''}
      >
        <Bookmark className={`mr-2 h-4 w-4 ${inWatchlist ? 'fill-current' : ''}`} />
        {inWatchlist ? 'Dalam Watchlist' : 'Tambah Watchlist'}
      </Button>
      {showFeedback && (
        <div className="absolute top-full mt-2 left-0 bg-gray-900 text-white px-3 py-1 rounded text-sm border border-purple-600 whitespace-nowrap">
          {inWatchlist ? '✓ Ditambahkan' : '✓ Dihapus'}
        </div>
      )}
    </div>
  );
}

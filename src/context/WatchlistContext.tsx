'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface WatchlistItem {
  animeId: number;
  title: string;
  image: string;
  addedAt: Date;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (animeId: number) => void;
  isInWatchlist: (animeId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load dari localStorage saat mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing watchlist:', error);
      }
    }
  }, []);

  // Save ke localStorage saat berubah
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist, mounted]);

  const addToWatchlist = (item: WatchlistItem) => {
    setWatchlist((prev) => {
      const exists = prev.some((w) => w.animeId === item.animeId);
      if (exists) return prev;
      return [...prev, { ...item, addedAt: new Date() }];
    });
  };

  const removeFromWatchlist = (animeId: number) => {
    setWatchlist((prev) => prev.filter((w) => w.animeId !== animeId));
  };

  const isInWatchlist = (animeId: number) => {
    return watchlist.some((w) => w.animeId === animeId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
}

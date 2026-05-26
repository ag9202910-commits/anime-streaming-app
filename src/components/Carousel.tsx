'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimeCard } from './AnimeCard';

interface CarouselProps {
  items: any[];
  title?: string;
  autoSlide?: boolean;
}

/**
 * Carousel komponen untuk menampilkan daftar anime dalam bentuk slide
 * Dengan navigasi left/right dan optional auto-slide
 */
export function Carousel({ items, title, autoSlide = true }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const slidesToShow = 5; // Desktop
  const [visibleCount, setVisibleCount] = useState(slidesToShow);

  // Responsive slides count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else if (window.innerWidth < 1536) setVisibleCount(4);
      else setVisibleCount(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || items.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000); // 5 detik
    return () => clearInterval(timer);
  }, [autoSlide, items.length]);

  if (items.length === 0) return null;

  const next = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  // Hitung items yang ditampilkan
  const visibleItems = [];
  for (let i = 0; i < visibleCount && i < items.length; i++) {
    visibleItems.push(items[(current + i) % items.length]);
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="relative group">
        {/* Carousel Container */}
        <div className="flex gap-4 overflow-hidden">
          {visibleItems.map((anime: any) => (
            <div key={`${anime.mal_id}-${current}`} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <AnimeCard
                id={anime.mal_id}
                title={anime.title || 'Unknown'}
                image={anime.images?.jpg?.image_url || 'https://via.placeholder.com/225x318'}
                score={anime.score}
                episodes={anime.episodes}
                status={anime.status}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prev}
          title="Sebelumnya"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={next}
          title="Berikutnya"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(items.length / visibleCount) }).map((_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition ${
              i === Math.floor(current / visibleCount) ? 'bg-purple-600 w-6' : 'bg-gray-600 w-2'
            }`}
            onClick={() => setCurrent(i * visibleCount)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

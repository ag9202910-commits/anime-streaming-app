import Link from 'next/link';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  score?: number;
  episodes?: number;
  status?: string;
}

/**
 * Card komponen untuk menampilkan anime
 * Dengan hover effect play button dan informasi
 */
export function AnimeCard({ id, title, image, score, episodes, status }: AnimeCardProps) {
  return (
    <Link href={`/anime/${id}`}>
      <Card className="group relative overflow-hidden bg-gray-900 border-gray-800 hover:border-purple-500 transition-all duration-300 cursor-pointer h-full">
        <div className="aspect-[2/3] relative overflow-hidden">
          {/* Poster Image */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />

          {/* Overlay dengan Play Button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>

          {/* Rating Badge */}
          {score !== undefined && (
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400">{score.toFixed(1)}</span>
            </div>
          )}

          {/* Status Badge */}
          {status && (
            <div className="absolute bottom-2 left-2 bg-purple-600/80 px-2 py-0.5 rounded text-xs font-semibold">
              {status}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 bg-gradient-to-t from-gray-900 to-transparent">
          <h3 className="font-medium truncate text-sm group-hover:text-purple-400 transition">{title}</h3>
          <p className="text-xs text-gray-400 mt-1">
            {episodes ? `${episodes} episodes` : 'Movie'}
          </p>
        </div>
      </Card>
    </Link>
  );
}

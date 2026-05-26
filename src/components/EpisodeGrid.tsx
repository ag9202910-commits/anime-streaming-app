'use client';
import Link from 'next/link';
import { Play, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Episode {
  mal_id: number;
  title: string;
  aired?: string;
  score?: number;
}

interface EpisodeGridProps {
  episodes: Episode[];
  animeId: number;
  isLoading?: boolean;
}

/**
 * Grid komponen untuk menampilkan list episode
 * Dengan link ke halaman player
 */
export function EpisodeGrid({ episodes, animeId, isLoading }: EpisodeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Episode belum tersedia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((episode, index) => (
        <Link key={episode.mal_id} href={`/watch/${animeId}/${episode.mal_id}`}>
          <Card className="group relative overflow-hidden bg-gray-900 border-gray-800 hover:border-purple-500 transition cursor-pointer h-full flex flex-col">
            {/* Thumbnail Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition" />

            {/* Content */}
            <div className="relative p-4 flex flex-col h-full">
              {/* Episode Number */}
              <Badge className="w-fit mb-2 bg-purple-600/80">Episode {index + 1}</Badge>

              {/* Title */}
              <h3 className="font-semibold text-sm group-hover:text-purple-400 transition line-clamp-2 flex-1">
                {episode.title || `Episode ${index + 1}`}
              </h3>

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  {episode.score && <span className="text-yellow-400">⭐ {episode.score.toFixed(1)}</span>}
                  <span className="text-gray-500">•</span>
                  <span>{episode.aired?.split('T')[0] || 'TBA'}</span>
                </div>
                <Play className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition" />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

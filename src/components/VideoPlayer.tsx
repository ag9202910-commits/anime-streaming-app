'use client';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Volume2, VolumeX, Maximize, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoSource {
  quality: string;
  url: string;
}

interface VideoPlayerProps {
  sources: VideoSource[];
  title: string;
  onProgress?: (progress: number) => void;
}

/**
 * Video Player komponen dengan:
 * - Quality selector
 * - Volume control
 * - Fullscreen button
 * - Progress tracking
 */
export function VideoPlayer({ sources, title, onProgress }: VideoPlayerProps) {
  const [selectedQuality, setSelectedQuality] = useState(sources[0] || null);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  if (!selectedQuality) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Video tidak tersedia</p>
      </div>
    );
  }

  const handleProgress = (state: any) => {
    if (onProgress) {
      const progressPercent = (state.played * 100).toFixed(2);
      onProgress(parseFloat(progressPercent));
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        <ReactPlayer
          ref={playerRef}
          url={selectedQuality.url}
          width="100%"
          height="100%"
          controls
          playing
          onProgress={handleProgress}
          volume={isMuted ? 0 : volume}
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous',
              },
            },
          }}
        />
      </div>

      {/* Player Info & Controls */}
      <div className="bg-gray-900 rounded-lg p-4 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Quality Selector */}
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-gray-400" />
            <select
              value={selectedQuality.quality}
              onChange={(e) => {
                const selected = sources.find((s) => s.quality === e.target.value);
                if (selected) setSelectedQuality(selected);
              }}
              className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700 hover:border-purple-500 transition"
            >
              {sources.map((source) => (
                <option key={source.quality} value={source.quality}>
                  {source.quality}
                </option>
              ))}
            </select>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Info */}
          <p className="text-xs text-gray-400">
            Quality: <span className="text-purple-400 font-semibold">{selectedQuality.quality}</span>
          </p>
        </div>

        {/* Legal Notice */}
        <p className="text-xs text-gray-500 border-t border-gray-800 pt-3">
          ⓘ Video demo menggunakan Big Buck Bunny & Sintel (bebas hak cipta). Aplikasi ini hanya untuk tujuan edukasi.
        </p>
      </div>
    </div>
  );
}

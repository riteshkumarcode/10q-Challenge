'use client';

import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { Play, Pause, Volume2, VolumeX, Maximize, AlertCircle, Loader2 } from 'lucide-react';

interface VimeoPlayerProps {
  videoId: string;
  title?: string;
  autoPlay?: boolean;
  onProgress?: (progressPercent: number, currentTime: number) => void;
  onEnded?: () => void;
}

export const VimeoPlayer: React.FC<VimeoPlayerProps> = ({
  videoId,
  title,
  autoPlay = false,
  onProgress,
  onEnded,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !videoId) return;

    setIsLoading(true);
    setError(null);

    // If videoId is a direct URL or number string
    const cleanVideoId = videoId.replace(/[^0-9]/g, '');

    if (!cleanVideoId) {
      setError('Invalid Vimeo Video ID provided.');
      setIsLoading(false);
      return;
    }

    try {
      // Clear container before loading
      containerRef.current.innerHTML = '';

      const player = new Player(containerRef.current, {
        id: parseInt(cleanVideoId, 10),
        responsive: true,
        autoplay: autoPlay,
        title: false,
        byline: false,
        portrait: false,
        color: '3F328A',
        speed: true,
        dnt: true,
      });

      playerRef.current = player;

      player.on('loaded', () => {
        setIsLoading(false);
      });

      player.on('timeupdate', (data: { percent: number; seconds: number }) => {
        if (onProgress) {
          onProgress(Math.round(data.percent * 100), data.seconds);
        }
      });

      player.on('ended', () => {
        if (onEnded) {
          onEnded();
        }
      });

      player.on('error', (err: any) => {
        console.error('Vimeo player error:', err);
        setError('Unable to load video. It might be private or restricted.');
        setIsLoading(false);
      });
    } catch (e: any) {
      console.error('Error initializing Vimeo player:', e);
      setError('Error initializing video playback.');
      setIsLoading(false);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
        playerRef.current = null;
      }
    };
  }, [videoId, autoPlay, onProgress, onEnded]);

  return (
    <div className="relative w-full aspect-[16/9] bg-[#110E23] rounded-2xl overflow-hidden shadow-xl border border-[#2D246B]">
      {/* Loading Spinner */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#17152A]/90 text-white gap-3">
          <Loader2 size={36} className="animate-spin text-[#FF3F68]" />
          <p className="text-sm font-medium text-white/80">Loading High-Definition Lecture...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#17152A] text-white p-6 text-center gap-3">
          <AlertCircle size={40} className="text-[#FF3F68]" />
          <h4 className="font-bold text-lg">Lecture Video Offline</h4>
          <p className="text-sm text-white/70 max-w-md">{error}</p>
          <p className="text-xs text-white/50">Video ID: {videoId}</p>
        </div>
      )}

      {/* Video Container Mount */}
      <div ref={containerRef} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
    </div>
  );
};

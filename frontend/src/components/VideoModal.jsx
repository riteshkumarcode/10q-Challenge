'use client';
import React from 'react';
import { X, Smartphone } from 'lucide-react';

export default function VideoModal({ isOpen, videoUrl, onClose }) {
  if (!isOpen || !videoUrl) return null;

  // Transform standard YouTube link into embed link
  const getEmbedUrl = (url) => {
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      {/* Smartphone Reel Container Frame */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-700/80 flex flex-col justify-between">
        
        {/* Top Phone Camera Notch Bar */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-white rounded-full transition-all border border-white/20 backdrop-blur-xs cursor-pointer shadow-lg"
          aria-label="Close Video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Frame */}
        <div className="w-full h-full relative bg-black">
          <iframe
            src={getEmbedUrl(videoUrl)}
            title="10Q Challenge Reel Video"
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

      </div>
    </div>
  );
}


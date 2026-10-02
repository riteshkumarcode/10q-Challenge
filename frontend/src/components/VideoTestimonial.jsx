'use client';
import React, { useState } from 'react';
import { Play, Clock, Heart, MessageCircle, Eye, Flame, CheckCircle2 } from 'lucide-react';
import { videoTestimonialsData } from '../data/testimonials';
import VideoModal from './VideoModal';

export default function VideoTestimonial() {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-slate-200 overflow-hidden">
      
      {/* Subtle Soft Background Pattern / Dots */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-50 text-red-600 rounded-full border border-red-200 text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Reels &amp; Shorts</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Ranker Stories in <span className="text-amber-500">60 Seconds</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Watch real student transformations, exam day speed hacks &amp; score improvement journeys in reel format!
          </p>
        </div>

        {/* Vertical Reel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {videoTestimonialsData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideoUrl(item.youtubeUrl)}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              {/* Vertical Reel Image Background */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />

              {/* Gradient Overlays for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/95 pointer-events-none" />

              {/* Top Overlay Bar */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="bg-red-600/95 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Shorts
                </span>

                <span className="bg-slate-950/80 backdrop-blur-xs text-slate-200 text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {item.duration}
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-14 h-14 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.8)] group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-300">
                  <Play className="w-6 h-6 ml-0.5 fill-slate-950" />
                </div>
              </div>

              {/* Right Side Social Interaction Bar */}
              <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-4 text-white">
                <div className="flex flex-col items-center gap-0.5 group/btn">
                  <div className="p-2 bg-slate-900/60 backdrop-blur-xs rounded-full border border-white/10 group-hover/btn:text-rose-500 transition-colors">
                    <Heart className="w-5 h-5 fill-rose-500/20 text-rose-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-200">{item.likes}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5 group/btn">
                  <div className="p-2 bg-slate-900/60 backdrop-blur-xs rounded-full border border-white/10 group-hover/btn:text-sky-400 transition-colors">
                    <MessageCircle className="w-5 h-5 text-slate-300" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-200">{item.comments}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <div className="p-2 bg-slate-900/60 backdrop-blur-xs rounded-full border border-white/10">
                    <Eye className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-200">{item.views}</span>
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="relative z-10 p-4 pr-14 space-y-2 text-left">
                
                {/* Student Info Row */}
                <div className="flex items-center gap-2">
                  <img
                    src={item.avatar}
                    alt={item.studentName}
                    className="w-8 h-8 rounded-full object-cover border border-amber-400/80 shadow"
                  />
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-xs text-white truncate">
                        {item.studentName}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20 shrink-0" />
                    </div>
                    <span className="text-[10px] text-amber-300 block font-medium">
                      {item.college}
                    </span>
                  </div>
                </div>

                {/* Score Tag */}
                <div className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {item.score}
                </div>

                {/* Video Caption Title */}
                <h3 className="font-semibold text-xs text-slate-100 leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reel Video Modal */}
      <VideoModal
        isOpen={Boolean(selectedVideoUrl)}
        videoUrl={selectedVideoUrl}
        onClose={() => setSelectedVideoUrl(null)}
      />
    </section>
  );
}



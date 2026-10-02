import React from 'react';
import { Play, Volume2 } from 'lucide-react';

export default function VideoShowcase() {
  const videoId = "Y5bYK0VBTG0";
  // Autoplay + muted + looped iframe URL so browsers allow instant autoplay on page load
  const autoplayEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Autoplay Video Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-950 group mb-16 aspect-[16/9] max-h-[480px] w-full">
          
          {/* Autoplay Embedded Video Frame */}
          <iframe
            src={autoplayEmbedUrl}
            title="10Q Challenge Intro Video"
            className="w-full h-full object-cover rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Autoplay Badge Pill */}
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <span className="bg-slate-950/80 backdrop-blur-xs text-amber-400 font-bold text-xs px-3.5 py-1.5 rounded-full border border-amber-400/30 flex items-center gap-2 shadow-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LIVE DEMO • AUTOPLAYING</span>
            </span>
          </div>

        </div>

        {/* What is 10Q Challenge Block — Official Dark Navy Trust Card */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 md:p-14 shadow-2xl max-w-4xl mx-auto border border-slate-800">
          <img src="/site/assets/img/bg/bg-19.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
          
          <div className="relative z-10 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              What is 10Q Challenge?
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed text-justify md:text-center font-normal">
              10Q Challenge was founded by a team of experienced BITSians and IITians in the year 2020 with a vision of revolutionizing Engineering Exam Preparation. Since then we have helped thousands of students in clearing entrance exams like JEE, BITSAT, VITEEE etc. Today our students are studying in prestigious institutes like BITS Pilani, IIT Bombay and other Tier-1 Colleges. We have always believed in excellence and pursued it.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}


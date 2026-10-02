'use client';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from '@/src/compat/router';
import { Clock, FileText, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { coursesData } from '../data/courses';

export default function HeroSlider() {
  const navigate = useNavigate();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const banners = [
    { id: 1, image: "/site/assets/img/banner.png", alt: "VITEEE 2026 Crash Course" },
    { id: 2, image: "/site/assets/img/banner1.png", alt: "JEE Main & Advanced 2026" },
    { id: 3, image: "/site/assets/img/banner2.png", alt: "BITSAT 2026 Rank Booster" }
  ];

  // Auto slide bottom banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Featured course card matching the reference screenshot
  const featuredCourse = coursesData[0] || {
    id: 1,
    title: "BITSAT Ultimate Crash Course 2026",
    exam: "BITSAT",
    tag: "BEST SELLER",
    price: 3999,
    originalPrice: 7999,
    discount: "50% OFF",
    duration: "60 Days",
    tests: "25 Full Length Mock Tests",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
  };

  return (
    <section className="relative bg-[#2b1f63] text-white pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
      
      {/* Soft Purple Glow Aura matching reference image */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-pink-600/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Background Dot Matrix Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dashed Curved Arc Line */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
          <path d="M -100 200 Q 400 -60 1300 350" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Hero Top Grid: Left Copy & Right Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Headline & Text Block */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs sm:text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse"></span>
              <span>India's most advanced online exam-prep platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
              Crack{' '}
              <span className="text-amber-400 relative inline-block">
                BITSAT &amp; JEE
                {/* Yellow hand-drawn squiggly underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-amber-400 overflow-visible"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 2 8 C 45 2.5 145 2 198 8"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              from your place , at your pace.
            </h1>

            {/* Paragraph Description */}
            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              India's most advanced online platform for BITSAT &amp; JEE prep — live interactive classes from IIT &amp; BITS mentors, AI-powered mock tests on the latest pattern, personalised mentorship, and performance analytics that get you exam-ready faster.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Yellow Button */}
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base cursor-pointer"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary Dark WhatsApp Button */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-purple-800/80 hover:border-purple-600 bg-[#160d33]/80 hover:bg-[#20144c] text-white font-medium px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base cursor-pointer"
              >
                {/* WhatsApp SVG Icon */}
                <svg className="w-5 h-5 text-emerald-400 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Talk to a mentor</span>
              </a>
            </div>

          </div>

          {/* Right Column: Featured White Card inside Dark Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Outer Dark Indigo Frame Glow effect matching screenshot */}
              <div className="absolute -inset-2 bg-[#1b143c] rounded-[2.2rem] shadow-2xl border border-purple-900/50 transform rotate-1 scale-[1.01]"></div>
              
              {/* Main White Featured Course Card */}
              <div className="relative bg-white text-slate-900 rounded-[2rem] p-5 sm:p-6 shadow-2xl border border-slate-100 z-10">
                
                {/* BEST SELLER Tag */}
                <div className="inline-block bg-amber-100/90 text-amber-900 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-xs">
                  {featuredCourse.tag || "BEST SELLER"}
                </div>

                {/* Course Image */}
                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 bg-slate-900 shadow-inner group">
                  <img
                    src={featuredCourse.image}
                    alt={featuredCourse.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* BITSAT Badge on Top Left */}
                  <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-xs text-amber-400 text-xs font-black px-3 py-1 rounded-lg tracking-wider uppercase shadow-md border border-amber-400/20">
                    {featuredCourse.exam || "BITSAT"}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-3 leading-snug">
                  {featuredCourse.title}
                </h3>

                {/* Metadata Line */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-5 pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {featuredCourse.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {featuredCourse.tests}
                  </span>
                </div>

                {/* Price and Enroll Button Row */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{featuredCourse.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-medium">
                        ₹{featuredCourse.originalPrice}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                      {featuredCourse.discount} applied
                    </span>
                  </div>

                  <Link
                    to={`/course/${featuredCourse.slug || "bitsat-ultimate-crash-course-2026"}`}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Full-Width Banner Carousel */}
        <div className="pt-4">
          <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
            
            {/* Banner Track */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
            >
              {banners.map((banner) => (
                <div key={banner.id} className="w-full flex-shrink-0">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-auto max-h-[360px] object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Banner Prev/Next Controls */}
            <button
              onClick={() => setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/40 hover:bg-amber-400 hover:text-slate-950 text-white rounded-full transition-all border border-white/20 backdrop-blur-xs cursor-pointer z-10"
              aria-label="Previous Banner"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % banners.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/40 hover:bg-amber-400 hover:text-slate-950 text-white rounded-full transition-all border border-white/20 backdrop-blur-xs cursor-pointer z-10"
              aria-label="Next Banner"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Banner Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBannerIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentBannerIndex === idx ? 'bg-amber-400 w-8' : 'bg-white/50 w-2.5'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


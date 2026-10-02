'use client';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from '@/src/compat/router';
import {
  Calendar, ChevronRight, Home, ArrowLeft, ArrowRight,
  Clock, User, Share2, MessageCircle, Sparkles, BookOpen,
  CheckCircle2, Flame, ExternalLink, Bookmark, Check, ShieldCheck, Tag
} from 'lucide-react';
import { blogsData } from '../data/blogs';
import { coursesData } from '../data/courses';

export default function BlogDetail() {
  const { slug } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  // Retrieve current blog
  const blog = blogsData.find((b) => b.slug === slug || String(b.id) === slug) || blogsData[0];

  // Dynamic reading time calculation
  const wordCount = (blog.contentHtml || blog.description || '').replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  // Related & trending blogs (excluding current)
  const relatedBlogs = blogsData
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => (a.category === blog.category ? -1 : 1))
    .slice(0, 3);

  const trendingBlogs = blogsData
    .filter((b) => b.id !== blog.id)
    .slice(0, 4);

  // Featured Recommended Course for Sidebar
  const featuredCourse = coursesData.find((c) => c.exam.toLowerCase() === blog.category.toLowerCase()) || coursesData[0];

  // SEO Document Title update
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `${blog.title} | 10Q Challenge`;
    }
  }, [blog]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Structured Data for SEO
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    image: blog.onlineImage || blog.image,
    datePublished: blog.date,
    author: {
      '@type': 'Organization',
      name: blog.author || '10Q Challenge Mentorship Team',
    },
    publisher: {
      '@type': 'Organization',
      name: '10Q Challenge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://10qchallenge.in/site/assets/logo_yellow.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : 'https://10qchallenge.in/blog',
    },
  };

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-20 selection:bg-amber-400 selection:text-slate-950">
      
      {/* SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 1. Article Hero Banner */}
      <header className="relative bg-gradient-to-b from-[#21174d] via-[#1c1340] to-[#150e30] text-white pt-12 pb-16 border-b border-purple-900/50 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-purple-200/80 mb-6 flex-wrap gap-y-1">
            <Link to="/" className="hover:text-amber-400 flex items-center space-x-1 transition-colors font-medium">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-purple-400/60" />
            <Link to="/blog" className="hover:text-amber-400 transition-colors font-medium">
              Blogs &amp; Guides
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-purple-400/60" />
            <span className="text-purple-300 font-medium">{blog.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-purple-400/60" />
            <span className="text-amber-400 font-bold truncate max-w-xs">{blog.title}</span>
          </nav>

          <div className="max-w-4xl space-y-5">
            {/* Category & Read Time Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                <span>{blog.category}</span>
              </span>

              <span className="bg-purple-900/80 border border-purple-400/30 text-purple-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{readTime} min read</span>
              </span>

              <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Strategy</span>
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight">
              {blog.title}
            </h1>

            {/* Author & Publish Date Row */}
            <div className="flex flex-wrap items-center gap-6 pt-3 pb-2 text-xs sm:text-sm text-purple-200/90 border-t border-purple-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                  10Q
                </div>
                <div>
                  <div className="font-extrabold text-white">{blog.author || "10Q Challenge Editorial"}</div>
                  <div className="text-[11px] text-purple-300 font-medium">BITS Pilani &amp; IIT Alumni Mentorship Panel</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 ml-auto text-xs text-purple-300">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* 2. Main Article + Sticky Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ========================================================
              LEFT COLUMN: MAIN ARTICLE BODY (8 Columns)
             ======================================================== */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
              
              {/* Featured Cover Image */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100 max-h-[440px] relative">
                <img
                  src={blog.image}
                  alt={blog.alttag || blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (blog.onlineImage) {
                      e.target.src = blog.onlineImage;
                    }
                  }}
                />
              </div>

              {/* In-Article Key Takeaways Box */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50/60 rounded-2xl border border-amber-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Key Article Takeaways &amp; Executive Summary</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {blog.description}
                </p>
              </div>

              {/* Rich HTML Content with Enhanced Typography & Line Spacing */}
              <div className="blog-content-wrapper">
                {blog.contentHtml ? (
                  <div
                    className="blog-html-content text-slate-700"
                    dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
                  />
                ) : (
                  <div className="space-y-6 text-slate-700 leading-loose text-base sm:text-lg">
                    <p>{blog.description}</p>
                    <p>
                      At 10Q Challenge, our expert mentors from BITS Pilani and top IITs curate high-yield preparation material to help engineering aspirants maximize their score in entrance exams like BITSAT, JEE Main, VITEEE, and MET.
                    </p>
                  </div>
                )}
              </div>

              {/* Mid-Article Embedded Promotion Banner */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-[#21174d] to-[#2b1f63] rounded-3xl text-white border border-purple-900 shadow-lg space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    Target {blog.category || 'Entrance'} 2026
                  </span>
                  <span className="text-xs text-purple-200">1-on-1 Guidance Available</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  Want to Crack {blog.category} with a 330+ Score?
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-xl">
                  Get guided 1-on-1 by BITS Pilani &amp; IIT alumni. Get custom weekly roadmaps, speed drills, and test error analysis.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to={`/mentorship/${blog.category}`}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Explore 1-on-1 Mentorship</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/course-all"
                    className="px-5 py-2.5 bg-[#36277b] hover:bg-[#433198] text-white font-bold text-xs rounded-xl border border-purple-700/60 transition-colors"
                  >
                    <span>View Crash Courses</span>
                  </Link>
                </div>
              </div>

              {/* Article Footer & Social Share Bar */}
              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span>Category:</span>
                  <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-lg border border-slate-200">
                    {blog.category}
                  </span>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-bold text-slate-500 mr-1">Share Article:</span>
                  <button
                    onClick={handleCopyLink}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer text-xs font-bold flex items-center gap-1.5"
                    title="Copy Link to Clipboard"
                  >
                    <Share2 className="w-4 h-4 text-slate-600" />
                    <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' - Read at: ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  </a>
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/90 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                  10Q
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-black text-slate-900 text-base">{blog.author || "10Q Challenge Editorial"}</h4>
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Verified Author
                    </span>
                  </div>
                  <p className="text-xs text-amber-700 font-bold">Academic Research &amp; BITS Pilani Mentorship Panel</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Curated by toppers from BITS Pilani, IIT Bombay and top engineering colleges to provide accurate analysis, syllabus breakdowns, and proven scoring strategies for aspirants across India.
                  </p>
                </div>
              </div>

              {/* Back to All Blogs Button */}
              <div className="pt-4 flex items-center justify-between">
                <Link
                  to="/blog"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-slate-800 hover:text-amber-600 bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-2xl border border-slate-200 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Blogs &amp; Guides</span>
                </Link>

                <Link
                  to="/course-all"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  <span>Explore Entrance Batches</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: STICKY SIDEBAR (4 Columns)
             ======================================================== */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Sidebar Card 1: Featured Recommended Course */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {featuredCourse.tag || 'RECOMMENDED'}
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Target {featuredCourse.exam}
                </span>
              </div>

              <Link
                to={`/course-detail/${featuredCourse.slug || featuredCourse.id}`}
                className="block relative h-40 rounded-2xl overflow-hidden bg-slate-100 group cursor-pointer"
              >
                <img
                  src={featuredCourse.image}
                  alt={featuredCourse.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                  {featuredCourse.duration}
                </span>
              </Link>

              <div className="space-y-1">
                <Link to={`/course-detail/${featuredCourse.slug || featuredCourse.id}`}>
                  <h4 className="font-black text-slate-900 text-sm hover:text-amber-600 transition-colors line-clamp-2 leading-snug cursor-pointer">
                    {featuredCourse.title}
                  </h4>
                </Link>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {featuredCourse.description}
                </p>
              </div>

              <div className="flex items-baseline space-x-2 pt-1 border-t border-slate-100">
                <span className="text-xl font-black text-slate-900">₹{featuredCourse.price}</span>
                <span className="text-xs text-slate-400 line-through">₹{featuredCourse.originalPrice}</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {featuredCourse.discount}
                </span>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <Link
                  to={`/course-detail/${featuredCourse.slug || featuredCourse.id}`}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 text-center transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to={`/course-detail/${featuredCourse.slug || featuredCourse.id}`}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-xs text-center transition-all hover:scale-105 active:scale-95"
                >
                  Enroll
                </Link>
              </div>
            </div>

            {/* Sidebar Card 2: Free Academic Counseling on WhatsApp */}
            <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 border border-emerald-800/50 shadow-md space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-white text-base">Free Mentor Consultation</h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Need personalized advice on picking the right study plan or test series for {blog.category}? Chat with a BITSian counselor.
                </p>
              </div>
              <a
                href="https://wa.me/918839737146?text=Hi%2010Q%20Challenge!%20I%20read%20your%20blog%20article%20and%20need%20academic%20guidance"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (Free)</span>
              </a>
            </div>

            {/* Sidebar Card 3: Trending & Recent Articles */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Trending Guides</span>
                </h4>
                <Link to="/blog" className="text-[11px] font-bold text-amber-700 hover:text-amber-800">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {trendingBlogs.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blog/${item.slug}`}
                    className="flex items-start space-x-3 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h5 className="font-extrabold text-xs text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 block">
                        {item.readTime || '5 min read'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Card 4: Exam Categories */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md space-y-3">
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">
                Explore by Exam
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {['BITSAT', 'JEE', 'VITEEE', 'MET', 'Comedk'].map((exam) => (
                  <Link
                    key={exam}
                    to={`/exam/${exam}`}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer"
                  >
                    {exam} Guides
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Bottom Related Articles Grid */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
                Continue Reading
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Related Exam Strategy Guides
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-800 self-start sm:self-auto"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((rel) => (
              <div
                key={rel.id}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="block relative h-48 overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      {rel.category}
                    </span>
                  </Link>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{rel.date}</span>
                      <span>•</span>
                      <span>{rel.readTime || '5 min read'}</span>
                    </div>

                    <Link to={`/blog/${rel.slug}`}>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug cursor-pointer">
                        {rel.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {rel.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-200/60 mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-black">
                      10Q
                    </div>
                    <span>{rel.author || "10Q Team"}</span>
                  </div>

                  <Link
                    to={`/blog/${rel.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-black text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </article>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from '@/src/compat/router';
import {
  Star, Clock, BookOpen, ShieldCheck, CheckCircle2, Play,
  ChevronDown, ChevronUp, UserCheck, Award, MessageCircle, ArrowRight,
  Sparkles, FileText, Zap, HelpCircle, Check, Users,
  Share2, Flame, MonitorPlay
} from 'lucide-react';
import { coursesData, getCourseBySlug } from '../data/courses';
import VideoModal from '../components/VideoModal';

export default function CourseDetail({ onAddToCart = () => {} }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [openAccordion, setOpenAccordion] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Retrieve course by slug or ID
  const course = getCourseBySlug(slug);

  // Filter related courses (same exam or popular other batches, excluding current course)
  const relatedCourses = coursesData
    .filter((c) => c.id !== course.id)
    .sort((a, b) => {
      if (a.exam === course.exam && b.exam !== course.exam) return -1;
      if (a.exam !== course.exam && b.exam === course.exam) return 1;
      return 0;
    })
    .slice(0, 3);

  // SEO Document Title & Meta schema injection
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = course.seo?.title || `${course.title} | 10Q Challenge`;
    }
  }, [course]);

  const handleEnrollNow = () => {
    if (onAddToCart) {
      onAddToCart(course);
    }
    const token = typeof window !== 'undefined' ? localStorage.getItem('10q_token') : null;
    const user = typeof window !== 'undefined' ? localStorage.getItem('10q_user') : null;

    if (token || user) {
      navigate('/cart');
    } else {
      navigate('/login', {
        state: {
          fromEnroll: true,
          courseTitle: course.title,
          courseId: course.id,
        },
      });
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Structured Data for SEO
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: '10Q Challenge',
      sameAs: 'https://10qchallenge.com',
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      reviewCount: course.reviewsCount,
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pt-20 pb-20 selection:bg-amber-400 selection:text-slate-950">
      
      {/* SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 1. Course Header / Hero Section */}
      <header className="relative bg-gradient-to-b from-[#2b1f63] via-[#241952] to-[#1c1340] text-white pt-10 pb-20 border-b border-purple-900/40 overflow-hidden">
        {/* Glow Accent Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-purple-200/80 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors font-medium">Home</Link>
            <span>/</span>
            <Link to="/course-all" className="hover:text-amber-400 transition-colors font-medium">Courses</Link>
            <span>/</span>
            <Link to={`/exam/${course.exam}`} className="hover:text-amber-400 transition-colors font-medium">{course.exam}</Link>
            <span>/</span>
            <span className="text-amber-400 font-bold truncate max-w-xs">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{course.tag || 'BEST SELLER'}</span>
                </span>

                <span className="bg-purple-900/70 border border-purple-400/30 text-purple-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Target {course.exam} 2026</span>
                </span>

                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{course.language || 'English + Hinglish'}</span>
                </span>
              </div>

              {/* Course Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {course.title}
              </h1>

              {/* Course Subtitle / Description */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                {course.description}
              </p>

              {/* Stats & Social Proof Row */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm text-purple-200/90 pt-4 pb-4 border-y border-purple-800/40">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-black text-white text-base">{course.rating}</span>
                  <span className="text-purple-300 text-xs">({course.reviewsCount.toLocaleString()} ratings)</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">{(course.studentsCount || 12500).toLocaleString()}+ Enrolled</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-300">{course.mentor}</span>
                </div>
              </div>

              {/* Key Feature Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="bg-[#36277b]/60 border border-purple-700/40 rounded-2xl p-3.5 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-amber-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">Duration</span>
                  </div>
                  <div className="text-sm font-black text-white">{course.duration}</div>
                </div>

                <div className="bg-[#36277b]/60 border border-purple-700/40 rounded-2xl p-3.5 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-amber-400 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">Lectures</span>
                  </div>
                  <div className="text-sm font-black text-white">{course.lectures}</div>
                </div>

                <div className="bg-[#36277b]/60 border border-purple-700/40 rounded-2xl p-3.5 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="flex items-center space-x-2 text-amber-400 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">Mock Tests</span>
                  </div>
                  <div className="text-sm font-black text-white">{course.tests}</div>
                </div>
              </div>

              {/* Share & Save Actions */}
              <div className="flex items-center space-x-4 pt-1 text-xs text-purple-300">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isCopied ? 'Link Copied to Clipboard!' : 'Share Course'}</span>
                </button>
                <span>•</span>
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Instant Portal Access Guaranteed</span>
                </span>
              </div>

            </div>

            {/* Right Sticky Enrollment Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 z-20">
              <aside className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xl space-y-6 text-slate-900">
                
                {/* Media Preview Box */}
                <div
                  className="relative h-52 sm:h-56 rounded-2xl overflow-hidden bg-slate-950 group cursor-pointer shadow-md"
                  onClick={() => setIsVideoOpen(true)}
                  title="Click to preview course video"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  
                  {/* Pulsing Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.85)] group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 ml-1 fill-slate-950" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-xs flex items-center gap-1.5">
                    <MonitorPlay className="w-3.5 h-3.5 text-amber-400" />
                    <span>Watch Batch Preview</span>
                  </span>

                  <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-md uppercase shadow">
                    {course.validity || 'Valid Till Exam'}
                  </span>
                </div>

                {/* Price Section */}
                <div className="space-y-1.5 border-b border-slate-100 pb-4">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">₹{course.price}</span>
                    <span className="text-base sm:text-lg text-slate-400 line-through">₹{course.originalPrice}</span>
                    <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-200">
                      {course.discount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/80">
                    <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Special Discount Valid for 2026 Batch • Limited Seats!</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleEnrollNow}
                    className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enroll Now &amp; Start Learning</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <a
                    href="https://wa.me/918839737146?text=Hi%2010Q%20Challenge!%20I%20want%20to%20know%20more%20about%20the%20course:%20"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>Talk to a BITSian Mentor on WhatsApp</span>
                  </a>
                </div>

                {/* Feature Checklist */}
                <div className="pt-2 space-y-3 text-xs text-slate-700">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>What's Included in this Batch:</span>
                    <span className="text-emerald-600 text-xs font-bold">100% Verified</span>
                  </div>

                  {(course.highlights || [
                    "120+ Hours Live & Recorded Video Lessons",
                    "25 Full Length Mock Tests with Solutions",
                    "English & Logical Reasoning Special Booster",
                    "Dedicated 1-on-1 Mentorship & Strategy Calls",
                    "Downloadable Formula Sheets & Chapter Notes",
                    "Instant Doubt Support on WhatsApp / Telegram"
                  ]).slice(0, 6).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Safe Checkout</span>
                  </span>
                  <span>•</span>
                  <span>Instant Access</span>
                  <span>•</span>
                  <span>Mobile &amp; Web</span>
                </div>

              </aside>
            </div>

          </div>

        </div>
      </header>

      {/* 2. Interactive Navigation Sticky Tabs */}
      <nav aria-label="Course Sections" className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto py-3.5 scrollbar-none">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'curriculum', label: 'Syllabus & Modules' },
              { id: 'learn', label: "What You'll Learn" },
              { id: 'mentor', label: 'Instructor & Mentors' },
              { id: 'reviews', label: 'Student Reviews' },
              { id: 'faqs', label: 'FAQs' },
              { id: 'related', label: 'Related Courses' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) {
                    const yOffset = -120;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={`text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all border-b-2 py-1 cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600 font-black'
                    : 'border-transparent text-slate-600 hover:text-slate-950 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* SECTION 1: OVERVIEW */}
        <section id="overview" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-3">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
              Course Overview &amp; Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {course.overviewTitle || `Why This Course is Built Specifically for ${course.exam} 2026`}
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
            {(course.overviewParagraphs || [
              `The ${course.title} is an intensive, results-oriented program crafted by toppers from BITS Pilani and top IITs. ${course.exam} requires deep speed mastery, accurate question selection, and disciplined time allocation.`,
              `This comprehensive batch equips you with formula shortcuts, 10-second option elimination techniques, and full-length mock tests to maximize your score and secure your top-choice branch.`
            ]).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Advantage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Speed &amp; Accuracy Heuristics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Learn 10-second option substitution techniques, formula recall sheets, and time management strategies for Physics, Chemistry &amp; Mathematics.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">English &amp; Non-PCM Scoring Mastery</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dedicated preparation for the scoring English Proficiency, Logical Reasoning, or Aptitude sections that create the critical rank difference.
              </p>
            </div>
          </div>

          {/* Target Audience & Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Who is this course for?</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                {(course.targetAudience || [
                  `Class 12th students targeting ${course.exam} 2026`,
                  `Dropper batch aspirants aiming to jump from 220+ to 330+ marks`,
                  "Students who want structured shortcuts & mock test error analysis"
                ]).map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Prerequisites &amp; Requirements</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                {(course.requirements || [
                  "Basic understanding of Class 11th & 12th PCM Syllabus",
                  "Willingness to solve daily speed drills and review mock mistakes",
                  "Laptop, Tablet, or Smartphone with internet connection"
                ]).map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: CURRICULUM & SYLLABUS */}
        <section id="curriculum" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
                Structured Syllabus
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Curriculum Breakdown &amp; Chapter Modules
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-bold bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 self-start sm:self-auto">
              {course.syllabusModules ? course.syllabusModules.length : 5} Comprehensive Modules • {course.lectures}
            </div>
          </div>

          <div className="space-y-3.5 pt-2">
            {(course.syllabusModules || [
              {
                title: "Module 1: Physics High-Yield Formulas & Speed Drills",
                duration: "25 Hours",
                lessonsCount: 15,
                topics: [
                  "Mechanics & Rotational Dynamics Shortcuts",
                  "Electromagnetism & Current Electricity Tricks",
                  "Modern Physics, Waves & Optics High-Frequency PYQs",
                  "Thermodynamics Formula Elimination"
                ]
              },
              {
                title: "Module 2: Chemistry Rapid Memory Points & Calculations",
                duration: "25 Hours",
                lessonsCount: 14,
                topics: [
                  "Organic Chemistry Reaction Mechanisms & Reagent Maps",
                  "Physical Chemistry Formula Substitution & Rapid Math",
                  "Inorganic NCERT Line-by-Line Key Highlights"
                ]
              },
              {
                title: "Module 3: Mathematics Problem Solving & Option Elimination",
                duration: "35 Hours",
                lessonsCount: 20,
                topics: [
                  "Calculus & Integration Elimination Techniques",
                  "Algebra, Complex Numbers & Matrices Direct Tricks",
                  "Coordinate Geometry & Vectors 30-Second Apps"
                ]
              },
              {
                title: "Module 4: English Proficiency & Logical Reasoning (30 Questions)",
                duration: "15 Hours",
                lessonsCount: 10,
                topics: [
                  "Grammar, Sentence Correction & Vocabulary Mnemonics",
                  "Logical Deductions, Syllogisms & Series Drills"
                ]
              },
              {
                title: "Module 5: 25 Full Length Mock Tests & Bonus Questions",
                duration: "20 Hours",
                lessonsCount: 10,
                topics: [
                  "Exact Pattern Full Simulation with Rank Predictor",
                  "Weak Area Diagnostic Reports & Solutions"
                ]
              }
            ]).map((module, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{module.title}</h3>
                      <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-2 mt-0.5">
                        <span>{module.lessonsCount || 8} Lessons</span>
                        <span>•</span>
                        <span>{module.duration || '15 Hours'}</span>
                      </div>
                    </div>
                  </div>

                  {openAccordion === idx ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openAccordion === idx && (
                  <div className="p-5 pt-1 border-t border-slate-100 bg-slate-50/70 space-y-2">
                    {module.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 py-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: WHAT YOU WILL LEARN */}
        <section id="learn" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-emerald-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-emerald-100 rounded-full border border-emerald-200 inline-block">
              Key Learning Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What You Will Master in This Course
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {(course.whatYouWillLearn || [
              `Master High-Weightage Chapters in Physics, Chemistry, and Mathematics`,
              `Solve speed questions in under 60 seconds with zero panic`,
              `Boost score by 40+ marks in English Proficiency & Logical Reasoning`,
              `Eliminate negative marking using 10Q shortcut elimination techniques`,
              `Unlock bonus questions safely with calculated risk strategies`,
              `Analyze mock test error logs with diagnostic reports`
            ]).map((outcome, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: INSTRUCTOR & MENTORS */}
        <section id="mentor" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
              Learn From The Best
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Instructors &amp; Mentor Panel
            </h2>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-amber-50/40 p-6 sm:p-8 rounded-3xl border border-slate-200/90 flex flex-col md:flex-row items-center gap-6 shadow-xs">
            <div className="relative shrink-0">
              <img
                src={course.mentorImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
                alt={course.mentor}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="text-xl font-black text-slate-900">{course.mentor}</h3>
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                  {course.mentorScore || 'Toppers Panel'}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-amber-700">
                {course.mentorRole || 'BITS Pilani & IIT Alumni Mentor'} • {course.mentorCollege || 'BITS Pilani'}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {course.mentorBio || 'Led by senior alumni who have cracked top engineering ranks and mentored thousands of aspirants into premier colleges.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: STUDENT REVIEWS & TESTIMONIALS */}
        <section id="reviews" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
                Verified Hall of Fame
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What Our Students Say
              </h2>
            </div>
            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-lg font-black text-slate-900">{course.rating}</span>
              <span className="text-xs text-slate-600 font-medium">({course.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(course.reviews || [
              {
                name: "Rohan Kulkarni",
                college: "BITS Pilani, CS 2025",
                score: "Score: 352/390",
                rating: 5,
                review: "The shortcut methods in Math and the English/LR module gave me an extra 45 marks. The test interface is an exact replica of the actual BITSAT exam!",
                avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
              },
              {
                name: "Meera Nair",
                college: "BITS Goa, EEE 2025",
                score: "Score: 326/390",
                rating: 5,
                review: "I was stuck at 250 in my coaching mocks. Following the time management strategy from this crash course helped me jump to 326 in Session 1!",
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
              }
            ]).map((rev, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 space-y-4 shadow-xs">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{rev.name}</h3>
                    <div className="text-[11px] text-amber-700 font-bold">{rev.college} • {rev.score}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
                  "{rev.review}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
        <section id="faqs" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {(course.faqs || [
              {
                q: "When will I get access to the course after purchase?",
                a: "Instant access! As soon as your enrollment is completed, all live class schedules, recorded lectures, study material, and test series will be unlocked in your account."
              },
              {
                q: "Are the mock tests as per the latest exam pattern?",
                a: "Yes! All mock tests match the exact latest exam format, marking scheme (+3/-1), section timings, and bonus questions."
              },
              {
                q: "Can I watch recorded lectures if I miss a live class?",
                a: "Absolutely. All live classes are recorded in HD quality and made available within 2 hours of completion with unlimited rewatch validity."
              },
              {
                q: "How do I resolve doubts while preparing?",
                a: "You get access to our private WhatsApp/Telegram community where mentors and top peers solve doubts step-by-step."
              }
            ]).map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 border-t border-slate-100 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: RELATED COURSES & RECOMMENDED BATCHES */}
        <section id="related" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
                Recommended For You
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Related Prep Batches &amp; Test Series
              </h2>
            </div>
            <Link
              to="/course-all"
              className="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-800 self-start sm:self-auto"
            >
              <span>Explore All Batches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedCourses.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Clickable Image Box with Hover Zoom */}
                  <Link
                    to={`/course-detail/${rel.slug || rel.id}`}
                    className="block relative h-48 sm:h-52 overflow-hidden bg-slate-100 cursor-pointer"
                    aria-label={`View ${rel.title}`}
                  >
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3.5 left-3.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      {rel.tag || 'TOP RATED'}
                    </span>

                    <span className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                      {rel.exam}
                    </span>

                    <span className="absolute bottom-3 right-3.5 bg-white/95 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rel.rating}</span>
                      <span className="text-slate-500 text-[10px]">({rel.reviewsCount})</span>
                    </span>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{rel.mentor}</span>
                    </div>

                    <Link to={`/course-detail/${rel.slug || rel.id}`}>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug cursor-pointer">
                        {rel.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {rel.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{rel.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span>{rel.tests || rel.lectures}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Details & Enroll CTAs */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-black text-slate-900">₹{rel.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{rel.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">
                      {rel.discount}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/course-detail/${rel.slug || rel.id}`}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/course-detail/${rel.slug || rel.id}`}
                      className="px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Enroll
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Video Preview Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        videoUrl={course.videoUrl || "https://youtu.be/Y5bYK0VBTG0"}
        onClose={() => setIsVideoOpen(false)}
      />
    </article>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from '@/src/compat/router';
import {
  Star, Clock, ShieldCheck, CheckCircle2, Play, ChevronDown, ChevronUp,
  UserCheck, Award, MessageCircle, ArrowRight, Sparkles, FileText, Zap,
  HelpCircle, Check, Users, Brain, Share2, Flame, ShieldAlert, MonitorPlay,
  Calendar, Target, Compass, BookOpen, Layers
} from 'lucide-react';
import { mentorshipData, getMentorshipBySlug } from '../data/mentorship';
import { coursesData } from '../data/courses';
import VideoModal from '../components/VideoModal';

export default function MentorshipDetail({ onAddToCart = () => {} }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [openPhase, setOpenPhase] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const plan = getMentorshipBySlug(slug);

  // Related mentorship or courses
  const relatedMentorship = mentorshipData
    .filter((m) => m.id !== plan.id)
    .slice(0, 3);

  // Update SEO Document Title on Mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = plan.seo?.title || `${plan.title} | 10Q Challenge Mentorship`;
    }
  }, [plan]);

  const handleEnrollNow = () => {
    if (onAddToCart) {
      onAddToCart({
        id: `mentorship-${plan.id}`,
        title: plan.title,
        price: plan.price,
        originalPrice: plan.originalPrice,
        discount: plan.discount,
        image: plan.image,
        mentor: plan.leadMentor?.name || 'BITSian Alumni Mentor',
        duration: plan.duration
      });
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('10q_token') : null;
    const user = typeof window !== 'undefined' ? localStorage.getItem('10q_user') : null;

    if (token || user) {
      navigate('/cart');
    } else {
      navigate('/login', {
        state: {
          fromEnroll: true,
          courseTitle: plan.title,
          courseId: plan.id,
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
    '@type': 'EducationalOccupationalProgram',
    name: plan.title,
    description: plan.description,
    provider: {
      '@type': 'Organization',
      name: '10Q Challenge Mentorship',
      sameAs: 'https://10qchallenge.com',
    },
    offers: {
      '@type': 'Offer',
      price: plan.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: plan.rating,
      reviewCount: plan.reviewsCount,
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

      {/* 1. Mentorship Header / Hero Section */}
      <header className="relative bg-gradient-to-b from-[#21174d] via-[#1c1340] to-[#150e30] text-white pt-10 pb-20 border-b border-purple-900/50 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-purple-200/80 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors font-medium">Home</Link>
            <span>/</span>
            <Link to="/mentorship" className="hover:text-amber-400 transition-colors font-medium">Mentorship</Link>
            <span>/</span>
            <Link to={`/mentorship/${plan.exam}`} className="hover:text-amber-400 transition-colors font-medium">{plan.exam}</Link>
            <span>/</span>
            <span className="text-amber-400 font-bold truncate max-w-xs">{plan.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Hero Main Information */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{plan.tag || 'TOP RATED'}</span>
                </span>

                <span className="bg-purple-900/80 border border-purple-400/30 text-purple-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>{plan.badge || '1-ON-1 GUIDANCE'}</span>
                </span>

                <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified Alumni Mentors</span>
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {plan.title}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                {plan.description}
              </p>

              {/* Social Proof & Ratings Row */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm text-purple-200/90 pt-4 pb-4 border-y border-purple-800/50">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-black text-white text-base">{plan.rating}</span>
                  <span className="text-purple-300 text-xs">({plan.reviewsCount.toLocaleString()} reviews)</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">{(plan.studentsCount || 2500).toLocaleString()}+ Mentored</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-300">{plan.leadMentor?.college || 'BITS Pilani CS'}</span>
                </div>
              </div>

              {/* High-Impact Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(plan.heroHighlights || [
                  "Dedicated 1-on-1 Personal Mentor",
                  "Weekly 1-on-1 Video Strategy Calls",
                  "Daily WhatsApp Target & Habit Tracking",
                  "Mock Test Error & Time Leak Analysis"
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Share & Support Links */}
              <div className="flex items-center space-x-4 pt-1 text-xs text-purple-300">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isCopied ? 'Link Copied to Clipboard!' : 'Share Program'}</span>
                </button>
                <span>•</span>
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>7-Day Mentor Match Guarantee</span>
                </span>
              </div>

            </div>

            {/* Right Sticky Enrollment Sidebar */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 z-20">
              <aside className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-6 text-slate-900">
                
                {/* Media Preview Box */}
                <div
                  className="relative h-52 sm:h-56 rounded-2xl overflow-hidden bg-slate-950 group cursor-pointer shadow-md"
                  onClick={() => setIsVideoOpen(true)}
                  title="Click to preview mentorship structure"
                >
                  <img
                    src={plan.image}
                    alt={plan.title}
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
                    <span>How Mentorship Works</span>
                  </span>

                  <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-md uppercase shadow">
                    {plan.duration}
                  </span>
                </div>

                {/* Price Section */}
                <div className="space-y-1.5 border-b border-slate-100 pb-4">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">₹{plan.price}</span>
                    <span className="text-base sm:text-lg text-slate-400 line-through">₹{plan.originalPrice}</span>
                    <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-200">
                      {plan.discount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/80">
                    <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Only 5 Mentor Slots Open for this Exam Cycle!</span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="space-y-3">
                  <button
                    onClick={handleEnrollNow}
                    className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply &amp; Join Mentorship</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <a
                    href="https://wa.me/918839737146?text=Hi%2010Q%20Challenge!%20I%20want%20to%20apply%20for%20the%20Mentorship%20Program:%20"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>Free 10-Min Counseling Call on WhatsApp</span>
                  </a>
                </div>

                {/* Included Features List */}
                <div className="pt-2 space-y-3 text-xs text-slate-700">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                    <span>What's Included in Mentorship:</span>
                    <span className="text-emerald-600 text-xs font-bold">Guaranteed</span>
                  </div>

                  {(plan.whatIncluded || [
                    { title: "Personal 1-on-1 Mentor", desc: "Paired with a BITSian / IITian topper" },
                    { title: "Weekly 1-on-1 Video Calls", desc: "Live strategy review & custom target setting" },
                    { title: "Private WhatsApp Hotline", desc: "Daily doubt & motivation support" },
                    { title: "AI Mock Test Error Audit", desc: "Personalized speed & time leak analysis" }
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">{item.title}: </span>
                        <span className="text-slate-600">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Mentor Fit Guarantee</span>
                  </span>
                  <span>•</span>
                  <span>WhatsApp 24x7</span>
                </div>

              </aside>
            </div>

          </div>

        </div>
      </header>

      {/* 2. Interactive Navigation Sticky Tabs */}
      <nav aria-label="Mentorship Sections" className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto py-3.5 scrollbar-none">
            {[
              { id: 'overview', label: 'Program Overview' },
              { id: 'roadmap', label: '4-Phase Roadmap' },
              { id: 'mentors', label: 'Mentor Profiles' },
              { id: 'included', label: "What's Included" },
              { id: 'testimonials', label: 'Success Stories' },
              { id: 'faqs', label: 'FAQs' },
              { id: 'related', label: 'Other Programs' }
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
        
        {/* SECTION 1: PROGRAM OVERVIEW */}
        <section id="overview" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-3">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
              Why 1-on-1 Mentorship
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {plan.overviewTitle || 'Never Feel Lost, Overwhelmed, or Demotivated Again'}
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
            {(plan.overviewParagraphs || [
              "Engineering entrance exams like BITSAT and JEE are not just tests of knowledge; they test psychological stamina, time allocation, and consistent daily execution.",
              "With 10Q Challenge Mentorship, you have a top AIR mentor who has walked the exact same path, monitoring your daily practice questions, reviewing your mock test mistakes, and keeping you on track every single day."
            ]).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* 4-Step Mentorship Process Flow */}
          <div className="pt-4 space-y-4">
            <h3 className="text-lg font-black text-slate-900">How the 10Q Mentorship System Works:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Personal Matching",
                  desc: "Paired with a topper matching your target campus & branch."
                },
                {
                  step: "02",
                  title: "Diagnostic Audit",
                  desc: "Baseline test analysis to find your speed bottlenecks."
                },
                {
                  step: "03",
                  title: "Weekly 1-on-1 Calls",
                  desc: "Video strategy sessions to adjust targets and resolve issues."
                },
                {
                  step: "04",
                  title: "Daily WhatsApp Chat",
                  desc: "Continuous accountability, question reviews & motivation."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    {item.step}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-PHASE ROADMAP */}
        <section id="roadmap" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
              Step-by-Step Evolution
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              4-Phase Mentorship Roadmap to Exam Day
            </h2>
          </div>

          <div className="space-y-4 pt-2">
            {(plan.phases || [
              {
                phaseNumber: "01",
                title: "Diagnostic Assessment & Custom Roadmap",
                duration: "Week 1",
                description: "Your mentor conducts an in-depth baseline test analysis to evaluate your chapter-wise speed and accuracy.",
                points: [
                  "Baseline Mock Test evaluation & speed bottleneck diagnosis",
                  "Personalized chapter priority scoring matrix",
                  "Customized daily time-table creation"
                ]
              },
              {
                phaseNumber: "02",
                title: "High-Yield Chapter Mastery & Speed Building",
                duration: "Weeks 2 - 5",
                description: "Master 10-second option elimination techniques and formula memory cards with daily check-ins.",
                points: [
                  "Daily WhatsApp target check-ins by 10 PM",
                  "Exclusive formula cheat sheets & high-frequency question banks"
                ]
              },
              {
                phaseNumber: "03",
                title: "Mock Test Strategy & AI Error Log Analysis",
                duration: "Weeks 6 - 8",
                description: "Weekly 1-on-1 video call to dissect mock test time-per-question metrics and eliminate silly mistakes.",
                points: [
                  "Weekly 1-on-1 video call to dissect mock time-per-question metrics",
                  "Subject attempting order optimization"
                ]
              },
              {
                phaseNumber: "04",
                title: "Bonus Question Tactics & Exam Day Mindset",
                duration: "Final Weeks",
                description: "Unlock bonus questions safely, manage exam hall pressure, and peak your mental stamina.",
                points: [
                  "Bonus question unlocking criteria & risk-reward simulations",
                  "Exam hall stress management & last-minute formula recap"
                ]
              }
            ]).map((phase, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenPhase(openPhase === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {phase.phaseNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                          {phase.duration}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">{phase.title}</h3>
                    </div>
                  </div>

                  {openPhase === idx ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openPhase === idx && (
                  <div className="p-5 pt-2 border-t border-slate-100 bg-slate-50/70 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{phase.description}</p>
                    <div className="space-y-2 pt-1">
                      {phase.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: MENTOR PROFILES & FACULTY */}
        <section id="mentors" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
              Verified Elite Toppers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Meet Your Dedicated Mentor Panel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {(plan.mentorTeam || [
              {
                name: "Aarav Sharma",
                college: "BITS Pilani (Pilani Campus)",
                branch: "Computer Science",
                score: "356/390",
                studentsCount: "450+",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
              },
              {
                name: "Sneha Patel",
                college: "BITS Hyderabad",
                branch: "Electronics & Electrical",
                score: "338/390",
                studentsCount: "320+",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
              },
              {
                name: "Rohan Verma",
                college: "BITS Goa / IIT Bombay",
                branch: "Mechanical Engg",
                score: "AIR 842",
                studentsCount: "290+",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
              }
            ]).map((mentor, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 text-center space-y-4 shadow-xs">
                <div className="relative inline-block">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full shadow">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base">{mentor.name}</h3>
                  <div className="text-xs font-bold text-amber-700">{mentor.college}</div>
                  <div className="text-[11px] text-slate-500">{mentor.branch} • {mentor.score}</div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-center text-xs text-slate-600 font-semibold">
                  <UserCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
                  <span>{mentor.studentsCount} Students Mentored</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: WHAT IS INCLUDED */}
        <section id="included" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-emerald-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-emerald-100 rounded-full border border-emerald-200 inline-block">
              All-Inclusive Mentorship Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Everything You Need to Succeed
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {(plan.whatIncluded || [
              {
                title: "Personal 1-on-1 Mentor",
                desc: "Assigned mentor matched with your target branch and preferred study style."
              },
              {
                title: "Weekly Video Strategy Calls",
                desc: "Live 1-on-1 Google Meet strategy reviews and schedule adjustments."
              },
              {
                title: "Private WhatsApp Hotline",
                desc: "Direct access to ask questions, share daily progress, and stay motivated."
              },
              {
                title: "Full Mock Test Error Audit",
                desc: "Personalized breakdown of your speed, accuracy, and weak chapters."
              },
              {
                title: "Score Booster Material",
                desc: "Curated formula cheat sheets, revision roadmaps, and non-PCM score boosters."
              },
              {
                title: "Campus Life & Branch Guide",
                desc: "Exclusive insights into cutoffs, dual degrees, and college placements."
              }
            ]).map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: STUDENT TESTIMONIALS */}
        <section id="testimonials" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
                Success Stories
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                From Stagnant Scores to Dream Campuses
              </h2>
            </div>
            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-lg font-black text-slate-900">{plan.rating}</span>
              <span className="text-xs text-slate-600 font-medium">({plan.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(plan.testimonials || [
              {
                name: "Tanmay Kulkarni",
                score: "BITSAT 342 (Up from 248)",
                branch: "BITS Pilani, CS 2025",
                text: "The weekly error analysis changed everything for me. My mentor Aarav bhaiya showed me I was losing 35 marks purely due to rush in English & LR. He helped me fix my paper strategy, and I jumped 94 marks!",
                avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
              },
              {
                name: "Ananya Gupta",
                score: "BITSAT 328",
                branch: "BITS Goa, ECE 2025",
                text: "Having a personal mentor keep daily accountability on WhatsApp prevented me from procastinating. Knowing a BITSian was checking my daily questions gave me immense confidence.",
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
              }
            ]).map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200/90 space-y-4 shadow-xs">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{t.name}</h3>
                    <div className="text-xs font-bold text-amber-700">{t.score}</div>
                    <div className="text-[11px] text-slate-500 font-semibold">{t.branch}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic font-normal">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: FAQS */}
        <section id="faqs" className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
              Mentorship FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {(plan.faqs || [
              {
                q: "How will my mentor be assigned?",
                a: "Within 2 hours of enrollment, our academic coordinator connects with you on WhatsApp/call to understand your baseline score, target campus, and study style, matching you with the ideal BITSian mentor."
              },
              {
                q: "What happens during the weekly 1-on-1 calls?",
                a: "Your mentor reviews your completed practice sets, analyzes your latest mock test score graph, pinpoints chapters where you wasted time, and sets custom daily goals for the upcoming week."
              },
              {
                q: "Can I message my mentor anytime on WhatsApp?",
                a: "Yes! You have direct 1-on-1 WhatsApp chat access with your mentor for doubt discussion, daily target checks, and strategy advice whenever you feel stuck."
              },
              {
                q: "What if I need to change my mentor?",
                a: "We offer a 100% no-questions-asked mentor replacement policy within the first 7 days if you feel the study style doesn't match."
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

        {/* SECTION 7: OTHER MENTORSHIP TRACKS & PROGRAMS */}
        <section id="related" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full border border-amber-200 inline-block">
                Explore Other Tracks
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Related Mentorship &amp; Star Programs
              </h2>
            </div>
            <Link
              to="/mentorship"
              className="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-800 self-start sm:self-auto"
            >
              <span>View All Mentorship Tracks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedMentorship.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Clickable Image Box */}
                  <Link
                    to={`/mentorship-detail/${rel.slug}`}
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
                      {rel.tag || 'POPULAR'}
                    </span>

                    <span className="absolute bottom-3 right-3.5 bg-white/95 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rel.rating}</span>
                      <span className="text-slate-500 text-[10px]">({rel.reviewsCount})</span>
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{rel.leadMentor?.name || 'Top Alumni Mentor'}</span>
                    </div>

                    <Link to={`/mentorship-detail/${rel.slug}`}>
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
                        <span>{rel.exam} Track</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTAs */}
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
                      to={`/mentorship-detail/${rel.slug}`}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/mentorship-detail/${rel.slug}`}
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

      {/* Video Modal Preview */}
      <VideoModal
        isOpen={isVideoOpen}
        videoUrl={plan.videoUrl || "https://youtu.be/Y5bYK0VBTG0"}
        onClose={() => setIsVideoOpen(false)}
      />
    </article>
  );
}

'use client';
import React, { useState } from 'react';
import { useParams, Link } from '@/src/compat/router';
import {
  ShieldCheck, UserCheck, Calendar, CheckCircle2, ArrowRight,
  Sparkles, MessageCircle, Star, Clock, BookOpen, Compass, Flame
} from 'lucide-react';
import { mentorshipData } from '../data/mentorship';

export default function Mentorship() {
  const params = useParams();
  const rawExam = params.examName || params.slug || 'All';
  const [selectedExam, setSelectedExam] = useState(rawExam === 'All' ? 'All' : rawExam.toUpperCase());

  const examsList = ['All', 'BITSAT', 'JEE', 'VITEEE', 'MET', 'Comedk'];

  const filteredPlans = mentorshipData.filter((plan) => {
    if (selectedExam === 'All') return true;
    return (
      plan.exam.toLowerCase() === selectedExam.toLowerCase() ||
      plan.title.toLowerCase().includes(selectedExam.toLowerCase())
    );
  });

  const displayPlans = filteredPlans.length > 0 ? filteredPlans : mentorshipData;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 selection:bg-amber-400 selection:text-slate-950">
      
      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-b from-[#21174d] via-[#1c1340] to-[#150e30] text-white border-b border-purple-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Personalized 1-on-1 Guidance</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {selectedExam === 'All' ? 'Engineering Entrance' : selectedExam} Mentorship Programs
          </h1>
          <p className="text-purple-200 text-sm sm:text-base font-normal leading-relaxed">
            Get mentored directly by IITians and BITSians who have cracked top ranks. Receive customized daily roadmaps, weekly video review sessions, and mock test error diagnostics.
          </p>

          {/* Exam Filter Bar */}
          <div className="flex items-center justify-center space-x-2 pt-4 flex-wrap gap-2">
            {examsList.map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-4.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedExam.toLowerCase() === exam.toLowerCase()
                    ? 'bg-amber-400 text-slate-950 shadow-md border border-amber-400 scale-105'
                    : 'bg-[#36277b]/60 text-purple-200 border border-purple-700/40 hover:bg-[#36277b] hover:text-white'
                }`}
              >
                {exam === 'All' ? 'All Mentorships' : `${exam} Mentorship`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Plans Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Clickable Image Thumbnail */}
                  <Link
                    to={`/mentorship-detail/${plan.slug}`}
                    className="block relative h-52 overflow-hidden bg-slate-100 cursor-pointer"
                    aria-label={`View ${plan.title}`}
                  >
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <span className="absolute top-3.5 left-3.5 bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-slate-950" />
                      <span>{plan.tag || 'TOP RATED'}</span>
                    </span>

                    <span className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                      {plan.exam}
                    </span>

                    {/* Bottom Rating */}
                    <span className="absolute bottom-3 right-3.5 bg-white/95 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{plan.rating}</span>
                      <span className="text-slate-500 text-[10px]">({plan.reviewsCount})</span>
                    </span>
                  </Link>

                  {/* Mentorship Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{plan.leadMentor?.college || 'BITS Pilani CS Mentor'}</span>
                    </div>

                    <Link to={`/mentorship-detail/${plan.slug}`}>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug cursor-pointer">
                        {plan.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {plan.shortDescription || plan.description}
                    </p>

                    {/* Duration & Features */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Compass className="w-3.5 h-3.5 text-amber-600" />
                        <span>1-on-1 Guidance</span>
                      </div>
                    </div>

                    {/* Core Bullet Points */}
                    <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                      {(plan.heroHighlights || [
                        "Weekly 1-on-1 Google Meet strategy calls",
                        "Daily WhatsApp target tracking & accountability",
                        "Mock test error log & time leak analysis"
                      ]).slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & CTA Buttons */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-slate-900">₹{plan.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{plan.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                      {plan.discount}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/mentorship-detail/${plan.slug}`}
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer text-center flex-1 sm:flex-none"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/mentorship-detail/${plan.slug}`}
                      className="px-4.5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer text-center flex items-center justify-center gap-1 flex-1 sm:flex-none"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* WhatsApp Counselor Callout Card */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-[#1e1448] to-slate-900 text-white border border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-amber-400 font-black text-xs uppercase tracking-widest px-3 py-1 bg-amber-400/20 rounded-full border border-amber-400/30 inline-block mb-1">
                Free Academic Counseling
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">Need help picking the right mentorship program?</h4>
              <p className="text-purple-200 text-xs sm:text-sm font-normal max-w-xl">
                Chat directly with a BITSian academic counselor on WhatsApp to discuss your current test scores and choose the best roadmap.
              </p>
            </div>
            <a
              href="https://wa.me/918839737146?text=Hi%2010Q%20Challenge!%20I%20need%20guidance%20on%20choosing%20the%20best%20mentorship%20batch"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl flex items-center space-x-2 transition-all shadow-lg hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Free WhatsApp Consultation</span>
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}

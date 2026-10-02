'use client';
import React from 'react';
import { useParams, Link } from '@/src/compat/router';
import { CheckCircle2, ShieldCheck, Zap, BarChart3, Clock, ArrowRight } from 'lucide-react';
import { examsData } from '../data/exams';

export default function TestSeries() {
  const params = useParams();
  const rawExam = params.examName || params.slug || 'BITSAT';
  const targetExam = rawExam.toUpperCase();

  const testPackages = [
    {
      id: 1,
      title: `${targetExam} Full-Length AI Mock Test Series`,
      slug: "bitsat-full-length-ai-mock-test-series",
      tests: "25 FULL LENGTH MOCKS",
      price: 1999,
      originalPrice: 3999,
      features: [
        "Exact latest exam interface replica",
        "Instant score & AIR percentile prediction",
        "Detailed solution key with video hints",
        "Weak area and time-per-question analytics"
      ]
    },
    {
      id: 2,
      title: `${targetExam} Speed & Accuracy Booster Pack`,
      slug: "bitsat-speed-accuracy-booster-pack",
      tests: "15 CHAPTERWISE + 10 FULL MOCKS",
      price: 1499,
      originalPrice: 2999,
      features: [
        "Time pressure micro-drills",
        "Negative marking avoidance guide",
        "Rank predictor algorithm",
        "Unlimited test re-attempts"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-24 pb-16">
      
      {/* Hero Header */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-amber-700 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block mb-3 border border-amber-200">
            AI Test Engine
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {targetExam} Mock Test Series
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 font-normal">
            Stop guessing your performance — measure it with India's most realistic test series designed by BITSians &amp; IITians.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-amber-400 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-block">
                    {pkg.tests}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">{pkg.title}</h3>

                  <div className="flex items-baseline space-x-2 pt-2">
                    <span className="text-3xl font-black text-slate-900">₹{pkg.price}</span>
                    <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-slate-100">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <Link
                    to="/cart"
                    className="py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-center rounded-xl transition-all shadow-md block cursor-pointer text-sm"
                  >
                    Buy Test Series Now
                  </Link>
                  <Link
                    to={`/course/${pkg.slug}`}
                    className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-center rounded-xl transition-all shadow-sm block cursor-pointer text-sm"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}


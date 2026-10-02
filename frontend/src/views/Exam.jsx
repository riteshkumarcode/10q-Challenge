'use client';
import React from 'react';
import { useParams, Link } from '@/src/compat/router';
import { BookOpen, CheckCircle, Clock, Award, ShieldCheck, ArrowRight, Star, Flame } from 'lucide-react';
import { examsData } from '../data/exams';
import { coursesData } from '../data/courses';

export default function Exam() {
  const params = useParams();
  const rawName = params.examName || params.slug || 'BITSAT';
  const examKey = Object.keys(examsData).find(k => k.toLowerCase() === rawName.toLowerCase()) || 'BITSAT';
  const exam = examsData[examKey] || examsData.BITSAT;
  const relatedCourses = coursesData.filter(
    (c) => c.exam.toLowerCase() === rawName.toLowerCase() || c.exam === 'BITSAT'
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 selection:bg-amber-400 selection:text-slate-950">

      {/* Exam Hero */}
      <section className="py-20 bg-gradient-to-b from-[#21174d] via-[#1c1340] to-[#150e30] text-white border-b border-purple-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-slate-950 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-400 rounded-full inline-block shadow-sm">
              Exam Guide &amp; Prep
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {exam.heroTitle}
            </h1>
            <p className="text-purple-200 text-base sm:text-lg leading-relaxed font-normal">
              {exam.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/course-all"
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-md flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Enroll in {exam.name} Batch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={`/mentorship/${rawName}`}
                className="px-7 py-3.5 bg-[#36277b]/80 hover:bg-[#433198] text-white font-bold text-sm rounded-2xl border border-purple-700/60 shadow-xs transition-all cursor-pointer"
              >
                <span>1-on-1 Mentorship Program</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern & Breakdown */}
      <section className="py-16 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8">
            {exam.name} Exam Pattern &amp; Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Questions</div>
              <div className="text-3xl font-black text-amber-600">{exam.totalQuestions} Questions</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Exam Duration</div>
              <div className="text-3xl font-black text-purple-700">{exam.duration}</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Marking Scheme</div>
              <div className="text-lg font-black text-emerald-700 mt-2">{exam.markingScheme}</div>
            </div>
          </div>

          {/* Sectional Breakdown */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6">Subject Breakdown:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {exam.sections.map((sec, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <div className="text-amber-600 font-black text-2xl">{sec.questions}</div>
                  <div className="text-xs text-slate-700 font-bold mt-1">{sec.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Batches */}
      <section className="py-16 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-amber-800 font-black text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block mb-2 border border-amber-200">
              Exam Target Batches
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Recommended Courses for {exam.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Clickable Image */}
                  <Link
                    to={`/course-detail/${course.slug || course.id}`}
                    className="block relative h-52 overflow-hidden bg-slate-100 cursor-pointer"
                    aria-label={`View ${course.title}`}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3.5 left-3.5 bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-slate-950" />
                      <span>{course.tag || 'POPULAR'}</span>
                    </span>

                    <span className="absolute bottom-3 right-3.5 bg-white/95 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-500 text-[10px]">({course.reviewsCount})</span>
                    </span>
                  </Link>

                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{course.mentor}</span>
                    </div>

                    <Link to={`/course-detail/${course.slug || course.id}`}>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug cursor-pointer">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {course.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span>{course.lectures || course.tests}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-slate-900">₹{course.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{course.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                      {course.discount}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/course-detail/${course.slug || course.id}`}
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/course-detail/${course.slug || course.id}`}
                      className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Enroll
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

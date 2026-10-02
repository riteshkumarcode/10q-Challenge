'use client';
import React, { useState, useEffect } from 'react';
import { Link } from '@/src/compat/router';
import { Search, Star, Clock, BookOpen, ShieldCheck, ArrowRight, Sparkles, Filter, Flame } from 'lucide-react';
import { coursesData as initialCourses } from '../data/courses';
import { apiGetCourses } from '../services/api';

export default function CourseAll() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('All');

  useEffect(() => {
    apiGetCourses()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setCourses(res.data);
        }
      })
      .catch((err) => {
        console.log('Using local courses fallback:', err);
      });
  }, []);

  const exams = ['All', 'BITSAT', 'JEE', 'VITEEE', 'MET', 'Comedk', 'Mentorship'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam =
      selectedExam === 'All' ||
      course.exam.toLowerCase() === selectedExam.toLowerCase();
    return matchesSearch && matchesExam;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 selection:bg-amber-400 selection:text-slate-950">
      
      {/* Header Banner */}
      <section className="py-14 bg-gradient-to-b from-[#21174d] via-[#1c1340] to-[#150e30] text-white border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>Explore All Courses</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Engineering Entrance Batches
              </h1>
              <p className="text-purple-200 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
                Structured crash courses, full syllabus batches &amp; mentorship programs curated by BITS Pilani &amp; IIT alumni.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses or exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2c1f66] border border-purple-700/50 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-purple-300/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Exam Filter Pills Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-8 pb-1 scrollbar-none">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-purple-300 shrink-0 mr-1" />
              {exams.map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-4.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    selectedExam === exam
                      ? 'bg-amber-400 text-slate-950 shadow-md border border-amber-400 scale-105'
                      : 'bg-[#2c1f66] hover:bg-[#382880] text-purple-200 border border-purple-700/50'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto p-8 space-y-3 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">No Batches Found</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-normal">
                We could not find any course matching "{searchQuery}". Try selecting another category or clear the search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedExam('All');
                }}
                className="mt-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Clickable Course Thumbnail Box with Zoom */}
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
                      
                      {/* Top Badges */}
                      <span className="absolute top-3.5 left-3.5 bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-slate-950" />
                        <span>{course.tag || "BEST SELLER"}</span>
                      </span>

                      <span className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                        {course.exam}
                      </span>

                      {/* Bottom Rating */}
                      <span className="absolute bottom-3 right-3.5 bg-white/95 text-slate-900 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{course.rating}</span>
                        <span className="text-slate-500 text-[10px]">({course.reviewsCount})</span>
                      </span>
                    </Link>

                    {/* Course Info */}
                    <div className="p-6 space-y-4">
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
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                          <span>{course.lectures || course.tests}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA Buttons */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-slate-900">₹{course.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{course.originalPrice}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                        {course.discount} applied
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/course-detail/${course.slug || course.id}`}
                        className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer text-center flex-1 sm:flex-none"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/course-detail/${course.slug || course.id}`}
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
          )}
        </div>
      </section>

    </main>
  );
}

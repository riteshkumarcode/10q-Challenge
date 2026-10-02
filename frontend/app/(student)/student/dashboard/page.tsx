'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  GraduationCap,
  Play,
  FileQuestion,
  HelpCircle,
  Clock,
  ArrowRight,
  Trophy,
  Sparkles,
  CheckCircle2,
  BarChart2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Course, Doubt, TestPaper } from '@/types';
import { api } from '@/lib/api';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [tests, setTests] = useState<TestPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [c, d, t] = await Promise.all([
          api.getCourses(),
          api.getDoubts(user?.id),
          api.getTestPapers(),
        ]);
        setCourses(c.slice(0, 3));
        setDoubts(d.slice(0, 3));
        setTests(t);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, [user]);

  const activeCourse = courses[0];

  return (
    <div className="space-y-8">
      {/* 1. WELCOME & EXAM COUNTDOWN HERO */}
      <div className="bg-gradient-to-r from-[#17152A] via-[#3F328A] to-[#2D246B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFD800] text-xs font-bold uppercase">
              <Sparkles size={13} />
              <span>Target: BITSAT 2025</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.fullName?.split(' ')[0] || 'Aspirant'}! 🚀
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Consistency is key to 350+ marks. Complete today's Physics short-tricks and take CBT Mock 01.
            </p>
          </div>

          {/* Exam Countdown Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0">
            <span className="text-[11px] font-bold text-white/70 block uppercase tracking-wider">
              BITSAT Session 1
            </span>
            <div className="text-2xl font-black text-[#FFD800] mt-0.5">58 Days Left</div>
            <span className="text-[10px] text-[#20D66B] font-semibold">Stay on Track</span>
          </div>
        </div>
      </div>

      {/* 2. STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-semibold">Enrolled Courses</span>
            <GraduationCap size={16} className="text-[#3F328A]" />
          </div>
          <div className="text-2xl font-extrabold text-[#17152A]">{courses.length}</div>
          <span className="text-[10px] text-[#20D66B] font-bold">Active & Enrolled</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-semibold">CBT Mocks Taken</span>
            <FileQuestion size={16} className="text-[#FF3F68]" />
          </div>
          <div className="text-2xl font-extrabold text-[#17152A]">4 / 20</div>
          <span className="text-[10px] text-[#3F328A] font-bold">Avg Score: 294 / 390</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-semibold">Doubts Resolved</span>
            <HelpCircle size={16} className="text-[#20D66B]" />
          </div>
          <div className="text-2xl font-extrabold text-[#17152A]">{doubts.length || 2}</div>
          <span className="text-[10px] text-[#20D66B] font-bold">100% Resolved by Faculty</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-semibold">National Percentile</span>
            <Trophy size={16} className="text-[#FFD800]" />
          </div>
          <div className="text-2xl font-extrabold text-[#17152A]">96.4%</div>
          <span className="text-[10px] text-[#16A34A] font-bold">BITS Pilani CS Cutoff Range</span>
        </div>
      </div>

      {/* 3. CONTINUE LEARNING SPOTLIGHT */}
      {activeCourse && (
        <div className="bg-white rounded-3xl p-6 border border-[#E7E3F5] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[#17152A] flex items-center gap-2">
              <Play size={16} className="fill-[#3F328A] text-[#3F328A]" />
              <span>Continue Where You Left Off</span>
            </h3>
            <span className="text-xs text-[#6E6990]">68% Completed</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center justify-between p-4 rounded-2xl bg-[#F6F4FF] border border-[#E7E3F5]">
            <div className="flex gap-4 items-center">
              <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-[#3F328A] shrink-0">
                <Image
                  src={activeCourse.thumbnailUrl || '/site/assets/images/course-default.jpg'}
                  alt={activeCourse.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3F328A] text-white">
                  {activeCourse.examTag}
                </span>
                <h4 className="font-bold text-sm text-[#17152A] mt-1">{activeCourse.title}</h4>
                <p className="text-xs text-[#6E6990]">
                  Next Lecture: Chapter 2 - Work Power Energy Shortcuts
                </p>
              </div>
            </div>

            <Link
              href={`/student/courses/${activeCourse.id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <span>Resume Lecture</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* 4. ENROLLED COURSES & CBT MOCK PAPERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: My Courses */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-[#17152A]">My Courses</h3>
            <Link
              href="/student/courses"
              className="text-xs font-bold text-[#3F328A] hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-4 rounded-2xl border border-[#E7E3F5] hover:border-[#3F328A]/30 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#F0EDFD] text-[#3F328A] flex items-center justify-center font-bold shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs sm:text-sm text-[#17152A] truncate">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-[#6E6990]">
                      {course.chapters?.length || 5} Modules • Video & Notes Included
                    </p>
                  </div>
                </div>

                <Link
                  href={`/student/courses/${course.id}`}
                  className="px-4 py-2 rounded-xl bg-[#F0EDFD] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold text-xs transition-colors shrink-0"
                >
                  Open
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Available CBT Mock Tests */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-[#17152A]">CBT Mock Tests</h3>
            <span className="text-xs text-[#20D66B] font-bold">20 Full Mocks</span>
          </div>

          <div className="space-y-3">
            {tests.slice(0, 3).map((test) => (
              <div
                key={test.id}
                className="bg-white p-4 rounded-2xl border border-[#E7E3F5] flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-xs text-[#17152A]">{test.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-[#6E6990] mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {test.durationMinutes}m
                    </span>
                    <span>130 Questions</span>
                    <span className="text-[#3F328A] font-bold">390 Marks</span>
                  </div>
                </div>

                <Link
                  href={`/student/tests/${test.id}`}
                  className="px-3.5 py-2 rounded-xl bg-[#FF3F68] hover:bg-[#E02E53] text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Start</span>
                  <Play size={10} className="fill-white" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

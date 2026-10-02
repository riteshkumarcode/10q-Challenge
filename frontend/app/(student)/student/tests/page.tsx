'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileQuestion,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  Filter,
  CheckCircle2,
  Play,
  Flame,
  Search
} from 'lucide-react';
import { MOCK_TEST_PAPERS } from '@/lib/data';

export default function StudentTestsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'FULL_MOCK' | 'CHAPTER_TEST'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTests = MOCK_TEST_PAPERS.filter((test) => {
    const examTag = test.examTag || 'BITSAT';
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examTag.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory === 'FULL_MOCK') return test.title.toLowerCase().includes('full') || test.title.toLowerCase().includes('mock');
    if (selectedCategory === 'CHAPTER_TEST') return !test.title.toLowerCase().includes('full');
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#17152A] via-[#2A2356] to-[#3F328A] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#FF3F68]/20 to-transparent blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold mb-3 border border-white/10">
            <Sparkles size={14} className="animate-spin" />
            <span>NTA &amp; BITSAT CBT Simulator 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Computer-Based Test (CBT) Series
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            Practice real exam-pattern mock tests with live countdown timers, section switching, review flags, and detailed post-test score analysis.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex bg-white p-1 rounded-2xl border border-[#E7E3F5] text-xs font-bold shadow-xs">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 rounded-xl transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-[#3F328A] text-white shadow-xs'
                : 'text-[#6E6990] hover:text-[#17152A]'
            }`}
          >
            All Tests ({MOCK_TEST_PAPERS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('FULL_MOCK')}
            className={`px-4 py-2 rounded-xl transition-all ${
              selectedCategory === 'FULL_MOCK'
                ? 'bg-[#3F328A] text-white shadow-xs'
                : 'text-[#6E6990] hover:text-[#17152A]'
            }`}
          >
            Full-Length Mocks
          </button>
          <button
            onClick={() => setSelectedCategory('CHAPTER_TEST')}
            className={`px-4 py-2 rounded-xl transition-all ${
              selectedCategory === 'CHAPTER_TEST'
                ? 'bg-[#3F328A] text-white shadow-xs'
                : 'text-[#6E6990] hover:text-[#17152A]'
            }`}
          >
            Chapter Practice Tests
          </button>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6990]" />
          <input
            type="text"
            placeholder="Search test name or exam..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-[#E7E3F5] rounded-xl text-xs font-medium text-[#17152A] placeholder-[#6E6990] focus:outline-none focus:border-[#3F328A]"
          />
        </div>
      </div>

      {/* Test Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl border border-[#E7E3F5] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#F0EDFD] text-[#3F328A] border border-[#E2DCFB]">
                  {test.examTag || 'BITSAT'}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <Flame size={12} /> {test.totalMarks} Marks
                </span>
              </div>

              <h3 className="font-extrabold text-base text-[#17152A] group-hover:text-[#3F328A] transition-colors line-clamp-2 mb-2">
                {test.title}
              </h3>
              <p className="text-xs text-[#6E6990] line-clamp-2 mb-4 leading-relaxed">
                Simulate official exam conditions with exact pattern, negative marking, and real-time timer.
              </p>

              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F6F4FF] border border-[#F1EFFB] text-xs mb-4">
                <div className="flex items-center gap-1.5 text-[#17152A] font-semibold">
                  <Clock size={14} className="text-[#3F328A]" />
                  <span>{test.durationMinutes} Mins</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#17152A] font-semibold">
                  <FileQuestion size={14} className="text-[#3F328A]" />
                  <span>{test.questions?.length || 130} Questions</span>
                </div>
              </div>
            </div>

            <Link
              href={`/student/tests/${test.id}`}
              className="w-full py-3 rounded-xl bg-[#3F328A] hover:bg-[#2A2356] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md"
            >
              <Play size={14} className="fill-current" />
              <span>Start CBT Test Simulator</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

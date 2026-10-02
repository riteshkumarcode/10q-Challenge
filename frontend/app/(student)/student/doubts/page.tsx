'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  Search,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { Doubt } from '@/types';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { MathRenderer } from '@/components/ui/MathRenderer';

export default function StudentDoubtsPage() {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'RESOLVED' | 'PENDING'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getDoubts(user?.id);
        setDoubts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const filtered = doubts.filter((d) => {
    if (filter === 'RESOLVED') return d.status === 'RESOLVED';
    if (filter === 'PENDING') return d.status === 'PENDING';
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
            My Doubts & Faculty Solutions
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
            Track step-by-step solutions to your video lectures and test question queries.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white p-1 rounded-xl border border-[#E7E3F5] text-xs font-bold">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              filter === 'ALL' ? 'bg-[#3F328A] text-white' : 'text-[#6E6990]'
            }`}
          >
            All ({doubts.length})
          </button>
          <button
            onClick={() => setFilter('RESOLVED')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              filter === 'RESOLVED' ? 'bg-[#20D66B] text-[#17152A]' : 'text-[#6E6990]'
            }`}
          >
            Solved ({doubts.filter((d) => d.status === 'RESOLVED').length})
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              filter === 'PENDING' ? 'bg-[#FF3F68] text-white' : 'text-[#6E6990]'
            }`}
          >
            In Review ({doubts.filter((d) => d.status === 'PENDING').length})
          </button>
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((doubt) => (
            <div
              key={doubt.id}
              className="bg-white rounded-3xl p-6 border border-[#E7E3F5] shadow-xs space-y-4"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F1EFFB]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#F0EDFD] text-[#3F328A]">
                    {doubt.courseTitle}
                  </span>
                  {doubt.timestampMinutes && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#FAFAFD] text-[#6E6990] border border-[#E7E3F5] flex items-center gap-1">
                      <Clock size={11} /> @ {doubt.timestampMinutes}
                    </span>
                  )}
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    doubt.status === 'RESOLVED'
                      ? 'bg-[#E8FAF0] text-[#16A34A]'
                      : 'bg-[#FFFBEB] text-[#B45309]'
                  }`}
                >
                  {doubt.status === 'RESOLVED' ? '✓ Resolved' : '⏳ In Review by Faculty'}
                </span>
              </div>

              {/* Student Query */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#6E6990] uppercase tracking-wider">
                  Your Query:
                </span>
                <p className="text-sm font-semibold text-[#17152A] leading-relaxed">
                  <MathRenderer content={doubt.queryText} />
                </p>
              </div>

              {/* Faculty Solution Response */}
              {doubt.solutionText ? (
                <div className="p-4 rounded-2xl bg-[#F6F4FF] border border-[#E7E3F5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#3F328A]">
                      <Sparkles size={14} className="text-[#FF3F68]" />
                      <span>Solution from {doubt.facultyName || 'Master Faculty'}:</span>
                    </div>
                    {doubt.solvedAt && (
                      <span className="text-[11px] text-[#6E6990]">
                        {new Date(doubt.solvedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-[#17152A] leading-relaxed">
                    <MathRenderer content={doubt.solutionText} />
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-[#FFFBEB] text-xs text-[#B45309] font-medium flex items-center gap-2">
                  <Clock size={14} />
                  <span>Master Faculty is reviewing this query. Estimated reply in &lt; 2 hours.</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#E7E3F5] p-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#F0EDFD] text-[#3F328A] flex items-center justify-center mx-auto">
              <HelpCircle size={28} />
            </div>
            <h3 className="font-bold text-base text-[#17152A]">No Doubts in this filter</h3>
            <p className="text-xs text-[#6E6990]">
              You can ask doubts directly from any video lecture in your classroom.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

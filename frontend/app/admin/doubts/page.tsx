'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, Clock, Send, Sparkles, X } from 'lucide-react';
import { Doubt } from '@/types';
import { api } from '@/lib/api';
import { MathRenderer } from '@/components/ui/MathRenderer';

export default function AdminDoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [solutionText, setSolutionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await api.getDoubts();
      setDoubts(data);
    }
    load();
  }, []);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoubt || !solutionText.trim()) return;

    setIsSubmitting(true);
    try {
      const updated = await api.resolveDoubt(
        selectedDoubt.id,
        solutionText.trim(),
        'Prof. Ritesh Sharma (BITS Pilani)'
      );

      setDoubts(doubts.map((d) => (d.id === updated.id ? updated : d)));
      setSelectedDoubt(null);
      setSolutionText('');
      alert('Doubt resolved and sent to student!');
    } catch (e) {
      console.error(e);
      alert('Failed to resolve doubt');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
          Faculty Doubt Resolution Hub
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
          Review student queries submitted during video lectures and CBT mock tests.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Doubts Queue on Left */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-bold text-sm text-[#17152A]">
            Active Student Queries ({doubts.length})
          </h3>

          <div className="space-y-3">
            {doubts.map((d) => (
              <div
                key={d.id}
                onClick={() => {
                  setSelectedDoubt(d);
                  setSolutionText(d.solutionText || '');
                }}
                className={`p-5 rounded-3xl border cursor-pointer transition-all space-y-2.5 ${
                  selectedDoubt?.id === d.id
                    ? 'border-[#3F328A] bg-[#F6F4FF] shadow-sm'
                    : 'border-[#E7E3F5] bg-white hover:border-[#3F328A]/30'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#3F328A]">{d.studentName}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      d.status === 'RESOLVED'
                        ? 'bg-[#E8FAF0] text-[#16A34A]'
                        : 'bg-[#FFE8ED] text-[#FF3F68]'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                <p className="text-xs font-medium text-[#17152A] line-clamp-2">
                  <MathRenderer content={d.queryText} />
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#6E6990] pt-1 border-t border-[#F1EFFB]">
                  <span>Course: {d.courseTitle}</span>
                  {d.timestampMinutes && <span>@ {d.timestampMinutes}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Editor on Right */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E7E3F5] shadow-sm space-y-4 sticky top-24 text-xs">
          {selectedDoubt ? (
            <form onSubmit={handleResolve} className="space-y-4">
              <div className="pb-3 border-b border-[#F1EFFB]">
                <span className="text-[10px] font-bold text-[#FF3F68] uppercase">
                  Resolving Student Query
                </span>
                <h4 className="font-bold text-sm text-[#17152A] mt-1">
                  {selectedDoubt.studentName}
                </h4>
                <div className="p-3 mt-2 bg-[#FAFAFD] rounded-xl border border-[#E7E3F5] text-xs text-[#17152A]">
                  <MathRenderer content={selectedDoubt.queryText} />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#17152A] mb-1">
                  Master Solution (Supports LaTeX: $v = u + at$)
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Type step-by-step resolution with formulas..."
                  value={solutionText}
                  onChange={(e) => setSolutionText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3F5] text-xs focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              {/* KaTeX Live Preview */}
              {solutionText && (
                <div className="p-3 rounded-xl bg-[#F6F4FF] border border-[#E7E3F5]">
                  <span className="font-bold text-[#3F328A] block mb-1">Live Math Preview:</span>
                  <MathRenderer content={solutionText} />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#20D66B] hover:bg-[#16A34A] text-[#17152A] font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send size={14} />
                <span>Submit & Resolve Doubt</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center text-[#6E6990] space-y-2">
              <HelpCircle size={32} className="mx-auto text-[#3F328A]" />
              <p>Select a doubt from the queue to draft and publish a faculty solution.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

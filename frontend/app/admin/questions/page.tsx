'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, HelpCircle, FileQuestion, Sparkles, X, Check } from 'lucide-react';
import { Question } from '@/types';
import { api } from '@/lib/api';
import { MathRenderer } from '@/components/ui/MathRenderer';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('ALL');

  const [newQ, setNewQ] = useState({
    subject: 'Physics',
    chapter: 'Kinematics',
    type: 'MCQ',
    questionText: '',
    optA: '',
    optB: '',
    optC: '',
    optD: '',
    correctOption: 'A',
    explanation: '',
  });

  useEffect(() => {
    async function load() {
      const data = await api.getQuestions();
      setQuestions(data);
    }
    load();
  }, []);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Question = {
      id: Date.now(),
      subject: newQ.subject,
      chapter: newQ.chapter,
      type: newQ.type as any,
      questionText: newQ.questionText,
      options: [
        { key: 'A', text: newQ.optA },
        { key: 'B', text: newQ.optB },
        { key: 'C', text: newQ.optC },
        { key: 'D', text: newQ.optD },
      ],
      correctOption: newQ.correctOption,
      marksPositive: 3,
      marksNegative: 1,
      explanation: newQ.explanation,
    };

    setQuestions([created, ...questions]);
    setIsAddModalOpen(false);
    alert('Question added to 10Q Question Bank!');
  };

  const filtered = questions.filter(
    (q) => subjectFilter === 'ALL' || q.subject === subjectFilter
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
            Question Bank & CBT Papers
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
            Manage practice questions with LaTeX math formula support ($...$ and $$...$$).
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={16} />
          <span>Add Question</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'Mathematics', 'Physics', 'Chemistry', 'English Proficiency', 'Logical Reasoning'].map(
          (sub) => (
            <button
              key={sub}
              onClick={() => setSubjectFilter(sub)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                subjectFilter === sub
                  ? 'bg-[#3F328A] text-white'
                  : 'bg-white text-[#6E6990] border border-[#E7E3F5]'
              }`}
            >
              {sub}
            </button>
          )
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filtered.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-3xl p-6 border border-[#E7E3F5] shadow-xs space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#F1EFFB]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md font-bold bg-[#F0EDFD] text-[#3F328A]">
                  {q.subject}
                </span>
                <span className="text-[#6E6990] font-semibold">{q.chapter}</span>
              </div>
              <span className="font-bold text-[#20D66B]">Correct: Option {q.correctOption}</span>
            </div>

            <div className="text-sm font-medium text-[#17152A]">
              <MathRenderer content={q.questionText} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {q.options.map((opt) => (
                <div
                  key={opt.key}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    opt.key === q.correctOption
                      ? 'bg-[#E8FAF0] border-[#20D66B] font-bold text-[#16A34A]'
                      : 'bg-white border-[#E7E3F5]'
                  }`}
                >
                  <span className="font-bold">{opt.key}.</span>
                  <MathRenderer content={opt.text} />
                </div>
              ))}
            </div>

            {q.explanation && (
              <div className="pt-2 border-t border-[#F1EFFB] text-[#6E6990]">
                <strong>Explanation:</strong> <MathRenderer content={q.explanation} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E3F5] space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E3F5]">
              <h3 className="text-lg font-bold text-[#17152A]">Create Bank Question</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X size={18} className="text-[#6E6990]" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Subject</label>
                  <select
                    value={newQ.subject}
                    onChange={(e) => setNewQ({ ...newQ, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] bg-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English Proficiency">English Proficiency</option>
                    <option value="Logical Reasoning">Logical Reasoning</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Chapter Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thermodynamics"
                    value={newQ.chapter}
                    onChange={(e) => setNewQ({ ...newQ, chapter: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">
                  Question Text (Supports LaTeX: $x^2 + y^2 = r^2$)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter problem statement with LaTeX math notations..."
                  value={newQ.questionText}
                  onChange={(e) => setNewQ({ ...newQ, questionText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                />
              </div>

              {/* Live KaTeX Preview */}
              {newQ.questionText && (
                <div className="p-3 bg-[#F6F4FF] rounded-xl border border-[#E7E3F5]">
                  <span className="font-bold text-[#3F328A] block mb-1">Live LaTeX Preview:</span>
                  <MathRenderer content={newQ.questionText} />
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Option A</label>
                  <input
                    type="text"
                    required
                    value={newQ.optA}
                    onChange={(e) => setNewQ({ ...newQ, optA: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Option B</label>
                  <input
                    type="text"
                    required
                    value={newQ.optB}
                    onChange={(e) => setNewQ({ ...newQ, optB: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Option C</label>
                  <input
                    type="text"
                    required
                    value={newQ.optC}
                    onChange={(e) => setNewQ({ ...newQ, optC: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Option D</label>
                  <input
                    type="text"
                    required
                    value={newQ.optD}
                    onChange={(e) => setNewQ({ ...newQ, optD: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Correct Answer</label>
                <select
                  value={newQ.correctOption}
                  onChange={(e) => setNewQ({ ...newQ, correctOption: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] bg-white font-bold text-[#16A34A]"
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Step-by-Step Solution</label>
                <textarea
                  rows={2}
                  placeholder="Explain shortcut or derivation..."
                  value={newQ.explanation}
                  onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#3F328A] text-white font-bold text-xs shadow-md"
              >
                Save to Question Bank
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

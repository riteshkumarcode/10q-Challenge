'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Trophy,
  RotateCcw,
  BookOpen,
  Send,
  HelpCircle,
} from 'lucide-react';
import { MOCK_TEST_PAPERS, MOCK_QUESTIONS } from '@/lib/data';
import { MathRenderer } from '@/components/ui/MathRenderer';
import { Question, TestPaper } from '@/types';

interface TestRunnerPageProps {
  params: Promise<{ paperId: string }>;
}

export default function TestRunnerPage({ params }: TestRunnerPageProps) {
  const resolvedParams = use(params);
  const paperId = parseInt(resolvedParams.paperId, 10);

  const testPaper =
    MOCK_TEST_PAPERS.find((t) => t.id === paperId) || MOCK_TEST_PAPERS[0];
  const questions = testPaper.questions || MOCK_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([questions[0]?.id || 1]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(
    testPaper.durationMinutes * 60
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<any>(null);

  // Timer effect
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQuestion = questions[currentIndex] || questions[0];

  const handleSelectOption = (option: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const nextQ = questions[nextIdx];
      if (nextQ && !visitedQuestions.includes(nextQ.id)) {
        setVisitedQuestions((prev) => [...prev, nextQ.id]);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setCurrentIndex(idx);
    const targetQ = questions[idx];
    if (targetQ && !visitedQuestions.includes(targetQ.id)) {
      setVisitedQuestions((prev) => [...prev, targetQ.id]);
    }
  };

  const handleSubmitTest = () => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let attempted = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined && ans !== '') {
        attempted++;
        if (ans.toString().trim() === q.correctOption?.toString().trim()) {
          score += q.marksPositive;
          correct++;
        } else {
          score -= q.marksNegative;
          incorrect++;
        }
      }
    });

    const accuracy =
      attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    setScoreResult({
      totalScore: score,
      maxScore: testPaper.totalMarks,
      correctCount: correct,
      incorrectCount: incorrect,
      unattemptedCount: questions.length - attempted,
      accuracy,
      timeTaken: testPaper.durationMinutes * 60 - timeLeftSeconds,
    });
    setIsSubmitted(true);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getQuestionStatusClass = (q: Question) => {
    const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== '';
    const isReview = markedForReview.includes(q.id);
    const isVisited = visitedQuestions.includes(q.id);

    if (isReview && isAnswered) return 'bg-[#5B4DB3] text-white ring-2 ring-[#20D66B]';
    if (isReview) return 'bg-[#5B4DB3] text-white';
    if (isAnswered) return 'bg-[#20D66B] text-[#17152A] font-extrabold';
    if (isVisited) return 'bg-[#FF3F68] text-white';
    return 'bg-white border border-[#E7E3F5] text-[#6E6990]';
  };

  if (isSubmitted && scoreResult) {
    return (
      <div className="max-w-4xl mx-auto py-10 space-y-8 animate-fadeIn">
        {/* Scorecard Hero */}
        <div className="bg-gradient-to-r from-[#17152A] via-[#3F328A] to-[#2D246B] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#FFD800] text-[#17152A] flex items-center justify-center mx-auto shadow-lg">
            <Trophy size={36} />
          </div>

          <h1 className="text-3xl font-extrabold">CBT Performance Scorecard</h1>
          <p className="text-xs sm:text-sm text-white/80">{testPaper.title}</p>

          <div className="pt-4 flex items-center justify-center gap-6">
            <div>
              <span className="text-xs text-white/60 block">Total Score</span>
              <span className="text-4xl sm:text-5xl font-black text-[#FFD800]">
                {scoreResult.totalScore}
              </span>
              <span className="text-xs text-white/60"> / {scoreResult.maxScore}</span>
            </div>

            <div className="h-12 w-[1px] bg-white/20" />

            <div>
              <span className="text-xs text-white/60 block">Accuracy</span>
              <span className="text-4xl sm:text-5xl font-black text-[#20D66B]">
                {scoreResult.accuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] text-center shadow-xs">
            <div className="text-2xl font-extrabold text-[#20D66B]">
              {scoreResult.correctCount}
            </div>
            <div className="text-xs text-[#6E6990]">Correct Answers (+3)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] text-center shadow-xs">
            <div className="text-2xl font-extrabold text-[#FF3F68]">
              {scoreResult.incorrectCount}
            </div>
            <div className="text-xs text-[#6E6990]">Incorrect Answers (-1)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] text-center shadow-xs">
            <div className="text-2xl font-extrabold text-[#6E6990]">
              {scoreResult.unattemptedCount}
            </div>
            <div className="text-xs text-[#6E6990]">Unattempted (0)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E7E3F5] text-center shadow-xs">
            <div className="text-2xl font-extrabold text-[#3F328A]">
              {Math.floor(scoreResult.timeTaken / 60)}m
            </div>
            <div className="text-xs text-[#6E6990]">Time Spent</div>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3F5] shadow-xs space-y-6">
          <h3 className="text-xl font-extrabold text-[#17152A]">
            Question-by-Question Detailed Solutions
          </h3>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const studentAns = userAnswers[q.id];
              const isCorrect = studentAns === q.correctOption;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-[#FAFAFD] border border-[#E7E3F5] space-y-3 text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E3F5]">
                    <span className="font-bold text-[#3F328A]">
                      Question {idx + 1} ({q.subject})
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-md font-bold text-xs ${
                        studentAns === undefined
                          ? 'bg-[#F1EFFB] text-[#6E6990]'
                          : isCorrect
                          ? 'bg-[#E8FAF0] text-[#16A34A]'
                          : 'bg-[#FFE8ED] text-[#FF3F68]'
                      }`}
                    >
                      {studentAns === undefined
                        ? 'Unattempted'
                        : isCorrect
                        ? '✓ Correct (+3)'
                        : '✗ Incorrect (-1)'}
                    </span>
                  </div>

                  {/* Question Content */}
                  <div className="font-medium text-[#17152A]">
                    <MathRenderer content={q.questionText} />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt) => (
                      <div
                        key={opt.key}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                          opt.key === q.correctOption
                            ? 'bg-[#E8FAF0] border-[#20D66B] font-bold text-[#16A34A]'
                            : opt.key === studentAns
                            ? 'bg-[#FFE8ED] border-[#FF3F68] text-[#FF3F68]'
                            : 'bg-white border-[#E7E3F5] text-[#17152A]'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-black/5 flex items-center justify-center font-bold">
                          {opt.key}
                        </span>
                        <MathRenderer content={opt.text} />
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="pt-2 border-t border-[#E7E3F5] text-xs text-[#6E6990]">
                      <strong className="text-[#3F328A]">Explanation:</strong>{' '}
                      <MathRenderer content={q.explanation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/student/dashboard"
            className="px-8 py-3.5 rounded-xl bg-[#3F328A] text-white font-bold text-xs shadow-md"
          >
            Back to Student Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 1. TOP EXAM HEADER */}
      <div className="bg-[#17152A] text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div>
          <h2 className="font-bold text-sm sm:text-base">{testPaper.title}</h2>
          <span className="text-[11px] text-white/70">
            Subject: <strong className="text-[#FFD800]">{currentQuestion.subject}</strong>
          </span>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF3F68] font-mono font-bold text-sm text-white shadow-inner">
          <Clock size={16} />
          <span>{formatTimer(timeLeftSeconds)}</span>
        </div>
      </div>

      {/* 2. CBT WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Active Question & Options Box */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3F5] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1EFFB]">
            <span className="font-extrabold text-sm text-[#3F328A]">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#20D66B] font-bold">+{currentQuestion.marksPositive}</span>
              <span className="text-[#FF3F68] font-bold">-{currentQuestion.marksNegative}</span>
            </div>
          </div>

          {/* Question Text with Math */}
          <div className="text-base text-[#17152A] font-medium leading-relaxed">
            <MathRenderer content={currentQuestion.questionText} />
          </div>

          {/* Options (MCQ) */}
          {currentQuestion.type === 'MCQ' && (
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = userAnswers[currentQuestion.id] === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#3F328A] bg-[#F0EDFD] shadow-xs'
                        : 'border-[#E7E3F5] hover:border-[#3F328A]/30 bg-white'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? 'bg-[#3F328A] text-white'
                          : 'bg-[#F6F4FF] text-[#6E6990]'
                      }`}
                    >
                      {opt.key}
                    </div>
                    <div className="text-sm font-medium text-[#17152A]">
                      <MathRenderer content={opt.text} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Numerical Input (for NUMERICAL type) */}
          {currentQuestion.type === 'NUMERICAL' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#17152A]">
                Enter Numerical Answer:
              </label>
              <input
                type="text"
                placeholder="e.g. 42.5"
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleSelectOption(e.target.value)}
                className="w-full sm:w-64 px-4 py-3 rounded-xl border border-[#E7E3F5] text-base font-mono font-bold focus:outline-none focus:border-[#3F328A]"
              />
            </div>
          )}

          {/* Action Buttons Footer */}
          <div className="pt-6 border-t border-[#F1EFFB] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleReview}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  markedForReview.includes(currentQuestion.id)
                    ? 'bg-[#5B4DB3] text-white'
                    : 'bg-[#F0EDFD] text-[#3F328A] hover:bg-[#E2DCFB]'
                }`}
              >
                {markedForReview.includes(currentQuestion.id)
                  ? 'Marked for Review'
                  : 'Mark for Review'}
              </button>

              <button
                onClick={handleClearAnswer}
                className="px-4 py-2.5 rounded-xl border border-[#E7E3F5] text-xs font-semibold text-[#6E6990] hover:text-[#FF3F68]"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-[#E7E3F5] text-xs font-bold text-[#17152A] disabled:opacity-30"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Save & Next</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Palette & Submit */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E7E3F5] shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#17152A]">Question Palette</h3>

            {/* Matrix Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6E6990] pb-2 border-b border-[#F1EFFB]">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#20D66B]" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#FF3F68]" />
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-[#5B4DB3]" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-white border border-[#E7E3F5]" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${getQuestionStatusClass(
                      q
                    )} ${isCurrent ? 'ring-2 ring-[#17152A] scale-105' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Submit Test Button */}
            <div className="pt-4 border-t border-[#F1EFFB]">
              <button
                onClick={handleSubmitTest}
                className="w-full py-3.5 rounded-xl bg-[#20D66B] hover:bg-[#16A34A] text-[#17152A] font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Send size={15} />
                <span>Submit Final Test Paper</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

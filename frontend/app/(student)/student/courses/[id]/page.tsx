'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Play,
  CheckCircle2,
  FileText,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Download,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Course, Chapter, Lesson } from '@/types';
import { api } from '@/lib/api';
import { VimeoPlayer } from '@/components/student/VimeoPlayer';
import { DoubtModal } from '@/components/student/DoubtModal';

interface ClassroomPageProps {
  params: Promise<{ id: string }>;
}

export default function ClassroomPage({ params }: ClassroomPageProps) {
  const resolvedParams = use(params);
  const courseId = parseInt(resolvedParams.id, 10);

  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1, 2]);

  useEffect(() => {
    async function loadCourse() {
      try {
        const found = await api.getCourseById(courseId);
        if (found) {
          setCourse(found);
          if (found.chapters && found.chapters.length > 0) {
            setExpandedChapterId(found.chapters[0].id);
            if (found.chapters[0].lessons.length > 0) {
              setActiveLesson(found.chapters[0].lessons[0]);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadCourse();
  }, [courseId]);

  if (!course) {
    return (
      <div className="py-20 text-center">
        <p className="text-xs text-[#6E6990]">Loading classroom...</p>
      </div>
    );
  }

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const toggleLessonComplete = (lessonId: number) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F328A] hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to My Courses</span>
        </Link>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F0EDFD] text-[#3F328A]">
          {course.examTag} Program
        </span>
      </div>

      {/* Main Grid: Video Player + Lecture Info on Left, Curriculum Playlist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Video Player & Lecture Meta */}
        <div className="lg:col-span-8 space-y-6">
          {/* Vimeo Video Component */}
          {activeLesson ? (
            <VimeoPlayer
              key={activeLesson.id}
              videoId={activeLesson.vimeoVideoId || '76979871'}
              title={activeLesson.title}
              onProgress={(_, seconds) => setCurrentVideoTime(seconds)}
            />
          ) : (
            <div className="aspect-video bg-[#17152A] rounded-2xl flex items-center justify-center text-white text-xs">
              Select a lecture from the curriculum sidebar to begin.
            </div>
          )}

          {/* Active Lecture Details & Actions */}
          {activeLesson && (
            <div className="bg-white rounded-3xl p-6 border border-[#E7E3F5] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-[#3F328A] uppercase tracking-wider">
                    Current Lecture
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#17152A]">
                    {activeLesson.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-[#6E6990] mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {activeLesson.durationMinutes} Minutes
                    </span>
                    <span className="flex items-center gap-1 text-[#20D66B] font-semibold">
                      <CheckCircle2 size={13} /> Full HD 1080p
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDoubtModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#FFE8ED] hover:bg-[#FFCCD6] text-[#FF3F68] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <HelpCircle size={15} />
                    <span>Ask Faculty Doubt</span>
                  </button>

                  <button
                    onClick={() => toggleLessonComplete(activeLesson.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      completedLessonIds.includes(activeLesson.id)
                        ? 'bg-[#E8FAF0] text-[#16A34A] border border-[#C5F3D8]'
                        : 'bg-[#F6F4FF] text-[#3F328A] hover:bg-[#E7E3F5]'
                    }`}
                  >
                    <CheckCircle2 size={15} />
                    <span>
                      {completedLessonIds.includes(activeLesson.id)
                        ? 'Completed'
                        : 'Mark Complete'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Lecture Notes & Downloads */}
              {activeLesson.pdfNotesUrl && (
                <div className="pt-4 border-t border-[#F1EFFB] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#17152A] font-semibold">
                    <FileText size={16} className="text-[#3F328A]" />
                    <span>Official Lecture Notes & Formula Sheet (PDF)</span>
                  </div>

                  <a
                    href={activeLesson.pdfNotesUrl}
                    target="_blank"
                    className="px-3.5 py-1.5 rounded-lg bg-[#F0EDFD] hover:bg-[#3F328A] text-[#3F328A] hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Course Curriculum Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E7E3F5] shadow-sm overflow-hidden sticky top-24">
          <div className="p-5 border-b border-[#F1EFFB]">
            <h3 className="font-extrabold text-base text-[#17152A]">Course Curriculum</h3>
            <p className="text-xs text-[#6E6990]">{course.chapters?.length || 0} Modules</p>
          </div>

          <div className="divide-y divide-[#F1EFFB] max-h-[600px] overflow-y-auto">
            {course.chapters?.map((chapter) => {
              const isExpanded = expandedChapterId === chapter.id;
              return (
                <div key={chapter.id}>
                  <button
                    onClick={() =>
                      setExpandedChapterId(isExpanded ? null : chapter.id)
                    }
                    className="w-full p-4 text-left hover:bg-[#F6F4FF] flex items-center justify-between font-bold text-xs sm:text-sm text-[#17152A]"
                  >
                    <span>{chapter.title}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#6E6990] transition-transform ${
                        isExpanded ? 'rotate-180 text-[#3F328A]' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="bg-[#FAFAFD] p-2 space-y-1">
                      {chapter.lessons.map((lesson) => {
                        const isCurrent = activeLesson?.id === lesson.id;
                        const isCompleted = completedLessonIds.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleLessonSelect(lesson)}
                            className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                              isCurrent
                                ? 'bg-[#3F328A] text-white shadow-sm'
                                : 'hover:bg-white text-[#17152A]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              {isCompleted ? (
                                <CheckCircle2
                                  size={15}
                                  className={isCurrent ? 'text-[#20D66B]' : 'text-[#20D66B]'}
                                />
                              ) : (
                                <Play
                                  size={13}
                                  className={isCurrent ? 'fill-white' : 'text-[#6E6990]'}
                                />
                              )}
                              <span className="font-medium truncate">{lesson.title}</span>
                            </div>

                            <span
                              className={`text-[10px] shrink-0 ml-2 ${
                                isCurrent ? 'text-white/80' : 'text-[#6E6990]'
                              }`}
                            >
                              {lesson.durationMinutes}m
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contextual Doubt Modal */}
      <DoubtModal
        isOpen={isDoubtModalOpen}
        onClose={() => setIsDoubtModalOpen(false)}
        courseId={course.id}
        courseTitle={course.title}
        lessonId={activeLesson?.id}
        lessonTitle={activeLesson?.title}
        videoTimestampSeconds={currentVideoTime}
      />
    </div>
  );
}

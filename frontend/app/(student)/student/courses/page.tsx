'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { Course } from '@/types';
import { api } from '@/lib/api';

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getCourses();
        setCourses(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">My Enrolled Courses</h1>
        <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
          Access your video crash courses, lecture notes, and test series anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-[#E7E3F5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full bg-[#F0EDFD]">
              <Image
                src={course.thumbnailUrl || '/site/assets/images/course-default.jpg'}
                alt={course.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-[#3F328A] text-white shadow-sm">
                {course.examTag}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
              <div>
                <h3 className="font-bold text-base text-[#17152A] line-clamp-2">{course.title}</h3>
                <p className="text-xs text-[#6E6990] line-clamp-2 mt-1">
                  {course.shortDescription}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#6E6990]">
                  <span>Progress</span>
                  <span className="font-bold text-[#17152A]">45%</span>
                </div>
                <div className="w-full bg-[#F1EFFB] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#20D66B] h-full w-[45%]" />
                </div>
              </div>

              <Link
                href={`/student/courses/${course.id}`}
                className="w-full py-3 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Classroom</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

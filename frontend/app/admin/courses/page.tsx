'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Check, BookOpen, Layers, X, Sparkles } from 'lucide-react';
import { Course } from '@/types';
import { api } from '@/lib/api';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    slug: '',
    examTag: 'BITSAT',
    category: 'CRASH_COURSE',
    discountPrice: 4999,
    originalPrice: 9999,
    shortDescription: '',
    description: '',
  });

  useEffect(() => {
    async function load() {
      const data = await api.getCourses();
      setCourses(data);
    }
    load();
  }, []);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Course = {
      id: Date.now(),
      title: newCourse.title,
      slug: newCourse.slug || newCourse.title.toLowerCase().replace(/\s+/g, '-'),
      examTag: newCourse.examTag,
      category: newCourse.category as any,
      discountPrice: Number(newCourse.discountPrice),
      originalPrice: Number(newCourse.originalPrice),
      shortDescription: newCourse.shortDescription,
      description: newCourse.description,
      thumbnailUrl: '/site/assets/images/course-default.jpg',
      rating: 4.9,
      reviewCount: 1,
      enrolledCount: 1,
      isBestseller: true,
      features: ['Live Demo Access', 'Formula PDF Notes', '24/7 Doubt Resolution'],
      chapters: [],
    };

    setCourses([created, ...courses]);
    setIsCreateModalOpen(false);
    alert('Course created successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
            Course & Curriculum CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
            Manage course pricing, descriptions, modules, and Vimeo video links.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={16} />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Course List Table */}
      <div className="bg-white rounded-3xl border border-[#E7E3F5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4FF] text-[#6E6990] font-bold">
              <tr>
                <th className="p-4">Course Name</th>
                <th className="p-4">Exam Tag</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Students</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFFB]">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAFAFD]">
                  <td className="p-4">
                    <div className="font-bold text-[#17152A] line-clamp-1">{c.title}</div>
                    <span className="text-[10px] text-[#6E6990]">Slug: /{c.slug}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-md font-bold bg-[#3F328A] text-white text-[10px]">
                      {c.examTag}
                    </span>
                  </td>
                  <td className="p-4 uppercase text-[#6E6990]">{c.category.replace('_', ' ')}</td>
                  <td className="p-4 font-bold text-[#17152A]">
                    ₹{c.discountPrice.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">{c.enrolledCount} enrolled</td>
                  <td className="p-4 font-bold text-[#FF3F68]">★ {c.rating}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/course-detail/${c.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-lg bg-[#F0EDFD] text-[#3F328A] font-bold text-[11px]"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Course Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E3F5] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E3F5]">
              <h3 className="text-lg font-bold text-[#17152A]">Create New Prep Course</h3>
              <button onClick={() => setIsCreateModalOpen(false)}>
                <X size={18} className="text-[#6E6990]" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BITSAT 2025 Super 30 Physics Mastery"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] text-xs focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Target Exam</label>
                  <select
                    value={newCourse.examTag}
                    onChange={(e) => setNewCourse({ ...newCourse, examTag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] text-xs bg-white"
                  >
                    <option value="BITSAT">BITSAT</option>
                    <option value="JEE_MAIN">JEE Main</option>
                    <option value="JEE_ADVANCED">JEE Advanced</option>
                    <option value="COMEDK">COMEDK</option>
                    <option value="MET">MET</option>
                    <option value="VITEEE">VITEEE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] text-xs bg-white"
                  >
                    <option value="CRASH_COURSE">Crash Course</option>
                    <option value="TEST_SERIES">Test Series</option>
                    <option value="MENTORSHIP">1-on-1 Mentorship</option>
                    <option value="FULL_COURSE">Full Course</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCourse.discountPrice}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, discountPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCourse.originalPrice}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, originalPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Short Summary</label>
                <textarea
                  rows={2}
                  value={newCourse.shortDescription}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, shortDescription: e.target.value })
                  }
                  placeholder="Quick highlight of this program..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#3F328A] text-white font-bold text-xs shadow-md"
              >
                Publish Course
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

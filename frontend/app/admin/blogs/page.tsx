'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Newspaper, Eye, Sparkles, X } from 'lucide-react';
import { Blog } from '@/types';
import { api } from '@/lib/api';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    category: 'BITSAT Strategy',
    summary: '',
    contentHtml: '',
    tags: 'BITSAT 2025, Strategy, Speed hacks',
  });

  useEffect(() => {
    async function load() {
      const data = await api.getBlogs();
      setBlogs(data);
    }
    load();
  }, []);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Blog = {
      id: Date.now(),
      title: newBlog.title,
      slug: newBlog.slug || newBlog.title.toLowerCase().replace(/\s+/g, '-'),
      category: newBlog.category,
      summary: newBlog.summary,
      contentHtml: `<p>${newBlog.contentHtml}</p>`,
      featuredImage: '/site/assets/images/banner1.jpg',
      authorName: '10Q Editorial Team',
      authorRole: 'BITS Pilani Mentor',
      readTimeMinutes: 6,
      publishedAt: new Date().toISOString(),
      isPublished: true,
      tags: newBlog.tags.split(',').map((t) => t.trim()),
    };

    setBlogs([created, ...blogs]);
    setIsModalOpen(false);
    alert('Blog article published successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
            Blog & Strategy Articles CMS
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
            Manage preparation guides, syllabus updates, and SEO articles.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={16} />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-3xl border border-[#E7E3F5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4FF] text-[#6E6990] font-bold">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Published Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFFB]">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-[#FAFAFD]">
                  <td className="p-4">
                    <div className="font-bold text-[#17152A] line-clamp-1">{b.title}</div>
                    <span className="text-[10px] text-[#6E6990]">Slug: /{b.slug}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-md font-bold bg-[#F0EDFD] text-[#3F328A] text-[10px]">
                      {b.category}
                    </span>
                  </td>
                  <td className="p-4 text-[#17152A] font-medium">{b.authorName}</td>
                  <td className="p-4 text-[#6E6990]">
                    {new Date(b.publishedAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FAF0] text-[#16A34A]">
                      ✓ Published
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/blog-detail/${b.slug}`}
                      target="_blank"
                      className="px-2.5 py-1 rounded-lg bg-[#F0EDFD] text-[#3F328A] font-bold text-[11px] inline-flex items-center gap-1"
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Write Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E3F5] space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E3F5]">
              <h3 className="text-lg font-bold text-[#17152A]">Publish Strategy Article</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={18} className="text-[#6E6990]" />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BITSAT 2025: Physics 100+ Marks Strategy in 30 Days"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] bg-white"
                  >
                    <option value="BITSAT Strategy">BITSAT Strategy</option>
                    <option value="Exam Updates">Exam Updates</option>
                    <option value="Subject Mastery">Subject Mastery</option>
                    <option value="Study Habits">Study Habits</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={newBlog.tags}
                    onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Meta Summary (SEO)</label>
                <textarea
                  rows={2}
                  required
                  value={newBlog.summary}
                  onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Content Body (HTML / Text)</label>
                <textarea
                  rows={6}
                  required
                  value={newBlog.contentHtml}
                  onChange={(e) => setNewBlog({ ...newBlog, contentHtml: e.target.value })}
                  placeholder="Write the article content..."
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#3F328A] text-white font-bold text-xs shadow-md"
              >
                Publish Live Article
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

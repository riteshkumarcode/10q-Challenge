'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from '@/src/compat/router';
import { Search, Calendar, ChevronRight, Home, ArrowRight, ChevronLeft } from 'lucide-react';
import { blogsData as initialBlogs } from '../data/blogs';
import { apiGetBlogs } from '../services/api';

export default function Blog() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedExam, setSelectedExam] = useState('All Exam');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    apiGetBlogs()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data);
        }
      })
      .catch((err) => {
        console.log('Using local blogs fallback:', err);
      });
  }, []);

  // Filter blogs based on exam category and search query
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesExam =
        selectedExam === 'All Exam' ||
        blog.category.toLowerCase().includes(selectedExam.toLowerCase()) ||
        (selectedExam === 'BITSAT' && blog.category === 'BITSAT') ||
        (selectedExam === 'JEE' && blog.category === 'JEE') ||
        (selectedExam === 'VITEEE' && blog.category === 'VITEEE') ||
        (selectedExam === 'Comedk' && blog.category === 'Comedk') ||
        (selectedExam === 'MET' && (blog.category === 'MET' || blog.category.includes('Manipal')));

      const matchesSearch =
        searchQuery === '' ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesExam && matchesSearch;
    });
  }, [blogs, selectedExam, searchQuery]);

  // Pagination math
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + pageSize);

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16">
      
      {/* Breadcrumb Header */}
      <section className="py-12 bg-slate-900 text-white text-center border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Blogs</h1>
          <nav className="flex items-center justify-center space-x-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-amber-400 flex items-center space-x-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-semibold">Blogs</span>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Search & Exam Filter Control Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Display Summary */}
            <div>
              <p className="text-sm font-semibold text-slate-600">
                Showing{' '}
                <span className="text-slate-900 font-bold">
                  {totalBlogs > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, totalBlogs)}
                </span>{' '}
                of <span className="text-amber-600 font-bold">{totalBlogs}</span> blogs
              </p>
            </div>

            {/* Filter Dropdown + Search Box */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              
              {/* Exam Dropdown */}
              <select
                value={selectedExam}
                onChange={handleExamChange}
                className="w-full sm:w-48 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-400"
              >
                <option value="All Exam">All Exam</option>
                <option value="BITSAT">BITSAT</option>
                <option value="JEE">JEE</option>
                <option value="VITEEE">VITEEE</option>
                <option value="Comedk">Comedk</option>
                <option value="MET">Manipal (MET)</option>
              </select>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-amber-400 placeholder:text-slate-400"
                />
              </div>

            </div>

          </div>

          {/* Blog Cards Grid */}
          {currentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Blog Image */}
                    <Link to={`/blog/${blog.slug}`} className="block relative h-52 overflow-hidden bg-slate-100">
                      <img
                        src={blog.image}
                        alt={blog.alttag || blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (blog.onlineImage) {
                            e.target.src = blog.onlineImage;
                          }
                        }}
                      />
                      <span className="absolute top-4 left-4 bg-emerald-500 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                        {blog.category}
                      </span>
                    </Link>

                    {/* Blog Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>{blog.date}</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {blog.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      By {blog.author}
                    </span>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-slate-800">No blogs found</h3>
              <p className="text-slate-500 text-sm">
                Try adjusting your search query or exam filter to find articles.
              </p>
              <button
                onClick={() => { setSelectedExam('All Exam'); setSearchQuery(''); }}
                className="px-5 py-2.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination Controls matching 10qchallenge.in */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-6">
              
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                .map((pageNum, idx, arr) => {
                  const prevPage = arr[idx - 1];
                  const showDots = prevPage && pageNum - prevPage > 1;

                  return (
                    <React.Fragment key={pageNum}>
                      {showDots && <span className="px-2 text-slate-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                          currentPage === pageNum
                            ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>
          )}

        </div>
      </section>

    </main>
  );
}

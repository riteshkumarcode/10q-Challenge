import React from 'react';
import { Link } from '@/src/compat/router';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogsData } from '../data/blogs';

export default function BlogSection({ limit = 3, showHeader = true }) {
  const displayedBlogs = blogsData.slice(0, limit);

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 border-b border-slate-200 pb-6">
            <div>
              <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block mb-2 border border-amber-200">
                Insights & Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Latest Blogs
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Dont Miss Stay Updated with the Latest Articles and Insights
              </p>
            </div>
            <Link
              to="/blog"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-bold text-sm bg-white hover:bg-slate-100 px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all group"
            >
              <span>View all Blogs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <Link to={`/blog/${blog.slug}`} className="block relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (blog.onlineImage) {
                        e.target.src = blog.onlineImage;
                      }
                    }}
                  />
                  
                  <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    {blog.category}
                  </span>
                </Link>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  By {blog.author}
                </span>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

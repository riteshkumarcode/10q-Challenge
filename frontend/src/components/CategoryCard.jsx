import React from 'react';
import { Link } from '@/src/compat/router';
import { categoriesData } from '../data/categories';

export default function CategorySection() {
  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block border border-amber-200">
            Our Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Top Courses & Categories
          </h2>
          <p className="text-slate-600 text-base">
            The right course, guided by an expert mentor, can provide invaluable insights, practical skills
          </p>
        </div>

        {/* 6 Category Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              to={`/exam/${cat.slug}`}
              className="group bg-white hover:bg-amber-50/40 border border-slate-200 hover:border-amber-400 p-6 rounded-2xl text-center transition-all transform hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center justify-between"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 group-hover:bg-amber-100/60 border border-slate-200 group-hover:border-amber-300 flex items-center justify-center mb-4 transition-all p-3">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

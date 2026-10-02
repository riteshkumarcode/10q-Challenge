import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';

export default function TestimonialSlider() {
  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-slate-200 overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block border border-amber-200">
            Student Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            What Students have to say about 10Q Challenge ❤️
          </h2>
          <p className="text-slate-600 text-base">
            Read what our satisfied Students have to say about their experiences with our platform.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200 group-hover:text-amber-300/40 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-base italic leading-relaxed">
                  "{item.text}"
                </p>
              </div>

              {/* Student info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-slate-200 mt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-amber-600 font-semibold">
                    {item.college}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

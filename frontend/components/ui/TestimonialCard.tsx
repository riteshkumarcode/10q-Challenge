'use client';

import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E7E3F5] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:border-[#3F328A]/30">
      <div className="absolute top-6 right-6 text-[#3F328A]/10 group-hover:text-[#3F328A]/20 transition-colors">
        <Quote size={40} />
      </div>

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} className="fill-[#FFD800] text-[#FFD800]" />
          ))}
        </div>

        {/* Content */}
        <p className="text-[#17152A] text-sm leading-relaxed mb-6 relative z-10 italic">
          "{testimonial.content}"
        </p>
      </div>

      {/* Student Details & Score */}
      <div className="pt-4 border-t border-[#F1EFFB] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3F328A] to-[#5B4DB3] flex items-center justify-center text-white font-bold text-sm shadow-inner">
            {testimonial.studentName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-sm text-[#17152A]">{testimonial.studentName}</h4>
              <CheckCircle2 size={13} className="text-[#20D66B]" />
            </div>
            <p className="text-xs text-[#6E6990]">{testimonial.college || testimonial.exam}</p>
          </div>
        </div>

        {testimonial.score && (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F0EDFD] text-[#3F328A] border border-[#DDD6FE]">
            {testimonial.score}
          </span>
        )}
      </div>
    </div>
  );
};

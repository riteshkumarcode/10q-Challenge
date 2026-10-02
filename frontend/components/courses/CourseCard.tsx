'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Clock, BookOpen, FileQuestion, UserCheck, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Course } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, featured = false }) => {
  const { addItem, isInCart, setIsCartOpen } = useCart();
  const inCart = isInCart(course.id);

  const discountPercent =
    course.originalPrice > course.discountPrice
      ? Math.round(((course.originalPrice - course.discountPrice) / course.originalPrice) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addItem({
        courseId: course.id,
        courseTitle: course.title,
        courseSlug: course.slug,
        thumbnailUrl: course.thumbnailUrl,
        price: course.discountPrice,
        originalPrice: course.originalPrice,
        examTag: course.examTag,
        category: course.category,
      });
    }
    setIsCartOpen(true);
  };

  const getBadgeColor = () => {
    if (course.isBestseller) return 'bg-amber-400 text-slate-950 font-black';
    if (course.category === 'MENTORSHIP') return 'bg-[#3d2c8d] text-white font-bold';
    return 'bg-[#f43f5e] text-white font-bold';
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative">
      {/* Top Banner Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={course.thumbnailUrl || '/site/assets/images/course-default.jpg'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Floating Tag Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase bg-slate-950/80 text-white backdrop-blur-sm border border-white/20 shadow-sm">
            {course.examTag}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] tracking-wide uppercase shadow-sm ${getBadgeColor()}`}
          >
            {course.isBestseller ? 'BEST SELLER' : course.category.replace('_', ' ')}
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-[#22c55e] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md">
            {discountPercent}% OFF
          </div>
        )}

        {/* Bottom ratings over image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-lg border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-extrabold">{course.rating.toFixed(1)}</span>
            <span className="text-white/70">({course.reviewCount})</span>
          </div>

          <span className="text-[11px] font-semibold text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10">
            {course.enrolledCount.toLocaleString('en-IN')}+ Enrolled
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <Link href={`/course-detail/${course.slug}`}>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-[#3d2c8d] transition-colors line-clamp-2 leading-snug">
              {course.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Key Feature Specs */}
          <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#3d2c8d]" />
              <span>Till Exam Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#f43f5e]" />
              <span>120+ Video Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileQuestion className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full CBT Mocks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>BITSian Mentors</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-950">
                ₹{course.discountPrice.toLocaleString('en-IN')}
              </span>
              {course.originalPrice > course.discountPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{course.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">18% GST Included</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className={`p-2.5 rounded-xl border transition-all ${
                inCart
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-600'
                  : 'border-slate-200 text-[#3d2c8d] hover:bg-purple-50 hover:border-[#3d2c8d]/40'
              }`}
            >
              {inCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>

            <Link
              href={`/course-detail/${course.slug}`}
              className="px-4 py-2.5 rounded-xl bg-[#3d2c8d] hover:bg-[#2b1f63] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-purple-900/20 hover:scale-105"
            >
              <span>Enroll</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

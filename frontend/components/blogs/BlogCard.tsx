'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Blog } from '@/types';

interface BlogCardProps {
  blog: Blog;
  horizontal?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, horizontal = false }) => {
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (horizontal) {
    return (
      <div className="group bg-white rounded-2xl border border-[#E7E3F5] overflow-hidden hover:border-[#3F328A]/30 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
        <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-[#F0EDFD]">
          <Image
            src={blog.featuredImage || '/site/assets/images/blog-default.jpg'}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#3F328A] text-white shadow-sm">
            {blog.category}
          </span>
        </div>

        <div className="p-6 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-xs text-[#6E6990] mb-2.5">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {blog.readTimeMinutes} min read
              </span>
            </div>

            <Link href={`/blog-detail/${blog.slug}`}>
              <h3 className="text-xl font-bold text-[#17152A] group-hover:text-[#3F328A] transition-colors mb-2.5 line-clamp-2">
                {blog.title}
              </h3>
            </Link>

            <p className="text-sm text-[#6E6990] line-clamp-3 mb-4 leading-relaxed">
              {blog.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#F1EFFB]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F0EDFD] flex items-center justify-center text-[#3F328A] font-bold text-xs">
                {blog.authorName.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-[#17152A]">{blog.authorName}</span>
            </div>

            <Link
              href={`/blog-detail/${blog.slug}`}
              className="text-xs font-bold text-[#3F328A] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>Read Guide</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-[#E7E3F5] overflow-hidden hover:border-[#3F328A]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0EDFD]">
        <Image
          src={blog.featuredImage || '/site/assets/images/blog-default.jpg'}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#3F328A] text-white shadow-sm">
          {blog.category}
        </span>

        <span className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/50 text-white backdrop-blur-sm flex items-center gap-1">
          <Clock size={11} />
          {blog.readTimeMinutes} min read
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6E6990] mb-2">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>

          <Link href={`/blog-detail/${blog.slug}`}>
            <h3 className="font-bold text-base text-[#17152A] group-hover:text-[#3F328A] transition-colors line-clamp-2 mb-2 leading-snug">
              {blog.title}
            </h3>
          </Link>

          <p className="text-xs text-[#6E6990] line-clamp-2 mb-4 leading-relaxed">
            {blog.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-[#F1EFFB] flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#F0EDFD] flex items-center justify-center text-[#3F328A] font-bold text-[10px]">
              {blog.authorName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-[#17152A]">{blog.authorName}</span>
          </div>

          <Link
            href={`/blog-detail/${blog.slug}`}
            className="text-xs font-bold text-[#3F328A] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            <span>Read</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

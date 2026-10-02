import React from 'react';
import HeroSlider from '../components/HeroSlider';
import FeatureSection from '../components/FeatureCard';
import CategorySection from '../components/CategoryCard';
import VideoShowcase from '../components/VideoShowcase';
import FeaturedCoursesSection from '../components/CourseCard';
import CounterStats from '../components/CounterStats';
import TestimonialSlider from '../components/TestimonialSlider';
import VideoTestimonial from '../components/VideoTestimonial';
import FaqAccordion from '../components/FaqAccordion';
import BlogSection from '../components/BlogCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero Section (Dark Navy) */}
      <HeroSlider />

      {/* 2. "Why Top Rankers Choose 10Q Challenge" Section (White) */}
      <FeatureSection />

      {/* 3. "Top Courses & Categories" Section (Light Gray) */}
      <CategorySection />

      {/* 4 & 5. Intro Video Section + "What is 10Q Challenge?" Section (White + Dark Card) */}
      <VideoShowcase />

      {/* 6. Featured Courses Section (Light Gray) */}
      <FeaturedCoursesSection limit={6} />

      {/* 7. Counter / Stats Section (Light Gray) */}
      <CounterStats />

      {/* 8. Testimonials Section (White) */}
      <TestimonialSlider />

      {/* 9. Video Testimonials Section (Light Gray) */}
      <VideoTestimonial />

      {/* 10. FAQ Section (White) */}
      <FaqAccordion />

      {/* 11. Latest Blogs Section (Light Gray) */}
      <BlogSection limit={3} showHeader={true} />
    </main>
  );
}

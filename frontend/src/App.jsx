'use client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from '@/src/compat/router';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Home from './views/Home';
import About from './views/About';
import Blog from './views/Blog';
import BlogDetail from './views/BlogDetail';
import Exam from './views/Exam';
import TestSeries from './views/TestSeries';
import Mentorship from './views/Mentorship';
import MentorshipDetail from './views/MentorshipDetail';
import CourseAll from './views/CourseAll';
import CourseDetail from './views/CourseDetail';
import Contact from './views/Contact';
import Login from './views/Login';
import Register from './views/Register';
import Cart from './views/Cart';
import AdminDashboard from './views/AdminDashboard';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  const handleAddToCart = (course) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.id === course.id)) {
        return prev;
      }
      return [...prev, course];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isAdminRoute =
    location.pathname === '/admin' ||
    location.pathname === '/student-index' ||
    location.pathname === '/exam-master' ||
    location.pathname === '/subject-master' ||
    location.pathname === '/course-master' ||
    location.pathname === '/chapter-master' ||
    location.pathname === '/chapter-topic-master' ||
    location.pathname === '/objective-question' ||
    location.pathname === '/numerical-question' ||
    location.pathname === '/video-master' ||
    location.pathname === '/document-master' ||
    location.pathname === '/coupon';

  return (
    <div className={`flex flex-col min-h-screen ${isAdminRoute ? 'bg-slate-50 text-slate-900' : 'bg-[#2b1f63] text-slate-100'} selection:bg-amber-400 selection:text-slate-950`}>
      {/* Conditionally render Global Navbar */}
      {!isAdminRoute && <Navbar cartCount={cartItems.length} />}

      {/* Dynamic Page Routes */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/exam/:examName" element={<Exam />} />
          <Route path="/testseries/:examName" element={<TestSeries />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/mentorship/:examName" element={<Mentorship />} />
          <Route
            path="/mentorship-detail/:slug"
            element={<MentorshipDetail onAddToCart={handleAddToCart} />}
          />
          <Route path="/course-all" element={<CourseAll />} />
          <Route
            path="/course/:slug"
            element={<CourseDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/course-detail/:slug"
            element={<CourseDetail onAddToCart={handleAddToCart} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} onRemoveItem={handleRemoveFromCart} />}
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student-index" element={<AdminDashboard />} />
          <Route path="/exam-master" element={<AdminDashboard initialTab="Exam Master" />} />
          <Route path="/subject-master" element={<AdminDashboard initialTab="Subject Master" />} />
          <Route path="/course-master" element={<AdminDashboard initialTab="Course Master" />} />
          <Route path="/chapter-master" element={<AdminDashboard initialTab="Chapter Master" />} />
          <Route path="/chapter-topic-master" element={<AdminDashboard initialTab="Chapter Topic Master" />} />
          <Route path="/objective-question" element={<AdminDashboard initialTab="Objective Question" />} />
          <Route path="/numerical-question" element={<AdminDashboard initialTab="Numerical Question" />} />
          <Route path="/video-master" element={<AdminDashboard initialTab="Video Master" />} />
          <Route path="/document-master" element={<AdminDashboard initialTab="Document Master" />} />
          <Route path="/coupon" element={<AdminDashboard initialTab="Coupon" />} />
        </Routes>
      </div>

      {/* Floating WhatsApp Chat Button */}
      {!isAdminRoute && <WhatsAppButton />}

      {/* Conditionally render Global Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout />
    </BrowserRouter>
  );
}

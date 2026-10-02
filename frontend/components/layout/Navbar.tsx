'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  User,
  GraduationCap,
  LogOut,
  Layers,
  ArrowRight,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { items, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const examLinks = [
    { label: 'BITSAT', path: '/exam/bitsat' },
    { label: 'COMEDK', path: '/exam/comedk' },
    { label: 'JEE', path: '/exam/jee-main' },
    { label: 'Manipal (MET)', path: '/exam/met' },
    { label: 'VITEEE', path: '/exam/viteee' },
  ];

  const testSeriesLinks = [
    { label: 'BITSAT Test Series', path: '/testseries/bitsat-test-series' },
    { label: 'COMEDK Test Series', path: '/testseries/comedk-test-series' },
    { label: 'JEE Mock Series', path: '/testseries/jee-test-series' },
    { label: 'MET Test Series', path: '/testseries/met-test-series' },
    { label: 'VITEEE Test Series', path: '/testseries/viteee-test-series' },
  ];

  const mentorshipLinks = [
    { label: 'BITSAT 1-on-1 Mentorship', path: '/mentorship/bitsat-mentorship' },
    { label: 'JEE Main & Adv Mentorship', path: '/mentorship/jee-mentorship' },
    { label: 'COMEDK Mentorship', path: '/mentorship/comedk-mentorship' },
    { label: 'Manipal & VIT Mentorship', path: '/mentorship/met-mentorship' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* Top Discount Banner */}
        <div className="bg-[#1b143c] border-b border-purple-900/40 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>
            BITSAT 2026 Champions Batch is now LIVE! Use coupon{' '}
            <strong className="text-amber-400 font-bold tracking-wide">BITSAT500</strong> for ₹500
            off.
          </span>
          <Link
            href="/course-detail/bitsat-master-crash-course"
            className="underline font-bold ml-1 text-white hover:text-amber-400 transition-colors"
          >
            Enroll Now &rarr;
          </Link>
        </div>

        {/* Main Navbar */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#160d33]/95 backdrop-blur-md shadow-2xl border-b border-purple-900/50 py-3'
              : 'bg-[#1b143c] border-b border-purple-900/40 py-3.5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <img
                src="/site/assets/logo_yellow.png"
                alt="10Q Challenge Logo"
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link
                href="/"
                className={`font-semibold text-sm px-3.5 py-2 rounded-xl transition-all ${
                  pathname === '/'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Home
              </Link>

              {/* Exam Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown('exam')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1.5 font-semibold text-sm text-slate-200 hover:text-white px-3.5 py-2 rounded-xl hover:bg-[#3d2c8d]/70 group-hover:bg-[#3d2c8d] group-hover:text-white transition-all cursor-pointer">
                  <span>Exam</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#f43f5e] transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {examLinks.map((e) => (
                    <Link
                      key={e.label}
                      href={e.path}
                      className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 hover:text-[#f43f5e] transition-all"
                    >
                      {e.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Test Series Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown('testseries')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1.5 font-semibold text-sm text-slate-200 hover:text-white px-3.5 py-2 rounded-xl hover:bg-[#3d2c8d]/70 group-hover:bg-[#3d2c8d] group-hover:text-white transition-all cursor-pointer">
                  <span>Test Series</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#f43f5e] transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {testSeriesLinks.map((t) => (
                    <Link
                      key={t.label}
                      href={t.path}
                      className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 hover:text-[#f43f5e] transition-all"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mentorship Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown('mentorship')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1.5 font-semibold text-sm text-slate-200 hover:text-white px-3.5 py-2 rounded-xl hover:bg-[#3d2c8d]/70 group-hover:bg-[#3d2c8d] group-hover:text-white transition-all cursor-pointer">
                  <span>Mentorship</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#f43f5e] transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {mentorshipLinks.map((m) => (
                    <Link
                      key={m.label}
                      href={m.path}
                      className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 hover:text-[#f43f5e] transition-all"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/course-all"
                className={`font-semibold text-sm px-3.5 py-2 rounded-xl transition-all ${
                  pathname === '/course-all'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Courses
              </Link>

              <Link
                href="/blog"
                className={`font-semibold text-sm px-3.5 py-2 rounded-xl transition-all ${
                  pathname === '/blog'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Blog
              </Link>

              <Link
                href="/about"
                className={`font-semibold text-sm px-3.5 py-2 rounded-xl transition-all ${
                  pathname === '/about'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`font-semibold text-sm px-3.5 py-2 rounded-xl transition-all ${
                  pathname === '/contact'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center space-x-3">
              {/* Shopping Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f43f5e] text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {items.length}
                  </span>
                )}
              </button>

              {/* Student Portal / Auth CTA */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/student/dashboard"
                    className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#3d2c8d] hover:bg-[#4d38b0] text-white font-bold text-xs border border-purple-500/40 shadow-md transition-all"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>LMS Dashboard</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#f43f5e] hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <span>Admin</span>
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#f43f5e] text-white transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f43f5e] to-rose-600 hover:from-rose-600 hover:to-[#f43f5e] text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 transition-all flex items-center space-x-1.5"
                >
                  <User className="w-4 h-4" />
                  <span>Student Login</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#160d33] border-b border-purple-900/60 px-4 py-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              href="/course-all"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              All Courses
            </Link>
            <Link
              href="/exam/bitsat"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              BITSAT Prep Hub
            </Link>
            <Link
              href="/testseries/bitsat-test-series"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              CBT Mock Test Series
            </Link>
            <Link
              href="/mentorship/bitsat-mentorship"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              1-on-1 Mentorship
            </Link>
            <Link
              href="/blog"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              Strategy Blog
            </Link>
            <Link
              href="/about"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block px-3.5 py-2.5 rounded-xl font-bold text-sm text-white hover:bg-white/10"
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-purple-900/40">
              <Link
                href="/login"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f43f5e] to-rose-600 text-white font-bold text-center block shadow-lg"
              >
                Sign In to Student Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Floating Expandable WhatsApp Chat Pill on Bottom Right */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold text-sm">
          Chat with Us
        </span>
      </a>
    </>
  );
}

export default Navbar;

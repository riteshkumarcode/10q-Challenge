'use client';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@/src/compat/router';
import { ShoppingCart, Menu, X, ChevronDown, User, UserPlus } from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const examOptions = [
    { label: 'BITSAT', path: '/exam/BITSAT' },
    { label: 'Comedk', path: '/exam/Comedk' },
    { label: 'JEE', path: '/exam/JEE' },
    { label: 'Manipal (MET)', path: '/exam/MET' },
    { label: 'VITEEE', path: '/exam/VITEEE' },
  ];

  const mentorshipOptions = [
    { label: 'BITSAT', path: '/mentorship/BITSAT' },
    { label: 'JEE', path: '/mentorship/JEE' },
    { label: 'VITEEE', path: '/mentorship/VITEEE' },
  ];

  const toggleMobileDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#21174d]/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-[#2b1f63] py-4 border-b border-purple-900/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/site/assets/logo_yellow.png"
              alt="10Q Challenge Logo"
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3">
            <Link
              to="/"
              className={`font-semibold text-sm px-3 py-1.5 rounded-xl transition-all ${
                location.pathname === '/'
                  ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                  : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
              }`}
            >
              Home
            </Link>

            {/* Courses Link */}
            <Link
              to="/course-all"
              className={`font-semibold text-sm px-3 py-1.5 rounded-xl transition-all ${
                location.pathname === '/course-all' || location.pathname === '/courses'
                  ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                  : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
              }`}
            >
              Courses
            </Link>

            {/* Exam Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1.5 font-semibold text-sm text-slate-200 hover:text-white px-3 py-1.5 rounded-xl hover:bg-[#3d2c8d]/70 group-hover:bg-[#3d2c8d] group-hover:text-white transition-all cursor-pointer">
                <span>Exam</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#f43f5e] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                {examOptions.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 hover:text-[#f43f5e] transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mentorship Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1.5 font-semibold text-sm text-slate-200 hover:text-white px-3 py-1.5 rounded-xl hover:bg-[#3d2c8d]/70 group-hover:bg-[#3d2c8d] group-hover:text-white transition-all cursor-pointer">
                <span>Mentorship</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#f43f5e] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                {mentorshipOptions.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-100 hover:text-[#f43f5e] transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/about"
              className={`font-semibold text-sm px-3 py-1.5 rounded-xl transition-all ${
                location.pathname === '/about'
                  ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                  : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
              }`}
            >
              About us
            </Link>

            <Link
              to="/blog"
              className={`font-semibold text-sm px-3 py-1.5 rounded-xl transition-all ${
                location.pathname?.startsWith('/blog')
                  ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                  : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
              }`}
            >
              Blogs
            </Link>

            <Link
              to="/contact"
              className={`font-semibold text-sm px-3 py-1.5 rounded-xl transition-all ${
                location.pathname === '/contact'
                  ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                  : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
              }`}
            >
              Contact us
            </Link>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-200 hover:text-[#f43f5e] transition-colors"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#2b1f63] shadow">
                {cartCount}
              </span>
            </Link>

            {/* Sign In Button */}
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white bg-[#36277b] hover:bg-[#423194] rounded-full border border-purple-800/40 transition-all flex items-center space-x-1.5"
            >
              <span>Sign In</span>
            </Link>

            {/* Register Button - Bright Pink/Red Pill */}
            <Link
              to="/register"
              className="px-5 py-2 text-xs font-bold text-white bg-[#f43f5e] hover:bg-[#e11d48] rounded-full shadow-lg transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link to="/cart" className="relative p-2 text-slate-300">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-amber-400 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Off-Canvas Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm bg-slate-900 h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 border-l border-slate-800 animate-in slide-in-from-right duration-300">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="/site/assets/logo_yellow.png"
                    alt="10Q Challenge Logo"
                    className="h-9 w-auto object-contain"
                  />
                  <span className="font-extrabold text-lg text-white">
                    10Q <span className="text-amber-400">CHALLENGE</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <div className="py-6 space-y-3">
                <Link
                  to="/"
                  className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
                >
                  Home
                </Link>

                <Link
                  to="/course-all"
                  className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
                >
                  Courses
                </Link>

                {/* Mobile Exam Accordion */}
                <div>
                  <button
                    onClick={() => toggleMobileDropdown('exam')}
                    className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
                  >
                    <span>Exam</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === 'exam' ? 'rotate-180 text-amber-400' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {activeDropdown === 'exam' && (
                    <div className="pl-4 space-y-2 py-2 border-l-2 border-slate-800">
                      {examOptions.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="block py-1.5 text-sm text-slate-400 hover:text-amber-400"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Mentorship Accordion */}
                <div>
                  <button
                    onClick={() => toggleMobileDropdown('mentorship')}
                    className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
                  >
                    <span>Mentorship</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === 'mentorship' ? 'rotate-180 text-amber-400' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {activeDropdown === 'mentorship' && (
                    <div className="pl-4 space-y-2 py-2 border-l-2 border-slate-800">
                      {mentorshipOptions.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="block py-1.5 text-sm text-slate-400 hover:text-amber-400"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
                >
                  About us
                </Link>

                <Link
                  to="/blog"
                  className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
                >
                  Blogs
                </Link>

                <Link
                  to="/contact"
                  className="block py-2 text-base font-semibold text-slate-200 hover:text-amber-400"
                >
                  Contact us
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <Link
                to="/login"
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl block border border-slate-700"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full py-2.5 text-center text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl block shadow-lg"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

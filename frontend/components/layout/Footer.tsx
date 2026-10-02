'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Users, Mail, Phone, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#11092a] text-slate-300 pt-16 pb-12 border-t border-purple-900/50 relative overflow-hidden">
      {/* Glow effect behind footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-purple-600/10 via-[#f43f5e]/10 to-amber-500/10 blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Trust Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-purple-900/40">
          <div className="flex items-center gap-4 bg-[#1b143c]/80 p-5 rounded-2xl border border-purple-900/40 hover:border-purple-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#3d2c8d] flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm sm:text-base">Top BITS Rankers</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Curriculum designed by BITS Pilani alumni
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1b143c]/80 p-5 rounded-2xl border border-purple-900/40 hover:border-purple-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#3d2c8d] flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm sm:text-base">
                Authentic Test Engine
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                100% realistic CBT simulation with bonus questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1b143c]/80 p-5 rounded-2xl border border-purple-900/40 hover:border-purple-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#3d2c8d] flex items-center justify-center text-[#f43f5e] shrink-0 shadow-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm sm:text-base">15,000+ Aspirants</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Trusted across India for high-speed preparation
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/site/assets/logo_yellow.png"
                alt="10Q Challenge Logo"
                className="w-[180px] h-auto object-contain hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's premier online learning & mentorship platform founded by BITSians & IITians to
              revolutionize competitive engineering exam preparation.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a
                  href="mailto:support@10qchallenge.in"
                  className="hover:text-amber-400 transition-colors"
                >
                  support@10qchallenge.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  className="hover:text-emerald-400 transition-colors"
                >
                  +91 99999 99999 (Student Support)
                </a>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Company */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-amber-400/40 pb-2 inline-block">
                Company
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-amber-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-400 transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-400 transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-amber-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Courses */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-amber-400/40 pb-2 inline-block">
                Courses
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link href="/exam/bitsat" className="hover:text-amber-400 transition-colors">
                    BITSAT Crash Course
                  </Link>
                </li>
                <li>
                  <Link href="/exam/comedk" className="hover:text-amber-400 transition-colors">
                    COMEDK Speed Batch
                  </Link>
                </li>
                <li>
                  <Link href="/exam/jee-main" className="hover:text-amber-400 transition-colors">
                    JEE Main & Advanced
                  </Link>
                </li>
                <li>
                  <Link href="/exam/met" className="hover:text-amber-400 transition-colors">
                    Manipal (MET) Batch
                  </Link>
                </li>
                <li>
                  <Link href="/exam/viteee" className="hover:text-amber-400 transition-colors">
                    VITEEE Rank Booster
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Test Series */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-amber-400/40 pb-2 inline-block">
                Test Series
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link
                    href="/testseries/bitsat-test-series"
                    className="hover:text-amber-400 transition-colors"
                  >
                    BITSAT 20 Full Mocks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testseries/comedk-test-series"
                    className="hover:text-amber-400 transition-colors"
                  >
                    COMEDK Full Mocks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testseries/met-test-series"
                    className="hover:text-amber-400 transition-colors"
                  >
                    MET Mock Test Series
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testseries/viteee-test-series"
                    className="hover:text-amber-400 transition-colors"
                  >
                    VITEEE Mock Pack
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Mentorship */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-amber-400/40 pb-2 inline-block">
                Mentorship
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link
                    href="/mentorship/bitsat-mentorship"
                    className="hover:text-amber-400 transition-colors"
                  >
                    BITSAT 1-on-1 Guidance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentorship/jee-mentorship"
                    className="hover:text-amber-400 transition-colors"
                  >
                    JEE Main Mentorship
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentorship/comedk-mentorship"
                    className="hover:text-amber-400 transition-colors"
                  >
                    COMEDK Mentorship
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentorship/met-mentorship"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Manipal & VIT Mentorship
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 10Q Challenge EduTech Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted for Rankers with</span>
            <Heart className="w-3.5 h-3.5 text-[#f43f5e] fill-current" />
            <span>by BITS Pilani & IIT Alumni</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

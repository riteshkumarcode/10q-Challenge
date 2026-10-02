'use client';
import React from 'react';
import { Link } from '@/src/compat/router';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Left Column: Title + Large Logo */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tight">
              10qchallenge
            </h2>
            <div className="pt-1">
              <Link to="/">
                <img
                  src="/site/assets/logo_yellow.png"
                  alt="10qchallenge"
                  className="w-[200px] h-auto object-contain hover:scale-105 transition-transform"
                />
              </Link>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
              India's premier online learning &amp; mentorship platform founded by BITSians &amp; IITians to revolutionize competitive engineering exam preparation.
            </p>
          </div>

          {/* Center & Right Menu Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Column: Company */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-sm tracking-wider uppercase border-b border-amber-400/40 pb-2 inline-block">
                Company
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link to="/about" className="hover:text-amber-400 transition-colors">
                    Terms and Condition
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-amber-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-amber-400 transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-amber-400 transition-colors">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: Courses */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-sm tracking-wider uppercase border-b border-amber-400/40 pb-2 inline-block">
                Courses
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link to="/exam/BITSAT" className="hover:text-amber-400 transition-colors">
                    BITSAT
                  </Link>
                </li>
                <li>
                  <Link to="/exam/Comedk" className="hover:text-amber-400 transition-colors">
                    Comedk
                  </Link>
                </li>
                <li>
                  <Link to="/exam/JEE" className="hover:text-amber-400 transition-colors">
                    JEE
                  </Link>
                </li>
                <li>
                  <Link to="/exam/MET" className="hover:text-amber-400 transition-colors">
                    Manipal (MET)
                  </Link>
                </li>
                <li>
                  <Link to="/exam/VITEEE" className="hover:text-amber-400 transition-colors">
                    VITEEE
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: Mentorship */}
            <div className="space-y-4">
              <h5 className="text-white font-bold text-sm tracking-wider uppercase border-b border-amber-400/40 pb-2 inline-block">
                Mentorship
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link to="/mentorship/BITSAT" className="hover:text-amber-400 transition-colors">
                    BITSAT
                  </Link>
                </li>
                <li>
                  <Link to="/mentorship/JEE" className="hover:text-amber-400 transition-colors">
                    JEE
                  </Link>
                </li>
                <li>
                  <Link to="/mentorship/VITEEE" className="hover:text-amber-400 transition-colors">
                    VITEEE
                  </Link>
                </li>
                <li>
                  <Link to="/mentorship" className="hover:text-amber-400 transition-colors">
                    All Mentorship Programs
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            <p>
              Copyright 2025 © <span className="text-amber-400 font-bold">10qchallenge</span>. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/about" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href="https://www.facebook.com/10qchallenge"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/10q_challenge_bitsatjee"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all"
            >
              <FaXTwitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.youtube.com/@10QChallengeBITSATJEE"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all"
            >
              <FaYoutube className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

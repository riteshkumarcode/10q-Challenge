'use client';
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from '@/src/compat/router';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { apiRegisterUser } from '../services/api';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const fromEnroll = location.state?.fromEnroll;
  const courseTitle = location.state?.courseTitle;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await apiRegisterUser({ fullName, email, phone, password });
      setIsLoading(false);
      if (res && res.user) {
        localStorage.setItem('10q_user', JSON.stringify(res.user));
      }
      navigate(fromEnroll ? '/cart' : '/admin');
    } catch (err) {
      setIsLoading(false);
      localStorage.setItem('10q_user', JSON.stringify({ fullName, email, phone }));
      navigate(fromEnroll ? '/cart' : '/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-0 px-0">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
        
        {/* Left Column: Illustration Banner */}
        <div className="hidden lg:flex lg:col-span-6 bg-slate-900 text-white p-12 flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-md text-center space-y-6 relative z-10">
            <div className="p-6 bg-slate-950/60 rounded-3xl border border-slate-800 shadow-2xl mb-8 flex items-center justify-center">
              <img
                src="/site/assets/img/auth/auth-1.svg"
                alt="10Q Learning Platform"
                className="w-80 h-auto object-contain"
                onError={(e) => {
                  e.target.src = "/site/assets/img/feature/feature-1.jpg";
                }}
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Start Your Dream Journey <br />
                <span className="text-amber-400">10Q Challenge</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Join 35,000+ aspirants preparing for BITSAT, JEE Main &amp; Advanced, VITEEE, and MET.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form Box */}
        <div className="lg:col-span-6 bg-slate-50 flex flex-col justify-center p-6 sm:p-12 lg:p-16 border-l border-slate-200">
          <div className="max-w-md w-full mx-auto space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
            
            {/* Header: Logo + Back to Home */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/site/assets/logo_yellow.png"
                  alt="10Q Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-extrabold text-slate-900 text-base tracking-tight">
                  10Q <span className="text-amber-600">CHALLENGE</span>
                </span>
              </Link>

              <Link
                to="/"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>

            {/* From Enroll Notice Banner */}
            {fromEnroll && (
              <div className="p-4 bg-amber-50 border border-amber-300 text-amber-950 text-xs font-semibold rounded-2xl flex items-start gap-2.5 shadow-sm">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">Register to Complete Enrollment</div>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    Register your new account to complete enrollment in <span className="font-bold text-slate-900">{courseTitle || "Course"}</span>. Already registered? Click <Link to="/login" state={location.state} className="font-extrabold text-amber-700 underline">Sign In</Link>!
                  </p>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-slate-500 text-xs mt-1">
                Fill in your details to start preparing with expert mentors.
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Advik Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-950 text-amber-400 font-extrabold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account &amp; Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Footer Login Prompt */}
            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
              Already have an account?{' '}
              <Link to="/login" state={location.state} className="font-extrabold text-amber-600 hover:text-amber-700 ml-1">
                Sign in
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E3F5] shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A] tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6990]">
          Enter your registered email to receive a password recovery link
        </p>
      </div>

      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E8FAF0] text-[#20D66B] flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#17152A]">Recovery Email Sent</h3>
          <p className="text-xs text-[#6E6990]">
            We sent instructions to <strong className="text-[#17152A]">{email}</strong>. Please check your inbox and spam folder.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F328A] hover:underline pt-2"
          >
            <ArrowLeft size={14} />
            <span>Return to Login</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#17152A] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6990]" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7E3F5] text-sm focus:outline-none focus:border-[#3F328A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <span>Sending link...</span>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#6E6990] hover:text-[#17152A] inline-flex items-center gap-1"
            >
              <ArrowLeft size={13} />
              <span>Back to Login</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

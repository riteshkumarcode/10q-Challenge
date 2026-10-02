import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFD] flex flex-col justify-between">
      {/* Top Header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3F328A] to-[#FF3F68] flex items-center justify-center text-white font-extrabold text-lg shadow-md">
            10Q
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-[#17152A] block leading-none">
              10Q Challenge
            </span>
            <span className="text-[10px] font-bold text-[#FF3F68] uppercase tracking-wider">
              Student & Faculty Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-bold text-[#3F328A] hover:underline"
        >
          ← Back to Website
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-[#6E6990] flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-[#20D66B]" />
        <span>Secure 256-Bit SSL Encrypted 10Q Challenge Auth System</span>
      </footer>
    </div>
  );
}

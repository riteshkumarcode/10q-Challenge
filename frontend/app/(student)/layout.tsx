'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Menu, X, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFD]">
        <p className="text-xs text-[#6E6990]">Loading classroom session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFD] flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <StudentSidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 flex">
          <div className="w-64 bg-white h-full relative">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#6E6990]"
            >
              <X size={20} />
            </button>
            <StudentSidebar />
          </div>
          <div className="flex-grow" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#E7E3F5] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#6E6990] hover:bg-[#F6F4FF]"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#20D66B] animate-pulse" />
              <span className="text-xs font-bold text-[#17152A] hidden sm:inline">
                BITSAT 2025 Target Batch • Active Session
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/student/tests/1"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFE8ED] text-[#FF3F68] font-bold text-xs hover:bg-[#FFCCD6] transition-colors"
            >
              <Sparkles size={13} />
              <span>Launch Mock Test</span>
            </Link>

            <div className="w-9 h-9 rounded-xl bg-[#F6F4FF] border border-[#E7E3F5] flex items-center justify-center text-[#3F328A] relative cursor-pointer">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF3F68]" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#3F328A] text-white flex items-center justify-center font-bold text-xs">
                {user?.fullName?.charAt(0) || 'S'}
              </div>
              <span className="text-xs font-bold text-[#17152A] hidden md:inline truncate max-w-[120px]">
                {user?.fullName || 'Student'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Children */}
        <main className="flex-grow p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

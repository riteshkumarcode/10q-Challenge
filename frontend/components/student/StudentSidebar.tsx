'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  FileQuestion,
  HelpCircle,
  Receipt,
  LogOut,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/student/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Enrolled Courses',
    href: '/student/courses',
    icon: GraduationCap,
  },
  {
    label: 'Test Series & CBT',
    href: '/student/tests/1', // Links to sample CBT or list
    icon: FileQuestion,
  },
  {
    label: 'My Doubts & Solutions',
    href: '/student/doubts',
    icon: HelpCircle,
  },
  {
    label: 'Invoices & Orders',
    href: '/student/invoices',
    icon: Receipt,
  },
];

export const StudentSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-[#E7E3F5] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#F1EFFB]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3F328A] to-[#FF3F68] flex items-center justify-center text-white font-extrabold text-base shadow-md">
              10Q
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-[#17152A] block leading-none">
                10Q Challenge
              </span>
              <span className="text-[10px] font-bold text-[#FF3F68] uppercase tracking-wider">
                Student LMS
              </span>
            </div>
          </Link>
        </div>

        {/* Student Profile Quick View */}
        {user && (
          <div className="p-4 mx-3 my-4 rounded-2xl bg-[#F6F4FF] border border-[#E7E3F5] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3F328A] text-white font-bold flex items-center justify-center text-sm">
              {user.fullName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-xs text-[#17152A] truncate">{user.fullName}</h4>
              <p className="text-[11px] text-[#6E6990] truncate">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#FFE8ED] text-[#FF3F68]">
                {user.targetExam || 'BITSAT 2025'} Aspirant
              </span>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="px-3 space-y-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive
                    ? 'bg-[#3F328A] text-white shadow-sm'
                    : 'text-[#6E6990] hover:text-[#17152A] hover:bg-[#F6F4FF]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#FFD800]' : 'text-[#6E6990]'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-[#F1EFFB] space-y-2">
        <Link
          href="/course-all"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#3F328A] bg-[#F0EDFD] hover:bg-[#E2DCFB] transition-colors"
        >
          <span className="flex items-center gap-2">
            <BookOpen size={15} />
            <span>Explore Courses</span>
          </span>
          <ExternalLink size={13} />
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#FF3F68] hover:bg-[#FFE8ED] transition-colors text-left"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

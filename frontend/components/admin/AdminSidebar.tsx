'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  FileQuestion,
  Newspaper,
  ShoppingBag,
  Globe,
  LogOut,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ADMIN_NAV_ITEMS = [
  {
    label: 'Dashboard Overview',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Course & Curriculum CMS',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    label: 'Question Bank & Tests',
    href: '/admin/questions',
    icon: FileQuestion,
  },
  {
    label: 'Doubt Moderation Queue',
    href: '/admin/doubts',
    icon: HelpCircle,
  },
  {
    label: 'Blog & Articles CMS',
    href: '/admin/blogs',
    icon: Newspaper,
  },
  {
    label: 'Orders & Transactions',
    href: '/admin/orders',
    icon: ShoppingBag,
  },
  {
    label: 'SEO & 301 Redirects',
    href: '/admin/seo',
    icon: Globe,
  },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-[#17152A] text-white flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF3F68] to-[#FFD800] flex items-center justify-center text-[#17152A] font-extrabold text-base shadow-md">
              10Q
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-none">
                10Q Master
              </span>
              <span className="text-[10px] font-bold text-[#FFD800] uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert size={10} /> Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Admin Profile */}
        {user && (
          <div className="p-3.5 mx-3 my-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FF3F68] text-white font-bold flex items-center justify-center text-xs">
              {user.fullName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-xs text-white truncate">{user.fullName}</h4>
              <p className="text-[10px] text-white/60 truncate">{user.email}</p>
              <span className="inline-block mt-0.5 px-2 py-0.2 rounded text-[9px] font-extrabold bg-[#20D66B]/20 text-[#20D66B] uppercase">
                {user.role}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive
                    ? 'bg-[#3F328A] text-white shadow-sm border border-[#5B4DB3]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-[#FFD800]' : 'text-white/50'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white/80 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink size={13} />
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#FF3F68] hover:bg-[#FF3F68]/10 transition-colors text-left"
        >
          <LogOut size={16} />
          <span>Admin Logout</span>
        </button>
      </div>
    </aside>
  );
};

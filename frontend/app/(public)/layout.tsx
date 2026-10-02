'use client';
import React, { useState } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import { usePathname } from 'next/navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  const isAdminRoute =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/student');

  return (
    <div className={`flex flex-col min-h-screen ${isAdminRoute ? 'bg-slate-50 text-slate-900' : 'bg-white text-slate-900'} selection:bg-amber-400 selection:text-slate-950`}>
      {!isAdminRoute && <Navbar cartCount={cartCount} />}
      <div className="flex-grow">
        {children}
      </div>
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

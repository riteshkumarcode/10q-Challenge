'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface VerifyMailProps {
  params: Promise<{ code: string }>;
}

export default function VerifyMailPage({ params }: VerifyMailProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#E7E3F5] shadow-xl text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#E8FAF0] text-[#20D66B] flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 size={36} />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
          Email Verified Successfully!
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6990]">
          Your email address has been verified. You can now access all crash courses, tests, and mentorship resources.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-[#F6F4FF] border border-[#E7E3F5] text-xs text-[#3F328A] font-semibold">
        Redirecting to login in <span className="font-extrabold text-base">{countdown}</span> seconds...
      </div>

      <Link
        href="/login"
        className="w-full py-3.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md"
      >
        <span>Go to Login Now</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

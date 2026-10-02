'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Download, ArrowRight, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const txnId = searchParams.get('txnId') || '10Q_TXN_84920';
  const orderId = searchParams.get('orderId') || 'ORD-9823';
  const amount = searchParams.get('amount') || '4,999';
  const studentName = searchParams.get('name') || 'Aspirant';

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3F328A', '#FF3F68', '#FFD800', '#20D66B'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-[#E8FAF0] text-[#20D66B] flex items-center justify-center mx-auto shadow-inner animate-bounce">
        <CheckCircle2 size={44} />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0EDFD] text-[#3F328A] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          <span>Payment Verified & Confirmed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17152A]">
          Welcome to the Batch, {studentName}!
        </h1>
        <p className="text-sm text-[#6E6990]">
          Your payment of <strong className="text-[#17152A]">₹{amount}</strong> was processed successfully. Your course has been automatically activated in your student dashboard.
        </p>
      </div>

      {/* Transaction Summary Receipt Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3F5] text-left shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-[#17152A] pb-3 border-b border-[#F1EFFB]">
          Transaction Summary
        </h3>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#6E6990] block">Order Reference:</span>
            <span className="font-mono font-bold text-[#17152A]">{orderId}</span>
          </div>

          <div>
            <span className="text-[#6E6990] block">PayU Transaction ID:</span>
            <span className="font-mono font-bold text-[#17152A] truncate block">{txnId}</span>
          </div>

          <div>
            <span className="text-[#6E6990] block">Payment Status:</span>
            <span className="font-bold text-[#20D66B] flex items-center gap-1">
              <ShieldCheck size={13} /> Success (Captured)
            </span>
          </div>

          <div>
            <span className="text-[#6E6990] block">Date & Time:</span>
            <span className="font-medium text-[#17152A]">
              {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
        </div>
      </div>

      {/* Direct Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/student/dashboard"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <BookOpen size={16} />
          <span>Go to Student LMS Dashboard</span>
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/student/invoices"
          className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-[#F6F4FF] text-[#17152A] border border-[#E7E3F5] font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          <Download size={16} />
          <span>Download GST Invoice</span>
        </Link>
      </div>
    </div>
  );
}

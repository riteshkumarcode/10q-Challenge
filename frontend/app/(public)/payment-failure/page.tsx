'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, RefreshCw, MessageSquare, ArrowLeft } from 'lucide-react';

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const errorMsg =
    searchParams.get('error') || 'Transaction was declined by your bank or timed out.';

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#FFE8ED] text-[#FF3F68] flex items-center justify-center mx-auto shadow-inner">
        <AlertCircle size={44} />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-[#17152A]">Payment Incomplete</h1>
        <p className="text-sm text-[#6E6990]">{errorMsg}</p>
        <p className="text-xs text-[#6E6990]">
          If money was debited from your bank account, it will be automatically refunded by PayU within 3-5 business days.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/checkout"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={15} />
          <span>Retry Payment</span>
        </Link>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#20D66B] hover:bg-[#16A34A] text-[#17152A] font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare size={16} />
          <span>WhatsApp Support</span>
        </a>
      </div>
    </div>
  );
}

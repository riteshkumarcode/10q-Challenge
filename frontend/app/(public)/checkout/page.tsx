'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  CreditCard,
  QrCode,
  ArrowRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, appliedCoupon, total, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: 'Karnataka',
  });

  const [paymentMethod, setPaymentMethod] = useState<'payu_upi' | 'payu_cards'>('payu_upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.mobileNumber || '',
      }));
    }
  }, [user]);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">No Items in Checkout</h2>
        <p className="text-xs text-[#6E6990]">Please add a course before checking out.</p>
        <Link
          href="/course-all"
          className="px-6 py-2.5 rounded-xl bg-[#3F328A] text-white text-xs font-bold inline-block"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      // 1. Generate unique Txn ID
      const txnId = `10Q_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      // 2. Prepare Order Payload
      const orderPayload = {
        studentId: user?.id || 1,
        studentName: formData.fullName,
        studentEmail: formData.email,
        studentPhone: formData.phone,
        items: items.map((i) => ({
          courseId: i.courseId,
          courseTitle: i.courseTitle,
          price: i.price,
        })),
        subtotalAmount: subtotal,
        discountAmount: discount,
        totalAmount: total,
        couponCode: appliedCoupon?.code,
        paymentGateway: 'PayU',
        gatewayTxnId: txnId,
      };

      // 3. Create order via API layer (persists locally / to backend)
      const order = await api.createOrder(orderPayload);

      // 4. Simulate instantaneous bank/PayU confirmation
      setTimeout(() => {
        clearCart();
        router.push(
          `/payment-success?txnId=${txnId}&orderId=${order.orderNumber}&amount=${total}&name=${encodeURIComponent(
            formData.fullName
          )}`
        );
      }, 1500);
    } catch (err: any) {
      console.error('Payment processing failed:', err);
      setErrorMessage('Payment transaction could not be initialized. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#17152A] tracking-tight">Checkout</h1>
        <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
          Complete your enrollment details to get instant access to the LMS classroom.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Billing Information Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handlePayment} id="checkout-form" className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E3F5] shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#17152A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3F328A] text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Student & Billing Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17152A] mb-1.5">
                    Student Full Name <span className="text-[#FF3F68]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Jain"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3F5] text-sm focus:outline-none focus:border-[#3F328A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17152A] mb-1.5">
                    Email Address (For Classroom Access) <span className="text-[#FF3F68]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3F5] text-sm focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17152A] mb-1.5">
                    Mobile Number <span className="text-[#FF3F68]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3F5] text-sm focus:outline-none focus:border-[#3F328A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17152A] mb-1.5">
                    State (For GST Tax Invoice)
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3F5] text-sm focus:outline-none focus:border-[#3F328A] bg-white"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi">Delhi / NCR</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Other">Other State / UT</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E3F5] shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#17152A] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3F328A] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Payment Gateway (PayU Secure Hub)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentMethod('payu_upi')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    paymentMethod === 'payu_upi'
                      ? 'border-[#3F328A] bg-[#F0EDFD]'
                      : 'border-[#E7E3F5] bg-white hover:border-[#3F328A]/30'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#20D66B]/20 text-[#16A34A] flex items-center justify-center">
                    <QrCode size={22} />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#17152A]">
                      UPI / QR Code
                    </div>
                    <p className="text-[11px] text-[#6E6990]">GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('payu_cards')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    paymentMethod === 'payu_cards'
                      ? 'border-[#3F328A] bg-[#F0EDFD]'
                      : 'border-[#E7E3F5] bg-white hover:border-[#3F328A]/30'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#3F328A]/10 text-[#3F328A] flex items-center justify-center">
                    <CreditCard size={22} />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#17152A]">
                      Debit / Credit Cards & NetBanking
                    </div>
                    <p className="text-[11px] text-[#6E6990]">All Indian Banks & EMI</p>
                  </div>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-[#FFE8ED] border border-[#FFCCD6] text-xs text-[#FF3F68] flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary on Right */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E3F5] shadow-lg space-y-6">
            <h3 className="font-bold text-lg text-[#17152A]">Review Order</h3>

            <div className="divide-y divide-[#F1EFFB] space-y-3">
              {items.map((item) => (
                <div key={item.courseId} className="pt-3 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-[#17152A] line-clamp-1">{item.courseTitle}</div>
                    <span className="text-[10px] text-[#6E6990]">{item.examTag}</span>
                  </div>
                  <span className="font-bold text-[#17152A] ml-2">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F1EFFB] space-y-2 text-xs">
              <div className="flex justify-between text-[#6E6990]">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#16A34A] font-semibold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6E6990]">
                <span>GST (18% Included)</span>
                <span className="text-[#20D66B]">₹0.00</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-[#F1EFFB] text-base font-extrabold text-[#17152A]">
                <span>Total Payable</span>
                <span className="text-2xl text-[#3F328A]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-[#FF3F68] hover:bg-[#E02E53] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Connecting to PayU...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Pay ₹{total.toLocaleString('en-IN')} & Enroll</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-[#6E6990] space-y-1">
              <p>By completing this payment, you agree to 10Q Challenge terms & conditions.</p>
              <div className="flex items-center justify-center gap-1 text-[#20D66B] font-semibold">
                <ShieldCheck size={13} />
                <span>Encrypted with 256-bit SHA-512 Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

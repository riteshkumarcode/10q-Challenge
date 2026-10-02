'use client';
import React, { useState } from 'react';
import { Link } from '@/src/compat/router';
import { ShoppingCart, ArrowRight, ShieldCheck, Trash2, CheckCircle2, CreditCard, Lock, X } from 'lucide-react';

// @ts-nocheck
export default function Cart({ cartItems = [], onRemoveItem = () => {} }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  const handlePayNow = () => {
    setPaymentSuccess(true);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-24 pb-16">
      
      {/* Header */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center justify-center space-x-3">
            <ShoppingCart className="w-8 h-8 text-amber-600" />
            <span>Your Shopping Cart</span>
          </h1>
          <p className="text-slate-600 text-sm mt-2 font-normal">
            Review your selected courses, test series, and mentorship packages below.
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200 text-center space-y-6 max-w-md mx-auto shadow-md">
              <div className="w-20 h-20 rounded-full bg-white border border-slate-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                <ShoppingCart className="w-10 h-10 text-amber-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900">Your cart is empty</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Looks like you haven't added any course, test series, or mentorship package yet.
                </p>
              </div>
              <Link
                to="/course-all"
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Browse All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Non-empty State */
            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-md">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-20 h-16 rounded-xl object-cover border border-slate-200 shadow-xs" />
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base">{item.title}</h4>
                        <span className="text-xs text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-block mt-1">
                          {item.tag || "Prep Course"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-6">
                      <span className="text-xl font-black text-slate-900">₹{item.price}</span>
                      <button
                        onClick={() => onRemoveItem && onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-2 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Summary */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Amount</div>
                  <div className="text-3xl font-black text-slate-900">
                    ₹{totalPrice}
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Checkout Payment Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 text-slate-900">
            
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {!paymentSuccess ? (
              <>
                <div>
                  <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    Secure Payment
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">Complete Your Purchase</h3>
                  <p className="text-xs text-slate-500 mt-1 font-normal">Select your preferred payment mode below</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'upi', label: 'UPI / Google Pay / PhonePe / Paytm', desc: 'Instant 0% fee transfer' },
                    { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                    { id: 'netbanking', label: 'Net Banking', desc: 'All Major Indian Banks' }
                  ].map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedMethod === method.id
                          ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm text-slate-900">{method.label}</div>
                        <div className="text-xs text-slate-500 font-normal">{method.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedMethod === method.id ? 'border-amber-500 bg-amber-400' : 'border-slate-400'}`}>
                        {selectedMethod === method.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700">Amount Payable:</span>
                  <span className="font-black text-slate-900 text-xl">₹{totalPrice}</span>
                </div>

                <button
                  onClick={handlePayNow}
                  className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-base rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  <span>Pay ₹{totalPrice} &amp; Unlock Course</span>
                </button>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Enrollment Successful! 🎉</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
                    Congratulations! Your course access is activated. All live classes, mock tests &amp; mentorship dashboard have been added to your profile.
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    to="/admin"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setPaymentSuccess(false);
                    }}
                    className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-md inline-block text-center cursor-pointer"
                  >
                    Go to Student Dashboard
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </main>
  );
}

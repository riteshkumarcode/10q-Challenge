'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { X, Trash2, Tag, ShoppingBag, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function SideCart() {
  const {
    items,
    removeItem,
    removeFromCart,
    clearCart,
    appliedCoupon,
    couponCode,
    discount,
    discountAmount,
    couponMessage,
    applyCoupon,
    removeCoupon,
    subtotal,
    total,
    totalAmount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyCoupon(inputCode.trim());
    }
  };

  const currentDiscount = discount || discountAmount || 0;
  const currentTotal = total !== undefined ? total : totalAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E7E3F5]">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E3F5] flex items-center justify-between bg-[#F6F4FF]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3F328A] flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#17152A]">Your Learning Cart</h3>
                <span className="text-xs text-[#6E6990] font-semibold">
                  {items.length} {items.length === 1 ? 'Course' : 'Courses'} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-[#6E6990] hover:text-[#17152A] hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#F6F4FF] text-[#3F328A] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div className="font-bold text-[#17152A] text-lg">Your cart is empty</div>
                <p className="text-xs text-[#6E6990] max-w-xs mx-auto">
                  Explore our comprehensive BITSAT and engineering preparation courses and start
                  preparing.
                </p>
                <Link
                  href="/course-all"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block px-5 py-2.5 bg-[#3F328A] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#2D246B]"
                >
                  Explore All Courses &rarr;
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const id = item.courseId;
                const title = item.courseTitle;
                const slug = item.courseSlug;
                const price = item.price;
                const origPrice = item.originalPrice;
                const examTag = item.examTag;
                const thumb = item.thumbnailUrl || '/site/assets/images/course-default.jpg';

                return (
                  <div
                    key={id}
                    className="flex gap-3 p-3.5 rounded-2xl border border-[#E7E3F5] bg-[#FAFAFD] hover:border-[#3F328A]/30 transition-all"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0 bg-[#E7E3F5]">
                      <img src={thumb} alt={title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFE8ED] text-[#FF3F68] uppercase inline-block mb-1">
                          {examTag}
                        </span>
                        <h4 className="font-bold text-xs text-[#17152A] leading-tight line-clamp-2">
                          {title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7E3F5]/60">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-black text-sm text-[#3F328A]">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                          {origPrice > price && (
                            <span className="text-[11px] text-[#6E6990] line-through">
                              ₹{origPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            if (removeItem) removeItem(id);
                            else if (removeFromCart) removeFromCart(id);
                          }}
                          className="p-1.5 text-[#6E6990] hover:text-[#FF3F68] rounded-lg hover:bg-white transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7E3F5] bg-[#FAFAFD] space-y-4">
              {/* Coupon Bar */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#E8FAF0] border border-[#20D66B]/30 text-xs">
                  <div className="flex items-center gap-1.5 text-[#20D66B] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Coupon {appliedCoupon.code} Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#6E6990] hover:text-[#FF3F68] font-bold text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (BITSAT500)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E7E3F5] uppercase font-bold focus:outline-none focus:border-[#3F328A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3F328A] text-white text-xs font-bold rounded-xl hover:bg-[#2D246B]"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Details */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6E6990]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#17152A]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {currentDiscount > 0 && (
                  <div className="flex justify-between text-[#20D66B] font-bold">
                    <span>Discount</span>
                    <span>- ₹{currentDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6E6990]">
                  <span>GST (18% Included)</span>
                  <span className="font-semibold text-[#20D66B]">₹0.00</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#17152A] pt-2 border-t border-[#E7E3F5]">
                  <span>Total Amount</span>
                  <span className="text-[#3F328A]">₹{currentTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 bg-[#FF3F68] text-white text-sm font-black rounded-xl shadow-lg shadow-[#FF3F68]/20 hover:bg-[#FF3F68]/90 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 bg-white border border-[#E7E3F5] text-[#3F328A] text-xs font-bold rounded-xl hover:bg-[#F6F4FF] flex items-center justify-center transition-colors"
                >
                  View Full Cart &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideCart;

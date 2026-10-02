'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Coupon } from '@/types';
import { api } from '@/lib/api';

export interface CartItem {
  courseId: number;
  courseTitle: string;
  courseSlug: string;
  thumbnailUrl?: string;
  price: number;
  originalPrice: number;
  examTag: string;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  addToCart: (item: CartItem) => void;
  removeItem: (courseId: number) => void;
  removeFromCart: (courseId: number) => void;
  clearCart: () => void;
  isInCart: (courseId: number) => boolean;
  isItemInCart: (courseId: number) => boolean;
  appliedCoupon: Coupon | null;
  coupon: Coupon | null;
  couponCode: string;
  discount: number;
  discountAmount: number;
  couponMessage: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  total: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '10q_cart_items_v2';
const COUPON_STORAGE_KEY = '10q_cart_coupon_v2';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (savedItems) setItems(JSON.parse(savedItems));
      const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setAppliedCoupon(parsed.coupon);
        setCouponCode(parsed.couponCode);
        setDiscount(parsed.discount);
      }
    } catch (e) {
      console.error('Error loading cart', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);

  const addItem = (item: CartItem) => {
    if (!items.some((i) => i.courseId === item.courseId)) {
      setItems((prev) => [...prev, item]);
    }
    setIsCartOpen(true);
  };

  const removeItem = (courseId: number) => {
    setItems((prev) => prev.filter((i) => i.courseId !== courseId));
  };

  const clearCart = () => {
    setItems([]);
    removeCoupon();
  };

  const isInCart = (courseId: number) => {
    return items.some((i) => i.courseId === courseId);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'BITSAT500') {
      const c: Coupon = {
        id: 1,
        code: 'BITSAT500',
        discountType: 'FLAT',
        discountValue: 500,
        minOrderAmount: 1999,
        isActive: true,
      };
      setAppliedCoupon(c);
      setCouponCode('BITSAT500');
      setDiscount(500);
      setCouponMessage('Coupon BITSAT500 applied! Saved ₹500.');
      return true;
    } else if (cleanCode === 'CRACK10Q') {
      const disc = Math.round((subtotal * 15) / 100);
      const c: Coupon = {
        id: 2,
        code: 'CRACK10Q',
        discountType: 'PERCENTAGE',
        discountValue: 15,
        minOrderAmount: 999,
        isActive: true,
      };
      setAppliedCoupon(c);
      setCouponCode('CRACK10Q');
      setDiscount(disc);
      setCouponMessage('Coupon CRACK10Q applied! Saved 15%.');
      return true;
    } else {
      setCouponMessage('Invalid coupon code.');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setDiscount(0);
    setCouponMessage('');
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addToCart: addItem,
        removeItem,
        removeFromCart: removeItem,
        clearCart,
        isInCart,
        isItemInCart: isInCart,
        appliedCoupon,
        coupon: appliedCoupon,
        couponCode,
        discount,
        discountAmount: discount,
        couponMessage,
        applyCoupon,
        removeCoupon,
        subtotal,
        total,
        totalAmount: total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

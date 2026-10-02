'use client';
import React, { useState } from 'react';
import Cart from '@/src/views/Cart';
import { coursesData } from '@/src/data/courses';

export default function CartPage() {
  const [items, setItems] = useState<any[]>(coursesData.slice(0, 1));

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item: any) => item.id !== id));
  };

  // @ts-ignore
  return <Cart cartItems={items} onRemoveItem={handleRemove} />;
}

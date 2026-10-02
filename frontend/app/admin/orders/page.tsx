'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, CheckCircle2, ShieldCheck, Download, Filter } from 'lucide-react';
import { Order } from '@/types';
import { api } from '@/lib/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await api.getOrders();
      setOrders(data);
    }
    load();
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.studentName.toLowerCase().includes(search.toLowerCase()) ||
      o.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      o.gatewayTxnId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
          Orders & Payment Gateway Transactions
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
          Audit PayU SHA-512 payment signatures, coupon discounts, and GST invoice records.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#E7E3F5] flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6990]" />
          <input
            type="text"
            placeholder="Search by order ID, student, or TxnId..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E7E3F5] text-xs focus:outline-none focus:border-[#3F328A]"
          />
        </div>

        <span className="text-xs font-semibold text-[#6E6990]">
          Total Transactions: <strong className="text-[#17152A]">{orders.length}</strong>
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E7E3F5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4FF] text-[#6E6990] font-bold">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Student</th>
                <th className="p-4">PayU Txn ID</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Coupon Applied</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFFB]">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAFAFD]">
                  <td className="p-4 font-mono font-bold text-[#3F328A]">{order.orderNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-[#17152A]">{order.studentName}</div>
                    <div className="text-[11px] text-[#6E6990]">{order.studentEmail}</div>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[#6E6990]">
                    {order.gatewayTxnId || 'N/A'}
                  </td>
                  <td className="p-4 font-bold text-[#17152A]">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    {order.couponCode ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8FAF0] text-[#16A34A]">
                        {order.couponCode}
                      </span>
                    ) : (
                      <span className="text-[#6E6990]">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FAF0] text-[#16A34A] flex items-center gap-1 w-fit">
                      <ShieldCheck size={11} /> {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-[#6E6990]">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

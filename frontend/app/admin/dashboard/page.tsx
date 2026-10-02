'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Users,
  BookOpen,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileQuestion,
  Newspaper,
} from 'lucide-react';
import { Order, Doubt, Course } from '@/types';
import { api } from '@/lib/api';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [o, d, c] = await Promise.all([
          api.getOrders(),
          api.getDoubts(),
          api.getCourses(),
        ]);
        setOrders(o);
        setDoubts(d);
        setCourses(c);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingDoubts = doubts.filter((d) => d.status === 'PENDING');

  return (
    <div className="space-y-8">
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-[#E7E3F5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-[#E8FAF0] text-[#16A34A] flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#17152A]">
            ₹{(totalRevenue + 450000).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-[#16A34A] font-bold flex items-center gap-1">
            <TrendingUp size={13} /> +18.4% this month
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E7E3F5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-bold uppercase tracking-wider">Active Students</span>
            <div className="w-8 h-8 rounded-xl bg-[#F0EDFD] text-[#3F328A] flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#17152A]">15,420</div>
          <span className="text-xs text-[#20D66B] font-bold">● 342 Online Now</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E7E3F5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Doubts</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFE8ED] text-[#FF3F68] flex items-center justify-center">
              <HelpCircle size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#FF3F68]">
            {pendingDoubts.length || 3}
          </div>
          <Link
            href="/admin/doubts"
            className="text-xs text-[#FF3F68] font-bold hover:underline block"
          >
            Moderate Queue →
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E7E3F5] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#6E6990]">
            <span className="text-xs font-bold uppercase tracking-wider">Active Courses</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#B45309] flex items-center justify-center">
              <BookOpen size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#17152A]">{courses.length}</div>
          <span className="text-xs text-[#6E6990]">Across 6 Major Exams</span>
        </div>
      </div>

      {/* 2. QUICK ACTIONS BAR */}
      <div className="p-6 rounded-3xl bg-white border border-[#E7E3F5] shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-[#17152A]">Quick Operations Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/courses"
            className="p-3.5 rounded-2xl bg-[#F6F4FF] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle size={15} />
            <span>Add Course</span>
          </Link>

          <Link
            href="/admin/questions"
            className="p-3.5 rounded-2xl bg-[#F6F4FF] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <FileQuestion size={15} />
            <span>Upload Questions</span>
          </Link>

          <Link
            href="/admin/blogs"
            className="p-3.5 rounded-2xl bg-[#F6F4FF] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Newspaper size={15} />
            <span>Publish Article</span>
          </Link>

          <Link
            href="/admin/doubts"
            className="p-3.5 rounded-2xl bg-[#FFE8ED] hover:bg-[#FF3F68] text-[#FF3F68] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle size={15} />
            <span>Solve Doubts</span>
          </Link>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS TABLE */}
      <div className="bg-white rounded-3xl border border-[#E7E3F5] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#F1EFFB] flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#17152A]">Recent PayU Orders</h3>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#3F328A] hover:underline"
          >
            View All Transactions
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4FF] text-[#6E6990] font-bold">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Student</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Gateway</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFFB]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAFAFD]">
                  <td className="p-4 font-mono font-bold text-[#3F328A]">{order.orderNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-[#17152A]">{order.studentName}</div>
                    <div className="text-[#6E6990]">{order.studentEmail}</div>
                  </td>
                  <td className="p-4 font-bold text-[#17152A]">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-[#6E6990]">{order.paymentGateway} (SHA-512)</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FAF0] text-[#16A34A]">
                      ✓ {order.paymentStatus}
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

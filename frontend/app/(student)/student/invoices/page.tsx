'use client';

import React, { useState, useEffect } from 'react';
import { Download, Receipt, CheckCircle2, FileText, Printer } from 'lucide-react';
import { Order } from '@/types';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function StudentInvoicesPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getOrders(user?.id);
        setOrders(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
          My Orders & GST Invoices
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
          Download and print tax invoices for your enrolled programs.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E3F5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#17152A]">
            <thead className="bg-[#F6F4FF] text-[#6E6990] font-bold border-b border-[#E7E3F5]">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Courses Enrolled</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFFB]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAFAFD] transition-colors">
                  <td className="p-4 font-mono font-bold text-[#3F328A]">{order.orderNumber}</td>
                  <td className="p-4 text-[#6E6990]">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-4 font-medium max-w-xs truncate">
                    {order.items.map((i) => i.courseTitle).join(', ')}
                  </td>
                  <td className="p-4 font-bold">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FAF0] text-[#16A34A] flex items-center gap-1 w-fit">
                      <CheckCircle2 size={11} /> Paid
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(order)}
                      className="px-3 py-1.5 rounded-lg bg-[#F0EDFD] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold transition-colors flex items-center gap-1 ml-auto"
                    >
                      <FileText size={13} />
                      <span>View Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Tax Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-[#E7E3F5] space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E3F5]">
              <div>
                <h3 className="text-xl font-black text-[#3F328A]">10Q CHALLENGE</h3>
                <p className="text-[11px] text-[#6E6990]">Tax Invoice / Payment Receipt</p>
              </div>

              <div className="text-right text-xs">
                <span className="font-bold text-[#17152A] block">
                  Invoice #{selectedInvoice.orderNumber}
                </span>
                <span className="text-[#6E6990]">
                  Date: {new Date(selectedInvoice.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>

            {/* Bill To Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-[#6E6990] block mb-1">Billed To:</span>
                <p className="font-bold text-[#17152A]">{selectedInvoice.studentName}</p>
                <p className="text-[#6E6990]">{selectedInvoice.studentEmail}</p>
                <p className="text-[#6E6990]">{selectedInvoice.studentPhone}</p>
              </div>

              <div className="text-right">
                <span className="font-bold text-[#6E6990] block mb-1">Merchant Details:</span>
                <p className="font-bold text-[#17152A]">10Q Challenge EduTech Pvt. Ltd.</p>
                <p className="text-[#6E6990]">GSTIN: 08AAAC10928Q1Z4</p>
                <p className="text-[#6E6990]">support@10qchallenge.in</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-[#E7E3F5] rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#F6F4FF] font-bold">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EFFB]">
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-medium">{item.courseTitle}</td>
                      <td className="p-3 text-right font-bold">
                        ₹{item.price.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Summary */}
            <div className="space-y-1.5 text-xs text-right pt-2">
              <div className="text-[#6E6990]">
                Subtotal: <strong>₹{selectedInvoice.subtotalAmount.toLocaleString('en-IN')}</strong>
              </div>
              {selectedInvoice.discountAmount > 0 && (
                <div className="text-[#16A34A] font-semibold">
                  Discount: -₹{selectedInvoice.discountAmount.toLocaleString('en-IN')}
                </div>
              )}
              <div className="text-[#6E6990]">GST (18% Included): ₹0.00</div>
              <div className="text-base font-extrabold text-[#3F328A] pt-2 border-t border-[#E7E3F5]">
                Total Paid: ₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#E7E3F5]">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2 rounded-xl border border-[#E7E3F5] text-xs font-bold text-[#6E6990]"
              >
                Close
              </button>

              <button
                onClick={handlePrint}
                className="px-6 py-2 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Printer size={14} />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

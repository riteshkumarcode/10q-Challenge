'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-24 pb-16">
      
      {/* Header */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-amber-700 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block mb-3 border border-amber-200">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact 10Q Challenge Team
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 font-normal">
            Have questions regarding batches, BITSAT test series, or mentorship programs? We are here to help you!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
                <h3 className="text-2xl font-extrabold text-slate-900">Contact Information</h3>
                
                <div className="space-y-5 text-sm text-slate-700">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-amber-100 text-amber-700 rounded-xl border border-amber-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Email Support</div>
                      <div className="font-semibold text-slate-900 mt-0.5">support@10qchallenge.in</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">WhatsApp / Helpline</div>
                      <div className="font-semibold text-slate-900 mt-0.5">+91 88397 37146</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-700 rounded-xl border border-blue-200">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Headquarters</div>
                      <div className="font-semibold text-slate-900 mt-0.5">10Q Challenge EdTech, India</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <a
                    href="https://wa.me/918839737146"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Quick Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 h-60 relative flex items-center justify-center p-6 text-center shadow-sm">
                <div className="space-y-2">
                  <MapPin className="w-8 h-8 text-amber-600 mx-auto" />
                  <p className="font-extrabold text-slate-900 text-sm">Interactive Map Location</p>
                  <p className="text-xs text-slate-500">Serving Aspirants Pan India</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Send Us a Message</h3>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm font-semibold">Thank you for reaching out! Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Your Message</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Tell us which exam you are preparing for..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

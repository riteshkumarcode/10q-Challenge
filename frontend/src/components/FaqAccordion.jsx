'use client';
import React, { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { faqsData } from '../data/faqs';

export default function FaqAccordion() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-slate-200 overflow-hidden">
      
      {/* Background shape overlays */}
      <img src="/site/assets/img/bg/bg-21.svg" alt="" className="hidden lg:block absolute top-10 left-5 w-72 opacity-30 pointer-events-none" />
      <img src="/site/assets/img/bg/bg-22.svg" alt="" className="hidden lg:block absolute bottom-10 right-5 w-72 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Feature-4 Image with floating Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
              <img
                src="/site/assets/img/feature/feature-4.jpg"
                alt="10Q FAQs"
                className="w-full h-80 sm:h-[450px] object-cover"
              />
              
              {/* Question Badge */}
              <div className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl animate-bounce">
                <HelpCircle className="w-9 h-9 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Header + Accordion */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block border border-amber-200">
                Your Questions are Answered
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-base">
                Explore detailed answers to the most common questions about our platform.
              </p>
            </div>

            {/* Accordion Items */}
            <div className="space-y-3">
              {faqsData.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-amber-50/50 border-amber-400 shadow-md'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 text-left flex items-start justify-between space-x-4 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className={`font-bold text-base sm:text-lg ${isOpen ? 'text-amber-700' : 'text-slate-900'}`}>
                        {faq.question}
                      </span>
                      <div className="p-1 rounded-lg bg-white border border-slate-200 shadow-sm flex-shrink-0">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Plus className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-amber-200/60">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { Globe, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export default function AdminSeoPage() {
  const [redirects, setRedirects] = useState([
    { from: '/sign-in', to: '/login', code: 301, active: true },
    { from: '/sign-up', to: '/register', code: 301, active: true },
    { from: '/course-list', to: '/course-all', code: 301, active: true },
    { from: '/student-index', to: '/student/dashboard', code: 301, active: true },
    { from: '/index.html', to: '/', code: 301, active: true },
    { from: '/default.aspx', to: '/', code: 301, active: true },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
          SEO & 301 Permanent Redirects CMS
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
          Preserve legacy search engine rankings and configure dynamic page metadata.
        </p>
      </div>

      {/* SEO Health Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#E7E3F5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E8FAF0] text-[#16A34A] flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#17152A]">Sitemap & Indexing Health</h3>
            <p className="text-xs text-[#6E6990]">
              Dynamic XML Sitemap active at <code className="text-[#3F328A]">/sitemap.xml</code>
            </p>
          </div>
        </div>

        <a
          href="/sitemap.xml"
          target="_blank"
          className="px-4 py-2 rounded-xl bg-[#F0EDFD] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold text-xs transition-colors"
        >
          View Live XML Sitemap ↗
        </a>
      </div>

      {/* 301 Redirect Rules Table */}
      <div className="bg-white rounded-3xl border border-[#E7E3F5] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-[#F1EFFB]">
          <h3 className="font-extrabold text-base text-[#17152A]">
            Active Legacy 301 Permanent Redirects
          </h3>
          <p className="text-xs text-[#6E6990]">
            These rules ensure existing Google/Bing backlinks and bookmarks never encounter a 404.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4FF] text-[#6E6990] font-bold">
              <tr>
                <th className="p-4">Legacy Source Route</th>
                <th className="p-4">HTTP Status</th>
                <th className="p-4">Destination Target Route</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFFB]">
              {redirects.map((r, idx) => (
                <tr key={idx} className="hover:bg-[#FAFAFD]">
                  <td className="p-4 font-mono font-bold text-[#FF3F68]">{r.from}</td>
                  <td className="p-4 font-bold text-[#3F328A]">{r.code} Permanent</td>
                  <td className="p-4 font-mono font-bold text-[#20D66B] flex items-center gap-1.5">
                    <ArrowRight size={13} />
                    <span>{r.to}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FAF0] text-[#16A34A]">
                      Active
                    </span>
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

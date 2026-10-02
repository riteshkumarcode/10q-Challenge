import React from 'react';
import { Link } from '@/src/compat/router';
import { BookOpen, Bookmark, BarChart2, ChevronRight, Home } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16">
      
      {/* Breadcrumb Header */}
      <section className="py-12 bg-slate-900 text-white text-center border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">About Us</h1>
          <nav className="flex items-center justify-center space-x-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-amber-400 flex items-center space-x-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-semibold">About Us</span>
          </nav>
        </div>
      </section>

      {/* Leadership & Co-founders Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* 2-Column Founder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Harshal Jain */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:border-amber-400 transition-all group p-6 text-center">
              <div className="rounded-2xl overflow-hidden mb-6 bg-slate-50">
                <img
                  src="/site/assets/about.png"
                  alt="Harshal Jain"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Harshal Jain
              </h3>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                (BITS Pilani Alumnus)<br />
                <span className="text-amber-600 font-bold">Chairperson & Cofounder, 10Q Challenge</span>
              </p>
            </div>

            {/* Card 2: Ojal Jain */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:border-amber-400 transition-all group p-6 text-center">
              <div className="rounded-2xl overflow-hidden mb-6 bg-slate-50">
                <img
                  src="/site/assets/about2.png"
                  alt="Ojal Jain"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Ojal Jain
              </h3>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                (Managing Director)<br />
                <span className="text-amber-600 font-bold">Cofounder, 10Q Challenge</span>
              </p>
            </div>

          </div>

          {/* Trusted Banner Block matching 10qchallenge.in */}
          <div className="relative rounded-3xl overflow-hidden bg-amber-500 text-slate-950 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <img
              src="/site/assets/img/shapes/instructor-bg-1.png"
              alt=""
              className="absolute -top-10 -left-10 w-48 opacity-30 pointer-events-none"
            />
            <img
              src="/site/assets/img/shapes/instructor-bg-2.png"
              alt=""
              className="absolute -bottom-10 -right-10 w-48 opacity-30 pointer-events-none"
            />

            <div className="relative z-10 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                Trusted by 20000+ happy students <br className="hidden sm:block" />
                and online users since 2020
              </h3>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link
                to="/course-all"
                className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all inline-block"
              >
                See Courses
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block border border-amber-200">
              Our Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Master the Skills to Drive your Career
            </h2>
            <p className="text-slate-600 text-base">
              The right course, guided by an expert mentor, can provide invaluable insights, practical skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
              <img src="/site/assets/img/shapes/bg-1.png" alt="" className="absolute top-0 right-0 w-24 opacity-30 pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-6 border border-amber-200 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Flexible Learning</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe that high-quality education should be accessible to everyone. Our pricing models are designed.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
              <img src="/site/assets/img/shapes/bg-2.png" alt="" className="absolute top-0 right-0 w-24 opacity-30 pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6 border border-blue-200 group-hover:scale-110 transition-transform">
                <Bookmark className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Lifetime Access</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                When you enroll in our courses, you’re not just signing up for a temporary learning experience you’re making.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
              <img src="/site/assets/img/shapes/bg-3.png" alt="" className="absolute top-0 right-0 w-24 opacity-30 pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Instruction</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our instructors are seasoned professionals with years of experience in their respective fields & Experts advice.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

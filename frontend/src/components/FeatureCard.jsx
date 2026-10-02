import React from 'react';
import { Video, Bookmark, FileText, BarChart3, Users } from 'lucide-react';
import { featuresData } from '../data/features';

export default function FeatureSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'video':
        return <Video className="w-6 h-6 text-amber-500" />;
      case 'bookmark':
        return <Bookmark className="w-6 h-6 text-blue-500" />;
      case 'note':
        return <FileText className="w-6 h-6 text-emerald-500" />;
      case 'chart':
        return <BarChart3 className="w-6 h-6 text-purple-500" />;
      case 'users':
        return <Users className="w-6 h-6 text-rose-500" />;
      default:
        return <Video className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section className="py-20 bg-white text-slate-900 relative border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 5 Feature Items */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-50 rounded-full inline-block border border-amber-200">
                Why Choose 10Q
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Why Top Rankers Choose 10Q Challenge to Ace BITSAT & JEE
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Smart prep. Expert mentorship. Proven results. We combine advanced tech with structured guidance to get you exam-ready — faster, sharper, better
              </p>
            </div>

            <div className="space-y-4">
              {featuresData.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                    {getIcon(feature.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Exact 10Q layered image composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none min-h-[480px] flex items-center justify-center">
              
              {/* Layered Decorative Shapes */}
              <img
                src="/site/assets/img/shapes/shape-5.png"
                alt=""
                className="absolute -top-6 -left-6 w-32 opacity-80 pointer-events-none"
              />
              <img
                src="/site/assets/img/shapes/shape-6.png"
                alt=""
                className="absolute top-10 -right-4 w-40 opacity-70 pointer-events-none"
              />
              <img
                src="/site/assets/img/shapes/shape-7.svg"
                alt=""
                className="absolute -bottom-6 -left-4 w-28 opacity-60 pointer-events-none"
              />

              {/* Main Feature Image 1 */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 w-4/5">
                <img
                  src="/site/assets/img/feature/feature-2.jpg"
                  alt="Students studying together"
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Overlaid Secondary Image 2 */}
              <div className="absolute top-1/3 right-0 z-20 w-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/site/assets/img/feature/feature-3.jpg"
                  alt="10Q Student Mentorship"
                  className="w-full h-52 object-cover"
                />
              </div>

              {/* Overlaid Floating 35K Badge */}
              <div className="absolute bottom-4 left-6 z-30 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover"
                    src="/site/assets/img/user/user-01.jpg"
                    alt="Student"
                  />
                  <img
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover"
                    src="/site/assets/img/user/user-03.jpg"
                    alt="Student"
                  />
                  <img
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover"
                    src="/site/assets/img/user/user-07.jpg"
                    alt="Student"
                  />
                  <img
                    className="w-9 h-9 rounded-full ring-2 ring-white object-cover"
                    src="/site/assets/img/user/user-08.jpg"
                    alt="Student"
                  />
                </div>
                <div>
                  <div className="text-amber-500 font-extrabold text-sm">35K+ Students</div>
                  <div className="text-slate-600 text-xs font-semibold">Enrolled in 10Q Challenge</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

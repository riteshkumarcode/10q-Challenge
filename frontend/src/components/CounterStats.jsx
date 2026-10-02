import React from 'react';

export default function CounterStats() {
  const stats = [
    {
      id: 1,
      number: "300,000+",
      label: "Followers Across Social Media",
      iconSrc: "/site/assets/img/icons/counter-icon1.svg",
      borderColor: "hover:border-cyan-400",
      textColor: "text-cyan-600"
    },
    {
      id: 2,
      number: "2,000+",
      label: "Students selected in Tier 1 Colleges like IIT/BITS/NIT",
      iconSrc: "/site/assets/img/icons/counter-icon2.svg",
      borderColor: "hover:border-amber-400",
      textColor: "text-amber-500"
    },
    {
      id: 3,
      number: "94%",
      label: "Students enrolled in our courses felt Improvement in their performance",
      iconSrc: "/site/assets/img/icons/counter-icon3.svg",
      borderColor: "hover:border-blue-400",
      textColor: "text-blue-600"
    },
    {
      id: 4,
      number: "100%",
      label: "Scholarship for Meritorious Students",
      iconSrc: "/site/assets/img/icons/counter-icon4.svg",
      borderColor: "hover:border-emerald-400",
      textColor: "text-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`bg-white p-8 rounded-3xl border border-slate-200 ${stat.borderColor} shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div className="p-3.5 bg-slate-50 rounded-2xl w-fit border border-slate-200 mb-6 flex items-center justify-center">
                <img src={stat.iconSrc} alt="counter icon" className="w-8 h-8" />
              </div>
              <div>
                <h3 className={`text-3xl sm:text-4xl font-extrabold ${stat.textColor} mb-2 tracking-tight`}>
                  {stat.number}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

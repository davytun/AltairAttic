import React from "react";

import salesData from "@/data/smart-switch-sales.json";
const { SPECIFICATIONS } = salesData;

const SpecificationsSection = () => {
  return (
    <section className="py-48 bg-obsidian-surface border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 space-y-12">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-3xl">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-[9px] uppercase font-black tracking-[0.4em] text-silk-white/60">
                {SPECIFICATIONS.badge}
              </span>
            </div>
            <h2 className="text-6xl font-display font-black uppercase leading-none italic">
              {SPECIFICATIONS.title} <br />
              <span className="text-accent">{SPECIFICATIONS.titleAccent}</span>
            </h2>
            <p className="text-xl text-text-muted font-light leading-relaxed border-l border-white/10 pl-8">
              {SPECIFICATIONS.description}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SPECIFICATIONS.items.map((spec, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-8 rounded-3xl bg-white/2 border border-white/5 hover:bg-white/4 transition-colors group"
              >
                <span className="text-[10px] uppercase font-black tracking-widest text-silk-white/30">
                  {spec.label}
                </span>
                <span className="text-sm font-display font-black text-silk-white group-hover:text-accent transition-colors">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificationsSection;

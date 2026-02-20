import React from "react";
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";

import salesData from "@/data/smart-switch-sales.json";
const { FRICTION } = salesData;

const FrictionSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-obsidian relative overflow-hidden transition-colors duration-500">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 lg:mb-8">
              {FRICTION.badge}
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-black uppercase mb-6 lg:mb-8 leading-[1.1] text-silk-white">
              {FRICTION.title} <br />
              <span className="text-text-muted">
                {FRICTION.titleSubtitle}
              </span>
            </h2>
            <p className="text-base lg:text-xl text-text-muted font-light leading-relaxed max-w-xl mb-8 lg:mb-12">
              {FRICTION.description}
            </p>

            <div className="p-8 lg:p-10 rounded-[32px] lg:rounded-[48px] bg-red-500/5 border border-red-500/10 backdrop-blur-3xl relative group transition-all duration-500 hover:bg-red-500/10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-4 lg:p-8 text-red-500/10 group-hover:scale-110 transition-transform">
                <TrendingDown
                  size={80}
                  className="lg:w-[120px] lg:h-[120px]"
                  strokeWidth={1}
                />
              </div>
              <span className="text-[9px] lg:text-xs uppercase font-black tracking-widest text-red-500/60 block mb-3 lg:mb-4">
                Annual Financial & Rest Bleed
              </span>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-silk-white mb-4 tracking-tighter">
                {FRICTION.billBleed}
              </div>
              <p className="text-[10px] lg:text-sm text-text-muted italic leading-tight">
                {FRICTION.billBleedNote}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-0">
            {FRICTION.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 lg:p-8 rounded-[24px] lg:rounded-[40px] bg-obsidian-muted/20 border border-border-dim hover:border-accent/30 transition-all group shadow-xl"
              >
                <div className="text-3xl lg:text-4xl mb-4 lg:mb-6 group-hover:scale-110 transition-transform inline-block">
                  {point.icon}
                </div>
                <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-silk-white mb-3 lg:mb-4">
                  {point.title}
                </h3>
                <p className="text-[11px] lg:text-sm text-text-muted font-light leading-relaxed">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrictionSection;

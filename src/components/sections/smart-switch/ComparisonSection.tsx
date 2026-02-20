import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

import salesData from "@/data/smart-switch-sales.json";
const { COMPARISON } = salesData;

const ComparisonSection = () => {
  return (
    <section className="py-24 lg:py-48 bg-obsidian-surface relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-border-dim to-transparent" />

      <div className="container-luxury relative z-10 px-4">
        <div className="text-center mb-16 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-display font-black leading-[1.1] text-silk-white">
              {COMPARISON.title}{" "}
              <span className="text-accent italic">
                {COMPARISON.titleAccent}
              </span>
            </h2>
            <p className="text-text-muted mt-4 lg:mt-6 text-[10px] lg:text-[10px] uppercase font-black tracking-[0.16em] lg:tracking-[0.4em]">
              {COMPARISON.badge}
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto rounded-[24px] lg:rounded-[48px] border border-border-dim bg-obsidian-muted/30 backdrop-blur-3xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-2 md:grid-cols-3 border-b border-border-dim bg-obsidian-muted/40">
            <div className="p-4 lg:p-10 text-[8px] lg:text-[10px] uppercase font-black tracking-widest text-text-muted flex items-end opacity-40">
              Feature
            </div>
            <div className="p-6 lg:p-12 text-center bg-accent/5 relative border-x border-border-dim">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_var(--color-brand)]" />
              <div className="text-accent font-display font-black text-xl lg:text-3xl italic leading-none">
                Altair
              </div>
              <div className="text-[7px] lg:text-[9px] uppercase font-black tracking-widest text-accent/60 mt-2">
                Premium
              </div>
            </div>
            <div className="p-4 lg:p-10 text-center hidden md:flex flex-col justify-end">
              <div className="text-text-muted font-display font-black text-xl uppercase">
                Others
              </div>
              <div className="text-[10px] uppercase font-black tracking-widest text-text-muted mt-2 italic">
                Generic
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border-dim">
            {COMPARISON.table.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 hover:bg-obsidian-surface transition-colors group"
              >
                <div className="p-4 lg:p-10 font-bold text-[11px] lg:text-sm text-text-muted group-hover:text-silk-white transition-colors flex items-center">
                  {row.f}
                </div>

                <div className="p-4 lg:p-10 text-center bg-accent/3 border-x border-border-dim flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3 lg:px-5 py-2 rounded-full border border-accent/20 bg-accent/10 text-accent font-bold text-[9px] lg:text-[11px] tracking-tight whitespace-nowrap lg:whitespace-normal">
                    <CheckCircle2
                      size={12}
                      className="shrink-0 lg:w-3.5 lg:h-3.5"
                    />
                    {row.a}
                  </div>
                </div>

                <div className="p-4 lg:p-10 hidden md:flex items-center justify-center text-text-muted text-[11px] italic font-light">
                  <div className="flex items-center gap-2">
                    <XCircle size={12} className="text-red-500" />
                    {row.o}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Quality Guarantee */}
          <div className="p-6 lg:p-8 border-t border-border-dim bg-obsidian-muted/40 text-center">
            <p className="text-[10px] lg:text-[10px] uppercase font-black tracking-[0.16em] lg:tracking-[0.3em] text-text-muted italic">
              {COMPARISON.guarantee}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;

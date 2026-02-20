import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Heart, Box, Settings, BookOpen } from "lucide-react";

import salesData from "@/data/smart-switch-sales.json";
const { UNBOXING } = salesData;

const ICON_MAP = [Box, Settings, BookOpen, Heart];

const UnboxingSection = () => {
  return (
    <section className="py-24 lg:py-48 bg-obsidian-surface relative overflow-hidden transition-colors duration-500">
      {/* Soft Glow */}
      <div className="absolute top-0 right-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-accent/5 blur-[80px] lg:blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="container-luxury relative z-10 px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-16 lg:mb-32">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 text-accent mb-6">
                <Sparkles size={16} className="lg:w-[18px] lg:h-[18px]" />
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">
                  {UNBOXING.badge}
                </span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-display font-black leading-[1.1] lg:leading-[0.9] mb-6 lg:mb-10 text-silk-white">
                {UNBOXING.titlePrefix} <br />
                <span className="text-accent italic font-display">
                  {UNBOXING.titleAccent}
                </span>
              </h2>
              <p className="text-base lg:text-xl text-text-muted font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                {UNBOXING.description}
              </p>

              <div className="mt-10 lg:mt-12 p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] bg-obsidian-muted/30 border border-border-dim flex flex-col sm:flex-row items-center gap-6 group hover:bg-obsidian-muted/50 transition-all shadow-xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-obsidian bg-accent flex items-center justify-center text-white dark:text-obsidian shadow-xl"
                    >
                      <Check size={16} strokeWidth={3} />
                    </div>
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[13px] lg:text-sm font-bold text-silk-white mb-1">
                    {UNBOXING.checkedLabel}
                  </p>
                  <p className="text-[11px] lg:text-xs text-text-muted italic">
                    {UNBOXING.certifiedLabel}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-accent/15 blur-[60px] lg:blur-[150px] rounded-full scale-75" />
            <div className="relative z-10 rounded-[32px] lg:rounded-[64px] overflow-hidden border border-border-dim shadow-3xl max-w-[400px] lg:max-w-none mx-auto">
              <img
                src="/assets/smart-switches/how/98b886e0818d9cf41c85b04377fa65ea.jpg"
                className="w-full h-auto"
                alt="Altair Attic Packaging"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {UNBOXING.items.map((item, i) => {
            const Icon = ICON_MAP[i] || Box;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="p-8 lg:p-10 rounded-[32px] lg:rounded-[48px] bg-obsidian-muted/20 border border-border-dim hover:border-accent/20 hover:bg-obsidian-muted/40 transition-all group shadow-xl"
              >
                <div className="w-14 lg:w-16 h-14 lg:h-16 rounded-[20px] lg:rounded-[24px] bg-accent/10 flex items-center justify-center text-accent mb-6 lg:mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white dark:group-hover:text-obsidian transition-all">
                  <Icon size={24} className="lg:w-[28px] lg:h-[28px]" />
                </div>
                <h3 className="text-base lg:text-lg font-bold text-silk-white mb-2 lg:mb-3">
                  {item.name}
                </h3>
                <p className="text-[12px] lg:text-[13px] text-text-muted font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UnboxingSection;

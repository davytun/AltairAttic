import React from "react";
import { motion } from "framer-motion";

import salesData from "@/data/smart-switch-sales.json";
const { NARRATIVE } = salesData;

const NarrativeSection = () => {
  return (
    <section className="py-24 lg:py-48 relative overflow-hidden bg-obsidian-surface border-b border-border-dim transition-colors duration-500">
      <div className="container-luxury">
        {/* ROW 1: THE STORY & IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left"
          >
            <div className="text-accent font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-[10px] mb-6 lg:mb-8">
              {NARRATIVE.badge}
            </div>
            <h2 className="text-3xl lg:text-5xl font-display font-black uppercase mb-8 lg:mb-12 leading-[1.1] lg:leading-[0.9] text-silk-white">
              {NARRATIVE.titlePrefix} <br />
              <span className="text-accent font-display italic">
                {NARRATIVE.titleSuffix}
              </span>
            </h2>
            <div className="space-y-6 lg:space-y-8 text-base lg:text-lg text-text-muted font-light leading-relaxed px-2 lg:px-0">
              <p>{NARRATIVE.paragraphs[0]}</p>
              <div className="p-6 lg:p-10 bg-accent/5 border-l-2 lg:border-l-4 border-accent rounded-r-[24px] lg:rounded-r-[40px] italic text-silk-white/90 shadow-xl backdrop-blur-xl text-left">
                {NARRATIVE.quote}
              </div>
              <p>{NARRATIVE.paragraphs[1]}</p>
              <p className="text-silk-white font-bold text-lg lg:text-2xl pt-4">
                {NARRATIVE.paragraphs[2]}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-accent/10 blur-[80px] lg:blur-[150px] rounded-full scale-75" />
            <div className="relative z-10 rounded-[32px] lg:rounded-[48px] overflow-hidden border border-border-dim bg-obsidian-muted/20 shadow-2xl max-w-[450px] lg:max-w-none mx-auto">
              <img
                src="/assets/smart-switches/how/1.jpg"
                className="w-full h-auto block"
                alt="Smart Switch Usage"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NarrativeSection;

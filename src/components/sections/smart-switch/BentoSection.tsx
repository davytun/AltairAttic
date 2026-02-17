import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Mic2,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCcw,
  Timer,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import salesData from "@/data/smart-switch-sales.json";
const { BENTO } = salesData;

const BentoSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <section className="py-24 lg:py-48 relative overflow-hidden bg-obsidian transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] lg:blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] lg:blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container-luxury relative z-10">
        <div className="max-w-4xl mb-12 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-2 lg:gap-3 text-accent mb-6 lg:mb-8">
              <Sparkles size={14} className="lg:w-4 lg:h-4" />
              <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">
                {BENTO.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-display font-black mb-6 lg:mb-8 leading-[1.1] lg:leading-[0.9] text-silk-white">
              {BENTO.title} <br />
              <span className="text-accent italic font-display">
                {BENTO.titleAccent}
              </span>
            </h2>
            <p className="text-base lg:text-xl text-text-muted font-light leading-relaxed max-w-2xl px-1 lg:px-0">
              {BENTO.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 h-auto md:h-[800px] lg:h-[900px]"
        >
          {/* LARGE FEATURE: REMOTE CONTROL */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 bg-obsidian-surface rounded-[32px] lg:rounded-[48px] p-8 lg:p-16 flex flex-col justify-between border border-border-dim relative overflow-hidden group shadow-3xl min-h-[400px] md:min-h-0"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/assets/smart-switches/how/bde86e9609703d5ad2dcb84847f086f9.jpg"
                className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000"
                alt="Lifestyle"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian-surface via-obsidian-surface/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-5xl font-display font-black leading-tight lg:leading-none mb-6 lg:mb-8 text-silk-white">
                {BENTO.features.remote.title} <br />
                <span className="text-accent italic font-display">
                  {BENTO.features.remote.titleAccent}
                </span>
              </h3>
              <p className="text-text-muted font-light text-base lg:text-xl max-w-sm leading-relaxed mb-8 lg:mb-10">
                {BENTO.features.remote.desc}
              </p>

              <div className="flex gap-4">
                <div className="px-4 lg:px-6 py-2.5 lg:py-3 bg-obsidian-muted border border-border-dim rounded-full flex items-center gap-3 transition-colors">
                  <Smartphone size={14} className="lg:w-4 lg:h-4 text-accent" />
                  <span className="text-[8px] lg:text-[10px] uppercase font-black tracking-widest leading-none text-silk-white">
                    {BENTO.features.remote.badge}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-6 lg:gap-8 mt-12 md:mt-0">
              <div className="w-1 px-3 py-10 lg:py-12 bg-accent/20 rounded-full relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, 40, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-1/3 bg-accent shadow-[0_0_15px_#009fff]"
                />
              </div>
              <div className="text-[8px] lg:text-[10px] uppercase font-black tracking-widest text-text-muted italic leading-tight">
                Faster than a <br /> blink of an eye
              </div>
            </div>
          </motion.div>

          {/* VOICE INTEGRATION */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="md:col-span-1 bg-accent rounded-[32px] lg:rounded-[48px] p-8 lg:p-12 flex flex-col justify-between text-white dark:text-obsidian relative overflow-hidden group shadow-3xl cursor-pointer min-h-[280px] md:min-h-0"
          >
            <div>
              <div className="flex justify-between items-start mb-8 lg:mb-12">
                <div className="w-14 lg:w-16 h-14 lg:h-16 rounded-xl lg:rounded-2xl bg-black/10 flex items-center justify-center">
                  <Mic2 className="w-7 lg:w-8 h-7 lg:h-8" />
                </div>
                <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-black/40 animate-pulse" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-display font-black leading-tight mb-4 lg:mb-6 whitespace-pre-line">
                {BENTO.features.voice.title}
              </h3>
              <p className="opacity-70 text-xs lg:text-sm font-bold leading-tight max-w-[150px] lg:max-w-[180px]">
                {BENTO.features.voice.desc}
              </p>
            </div>
            <div className="flex items-center gap-2 group-hover:gap-4 transition-all">
              <div className="w-10 lg:w-12 h-px bg-black/20" />
              <ChevronRight size={16} />
            </div>
          </motion.div>

          {/* AWAY MODE / SECURITY */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 bg-obsidian-surface rounded-[32px] lg:rounded-[48px] p-8 lg:p-12 border border-border-dim flex flex-col justify-between hover:bg-obsidian-muted/20 transition-all shadow-3xl group relative overflow-hidden min-h-[250px] md:min-h-0"
          >
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <img
                src="/assets/smart-switches/how/cb8aaac212e111d4c6e65b9b76838437.jpg"
                className="w-full h-full object-cover"
                alt="Security"
              />
            </div>
            <ShieldCheck className="text-accent relative z-10 w-10 lg:w-12 h-10 lg:h-12" />
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-black mb-3 lg:mb-4 leading-none italic text-silk-white">
                {BENTO.features.security.title}
              </h3>
              <p className="text-[11px] lg:text-xs text-text-muted font-light leading-relaxed">
                {BENTO.features.security.desc}
              </p>
            </div>
          </motion.div>

          {/* POWER RECOVERY */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 bg-obsidian-muted/20 rounded-[32px] lg:rounded-[48px] p-8 lg:p-12 border border-border-dim flex flex-col justify-between hover:bg-obsidian-muted transition-all shadow-3xl cursor-pointer group min-h-[250px] md:min-h-0"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <RefreshCcw className="text-accent w-7 lg:w-8 h-7 lg:h-8" />
            </motion.div>
            <div>
              <h3 className="text-[10px] lg:text-sm font-black uppercase mb-2 lg:mb-3 tracking-widest text-silk-white leading-none">
                {BENTO.features.memory.title}
              </h3>
              <p className="text-[10px] lg:text-[11px] text-text-muted leading-relaxed font-light">
                {BENTO.features.memory.desc}
              </p>
            </div>
          </motion.div>

          {/* ENERGY MONITORING */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 bg-green-500/5 rounded-[32px] lg:rounded-[48px] p-8 lg:p-12 border border-green-500/10 flex flex-col justify-between hover:bg-green-500/10 transition-all shadow-3xl group min-h-[250px] md:min-h-0"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-green-500" />
              <Zap className="text-green-500 w-5 lg:w-6 h-5 lg:h-6" />
            </div>
            <div>
              <h3 className="text-[10px] lg:text-sm font-black uppercase mb-2 lg:mb-3 tracking-widest text-silk-white leading-none">
                {BENTO.features.energy.title}
              </h3>
              <p className="text-[10px] lg:text-[11px] text-text-muted leading-relaxed font-light">
                {BENTO.features.energy.desc}
              </p>
            </div>
          </motion.div>

          {/* SHARED BOTTOM BLOCK */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 bg-obsidian-surface rounded-[32px] lg:rounded-[48px] py-10 lg:py-12 px-10 lg:px-16 border border-border-dim flex flex-col md:flex-row gap-8 lg:gap-12 items-center shadow-3xl relative overflow-hidden group min-h-[250px] md:min-h-0"
          >
            <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex-1 space-y-3 lg:space-y-4 relative z-10 w-full">
              <div className="flex items-center gap-3 lg:gap-4 text-accent">
                <Lock size={18} className="lg:w-5 lg:h-5" />
                <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-silk-white leading-none">
                  {BENTO.features.safety.title}
                </h3>
              </div>
              <p className="text-[10px] lg:text-[11px] text-text-muted font-light leading-relaxed">
                {BENTO.features.safety.desc}
              </p>
            </div>

            <div className="w-full h-px md:w-px md:h-20 bg-border-dim" />

            <div className="flex-1 space-y-3 lg:space-y-4 relative z-10 w-full">
              <div className="flex items-center gap-3 lg:gap-4 text-accent">
                <Timer size={18} className="lg:w-5 lg:h-5" />
                <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-silk-white leading-none">
                  {BENTO.features.timing.title}
                </h3>
              </div>
              <p className="text-[10px] lg:text-[11px] text-text-muted font-light leading-relaxed">
                {BENTO.features.timing.desc}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoSection;

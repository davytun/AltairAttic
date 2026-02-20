import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatCurrency";

import salesData from "@/data/smart-switch-sales.json";
const { HERO } = salesData;

interface Model {
  id: string;
  name: string;
  price: number;
  desc: string;
  img: string;
}

interface HeroSectionProps {
  models: Model[];
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  scrollToForm: (model?: Model) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  models,
  selectedModel,
  setSelectedModel,
  quantity,
  setQuantity,
  scrollToForm,
}) => {
  const navigate = useNavigate();
  const [viewingCount, setViewingCount] = React.useState(42);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const next = prev + change;
        return next < 35 ? 35 : next > 52 ? 52 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-6 lg:pt-24 pb-12 lg:pb-16 overflow-hidden bg-obsidian transition-colors duration-500">
      {/* Refined Ambient Base */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-[10%] w-[80vw] lg:w-[50vw] h-[80vw] lg:h-[50vw] bg-accent/10 blur-[80px] lg:blur-[180px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[60vw] lg:w-[40vw] h-[60vw] lg:h-[40vw] bg-accent/5 blur-[60px] lg:blur-[120px] rounded-full" />
      </div>

      <div className="container-luxury relative z-10 px-4">
        {/* Professional Navigation Hierarchy */}
        <nav className="flex items-center gap-2 lg:gap-4 mb-8 lg:mb-12">
          <button
            onClick={() => navigate("/catalogue")}
            className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-[10px] font-black uppercase tracking-[0.16em] lg:tracking-[0.3em] text-text-muted hover:text-accent transition-all group"
          >
            <ArrowLeft
              size={8}
              className="lg:w-3 lg:h-3 group-hover:-translate-x-1 transition-transform"
            />
            catalogue
          </button>
          <div className="w-0.5 h-0.5 rounded-full bg-border-dim" />
          <span className="text-[10px] lg:text-[10px] font-black uppercase tracking-[0.16em] lg:tracking-[0.3em] text-text-muted">
            Hardware
          </span>
          <div className="w-0.5 h-0.5 rounded-full bg-border-dim" />
          <span className="text-[10px] lg:text-[10px] font-black uppercase tracking-[0.16em] lg:tracking-[0.3em] text-accent">
            {selectedModel.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
          {/* LEFT: THE STUDIO SUITE */}
          <div className="space-y-6 lg:space-y-12 lg:sticky lg:top-24">
            <div className="relative group/studio">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModel.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-square rounded-[24px] lg:rounded-[48px] bg-obsidian-muted/20 border border-border-dim flex items-center justify-center p-6 lg:p-0 overflow-hidden shadow-2xl"
                >
                  {/* Studio Spotlight Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--color-brand-dim),transparent_80%)]" />

                  <img
                    src={selectedModel.img}
                    className="w-full h-[85%] lg:h-full object-contain relative z-10 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] lg:drop-shadow-[0_50px_100px_rgba(0,0,0,0.2)] transition-transform duration-1000 group-hover/studio:scale-105"
                    alt={selectedModel.name}
                  />

                  {/* Integrated Hardware Overlays */}
                  <div className="absolute bottom-4 lg:bottom-12 left-4 lg:left-12 z-20 flex flex-col gap-0.5 lg:gap-1.5 bg-obsidian/40 backdrop-blur-xl border border-border-dim p-2.5 lg:p-5 rounded-lg lg:rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                      <span className="text-[9px] lg:text-[8px] font-black uppercase tracking-[0.22em] lg:tracking-[0.4em] text-text-muted">
                        Hardware Profile
                      </span>
                    </div>
                    <span className="text-[12px] lg:text-xs font-display font-black uppercase tracking-widest text-silk-white leading-none">
                      {selectedModel.id.replace("-", " ")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 2. CONFIGURATION MATRIX */}
            <div className="space-y-4 lg:space-y-8 bg-obsidian-muted/30 border border-border-dim p-5 lg:p-8 rounded-[20px] lg:rounded-[32px] backdrop-blur-3xl shadow-xl">
              <div className="flex justify-between items-end">
                <label className="text-[10px] lg:text-[10px] font-black uppercase tracking-[0.16em] lg:tracking-[0.4em] text-accent">
                  Configuration
                </label>
                <span className="text-[10px] lg:text-[10px] font-bold text-text-muted uppercase tracking-[0.12em] lg:tracking-widest">
                  {selectedModel.id.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 lg:gap-3">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={cn(
                      "relative h-14 lg:h-20 rounded-xl lg:rounded-2xl border transition-all duration-500 group overflow-hidden",
                      selectedModel.id === model.id
                        ? "bg-accent border-accent shadow-xl scale-[1.02]"
                        : "bg-obsidian-muted border-border-dim hover:bg-obsidian-muted/80",
                    )}
                  >
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <span
                        className={cn(
                          "text-[13px] lg:text-[15px] font-black uppercase tracking-[0.03em] lg:tracking-widest leading-none transition-colors",
                          selectedModel.id === model.id
                            ? "text-white dark:text-obsidian"
                            : "text-text-muted",
                        )}
                      >
                        {model.id.split("-")[0]}G
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: THE SPECIFICATION SUITE */}
          <div className="lg:pt-8 space-y-8 lg:space-y-12">
            {/* 1. PRODUCT IDENTITY */}
            <div className="space-y-2 lg:space-y-4">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={10}
                      fill="currentColor"
                      className="text-accent lg:w-[12px] lg:h-[12px]"
                    />
                  ))}
                </div>
                <span className="text-[11px] lg:text-[10px] font-black uppercase tracking-[0.08em] lg:tracking-widest text-text-muted border-l border-border-dim pl-3">
                  {HERO.reviewsLabel}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tighter leading-tight text-silk-white">
                {HERO.titlePrefix} <br />
                <span className="text-accent">{HERO.titleSuffix}</span>
              </h1>
            </div>

            {/* 3. DYNAMIC PRICING */}
            <div className="flex items-end gap-3 lg:gap-6 h-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModel.id + quantity}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-baseline gap-2 lg:gap-4"
                >
                  <span className="text-3xl lg:text-4xl font-display font-black text-silk-white tracking-tighter">
                    {formatCurrency(selectedModel.price * quantity)}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="pb-1">
                <span className="text-[10px] lg:text-[9px] font-black uppercase tracking-[0.08em] lg:tracking-widest text-text-muted block leading-none">
                  {quantity > 1
                    ? `@ ${formatCurrency(selectedModel.price)}`
                    : "VAT Incl."}
                </span>
                <span className="text-[10px] lg:text-[9px] font-black uppercase tracking-[0.08em] lg:tracking-widest text-accent leading-none mt-1 block">
                  In Stock
                </span>
              </div>
            </div>

            {/* 4. SALES COPY BLOCK */}
            <div className="py-4 lg:py-6 border-y border-border-dim">
              <p className="text-[13px] lg:text-lg font-light tracking-tight text-text-muted leading-relaxed max-w-xl">
                {selectedModel.desc}
              </p>
            </div>

            {/* 4.5 KEY BENEFITS GRID */}
            <div className="py-2">
              <label className="text-[10px] lg:text-[10px] font-black uppercase tracking-[0.16em] lg:tracking-[0.4em] text-accent mb-4 lg:mb-6 block">
                Engineering Highlights
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 lg:gap-y-4 lg:gap-x-8">
                {HERO.engineeringHighlights.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2.5 lg:gap-3 group"
                  >
                    <div className="w-4 h-4 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <CheckCircle2
                        size={8}
                        className="text-accent lg:w-[10px] lg:h-[10px]"
                      />
                    </div>
                    <span className="text-[13px] lg:text-[15px] font-medium text-text-muted group-hover:text-silk-white transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Pulse */}
            <div className="flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-1.5 bg-accent/5 border border-accent/10 rounded-full w-fit">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute inset-0" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent relative" />
              </div>
              <span className="text-[10px] lg:text-[10px] font-black uppercase tracking-[0.08em] lg:tracking-[0.2em] text-text-muted flex items-center gap-1.5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={viewingCount}
                    initial={{ y: 3, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -3, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-accent min-w-[2ch] inline-block tabular-nums font-black"
                  >
                    {viewingCount} people
                  </motion.span>
                </AnimatePresence>{" "}
                viewing now
              </span>
            </div>

            {/* 5. ACTION SUITE */}
            <div className="space-y-6">
              {/* Delivery Status */}
              <div className="flex items-center gap-3 text-text-muted px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] lg:text-[9px] font-black uppercase tracking-[0.14em] text-accent">
                  Order today{" "}
                  <span className="text-text-muted">
                    for quick fulfillment
                  </span>
                </span>
              </div>

              {/* Seamless Action Flow */}
              <div className="flex flex-col gap-3 lg:gap-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center h-14 lg:h-20 bg-obsidian-muted/50 border border-border-dim rounded-xl lg:rounded-2xl px-2 shadow-inner group">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 h-full flex items-center justify-center text-text-muted hover:text-accent transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-display font-black text-lg lg:text-xl text-silk-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 h-full flex items-center justify-center text-text-muted hover:text-accent transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex flex-col justify-center px-4 bg-obsidian-muted/20 border border-border-dim rounded-xl lg:rounded-2xl h-14 lg:h-20">
                    <span className="text-[10px] uppercase font-black tracking-[0.08em] text-text-muted mb-0.5">
                      Subtotal
                    </span>
                    <span className="text-sm font-display font-black text-silk-white tracking-widest">
                      {formatCurrency(selectedModel.price * quantity)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => scrollToForm()}
                  className="h-16 lg:h-20 bg-accent text-white dark:text-obsidian rounded-xl lg:rounded-2xl font-display font-black uppercase tracking-[0.12em] lg:tracking-[0.4em] text-[11px] lg:text-[10px] hover:shadow-[0_20px_50px_rgba(0,159,255,0.3)] lg:hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 lg:gap-4 group px-4 w-full"
                >
                  <ShoppingCart size={14} className="lg:w-4 lg:h-4" />
                  <span className="whitespace-nowrap">
                    {HERO.orderButtonText}
                  </span>
                  <ArrowRight
                    size={12}
                    className="lg:w-3.5 lg:h-3.5 group-hover:translate-x-1 transition-transform hidden sm:block"
                  />
                </button>
              </div>
            </div>

            {/* Trust Integration */}
            <div className="grid grid-cols-2 gap-4 lg:gap-12 border-t border-border-dim pt-6 lg:pt-12">
              {HERO.trustItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 lg:gap-4">
                  <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-lg lg:rounded-xl bg-obsidian-muted flex items-center justify-center shrink-0 border border-border-dim">
                    {idx === 0 ? (
                      <Truck size={14} className="text-accent lg:w-4 lg:h-4" />
                    ) : (
                      <ShieldCheck
                        size={14}
                        className="text-accent lg:w-4 lg:h-4"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] lg:text-[10px] font-black uppercase tracking-[0.08em] lg:tracking-widest text-silk-white">
                      {item.title}
                    </div>
                    <div className="text-[9px] lg:text-[8px] font-bold text-text-muted uppercase tracking-[0.08em] lg:tracking-widest opacity-60">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

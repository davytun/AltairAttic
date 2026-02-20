import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";

interface FloatingCTAProps {
  selectedModel: {
    id: string;
    name: string;
    price: number;
    img: string;
  };
  quantity: number;
  scrollToForm: () => void;
  show: boolean;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({
  selectedModel,
  quantity,
  scrollToForm,
  show,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-4 right-4 lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 lg:w-fit z-50 pointer-events-none"
        >
          <div className="bg-obsidian/80 backdrop-blur-3xl border border-accent/20 rounded-[28px] lg:rounded-full p-1.5 lg:pl-8 lg:pr-1.5 flex items-center justify-between gap-4 lg:gap-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:min-w-[550px] pointer-events-auto max-w-[500px] mx-auto lg:max-w-none">
            {/* Model Info - Desktop Only */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={selectedModel.img}
                  alt={selectedModel.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="whitespace-nowrap">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-0.5">
                  {selectedModel.id.replace("-", " ")}
                </div>
                <div className="text-base font-display font-black text-silk-white leading-none">
                  {formatCurrency(selectedModel.price * quantity)}
                  {quantity > 1 && (
                    <span className="text-[10px] text-text-muted ml-2 font-black uppercase tracking-widest">
                      ({quantity} Units)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Info - Mobile Optimized */}
            <div className="lg:hidden flex flex-col pl-4 min-w-0 flex-1">
              <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.1em] text-accent truncate">
                {selectedModel.id.split("-")[0]}G Configuration
              </div>
              <div className="text-base sm:text-lg font-display font-black text-silk-white leading-tight">
                {formatCurrency(selectedModel.price * quantity)}
              </div>
            </div>

            {/* ACTION BUTTON - Unified Premium Style */}
            <button
              onClick={scrollToForm}
              className="bg-accent text-white dark:text-obsidian h-14 lg:h-16 px-6 sm:px-10 lg:px-12 rounded-[22px] lg:rounded-full font-display font-black uppercase tracking-widest text-[9px] sm:text-[10px] flex items-center justify-center gap-2 sm:gap-3 hover:shadow-[0_0_40px_rgba(0,159,255,0.5)] transition-all active:scale-95 group shrink-0 whitespace-nowrap"
            >
              <ShoppingCart
                size={14}
                className="group-hover:rotate-12 transition-transform shrink-0"
              />
              <span>Order Now</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform shrink-0 hidden sm:block"
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;

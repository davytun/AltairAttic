import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface OrderSuccessModalProps {
  onClose?: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-100 backdrop-blur-3xl flex items-center justify-center p-6 text-center",
        theme === "light"
          ? "bg-white/95 text-slate-900"
          : "bg-obsidian/95 text-silk-white",
      )}
    >
      <div className="max-w-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <CheckCircle2 size={100} className="text-accent mx-auto mb-8" />
        </motion.div>
        <h2 className={cn(
          "text-5xl font-display font-black uppercase mb-4 leading-[0.85]",
          theme === "light" ? "text-slate-900" : "text-white",
        )}>
          Experience <br />
          <span className="text-accent">Confirmed.</span>
        </h2>
        <p className={cn(
          "text-xl mb-12 font-light",
          theme === "light" ? "text-slate-600" : "text-text-muted",
        )}>
          Your order has been reserved. A support representative will contact
          you via WhatsApp shortly to finalize your delivery.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className={cn(
            "px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-transform border-2",
            theme === "light"
              ? "border-slate-300 bg-slate-50 text-slate-900 hover:bg-accent hover:text-white"
              : "border-slate-200 bg-white text-slate-900 hover:bg-accent hover:text-white",
          )}
        >
          Explore Catalog
        </button>
      </div>
    </motion.div>
  );
};

export default OrderSuccessModal;

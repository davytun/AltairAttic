import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderSuccessModalProps {
  onClose?: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-obsidian/95 backdrop-blur-3xl flex items-center justify-center p-6 text-center"
    >
      <div className="max-w-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <CheckCircle2 size={100} className="text-accent mx-auto mb-8" />
        </motion.div>
        <h2 className="text-5xl font-display font-black uppercase mb-4 text-white leading-[0.85]">
          Experience <br />
          <span className="text-accent">Confirmed.</span>
        </h2>
        <p className="text-xl text-text-muted mb-12 font-light">
          Your order has been reserved. A support representative will contact
          you via WhatsApp shortly to finalize your delivery.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="px-12 py-5 bg-white text-obsidian rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-transform"
        >
          Explore Catalog
        </button>
      </div>
    </motion.div>
  );
};

export default OrderSuccessModal;

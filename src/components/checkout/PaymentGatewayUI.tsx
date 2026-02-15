import React, { useState } from "react";
import { CreditCard, Wallet, Banknote, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type PaymentMethod = "cod" | "card" | "mobile";

interface PaymentGatewayUIProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PaymentGatewayUI: React.FC<PaymentGatewayUIProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  const methodVariants = {
    active: {
      borderColor: "rgba(255, 255, 255, 0.4)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    inactive: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      backgroundColor: "transparent",
    },
  };

  return (
    <div className="space-y-4">
      {/* Cash on Delivery */}
      <motion.div
        variants={methodVariants}
        animate={selectedMethod === "cod" ? "active" : "inactive"}
        className={`relative flex items-start p-6 cursor-pointer rounded-2xl border transition-all duration-300 group`}
        onClick={() => onMethodChange("cod")}
      >
        <div className="flex h-6 items-center">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === "cod" ? "border-accent" : "border-silk-white/20"}`}
          >
            {selectedMethod === "cod" && (
              <div className="w-2.5 h-2.5 bg-accent rounded-full" />
            )}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center mb-1">
            <label
              className={`font-display font-medium text-lg cursor-pointer ${selectedMethod === "cod" ? "text-silk-white" : "text-silk-white/60 group-hover:text-silk-white transition-colors"}`}
            >
              Cash on Delivery
            </label>
            <Banknote
              className={`w-5 h-5 ${selectedMethod === "cod" ? "text-accent" : "text-silk-white/20"}`}
            />
          </div>

          <p className="text-sm text-silk-white/40 mb-3">
            Pay securely with cash upon delivery.
          </p>

          <AnimatePresence>
            {selectedMethod === "cod" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="text-xs text-accent/80 bg-accent/5 p-3 rounded-lg border border-accent/10 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    For security, our courier will verify your ID upon delivery.
                    Please have the exact amount ready if possible.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Credit/Debit Card */}
      <motion.div
        variants={methodVariants}
        animate={selectedMethod === "card" ? "active" : "inactive"}
        className={`relative flex items-start p-6 cursor-pointer rounded-2xl border transition-all duration-300 group`}
        onClick={() => onMethodChange("card")}
      >
        <div className="flex h-6 items-center">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === "card" ? "border-accent" : "border-silk-white/20"}`}
          >
            {selectedMethod === "card" && (
              <div className="w-2.5 h-2.5 bg-accent rounded-full" />
            )}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center mb-1">
            <label
              className={`font-display font-medium text-lg cursor-pointer ${selectedMethod === "card" ? "text-silk-white" : "text-silk-white/60 group-hover:text-silk-white transition-colors"}`}
            >
              Credit / Debit Card
            </label>
            <CreditCard
              className={`w-5 h-5 ${selectedMethod === "card" ? "text-accent" : "text-silk-white/20"}`}
            />
          </div>
          <p className="text-sm text-silk-white/40 mb-3">
            Secure transfer via Stripe/Paystack.
          </p>

          <AnimatePresence>
            {selectedMethod === "card" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden space-y-4 pt-2"
              >
                <div className="p-4 bg-black/20 rounded-xl border border-border-dim space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-500 mb-2 bg-yellow-500/10 p-2 rounded">
                    <ShieldAlert className="w-4 h-4" />
                    Gateway Integration Pending
                  </div>

                  <div className="space-y-4 opacity-50 pointer-events-none grayscale">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="block w-full bg-obsidian border border-border-dim rounded-lg text-silk-white px-3 py-2 text-sm"
                      disabled
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="block w-full bg-obsidian border border-border-dim rounded-lg text-silk-white px-3 py-2 text-sm"
                        disabled
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="block w-full bg-obsidian border border-border-dim rounded-lg text-silk-white px-3 py-2 text-sm"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Payment */}
      <motion.div
        variants={methodVariants}
        animate={selectedMethod === "mobile" ? "active" : "inactive"}
        className={`relative flex items-start p-6 cursor-pointer rounded-2xl border transition-all duration-300 group`}
        onClick={() => onMethodChange("mobile")}
      >
        <div className="flex h-6 items-center">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedMethod === "mobile" ? "border-accent" : "border-silk-white/20"}`}
          >
            {selectedMethod === "mobile" && (
              <div className="w-2.5 h-2.5 bg-accent rounded-full" />
            )}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center mb-1">
            <label
              className={`font-display font-medium text-lg cursor-pointer ${selectedMethod === "mobile" ? "text-silk-white" : "text-silk-white/60 group-hover:text-silk-white transition-colors"}`}
            >
              Mobile Payment
            </label>
            <Wallet
              className={`w-5 h-5 ${selectedMethod === "mobile" ? "text-accent" : "text-silk-white/20"}`}
            />
          </div>
          <p className="text-sm text-silk-white/40">
            Apple Pay, Google Pay, USSD.
          </p>

          <AnimatePresence>
            {selectedMethod === "mobile" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-3"
              >
                <div className="text-xs text-silk-white/30 italic">
                  Integration coming soon...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentGatewayUI;

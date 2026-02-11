import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore, Product } from "../../store/useCartStore";
import QuantitySelector from "./QuantitySelector";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart, ArrowRight } from "lucide-react";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  initialQuantity?: number;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  product,
  initialQuantity = 1,
}) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [step, setStep] = useState<"select" | "success">("select");

  useEffect(() => {
    if (isOpen) {
      setQuantity(initialQuantity);
      setStep("select");
    }
  }, [isOpen, initialQuantity]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setStep("success");
  };

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md bg-obsidian-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {step === "select" ? (
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-obsidian-muted border border-white/5 shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-medium text-white leading-tight mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-accent font-bold tracking-wider uppercase mb-1">
                      {product.category}
                    </p>
                    <p className="text-lg text-white/80">
                      ₦{product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-sm font-medium text-white/70">
                      Quantity
                    </span>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={() => setQuantity((q) => q + 1)}
                      onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                      max={product.stock}
                    />
                  </div>

                  <div className="flex justify-between items-center px-2">
                    <span className="text-sm text-white/50">Total</span>
                    <span className="text-2xl font-display font-bold text-white">
                      ₦{(product.price * quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-accent text-obsidian font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Add to Cart <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Added to Cart
                </h3>
                <p className="text-white/60">
                  {quantity} x {product.name}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={onClose}
                    className="py-3 px-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider"
                  >
                    Keep Shopping
                  </button>
                  <button
                    onClick={handleViewCart}
                    className="py-3 px-4 rounded-xl bg-white text-obsidian hover:bg-gray-200 transition-colors text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Checkout <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddToCartModal;

import React, { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCartStore();
  const cartCount = getCartCount();

  // Pulse effect when item added
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (cartCount > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  if (cartCount === 0 && !isOpen) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        layoutId="cart-button"
        onClick={() => setIsOpen(true)}
        animate={pulse ? { scale: [1, 1.2, 1] } : {}}
        className="fixed bottom-8 right-8 z-90 flex items-center gap-3 px-6 py-4 bg-accent text-white rounded-2xl shadow-[0_20px_50px_rgba(0,159,255,0.4)] hover:scale-105 transition-all group"
      >
        <div className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-accent text-[10px] font-black rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </div>
        <span className="font-display font-black uppercase tracking-widest text-xs hidden md:block">
          {formatCurrency(getCartTotal())}
        </span>
      </motion.button>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-obsidian/80 backdrop-blur-md z-100 [html[data-theme='light']_&]:bg-white/80"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-obsidian-surface border-l border-border-dim z-101 flex flex-col shadow-2xl [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-black/5"
            >
              {/* Header */}
              <div className="p-8 border-b border-border-dim flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-black uppercase">
                    Your Cart
                  </h2>
                  <p className="text-xs text-text-muted font-bold tracking-widest uppercase mt-1">
                    {cartCount} {cartCount === 1 ? "Item" : "Items"} Selected
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <ShoppingCart size={32} className="text-white/20" />
                    </div>
                    <p className="text-text-muted font-light">
                      Your cart is feeling light.
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-4 text-accent uppercase font-black tracking-widest text-xs"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-obsidian border border-white/5 shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-sm line-clamp-1 text-silk-white">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/20 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-accent font-mono text-xs mb-3">
                          {formatCurrency(item.price)}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 px-2 hover:bg-white/5 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 px-2 hover:bg-white/5 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-border-dim bg-obsidian-muted/50 mt-auto">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-xs uppercase font-black tracking-widest text-text-muted">
                    Subtotal
                  </span>
                  <span className="text-3xl font-display font-black text-silk-white">
                    {formatCurrency(getCartTotal())}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <button
                    disabled={cartItems.length === 0}
                    className="w-full h-16 bg-accent text-obsidian rounded-2xl font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all [html[data-theme='light']_&:hover]:bg-black [html[data-theme='light']_&:hover]:text-white"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-text-muted uppercase font-black tracking-widest">
                  <Plus size={10} className="text-accent" />
                  Free Installation Included
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;

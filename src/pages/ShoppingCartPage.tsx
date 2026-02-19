import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/cart/CartItem";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react";
import { DotBackground } from "@/components/ui/DotBackground";

const ShoppingCartPage: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const subtotal = getCartTotal();

  const [timeLeft, setTimeLeft] = useState("10:00");

  useEffect(() => {
    // Set initial target time to 10 minutes from now if not already running
    // For simplicity in this demo, we just count down from 10m on each mount
    // In a real app, this should probably be stored in local storage or context to persist across refreshes
    let remaining = 10 * 60; // 10 minutes in seconds

    const timer = setInterval(() => {
      remaining--;
      if (remaining < 0) {
        clearInterval(timer);
        setTimeLeft("00:00");
        return;
      }

      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      setTimeLeft(
        `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <main className="bg-obsidian min-h-screen flex flex-col selection:bg-accent selection:text-obsidian">
        <Helmet>
          <title>Shopping Cart - Altair Attic</title>
        </Helmet>
        <Navbar />

        <div className="grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <DotBackground
            dotSize={1.2}
            gap={40}
            dotColor="rgba(255, 255, 255, 0.05)"
            fade={true}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center text-center max-w-md"
          >
            <div className="w-24 h-24 bg-obsidian-surface rounded-full flex items-center justify-center mb-8 border border-border-dim shadow-2xl shadow-accent/5">
              <ShoppingCart className="w-10 h-10 text-silk-white/20" />
            </div>
            <h2 className="text-3xl font-display font-medium text-silk-white mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-silk-white/50 mb-8 text-lg font-light leading-relaxed">
              Looks like you haven't discovered the right hardware for your
              collection yet.
            </p>
            <Link
              to="/shop"
              className="px-8 py-4 bg-accent text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/90 hover:text-obsidian transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] [html[data-theme='light']_&:hover]:bg-obsidian [html[data-theme='light']_&:hover]:text-silk-white"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-obsidian min-h-screen flex flex-col selection:bg-accent selection:text-obsidian">
      <Helmet>
        <title>Shopping Cart - Altair Attic</title>
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-start gap-12 xl:gap-20"
        >
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-6 border-b border-border-dim pb-4">
              <h1 className="text-4xl md:text-5xl font-display text-silk-white uppercase tracking-tight">
                Shopping Cart
              </h1>
              <span className="text-silk-white/50 font-mono text-sm">
                {cartItems.length} Items
              </span>
            </div>

            {/* Cart Reservation Timer */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-8 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <div className="leading-relaxed">
                <p className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-2">
                  Stock Reserved For
                </p>
                <p className="text-silk-white text-sm font-medium">
                  Your items are held for{" "}
                  <span className="font-mono font-bold text-orange-400 text-xl mx-1">
                    {timeLeft}
                  </span>{" "}
                  minute(s).
                  <span className="block mt-1 text-silk-white/40 text-[10px] uppercase tracking-tighter">
                    Secure your purchase before the timer expires.
                  </span>
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id}>
                  {/* Reuse existing component, assuming it handles display well */}
                  <CartItem item={item} />
                </li>
              ))}
            </ul>

            {/* Upsell Section */}
            <div className="mt-12 pt-8 border-t border-border-dim">
              <h3 className="text-lg font-bold text-silk-white mb-6 flex items-center gap-2">
                <span className="text-accent">✨</span> Frequently Bought
                Together
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: 99,
                    name: "Smart Plug Mini",
                    price: 37500,
                    images: ["https://loremflickr.com/200/200/monitor"],
                    category: "Accessories",
                    shortDescription: "Control your devices remotely.",
                    fullDescription:
                      "Control your devices remotely with this smart plug.",
                    stock: 100,
                    specifications: {},
                    features: [],
                  },
                  {
                    id: 98,
                    name: "Extension Cable (10ft)",
                    price: 22500,
                    images: ["https://loremflickr.com/200/200/cable"],
                    category: "Accessories",
                    shortDescription: "Heavy duty extension cable.",
                    fullDescription:
                      "Heavy duty extension cable for all your power needs.",
                    stock: 100,
                    specifications: {},
                    features: [],
                  },
                ].map((upsell) => (
                  <div
                    key={upsell.id}
                    className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-border-dim hover:border-white/10 transition-colors"
                  >
                    <img
                      src={upsell.images[0]}
                      alt={upsell.name}
                      className="w-16 h-16 rounded-lg object-cover bg-obsidian"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-silk-white mb-1">
                        {upsell.name}
                      </h4>
                      <p className="text-xs text-accent font-mono">
                        ₦{upsell.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(upsell as any)}
                      className="px-3 py-1.5 bg-silk-white/10 hover:bg-silk-white/20 text-silk-white text-[10px] uppercase font-bold tracking-wider rounded-lg border border-white/10"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center pt-8 border-t border-border-dim">
              <button
                onClick={clearCart}
                className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Clear Cart
              </button>
              <Link
                to="/catalogue"
                className="text-xs font-bold uppercase tracking-widest text-silk-white/50 hover:text-accent transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[400px] shrink-0">
            <div className="bg-obsidian-surface border border-border-dim rounded-3xl p-8 sticky top-32 shadow-2xl shadow-black/50">
              <h2 className="text-xl font-display font-medium text-silk-white mb-8 border-b border-white/5 pb-4">
                Order Summary
              </h2>

              {/* Free Shipping Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-silk-white/60">Free Shipping</span>
                  <span className="text-silk-white font-mono">
                    {subtotal >= 300000
                      ? "Unlocked!"
                      : `₦${(300000 - subtotal).toLocaleString()} away`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${subtotal >= 300000 ? "bg-green-500" : "bg-accent"}`}
                    style={{
                      width: `${Math.min(100, (subtotal / 300000) * 100)}%`,
                    }}
                  />
                </div>
                {subtotal >= 300000 && (
                  <p className="text-[10px] text-green-400 mt-2 flex items-center gap-1">
                    <span className="font-bold">✓</span> You get Free Express
                    Shipping!
                  </p>
                )}
              </div>

              <dl className="space-y-6 text-sm mb-8">
                <div className="flex justify-between text-silk-white/60">
                  <dt>Subtotal</dt>
                  <dd className="font-mono text-silk-white">
                    ₦{subtotal.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between text-silk-white/60">
                  <dt>Shipping Estimate</dt>
                  <dd
                    className={`text-xs uppercase font-bold tracking-wider ${subtotal >= 300000 ? "text-green-400" : "text-silk-white/40"}`}
                  >
                    {subtotal >= 300000 ? "FREE" : "₦5,000"}
                  </dd>
                </div>
                <div className="flex justify-between text-silk-white/60">
                  <dt>Tax Estimate</dt>
                  <dd className="font-mono text-silk-white">₦0.00</dd>
                </div>

                <div className="border-t border-border-dim pt-6 flex justify-between items-center">
                  <dt className="text-lg font-bold text-silk-white">Total</dt>
                  <dd className="text-3xl font-display font-bold text-accent">
                    ₦
                    {(
                      subtotal + (subtotal >= 300000 ? 0 : 5000)
                    ).toLocaleString()}
                  </dd>
                </div>
              </dl>

              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-silk-white text-obsidian font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group shadow-lg shadow-white/10"
              >
                Checkout Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default ShoppingCartPage;

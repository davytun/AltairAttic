import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Lock,
  Package,
  Truck,
  AlertCircle,
  X,
  Send,
  Info,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { orderService, CreateOrderData } from "@/services/orderService";
import { formatCurrency } from "@/lib/formatCurrency";
import { NIGERIAN_STATES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CheckoutPage: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });

  const subtotal = getCartTotal();
  const total = subtotal;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const firstName = formData.fullName.split(" ")[0] || "";
      const lastName =
        formData.fullName.split(" ").slice(1).join(" ") || "Customer";

      const orderData: CreateOrderData = {
        product_id: cartItems[0]?.id || 0,
        quantity: cartItems[0]?.quantity || 1,
        first_name: firstName,
        last_name: lastName,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        notes: `FULL CART ORDER. Items: ${cartItems.map((item) => `${item.name} (x${item.quantity})`).join(", ")}. ${formData.notes}`,
      };

      const response = await orderService.createOrder(orderData);
      const orderNumber =
        response.order_number ||
        response.data?.order_number ||
        `ORD-${Math.floor(Math.random() * 900000) + 100000}`;

      setOrderSuccess({ orderNumber });
      clearCart();
      setIsSubmitting(false);

      setTimeout(() => navigate("/shop"), 6000);
    } catch (err: any) {
      console.error("Order Failed:", err);
      setError(
        "Failed to place order. Please check your details and try again.",
      );
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !orderSuccess) {
    navigate("/shop");
    return null;
  }

  return (
    <div className="bg-obsidian min-h-screen selection:bg-accent selection:text-obsidian text-silk-white font-sans [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:text-silk-white/90">
      <Helmet>
        <title>Complete Order — Altair Attic</title>
      </Helmet>
      <Navbar />

      <main className="relative pt-32 pb-64 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 blur-[200px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-500/5 blur-[150px] rounded-full -z-10" />

        <div className="container-luxury">
          {/* Header Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mb-24"
          >
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Secure Terminal v2.0
            </span>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-display font-black leading-[0.85] uppercase tracking-tighter mb-8">
              Complete Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-blue-400">
                Order.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light max-w-2xl leading-relaxed">
              Complete your order request. Our team will handle your hardware
              delivery after checking your details.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            {/* Deployment Form */}
            <div className="lg:col-span-7 space-y-12">
              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                {/* Section 01: Identity */}
                <div className="p-10 md:p-16 rounded-[56px] bg-white/2 border border-white/5 backdrop-blur-3xl shadow-3xl">
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-display font-black text-xl">
                      01
                    </div>
                    <h2 className="text-3xl font-display font-black uppercase tracking-tight">
                      Contact Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4 italic">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none transition-all font-display text-lg"
                        placeholder="Johnathan Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4 italic">
                        Primary Line
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none transition-all font-display text-lg"
                        placeholder="+234..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4 italic">
                        WhatsApp Direct
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none transition-all font-display text-lg"
                        placeholder="Sync required"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4 italic">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none transition-all font-display text-lg"
                        placeholder="user@altair.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 02: Logistics */}
                <div className="p-10 md:p-16 rounded-[56px] bg-white/2 border border-white/5 backdrop-blur-3xl shadow-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Truck size={120} />
                  </div>
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-display font-black text-xl">
                      02
                    </div>
                    <h2 className="text-3xl font-display font-black uppercase tracking-tight">
                      Shipping Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4 italic">
                        Shipping Address
                      </label>
                      <textarea
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full bg-obsidian-surface border border-white/10 rounded-3xl px-8 py-6 text-white focus:border-accent outline-none transition-all font-display text-lg resize-none"
                        placeholder="Full street details and landmark..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4 italic">
                        City Hub
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none transition-all font-display text-lg"
                        placeholder="e.g. Lekki"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4 italic">
                        Regional Sector (State)
                      </label>
                      <div className="relative">
                        <select
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none transition-all font-display text-lg appearance-none cursor-pointer"
                        >
                          <option value="">Select State</option>
                          {NIGERIAN_STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-accent pointer-events-none"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-2">
                      Secure Order Processing
                    </h4>
                    <p className="text-xs text-text-muted font-light leading-relaxed">
                      Your personal and shipping data are protected and used
                      only to process your order. We do not store credit card
                      info.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <div className="p-12 rounded-[56px] bg-white/3 border border-white/10 backdrop-blur-3xl shadow-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[80px] pointer-events-none" />

                  <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-10 pb-6 border-b border-white/5 flex justify-between items-center">
                    Order Summary
                    <span className="text-[10px] px-3 py-1 bg-white/5 rounded-full text-accent border border-accent/20">
                      {cartItems.length} Units
                    </span>
                  </h3>

                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-12">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/8 transition-all"
                      >
                        <div className="w-24 h-24 bg-black/40 rounded-2xl shrink-0 overflow-hidden p-4">
                          <img
                            src={item.images[0]}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            alt={item.name}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="text-lg font-black uppercase tracking-tight mb-2 truncate">
                            {item.name}
                          </h4>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
                              QTY: {item.quantity}
                            </span>
                            <span className="text-lg font-display font-black text-accent">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 mb-12">
                    <div className="flex justify-between items-center text-sm uppercase font-black tracking-widest text-white/40">
                      <span>Shipping Fee</span>
                      <span className="text-white">FREE</span>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                      <span className="text-xl font-display font-black uppercase">
                        Total Amount
                      </span>
                      <span className="text-4xl font-display font-black text-accent">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full h-24 bg-accent text-obsidian rounded-[32px] font-display font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(0,159,255,0.4)] group disabled:opacity-50 overflow-hidden relative [html[data-theme='light']_&:hover]:bg-obsidian [html[data-theme='light']_&:hover]:text-silk-white"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Processing..." : "Place Shop Order"}
                    </span>
                    {!isSubmitting && (
                      <ArrowRight
                        size={20}
                        className="relative z-10 group-hover:translate-x-2 transition-transform"
                      />
                    )}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 [html[data-theme='light']_&]:bg-obsidian" />
                  </button>

                  <div className="mt-8 flex items-center justify-center gap-6 text-[8px] font-black uppercase tracking-[0.4em] text-white/20 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Lock size={12} /> Encrypted
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={12} /> Pay on Delivery
                    </div>
                  </div>
                </div>

                {/* Logistics Advantage Card */}
                <div className="p-10 rounded-[40px] bg-accent/5 border border-accent/10">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">
                    Shipping Info
                  </h5>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Truck size={18} />
                    </div>
                    <p className="text-sm font-bold">
                      4-Hour Fast Delivery (Lagos)
                    </p>
                  </div>
                  <p className="text-xs text-text-muted font-light leading-relaxed mb-6">
                    Orders within Lagos State are eligible for same-day
                    delivery. Other states take 2-4 business days.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent italic">
                    <Info size={14} /> Shipping Status: Online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS CINEMATIC OVERLAY */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-obsidian-surface/95 backdrop-blur-3xl flex items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-xl w-full text-center space-y-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10, delay: 0.2 }}
                className="w-32 h-32 bg-accent/20 border border-accent/40 text-accent rounded-[40px] flex items-center justify-center mx-auto"
              >
                <CheckCircle size={64} />
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.8] mb-4">
                  Order <br />
                  <span className="text-accent">Confirmed.</span>
                </h2>
                <div className="px-6 py-2 bg-accent/10 border border-accent/20 rounded-full w-fit mx-auto text-accent text-[10px] font-black uppercase tracking-widest mb-8">
                  Sequence: #{orderSuccess.orderNumber}
                </div>
                <p className="text-xl text-text-muted font-light leading-relaxed max-w-md mx-auto">
                  Your order has been started. Our support team will contact you
                  via <span className="text-white font-bold">WhatsApp</span>{" "}
                  within the hour.
                </p>
              </div>

              <div className="pt-12 border-t border-white/5">
                <button
                  onClick={() => navigate("/shop")}
                  className="px-16 py-6 bg-white text-obsidian rounded-full font-display font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent hover:text-white hover:scale-105 transition-all shadow-2xl"
                >
                  Return to Global Catalog
                </button>
                <p className="mt-8 text-[9px] text-text-muted uppercase font-black tracking-[0.5em] animate-pulse">
                  System Redirecting...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 159, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
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

  const sectionCardClass =
    "p-4 md:p-8 rounded-2xl md:rounded-3xl bg-obsidian-surface/70 border border-border-dim backdrop-blur-xl shadow-xl [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-black/10";
  const labelClass =
    "text-[10px] font-black uppercase tracking-[0.14em] md:tracking-[0.22em] text-text-muted ml-1";
  const inputClass =
    "w-full h-12 md:h-14 bg-obsidian border border-border-dim rounded-xl px-4 md:px-5 text-silk-white focus:border-accent outline-none transition-all text-sm md:text-base placeholder:text-text-muted [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:placeholder:text-slate-500";
  const textareaClass =
    "w-full bg-obsidian border border-border-dim rounded-xl px-4 md:px-5 py-3.5 md:py-4 text-silk-white focus:border-accent outline-none transition-all text-sm md:text-base resize-none placeholder:text-text-muted [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:placeholder:text-slate-500";

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
    <div className="bg-obsidian min-h-screen selection:bg-accent selection:text-obsidian text-silk-white font-sans [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:text-obsidian">
      <Helmet>
        <title>Complete Order — Altair Attic</title>
      </Helmet>
      <Navbar />

      <main className="relative pt-20 md:pt-24 pb-28 md:pb-24 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 blur-[200px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-500/5 blur-[150px] rounded-full -z-10" />

        <div className="container-luxury">
          {/* Header Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-12 lg:mb-14"
          >
            <span className="text-accent font-black uppercase tracking-[0.22em] text-[10px] mb-4 block">
              Secure Terminal v2.0
            </span>
            <h1 className="text-[clamp(1.6rem,5.5vw,4rem)] font-display font-black leading-[0.95] uppercase tracking-tight mb-3 md:mb-5">
              Complete Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-blue-400">
                Order.
              </span>
            </h1>
            <p className="text-sm md:text-lg text-text-muted font-light max-w-2xl leading-relaxed">
              Complete your order request. Our team will handle your hardware
              delivery after checking your details.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Deployment Form */}
            <div className="order-1 lg:order-1 lg:col-span-7 space-y-6">
              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Section 01: Identity */}
                <div className={sectionCardClass}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-display font-black text-sm">
                      01
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight">
                      Contact Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="md:col-span-2 space-y-2">
                      <label className={labelClass}>
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        Primary Line
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        WhatsApp Direct
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your WhatsApp number"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className={labelClass}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 02: Logistics */}
                <div className={`${sectionCardClass} relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Truck size={80} />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-display font-black text-sm">
                      02
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight">
                      Shipping Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="md:col-span-2 space-y-2">
                      <label className={labelClass}>
                        Shipping Address
                      </label>
                      <textarea
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className={textareaClass}
                        placeholder="Your delivery address"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        City Hub
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your city"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        Regional Sector (State)
                      </label>
                      <div className="relative">
                        <select
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full h-12 md:h-14 bg-obsidian border border-border-dim rounded-xl px-4 md:px-5 text-silk-white focus:border-accent outline-none transition-all text-sm md:text-base appearance-none cursor-pointer [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300"
                        >
                          <option value="">Select State</option>
                          {NIGERIAN_STATES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-accent pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Order Sidebar */}
            <div className="order-2 lg:order-2 lg:col-span-5">
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="p-3 md:p-7 rounded-xl md:rounded-3xl bg-obsidian-surface border border-border-dim backdrop-blur-xl shadow-xl relative overflow-hidden [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-black/10">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-[80px] pointer-events-none" />

                  <h3 className="text-[13px] md:text-xl font-display font-black uppercase tracking-tight mb-2.5 pb-2.5 border-b border-border-dim flex justify-between items-center text-silk-white [html[data-theme='light']_&]:text-slate-900">
                    Order Summary
                    <span className="text-[9px] md:text-[10px] px-2 py-0.5 md:px-2.5 md:py-1 bg-accent/5 rounded-full text-accent border border-accent/20 font-black">
                      {cartItems.length} Units
                    </span>
                  </h3>

                  <div className="space-y-2.5 md:space-y-3 max-h-none md:max-h-[320px] overflow-visible md:overflow-y-auto pr-0 md:pr-1 custom-scrollbar mb-4 md:mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-2 p-1.5 md:p-3 rounded-lg md:rounded-2xl bg-obsidian border border-border-dim group transition-all [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-black/30 rounded-md md:rounded-xl shrink-0 overflow-hidden p-1.5 md:p-2 [html[data-theme='light']_&]:bg-white">
                          <img
                            src={item.images[0]}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            alt={item.name}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <h4 className="text-[10px] md:text-sm font-bold tracking-tight mb-0.5 truncate text-silk-white [html[data-theme='light']_&]:text-slate-800">
                            {item.name}
                          </h4>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.08em] text-text-muted">
                              QTY: {item.quantity}
                            </span>
                            <span className="text-[1.2rem] md:text-base font-display font-black text-accent leading-none">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center text-[11px] md:text-xs uppercase font-black tracking-[0.08em] md:tracking-[0.12em] text-text-muted">
                      <span>Shipping Fee</span>
                      <span className="text-silk-white">FREE</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border-dim">
                      <span className="text-[11px] md:text-base font-display font-black uppercase text-text-muted">
                        Total Amount
                      </span>
                      <span className="text-[1.3rem] leading-none md:text-3xl font-display font-black text-accent">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="hidden md:flex w-full h-12 md:h-14 bg-accent text-obsidian rounded-xl md:rounded-2xl font-display font-black uppercase tracking-[0.05em] md:tracking-[0.12em] text-[10px] items-center justify-center gap-2.5 hover:bg-white hover:scale-[1.01] transition-all shadow-[0_10px_30px_rgba(0,159,255,0.3)] group disabled:opacity-50 overflow-hidden relative [html[data-theme='light']_&:hover]:bg-obsidian [html[data-theme='light']_&:hover]:text-silk-white"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Processing..." : "Place Shop Order"}
                    </span>
                    {!isSubmitting && (
                      <ArrowRight
                        size={16}
                        className="relative z-10 group-hover:translate-x-2 transition-transform"
                      />
                    )}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 [html[data-theme='light']_&]:bg-obsidian" />
                  </button>

                  <div className="mt-2.5 md:mt-4 flex flex-wrap items-center justify-center gap-2.5 md:gap-3 text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.12em] text-text-muted">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <CreditCard size={10} /> Pay on Delivery
                    </div>
                  </div>
                </div>

                {/* Logistics Advantage Card */}
                <div className="hidden md:block p-5 rounded-2xl bg-accent/5 border border-accent/15">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3">
                    Shipping Info
                  </h5>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <Truck size={18} />
                    </div>
                    <p className="text-sm font-bold leading-tight text-silk-white [html[data-theme='light']_&]:text-slate-900">
                      4-Hour Fast Delivery (Lagos)
                    </p>
                  </div>
                  <p className="text-xs text-text-muted font-light leading-relaxed mb-4">
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

      {/* Mobile Sticky Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-90 md:hidden border-t border-border-dim bg-obsidian-surface/95 backdrop-blur-xl [html[data-theme='light']_&]:bg-white/95 [html[data-theme='light']_&]:border-black/10">
        <div className="container-luxury py-3 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.12em] font-black text-text-muted">
              Total
            </p>
            <p className="text-base font-display font-black text-accent truncate">
              {formatCurrency(total)}
            </p>
          </div>
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="h-10 px-3.5 rounded-lg bg-accent text-obsidian font-black uppercase tracking-[0.06em] text-[9px] flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
            {!isSubmitting && <ArrowRight size={14} />}
          </button>
        </div>
      </div>

      {/* SUCCESS CINEMATIC OVERLAY */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-obsidian-surface/95 backdrop-blur-2xl flex items-center justify-center p-6 text-center [html[data-theme='light']_&]:bg-white/95"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-xl w-full text-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10, delay: 0.2 }}
                className="w-24 h-24 bg-accent/20 border border-accent/40 text-accent rounded-3xl flex items-center justify-center mx-auto"
              >
                <CheckCircle size={48} />
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase leading-[0.85] mb-3">
                  Order <br />
                  <span className="text-accent">Confirmed.</span>
                </h2>
                <div className="px-6 py-2 bg-accent/10 border border-accent/20 rounded-full w-fit mx-auto text-accent text-[10px] font-black uppercase tracking-widest mb-8">
                  Sequence: #{orderSuccess.orderNumber}
                </div>
                <p className="text-base md:text-lg text-text-muted font-light leading-relaxed max-w-md mx-auto">
                  Your order has been started. Our support team will contact you
                  via <span className="text-silk-white font-bold">WhatsApp</span>{" "}
                  within the hour.
                </p>
              </div>

              <div className="pt-6 border-t border-border-dim">
                <button
                  onClick={() => navigate("/shop")}
                  className="px-10 py-4 bg-white text-obsidian rounded-full font-display font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white hover:scale-105 transition-all shadow-xl"
                >
                  Return to Global Catalog
                </button>
                <p className="mt-5 text-[9px] text-text-muted uppercase font-black tracking-[0.2em] animate-pulse">
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

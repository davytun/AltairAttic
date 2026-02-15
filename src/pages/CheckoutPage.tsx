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
} from "lucide-react";
import { orderService, CreateOrderData } from "@/services/orderService";

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
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const subtotal = getCartTotal();
  const shipping = subtotal >= 300000 ? 0 : 5000;
  const total = subtotal + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const orderData: CreateOrderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        notes: formData.notes,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await orderService.createOrder(orderData);

      console.log("Order Placed:", response);

      // Backend must provide order number
      const orderNumber = response.order_number || response.data?.order_number;

      if (!orderNumber) {
        throw new Error("Order number not received from server");
      }

      // Show success modal instead of alert
      setOrderSuccess({ orderNumber });
      clearCart();
      setIsSubmitting(false);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/products");
      }, 3000);
    } catch (err: any) {
      console.error("Order Failed:", err);
      setError(
        "Failed to place order. Please check your details and try again.",
      );
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null; // Or a loading spinner/redirect message
  }

  return (
    <main className="bg-obsidian min-h-screen flex flex-col selection:bg-accent selection:text-obsidian">
      <Helmet>
        <title>Checkout - Altair Attic</title>
      </Helmet>
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-white/10 pb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display text-silk-white uppercase tracking-tight mb-4">
            Secure Checkout
          </h1>
          <div className="flex items-center gap-2 text-silk-white/50 text-sm">
            <Lock className="w-4 h-4" />
            <span className="uppercase tracking-widest font-bold">
              Encrypted Connection
            </span>
          </div>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
          {/* Left Column - Form */}
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            <div className="bg-obsidian-surface border border-border-dim rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-accent text-obsidian flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h2 className="text-2xl font-display font-medium text-silk-white">
                  Shipping Details
                </h2>
              </div>

              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-widest text-silk-white/50 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-border-dim rounded-xl text-silk-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-widest text-silk-white/50 mb-2"
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-border-dim rounded-xl text-silk-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="+234..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-widest text-silk-white/50 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-border-dim rounded-xl text-silk-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-xs font-bold uppercase tracking-widest text-silk-white/50 mb-2"
                    >
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={2}
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-border-dim rounded-xl text-silk-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="Street address, apartment, suite, unit, etc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-bold uppercase tracking-widest text-silk-white/50 mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-border-dim rounded-xl text-silk-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-xs font-bold uppercase tracking-widest text-silk-white/50 mb-2"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-border-dim rounded-xl text-silk-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-xs font-bold uppercase tracking-widest text-silk-white/50 mb-2"
                    >
                      Delivery Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-border-dim rounded-xl text-silk-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="Gate code, instructions, etc."
                    />
                    {error && (
                      <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-obsidian-surface rounded-3xl p-8 shadow-2xl shadow-black/50 text-silk-white relative overflow-hidden border border-border-dim">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] rounded-full pointer-events-none" />

              <h2 className="text-xl font-display font-bold text-silk-white mb-6 pb-6 border-b border-border-dim flex items-center justify-between">
                Order Summary
                <span className="text-sm font-normal text-silk-white/50 bg-silk-white/5 px-3 py-1 rounded-full border border-border-dim">
                  {cartItems.length} Items
                </span>
              </h2>

              <ul className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-obsidian-muted rounded-lg overflow-hidden shrink-0 border border-border-dim">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-silk-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-silk-white/50 mb-1">
                        {item.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-silk-white/5 px-2 py-0.5 rounded text-silk-white/70 border border-border-dim">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium text-silk-white">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-4 text-sm mb-8 pt-6 border-t border-border-dim">
                <div className="flex justify-between text-silk-white/60">
                  <dt>Subtotal</dt>
                  <dd className="font-medium">₦{subtotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between text-silk-white/60">
                  <dt>Shipping</dt>
                  <dd
                    className={`font-bold uppercase text-xs tracking-wider ${shipping === 0 ? "text-green-400" : "text-silk-white/60"}`}
                  >
                    {shipping === 0
                      ? "Free Shipping"
                      : `₦${shipping.toLocaleString()}`}
                  </dd>
                </div>
                <div className="flex justify-between text-silk-white text-lg font-bold border-t border-border-dim pt-4 mt-4">
                  <dt>Total</dt>
                  <dd className="text-accent">₦{total.toLocaleString()}</dd>
                </div>
              </dl>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className={`w-full py-4 bg-accent text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white hover:text-obsidian transition-all duration-300 shadow-xl shadow-accent/20 flex items-center justify-center gap-2 group ${isSubmitting ? "opacity-75 cursor-wait" : ""}`}
              >
                {isSubmitting ? (
                  <>Processing Order...</>
                ) : (
                  <>
                    Confirm Order{" "}
                    <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>

              <p className="mt-6 text-[10px] text-center text-silk-white/30">
                By placing this order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-silk-white/5 flex items-center justify-center border border-border-dim">
                  <Package className="w-5 h-5 text-silk-white" />
                </div>
                <span className="text-[10px] uppercase font-bold text-silk-white tracking-widest">
                  Secure Packing
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-silk-white/5 flex items-center justify-center border border-border-dim">
                  <Truck className="w-5 h-5 text-silk-white" />
                </div>
                <span className="text-[10px] uppercase font-bold text-silk-white tracking-widest">
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal - Modern 2026 Style */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setOrderSuccess(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-obsidian-surface border border-accent/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-accent/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOrderSuccess(null)}
                className="absolute top-4 right-4 text-silk-white/50 hover:text-silk-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
              </div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-2xl font-display font-bold text-silk-white mb-3">
                  Order Placed Successfully!
                </h2>
                <p className="text-silk-white/70 mb-6">
                  Thank you for your order. We'll contact you shortly to confirm
                  delivery details.
                </p>

                {/* Order Number */}
                <div className="bg-white/5 border border-accent/20 rounded-xl p-4 mb-6">
                  <p className="text-xs uppercase tracking-widest text-silk-white/50 mb-1">
                    Order Number
                  </p>
                  <p className="text-xl font-mono font-bold text-accent">
                    {orderSuccess.orderNumber}
                  </p>
                </div>

                {/* Info */}
                <p className="text-xs text-silk-white/50 mb-6">
                  Redirecting you back to products in 3 seconds...
                </p>

                {/* Action Button */}
                <button
                  onClick={() => navigate("/products")}
                  className="w-full py-3 bg-accent text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-accent/80 transition-all"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default CheckoutPage;

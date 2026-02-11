import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import PaymentGatewayUI from "../components/checkout/PaymentGatewayUI";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { CheckCircle, Lock, Package, Truck, CreditCard } from "lucide-react";

const CheckoutPage: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "mobile">(
    "cod",
  );
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const orderData = {
        orderNumber: `ORD-${Date.now()}`,
        orderType: "CART_CHECKOUT",
        orderDate: new Date().toISOString(),
        items: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          pricePerUnit: item.price,
          subtotal: item.price * item.quantity,
        })),
        customerDetails: formData,
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        tax: 0,
        shippingFee: shipping,
        totalAmount: total,
        status: "pending",
      };

      console.log("Order Placed:", orderData);

      // Show alert (mock success modal)
      alert(
        `Order Placed Successfully!\nOrder Number: ${orderData.orderNumber}\nWe will contact you shortly.`,
      );

      clearCart();
      setIsSubmitting(false);
      navigate("/products");
    }, 2000);
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
          <h1 className="text-4xl md:text-5xl font-display text-white uppercase tracking-tight mb-4">
            Secure Checkout
          </h1>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Lock className="w-4 h-4" />
            <span className="uppercase tracking-widest font-bold">
              Encrypted Connection
            </span>
          </div>
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
          {/* Left Column - Form */}
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            <div className="bg-obsidian-surface border border-white/5 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-accent text-obsidian flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h2 className="text-2xl font-display font-medium text-white">
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
                      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
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
                      className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
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
                      className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="+234..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
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
                      className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="Street address, apartment, suite, unit, etc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
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
                      className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
                    >
                      Delivery Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      placeholder="Gate code, instructions, etc."
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Method Section Placeholder wrapped in theme */}
            <div className="bg-obsidian-surface border border-white/5 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-accent/10 text-accent border border-accent/20 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h2 className="text-2xl font-display font-medium text-white">
                  Payment Method
                </h2>
              </div>
              <PaymentGatewayUI
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
              />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/50 text-obsidian relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] rounded-full pointer-events-none" />

              <h2 className="text-xl font-display font-bold text-obsidian mb-6 pb-6 border-b border-gray-100 flex items-center justify-between">
                Order Summary
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {cartItems.length} Items
                </span>
              </h2>

              <ul className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-4 text-sm mb-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd className="font-medium">₦{subtotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd
                    className={`font-bold uppercase text-xs tracking-wider ${shipping === 0 ? "text-green-600" : "text-gray-600"}`}
                  >
                    {shipping === 0
                      ? "Free Shipping"
                      : `₦${shipping.toLocaleString()}`}
                  </dd>
                </div>
                <div className="flex justify-between text-obsidian text-lg font-bold border-t border-gray-100 pt-4 mt-4">
                  <dt>Total</dt>
                  <dd className="text-accent">₦{total.toLocaleString()}</dd>
                </div>
              </dl>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className={`w-full py-4 bg-obsidian text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-accent hover:text-white transition-all duration-300 shadow-xl shadow-obsidian/20 flex items-center justify-center gap-2 group ${isSubmitting ? "opacity-75 cursor-wait" : ""}`}
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

              <p className="mt-6 text-[10px] text-center text-gray-400">
                By placing this order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] uppercase font-bold text-white tracking-widest">
                  Secure Packing
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] uppercase font-bold text-white tracking-widest">
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CheckoutPage;

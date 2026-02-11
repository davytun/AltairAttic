import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Zap,
  Cog,
  ShoppingCart,
  Star,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import productsData from "@/data/products.json";
import { Product, useCartStore } from "@/store/useCartStore";
import QuantitySelector from "@/components/cart/QuantitySelector";
import AddToCartModal from "@/components/cart/AddToCartModal";
import { Helmet } from "react-helmet-async";

const calculateTimeLeft = () => {
  const now = new Date();
  const target = new Date();
  target.setHours(17, 0, 0, 0); // 5:00 PM deadline

  // If it's already past 5 PM, target 5 PM tomorrow
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const format = (num: number) => num.toString().padStart(2, "0");
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");

  const addToCart = useCartStore((state) => state.addToCart);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (id) {
      const foundProduct = (productsData as unknown as Product[]).find(
        (p) => p.id === Number(id),
      );
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.images[0]);
      }
    }
  }, [id]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDirectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const orderData = {
        orderNumber: `ORD-${Date.now()}`,
        orderType: "DIRECT_ORDER",
        orderDate: new Date().toISOString(),
        product: {
          productId: product.id,
          productName: product.name,
          quantity: quantity,
          pricePerUnit: product.price,
          subtotal: product.price * quantity,
        },
        customerDetails: formData,
        totalAmount: product.price * quantity,
        status: "pending",
      };

      console.log("Direct Order Placed:", orderData);
      setOrderSuccess(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  const handleAddToCart = () => {
    if (product) {
      // Logic handled in modal mostly, but we trigger it here if needed or just open modal
      // actually the modal takes product and quantity.
      // We can reuse the modal component or just call the store directly and show a toast?
      // The AddToCartModal in components/cart seems to be a self-contained button+modal?
      // Let's check AddToCartModal usage.
      // Previous usage in ProductCard was <AddToCartModal product={product} />
      // Here we want a custom button that opens the modal or potentially just adds to cart.
      // Let's use the store directly for a custom "Add to Cart" button here to match the design.
      addToCart(product, quantity);
      setIsAddToCartModalOpen(true);
    }
  };

  if (!product && id) {
    // If searching/loading.. but for local JSON it's instant.
  }

  if (!product)
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center text-white font-display">
        Product not found
      </div>
    );

  if (orderSuccess) {
    return (
      <main className="bg-obsidian min-h-screen flex flex-col items-center justify-center selection:bg-accent selection:text-obsidian">
        <Navbar />
        <div className="p-4 w-full max-w-lg">
          <div className="bg-obsidian-surface border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl shadow-black/50">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto text-accent border border-accent/20">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white">
              Order Submitted!
            </h2>
            <p className="text-white/60">
              Thank you for your order. Our customer service team will contact
              you shortly to confirm the details.
            </p>
            <div className="pt-4">
              <Link
                to="/products"
                className="block w-full py-4 bg-accent text-obsidian rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-obsidian min-h-screen selection:bg-accent selection:text-obsidian overflow-x-hidden">
      <Helmet>
        <title>{product.name} - Altair Attic</title>
      </Helmet>
      <Navbar />

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white/50 hover:text-accent mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Catalog
        </Link>

        {/* Product Info Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16">
          {/* Image Gallery */}
          <div className="mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square bg-obsidian-surface rounded-3xl overflow-hidden mb-6 border border-white/5 relative group"
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? "border-accent scale-95" : "border-transparent opacity-60 hover:opacity-100 bg-obsidian-surface"}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Tabs */}
          <div>
            {/* Product Header Info */}
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
                  {product.category}
                </span>
                {product.stockDetails?.status === "low" && (
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse">
                    ⚡ Only {product.stock} Left
                  </span>
                )}
                {product.socialProof?.viewingNow && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-400">
                    🔥 {product.socialProof.viewingNow} viewing now
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-display font-medium text-white mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-6">
                <div className="flex items-end gap-3">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-accent">
                    ₦{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-white/30 line-through mb-1">
                      ₦{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="mb-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wide rounded">
                      Save {product.discount.percentage}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-yellow-500 pb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i <= Math.round(product.socialProof?.rating || 0) ? "fill-yellow-500 text-yellow-500" : "text-yellow-500/30"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/40 ml-2 font-mono">
                    ({product.socialProof?.rating || 4.8} /{" "}
                    {product.socialProof?.reviewCount || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Urgency Countdown */}
              {product.shipping?.sameDay && (
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 inline-flex items-center gap-2 mb-6">
                  <div className="shrink-0 animate-pulse w-2 h-2 rounded-full bg-blue-400"></div>
                  <p className="text-sm text-blue-200">
                    Order within{" "}
                    <span className="font-mono font-bold text-white">
                      {timeLeft}
                    </span>{" "}
                    for{" "}
                    <span className="font-bold text-white">
                      Same-Day Dispatch
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-white/10 mb-8">
              <div className="flex gap-8 overflow-x-auto pb-1 custom-scrollbar">
                {["Description", "Benefits", "How to Use", "Offers"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative pb-4 text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? "text-white"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                        />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === "Description" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <p className="text-white/70 text-lg leading-relaxed border-l-2 border-accent/30 pl-6">
                    {product.fullDescription}
                  </p>

                  <div>
                    <h3 className="text-lg font-display font-medium text-white mb-6 flex items-center gap-2">
                      <Cog className="w-5 h-5 text-accent" /> Specifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex flex-col p-4 bg-obsidian-surface rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                          >
                            <dt className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                              {key}
                            </dt>
                            <dd className="text-sm font-medium text-white">
                              {value}
                            </dd>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Benefits" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-display font-medium text-white mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" /> Key Features
                  </h3>
                  <ul className="space-y-4">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-white/80 group p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-4 shrink-0 text-accent">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="mt-1 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "How to Use" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-white/70"
                >
                  <p>
                    Ensure you get the most out of your {product.name} with
                    these simple steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-4 marker:text-accent marker:font-bold">
                    <li className="pl-2">
                      Unbox the device carefully and check for all included
                      components.
                    </li>
                    <li className="pl-2">
                      Connect to a power source or insert batteries as required.
                    </li>
                    <li className="pl-2">
                      Download the companion app from the App Store or Google
                      Play.
                    </li>
                    <li className="pl-2">
                      Follow the in-app instructions to pair your device.
                    </li>
                    <li className="pl-2">
                      Customize your settings and enjoy your new smart home
                      experience!
                    </li>
                  </ol>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-200 text-sm mt-6">
                    Note: For detailed installation instructions, please refer
                    to the included user manual inside the box.
                  </div>
                </motion.div>
              )}

              {activeTab === "Offers" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-linear-to-br from-obsidian-surface to-black border border-white/10 rounded-2xl overflow-hidden p-6 relative">
                    <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider text-center">
                      Buy More, Save More
                    </h3>

                    <div className="grid gap-4">
                      {/* Option 1: Buy 1 */}
                      <div
                        onClick={() => setQuantity(1)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${quantity === 1 ? "border-accent bg-accent/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-white text-lg">
                              Buy 1
                            </h4>
                            <p className="text-sm text-green-400 font-medium">
                              You save ₦{product.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              ₦{product.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-white/40 line-through">
                              ₦{(product.price * 2).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Option 2: Buy 2 (Most Popular) */}
                      <div
                        onClick={() => setQuantity(2)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${quantity === 2 ? "border-accent bg-accent/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                      >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-obsidian text-[10px] font-bold uppercase py-1 px-3 rounded-full tracking-widest shadow-lg shadow-accent/20">
                          Most Popular
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <div>
                            <h4 className="font-bold text-white text-lg">
                              Buy 2
                            </h4>
                            <p className="text-sm text-accent font-medium">
                              Only ₦{product.price.toFixed(2)} per Item
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              ₦{(product.price * 2).toFixed(2)}
                            </div>
                            <div className="text-sm text-white/40 line-through">
                              ₦{(product.price * 4).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Option 3: Buy 3 */}
                      <div
                        onClick={() => setQuantity(3)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${quantity === 3 ? "border-accent bg-accent/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-white text-lg">
                              Buy 3
                            </h4>
                            <p className="text-sm text-green-400 font-medium">
                              You save ₦{(product.price * 3).toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              ₦{(product.price * 3).toFixed(2)}
                            </div>
                            <div className="text-sm text-white/40 line-through">
                              ₦{(product.price * 6).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Integration of Order Form and Cart Actions */}
        <div className="mt-20 pt-16 border-t border-white/5">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
            {/* Direct Order Form (Left) */}
            <div className="lg:col-span-7 mb-12 lg:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">
                    Express Checkout
                  </h2>
                  <p className="text-white/40 text-sm">
                    Directly order this item without creating an account.
                  </p>
                </div>
              </div>

              <div className="bg-obsidian-surface border border-white/5 rounded-3xl p-8">
                <form
                  id="direct-order-form"
                  onSubmit={handleDirectOrder}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="+123..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        rows={3}
                        required
                        value={formData.address}
                        onChange={handleFormChange}
                        className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="Enter full delivery address"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleFormChange}
                        className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleFormChange}
                        className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Note
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={handleFormChange}
                        className="block w-full bg-obsidian border border-white/10 rounded-xl text-white px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary / Actions (Right) */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <div className="bg-obsidian-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-xl font-display font-medium text-white mb-8 border-b border-white/5 pb-4">
                    Action Center
                  </h3>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white line-clamp-1 mb-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-accent">
                        ₦{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                      Quantity
                    </label>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={() => setQuantity((q) => q + 1)}
                      onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                      max={product.stock}
                    />
                  </div>

                  <div className="space-y-4 border-t border-white/5 pt-6 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Subtotal</span>
                      <span className="text-white font-mono">
                        ₦{(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/60">Shipping</span>
                      <span className="text-accent font-mono text-xs uppercase tracking-wider bg-accent/10 px-2 py-1 rounded">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-base font-bold text-white">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-accent font-display">
                        ₦{(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <button
                      type="submit"
                      form="direct-order-form"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 bg-accent text-obsidian font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/20 ${isSubmitting ? "opacity-70 cursor-wait" : ""}`}
                    >
                      {isSubmitting ? "Processing..." : "Submit Order"}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" /> Secure Transaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={() => setIsAddToCartModalOpen(false)}
        product={product}
        initialQuantity={quantity}
      />
      {/* Sticky Mobile Checkout Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-obsidian-surface border-t border-white/10 p-4 lg:hidden z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-white/50 uppercase tracking-wider">
              Total
            </span>
            <span className="text-xl font-bold text-white font-display">
              ₦{(product.price * quantity).toFixed(2)}
            </span>
          </div>
          <button
            type="submit"
            form="direct-order-form"
            disabled={isSubmitting}
            className={`flex-1 py-3 px-6 bg-accent text-obsidian font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-accent/20 ${isSubmitting ? "opacity-70 cursor-wait" : ""}`}
          >
            {isSubmitting ? "Wait..." : "Submit Order"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;

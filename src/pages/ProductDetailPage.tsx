import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductContentSections } from "@/components/product/ProductContentSections";

import { productService } from "@/services/productService";
import { orderService, CreateOrderData } from "@/services/orderService";
import { Product } from "@/store/useCartStore";
import { useViewingCount } from "@/hooks/useProductPageEffects";
import { formatCurrency } from "@/lib/formatCurrency";
import NotFoundPage from "@/pages/NotFoundPage";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "reviews"
  >("description");

  const viewingCount = useViewingCount();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    notes: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const data = await productService.getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const orderData: CreateOrderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: `${formData.address}, ${formData.city}, ${formData.state}`,
        notes: formData.notes,
        items: [{ product_id: product.id, quantity }],
      };

      await orderService.createOrder(orderData);
      setOrderSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Direct Order Failed:", err);
      setError("Failed to place order. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => {
    if (product) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setSelectedImage(
        (prev) => (prev - 1 + product.images.length) % product.images.length,
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-obsidian flex items-center justify-center">
        <Navbar />
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return <NotFoundPage />;
  }

  const totalPrice = product.price * quantity;

  return (
    <>
      <Helmet>
        <title>{product.name} | Altair Attic</title>
        <meta
          name="description"
          content={product.shortDescription?.replace(/<[^>]*>/g, "")}
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-obsidian">
        <Navbar />

        {/* Success Message */}
        <AnimatePresence>
          {orderSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold">
                Order placed successfully! We'll contact you soon.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Modal */}
        <AnimatePresence>
          {showImageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setShowImageModal(false)}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="pt-20 pb-20">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-silk-white/60 hover:text-gray-900 dark:hover:text-accent transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </Link>
          </div>

          {/* Product Hero */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div
                  className="relative aspect-square bg-gray-50 dark:bg-obsidian-surface rounded-2xl overflow-hidden cursor-zoom-in group"
                  onClick={() => setShowImageModal(true)}
                >
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Navigation */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-900 dark:text-white" />
                      </button>
                    </>
                  )}

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1.5 rounded-full font-bold text-sm">
                      -{product.discount.percentage}%
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? "border-accent ring-2 ring-accent/20"
                            : "border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30"
                        }`}
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

              {/* Right: Product Info */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <= Math.round(product.socialProof?.rating ?? 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-silk-white/60">
                    {product.socialProof?.rating ?? 5} (
                    {product.socialProof?.reviewCount ?? 0} reviews)
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3 text-gray-900 dark:text-silk-white">
                    {product.name}
                  </h1>
                  <div
                    className="text-gray-600 dark:text-silk-white/70 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  />
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 py-4 border-y border-gray-200 dark:border-white/10">
                  <span className="text-3xl font-bold text-gray-900 dark:text-accent">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 dark:text-silk-white/40 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Key Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-2.5">
                    {product.features.slice(0, 5).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-silk-white/80 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-3 pt-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-silk-white/60">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-white/20 hover:border-accent dark:hover:border-accent hover:bg-gray-50 dark:hover:bg-accent/10 transition-all flex items-center justify-center text-lg font-semibold text-gray-900 dark:text-silk-white"
                    >
                      −
                    </button>
                    <span className="text-xl font-semibold w-12 text-center text-gray-900 dark:text-silk-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-white/20 hover:border-accent dark:hover:border-accent hover:bg-gray-50 dark:hover:bg-accent/10 transition-all flex items-center justify-center text-lg font-semibold text-gray-900 dark:text-silk-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    const form = document.getElementById("order-form");
                    form?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all transform hover:scale-[1.01] shadow-lg"
                >
                  Order Now — Cash on Delivery
                </button>

                {/* Social Proof */}
                {viewingCount > 0 && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-silk-white/60 bg-orange-50 dark:bg-orange-500/10 px-4 py-3 rounded-lg border border-orange-100 dark:border-orange-500/20">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span>
                      <strong className="text-gray-900 dark:text-silk-white">
                        {viewingCount}
                      </strong>{" "}
                      people viewing right now
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-white/10">
              <div className="flex gap-8 justify-center">
                {[
                  { key: "description", label: "Description" },
                  { key: "features", label: "How to Use" },
                  { key: "reviews", label: "Ingredient" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-4 text-sm font-medium transition-colors relative ${
                      activeTab === tab.key
                        ? "text-gray-900 dark:text-accent"
                        : "text-gray-500 dark:text-silk-white/40 hover:text-gray-700 dark:hover:text-silk-white/70"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="py-12">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-12 max-w-4xl mx-auto"
                >
                  {(product.fullDescription || product.shortDescription) && (
                    <div
                      className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-silk-white/80 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html:
                          product.fullDescription || product.shortDescription,
                      }}
                    />
                  )}
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  {product.howToUse ? (
                    <div
                      className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-silk-white/80 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.howToUse }}
                    />
                  ) : (
                    <div className="space-y-4">
                      {product.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-accent text-sm font-bold">
                              {idx + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-silk-white/80 leading-relaxed">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10"
                        >
                          <div className="flex items-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-white/20"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-silk-white/80 leading-relaxed mb-4">
                            {review.content}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-silk-white/60 font-medium">
                              {review.author}
                            </span>
                            {review.verified && (
                              <span className="text-accent flex items-center gap-1 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-silk-white/40 py-12">
                      No reviews yet
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Content Sections */}
          {product.contentSections && (
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
              <ProductContentSections sections={product.contentSections} />
            </div>
          )}

          {/* Order Form */}
          <div
            id="order-form"
            className="max-w-7xl mx-auto px-6 lg:px-12 mt-20"
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-silk-white">
                  Complete Your Order
                </h2>
                <p className="text-gray-600 dark:text-silk-white/60">
                  Fill in your details for cash on delivery
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-obsidian-surface rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-white/10">
                <form onSubmit={handleDirectOrder} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-silk-white/60">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian border border-gray-300 dark:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-gray-900 dark:text-silk-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-silk-white/60">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian border border-gray-300 dark:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-gray-900 dark:text-silk-white"
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-silk-white/60">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian border border-gray-300 dark:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-gray-900 dark:text-silk-white"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-silk-white/60">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian border border-gray-300 dark:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors resize-none text-gray-900 dark:text-silk-white"
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-silk-white/60">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian border border-gray-300 dark:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-gray-900 dark:text-silk-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-silk-white/60">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian border border-gray-300 dark:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors text-gray-900 dark:text-silk-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-silk-white/60">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleFormChange}
                        rows={2}
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-obsidian border border-gray-300 dark:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-colors resize-none text-gray-900 dark:text-silk-white"
                        placeholder="Any special instructions?"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
                      <X className="w-5 h-5 shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 space-y-3 border border-gray-200 dark:border-white/10">
                    <div className="flex justify-between text-gray-700 dark:text-silk-white/70">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900 dark:text-silk-white">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-silk-white/70">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-500">Free</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-white/10 pt-3 flex justify-between items-baseline">
                      <span className="text-lg font-bold text-gray-900 dark:text-silk-white">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-accent">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-accent text-white font-bold rounded-xl transition-all transform hover:scale-[1.01] shadow-lg ${
                      isSubmitting
                        ? "opacity-70 cursor-wait"
                        : "hover:bg-accent/90"
                    }`}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : "Place Order — Cash on Delivery"}
                  </button>

                  <p className="text-center text-sm text-gray-500 dark:text-silk-white/40">
                    <CheckCircle2 className="w-4 h-4 inline mr-1" />
                    Your information is secure and will never be shared
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetailPage;

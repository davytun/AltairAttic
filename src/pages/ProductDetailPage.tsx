import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Star,
  ShieldCheck,
  ArrowRight,
  Plus,
  Minus,
  Truck,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductContentSections } from "@/components/product/ProductContentSections";

import { productService } from "@/services/productService";
import { orderService, CreateOrderData } from "@/services/orderService";
import { Product, useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { NIGERIAN_STATES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/pages/NotFoundPage";

const DEFAULT_CONTENT_SECTIONS = [
  {
    type: "image_text" as const,
    order: 1,
    heading: "Quality Selection",
    text: "At Altair Attic, we focus on providing high-quality handles and hardware that balance modern style with everyday reliability. Every item is carefully inspected to ensure it meets our standards for durability and design.",
    image_url:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    layout: "side_by_side" as const,
  },
  {
    type: "rich_text" as const,
    order: 2,
    heading: "Durable and Reliable",
    body: "Our hardware is built for long-term use. We ensure that every 'Signature Series' item is tested for material strength and mechanical performance, so your investment stays in perfect condition for years to come.",
  },
];

const DEFAULT_REVIEWS = [
  {
    id: 101,
    author: "Engr. Kunle Sowemimo",
    verified: true,
    rating: 5,
    date: "2 weeks ago",
    title: "Masterclass in Sourcing",
    content:
      "The level of detail in the finishing is something I haven't seen in local markets. Altair truly understands what 'Premium' means in a Nigerian context.",
    helpfulVotes: 12,
  },
  {
    id: 102,
    author: "Arc. Amaka Uzor",
    verified: true,
    rating: 5,
    date: "1 month ago",
    title: "Project Essential",
    content:
      "I've started recommending the Altair archive to all my luxury residential clients. Their quality control is the gold standard.",
    helpfulVotes: 8,
  },
  {
    id: 103,
    author: "Dr. Olamide Bankole",
    verified: true,
    rating: 5,
    date: "3 weeks ago",
    title: "Exceptional Service",
    content:
      "The delivery was swift and the product exceeded my expectations. It’s rare to find hardware that feels this substantial and well-made.",
    helpfulVotes: 5,
  },
  {
    id: 104,
    author: "Chief Emeka Nnadi",
    verified: true,
    rating: 5,
    date: "2 months ago",
    title: "Architectural Quality",
    content:
      "We used these for our head office renovation in Victoria Island. They add a level of sophistication that is hard to find elsewhere in Lagos.",
    helpfulVotes: 15,
  },
  {
    id: 105,
    author: "Fatima Yusuf",
    verified: true,
    rating: 5,
    date: "5 days ago",
    title: "Beautiful Finish",
    content:
      "The satin brass finish is stunning. It transformed our kitchen cabinets completely. Highly recommend for any home upgrade.",
    helpfulVotes: 3,
  },
];

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItems = useCartStore((state) => state.cartItems);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    state: "",
    city: "",
    notes: "",
  });

  const scrollToOrderForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isCurrentProductInCart = product
    ? cartItems.some((item) => item.id === product.id)
    : false;

  const cartQuantityForProduct = product
    ? (cartItems.find((item) => item.id === product.id)?.quantity ?? 0)
    : 0;

  const orderFormQuantity = isCurrentProductInCart ? cartQuantityForProduct : quantity;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const data = await productService.getProductBySlug(slug);

        // Ensure page looks "Full" by adding fallbacks if backend is thin
        const enrichedData = {
          ...data,
          contentSections: data.contentSections?.length
            ? data.contentSections
            : DEFAULT_CONTENT_SECTIONS,
          reviews: data.reviews?.length ? data.reviews : DEFAULT_REVIEWS,
        };

        setProduct(enrichedData);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const updateFloatingCTA = () => {
      if (isCurrentProductInCart) {
        setShowFloatingCTA(false);
        return;
      }

      const heroTop = heroRef.current?.offsetTop ?? 0;
      setShowFloatingCTA(window.scrollY >= Math.max(0, heroTop - 140));
    };

    updateFloatingCTA();
    window.addEventListener("scroll", updateFloatingCTA);
    return () => window.removeEventListener("scroll", updateFloatingCTA);
  }, [isCurrentProductInCart, product?.id]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderQuantityChange = (delta: number) => {
    if (!product) return;
    if (isCurrentProductInCart) {
      const next = cartQuantityForProduct + delta;
      if (next < 1) updateQuantity(product.id, 0);
      else updateQuantity(product.id, next);
    } else {
      setQuantity((q) => Math.max(1, q + delta));
    }
  };

  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);

    try {
      const orderData: CreateOrderData = {
        product_id: product.id,
        quantity: orderFormQuantity,
        name: formData.fullName.trim(),
        phone: formData.phone,
        address: formData.address,
        city: formData.city || "Lagos",
        state: formData.state,
        whatsapp: formData.whatsapp || undefined,
        email: formData.email || undefined,
        notes: formData.notes || undefined,
      };

      await orderService.createOrder(orderData);
      setOrderSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => navigate("/shop"), 6000);
    } catch (err: any) {
      console.error("Order Failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    setIsAddingToCart(true);
    addToCart(product, quantity);
    setShowFloatingCTA(false);
    setTimeout(() => setIsAddingToCart(false), 1200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-obsidian text-silk-white selection:bg-accent selection:text-obsidian min-h-screen font-sans transition-colors duration-500">
      <Helmet>
        <title>{product.name} — Technical Excellence | Altair Attic</title>
      </Helmet>
      <Navbar />

      <main className="relative overflow-x-hidden pt-20 bg-obsidian text-silk-white">
        <AnimatePresence>
          {orderSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-200 bg-obsidian/95 backdrop-blur-3xl flex items-center justify-center p-6 text-center"
            >
              <div className="max-w-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  <CheckCircle2
                    size={100}
                    className="text-accent mx-auto mb-8"
                  />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-silk-white">
                  Order Placed
                </h2>
                <p className="text-xl text-text-muted mb-12">
                  Thank you for your order. Our team will contact you via
                  WhatsApp shortly to confirm the delivery details.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-10 py-4 bg-accent text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-accent/90 transition-all shadow-xl"
                >
                  Return to Shop
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FLOATING CTA: IMMERSIVE ACTION BAR */}
        <AnimatePresence>
          {showFloatingCTA && !isCurrentProductInCart && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-8 left-4 right-4 lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 lg:w-fit z-50 pointer-events-none"
            >
              <div className="bg-obsidian/80 backdrop-blur-3xl border border-accent/20 rounded-[28px] lg:rounded-full p-1.5 lg:pl-8 lg:pr-1.5 flex items-center justify-between gap-4 lg:gap-12 shadow-2xl lg:min-w-[550px] pointer-events-auto max-w-[500px] mx-auto lg:max-w-none border-border-dim/50">
                <div className="hidden lg:flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={product.images[0]}
                      className="w-8 h-8 object-contain"
                      alt={product.name}
                    />
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-accent mb-0.5">
                      Selected Item
                    </div>
                    <div className="text-base font-display font-bold text-silk-white leading-none">
                      {formatCurrency(product.price * quantity)}
                      {quantity > 1 && (
                        <span className="text-xs text-text-muted ml-2">
                          ({quantity} Items)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:hidden flex flex-col pl-4 min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-accent truncate mb-0.5">
                    {product.name}
                  </div>
                  <div className="text-base font-display font-bold text-silk-white">
                    {formatCurrency(product.price * quantity)}
                  </div>
                </div>
                <button
                  onClick={scrollToOrderForm}
                  className="bg-accent text-white h-12 lg:h-14 px-6 lg:px-10 rounded-xl lg:rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-3 hover:bg-accent/90 transition-all active:scale-95 group shrink-0 shadow-lg shadow-accent/20"
                >
                  <span>Order Now</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform hidden sm:block"
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="relative py-12 lg:py-16 border-b border-border-dim"
        >
          <div className="container-luxury relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Image Matrix */}
              <div className="space-y-6 lg:sticky lg:top-32">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative aspect-square rounded-[24px] lg:rounded-[40px] bg-obsidian-surface border border-border-dim p-8 flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--color-brand-dim),transparent_70%)] opacity-50" />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      src={product.images[selectedImage]}
                      className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-1000"
                      alt={product.name}
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Technical Thumbnails */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 lg:gap-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        "aspect-square rounded-xl lg:rounded-2xl border transition-all p-2 bg-obsidian-surface backdrop-blur-xl relative group overflow-hidden",
                        selectedImage === i
                          ? "border-accent ring-1 ring-accent/30 shadow-lg scale-105"
                          : "border-border-dim opacity-50 hover:opacity-100",
                      )}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-contain"
                        alt="Hardware detail"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Identity & Configuration */}
              <div className="space-y-10 lg:space-y-16">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                      In Stock
                    </div>
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          fill="currentColor"
                          className="text-yellow-400"
                        />
                        <span className="text-sm font-medium text-silk-white">
                          {(
                            product.reviews.reduce(
                              (acc, r) => acc + (r.rating || 0),
                              0,
                            ) / product.reviews.length
                          ).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6 text-silk-white">
                    {product.name}
                  </h1>

                  <p className="text-base lg:text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
                    {product.shortDescription ||
                      "A distinctive piece selected for its quality and character."}
                  </p>
                </motion.div>

                <div className="p-6 lg:p-10 rounded-3xl bg-obsidian-surface border border-border-dim space-y-8">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-text-muted mb-1">
                        Price
                      </div>
                      <div className="text-3xl lg:text-4xl font-display font-bold text-silk-white tabular-nums">
                        {formatCurrency(product.price)}
                      </div>
                    </div>
                    {product.originalPrice && (
                      <div className="text-right">
                        <div className="text-sm text-text-muted line-through tabular-nums">
                          {formatCurrency(product.originalPrice)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Standard Trust Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-obsidian-muted border border-border-dim">
                      <ShieldCheck className="text-accent shrink-0" size={20} />
                      <div className="text-xs font-medium text-light-gray">
                        2-Year Warranty
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-obsidian-muted border border-border-dim">
                      <Truck className="text-accent shrink-0" size={20} />
                      <div className="text-xs font-medium text-light-gray">
                        Free Shipping
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={scrollToOrderForm}
                      className="w-full h-14 bg-accent text-white rounded-xl font-bold uppercase tracking-wide text-sm hover:bg-accent/90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-accent/20 group"
                    >
                      Order Now
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className={cn(
                        "w-full h-12 rounded-xl font-bold uppercase tracking-wide text-xs transition-all active:scale-[0.98] border",
                        isAddingToCart
                          ? "bg-green-500/15 text-green-400 border-green-500/40"
                          : "bg-obsidian-muted text-silk-white border-border-dim hover:border-accent/40 hover:text-accent",
                      )}
                    >
                      {isAddingToCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                    <div className="text-center text-xs text-text-muted">
                      Dispatched within 24 hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PRODUCT SPECIFICATIONS */}
        <section className="py-16 lg:py-24 relative border-b border-border-dim">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-silk-white mb-6">
                  Product Details
                </h2>
                <p className="text-sm lg:text-base text-text-muted leading-relaxed max-w-sm">
                  Technical specifications and material details for this
                  component.
                </p>
              </div>

              <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-border-dim bg-obsidian-surface">
                {product.specifications &&
                  Object.entries(product.specifications).map(
                    ([key, value], idx, arr) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-2 p-5 ${idx !== arr.length - 1
                            ? "border-b border-border-dim"
                            : ""
                          }`}
                      >
                        <dt className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                          {key}
                        </dt>
                        <dd className="text-sm lg:text-base font-medium text-silk-white text-right sm:text-left">
                          {String(value)}
                        </dd>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: NARRATIVE CONTENT */}
        {product.contentSections && (
          <section className="py-16 lg:py-24 bg-obsidian-surface border-b border-border-dim">
            <div className="container-luxury">
              <ProductContentSections sections={product.contentSections} />
            </div>
          </section>
        )}

        {/* SECTION 4: SOCIAL PROOF GRID */}
        <section className="py-12 lg:py-24 relative bg-obsidian border-t border-border-dim">
          <div className="container-luxury">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl lg:text-4xl font-display font-bold text-silk-white">
                Client Reviews
              </h2>
              <div className="flex items-center gap-2">
                <Star size={16} fill="currentColor" className="text-accent" />
                <span className="text-lg font-bold text-silk-white">4.9/5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(product.reviews || []).map((review: any, i) => (
                <div
                  key={i}
                  className="p-6 lg:p-8 rounded-2xl bg-obsidian-surface border border-border-dim"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating || 5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        fill="currentColor"
                        className="text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm lg:text-base text-text-muted leading-relaxed mb-6">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-silk-white uppercase tracking-wide">
                        {review.author}
                      </div>
                      <div className="text-[10px] text-text-muted">
                        Verified Buyer
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: ORDER FORM */}
        <section
          ref={formRef}
          className="py-16 lg:py-24 relative overflow-hidden"
        >
          <div className="container-luxury relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-silk-white mb-4">
                  Order Information
                </h2>
                <p className="text-sm text-text-muted">
                  Please provide your contact and delivery details below to
                  complete your order.
                </p>
              </div>

              <div className="p-6 lg:p-10 bg-obsidian-surface backdrop-blur-3xl rounded-3xl border border-border-dim">
                <form onSubmit={handleDirectOrder} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        Full Name
                      </label>
                      <input
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder="Your Name"
                        className="w-full h-12 bg-obsidian-surface border border-border-dim rounded-xl px-4 outline-none focus:border-accent transition-colors text-sm text-silk-white placeholder:text-text-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        Phone Number
                      </label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+234..."
                        className="w-full h-12 bg-obsidian-surface border border-border-dim rounded-xl px-4 outline-none focus:border-accent transition-colors text-sm text-silk-white placeholder:text-text-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        WhatsApp Number
                      </label>
                      <input
                        required
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleFormChange}
                        placeholder="+234..."
                        className="w-full h-12 bg-obsidian-surface border border-border-dim rounded-xl px-4 outline-none focus:border-accent transition-colors text-sm text-silk-white placeholder:text-text-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                        className="w-full h-12 bg-obsidian-surface border border-border-dim rounded-xl px-4 outline-none focus:border-accent transition-colors text-sm text-silk-white placeholder:text-text-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        City
                      </label>
                      <input
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        placeholder="e.g. Lekki"
                        className="w-full h-12 bg-obsidian border border-border-dim rounded-xl px-4 outline-none focus:border-accent transition-colors text-sm text-silk-white"
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        State
                      </label>
                      <select
                        required
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                        className="w-full h-12 bg-obsidian border border-border-dim rounded-xl px-4 outline-none appearance-none cursor-pointer focus:border-accent text-sm text-silk-white"
                      >
                        <option value="">Select Region</option>
                        {NIGERIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 bottom-4 pointer-events-none opacity-40">
                        <ArrowRight className="rotate-90 w-3 h-3 text-silk-white" />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        Delivery Address
                      </label>
                      <textarea
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        rows={3}
                        placeholder="Full street address..."
                        className="w-full bg-obsidian-surface border border-border-dim rounded-xl p-4 outline-none focus:border-accent transition-colors resize-none text-sm text-silk-white placeholder:text-text-muted"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">
                        Notes
                      </label>
                      <textarea
                        required
                        name="notes"
                        value={formData.notes}
                        onChange={handleFormChange}
                        rows={3}
                        placeholder="Notes..."
                        className="w-full bg-obsidian border border-border-dim rounded-xl p-4 outline-none focus:border-accent transition-colors resize-none text-sm text-silk-white"
                      />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border-dim flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center sm:items-start gap-2">
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Quantity
                      </div>
                      <div className="flex items-center gap-4 bg-obsidian-surface border border-border-dim p-2 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleOrderQuantityChange(-1)}
                          className="w-8 h-8 rounded-lg bg-obsidian-surface hover:bg-obsidian-muted flex items-center justify-center text-silk-white transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-lg font-display font-bold text-silk-white w-8 text-center tabular-nums">
                          {orderFormQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOrderQuantityChange(1)}
                          className="w-8 h-8 rounded-lg bg-obsidian-surface hover:bg-obsidian-muted flex items-center justify-center text-silk-white transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 w-full sm:w-auto">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-16 bg-accent text-white rounded-2xl font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-4 hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            Confirm Order <ArrowRight />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .h-18 { height: 3.5rem; }
        @media (min-width: 1024px) { .h-18 { height: 4.5rem; } }
        .text-huge { font-size: clamp(2rem, 5vw, 4rem); font-family: var(--font-display); line-height: 1.1; font-weight: 700; }
        .text-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: var(--color-accent); }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;

import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Star,
  X,
  Zap,
  ShieldCheck,
  Truck,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  ShoppingCart,
  Users,
  Eye,
  Lock,
  Minus,
  Plus,
  Clock,
  Smartphone,
  Info,
  ZapOff,
  ChevronDown,
  ThumbsUp,
  Award,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductContentSections } from "@/components/product/ProductContentSections";

import { productService } from "@/services/productService";
import { orderService, CreateOrderData } from "@/services/orderService";
import { useCartStore, Product } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { NIGERIAN_STATES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/pages/NotFoundPage";

const SMART_SWITCH_MODELS = [
  {
    id: "2-gang",
    name: "2-Gang WiFi Switch",
    price: 25000,
    desc: "Independent control for two circuits. Perfect for bedrooms.",
    img: "/assets/smart-switches/1.jpg",
  },
  {
    id: "3-gang",
    name: "3-Gang WiFi Switch",
    price: 32000,
    desc: "Our gold standard. Ideal for living rooms and kitchens.",
    img: "/assets/smart-switches/2.jpg",
  },
  {
    id: "4-gang",
    name: "4-Gang WiFi Switch",
    price: 40000,
    desc: "The Command Center. Maximum flexibility for master lounges.",
    img: "/assets/smart-switches/3.jpg",
  },
];

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedModel, setSelectedModel] = useState(SMART_SWITCH_MODELS[1]);

  const addToCart = useCartStore((state) => state.addToCart);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    // If it's a smart switch, we use the selected model price/name
    const cartProduct =
      slug === "smart-wifi-switch"
        ? {
            ...product,
            price: selectedModel.price,
            name: `${product.name} (${selectedModel.name})`,
          }
        : product;

    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
    setTimeout(() => setIsAdding(false), 2000);
  };

  const handleDirectOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);

    try {
      const orderData: CreateOrderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: `${formData.address}, ${formData.city}, ${formData.state} State`,
        notes: `FUNNEL ORDER. ${slug === "smart-wifi-switch" ? `Model: ${selectedModel.name}. ` : ""}WhatsApp: ${formData.whatsapp}. ${formData.notes}`,
        items: [{ product_id: product.id, quantity }],
      };

      await orderService.createOrder(orderData);
      setOrderSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => navigate("/shop"), 6000);
    } catch (err: any) {
      console.error("Direct Order Failed:", err);
    } finally {
      setIsSubmitting(false);
    }
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

  const isFunnel = product.template === "funnel";
  const isSmartSwitch = slug === "smart-wifi-switch";

  return (
    <div className="bg-obsidian text-silk-white selection:bg-accent selection:text-obsidian min-h-screen font-sans">
      <Helmet>
        <title>{product.name} — Control Your World | Altair Attic</title>
      </Helmet>
      <Navbar />

      {isFunnel ? (
        <main className="relative overflow-x-hidden">
          <AnimatePresence>
            {orderSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-3xl flex items-center justify-center p-6 text-center"
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
                  <h2 className="text-5xl font-display font-black uppercase mb-4 text-white leading-[0.85]">
                    Lead <br />
                    <span className="text-accent">Synchronized.</span>
                  </h2>
                  <p className="text-xl text-text-muted mb-12 font-light">
                    Your hardware allocation request has been received. Our
                    implementation team will contact you via WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => navigate("/shop")}
                    className="px-12 py-5 bg-white text-obsidian rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-transform"
                  >
                    Back to Catalog
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO */}
          <section className="relative min-h-screen flex flex-col justify-center py-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-linear-to-b from-obsidian/40 via-obsidian/80 to-obsidian z-10" />
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 2 }}
                src={isSmartSwitch ? selectedModel.img : product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[150px] rounded-full animate-pulse" />
            </div>

            <div className="container-luxury relative z-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="aspect-square rounded-[64px] bg-white/[0.03] border border-white/10 p-12 flex items-center justify-center relative group overflow-hidden">
                    <img
                      src={
                        isSmartSwitch
                          ? selectedModel.img
                          : product.images[selectedImage]
                      }
                      className="w-full h-full object-contain drop-shadow-3xl transform group-hover:scale-105 transition-transform duration-1000"
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-accent/5 blur-[80px] rounded-full scale-50" />
                  </div>
                  {!isSmartSwitch && (
                    <div className="flex gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={cn(
                            "w-20 h-20 rounded-2xl border transition-all shrink-0",
                            selectedImage === i
                              ? "border-accent bg-accent/10"
                              : "border-white/5 bg-white/5 opacity-50",
                          )}
                        >
                          <img
                            src={img}
                            className="w-full h-full object-contain p-2"
                            alt="thumb"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex text-accent gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-silk-white/40">
                      Highly Rated in Nigeria
                    </span>
                  </div>

                  <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-black leading-[0.9] uppercase tracking-tighter mb-8">
                    {product.name} <br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-blue-400 to-accent animate-gradient">
                      Elite Automation
                    </span>
                  </h1>

                  {isSmartSwitch && (
                    <div className="grid grid-cols-3 gap-4 mb-12">
                      {SMART_SWITCH_MODELS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model)}
                          className={cn(
                            "p-4 rounded-2xl border text-center transition-all",
                            selectedModel.id === model.id
                              ? "border-accent bg-accent/10"
                              : "border-white/10 bg-white/5 opacity-60",
                          )}
                        >
                          <div className="text-[10px] font-black uppercase tracking-tight mb-1">
                            {model.id}
                          </div>
                          <div className="text-sm font-black text-accent">
                            {formatCurrency(model.price)}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-8 mb-12">
                    <span className="text-5xl font-display font-black text-accent">
                      {formatCurrency(
                        isSmartSwitch ? selectedModel.price : product.price,
                      )}
                    </span>
                    {product.originalPrice && (
                      <span className="text-2xl text-silk-white/20 line-through decoration-red-500/50">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-6 mb-12">
                    {[
                      { icon: Truck, text: "Express Delivery (Lagos/Abuja)" },
                      { icon: ShieldCheck, text: "Best in Nigeria Warranty" },
                      { icon: Lock, text: "Secure Hardware Synchronization" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 text-silk-white/60"
                      >
                        <item.icon size={20} className="text-accent" />
                        <span className="text-xs uppercase font-black tracking-[0.2em]">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      document
                        .getElementById("funnel-form")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-full h-20 bg-accent text-obsidian rounded-2xl font-display font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(0,159,255,0.4)]"
                  >
                    Secure Your Unit Now
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* BENEFIT CARDS */}
          <section className="py-32 bg-obsidian-surface border-y border-white/5">
            <div className="container-luxury">
              <div className="max-w-4xl mx-auto text-center mb-24">
                <h2 className="text-huge mb-6">
                  Why You'll <br />
                  <span className="text-accent underline underline-offset-[16px] decoration-accent/20">
                    Love It.
                  </span>
                </h2>
                <p className="text-2xl text-text-muted font-light leading-relaxed">
                  The hardware upgrade your home has been waiting for. Precision
                  engineered for the modern lifestyle.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    icon: ThumbsUp,
                    title: "Effortless Control",
                    desc: "No more manual checking. Everything is accessible from your palm, anywhere in the world.",
                  },
                  {
                    icon: Zap,
                    title: "Energy Efficient",
                    desc: "Slash up to 30% off your monthly electricity bills with automated logic and scheduling.",
                  },
                  {
                    icon: Award,
                    title: "Elite Durability",
                    desc: "Built with premium fire-retardant materials and stress-tested for 110V-240V grids.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-12 rounded-[48px] bg-white/[0.03] border border-white/5 hover:border-accent/30 transition-all group"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center text-accent mb-10 group-hover:scale-110 transition-transform">
                      <item.icon size={40} />
                    </div>
                    <h3 className="text-2xl font-display font-black uppercase mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-lg text-text-muted font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTENT SECTIONS */}
          <section className="py-64 relative">
            <div className="container-luxury">
              {product.contentSections && (
                <div className="space-y-64">
                  <ProductContentSections sections={product.contentSections} />
                </div>
              )}
            </div>
          </section>

          {/* COMPARISON TABLE */}
          <section className="py-48 bg-obsidian-surface">
            <div className="container-luxury">
              <div className="text-center mb-32">
                <h2 className="text-huge mb-6 text-accent italic">
                  The Difference.
                </h2>
                <p className="text-text-muted uppercase font-black tracking-widest text-xs">
                  Unmatched quality engineered for the Nigerian market.
                </p>
              </div>
              <div className="max-w-5xl mx-auto rounded-[64px] border border-white/10 bg-black/40 overflow-hidden shadow-3xl">
                <div className="grid grid-cols-2 md:grid-cols-3 border-b border-white/10">
                  <div className="p-10 text-[10px] uppercase font-black tracking-widest text-white/30 flex items-end">
                    Feature Set
                  </div>
                  <div className="p-10 text-center bg-accent/10 border-x border-white/10">
                    <div className="text-accent font-display font-black text-2xl uppercase italic">
                      Altair Attic
                    </div>
                    <div className="text-[8px] uppercase font-black tracking-widest text-accent/60 mt-2">
                      Premium Experience
                    </div>
                  </div>
                  <div className="p-10 text-center hidden md:flex flex-col justify-end">
                    <div className="text-white/40 font-display font-black text-xl uppercase">
                      Others
                    </div>
                    <div className="text-[8px] uppercase font-black tracking-widest text-white/20 mt-2">
                      Standard Hardware
                    </div>
                  </div>
                </div>
                {[
                  {
                    f: "Relay Safety",
                    a: "Latching Relay (Cold)",
                    o: "Cheap Relay (Heats up)",
                  },
                  {
                    f: "Installation",
                    a: "No Capacitor Needed",
                    o: "Capacitor needed",
                  },
                  {
                    f: "App Stability",
                    a: "Zero Latency Sync",
                    o: "Frequent Drops",
                  },
                  {
                    f: "Power Ready",
                    a: "Surge Hardened",
                    o: "Voltage Sensitive",
                  },
                  {
                    f: "Warranty",
                    a: "2 Years Replacement",
                    o: "None / 3 Months",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 md:grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="p-10 font-black uppercase text-xs tracking-widest leading-none flex items-center">
                      {row.f}
                    </div>
                    <div className="p-10 text-center bg-accent/5 border-x border-white/5 text-accent font-bold">
                      <span className="flex items-center justify-center gap-3">
                        <CheckCircle2 size={16} /> {row.a}
                      </span>
                    </div>
                    <div className="p-10 text-center hidden md:flex items-center justify-center text-white/20 text-xs uppercase tracking-widest lead-none italic font-light">
                      {row.o}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="py-48 bg-obsidian">
            <div className="container-luxury">
              <div className="text-center mb-32">
                <h2 className="text-huge mb-6">Obsessed Results.</h2>
                <div className="flex flex-col items-center gap-4">
                  <div className="text-6xl font-display font-black text-white leading-none">
                    4.9/5
                  </div>
                  <div className="flex text-accent gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={24} fill="currentColor" />
                    ))}
                  </div>
                  <div className="text-xs uppercase font-black tracking-[0.4em] text-white/30">
                    From 1,200+ Smart Homes in Lagos & Abuja
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    u: "Chinedu O.",
                    d: "Lagos, NG",
                    r: "Installation was a breeze. No more fighting with my wife about who goes down to turn off the lights at midnight. Best upgrade so far!",
                    s: 5,
                  },
                  {
                    u: "Amina A.",
                    d: "Abuja, NG",
                    r: "The app is super responsive. I love that I can set timers for my porch lights. Saved me a lot on NEPA bills this month.",
                    s: 5,
                  },
                  {
                    u: "Tunde E.",
                    d: "Lekki, NG",
                    r: "The design is very premium. Fits my living room perfectly. Delivery to Lekki took only 4 hours. Incredible service.",
                    s: 5,
                  },
                  {
                    u: "Emeka K.",
                    d: "Enugu, NG",
                    r: "Finally a smart switch that doesn't burn out with Nigerian power. The relay technology really works. Highly recommended.",
                    s: 5,
                  },
                ].map((review, i) => (
                  <div
                    key={i}
                    className="p-12 rounded-[56px] bg-white/[0.03] border border-white/10 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                      <MessageCircle size={80} className="text-accent" />
                    </div>
                    <div className="flex gap-1 mb-8">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <Star
                          key={j}
                          size={14}
                          className={
                            j <= review.s ? "text-accent" : "text-white/10"
                          }
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-light text-silk-white/80 leading-relaxed mb-10 italic">
                      "{review.r}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center font-display font-black text-accent text-xl">
                        {review.u[0]}
                      </div>
                      <div>
                        <div className="font-black uppercase tracking-widest text-sm">
                          {review.u}
                        </div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-accent/60 mt-1">
                          {review.d}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FORM */}
          <section
            id="funnel-form"
            className="py-64 bg-obsidian-surface relative"
          >
            <div className="container-luxury relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24">
                  <h2 className="text-[clamp(3rem,10vw,7.5rem)] font-display font-black uppercase leading-[0.8] mb-8 italic">
                    The Sync-Lock.
                  </h2>
                  <p className="text-2xl text-text-muted font-light max-w-2xl mx-auto italic">
                    Enroll your home address below to synchronize your order
                    lead with our logistics hub.
                  </p>
                </div>
                <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[64px] border border-white/5 overflow-hidden shadow-3xl p-8 md:p-16">
                  <form
                    onSubmit={handleDirectOrder}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-24"
                  >
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase font-black tracking-widest text-white/30 ml-4 italic">
                            Identity Proof
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleFormChange}
                            placeholder="Enter Full Name"
                            className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none placeholder:text-white/10 transition-all font-display"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase font-black tracking-widest text-white/30 ml-4 italic">
                            Synchronization Terminal
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="Enter Email Address"
                            className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none placeholder:text-white/10 transition-all font-display"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase font-black tracking-widest text-white/30 ml-4 italic">
                              Contact Line
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleFormChange}
                              placeholder="+234..."
                              className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none placeholder:text-white/10 transition-all font-display"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase font-black tracking-widest text-white/30 ml-4 italic">
                              WhatsApp Direct
                            </label>
                            <input
                              type="tel"
                              name="whatsapp"
                              required
                              value={formData.whatsapp}
                              onChange={handleFormChange}
                              placeholder="+234..."
                              className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none placeholder:text-white/10 transition-all font-display"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase font-black tracking-widest text-white/30 ml-4 italic">
                              Logistics Hub (City)
                            </label>
                            <input
                              type="text"
                              name="city"
                              required
                              value={formData.city}
                              onChange={handleFormChange}
                              placeholder="e.g. Lagos"
                              className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none placeholder:text-white/10 transition-all font-display"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase font-black tracking-widest text-white/30 ml-4 italic">
                              Regional Sector
                            </label>
                            <select
                              name="state"
                              required
                              value={formData.state}
                              onChange={handleFormChange}
                              className="w-full h-20 bg-obsidian-surface border border-white/10 rounded-2xl px-8 text-white focus:border-accent outline-none appearance-none cursor-pointer custom-select transition-all font-display"
                            >
                              <option value="">Select State</option>
                              {NIGERIAN_STATES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase font-black tracking-widest text-white/30 ml-4 italic">
                            Deployment Hub (Full Address)
                          </label>
                          <textarea
                            name="address"
                            required
                            rows={2}
                            value={formData.address}
                            onChange={handleFormChange}
                            placeholder="Enter your full street address..."
                            className="w-full bg-obsidian-surface border border-white/10 rounded-2xl px-8 py-6 text-white focus:border-accent outline-none placeholder:text-white/10 transition-all resize-none font-display"
                          />
                        </div>
                        <div className="flex items-center gap-8 py-8 px-10 bg-accent/5 border border-accent/20 rounded-3xl">
                          <span className="text-[10px] uppercase font-black tracking-widest text-accent italic">
                            Units Allocation
                          </span>
                          <div className="flex items-center border border-accent/30 rounded-2xl overflow-hidden h-14 bg-obsidian">
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                              }
                              className="w-16 h-full hover:bg-white/5 transition-colors text-accent"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="w-16 text-center font-display font-black text-2xl text-accent">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(quantity + 1)}
                              className="w-16 h-full hover:bg-white/5 transition-colors text-accent"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-24 bg-accent text-obsidian rounded-3xl font-display font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(0,159,255,0.4)] disabled:opacity-50 group"
                        >
                          {isSubmitting ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Synchronize Order Lead"
                          )}
                          <ArrowRight
                            size={24}
                            className="group-hover:translate-x-2 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-48 bg-obsidian-surface border-t border-white/5">
            <div className="container-luxury max-w-4xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-huge mb-6 text-accent italic">
                  The Dossier.
                </h2>
                <p className="text-text-muted uppercase font-black tracking-widest text-xs">
                  Everything you need to verify before the hardware upgrade.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    q: "Is it safe for Nigeria's voltage?",
                    a: "Yes. Our hardware is stress-tested for 110V-240V and has built-in surge protection. We use fire-retardant PC materials and tempered glass that withstand high temperatures.",
                  },
                  {
                    q: "Do I need to rewire my house?",
                    a: "No. These switches fit standard Nigerian 86mm gang boxes. They support both Neutral and No-Neutral wiring methods. You just swap the switch.",
                  },
                  {
                    q: "What if my WiFi goes down?",
                    a: "The switches have physical glass touch buttons. They work exactly like regular manual switches when offline. You only need WiFi for the App and Voice features.",
                  },
                  {
                    q: "Do you provide installation?",
                    a: "We provide detailed step-by-step video guides. For larger projects in Lagos or Abuja, we have a network of certified smart-home installers available.",
                  },
                ].map((item, i) => (
                  <details
                    key={i}
                    className="group bg-obsidian rounded-[40px] border border-white/5 overflow-hidden transition-all duration-500 open:bg-white/[0.05]"
                  >
                    <summary className="p-12 pl-14 flex justify-between items-center cursor-pointer list-none">
                      <span className="text-2xl font-display font-black uppercase tracking-tight pr-8">
                        {item.q}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent group-open:rotate-180 transition-transform">
                        <ChevronDown size={24} />
                      </div>
                    </summary>
                    <div className="px-14 pb-12 text-xl text-text-muted font-light leading-relaxed antialiased italic">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* RETAIL LAYOUT */
        <main className="pt-48 pb-32">
          <div className="container-luxury">
            <div className="flex items-center gap-3 mb-16 text-[10px] uppercase font-black tracking-[0.4em] text-silk-white/40">
              <Link
                to="/shop"
                className="hover:text-accent transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={12} /> Catalog
              </Link>
              <div className="w-8 h-px bg-white/10" />
              <span className="text-silk-white/60">{product.category}</span>
              <div className="w-8 h-px bg-white/10" />
              <span className="text-accent">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
              <div className="space-y-8">
                <motion.div
                  layoutId="main-product-image"
                  className="aspect-square rounded-[64px] bg-white/5 border border-white/5 overflow-hidden group relative flex items-center justify-center p-20"
                >
                  <img
                    src={
                      isSmartSwitch
                        ? selectedModel.img
                        : product.images[selectedImage]
                    }
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 drop-shadow-3xl"
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-obsidian/40 to-transparent pointer-events-none" />
                </motion.div>
                <div className="grid grid-cols-4 gap-6">
                  {isSmartSwitch
                    ? SMART_SWITCH_MODELS.map((model, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedModel(model)}
                          className={cn(
                            "aspect-square rounded-[32px] border transition-all overflow-hidden bg-white/5 p-4 flex items-center justify-center",
                            selectedModel.id === model.id
                              ? "border-accent scale-95 bg-accent/10"
                              : "border-white/5 opacity-40 hover:opacity-100",
                          )}
                        >
                          <img
                            src={model.img}
                            className="w-full h-full object-contain"
                            alt="thumbnail"
                          />
                        </button>
                      ))
                    : product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={cn(
                            "aspect-square rounded-[32px] border transition-all overflow-hidden bg-white/5 p-4 flex items-center justify-center",
                            selectedImage === i
                              ? "border-accent scale-95 bg-accent/10"
                              : "border-white/5 opacity-40 hover:opacity-100",
                          )}
                        >
                          <img
                            src={img}
                            className="w-full h-full object-contain"
                            alt="thumbnail"
                          />
                        </button>
                      ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="inline-flex items-center gap-4 mb-10">
                  <div className="flex text-accent gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-[0.4em] text-silk-white/40">
                    {product.socialProof?.reviewCount || 120} Expert
                    Recommendations
                  </span>
                </div>

                <h1 className="text-huge mb-8">
                  {product.name}{" "}
                  {isSmartSwitch && (
                    <span className="text-accent block text-3xl mt-4 italic">
                      ({selectedModel.name})
                    </span>
                  )}
                </h1>

                <div className="flex items-center gap-8 mb-12">
                  <span className="text-6xl font-display font-black text-accent">
                    {formatCurrency(
                      isSmartSwitch ? selectedModel.price : product.price,
                    )}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-silk-white/30 line-through decoration-red-500/50">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="prose-silk mb-16 max-w-2xl border-l-[3px] border-accent pl-10">
                  <p
                    className="text-2xl font-light text-text-muted leading-relaxed italic"
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  />
                </div>

                {isSmartSwitch && (
                  <div className="space-y-4 mb-12">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                      Select Configuration
                    </label>
                    <div className="grid grid-cols-3 gap-6">
                      {SMART_SWITCH_MODELS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model)}
                          className={cn(
                            "p-6 rounded-[32px] border transition-all text-center group",
                            selectedModel.id === model.id
                              ? "border-accent bg-accent/5 ring-1 ring-accent"
                              : "border-white/10 hover:border-white/20",
                          )}
                        >
                          <div className="text-xs font-black uppercase tracking-tight group-hover:text-accent transition-colors">
                            {model.id}
                          </div>
                          <div className="text-accent font-display font-black text-lg mt-1">
                            {formatCurrency(model.price)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-12 mb-16">
                  <div className="flex flex-col sm:flex-row items-stretch gap-6">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-3xl overflow-hidden h-20">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-20 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-accent"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-16 text-center font-display font-black text-2xl">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-20 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-accent"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className={cn(
                        "flex-1 h-20 rounded-3xl font-display font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 transition-all shadow-2xl overflow-hidden group relative",
                        isAdding
                          ? "bg-green-500 text-white"
                          : "bg-accent text-obsidian hover:bg-white",
                      )}
                    >
                      {isAdding ? (
                        <>
                          <CheckCircle2 size={24} /> <span>Secured in Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} />{" "}
                          <span>Synchronize with Cart</span>
                        </>
                      )}
                      {!isAdding && (
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-1" />
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        icon: Users,
                        label: "Live Interaction",
                        value: `${product.socialProof?.viewingNow || 14} Elite Prospects Viewing`,
                      },
                      {
                        icon: Lock,
                        label: "Hardware Status",
                        value: "Verified In Stock",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="p-8 rounded-3xl bg-white/5 border border-white/5 flex gap-6 items-center"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                          <stat.icon size={24} />
                        </div>
                        <div>
                          <div className="text-[8px] uppercase font-black text-silk-white/40 tracking-[0.3em] mb-1 font-display">
                            {stat.label}
                          </div>
                          <div className="text-xs font-black uppercase text-white/80">
                            {stat.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-12 border-t border-white/10">
                  <details className="group" open>
                    <summary className="flex justify-between items-center cursor-pointer list-none py-6 border-b border-white/5">
                      <span className="text-xs uppercase font-black tracking-[0.4em] text-accent">
                        Functional Overview
                      </span>
                      <Plus
                        size={16}
                        className="group-open:rotate-45 transition-transform text-accent"
                      />
                    </summary>
                    <div className="py-8 text-xl text-silk-white/60 font-light leading-relaxed prose-silk antialiased">
                      {product.fullDescription}
                    </div>
                  </details>
                  {product.specifications && (
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none py-6 border-b border-white/5">
                        <span className="text-xs uppercase font-black tracking-[0.4em]">
                          Technical Specifications
                        </span>
                        <Plus
                          size={16}
                          className="group-open:rotate-45 transition-transform"
                        />
                      </summary>
                      <div className="py-8 space-y-6">
                        {Object.entries(product.specifications).map(
                          ([k, v]: any) => (
                            <div
                              key={k}
                              className="flex justify-between items-center py-4 border-b border-white/5"
                            >
                              <span className="text-[10px] uppercase text-white/30 font-black tracking-[0.4em] font-display">
                                {k}
                              </span>
                              <span className="font-bold text-silk-white/80 uppercase text-xs tracking-widest">
                                {v}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer />

      <style>{`
        @keyframes float { 0%, 100% { transform: translate(-50%, -50%) translateY(0) scale(1); } 50% { transform: translate(-50%, -50%) translateY(-50px) scale(1.1); } }
        .animate-float { animation: float 20s infinite ease-in-out; }
        .custom-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23009fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1.5rem center; }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% auto; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;

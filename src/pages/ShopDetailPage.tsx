import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Users,
  Package,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  Lock,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { productService } from "@/services/productService";
import { useCartStore, Product } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import NotFoundPage from "@/pages/NotFoundPage";

const ShopDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

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

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setTimeout(() => setIsAdding(false), 2000);
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
    <div className="bg-obsidian text-silk-white selection:bg-accent selection:text-obsidian min-h-screen font-sans">
      <Helmet>
        <title>
          {product.name} — Luxury Smart Hardware | Altair Attic Official Store
        </title>
      </Helmet>
      <Navbar />

      <main className="pt-48 pb-32">
        <div className="container-luxury">
          {/* Breadcrumb Grid */}
          <div className="flex items-center gap-3 mb-16 text-[10px] uppercase font-black tracking-[0.4em] text-silk-white/40">
            <Link
              to="/shop"
              className="hover:text-accent transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft
                size={12}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              Catalog
            </Link>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-silk-white/60">{product.category}</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-accent">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            {/* Luxury Gallery Engine */}
            <div className="space-y-8 sticky top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-[64px] bg-white/3 border border-white/5 overflow-hidden group relative flex items-center justify-center p-20 shadow-2xl"
              >
                <img
                  src={product.images[selectedImage]}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian/40 to-transparent pointer-events-none" />

                {/* Visual Accent */}
                <div className="absolute top-10 right-10 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full backdrop-blur-xl">
                  <span className="text-accent text-[8px] uppercase font-black tracking-widest leading-none">
                    Official Hardware
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-4 gap-6">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "aspect-square rounded-[32px] border transition-all overflow-hidden bg-white/5 p-4 flex items-center justify-center",
                      selectedImage === i
                        ? "border-accent scale-95 bg-accent/10 shadow-[0_0_20px_rgba(0,159,255,0.2)]"
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

            {/* Information Architecture */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-4 mb-10">
                <div className="flex text-accent gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-silk-white/40">
                  {product.socialProof?.reviewCount || 124} Expert
                  Recommendations
                </span>
              </div>

              <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-display font-black leading-[0.9] uppercase tracking-tighter mb-8">
                {product.name}
              </h1>

              <div className="flex items-center gap-10 mb-12">
                <div className="flex flex-col">
                  <span className="text-6xl font-display font-black text-accent leading-none">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-silk-white/30 line-through decoration-red-500/50 mt-2">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="h-16 w-px bg-white/10" />
                <div className="text-[10px] uppercase font-black tracking-widest text-green-500/80 bg-green-500/5 border border-green-500/20 px-6 py-2 rounded-full animate-pulse">
                  In Stock & Ready
                </div>
              </div>

              <div className="prose-silk mb-16 max-w-2xl border-l-[3px] border-accent pl-10">
                <p
                  className="text-2xl font-light text-text-muted leading-relaxed italic"
                  dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                />
              </div>

              <div className="space-y-12 mb-16">
                {/* Shopping Controls */}
                <div className="flex flex-col sm:flex-row items-stretch gap-6">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-[32px] overflow-hidden h-24 shadow-inner">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-24 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-accent border-r border-white/5"
                    >
                      <Minus size={24} />
                    </button>
                    <span className="w-20 text-center font-display font-black text-3xl">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-24 h-full flex items-center justify-center hover:bg-white/5 transition-colors text-accent border-l border-white/5"
                    >
                      <Plus size={24} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 h-24 rounded-[32px] font-display font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-5 transition-all shadow-3xl overflow-hidden group relative",
                      isAdding
                        ? "bg-green-500 text-white"
                        : "bg-accent text-obsidian rounded-[32px] font-display font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-5 transition-all shadow-3xl overflow-hidden group relative hover:bg-white hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_-15px_rgba(0,159,255,0.4)] [html[data-theme='light']_&:hover]:bg-obsidian [html[data-theme='light']_&:hover]:text-silk-white",
                    )}
                  >
                    {isAdding ? (
                      <>
                        <CheckCircle2 size={24} /> <span>Secured in Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={24} /> <span>Add to Bag</span>
                      </>
                    )}
                    {!isAdding && (
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-1 [html[data-theme='light']_&]:bg-obsidian" />
                    )}
                  </button>
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Users,
                      label: "Live Interaction",
                      value: `${product.socialProof?.viewingNow || 14} People Online Now`,
                    },
                    {
                      icon: Lock,
                      label: "Safe Guarantee",
                      value: "2-Year Hardware Warranty",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-8 rounded-[40px] bg-white/3 border border-white/5 flex gap-8 items-center group hover:bg-white/5 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-[20px] bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <stat.icon size={28} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-black text-silk-white/40 tracking-[0.3em] mb-2 font-display">
                          {stat.label}
                        </div>
                        <div className="text-sm font-black uppercase text-white/90">
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Dossier */}
              <div className="space-y-4 pt-16 border-t border-white/10">
                <details className="group" open>
                  <summary className="flex justify-between items-center cursor-pointer list-none py-8 border-b border-white/5 group">
                    <span className="text-xs uppercase font-black tracking-[0.4em] text-accent group-hover:pl-2 transition-all">
                      Product Info
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-45 transition-transform">
                      <Plus size={16} className="text-accent" />
                    </div>
                  </summary>
                  <div className="py-10 text-xl text-silk-white/60 font-light leading-relaxed prose-silk antialiased">
                    {product.fullDescription}
                  </div>
                </details>

                {product.specifications && (
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none py-8 border-b border-white/5 group">
                      <span className="text-xs uppercase font-black tracking-[0.4em] group-hover:pl-2 transition-all">
                        Product Details
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-45 transition-transform">
                        <Plus size={16} />
                      </div>
                    </summary>
                    <div className="py-10 space-y-0 divide-y divide-white/5">
                      {Object.entries(product.specifications).map(
                        ([k, v]: any) => (
                          <div
                            key={k}
                            className="flex justify-between items-center py-6 transition-colors hover:bg-white/2 px-6 rounded-2xl"
                          >
                            <span className="text-[10px] uppercase text-white/30 font-black tracking-[0.4em] font-display">
                              {k}
                            </span>
                            <span className="font-bold text-silk-white/90 uppercase text-xs tracking-widest">
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

      <Footer />
    </div>
  );
};

export default ShopDetailPage;

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowRight,
  Camera,
  Lock,
  Speaker,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";
import productsData from "@/data/products.json"; // Use local JSON
import { Button } from "@/components/ui/Button";
import { GridBackground } from "@/components/ui/GridBackground";

// Import new Product type from context if needed, or define locally.
// But ProductShowcase uses a slightly different structure.
// Let's redefine Product locally or inline the mapping.

export const ProductShowcase = ({
  onInquire,
}: {
  onInquire?: (name: string) => void;
}) => {
  // Use productsData directly. No loading state needed for local JSON.
  const productList = productsData;

  const getIcon = (category?: string) => {
    if (!category) return <Cpu className="w-5 h-5" />;
    const cat = category.toLowerCase();
    if (
      cat.includes("camera") ||
      cat.includes("cctv") ||
      cat.includes("security")
    )
      return <Camera className="w-5 h-5" />;
    if (cat.includes("lock")) return <Lock className="w-5 h-5" />;
    if (cat.includes("speaker") || cat.includes("audio"))
      return <Speaker className="w-5 h-5" />;
    return <Cpu className="w-5 h-5" />;
  };

  return (
    <section className="bg-obsidian-surface py-20 md:py-32 relative border-y border-white/5 overflow-hidden">
      {/* Grid Background Pattern */}
      <GridBackground
        gridSize={70}
        gridColor="rgba(139, 92, 246, 0.08)"
        fade={true}
        className="z-0"
      />

      <div className="container-luxury relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 md:mb-32">
          <div className="max-w-3xl">
            <span className="text-label mb-8 block">Hardware Collection</span>
            <h2 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-[0.85]">
              Premier <span className="text-accent">Hardware</span> for <br />
              <span className="text-white/20">Smarter Living.</span>
            </h2>
          </div>
          <div className="lg:max-w-sm text-left lg:text-right">
            <p className="text-lg font-light text-white/50 leading-relaxed italic">
              Our hand-picked ecosystem of devices designed for peak performance
              and absolute reliability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {productList.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-obsidian p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] border border-white/5 hover:border-accent/30 transition-all duration-700 overflow-hidden"
            >
              {/* Product Label */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-black block mb-2">
                    {p.category || "Hardware"}
                  </span>
                  <h3 className="text-3xl font-display uppercase tracking-tight text-white">
                    {p.name}
                  </h3>
                </div>
              </div>

              {/* Image Container */}
              <Link
                to={`/product/${p.id}`}
                className="block aspect-square rounded-4xl overflow-hidden mb-12 relative bg-obsidian-muted group/img"
              >
                <img
                  src={p.images[0]} // Use first image
                  alt={p.name}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-1000"
                />
                <div className="absolute top-6 right-6 px-4 py-2 bg-obsidian/80 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-xs font-black text-accent">
                    ₦{p.price.toLocaleString()}
                  </span>
                </div>
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] uppercase font-black bg-white text-obsidian px-6 py-3 rounded-xl tracking-widest translate-y-4 group-hover/img:translate-y-0 transition-transform">
                    View Details
                  </span>
                </div>
              </Link>

              {/* Specs & Buy */}
              <div className="space-y-8">
                <p className="text-sm font-light text-white/60 leading-relaxed line-clamp-2">
                  {p.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3">
                  {/* Display features instead of specs for summary card */}
                  {(p.features || []).slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="text-[8px] uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/5 rounded-full text-white/40"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => onInquire?.(p.name)}
                    className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-accent hover:text-white transition-colors cursor-pointer"
                  >
                    Inquire Now <ArrowRight className="w-3 h-3" />
                  </button>
                  <Link to={`/product/${p.id}`}>
                    <Button
                      size="icon"
                      className="w-12 h-12 bg-white/5 hover:bg-accent text-white hover:text-obsidian rounded-full transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

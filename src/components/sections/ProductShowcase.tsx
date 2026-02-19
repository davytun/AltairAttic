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
import productsData from "@/data/products.json";
import { Button } from "@/components/ui/Button";
import { GridBackground } from "@/components/ui/GridBackground";

export const ProductShowcase = ({
  onInquire,
}: {
  onInquire?: (name: string) => void;
}) => {
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
    <section className="bg-obsidian-surface py-20 md:py-32 relative border-y border-border-dim overflow-hidden [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-gray-200">
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
            <span className="text-label mb-8 block">Shop Our Products</span>
            <h2 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-[0.85] text-silk-white">
              Gear That <span className="text-accent">Actually</span> <br />
              <span className="text-text-muted">Makes a Difference.</span>
            </h2>
          </div>
          <div className="lg:max-w-sm text-left lg:text-right">
            <p className="text-lg font-light text-silk-white/50 leading-relaxed italic [html[data-theme='light']_&]:text-gray-500">
              Every device we sell is tested, trusted, and ready to plug into
              your home or office — no guesswork required.
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
              className="group relative bg-obsidian p-8 md:p-10 rounded-4xl md:rounded-[2.5rem] border border-border-dim hover:border-accent/30 transition-all duration-700 overflow-hidden [html[data-theme='light']_&]:bg-gray-50 [html[data-theme='light']_&]:border-gray-200"
            >
              {/* Product Label */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-black block mb-2">
                    {p.category || "Hardware"}
                  </span>
                  <h3 className="text-3xl font-display uppercase tracking-tight text-silk-white">
                    {p.name}
                  </h3>
                </div>
              </div>

              {/* Image Container */}
              <Link
                to={`/catalogue/${p.slug}`}
                className="block aspect-square rounded-4xl overflow-hidden mb-12 relative bg-obsidian-muted group/img [html[data-theme='light']_&]:bg-gray-100"
              >
                <img
                  src={p.images[0]} // Use first image
                  alt={p.name}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover/img:grayscale-0 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-1000"
                />
                <div className="absolute top-6 right-6 px-4 py-2 bg-obsidian/80 backdrop-blur-md rounded-full border border-border-dim [html[data-theme='light']_&]:bg-white/90 [html[data-theme='light']_&]:border-gray-200">
                  <span className="text-xs font-black text-accent">
                    ₦{p.price.toLocaleString()}
                  </span>
                </div>
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] uppercase font-black bg-silk-white text-obsidian px-6 py-3 rounded-xl tracking-widest translate-y-4 group-hover/img:translate-y-0 transition-transform">
                    View Details
                  </span>
                </div>
              </Link>

              {/* Specs & Buy */}
              <div className="space-y-8">
                <p className="text-sm font-light text-light-gray leading-relaxed line-clamp-2">
                  {p.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3">
                  {/* Display features instead of specs for summary card */}
                  {(p.features || []).slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="text-[8px] uppercase tracking-widest px-3 py-1 bg-accent-dim/30 border border-border-dim rounded-full text-text-muted"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border-dim flex items-center justify-between [html[data-theme='light']_&]:border-gray-200">
                  <button
                    onClick={() => onInquire?.(p.name)}
                    className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-accent hover:text-silk-white transition-colors cursor-pointer"
                  >
                    Get a Quote <ArrowRight className="w-3 h-3" />
                  </button>
                  <Link to={`/catalogue/${p.slug}`}>
                    <Button
                      size="icon"
                      className="w-12 h-12 bg-silk-white/5 hover:bg-accent text-silk-white hover:text-obsidian rounded-full transition-all [html[data-theme='light']_&]:bg-gray-100"
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

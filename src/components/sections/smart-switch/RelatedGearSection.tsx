import React from "react";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/formatCurrency";
import { motion } from "framer-motion";

import salesData from "@/data/smart-switch-sales.json";
const { RELATED_GEAR } = salesData;

const RelatedGearSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-48 bg-obsidian relative overflow-hidden transition-colors duration-500">
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <div className="text-accent font-black uppercase tracking-widest text-[10px] lg:text-xs mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-accent/30" />
              {RELATED_GEAR.badge}
            </div>
            <h2 className="text-3xl lg:text-6xl font-display font-black leading-[0.9] text-silk-white uppercase">
              {RELATED_GEAR.title} <br />
              <span className="text-accent italic font-display">
                {RELATED_GEAR.titleAccent}
              </span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="group flex items-center gap-4 text-text-muted hover:text-accent transition-all text-xs lg:text-sm font-black uppercase tracking-widest border-b border-border-dim pb-2"
          >
            Explore Full Catalog
            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {RELATED_GEAR.items.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              onClick={() => navigate(`/shop/${item.slug}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-[32px] lg:rounded-[48px] bg-obsidian-surface border border-border-dim overflow-hidden flex items-center justify-center p-12 lg:p-16 mb-6 lg:mb-8 shadow-2xl transition-all group-hover:border-accent/30">
                <div className="absolute inset-0 bg-linear-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <img
                  src={item.img}
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110"
                  alt={item.name}
                />

                <div className="absolute top-6 lg:top-10 right-6 lg:right-10 px-4 py-2 bg-obsidian/40 backdrop-blur-xl border border-border-dim rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <Plus size={16} className="text-accent" />
                </div>
              </div>

              <div className="space-y-2 px-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl lg:text-2xl font-display font-black text-silk-white uppercase leading-none group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-base lg:text-lg font-display font-black text-accent">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <div className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40">
                  Signature Hardware Line
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedGearSection;

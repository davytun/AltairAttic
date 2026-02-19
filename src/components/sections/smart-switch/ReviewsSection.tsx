import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  ThumbsUp,
  ThumbsDown,
  Camera,
  MapPin,
} from "lucide-react";

import salesData from "@/data/smart-switch-sales.json";
const { REVIEWS } = salesData;

interface Review {
  u: string;
  d: string;
  r: string;
  s: number;
  title: string;
  date: string;
  model: string;
  hasImage?: boolean;
}

interface ReviewsSectionProps {
  customReviews?: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ customReviews }) => {
  const displayReviews = customReviews || REVIEWS.items;
  const [helpfulCounts, setHelpfulCounts] = useState<
    { up: number; down: number }[]
  >([]);

  useEffect(() => {
    // Initialize helpful counts based on provided reviews
    const initialCounts = displayReviews.map(() => ({
      up: Math.floor(Math.random() * 50) + 10,
      down: Math.floor(Math.random() * 5),
    }));
    setHelpfulCounts(initialCounts);
  }, [displayReviews]);

  const handleHelpful = (index: number, type: "up" | "down") => {
    setHelpfulCounts((prev) => {
      const newCounts = [...prev];
      if (type === "up") newCounts[index].up += 1;
      else newCounts[index].down += 1;
      return newCounts;
    });
  };

  return (
    <section className="py-24 lg:py-48 bg-obsidian relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-accent/5 blur-[100px] lg:blur-[150px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-accent/5 blur-[100px] lg:blur-[150px] rounded-full translate-x-1/2" />

      <div className="container-luxury relative z-10">
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-end mb-16 lg:mb-32">
          <div>
            <div className="flex items-center gap-2 lg:gap-3 text-accent mb-6">
              <Star size={14} fill="currentColor" className="lg:w-4 lg:h-4" />
              <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">
                {REVIEWS.badge}
              </span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-display font-black uppercase leading-[1.1] lg:leading-[0.9] text-silk-white">
              {REVIEWS.titlePrefix} <br />
              <span className="text-accent italic font-display">
                {REVIEWS.titleAccent}
              </span>
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-base lg:text-xl text-text-muted font-light leading-relaxed mb-8">
              {REVIEWS.description}
            </p>
            <div className="flex items-center gap-6 lg:gap-10">
              {REVIEWS.stats.map((stat: any, i: number) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl lg:text-4xl font-display font-black text-silk-white leading-none mb-2 tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest text-text-muted/40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayReviews.map((review: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="p-8 lg:p-12 rounded-[32px] lg:rounded-[48px] bg-obsidian-surface border border-border-dim hover:border-accent/30 transition-all group flex flex-col shadow-2xl relative overflow-hidden h-full"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-8 right-8 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Quote size={60} />
              </div>

              {/* Review Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.s)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={12}
                      fill="currentColor"
                      className="text-accent"
                    />
                  ))}
                </div>

                <h4 className="text-lg lg:text-xl font-bold text-silk-white mb-4 leading-tight group-hover:text-accent transition-colors">
                  {review.title}
                </h4>

                <p className="text-sm lg:text-base text-text-muted font-light leading-relaxed mb-8">
                  "{review.r}"
                </p>

                {/* Media Placeholder if hasImage */}
                {review.hasImage && (
                  <div className="mb-8 rounded-2xl overflow-hidden aspect-video bg-obsidian border border-border-dim relative group/media">
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/media:opacity-100 transition-opacity" />
                    <img
                      src="/assets/smart-switches/how/bde86e9609703d5ad2dcb84847f086f9.jpg"
                      alt="Review"
                      className="w-full h-full object-cover group-hover/media:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-obsidian/60 backdrop-blur-md rounded-full border border-border-dim">
                      <Camera size={10} className="text-accent" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-silk-white">
                        Customer Photo
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-8 border-t border-border-dim space-y-8">
                  {/* User Profile */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center font-display font-black text-accent text-xl">
                        {review.u[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-silk-white mb-1">
                          {review.u}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted/40">
                          <MapPin size={10} />
                          {review.d}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] uppercase font-black tracking-widest text-text-muted/20 mb-1">
                        Model
                      </div>
                      <div className="text-[10px] font-bold text-accent/60 uppercase">
                        {review.model}
                      </div>
                    </div>
                  </div>

                  {/* Interaction Footer */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted/40">
                      Helpful?
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleHelpful(i, "up")}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-obsidian border border-border-dim hover:bg-accent hover:text-white dark:hover:text-obsidian hover:border-accent transition-all group/btn"
                      >
                        <ThumbsUp
                          size={12}
                          className="text-accent group-hover/btn:scale-110 transition-transform"
                        />
                        <span className="text-[11px] font-bold tabular-nums">
                          {helpfulCounts[i]?.up || 0}
                        </span>
                      </button>
                      <button
                        onClick={() => handleHelpful(i, "down")}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-obsidian border border-border-dim hover:bg-obsidian-muted transition-all group/btn"
                      >
                        <ThumbsDown
                          size={12}
                          className="text-text-muted/40 group-hover/btn:scale-110 transition-transform"
                        />
                        <span className="text-[11px] font-bold text-text-muted/40 tabular-nums">
                          {helpfulCounts[i]?.down || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

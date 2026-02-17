import React from "react";
import { ThumbsUp, Zap, Award } from "lucide-react";

import salesData from "@/data/smart-switch-sales.json";
const { BENEFITS } = salesData;

const ICON_MAP = {
  effortless: ThumbsUp,
  energy: Zap,
  durability: Award,
};

const BenefitsSection = () => {
  return (
    <section className="py-32 bg-obsidian border-b border-border-dim transition-colors duration-500">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl lg:text-5xl font-display font-black uppercase mb-6 leading-[0.9] text-silk-white">
            {BENEFITS.title} <br />
            <span className="text-accent underline underline-offset-16 decoration-accent/20">
              {BENEFITS.titleAccent}
            </span>
          </h2>
          <p className="text-lg lg:text-2xl text-text-muted font-light leading-relaxed">
            {BENEFITS.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {BENEFITS.items.map((item, i) => {
            const Icon = ICON_MAP[item.id as keyof typeof ICON_MAP] || ThumbsUp;
            return (
              <div
                key={i}
                className="p-10 lg:p-12 rounded-[48px] bg-obsidian-muted/30 border border-border-dim hover:border-accent/30 transition-all group shadow-xl"
              >
                <div className="w-16 lg:w-20 h-16 lg:h-20 rounded-3xl bg-accent/10 flex items-center justify-center text-accent mb-8 lg:mb-10 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 lg:w-10 h-8 lg:h-10" />
                </div>
                <h3 className="text-xl lg:text-2xl font-display font-black uppercase mb-4 leading-tight text-silk-white">
                  {item.title}
                </h3>
                <p className="text-base lg:text-lg text-text-muted font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

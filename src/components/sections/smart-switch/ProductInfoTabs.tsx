import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import salesData from "@/data/smart-switch-sales.json";

const { TABS } = salesData;

interface ProductInfoTabsProps {
  customSpecs?: Record<string, string>;
}

const ProductInfoTabs: React.FC<ProductInfoTabsProps> = ({ customSpecs }) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  // Map custom specs to the format the UI expects if they exist
  const displaySpecs = customSpecs
    ? Object.entries(customSpecs).map(([label, value]) => ({ label, value }))
    : TABS.items.find((t: any) => t.id === "specifications")?.content || [];

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const renderTabContent = (tabId: string) => {
    const tab = TABS.items.find((t: any) => t.id === tabId);
    if (!tab) return null;

    switch (tabId) {
      case "description":
        return (
          <motion.div
            key="description"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <div className="space-y-8">
              <div className="p-8 lg:p-12 rounded-[32px] lg:rounded-[48px] bg-accent/5 border border-accent/10 shadow-xl">
                <h3 className="text-xl lg:text-3xl font-display font-black text-silk-white mb-6">
                  {tab.title}
                </h3>
                <div className="space-y-6">
                  {tab.content.map((item: any, i: number) => (
                    <div key={i} className="border-l-2 border-accent/20 pl-6">
                      <h4 className="text-sm font-black uppercase tracking-widest text-silk-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm lg:text-base text-text-muted font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative aspect-4/5 rounded-[32px] lg:rounded-[64px] overflow-hidden border border-border-dim shadow-3xl">
              <img
                src="/assets/smart-switches/how/cb8aaac212e111d4c6e65b9b76838437.jpg"
                className="w-full h-full object-cover"
                alt="Product Detail"
              />
            </div>
          </motion.div>
        );

      case "specifications":
        return (
          <motion.div
            key="specifications"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-4 lg:gap-y-6"
          >
            {displaySpecs.map((spec: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center py-4 lg:py-6 border-b border-border-dim group hover:border-accent/30 transition-colors"
              >
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted">
                  {spec.label}
                </span>
                <span className="text-sm lg:text-base font-bold text-silk-white group-hover:text-accent transition-colors">
                  {spec.value}
                </span>
              </div>
            ))}
          </motion.div>
        );

      case "setup":
        return (
          <motion.div
            key="setup"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {tab.content.map((step: any, i: number) => (
                <div
                  key={i}
                  className="rounded-2xl lg:rounded-3xl border border-border-dim bg-obsidian-muted/30 p-5 lg:p-7 shadow-xl hover:border-accent/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border border-accent/30 bg-accent/10 text-accent flex items-center justify-center text-xs lg:text-sm font-black">
                      {i + 1}
                    </span>
                    <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-accent">
                      {step.step}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm lg:text-base font-black uppercase tracking-[0.08em] text-silk-white">
                      {step.title}
                    </h3>
                    <p className="text-sm lg:text-base text-text-muted leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "faq":
        return (
          <motion.div
            key="faq"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl mx-auto space-y-3 lg:space-y-4"
          >
            {tab.content.map((item: any, i: number) => (
              <div
                key={i}
                className={cn(
                  "rounded-2xl lg:rounded-3xl border bg-obsidian-muted/30 transition-all shadow-xl overflow-hidden",
                  openFaqIndex === i
                    ? "border-accent/35"
                    : "border-border-dim hover:border-accent/20",
                )}
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex((prev) => (prev === i ? null : i))
                  }
                  className="w-full px-5 lg:px-7 py-5 lg:py-6 flex items-center justify-between gap-4 text-left"
                >
                  <h4 className="text-base lg:text-lg font-bold text-silk-white">
                    {item.q}
                  </h4>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-accent transition-transform duration-300",
                      openFaqIndex === i && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    openFaqIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 lg:px-7 pb-5 lg:pb-6 text-sm lg:text-base text-text-muted leading-relaxed font-light border-t border-border-dim">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-24 lg:py-48 bg-obsidian relative overflow-hidden transition-colors duration-500">
      <div className="container-luxury px-4 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-3 text-accent mb-6">
            <Info size={14} className="lg:w-4 lg:h-4" />
            <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.4em] leading-none">
              {TABS.badge}
            </span>
          </div>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {TABS.items.map((tab: any) => (
            <div key={tab.id} className="space-y-6 lg:space-y-8">
              <h3 className="text-sm lg:text-lg font-black uppercase tracking-[0.2em] text-accent">
                {tab.label}
              </h3>
              {renderTabContent(tab.id)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductInfoTabs;

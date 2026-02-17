import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import salesData from "@/data/smart-switch-sales.json";

const { TABS } = salesData;

const ProductInfoTabs = () => {
  const [activeTab, setActiveTab] = React.useState(TABS.items[0].id);

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

  const renderTabContent = () => {
    const tab = TABS.items.find((t: any) => t.id === activeTab);
    if (!tab) return null;

    switch (activeTab) {
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
            {tab.content.map((spec: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center py-4 lg:py-6 border-b border-border-dim group hover:border-accent/30 transition-colors"
              >
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40">
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
            className="max-w-4xl mx-auto space-y-12 lg:space-y-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {tab.content.map((step: any, i: number) => (
                <div key={i} className="relative group">
                  <div className="text-6xl lg:text-8xl font-display font-black text-accent/10 absolute -top-10 -left-6 group-hover:text-accent/20 transition-colors">
                    {step.step.replace("Step ", "")}
                  </div>
                  <div className="relative z-10 pt-4 px-2">
                    <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-silk-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-text-muted leading-relaxed font-light">
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
            className="max-w-3xl mx-auto space-y-6 lg:space-y-8"
          >
            {tab.content.map((item: any, i: number) => (
              <div
                key={i}
                className="p-8 lg:p-10 rounded-[32px] bg-obsidian-muted/30 border border-border-dim hover:border-accent/20 transition-all group shadow-xl"
              >
                <h4 className="text-lg lg:text-xl font-bold text-silk-white mb-4 group-hover:text-accent transition-colors">
                  {item.q}
                </h4>
                <p className="text-[13px] lg:text-base text-text-muted leading-relaxed font-light">
                  {item.a}
                </p>
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
          <div className="flex flex-wrap justify-center gap-3 lg:gap-8 bg-obsidian-muted/40 p-2 lg:p-4 rounded-full border border-border-dim w-fit mx-auto backdrop-blur-3xl shadow-2xl">
            {TABS.items.map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 lg:px-10 py-3 lg:py-4 rounded-full text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all",
                  activeTab === tab.id
                    ? "bg-accent text-white dark:text-obsidian shadow-xl scale-105"
                    : "text-text-muted hover:text-silk-white",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px] lg:min-h-[600px] relative">
          <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoTabs;

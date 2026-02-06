import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DotBackground } from "@/components/ui/DotBackground";

export const CaseStudy = () => {
  return (
    <section className="bg-obsidian py-48 px-[6vw] relative border-y border-white/5">
      <DotBackground
        dotSize={1.2}
        gap={32}
        dotColor="rgba(139, 92, 246, 0.09)"
        fade={true}
      />

      <div className="container-luxury relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          {/* Fixed Sidebar for Case Study Label */}
          <div className="lg:w-1/4 pt-4">
            <div className="space-y-12">
              <h2 className="text-5xl font-display leading-[0.8] tracking-tighter uppercase">
                Tender <br /> App.
              </h2>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Buy Airtime and Data Plan, Pay Bills, and Trade Crypto and
                Giftcard on Tender App.
              </p>
              <div className="pt-8 flex flex-col gap-4">
                <div className="h-px w-full bg-white/5" />
                <span className="text-[10px] text-accent font-bold tracking-[0.3em] uppercase">
                  Year: 2024
                </span>
                <span className="text-[10px] text-white/70 tracking-[0.3em] uppercase">
                  Category: Software
                </span>
              </div>
            </div>
          </div>

          {/* Immersive Media Gallery */}
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true }}
              className="aspect-4/5 bg-obsidian-surface rounded-3xl overflow-hidden relative shadow-2xl"
            >
              <motion.img
                src="/case.png"
                initial={{ filter: "grayscale(40%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                transition={{ duration: 2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-full h-full object-cover transition-all duration-[3s]"
                alt="Tender App Interface"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/80 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <span className="text-[10px] text-white/70 tracking-widest uppercase mb-2 block">
                  Core Functionality
                </span>
                <h4 className="text-xl font-display uppercase tracking-tight">
                  Real-time Notifications
                </h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="aspect-4/3 bg-obsidian-surface rounded-3xl overflow-hidden relative shadow-2xl">
                <img
                  src="/case2.png"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[3s]"
                  alt="Data Analytics Dashboard"
                />
              </div>

              <div className="space-y-6 lg:pl-8">
                <p className="text-xl font-light text-white/80 leading-snug">
                  A digital procurement platform designed to simplify tender
                  discovery, submission, and management. The app enables
                  real-time tender notifications, secure document uploads, user
                  authentication, and payment processing—helping suppliers and
                  organizations manage procurement transparently and efficiently
                </p>
                <button onClick={() => window.open("https://play.google.com/store/apps/details?id=co.tenderpay.mobile", "_blank")} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-accent group">
                  Full Study
                  <div className="w-10 h-10 rounded-full border cursor-pointer border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-obsidian transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Architectural Border Decoration */}
      <div className="absolute top-0 right-0 w-px h-full bg-white/5 hidden lg:block" />
      <div className="absolute top-0 left-0 w-px h-full bg-white/5 hidden lg:block" />
    </section>
  );
};

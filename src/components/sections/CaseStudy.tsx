import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DotBackground } from "@/components/ui/DotBackground";
import caseImg from "/case.png";
import case2Img from "/case2.png";

export const CaseStudy = () => {
  return (
    <section className="bg-obsidian py-20 md:py-32 relative border-y border-border-dim">
      <DotBackground
        dotSize={1.2}
        gap={32}
        dotColor="rgba(139, 92, 246, 0.09)"
        fade={true}
      />

      <div className="container-luxury relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Fixed Sidebar for Case Study Label */}
          <div className="lg:w-1/4 pt-4">
            <div className="space-y-12">
              <h2 className="text-5xl font-display leading-[0.8] tracking-tighter uppercase text-silk-white">
                Tender <br /> App.
              </h2>
              <p className="text-sm text-silk-white/70 font-light leading-relaxed">
                A fintech app that lets you buy airtime, pay bills, and trade
                crypto — all in one place, in seconds.
              </p>
              <div className="pt-8 flex flex-col gap-4">
                <div className="h-px w-full bg-border-dim" />
                <span className="text-[10px] text-accent font-bold tracking-[0.3em] uppercase">
                  Year: 2024
                </span>
                <span className="text-[10px] text-silk-white/70 tracking-[0.3em] uppercase">
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
                src={caseImg}
                initial={{ filter: "grayscale(40%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                transition={{ duration: 2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-full h-full object-cover transition-all duration-[3s]"
                alt="Tender App Interface"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/80 to-transparent" />
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10">
                <span className="text-[10px] text-silk-white/70 tracking-widest uppercase mb-2 block">
                  Key Feature
                </span>
                <h4 className="text-xl font-display uppercase tracking-tight text-silk-white">
                  Instant Notifications
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
                  src={case2Img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[3s]"
                  alt="Data Analytics Dashboard"
                />
              </div>

              <div className="space-y-6 lg:pl-8">
                <p className="text-xl font-light text-silk-white/80 leading-snug">
                  We built Tender App from the ground up — a fast, secure
                  fintech platform for buying airtime, paying bills, and trading
                  crypto and gift cards. Real-time alerts, clean UX, and zero
                  friction from start to finish.
                </p>
                <button
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=co.tenderpay.mobile",
                      "_blank",
                    )
                  }
                  className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-accent group"
                >
                  View on Play Store
                  <div className="w-10 h-10 rounded-full border cursor-pointer border-border-dim flex items-center justify-center group-hover:bg-accent group-hover:text-obsidian transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Architectural Border Decoration */}
      <div className="absolute top-0 right-0 w-px h-full bg-border-dim hidden lg:block" />
      <div className="absolute top-0 left-0 w-px h-full bg-border-dim hidden lg:block" />
    </section>
  );
};

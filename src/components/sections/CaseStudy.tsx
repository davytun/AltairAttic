import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const CaseStudy = () => {
  return (
    <section className="bg-obsidian py-48 px-[6vw] relative border-y border-white/5">
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          {/* Fixed Sidebar for Case Study Label */}
          <div className="lg:w-1/4 pt-4">
            <span className="text-label mb-12 block">Featured Narrative</span>
            <div className="space-y-12">
              <h2 className="text-5xl font-display leading-[0.8] tracking-tighter uppercase">
                The <br /> Lagos <br /> Annex.
              </h2>
              <p className="text-sm text-white/40 font-light leading-relaxed">
                A complete intelligent renovation of a 4,500 sq ft smart-ready
                villa. Focused on invisible technology and architectural
                lighting.
              </p>
              <div className="pt-8 flex flex-col gap-4">
                <div className="h-px w-full bg-white/5" />
                <span className="text-[10px] text-accent font-bold tracking-[0.3em] uppercase">
                  Built: May 2024
                </span>
                <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase">
                  Client: Private Residencies
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
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
                initial={{ filter: "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                transition={{ duration: 2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-full h-full object-cover transition-all duration-[3s]"
                alt="Case Study 01"
              />
              <div className="absolute inset-0 bg-linear-to-t from-obsidian/80 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <span className="text-[10px] text-white/40 tracking-widest uppercase mb-2 block">
                  Interior Detail
                </span>
                <h4 className="text-xl font-display uppercase tracking-tight">
                  Kinetic Lighting Setup
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
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-[3s]"
                  alt="Case Study 02"
                />
              </div>

              <div className="space-y-6 lg:pl-8">
                <p className="text-xl font-light text-white/60 leading-snug">
                  "The challenge was making complex automation simple enough
                  that a guest could walk in and use it without a manual. We
                  delivered a zero-interface home."
                </p>
                <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-accent group">
                  Full Study{" "}
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-obsidian transition-all">
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

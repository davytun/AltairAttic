import { useRef } from "react";
import { motion } from "framer-motion";
import { GridBackground } from "@/components/ui/GridBackground";

const values = [
  {
    title: "Innovation",
    desc: "We don't just follow trends. We build what's next for your business.",
  },
  {
    title: "Quality",
    desc: "Every system we build is designed for industrial-grade reliability.",
  },
  {
    title: "Human Focus",
    desc: "Technology that works with you, not against you. Simple and intuitive.",
  },
  {
    title: "Integrity",
    desc: "Transparent pricing and honest advice. We build for the long term.",
  },
  {
    title: "Stability",
    desc: "Systems that stay up so you can stay focused on your work.",
  },
];

export const AboutValues = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="bg-obsidian py-20 md:py-32 relative overflow-hidden border-t border-border-dim"
    >
      <GridBackground
        gridSize={80}
        gridColor="rgba(139, 92, 246, 0.05)"
        fade={true}
      />
      {/* Massive Infinite Marquee Header */}
      <div className="relative w-full mb-32 md:mb-48 overflow-hidden select-none">
        <div className="flex whitespace-nowrap">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-20 pr-20"
          >
            {[1, 2].map((loop) => (
              <div key={loop} className="flex items-center gap-20">
                {[
                  "Legacy",
                  "Innovation",
                  "Future",
                  "Human",
                  "Intelligence",
                ].map((word) => (
                  <motion.span
                    key={word}
                    whileHover={{
                      scale: 1.1,
                      color: "var(--color-accent)",
                      textShadow: "0 0 20px rgba(205, 127, 50, 0.4)",
                    }}
                    className="text-[12vw] md:text-[15vw] font-display font-black uppercase text-silk-white/10 tracking-tighter leading-none cursor-default transition-colors duration-500"
                  >
                    {word}{" "}
                    <span className="text-silk-white/5 opacity-50">—</span>
                  </motion.span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          {/* Narrative Core */}
          <div className="lg:col-span-6 space-y-16">
            <div>
              <span className="text-label mb-8 block">Our Philosophy</span>
              <h3 className="text-huge text-6xl! md:text-8xl! mb-12 text-silk-white">
                Human <br /> <span className="text-text-muted">Centered</span>{" "}
                <br /> Tech.
              </h3>
              <p className="text-xl font-light text-silk-white/70 leading-relaxed max-w-xl mb-12">
                Altair Attic Limited is dedicated to bridging the gap between
                complexity and daily life. We believe technology should be felt,
                not seen.
              </p>

              <div className="grid grid-cols-2 gap-6 items-end">
                <div className="aspect-square rounded-2xl overflow-hidden border border-border-dim">
                  <motion.img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
                    alt="Innovation"
                    initial={{ filter: "grayscale(40%)" }}
                    whileInView={{ filter: "grayscale(0%)" }}
                    transition={{ duration: 2 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                <div className="aspect-3/4 rounded-2xl overflow-hidden border border-border-dim">
                  <motion.img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200"
                    alt="Values"
                    initial={{ filter: "grayscale(40%)" }}
                    whileInView={{ filter: "grayscale(0%)" }}
                    transition={{ duration: 2 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="lg:col-span-6 flex flex-col gap-12 lg:pt-32">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative border-b border-border-dim pb-10 transition-colors duration-700 hover:border-accent/40"
              >
                <div className="flex justify-between items-start gap-8">
                  <div className="space-y-4">
                    <motion.h4
                      initial={{ opacity: 0.7 }}
                      whileInView={{ opacity: 1 }}
                      className="text-3xl font-display uppercase tracking-tight group-hover:text-accent transition-colors flex items-center gap-4 text-silk-white"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-silk-white/20">
                        / 0{i + 1}
                      </span>
                      {v.title}
                    </motion.h4>
                    <p className="text-sm text-silk-white/60 font-light max-w-sm group-hover:text-silk-white transition-colors">
                      {v.desc}
                    </p>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="w-12 h-px bg-silk-white/10 group-hover:w-24 group-hover:bg-accent transition-all duration-700 mt-4 origin-left"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

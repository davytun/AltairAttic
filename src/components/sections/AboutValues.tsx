import { useRef } from "react";
import { motion } from "framer-motion";

const values = [
  {
    title: "Innovation",
    desc: "Pushing digital boundaries to create forward-thinking physical solutions.",
  },
  {
    title: "Quality",
    desc: "Driven by absolute excellence in every line of code and hardware deployment.",
  },
  {
    title: "Customer Focus",
    desc: "Bespoke orchestration tailored to the individual rhythms of your life.",
  },
  {
    title: "Integrity",
    desc: "Rooted in transparency, ethical automation, and long-term trust.",
  },
  {
    title: "Sustainability",
    desc: "Building resilient technology that respects the future and evolves with it.",
  },
];

export const AboutValues = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="bg-obsidian py-48 relative overflow-hidden border-t border-white/5"
    >
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
                      color: "var(--color-bronze)",
                      textShadow: "0 0 20px rgba(205, 127, 50, 0.4)",
                    }}
                    className="text-[12vw] md:text-[15vw] font-display font-black uppercase text-white/3 tracking-tighter leading-none cursor-default transition-colors duration-500"
                  >
                    {word} <span className="text-white/5 opacity-50">—</span>
                  </motion.span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container-luxury px-[6vw] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          {/* Narrative Core */}
          <div className="lg:col-span-6 space-y-16">
            <div>
              <span className="text-label mb-8 block">Our Philosophy</span>
              <h3 className="text-huge text-6xl! md:text-8xl! mb-12">
                Human <br /> <span className="text-gray-600">Centered</span>{" "}
                <br /> Tech.
              </h3>
              <p className="text-xl font-light text-white/40 leading-relaxed max-w-xl mb-12">
                Altair Attic Limited is dedicated to bridging the gap between
                complexity and daily life. We believe technology should be felt,
                not seen.
              </p>

              <div className="grid grid-cols-2 gap-6 items-end">
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/5">
                  <img
                    src="/human-tech-philosophy.png"
                    alt="Innovation"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="aspect-3/4 rounded-2xl overflow-hidden border border-white/5">
                  <img
                    src="/human-tech-design.png"
                    alt="Values"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
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
                className="group relative border-b border-white/5 pb-10 hover:border-bronze transition-colors duration-700"
              >
                <div className="flex justify-between items-start gap-8">
                  <div className="space-y-4">
                    <h4 className="text-3xl font-display uppercase tracking-tight group-hover:text-bronze transition-colors flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-widest text-white/20">
                        / 0{i + 1}
                      </span>
                      {v.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-light max-w-sm group-hover:text-white transition-colors">
                      {v.desc}
                    </p>
                  </div>
                  <div className="w-12 h-px bg-white/5 group-hover:w-24 group-hover:bg-bronze transition-all duration-700 mt-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

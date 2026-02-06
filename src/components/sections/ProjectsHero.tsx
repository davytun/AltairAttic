import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ProjectsHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-obsidian pt-32"
    >
      {/* Cinematic Background Layer */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-linear-to-b from-obsidian via-transparent to-obsidian" />
        <div className="vertical-line left-[20%] opacity-20" />
        <div className="vertical-line left-[50%] opacity-10" />
        <div className="vertical-line left-[80%] opacity-20" />
      </motion.div>

      <div className="container-luxury relative z-10 px-[4vw]">
        <motion.div
          style={{ opacity }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="text-label mb-12 block tracking-[0.8em] text-accent uppercase">
              Archive / Works
            </span>
            <h1 className="text-huge md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase mb-16">
              Our <br />
              Completed <br />
              <span className="text-white/10 italic font-serif lowercase tracking-normal">
                Projects.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
            className="max-w-px h-24 bg-linear-to-b from-accent to-transparent mb-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="max-w-2xl text-lg md:text-xl font-light text-white/70 leading-relaxed uppercase tracking-widest text-balance"
          >
            A curated showcase of technological excellence and architectural
            precision.
          </motion.p>
        </motion.div>
      </div>

      {/* Side Decorative Text */}
      <div className="absolute right-[2vw] top-1/2 -translate-y-1/2 hidden lg:block vertical-text">
        <span className="text-[10px] font-black tracking-[1em] text-white/5 uppercase">
          ALTAIR ARCHIVE COLLECTION
        </span>
      </div>
    </section>
  );
};

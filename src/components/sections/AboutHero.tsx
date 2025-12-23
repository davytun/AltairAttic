import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const AboutHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian pt-32"
    >
      {/* Cinematic Background with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-obsidian/20 via-obsidian/60 to-obsidian z-10" />
        <motion.img
          src="/about-hero-bg.png"
          style={{
            filter: useTransform(
              scrollYProgress,
              [0, 0.5],
              ["grayscale(100%)", "grayscale(0%)"]
            ),
          }}
          alt="Cinematic Background"
          className="w-full h-full object-cover opacity-40"
        />
      </motion.div>

      {/* Floating Elements (Particles/Lines) */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="vertical-line left-[10%] opacity-20" />
        <div className="vertical-line left-[30%] opacity-10" />
        <div className="vertical-line left-[70%] opacity-10" />
        <div className="vertical-line left-[90%] opacity-20" />
      </div>

      <div className="container-luxury relative z-20 px-[4vw]">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-label mb-12 px-8 py-3 border border-accent/30 rounded-full bg-obsidian/50 backdrop-blur-xl"
          >
            Digital Architecture
          </motion.span>

          <h1 className="text-huge md:text-[14vw] font-display font-black leading-[0.75] tracking-tighter uppercase mb-20 text-balance">
            At the <br />
            <span className="text-white/20 italic font-serif lowercase tracking-normal">
              forefront
            </span>
            <br /> <span className="text-accent">of tech.</span>
          </h1>

          <div className="max-w-4xl pt-16 border-t border-white/10 relative">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-accent" />

            <p className="text-2xl md:text-3xl font-light text-white/60 leading-relaxed italic mb-10">
              "Altair Attic Limited is at the forefront of technological
              innovation, delivering cutting-edge solutions in smart home
              automation, software development, IoT, and embedded systems
              integration."
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">
                  Established
                </span>
                <span className="text-xl font-display text-accent">MMXXIV</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <p className="max-w-md text-sm text-white/30 uppercase tracking-[0.2em] font-medium">
                Seamlessly integrating advanced technology into the fabric of
                everyday life.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">
          Discover
        </span>
        <div className="w-px h-24 bg-linear-to-b from-accent to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

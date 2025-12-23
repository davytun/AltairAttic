import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ServiceData } from "@/utils/wordSlid";

interface Props {
  service: ServiceData;
}

export const ServiceDetailHero = ({ service }: Props) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const filter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["grayscale(100%)", "grayscale(0%)"]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Background Image with Parallax-like fading */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-obsidian/40 via-obsidian/80 to-obsidian z-10" />
        <motion.img
          style={{ filter }}
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="container-luxury relative z-20 px-[4vw] pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl"
        >
          <span className="text-label mb-8 block tracking-[0.5em] text-accent">
            Expertise / {service.name}
          </span>
          <h1 className="text-huge md:text-8xl! font-display uppercase tracking-tighter leading-none mb-12">
            {service.detail}
          </h1>
          <div className="w-24 h-px bg-accent" />
        </motion.div>
      </div>
    </section>
  );
};

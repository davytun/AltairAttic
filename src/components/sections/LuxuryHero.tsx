import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

export const LuxuryHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const secondaryTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(".char", {
        y: 200,
        opacity: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(secondaryTextRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: "power3.out",
        delay: 1.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split text for animation
  const title = "ALTAIR";
  const title2 = "ATTIC";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden px-[4vw]"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-linear-to-l from-white/2 to-transparent pointer-events-none" />

      <div className="z-10 mt-[-5vh]">
        <h1
          ref={textRef}
          className="text-huge font-display flex flex-col font-bold"
        >
          <span className="flex overflow-hidden">
            {title.split("").map((char, i) => (
              <span key={i} className="char block">
                {char}
              </span>
            ))}
          </span>
          <span className="flex overflow-hidden text-muted/30 ml-[2vw]">
            {title2.split("").map((char, i) => (
              <span key={i} className="char block">
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div
          ref={secondaryTextRef}
          className="mt-12 max-w-2xl ml-[10vw] space-y-8"
        >
          <p className="text-editorial">
            Architecting invisible intelligence. We transform physical spaces
            into responsive ecosystems where technology serves humanity with
            silent precision.
          </p>

          <div className="flex items-center gap-12 text-xs tracking-[0.3em] font-light text-white/40 uppercase">
            <span>Est. 2025</span>
            <div className="w-12 h-px bg-white/20" />
            <span>London — Global</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="pt-12"
          >
            <button className="group relative px-12 py-5 bg-white text-black text-xs font-bold uppercase tracking-widest overflow-hidden transition-all hover:pr-16">
              <span className="relative z-10 transition-transform group-hover:translate-x-[-4px] block">
                Start the Inquiry
              </span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100 group-hover:right-8">
                →
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Luxury Detail: Coordinates or Serial number style text */}
      <div className="absolute bottom-12 left-[4vw] text-[10px] text-muted font-mono tracking-widest uppercase vertical-text">
        00.1 / CORE_SYSTEM / ATTIC_LTD
      </div>

      <div className="absolute bottom-12 right-[4vw] flex flex-col items-end gap-2 text-[10px] text-muted font-mono uppercase">
        <span>Scroll to Explore</span>
        <div className="w-px h-12 bg-linear-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

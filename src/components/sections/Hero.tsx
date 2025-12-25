import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DotBackground } from "@/components/ui/DotBackground";

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-char", {
        y: 100,
        rotateX: -90,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(mediaRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 2,
        ease: "expo.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="reveal-char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[800px] flex flex-col justify-center items-center bg-obsidian overflow-hidden"
    >
      {/* Cinematic Background Media */}
      <motion.div
        ref={mediaRef}
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-obsidian/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400"
          alt="Sustainable Smart Architecture"
          className="w-full h-full object-cover filter grayscale-20 opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-obsidian/20 to-obsidian z-20" />
      </motion.div>

      {/* Dot Background Pattern */}
      <DotBackground
        dotSize={1.5}
        gap={35}
        dotColor="rgba(139, 92, 246, 0.12)"
        fade={true}
        className="z-20"
      />

      {/* Architectural Layout Area */}
      <div className="container-luxury relative z-30 w-full px-[6vw]">
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col items-start gap-12"
        >
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase tracking-[1em] text-accent font-black mb-4 block">
              Altair Attic Limited
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] font-display leading-[0.85] tracking-tighter text-white perspective-[1000px]"
          >
            <div className="overflow-hidden mb-[2vw] md:whitespace-nowrap">
              {splitText("YOU BUILD THE VISION.")}
            </div>
            <div className="overflow-hidden text-accent md:whitespace-nowrap">
              {splitText("WE BUILD THE ENGINE.")}
            </div>
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-12 mt-8">
            <p className="max-w-xl text-lg md:text-xl font-light text-white/50 leading-relaxed border-l border-accent/30 pl-8">
              Technology should serve your life, not complicate it. We design
              smart systems and custom software that actually work—fast,
              reliable, and human-centered.
            </p>

            <div className="flex items-center gap-8">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-24 px-12 rounded-full bg-accent text-obsidian hover:bg-white hover:text-obsidian transition-all duration-700 font-black uppercase tracking-widest text-xs group cursor-pointer"
              >
                Start Your Technology Audit{" "}
                <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid / Lines */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[100px_100px]" />
      </div>

      {/* Scroll Anchor */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent animate-bounce" />
      </div>
    </section>
  );
};

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
        <div className="absolute inset-0 bg-obsidian/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=2400"
          alt="Cyberpunk Smart City"
          className="w-full h-full object-cover grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-obsidian z-20" />
      </motion.div>

      {/* Architectural Layout Area */}
      <div className="container-luxury relative z-30 w-full px-[6vw]">
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col items-start gap-12"
        >
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase tracking-[1em] text-bronze font-black mb-4 block">
              Altair Attic Limited
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[14vw] lg:text-[12vw] font-display leading-[0.75] tracking-tighter text-white perspective-[1000px]"
          >
            <div className="overflow-hidden mb-[2vw]">
              {splitText("INNOVATIVE")}
            </div>
            <div className="overflow-hidden text-bronze">
              {splitText("LIFE_TECH")}
            </div>
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-12 mt-8">
            <p className="max-w-xl text-lg md:text-xl font-light text-white/50 leading-relaxed border-l border-bronze/30 pl-8">
              Empowering homes, businesses, and individuals with smart solutions
              in automation, software, and IoT integration.
            </p>

            <div className="flex items-center gap-8">
              <Button
                size="lg"
                className="h-24 px-12 rounded-full bg-bronze text-obsidian hover:bg-white hover:text-obsidian transition-all duration-700 font-black uppercase tracking-widest text-xs group"
              >
                Get Started{" "}
                <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid / Lines */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Scroll Anchor */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-12 bg-linear-to-b from-white to-transparent animate-bounce" />
      </div>
    </section>
  );
};

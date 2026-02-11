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
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // Slower fade - content stays visible longer
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
      className="relative min-h-[100svh] py-20 md:py-0 flex flex-col justify-center items-center bg-obsidian overflow-hidden"
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
      <div className="container-luxury relative z-30 w-full pt-32 pb-20 md:pt-48 md:pb-0">
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col items-start gap-12"
        >
          {/* <div className="overflow-hidden">
            <span className="text-[10px] uppercase tracking-[1em] text-accent font-black mb-4 block">
              Altair Attic Limited
            </span>
          </div> */}

          <h1
            ref={titleRef}
            className="relative perspective-[1000px] text-white font-display font-black leading-[0.8] tracking-tighter uppercase text-[clamp(2.5rem,5.5vw,9rem)]"
          >
            <div className="overflow-hidden mb-[1vw]">
              {splitText("YOU BUILD THE VISION.")}
            </div>
            <br />
            <div className="overflow-hidden text-accent">
              {splitText("WE BUILD THE ENGINE.")}
            </div>
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-12 lg:gap-20 mt-8">
            <p className="max-w-xl text-lg md:text-xl font-light text-white/50 leading-relaxed border-l border-accent/30 pl-8">
              Technology should serve your life, not complicate it. We design
              smart systems and custom software that actually work—fast,
              reliable, and human-centered.
            </p>

            <div className="flex flex-col gap-8 mt-12">
              {/* Primary CTA Group */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="https://wa.me/2347077195098?text=Hi%2C%20I%20need%20help%20with%20my%20tech%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-16 px-10 rounded-xl bg-accent text-obsidian hover:bg-white transition-all duration-500 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Quick Chat
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </a>

                <a
                  href="https://calendly.com/davytun/book-a-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-16 px-10 rounded-xl border-2 border-white/20 text-white hover:border-accent hover:bg-accent/10 transition-all duration-500 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center"
                >
                  <span className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Book a Call
                  </span>
                </a>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 text-white/40">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-obsidian flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                  <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-obsidian flex items-center justify-center text-xs font-bold">
                    B
                  </div>
                  <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-obsidian flex items-center justify-center text-xs font-bold">
                    C
                  </div>
                </div>
                <p className="text-xs uppercase tracking-wider font-bold">
                  Join 50+ businesses we've transformed
                </p>
              </div>
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

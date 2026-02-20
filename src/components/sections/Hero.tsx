import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Zap, Calendar } from "lucide-react";
import { DotBackground } from "@/components/ui/DotBackground";
import { Link } from "react-router-dom";

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-char", {
        y: 120,
        rotateX: -90,
        opacity: 0,
        duration: 1.4,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.3,
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
      className="relative min-h-svh py-20 md:py-0 flex flex-col justify-center items-center bg-obsidian overflow-hidden"
    >
      {/* Cinematic Background */}
      <motion.div
        ref={mediaRef}
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-obsidian/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=2400"
          alt="Smart home technology"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Bottom fade to next section */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-obsidian z-20" />
        {/* Accent glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-accent/10 blur-[120px] rounded-full z-10 pointer-events-none" />
      </motion.div>

      {/* Dot Pattern */}
      <DotBackground
        dotSize={1.5}
        gap={35}
        dotColor="rgba(0, 159, 255, 0.08)"
        fade={true}
        className="z-20"
      />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,var(--color-border-dim)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-dim)_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      {/* Content */}
      <div className="container-luxury relative z-30 w-full pt-32 pb-24 md:pt-48 md:pb-16">
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col items-start gap-10"
        >
          {/* Main Headline */}
          <h1
            ref={titleRef}
            className="relative text-silk-white font-display font-black leading-[0.82] tracking-tighter uppercase text-[clamp(2.8rem,6vw,9.5rem)]"
          >
            <div className="overflow-hidden mb-[0.5vw]">
              {splitText("SMART HOMES.")}
            </div>
            <div className="overflow-hidden mb-[0.5vw] text-silk-white/30">
              {splitText("SMART SOFTWARE.")}
            </div>
            <div className="overflow-hidden text-accent">
              {splitText("REAL RESULTS.")}
            </div>
          </h1>

          {/* Subtext + CTAs row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full gap-12 lg:gap-20 mt-4">
            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="max-w-lg text-lg md:text-xl font-light text-text-muted leading-relaxed border-l-2 border-accent/40 pl-8"
            >
              We build home automation systems, custom software, and IoT
              solutions that make your life simpler — not more complicated.
            </motion.p>

            {/* CTAs + Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col gap-6"
            >
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* Primary: WhatsApp */}
                <a
                  href="https://wa.me/2347077195098?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-14 px-8 rounded-xl bg-accent text-obsidian font-black uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-3 overflow-hidden hover:shadow-[0_0_40px_rgba(0,159,255,0.4)] transition-all duration-500"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat on WhatsApp
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>

                {/* Secondary: Book a Call */}
                <a
                  href="https://calendly.com/davytun/book-a-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-14 px-8 rounded-xl border border-silk-white/20 text-silk-white hover:border-accent hover:bg-accent/10 transition-all duration-500 font-black uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-3"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  Book a Free Call
                </a>

                {/* Tertiary: See Our Work */}
                <Link
                  to="/shop"
                  className="group h-14 px-8 rounded-xl text-text-muted hover:text-accent transition-all duration-500 font-black uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-2"
                >
                  See Our Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-5">
                <div className="flex -space-x-2.5">
                  {["D", "A", "K", "T"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-linear-to-br from-accent/40 to-accent/10 border-2 border-obsidian flex items-center justify-center text-[10px] font-black text-accent"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-yellow-400 text-[10px]">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                    Trusted by 50+ homes & businesses
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
        <span className="text-[8px] uppercase tracking-[0.4em] text-text-muted font-black">
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-accent/50 to-transparent animate-bounce" />
      </div>
    </section>
  );
};

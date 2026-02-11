import { motion } from "framer-motion";
import { Home, Code2, Cpu, ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    label: "Automation",
    title: "Smart Home Automation",
    desc: "We specialize in creating intelligent living environments that provide comfort, security, and energy efficiency.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    icon: Home,
    detail:
      "Intelligent lighting, climate control, and security systems integrated seamlessly into your lifestyle.",
  },
  {
    id: "02",
    label: "Development",
    title: "Software Development",
    desc: "Our software development team delivers tailored enterprise-grade applications.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    icon: Code2,
    detail:
      "Scalable, secure, and high-performance software solutions for web, mobile, and desktop.",
  },
  {
    id: "03",
    label: "Integration",
    title: "IoT & Embedded Systems",
    desc: "We provide solutions that bring intelligence to your devices.",
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200",
    icon: Cpu,
    detail:
      "Connecting physical hardware to the digital world through bespoke sensor integration and data analytics.",
  },
];

export const AboutServices = () => {
  return (
    <section className="bg-obsidian-surface py-24 md:py-64 relative overflow-hidden">
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-20 md:mb-48">
          <div className="max-w-3xl">
            <span className="text-label mb-10 block tracking-[0.8em]">
              Technological Pillars
            </span>
            <h2 className="text-7xl md:text-[8vw] font-display font-black leading-[0.85] uppercase tracking-tighter">
              Bespoke <br />{" "}
              <span className="text-accent italic font-serif lowercase tracking-normal">
                mastery.
              </span>
            </h2>
          </div>
          <div className="lg:max-w-sm pt-0 lg:pt-12 border-l-0 lg:border-l border-white/10 pl-0 lg:pl-12">
            <p className="text-lg text-white/80 leading-relaxed uppercase tracking-widest font-bold mb-8">
              Architecting the <br /> future of intelligence.
            </p>
            <p className="text-sm font-light text-white/70 leading-relaxed text-balance">
              We don't just build technology; we engineer experiences that
              bridge the gap between human intuition and digital precision.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-obsidian p-10 md:p-20 flex flex-col justify-between aspect-[4/5] md:aspect-3/4 hover:bg-obsidian-surface transition-colors duration-700 overflow-hidden"
            >
              {/* Cinematic Glow - Animated on mobile Viewport */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/10 transition-colors duration-1000"
              />

              <div className="space-y-16 relative z-10">
                <div className="space-y-8">
                  <motion.h3
                    initial={{ opacity: 0.8 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-display uppercase tracking-tight leading-none group-hover:text-accent transition-colors"
                  >
                    {s.title}
                  </motion.h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed group-hover:text-white transition-colors">
                    {s.detail}
                  </p>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-white/5 relative z-10">
                <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/50 group-hover:text-white transition-all">
                  Inspect Capability
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-700" />
                </button>
              </div>

              {/* Progress Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute inset-x-0 bottom-0 h-px bg-accent origin-left"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

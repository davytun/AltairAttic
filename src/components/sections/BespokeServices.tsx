import { motion } from "framer-motion";
import { ArrowUpRight, Home, Code2, Cpu } from "lucide-react";
import { DotBackground } from "@/components/ui/DotBackground";

const services = [
  {
    id: "01",
    label: "Automation",
    title: "Smarter Homes",
    desc: "Imagine walking in and your home just knows — lights adjust, security arms, energy saves. We make that real.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    icon: Home,
  },
  {
    id: "02",
    label: "Development",
    title: "Custom Software",
    desc: "Generic tools slow you down. We build software that fits your exact workflow and gets out of your way.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    icon: Code2,
  },
  {
    id: "03",
    label: "Integration",
    title: "Connected Devices",
    desc: "All your devices, finally talking to each other. We connect your hardware and software into one seamless system.",
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1200",
    icon: Cpu,
  },
];

const ServiceCard = ({
  s,
  i,
  onInquire,
}: {
  s: any;
  i: number;
  onInquire?: (name: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: i * 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      className="group relative flex flex-col md:flex-row h-full md:min-h-[450px] lg:min-h-[500px] bg-obsidian-surface border border-border-dim rounded-4xl md:rounded-[3rem] overflow-hidden hover:border-accent/30 transition-all duration-1000 shadow-2xl"
    >
      {/* Image Section (40%) */}
      <div className="w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden relative">
        <motion.img
          src={s.image}
          initial={{ filter: "brightness(0.8)", scale: 1.1 }}
          whileInView={{ filter: "brightness(1)", scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
          alt={s.title}
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-obsidian-surface hidden md:block" />
        <div className="absolute inset-0 bg-linear-to-t from-obsidian-surface via-transparent to-transparent md:hidden" />
      </div>

      {/* Content Section (60%) */}
      <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-20 flex flex-col justify-between relative z-10">
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0.8 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-[0.9] group-hover:text-silk-white transition-colors"
            >
              {s.title}
            </motion.h3>
            <p className="text-lg font-light text-light-gray leading-relaxed max-w-xl group-hover:text-silk-white transition-colors">
              {s.desc}
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-0 flex justify-end">
          <button
            onClick={() => onInquire?.(s.title)}
            className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black group/btn text-accent cursor-pointer"
          >
            Start a Project
            <div className="w-16 h-16 rounded-full border border-border-dim flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-obsidian transition-all duration-700">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const BespokeServices = ({
  onInquire,
}: {
  onInquire?: (name: string) => void;
}) => {
  return (
    <section className="bg-obsidian py-20 md:py-32 relative overflow-hidden">
      {/* Dot Background Pattern */}
      <DotBackground
        dotSize={1}
        gap={40}
        dotColor="rgba(139, 92, 246, 0.1)"
        fade={true}
        className="z-0"
      />

      <div className="container-luxury relative z-10 w-full">
        <div className="mb-20 md:mb-32 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-16 xl:gap-24">
          <div className="max-w-5xl">
            <span className="text-label mb-8 block">What We Do</span>
            <h2 className="text-huge font-display leading-[0.85] mb-8 text-silk-white">
              Tech That <br />{" "}
              <span className="text-text-muted">Works For You.</span>
            </h2>
          </div>
          <div className="xl:w-1/3 pt-0 pb-4">
            <p className="text-xl font-light text-text-muted leading-relaxed border-l border-accent/30 pl-10 mb-8 max-w-lg">
              We cut through the noise of generic tech. Altair Attic builds
              solutions that fit your life, grow your business, and actually
              make sense to use.
            </p>
          </div>
        </div>

        {/* Large Cinematic Cards Layout */}
        <div className="space-y-12">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} onInquire={onInquire} />
          ))}
        </div>
      </div>
    </section>
  );
};

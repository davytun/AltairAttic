import { motion } from "framer-motion";
import { DotBackground } from "@/components/ui/DotBackground";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We learn your space, your goals, and how you actually live or work day to day.",
  },
  {
    num: "02",
    title: "Design",
    desc: "We map out a custom system built around your needs — nothing off-the-shelf.",
  },
  {
    num: "03",
    title: "Installation",
    desc: "Our team handles everything on-site, cleanly and on schedule.",
  },
  {
    num: "04",
    title: "Ongoing Support",
    desc: "We stay with you — monitoring, updating, and improving your system over time.",
  },
];

export const Process = () => {
  return (
    <section className="bg-obsidian py-20 md:py-32 border-t border-border-dim relative overflow-hidden">
      <DotBackground
        dotSize={1.3}
        gap={36}
        dotColor="rgba(139, 92, 246, 0.09)"
        fade={true}
      />

      <div className="container-luxury relative z-10">
        <div className="mb-20 md:mb-32 space-y-8 text-center md:text-left text-balance">
          <span className="text-label mb-8 block">How We Work</span>
          <h2 className="text-huge font-display font-black leading-[0.85] uppercase tracking-tighter text-silk-white">
            From Idea to <br />{" "}
            <span className="text-text-muted">Reality.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-silk-white/5 border border-border-dim">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-obsidian group p-8 lg:p-12 space-y-12 md:space-y-16 hover:bg-accent transition-all duration-1000 cursor-default"
            >
              <span className="text-6xl md:text-7xl font-display font-black text-silk-white/5 group-hover:text-obsidian/10 transition-colors uppercase">
                {step.num}
              </span>
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-display uppercase tracking-tight group-hover:text-obsidian transition-colors text-silk-white">
                  {step.title}
                </h3>
                <div className="h-px w-full bg-border-dim group-hover:bg-obsidian/20 transition-colors" />
                <p className="text-sm font-light text-silk-white/70 group-hover:text-obsidian transition-colors leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

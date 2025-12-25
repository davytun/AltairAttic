import { motion } from "framer-motion";
import { DotBackground } from "@/components/ui/DotBackground";

const steps = [
  {
    num: "01",
    title: "Site Discovery",
    desc: "Understanding the architectural intent and daily human rhythms.",
  },
  {
    num: "02",
    title: "Digital Blueprint",
    desc: "Crafting a bespoke system architecture that remains invisible.",
  },
  {
    num: "03",
    title: "deployment",
    desc: "Precision engineering on-site, where code meets physical reality.",
  },
  {
    num: "04",
    title: "remote orchestration",
    desc: "Proactive support and system evolution for decades of living.",
  },
];

export const Process = () => {
  return (
    <section className="bg-obsidian py-48 px-[6vw] border-t border-white/5 relative overflow-hidden">
      <DotBackground
        dotSize={1.3}
        gap={36}
        dotColor="rgba(139, 92, 246, 0.09)"
        fade={true}
      />

      <div className="container-luxury relative z-10">
        <div className="mb-40 space-y-8 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold block">
            Methodology
          </span>
          <h2 className="text-6xl md:text-9xl font-display uppercase tracking-tighter leading-none">
            Blueprint to <br />{" "}
            <span className="text-gray-700">Execution.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-[2px] bg-white/5 border border-white/5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-obsidian group p-12 space-y-16 hover:bg-accent transition-all duration-1000 cursor-default"
            >
              <span className="text-7xl font-display font-black text-white/3 group-hover:text-obsidian/10 transition-colors uppercase">
                {step.num}
              </span>
              <div className="space-y-6">
                <h3 className="text-2xl font-display uppercase tracking-tight group-hover:text-obsidian transition-colors">
                  {step.title}
                </h3>
                <div className="h-px w-full bg-white/10 group-hover:bg-obsidian/20 animate-[scaleIn_1s_ease]" />
                <p className="text-sm font-light text-white/70 group-hover:text-obsidian transition-colors leading-relaxed">
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

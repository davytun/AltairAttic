import { motion } from "framer-motion";
import { GridBackground } from "@/components/ui/GridBackground";

const stats = [
  {
    label: "Systems Delivered",
    val: "150+",
    detail: "Precision-engineered solutions",
  },
  {
    label: "Stability Rate",
    val: "99.9%",
    detail: "Reliability you can lean on",
  },
  {
    label: "Execution Speed",
    val: "2.4ms",
    detail: "Optimized for performance",
  },
  { label: "Local Support", val: "24/7", detail: "Always here for your needs" },
];

export const ProofSection = () => {
  return (
    <section className="bg-obsidian py-32 border-y border-white/5 relative overflow-hidden">
      <GridBackground
        gridSize={60}
        gridColor="rgba(139, 92, 246, 0.06)"
        fade={true}
      />

      <div className="container-luxury px-[6vw] relative z-10">
        <div className="mb-20 text-center lg:text-left">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-black block mb-4">
            Trusted Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-white max-w-2xl">
            Reliability Built Into Every{" "}
            <span className="text-white/40">Line of Code.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4 group"
            >
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.4em] text-accent font-black block">
                  {stat.label}
                </span>
                <span className="text-4xl md:text-5xl font-display text-white font-medium block">
                  {stat.val}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">
                {stat.detail}
              </p>
              <div className="w-8 h-px bg-accent/30 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

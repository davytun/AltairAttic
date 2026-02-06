import { motion } from "framer-motion";
import { GridBackground } from "@/components/ui/GridBackground";

const stats: { label: string; val: string; detail: string }[] = [];

export const ProofSection = () => {
  return (
    <section className="bg-obsidian py-32 border-y border-white/5 relative overflow-hidden hidden">
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
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

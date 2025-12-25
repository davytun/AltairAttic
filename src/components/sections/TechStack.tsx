import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GridBackground } from "@/components/ui/GridBackground";

const groups = [
  {
    name: "Connectivity Protocols",
    items: ["Matter", "Thread", "Zigbee", "KNX", "Dali"],
    pos: "top-0 left-0",
  },
  {
    name: "Ecosystem Hubs",
    items: ["Home Assistant", "HomeKit", "Control4", "Crestron"],
    pos: "bottom-0 left-0",
  },
  {
    name: "Execution Stack",
    items: ["Node.js", "Flutter", "Next.js", "PHP", "Python", "React Native", "Figma", "Rust"],
    pos: "top-0 right-0",
  },
  {
    name: "Industrial I/O",
    items: ["PLC Integration", "Modbus", "MQTT", "ESP32"],
    pos: "bottom-0 right-0",
  },
];

export const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="bg-obsidian py-64 px-[6vw] relative overflow-hidden border-t border-white/5"
    >
      <GridBackground
        gridSize={50}
        gridColor="rgba(139, 92, 246, 0.07)"
        fade={true}
      />
      {/* Cinematic Background: Animated Grid & Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-linear-to-b from-transparent via-accent/50 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="flex flex-col items-start md:items-center justify-start md:justify-center text-left md:text-center mb-48 space-y-8">
          <span className="text-label">System Architecture</span>
          <h2 className="text-6xl md:text-9xl font-display uppercase tracking-tighter leading-none mb-4">
            The <span className="text-gray-700">Digital</span> <br />{" "}
            Foundation.
          </h2>
          <p className="max-w-2xl text-lg md:text-xl font-light text-white/70 leading-relaxed md:mx-auto">
            We architect intelligence from the electrical impulse to the final
            user interaction. Zero compromises on industrial-grade reliability.
          </p>
        </div>

        {/* The Schematic Core Layout */}
        <div className="relative min-h-[600px] lg:h-[600px] w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
          {/* Central Hub Node (Always visible, center of layout) */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
            className="relative z-20 w-48 h-48 rounded-full border border-accent/30 bg-obsidian-surface flex items-center justify-center p-8 group shadow-[0_0_100px_rgba(0,159,255,0.1)] lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <div className="w-full h-full rounded-full border-2 border-dashed border-accent/20 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-black tracking-widest text-accent uppercase">
                Core
              </span>
            </div>
          </motion.div>

          {/* Mobile Connection Lines (Vertical) */}
          <div className="absolute left-1/2 top-48 bottom-0 w-px bg-linear-to-b from-accent/30 via-accent/10 to-transparent -translate-x-1/2 lg:hidden z-0" />

          {/* Schematic Connection Lines (SVG) - Desktop Only */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none stroke-accent/10 fill-none hidden lg:block"
            viewBox="0 0 1200 600"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
              d="M 600 300 L 200 100 M 600 300 L 200 500 M 600 300 L 1000 100 M 600 300 L 1000 500"
              strokeWidth="1"
            />
          </svg>

          {/* Nodes (Groups) - Responsive Layout */}
          <div className="relative lg:absolute lg:inset-0 w-full lg:h-full flex flex-col lg:block gap-12 px-4 lg:px-0 z-10">
            {groups.map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`w-full lg:w-72 p-10 bg-obsidian-surface border border-white/5 rounded-3xl group hover:border-accent hover:bg-accent transition-all duration-700 shadow-2xl relative lg:absolute pointer-events-auto ${
                  i === 0
                    ? "lg:top-0 lg:left-0"
                    : i === 1
                    ? "lg:bottom-0 lg:left-0"
                    : i === 2
                    ? "lg:top-0 lg:right-0"
                    : "lg:bottom-0 lg:right-0"
                }`}
              >
                {/* Connector Dot for Mobile */}
                <div
                  className={`absolute lg:hidden top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-accent/30 bg-obsidian ${
                    i % 2 === 0 ? "-right-2" : "-left-2"
                  }`}
                />

                <div className="space-y-6">
                  <span className="text-[10px] font-mono text-accent group-hover:text-obsidian transition-colors block uppercase tracking-widest">
                    / Layer.0{i + 1}
                  </span>
                  <h3 className="text-2xl font-display uppercase tracking-tight text-white group-hover:text-obsidian transition-colors">
                    {g.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="text-[8px] uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full text-white/70 group-hover:text-obsidian/60 group-hover:border-obsidian/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Stats (Million Dollar Detail) */}
        <div className="mt-48 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-16">
          {[
            { label: "Stability Rate", val: "99.98%" },
            { label: "Nodes Managed", val: "140k+" },
            { label: "Deployment Speed", val: "2.4ms" },
            { label: "Security Level", val: "EAL6+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 block">
                {stat.label}
              </span>
              <span className="text-3xl font-display text-white font-medium">
                {stat.val}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

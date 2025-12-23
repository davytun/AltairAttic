import { motion } from "framer-motion";
import projectsData, { Project } from "@/utils/projectsData";

export const ProjectsGrid = () => {
  return (
    <section className="bg-obsidian pb-64 px-[4vw]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {(projectsData as Project[]).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: (index % 2) * 0.2,
                ease: [0.19, 1, 0.22, 1],
              }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* Architectural Card */}
              <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-[2.5rem] bg-obsidian-surface border border-white/5 transition-all duration-1000 group-hover:border-accent/40 group-hover:shadow-[0_0_80px_rgba(0,159,255,0.05)]">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  initial={{
                    filter: "grayscale(100%)",
                    opacity: 0.6,
                    scale: 1.1,
                  }}
                  whileInView={{
                    filter: "grayscale(0%)",
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-obsidian z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian/40 to-transparent z-10" />

                {/* Floating Meta */}
                <div className="absolute top-10 left-10 z-20 flex flex-col items-start gap-4">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[10px] font-black tracking-[0.5em] text-accent uppercase block mb-2"
                  >
                    / MMXXIV
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="px-4 py-2 border border-white/10 rounded-full bg-obsidian/40 backdrop-blur-xl"
                  >
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/60">
                      {project.category}
                    </span>
                  </motion.div>
                </div>

                {/* Main Identity */}
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <h3 className="text-4xl md:text-5xl font-display uppercase tracking-tight leading-none mb-6">
                    {project.title}
                  </h3>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-px bg-accent origin-left"
                  />
                </div>
              </div>

              {/* Description & Narrative */}
              <div className="mt-12 space-y-6 px-4">
                <p className="text-white/30 text-sm font-light leading-relaxed max-w-sm group-hover:text-white/60 transition-colors duration-700">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-x-12 gap-y-4 pt-6 border-t border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black tracking-widest text-white/20 uppercase">
                      Location
                    </span>
                    <span className="text-[10px] font-bold text-white/50">
                      {project.details.location}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black tracking-widest text-white/20 uppercase">
                      Client
                    </span>
                    <span className="text-[10px] font-bold text-white/50">
                      {project.details.client}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

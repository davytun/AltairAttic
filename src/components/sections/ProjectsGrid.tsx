import { motion } from "framer-motion";
import projectsData, { Project } from "@/utils/projectsData";

export const ProjectsGrid = () => {
  const softwareProjects = projectsData.filter(
    (p) => p.category === "Software",
  );
  const webProjects = projectsData.filter(
    (p) => p.category === "Web Development",
  );
  const automationProjects = projectsData.filter(
    (p) => p.category === "Automation",
  );

  const ProjectCard = ({
    project,
    index,
  }: {
    project: Project;
    index: number;
  }) => (
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
      <div className="relative aspect-4/5 md:aspect-square overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-obsidian-surface border border-white/5 transition-all duration-1000 group-hover:border-accent/40 group-hover:shadow-[0_0_80px_rgba(0,159,255,0.05)]">
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
        <div className="absolute top-6 md:top-10 left-6 md:left-10 z-20 flex flex-col items-start gap-4">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-black tracking-[0.5em] text-accent uppercase block mb-2"
          >
            / {project.year}
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
        <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12 z-20">
          <h3 className="text-3xl md:text-4xl font-display uppercase tracking-tight leading-none mb-6">
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
      </div>
    </motion.div>
  );

  return (
    <section className="bg-obsidian pb-32 md:pb-64 px-[4vw]">
      <div className="container-luxury space-y-20 md:space-y-32">
        {/* Software Development Section */}
        <div>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-xl font-display uppercase tracking-[0.3em] text-white">
              Software Development Projects
            </h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            {softwareProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Web Development Section */}
        <div>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-xl font-display uppercase tracking-[0.3em] text-white">
              Web Development Projects
            </h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            {webProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Home Automation Section */}
        <div>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-xl font-display uppercase tracking-[0.3em] text-white">
              Home Automation Projects
            </h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            {automationProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    title: "Smart Villa Automation",
    category: "Home Automation",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description:
      "Complete integration of lighting, HVAC, and security for a 5-bedroom luxury villa.",
  },
  {
    title: "IoT Energy Dashboard",
    category: "IoT Solutions",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description:
      "Real-time energy monitoring dashboard for industrial complex.",
  },
  {
    title: "Secure Access Control",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1558002038-10917738179d?auto=format&fit=crop&w=1200&q=80",
    description: "Biometric access control system for corporate headquarters.",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-20 bg-[#0A1128] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-secondary">Projects</span>
            </h2>
            <p className="text-gray-400">
              Showcasing our finest work in home automation and software
              engineering.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Works
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="group relative rounded-3xl overflow-hidden aspect-video md:aspect-21/9"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <motion.img
                style={{ y }}
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
              />

              <div className="absolute inset-x-0 bottom-0 z-20 p-8 md:p-12 bg-linear-to-t from-black/90 to-transparent">
                <span className="text-secondary font-medium mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                  {project.title}
                </h3>
                <p className="text-gray-300 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" className="w-full">
            View All Works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

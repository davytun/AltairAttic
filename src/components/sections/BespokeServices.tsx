import { motion } from "framer-motion";
import { ArrowUpRight, Home, Code2, Cpu } from "lucide-react";

const services = [
  {
    id: "01",
    label: "Automation",
    title: "Smart Home Automation",
    desc: "We specialize in creating intelligent living environments that provide comfort, security, and energy efficiency.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    icon: Home,
  },
  {
    id: "02",
    label: "Development",
    title: "Software Development",
    desc: "Our software development team delivers tailored enterprise-grade applications to meet your specific requirements efficiently.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    icon: Code2,
  },
  {
    id: "03",
    label: "Integration",
    title: "IoT and Embedded Systems Integration",
    desc: "We provide IoT and embedded systems solutions that bring intelligence to your devices and systems.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    icon: Cpu,
  },
];

export const BespokeServices = () => {
  return (
    <section className="bg-obsidian py-48 relative overflow-hidden">
      <div className="container-luxury px-[6vw]">
        <div className="mb-40 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-4xl">
            <span className="text-label mb-8 block">Disciplines</span>
            <h2 className="text-huge md:text-[10vw] font-display leading-[0.8] mb-8">
              Bridging <br />{" "}
              <span className="text-gray-700">Digital & Life.</span>
            </h2>
          </div>
          <div className="md:w-1/3 pt-10">
            <p className="text-xl font-light text-white/40 leading-relaxed border-l border-bronze/30 pl-10 mb-8">
              Altair Attic Limited is a cutting-edge technology company
              committed to making advanced technology accessible, beneficial,
              and fundamentally human.
            </p>
          </div>
        </div>

        {/* Large Cinematic Cards Layout */}
        <div className="space-y-12">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-10%" }}
              className="group relative flex flex-col md:flex-row h-full md:min-h-[500px] bg-obsidian-surface border border-white/5 rounded-[3rem] overflow-hidden hover:border-bronze/30 transition-all duration-1000 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              {/* Image Section (40%) */}
              <div className="w-full md:w-2/5 aspect-square md:aspect-auto overflow-hidden relative">
                <img
                  src={s.image}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  alt={s.title}
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-obsidian-surface hidden md:block" />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian-surface via-transparent to-transparent md:hidden" />
              </div>

              {/* Content Section (60%) */}
              <div className="w-full md:w-3/5 p-12 md:p-20 flex flex-col justify-between relative z-10">
                <div className="space-y-12">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-bronze font-black">
                      / Service.0{s.id}
                    </span>
                    <s.icon className="w-8 h-8 text-white/10 group-hover:text-bronze transition-colors duration-700" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-none group-hover:text-white transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-lg font-light text-gray-500 leading-relaxed max-w-xl group-hover:text-white/80 transition-colors">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-12 md:mt-0 flex justify-end">
                  <button className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black group/btn">
                    Launch Module
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-bronze group-hover:bg-bronze group-hover:text-obsidian transition-all duration-700">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

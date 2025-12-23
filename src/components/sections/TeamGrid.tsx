import { motion } from "framer-motion";
import teamData from "@/utils/teamData.ts";

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

export const TeamGrid = () => {
  return (
    <section className="bg-obsidian py-48 px-[4vw] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="container-luxury relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-3xl">
            <span className="text-label mb-8 block tracking-[0.6em]">
              Our Architects
            </span>
            <h2 className="text-huge md:text-8xl! font-display uppercase tracking-tight leading-none text-balance">
              The Minds <br /> <span className="text-gray-600">Driving</span>{" "}
              <br /> <span className="text-bronze">Innovation.</span>
            </h2>
          </div>
          <p className="text-xl font-light text-white/30 max-w-sm border-l border-bronze/20 pl-10 mb-6 italic">
            "Meet the architects of innovation driving Altair Attic forward."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {(teamData as TeamMember[]).map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.19, 1, 0.22, 1],
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-3/4 overflow-hidden rounded-4xl bg-obsidian-surface border border-white/5 group-hover:border-bronze transition-all duration-1000 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000" />

                <div className="absolute bottom-10 left-10 transition-transform duration-700 group-hover:-translate-y-2">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-bronze font-black block mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    / 0{index + 1}
                  </span>
                  <h3 className="text-2xl font-display uppercase text-white/90">
                    {member.name}
                  </h3>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <p className="text-sm font-light tracking-[0.3em] uppercase text-white/40">
                  {member.title}
                </p>
                <div className="h-px bg-white/10 w-12 group-hover:w-full group-hover:bg-bronze transition-all duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

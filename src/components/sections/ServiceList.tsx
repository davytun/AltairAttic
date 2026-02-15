import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import wordSlid, { ServiceData } from "@/utils/wordSlid";
import { ArrowUpRight, Zap, Target, Shield } from "lucide-react";

// Mapping icons to generic service themes since wordSlid doesn't provide them
const serviceIcons = [Zap, Target, Shield];

export const ServiceList = () => {
  return (
    <section className="bg-obsidian py-20 md:py-32">
      <div className="container-luxury">
        <div className="grid grid-cols-1 gap-px bg-silk-white/5 border border-border-dim">
          {(wordSlid as ServiceData[]).map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-obsidian hover:bg-obsidian-surface transition-colors duration-700"
              >
                <Link
                  to={`/services${service.url}`}
                  className="block p-8 md:p-24"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Index & Icon */}
                    {/* Icon removed */}

                    {/* Content */}
                    <div className="lg:col-span-7">
                      <h2 className="text-3xl md:text-6xl font-display uppercase tracking-tighter mb-4 md:mb-6 group-hover:text-silk-white transition-colors text-silk-white">
                        {service.name}
                      </h2>
                      <p className="text-lg text-silk-white/70 font-light max-w-xl group-hover:text-silk-white transition-colors">
                        {service.define}
                      </p>
                    </div>

                    {/* Image Preview (Visible on Hover in Desktop, Scroll on Mobile) */}
                    <div className="lg:col-span-3 overflow-hidden relative aspect-video rounded-xl bg-obsidian-surface transition-transform duration-1000 group-hover:scale-105">
                      <motion.img
                        src={service.image}
                        alt={service.name}
                        initial={{ filter: "grayscale(100%)", opacity: 0.2 }}
                        whileInView={{ filter: "grayscale(0%)", opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true, amount: 0.8 }}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-obsidian/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    {/* Arrow */}
                    <div className="lg:col-span-1 flex justify-end">
                      <div className="w-16 h-16 rounded-full border border-border-dim flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-2">
                        <ArrowUpRight className="w-6 h-6 text-silk-white group-hover:text-obsidian transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Horizontal Progress bar for hover/view */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 h-px bg-accent transition-transform duration-1000 origin-left z-20"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

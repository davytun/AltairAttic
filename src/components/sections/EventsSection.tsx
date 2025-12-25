import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { eventsData } from "@/utils/eventsData";
import { DotBackground } from "@/components/ui/DotBackground";

export const EventsSection = () => {
  const featured = eventsData.slice(0, 3);

  return (
    <section className="bg-obsidian py-48 px-[6vw] relative overflow-hidden border-t border-white/5">
      <DotBackground
        dotSize={1}
        gap={38}
        dotColor="rgba(139, 92, 246, 0.08)"
        fade={true}
      />

      <div className="container-luxury relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-black mb-8 block">
              / The Calendar
            </span>
            <h2 className="text-6xl md:text-9xl font-display uppercase tracking-tighter leading-none">
              Culture & <br />{" "}
              <span className="text-gray-700 italic font-serif lowercase tracking-normal">
                Momentum.
              </span>
            </h2>
          </div>
          <Link to="/events" className="group">
            <button className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black">
              View All Events
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-obsidian transition-all duration-700">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-4/5 rounded-4xl overflow-hidden mb-10 border border-white/5 group-hover:border-accent/30 transition-all duration-1000">
                <motion.img
                  src={item.image}
                  initial={{ filter: "grayscale(100%)", scale: 1.1 }}
                  whileInView={{ filter: "grayscale(0%)", scale: 1 }}
                  transition={{ duration: 2 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s]"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-transparent opacity-60" />

                <div className="absolute top-8 left-8">
                  <span className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-[8px] uppercase tracking-widest text-accent border border-accent/20">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-accent" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-accent" />
                    {item.location}
                  </div>
                </div>
                <motion.h3
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  className="text-2xl font-display uppercase tracking-tight group-hover:text-accent transition-colors"
                >
                  {item.title}
                </motion.h3>
                <p className="text-sm font-light text-white/70 leading-relaxed group-hover:text-white transition-colors">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

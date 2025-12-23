import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ActivitiesHero } from "@/components/sections/ActivitiesHero";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { eventsData } from "@/utils/eventsData";

const ActivitiesPage = () => {
  const activities = eventsData.filter((item) => item.category === "activity");

  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian">
      <Navbar />
      <ActivitiesHero />

      <section className="py-32 px-[6vw]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 border border-white/5 relative group-hover:border-accent/20 transition-all duration-1000">
                  <img
                    src={activity.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[3s]"
                    alt={activity.title}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-transparent" />

                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                    <div className="space-y-4">
                      <span className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-accent font-black">
                        <CheckCircle2 className="w-4 h-4" />
                        Operational Activity
                      </span>
                      <h3 className="text-3xl font-display uppercase tracking-tight">
                        {activity.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="px-8 space-y-8">
                  <p className="text-lg font-light text-white/40 leading-relaxed max-w-lg italic">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-12 pb-12 border-b border-white/5">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] uppercase tracking-widest text-white/20 font-black">
                        Timeline
                      </span>
                      <span className="text-xs text-white/60 font-medium">
                        {activity.date}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] uppercase tracking-widest text-white/20 font-black">
                        Requirement
                      </span>
                      <span className="text-xs text-white/60 font-medium">
                        {activity.time}
                      </span>
                    </div>
                  </div>

                  <button className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black group/btn">
                    Initiate Protocol
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-obsidian group-hover:border-accent transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ActivitiesPage;

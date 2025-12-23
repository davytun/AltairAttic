import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { EventsHero } from "@/components/sections/EventsHero";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { eventsData } from "@/utils/eventsData";

const EventsPage = () => {
  const events = eventsData.filter((item) => item.category === "event");

  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian">
      <Navbar />
      <EventsHero />

      <section className="py-32 px-[6vw]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-12">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative flex flex-col md:flex-row gap-12 p-8 md:p-12 rounded-[3rem] bg-obsidian-surface border border-white/5 hover:border-accent/30 transition-all duration-700"
              >
                <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden relative">
                  <img
                    src={event.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                    alt={event.title}
                  />
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-6 mb-8 text-[10px] uppercase tracking-widest text-white/40">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-accent" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-accent" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        {event.location}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight mb-6 group-hover:text-white transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-lg font-light text-white/30 max-w-2xl leading-relaxed mb-12">
                      {event.description}
                    </p>
                  </div>

                  <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-black group/btn">
                    Register Interest
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2 text-accent" />
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

export default EventsPage;

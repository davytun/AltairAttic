import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

export const Contact = () => {
  return (
    <section className="bg-obsidian py-48 px-[6vw] relative border-t border-white/5 overflow-hidden">
      {/* Viewport Safety: Ensure no spillover */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-linear-to-b from-accent/5 to-transparent pointer-events-none" />

      <div className="container-luxury max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Narrative Content: Reduced width for safety */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-8">
              <span className="text-label block">Next Steps</span>
              <h2 className="text-6xl md:text-8xl font-display leading-[0.8] uppercase tracking-tighter">
                Start the <br />{" "}
                <span className="text-gray-600 italic font-serif lowercase">
                  Inquiry
                </span>
                .
              </h2>
              <p className="text-lg font-light text-white/40 leading-relaxed max-w-sm">
                Ready to bridge the gap between architectural intent and
                intelligent reality?
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-10 h-10 shrink-0 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-obsidian transition-all duration-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/20 block mb-2 font-black">
                    Location
                  </span>
                  <p className="text-sm font-light text-white/60 group-hover:text-white transition-colors">
                    3rd floor, Opposite Cathedral of St. Peter, Abeokuta.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 pt-4">
                <div className="space-y-2 group">
                  <span className="text-[9px] uppercase tracking-widest text-white/20 flex items-center gap-4 font-black">
                    <Mail className="w-3 h-3 text-accent" /> Email
                  </span>
                  <a
                    href="mailto:hello@altair-attic.com"
                    className="text-xl font-display uppercase tracking-tight text-white group-hover:text-accent transition-colors flex items-center gap-3"
                  >
                    hello@altair-attic.com
                  </a>
                </div>
                <div className="space-y-2 group">
                  <span className="text-[9px] uppercase tracking-widest text-white/20 flex items-center gap-4 font-black">
                    <Phone className="w-3 h-3 text-accent" /> Line
                  </span>
                  <a
                    href="tel:+2347077195098"
                    className="text-xl font-display uppercase tracking-tight text-white group-hover:text-accent transition-colors flex items-center gap-3"
                  >
                    +234 707 719 5098
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* The Inquiry Form Studio: Responsive constrained width */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-obsidian-surface border border-white/5 p-10 md:p-16 lg:p-20 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group w-full max-w-[700px] ml-auto"
            >
              <motion.div
                initial={{ opacity: 0.1, scale: 0.8 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/10 blur-[100px] rounded-full group-hover:bg-accent/20 transition-all duration-1000"
              />

              <form className="space-y-12 relative z-10 w-full">
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">
                    Identity
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light focus:outline-none focus:border-accent transition-all placeholder:text-white/5"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">
                    Electronic Mail
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light focus:outline-none focus:border-accent transition-all placeholder:text-white/5"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">
                    Briefing
                  </label>
                  <textarea
                    rows={1}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light focus:outline-none focus:border-accent transition-all resize-none placeholder:text-white/5"
                    placeholder="Architectural intent"
                  />
                </div>

                <div className="pt-8">
                  <Magnetic>
                    <button className="h-20 px-12 bg-white text-obsidian rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-6 hover:bg-accent transition-all duration-700 shadow-2xl group/btn">
                      Dispatch Studio{" "}
                      <div className="p-2 bg-obsidian text-white rounded-full group-hover/btn:bg-white group-hover/btn:text-obsidian transition-all">
                        <Send className="w-3 h-3" />
                      </div>
                    </button>
                  </Magnetic>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

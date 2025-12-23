import { motion } from "framer-motion";

export const EventsHero = () => {
  return (
    <section className="relative pt-64 pb-32 overflow-hidden bg-obsidian">
      {/* Background Decor & Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-obsidian/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover opacity-30 grayscale"
          alt="Events Background"
        />
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[140px] -translate-y-1/2 -translate-x-1/2 z-20" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 z-20" />
      </div>

      <div className="container-luxury px-[6vw] relative z-10">
        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.6em] text-accent font-black mb-8 block"
          >
            / Engagement & Insights
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-huge md:text-[10vw] font-display leading-[0.85] uppercase tracking-tighter mb-12"
          >
            Curated <br />{" "}
            <span className="text-gray-700 italic font-serif lowercase tracking-normal">
              Chronicles.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-white/40 max-w-2xl leading-relaxed"
          >
            Join us at the intersection of architectural thought leadership and
            technological precision. Our events are designed to provoke and
            inspire.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1.5, ease: "circOut" }}
            className="w-40 h-px bg-linear-to-r from-transparent via-accent to-transparent mt-24"
          />
        </div>
      </div>
    </section>
  );
};

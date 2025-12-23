import { motion } from "framer-motion";

export const ActivitiesHero = () => {
  return (
    <section className="relative pt-64 pb-32 overflow-hidden bg-obsidian">
      {/* Background Decor & Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-obsidian/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover opacity-30 grayscale"
          alt="Activities Background"
        />
        <div className="absolute top-1/2 right-0 w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 z-20" />
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 z-20" />
      </div>

      <div className="container-luxury px-[6vw] relative z-10">
        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.6em] text-accent font-black mb-8 block"
          >
            / Operational Excellence
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-huge md:text-[10vw] font-display leading-[0.85] uppercase tracking-tighter mb-12"
          >
            Tactical <br />{" "}
            <span className="text-gray-700 italic font-serif lowercase tracking-normal">
              Endeavors.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-white/40 max-w-2xl leading-relaxed"
          >
            Explore our range of specialized activities, from diagnostic audits
            to exclusive site tours, designed to optimize your living
            environment.
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

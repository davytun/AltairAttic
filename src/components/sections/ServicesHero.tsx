import { motion } from "framer-motion";

export const ServicesHero = () => {
  return (
    <section className="relative pt-64 pb-32 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container-luxury relative z-10 px-[4vw]">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="text-label mb-12 block tracking-[0.8em] text-accent uppercase">
              Capabilities / 01
            </span>
            <h1 className="text-huge md:text-[14vw] font-display font-black leading-[0.75] tracking-tighter uppercase mb-20">
              Our <br />
              <span className="text-white/10 italic font-serif lowercase tracking-normal">
                expertise.
              </span>
            </h1>
          </motion.div>
          <p className="max-w-2xl text-xl text-white/70 font-light leading-relaxed text-balance">
            Crafting the future through precision engineering, intelligent
            design, and a relentless pursuit of technological excellence.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
            className="w-40 h-px bg-linear-to-r from-transparent via-accent to-transparent mt-24"
          />
        </div>
      </div>
    </section>
  );
};

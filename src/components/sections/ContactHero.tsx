import { motion } from "framer-motion";

export const ContactHero = () => {
  return (
    <section className="relative pt-64 pb-32 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-accent/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container-luxury relative z-10 px-[4vw]">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-label mb-10 px-8 py-2 border border-white/10 rounded-full tracking-[0.5em] uppercase text-[10px] font-black">
              Seamless Engagement
            </span>
            <h1 className="text-huge md:text-[12vw] font-display font-black leading-none uppercase tracking-tighter mb-12">
              Initiate <br /> <span className="text-accent">Dialogue.</span>
            </h1>
            <p className="max-w-2xl text-xl text-white/30 font-light leading-relaxed tracking-wide text-balance">
              Whether you're looking to automate your environment or engineer a
              bespoke software solution, our team is ready to architecture your
              vision.
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
            className="w-48 h-px bg-linear-to-r from-transparent via-accent to-transparent mt-24"
          />
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { motion } from "framer-motion";

const images = [
  {
    url: "/assets/smart-switches/how/c397a90ced47b5c8c614ef341f3af600.jpg",
    title: "Precision Capacitance",
    desc: "Nanorobotic gold-plated contacts for zero-latency switching.",
  },
  {
    url: "/assets/smart-switches/how/cb8aaac212e111d4c6e65b9b76838437.jpg",
    title: "Nigeria-Hardened PCB",
    desc: "Conformal coating to withstand extreme humidity and voltage spikes.",
  },
  {
    url: "/assets/smart-switches/how/d32b1b94c1ae456ba9791dc30d30bbf8.jpg",
    title: "G3 Tempered Crystal",
    desc: "4mm architectural glass that is scratch-proof and shatter-resistant.",
  },
  {
    url: "/assets/smart-switches/how/ddfa0b0327a6b88816be6fc57733517b (1).jpg",
    title: "Silver Alloy Relays",
    desc: "Rated for 100,000+ cycles of heavy-duty industrial load.",
  },
];

const EngineeringReel = () => {
  return (
    <section className="py-48 bg-obsidian-surface relative overflow-hidden">
      <div className="container-luxury mb-24">
        <div className="max-w-3xl">
          <div className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-8">
            The Engineering Protocol
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-black uppercase mb-8 leading-[0.9]">
            Obsessive Detail. <br />
            <span className="text-white/30 text-3xl lg:text-4xl">Unrivaled Build Integrity.</span>
          </h2>
          <p className="text-xl text-text-muted font-light leading-relaxed">
            Every Altair Attic switch undergoes a 48-hour rigorous stress test
            under simulated Nigerian grid conditions before it reaches your door.
          </p>
        </div>
      </div>

      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="rounded-[40px] overflow-hidden border border-white/10 aspect-[4/5] bg-white/5 relative">
                <img
                  src={img.url}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={img.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">
                    {img.title}
                  </h4>
                  <p className="text-[10px] text-white/40 leading-relaxed font-light">
                    {img.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringReel;

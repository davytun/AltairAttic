import { motion } from "framer-motion";

const services = [
  {
    index: "01",
    label: "Automation",
    title: "Ecosystem Orchestration",
    desc: "We don't just connect devices; we design unified systems that learn and adapt to your presence.",
  },
  {
    index: "02",
    label: "Development",
    title: "Bespoke Digital Core",
    desc: "Custom software foundations engineered for reliability, security, and effortless human interaction.",
  },
  {
    index: "03",
    label: "Consultancy",
    title: "Strategic Intelligence",
    desc: "Guiding the architectural evolution of smart environments from blueprint to execution.",
  },
];

export const LuxuryServices = () => {
  return (
    <section className="bg-black section-padding px-[4vw]">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 border-b border-white/5 pb-12">
          <h2 className="text-4xl md:text-6xl max-w-xl">
            Elevating the <span className="text-muted">Standards</span> of
            Intelligence.
          </h2>
          <div className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-editorial">
              Our expertise lies at the intersection of architecture,
              engineering, and digital empathy. We provide a full-spectrum
              approach to modern living.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-32">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-default"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                  / {service.index}
                </span>
                <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 transition-all duration-500" />
                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                  {service.label}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl mb-6 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { ServiceData } from "@/utils/wordSlid";
import { CheckCircle2, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface Props {
  service: ServiceData;
}

export const ServiceContent = ({ service }: Props) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [service.Q1, service.Q2, service.Q3];

  return (
    <section className="bg-obsidian py-32 px-[4vw]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-display uppercase text-white/90 tracking-tight">
                Architecting Excellence
              </h2>
              {service.explain.map((p, i) => (
                <div key={i} className="space-y-6">
                  <p className="text-xl font-light text-white/80 leading-relaxed">
                    {p.e_p1}
                  </p>
                  <p className="text-xl font-light text-white/80 leading-relaxed">
                    {p.e_p2}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-16 border-t border-white/5">
              <h3 className="text-xl font-display uppercase text-accent mb-12 tracking-widest">
                Key Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.additionalInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-obsidian-surface border border-white/5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-white/80 font-medium leading-relaxed">
                      {info}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (FAQ & Stats) */}
          <div className="lg:col-span-5 space-y-16">
            <div className="p-12 rounded-3xl bg-linear-to-br from-obsidian-surface to-obsidian border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <h3 className="text-2xl font-display uppercase mb-12 relative z-10">
                Common Inquiries
              </h3>

              <div className="space-y-4 relative z-10">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-white/5 pb-4">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between text-left py-4 group"
                    >
                      <span className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                        {faq.Question}
                      </span>
                      {openFaq === i ? (
                        <Minus className="w-4 h-4 text-accent" />
                      ) : (
                        <Plus className="w-4 h-4 text-white/20" />
                      )}
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-white/70 leading-relaxed pb-6">
                          {faq.Answer}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12 rounded-3xl border border-accent/10 flex flex-col items-center text-center gap-8 group hover:border-accent transition-colors duration-700">
              <span className="text-[10px] uppercase font-black tracking-[0.6em] text-white/50">
                Ready to initiate?
              </span>
              <h4 className="text-3xl font-display uppercase">
                Craft your bespoke <br />{" "}
                <span className="text-accent">solution now.</span>
              </h4>
              <button className="px-12 py-4 border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] group-hover:bg-white group-hover:text-black transition-all">
                Start Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

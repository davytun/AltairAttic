import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";
import { GridBackground } from "@/components/ui/GridBackground";

import { contactService, ContactData } from "@/services/contactService";

export const Contact = ({
  initialSubject = "",
}: {
  initialSubject?: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: initialSubject,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, message: initialSubject }));
    }
  }, [initialSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await contactService.submitContact(formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-obsidian py-20 md:py-32 relative border-t border-border-dim overflow-hidden"
    >
      <GridBackground
        gridSize={55}
        gridColor="rgba(139, 92, 246, 0.06)"
        fade={true}
      />

      {/* Viewport Safety: Ensure no spillover */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-linear-to-b from-accent/5 to-transparent pointer-events-none" />

      <div className="container-luxury max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start lg:items-center">
          {/* Narrative Content: Reduced width for safety */}
          <div className="lg:col-span-5 space-y-12 md:space-y-16">
            <div className="space-y-8">
              <span className="text-label block">Get in Touch</span>
              <h2 className="text-6xl md:text-8xl font-display leading-[0.8] uppercase tracking-tighter text-silk-white">
                Let's Make <br />{" "}
                <span className="text-text-muted italic font-serif lowercase">
                  it Happen
                </span>
                .
              </h2>
              <p className="text-lg font-light text-light-gray leading-relaxed max-w-sm">
                Tell us what you need. We'll get back to you within 24 hours
                with a clear plan and honest advice.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-10 h-10 shrink-0 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-obsidian transition-all duration-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-text-muted block mb-2 font-black">
                    Location
                  </span>
                  <p className="text-sm font-light text-light-gray group-hover:text-silk-white transition-colors">
                    3rd floor, Opposite Cathedral of St. Peter Ang. Sec. Sch,
                    Along Oba Ademola Maternity Hospital, Ake, Abeokuta.{" "}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 pt-4">
                <div className="space-y-2 group">
                  <span className="text-[9px] uppercase tracking-widest text-text-muted flex items-center gap-4 font-black">
                    <Mail className="w-3 h-3 text-accent" /> Email
                  </span>
                  <a
                    href="mailto:hello@altair-attic.com"
                    className="text-xl font-display uppercase tracking-tight text-silk-white group-hover:text-accent transition-colors flex items-center gap-3"
                  >
                    hello@altair-attic.com
                  </a>
                </div>
                <div className="space-y-2 group">
                  <span className="text-[9px] uppercase tracking-widest text-text-muted flex items-center gap-4 font-black">
                    <Phone className="w-3 h-3 text-accent" /> Line
                  </span>
                  <a
                    href="tel:+2347077195098"
                    className="text-xl font-display uppercase tracking-tight text-silk-white group-hover:text-accent transition-colors flex items-center gap-3"
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
              className="bg-obsidian-surface border border-border-dim p-8 md:p-16 lg:p-20 rounded-4xl md:rounded-[3rem] shadow-2xl relative overflow-hidden group w-full max-w-[700px] ml-auto"
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

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display uppercase tracking-tight text-silk-white">
                        Message Sent!
                      </h3>
                      <p className="text-silk-white/50 text-sm">
                        Thanks for reaching out. We'll reply within 24 hours.
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="border-border-dim text-text-muted hover:text-silk-white"
                    >
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-12 relative z-10 w-full"
                  >
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-text-muted font-black">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-border-dim py-4 text-xl font-light focus:outline-none focus:border-accent transition-all placeholder:text-text-muted/70 text-silk-white [html[data-theme='light']_&]:border-black/20"
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-text-muted font-black">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-border-dim py-4 text-xl font-light focus:outline-none focus:border-accent transition-all placeholder:text-text-muted/70 text-silk-white [html[data-theme='light']_&]:border-black/20"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-text-muted font-black">
                        Your Message
                      </label>
                      <textarea
                        required
                        rows={1}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-border-dim py-4 text-xl font-light focus:outline-none focus:border-accent transition-all resize-none placeholder:text-text-muted/70 text-silk-white [html[data-theme='light']_&]:border-black/20"
                        placeholder="Tell us your biggest tech challenge" 
                      />
                    </div>

                    <div className="pt-8 space-y-4">
                      {error && (
                        <p className="text-red-400 text-xs font-bold uppercase tracking-widest">
                          {error}
                        </p>
                      )}
                      <Magnetic>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="h-16 md:h-20 px-8 md:px-12 bg-silk-white text-obsidian rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center md:justify-start gap-6 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-700 shadow-2xl group/btn"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}{" "}
                          <div className="p-2 bg-obsidian text-silk-white rounded-full group-hover/btn:bg-silk-white group-hover/btn:text-obsidian transition-all">
                            <Send className="w-3 h-3" />
                          </div>
                        </button>
                      </Magnetic>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export const ContactFormBuilder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    const emailData = {
      from_name: formData.name,
      email: formData.email,
      number: formData.phone,
      message: formData.message,
    };

    emailjs
      .send(
        "service_hoyq6xf",
        "template_2zbt1dc",
        emailData,
        "xTVbm4gOtEOKY8Lx9"
      )
      .then(() => {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => {
        console.error("Email error:", error);
        setFormStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const inputClasses =
    "w-full bg-transparent border-b border-white/10 py-6 text-xl font-light text-white focus:border-accent focus:outline-hidden transition-all duration-700 placeholder:text-white/10";

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Full Name
            </span>
            <input
              type="text"
              name="name"
              placeholder="E.g. Alexander Sterling"
              className={inputClasses}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Electronic Mail
            </span>
            <input
              type="email"
              name="email"
              placeholder="alex@domain.com"
              className={inputClasses}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
            Telecommunication
          </span>
          <input
            type="tel"
            name="phone"
            placeholder="+234 000 000 0000"
            className={inputClasses}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
            Manifesto / Inquiry
          </span>
          <textarea
            name="message"
            placeholder="Architecture your vision here..."
            rows={4}
            className={`${inputClasses} resize-none`}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </div>

        <div className="pt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex items-center gap-6 px-12 py-6 border border-white/10 rounded-full overflow-hidden transition-all duration-700 hover:border-accent disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-obsidian transition-colors">
              {isSubmitting ? "Processing..." : "Submit Inquiry"}
            </span>
            <Send className="relative z-10 w-4 h-4 text-white group-hover:text-obsidian group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-700" />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {formStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`mt-12 p-8 rounded-3xl flex items-center gap-6 border ${
              formStatus === "success"
                ? "bg-green-500/5 border-green-500/20 text-green-400"
                : "bg-red-500/5 border-red-500/20 text-red-400"
            }`}
          >
            {formStatus === "success" ? (
              <CheckCircle2 className="w-6 h-6 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 shrink-0" />
            )}
            <p className="text-sm font-medium tracking-wide">
              {formStatus === "success"
                ? "Inquiry transmitted successfully. We will architecture a response shortly."
                : "Transmission failure. Please re-initiate or contact us via telecommunication."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

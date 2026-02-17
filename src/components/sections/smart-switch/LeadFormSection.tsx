import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NIGERIAN_STATES } from "@/lib/constants";
import salesData from "@/data/smart-switch-sales.json";

const { LEAD_FORM } = salesData;

interface Model {
  id: string;
  name: string;
  price: number;
  desc: string;
  img: string;
}

interface LeadFormSectionProps {
  models: Model[];
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onSubmit: (formData: any) => Promise<void>;
  isSubmitting: boolean;
}

const LeadFormSection = React.forwardRef<HTMLDivElement, LeadFormSectionProps>(
  (
    {
      models,
      selectedModel,
      setSelectedModel,
      quantity,
      setQuantity,
      onSubmit,
      isSubmitting,
    },
    ref,
  ) => {
    const [formData, setFormData] = React.useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      whatsapp: "",
      address: "",
      city: "",
      state: "",
      additionalNotes: "",
    });

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <section
        ref={ref}
        id="lead-form-section"
        className="py-12 lg:py-24 bg-obsidian-surface relative overflow-hidden transition-colors duration-500"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container-luxury relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div className="space-y-8 lg:space-y-12 lg:sticky lg:top-12">
                <div>
                  <h2 className="text-3xl lg:text-6xl font-display font-black leading-tight lg:leading-[0.9] text-silk-white uppercase mb-6">
                    {LEAD_FORM.titlePrefix} <br />
                    <span className="text-accent italic font-display">
                      {LEAD_FORM.titleAccent}
                    </span>
                  </h2>
                  <p className="text-text-muted text-base lg:text-xl font-light leading-relaxed max-w-md">
                    {LEAD_FORM.description}
                  </p>
                </div>

                <div className="p-8 lg:p-10 rounded-[32px] lg:rounded-[48px] bg-accent/5 border border-accent/10 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 text-accent/10 group-hover:scale-110 transition-transform">
                    <ShieldCheck
                      size={80}
                      className="lg:w-[120px] lg:h-[120px]"
                    />
                  </div>
                  <div className="text-accent font-black uppercase tracking-widest text-[10px] mb-4">
                    {LEAD_FORM.accentBadge}
                  </div>
                  <div className="text-2xl lg:text-3xl font-display font-black text-silk-white mb-3">
                    {LEAD_FORM.accentTitle}
                  </div>
                  <p className="text-xs lg:text-sm text-text-muted/60 leading-relaxed font-light">
                    {LEAD_FORM.accentText}
                  </p>
                </div>
              </div>

              <div className="bg-obsidian-muted/50 border border-border-dim rounded-[32px] lg:rounded-[48px] p-6 lg:p-12 shadow-3xl backdrop-blur-xl">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 lg:space-y-8"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                      Target Hardware
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3">
                      {models.map((model) => (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setSelectedModel(model)}
                          className={cn(
                            "py-3 lg:py-5 px-2 rounded-xl border text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all",
                            selectedModel.id === model.id
                              ? "bg-accent border-accent text-white dark:text-obsidian shadow-xl"
                              : "bg-obsidian border-border-dim text-text-muted hover:bg-obsidian/80",
                          )}
                        >
                          {model.id.split("-")[0]}G
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 lg:p-6 bg-obsidian border border-border-dim rounded-2xl lg:rounded-[24px] flex items-center justify-between shadow-inner">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-muted/40 mb-1">
                        Quantity
                      </span>
                      <span className="text-lg lg:text-xl font-display font-black text-silk-white">
                        {quantity} {quantity === 1 ? "Unit" : "Units"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4 bg-obsidian-muted rounded-xl p-1.5 lg:p-2 border border-border-dim shadow-lg">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center rounded-lg bg-obsidian border border-border-dim text-text-muted hover:text-accent transition-all active:scale-95"
                      >
                        <Minus size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center rounded-lg bg-obsidian border border-border-dim text-text-muted hover:text-accent transition-all active:scale-95"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2 lg:space-y-3">
                      <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                        First Name
                      </label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Samuel"
                        className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                      <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                        Last Name
                      </label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g. Okon"
                        className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2 lg:space-y-3">
                      <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +234 801 234 5678"
                        className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                      <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                        WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="e.g. +234 801 234 5678"
                        className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. samuel.okon@example.com"
                      className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                      Full Delivery Address
                    </label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House No, Street Name..."
                      className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2 lg:space-y-3">
                      <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                        City
                      </label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Lagos"
                        className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                      <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                        State
                      </label>
                      <div className="relative">
                        <select
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-obsidian">
                            Select State
                          </option>
                          {NIGERIAN_STATES.map((state) => (
                            <option
                              key={state}
                              value={state}
                              className="bg-obsidian"
                            >
                              {state}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted/40 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-text-muted/40 ml-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Special delivery instructions..."
                      rows={4}
                      className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 py-4 lg:py-6 text-silk-white placeholder:text-text-muted/20 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner resize-none"
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full group relative overflow-hidden h-16 lg:h-20 bg-accent text-white dark:text-obsidian rounded-2xl lg:rounded-3xl font-display font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10 flex items-center justify-center gap-4">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Your Order</span>
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-2 transition-transform"
                          />
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

export default LeadFormSection;

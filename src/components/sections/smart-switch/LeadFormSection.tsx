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
    const labelClass =
      "text-[9px] lg:text-[10px] font-black uppercase tracking-[0.22em] text-text-muted ml-1";
    const inputClass =
      "w-full bg-obsidian border border-border-dim rounded-lg lg:rounded-xl px-4 lg:px-5 h-12 lg:h-13 text-sm lg:text-base text-silk-white placeholder:text-text-muted focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:placeholder:text-slate-500";
    const textareaClass =
      "w-full bg-obsidian border border-border-dim rounded-lg lg:rounded-xl px-4 lg:px-5 py-3.5 lg:py-4 text-sm lg:text-base text-silk-white placeholder:text-text-muted focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner resize-none [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:placeholder:text-slate-500";

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
        className="py-10 lg:py-16 bg-obsidian-surface relative overflow-hidden transition-colors duration-500"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container-luxury relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className="space-y-6 lg:space-y-8 lg:sticky lg:top-8">
                <div>
                  <h2 className="text-2xl lg:text-4xl font-display font-black leading-tight lg:leading-[0.95] text-silk-white uppercase mb-4">
                    {LEAD_FORM.titlePrefix} <br />
                    <span className="text-accent italic font-display">
                      {LEAD_FORM.titleAccent}
                    </span>
                  </h2>
                  <p className="text-text-muted text-sm lg:text-base font-light leading-relaxed max-w-md">
                    {LEAD_FORM.description}
                  </p>
                </div>

                <div className="p-5 lg:p-7 rounded-2xl lg:rounded-3xl bg-accent/5 border border-accent/10 backdrop-blur-3xl relative overflow-hidden group shadow-xl">
                  <div className="absolute top-0 right-0 p-5 text-accent/10 group-hover:scale-110 transition-transform">
                    <ShieldCheck
                      size={52}
                      className="lg:w-[72px] lg:h-[72px]"
                    />
                  </div>
                  <div className="text-accent font-black uppercase tracking-[0.2em] text-[9px] mb-2">
                    {LEAD_FORM.accentBadge}
                  </div>
                  <div className="text-lg lg:text-2xl font-display font-black text-silk-white mb-2">
                    {LEAD_FORM.accentTitle}
                  </div>
                  <p className="text-[11px] lg:text-sm text-text-muted leading-relaxed font-light">
                    {LEAD_FORM.accentText}
                  </p>
                </div>
              </div>

              <div className="bg-obsidian-muted/50 border border-border-dim rounded-2xl lg:rounded-3xl p-4 lg:p-7 shadow-2xl backdrop-blur-xl [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-black/10 [html[data-theme='light']_&]:shadow-xl">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 lg:space-y-5"
                >
                  <div className="space-y-2.5">
                    <label className={labelClass}>
                      Target Hardware
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3">
                      {models.map((model) => (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setSelectedModel(model)}
                          className={cn(
                            "py-2.5 lg:py-3 px-2 rounded-lg border text-[9px] lg:text-[10px] font-black uppercase tracking-[0.15em] transition-all",
                            selectedModel.id === model.id
                              ? "bg-accent border-accent text-white dark:text-obsidian shadow-xl"
                              : "bg-obsidian border-border-dim text-text-muted hover:bg-obsidian/80 [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300 [html[data-theme='light']_&]:hover:bg-slate-100 [html[data-theme='light']_&]:text-slate-700",
                          )}
                        >
                          {model.id.split("-")[0]}G
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 lg:p-4 bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl flex items-center justify-between shadow-inner [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-[0.16em] text-text-muted mb-0.5">
                        Quantity
                      </span>
                      <span className="text-base lg:text-lg font-display font-black text-silk-white">
                        {quantity} {quantity === 1 ? "Unit" : "Units"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-obsidian-muted rounded-lg p-1.5 border border-border-dim shadow-lg [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-slate-300">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 lg:w-10 h-9 lg:h-10 flex items-center justify-center rounded-md bg-obsidian border border-border-dim text-text-muted hover:text-accent transition-all active:scale-95 [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300"
                      >
                        <Minus size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 lg:w-10 h-9 lg:h-10 flex items-center justify-center rounded-md bg-obsidian border border-border-dim text-text-muted hover:text-accent transition-all active:scale-95 [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="space-y-2">
                      <label className={labelClass}>
                        First Name
                      </label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Samuel"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        Last Name
                      </label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g. Okon"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="space-y-2">
                      <label className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +234 801 234 5678"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="e.g. +234 801 234 5678"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. samuel.okon@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>
                      Full Delivery Address
                    </label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House No, Street Name..."
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="space-y-2">
                      <label className={labelClass}>
                        City
                      </label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Lagos"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        State
                      </label>
                      <div className="relative">
                        <select
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full bg-obsidian border border-border-dim rounded-xl lg:rounded-2xl px-6 h-14 lg:h-16 text-silk-white focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-inner appearance-none cursor-pointer [html[data-theme='light']_&]:bg-slate-50 [html[data-theme='light']_&]:border-slate-300"
                        >
                          <option
                            value=""
                            disabled
                            className="bg-obsidian [html[data-theme='light']_&]:bg-slate-50"
                          >
                            Select State
                          </option>
                          {NIGERIAN_STATES.map((state) => (
                            <option
                              key={state}
                              value={state}
                              className="bg-obsidian [html[data-theme='light']_&]:bg-slate-50"
                            >
                              {state}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      placeholder="Special delivery instructions..."
                      rows={3}
                      className={textareaClass}
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full group relative overflow-hidden h-12 lg:h-14 bg-accent text-white dark:text-obsidian rounded-xl lg:rounded-2xl font-display font-black uppercase tracking-[0.16em] lg:tracking-[0.2em] text-[11px] lg:text-xs shadow-xl transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10 flex items-center justify-center gap-2.5">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Your Order</span>
                          <ArrowRight
                            size={16}
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

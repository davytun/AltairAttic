import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Mail,
      label: "Electronic Mail",
      value: "hello@altair-attic.com",
      subValue: "Response within 24 hours",
    },
    {
      icon: Phone,
      label: "Telecommunication",
      value: "+234 707 719 5098",
      subValue: "Mon - Fri, 9am - 5pm",
    },
    {
      icon: MapPin,
      label: "Studio Room",
      value: "Ogun State, Nigeria",
      subValue: "Main Operations Hub",
    },
    {
      icon: Clock,
      label: "Operational Hours",
      value: "9:00 AM - 5:00 PM",
      subValue: "West African Time",
    },
  ];

  return (
    <section className="bg-obsidian py-32 border-t border-border-dim">
      <div className="container-luxury px-[4vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {contactDetails.map((detail, i) => (
            <div
              key={i}
              className="group p-10 rounded-[2.5rem] bg-obsidian-surface border border-border-dim hover:border-accent/30 transition-all duration-700"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:rotate-12 transition-all duration-700">
                <detail.icon className="w-5 h-5 text-accent group-hover:text-obsidian transition-colors" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/40">
                  {detail.label}
                </span>
                <h4 className="text-xl font-display uppercase tracking-tight text-silk-white">
                  {detail.value}
                </h4>
                <p className="text-xs text-text-muted font-light">
                  {detail.subValue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

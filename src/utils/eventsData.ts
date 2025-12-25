export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: "event" | "activity";
  url: string;
}

export const eventsData: EventData[] = [
  {
    id: "e1",
    title: "Eco-Tech Symposium 2024",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Virtual / Lagos Annex",
    description: "A deep dive into sustainable architecture and carbon-neutral smart systems.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    category: "event",
    url: "/events/eco-tech-symposium-2024",
  },
  {
    id: "e2",
    title: "AI & Living Spaces Workshop",
    date: "April 20, 2024",
    time: "2:00 PM",
    location: "Abuja Tech Hub",
    description: "Hands-on session on integrating AI orchestration within luxury residencies.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    category: "event",
    url: "/events/ai-living-spaces-workshop",
  },
  {
    id: "a1",
    title: "Invisible Tech Site Tour",
    date: "Ongoing",
    time: "By Appointment",
    location: "Lagos / Ogun",
    description: "Experience first-hand how our systems remain invisible yet omnipresent in premium homes.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    category: "activity",
    url: "/activities/site-tour",
  },
  {
    id: "a2",
    title: "Smart System Audit",
    date: "Available",
    time: "48h Notice",
    location: "On-Site / Diagnostic",
    description: "Professional diagnostic and optimization audit for existing automation setups.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200",
    category: "activity",
    url: "/activities/system-audit",
  },
];

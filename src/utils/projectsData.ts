export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  link?: string;
}

const projectsData: Project[] = [
  // Software Development Projects
  {
    id: "01",
    title: "Tender App",
    category: "Software",
    year: "2024",
    description: "A digital procurement platform designed to simplify tender discovery, submission, and management. The app enables real-time tender notifications, secure document uploads, user authentication, and payment processing—helping suppliers and organizations manage procurement transparently and efficiently.",
    image: "/case.png",
    link: "https://play.google.com/store/apps/details?id=co.tenderpay.mobile",
  },
  {
    id: "02",
    title: "Fittingz – Fashion Management App",
    category: "Software",
    year: "2024",
    description: "A smart fashion-tech solution built for designers to manage client measurements, orders, inventory, and events digitally. Fittingz replaces manual record-keeping with a secure, user-friendly system that improves accuracy, customer engagement, and workflow efficiency.",
    image: "/pfos.png",
    link: "https://fittingz.vercel.app/",
  },

  // Web Development Projects
  {
    id: "03",
    title: "Power From The Other Side (PFOS)",
    category: "Web Development",
    year: "2024",
    description: "A scalable digital solution for a solar energy company, combining a customer-facing interface with backend systems for product management and filtering. The platform supports smooth data handling and presents renewable energy products and services in a clear, engaging way.",
    image: "/pfos.png",
    link: "https://www.pfossolar.com/",
  },
  {
    id: "04",
    title: "Altair Attic Corporate Website",
    category: "Web Development",
    year: "2025",
    description: "The official website of Altair Attic, designed to showcase the company’s expertise in software development, smart home automation, IoT, and embedded systems. The site features clean UI, smooth animations, responsive layouts, and optimized performance across devices.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    link: "https://www.altairattic.com/",
  },
  {
    id: "05",
    title: "Rexayo Concepts Website",
    category: "Web Development",
    year: "2023",
    description: "A professional business consulting website developed using Bootstrap 5. The project involved full template customization, content structuring, service presentation, contact integration, and deployment delivering a polished digital presence for a consulting and training brand.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    link: "https://www.rexayo.com/",
  },

  // Home Automation Projects
  {
    id: "06",
    title: "Smart Locks",
    category: "Automation",
    year: "2024",
    description: "Installed smart door locks with app control, keyless entry, and instant alerts for better security and convenience.",
    image: "https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "07",
    title: "CCTV Cameras",
    category: "Automation",
    year: "2024",
    description: "Set up smart CCTV systems with remote viewing, motion alerts, and night vision for full home monitoring.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "08",
    title: "Smart Switches & Sockets",
    category: "Automation",
    year: "2024",
    description: "Replaced regular switches and sockets with smart ones control lights and appliances from your phone or by voice.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "09",
    title: "Solar-Powered Cameras",
    category: "Automation",
    year: "2024",
    description: "Installed wireless solar cameras for outdoor security no wiring needed, works day and night with solar charging.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200",
  }
];

export default projectsData;

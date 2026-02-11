export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  link?: string;
}

import caseImg from "/public/case.png";
import pfosImg from "/public/pfos.png";
import altairImg from "/public/altair.png";
import rexayoImg from "/public/rexayo.png";

// ... interface

const projectsData: Project[] = [
  // Software Development Projects
  {
    id: "01",
    title: "Tender App",
    category: "Software",
    year: "2024",
    description: "A digital procurement platform designed to simplify tender discovery, submission, and management. The app enables real-time tender notifications, secure document uploads, user authentication, and payment processing—helping suppliers and organizations manage procurement transparently and efficiently.",
    image: caseImg,
    link: "https://play.google.com/store/apps/details?id=co.tenderpay.mobile",
  },
  {
    id: "02",
    title: "Fittingz – Fashion Management App",
    category: "Software",
    year: "2024",
    description: "A smart fashion-tech solution built for designers to manage client measurements, orders, inventory, and events digitally. Fittingz replaces manual record-keeping with a secure, user-friendly system that improves accuracy, customer engagement, and workflow efficiency.",
    image: pfosImg,
    link: "https://fittingz.vercel.app/",
  },

  // Web Development Projects
  {
    id: "03",
    title: "Power From The Other Side (PFOS)",
    category: "Web Development",
    year: "2024",
    description: "A scalable digital solution for a solar energy company, combining a customer-facing interface with backend systems for product management and filtering. The platform supports smooth data handling and presents renewable energy products and services in a clear, engaging way.",
    image: pfosImg,
    link: "https://www.pfossolar.com/",
  },
  {
    id: "04",
    title: "Altair Attic Corporate Website",
    category: "Web Development",
    year: "2025",
    description: "The official website of Altair Attic, designed to showcase the company’s expertise in software development, smart home automation, IoT, and embedded systems. The site features clean UI, smooth animations, responsive layouts, and optimized performance across devices.",
    image: altairImg,
    link: "https://www.altairattic.com/",
  },
  {
    id: "05",
    title: "Rexayo Concepts Website",
    category: "Web Development",
    year: "2023",
    description: "A professional business consulting website developed using Bootstrap 5. The project involved full template customization, content structuring, service presentation, contact integration, and deployment delivering a polished digital presence for a consulting and training brand.",
    image: rexayoImg,
    link: "https://www.rexayoconcept.biz",
  },

  // Home Automation Projects
  {
    id: "06",
    title: "Smart Locks",
    category: "Automation",
    year: "2024",
    description: "Installed smart door locks with app control, keyless entry, and instant alerts for better security and convenience.",
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/33/0651914/1.jpg?1102",
  },
  {
    id: "07",
    title: "CCTV Cameras",
    category: "Automation",
    year: "2024",
    description: "Set up smart CCTV systems with remote viewing, motion alerts, and night vision for full home monitoring.",
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/31/0223814/1.jpg?8842",
  },
  {
    id: "08",
    title: "Smart Switches & Sockets",
    category: "Automation",
    year: "2024",
    description: "Replaced regular switches and sockets with smart ones control lights and appliances from your phone or by voice.",
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/90/9568804/1.jpg?4224",
  },
  {
    id: "09",
    title: "Solar-Powered Cameras",
    category: "Automation",
    year: "2024",
    description: "Installed wireless solar cameras for outdoor security no wiring needed, works day and night with solar charging.",
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/72/2277814/1.jpg?3665",
  }
];

export default projectsData;

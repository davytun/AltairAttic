export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  details: {
    client: string;
    location: string;
    scope: string[];
  };
}

const projectsData: Project[] = [
  {
    id: "01",
    title: "The Obsidian Villa",
    category: "Smart Home Automation",
    year: "2024",
    description: "A flagship integration project featuring complete architectural lighting and adaptive climate control for a luxury private estate.",
    image: "/Aboutus.jpg",
    details: {
      client: "Private Client",
      location: "Lagos, Nigeria",
      scope: ["Lighting Control", "Multi-room Audio", "Security Systems"]
    }
  },
  {
    id: "02",
    title: "Nexus Enterprise Cloud",
    category: "Software Development",
    year: "2024",
    description: "Custom-built ERP and inventory management system designed for seamless cross-border logistics and real-time tracking.",
    image: "/Hero.jpg",
    details: {
      client: "Logistics Corp",
      location: "Remote",
      scope: ["Architecture Design", "Cloud Migration", "API Integration"]
    }
  },
  {
    id: "03",
    title: "Smart Grid Monitor",
    category: "IoT Integration",
    year: "2023",
    description: "Developing intelligent sensor arrays and real-time analytics for industrial power distribution and fault detection.",
    image: "/S1.jpg",
    details: {
      client: "Tech Solutions Ltd",
      location: "Ibadan, Nigeria",
      scope: ["Hardware Design", "Data Analytics", "Firmware Development"]
    }
  },
  {
    id: "04",
    title: "Aura Residence",
    category: "Home Automation",
    year: "2023",
    description: "Seamless voice-controlled environment integration focusing on accessibility and intuitive human-centered design.",
    image: "/value.jpeg",
    details: {
      client: "Aura Homes",
      location: "Abuja, Nigeria",
      scope: ["Voice Control", "Curtain Automation", "Adaptive Presence"]
    }
  }
];

export default projectsData;

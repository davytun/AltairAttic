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
    title: "Eco-Smart Luxury Villa",
    category: "Automation",
    year: "2024",
    description: "Full-scale luxury automation featuring adaptive climate control and intelligent architectural lighting for a 5-bedroom estate.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    details: {
      client: "Private Developer",
      location: "Lagos, Nigeria",
      scope: ["Lighting Control", "Multi-room Audio", "Climate Automation"]
    }
  },
  {
    id: "02",
    title: "Logistics Cloud Platform",
    category: "Software",
    year: "2024",
    description: "Custom ERP system built to handle cross-border tracking and automated inventory for international logistics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    details: {
      client: "Global Logistics Ltd",
      location: "Remote",
      scope: ["System Architecture", "Cloud Database", "API Network"]
    }
  },
  {
    id: "03",
    title: "Industrial Power Monitor",
    category: "IoT",
    year: "2023",
    description: "Real-time fault detection and smart grid analytics for high-voltage industrial power distribution.",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=1200",
    details: {
      client: "Industrial Power Corp",
      location: "Ibadan, Nigeria",
      scope: ["Sensor Arrays", "Data Analytics", "Remote Monitoring"]
    }
  },
  {
    id: "04",
    title: "Voice-Controlled Residence",
    category: "Automation",
    year: "2023",
    description: "Intuitive voice-activated environments designed for senior living and accessible smart home interaction.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    details: {
      client: "Aura Healthcare",
      location: "Abuja, Nigeria",
      scope: ["Voice Control", "Presence Sensing", "Smart Security"]
    }
  }
];

export default projectsData;

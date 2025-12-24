export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  specs: string[];
  slug: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Altair Eye 4K",
    category: "Security",
    price: "$299",
    description: "Professional-grade architectural security camera with night-vision and AI detection.",
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=1200",
    specs: ["4K Resolution", "AI Human Detection", "Weatherproof IP67"],
    slug: "altair-eye-4k",
  },
  {
    id: "p2",
    name: "Nexus Hub",
    category: "Integration",
    price: "$450",
    description: "The brain of your smart environment. Connects over 200+ devices with zero latency.",
    image: "https://images.unsplash.com/photo-1558227108-83a15ddbbb15?auto=format&fit=crop&q=80&w=1200",
    specs: ["Multi-protocol Support", "Offline Processing", "EAL6+ Security"],
    slug: "nexus-hub",
  },
  {
    id: "p3",
    name: "Lumina Sensor",
    category: "Automation",
    price: "$89",
    description: "Invisible motion and light sensing that adapts your environment to your presence.",
    image: "https://images.unsplash.com/photo-1512428559083-a40ce12b1955?auto=format&fit=crop&q=80&w=1200",
    specs: ["180° Range", "5-year Battery", "Bio-adaptive Dimming"],
    slug: "lumina-sensor",
  },
];

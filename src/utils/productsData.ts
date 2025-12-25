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
    name: "Sentinel Pro CCTV",
    category: "CCTV Camera",
    price: "$299",
    description: "High-definition CCTV security camera designed for homes and offices, with night vision and motion alerts.",
    image: "https://i.ebayimg.com/images/g/NtwAAeSw1khoGv4e/s-l1600.webp",
    specs: ["4K Ultra HD", "Night Vision", "Motion Detection"],
    slug: "sentinel-pro-cctv",
  },
  {
    id: "p2",
    name: "SecureLock X",
    category: "Smart Lock",
    price: "$450",
    description: "Keyless smart door lock with fingerprint, PIN, and mobile app access for enhanced security.",
    image: "https://i.ebayimg.com/images/g/YYsAAOSw8MBlg-jh/s-l1600.webp",
    specs: ["Fingerprint Unlock", "Mobile App Control", "Auto Lock"],
    slug: "securelock-x",
  },
  {
    id: "p3",
    name: "EchoWave Smart Speaker",
    category: "Smart Speaker",
    price: "$89",
    description: "Smart speaker with voice assistant support for music, calls, and smart home control.",
    image: "https://i.ebayimg.com/images/g/N-oAAOSwJ-VnJ155/s-l1600.webp",
    specs: ["Voice Control", "Wi-Fi & Bluetooth", "Room-Filling Sound"],
    slug: "echowave-smart-speaker",
  },
];

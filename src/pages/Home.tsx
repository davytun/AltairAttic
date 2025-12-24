import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProofSection } from "@/components/sections/ProofSection";
import { BespokeServices } from "@/components/sections/BespokeServices";
import { AboutValues } from "@/components/sections/AboutValues";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { EventsSection } from "@/components/sections/EventsSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";

import { useState } from "react";

const Home = () => {
  const [inquirySubject, setInquirySubject] = useState("");

  const handleInquire = (productName: string) => {
    setInquirySubject(`I'm interested in the ${productName}`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian">
      <Navbar />

      {/* Narrative Section 1: Intro */}
      <Hero />

      {/* Narrative Section 2: Proof & Impact */}
      <ProofSection />

      {/* Narrative Section 3: Core Capability */}
      <BespokeServices onInquire={handleInquire} />

      {/* Narrative Section 4: Hardware Collection */}
      <ProductShowcase onInquire={handleInquire} />

      {/* Narrative Section 3: Proof of Excellence */}
      <CaseStudy />

      {/* Narrative Section 4: The Philosophy */}
      <AboutValues />

      {/* Narrative Section 5: The Pulse */}
      <EventsSection />

      {/* Narrative Section 6: Internal Engine (Architecture) */}
      <TechStack />

      {/* Narrative Section 7: Path to Reality */}
      <Process />

      {/* Narrative Section 8: Final Conversion */}
      <Contact initialSubject={inquirySubject} />

      <Footer />
    </main>
  );
};

export default Home;

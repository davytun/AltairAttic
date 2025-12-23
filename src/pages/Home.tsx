import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BespokeServices } from "@/components/sections/BespokeServices";
import { AboutValues } from "@/components/sections/AboutValues";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { CaseStudy } from "@/components/sections/CaseStudy";

const Home = () => {
  return (
    <main className="bg-obsidian selection:bg-bronze selection:text-obsidian">
      <Navbar />

      {/* Narrative Section 1: Intro */}
      <Hero />

      {/* Narrative Section 2: Core Capability */}
      <BespokeServices />

      {/* Narrative Section 3: Proof of Excellence */}
      <CaseStudy />

      {/* Narrative Section 4: The Philosophy */}
      <AboutValues />

      {/* Narrative Section 5: Internal Engine (Architecture) */}
      <TechStack />

      {/* Narrative Section 6: Path to Reality */}
      <Process />

      {/* Narrative Section 7: Final Conversion */}
      <Contact />

      <Footer />
    </main>
  );
};

export default Home;

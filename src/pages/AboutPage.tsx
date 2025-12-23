import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { AboutValues } from "@/components/sections/AboutValues";
import { AboutServices } from "@/components/sections/AboutServices";
import { Contact } from "@/components/sections/Contact";

const AboutPage = () => {
  return (
    <main className="bg-obsidian selection:bg-bronze selection:text-obsidian">
      <Navbar />

      <AboutHero />

      <AboutServices />

      <AboutValues />

      <TeamGrid />

      <Contact />

      <Footer />
    </main>
  );
};

export default AboutPage;

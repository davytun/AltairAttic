import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServiceList } from "@/components/sections/ServiceList";
import { Contact } from "@/components/sections/Contact";

const ServicesPage = () => {
  return (
    <main className="bg-obsidian selection:bg-bronze selection:text-obsidian">
      <Navbar />

      <ServicesHero />

      <ServiceList />

      <Contact />

      <Footer />
    </main>
  );
};

export default ServicesPage;

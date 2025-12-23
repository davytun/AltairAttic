import { useParams, Navigate } from "react-router-dom";
import wordSlid, { ServiceData } from "@/utils/wordSlid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ServiceDetailHero } from "@/components/sections/ServiceDetailHero";
import { ServiceContent } from "@/components/sections/ServiceContent";
import { Contact } from "@/components/sections/Contact";

const ServiceDetailPage = () => {
  const { url } = useParams();

  const service = (wordSlid as ServiceData[]).find((s) => s.url === `/${url}`);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian">
      <Navbar />

      <ServiceDetailHero service={service} />

      <ServiceContent service={service} />

      <Contact />

      <Footer />
    </main>
  );
};

export default ServiceDetailPage;

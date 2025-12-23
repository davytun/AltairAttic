import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactFormBuilder } from "@/components/sections/ContactFormBuilder";
import { ContactInfo } from "@/components/sections/ContactInfo";

const ContactPage = () => {
  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian min-h-screen">
      <Navbar />

      <ContactHero />
      <ContactInfo />
      <section className="bg-obsidian pb-48 px-[4vw]">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-12">
            <ContactFormBuilder />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;

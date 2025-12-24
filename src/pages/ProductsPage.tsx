import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Contact } from "@/components/sections/Contact";
import { motion } from "framer-motion";

const ProductsPage = () => {
  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian">
      <Navbar />

      {/* Hardware Hero */}
      <section className="pt-64 pb-32 px-[6vw] relative overflow-hidden">
        <div className="container-luxury relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-label mb-8 block">Hardware Ecosystem</span>
            <h1 className="text-huge md:text-[12vw] font-display leading-[0.85] mb-8">
              The <span className="text-accent">Collection.</span>
            </h1>
            <p className="text-2xl font-light text-white/50 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Engineering the physical layer of your environment.
              Precision-crafted hardware designed to integrate flawlessly with
              your life.
            </p>
          </motion.div>
        </div>

        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Reuse ProductShowcase for the list */}
      <div className="border-t border-white/5">
        <ProductShowcase />
      </div>

      <Contact />

      <Footer />
    </main>
  );
};

export default ProductsPage;

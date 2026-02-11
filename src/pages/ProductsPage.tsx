import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCatalogGrid from "@/components/product/ProductCatalogGrid";
import { Contact } from "@/components/sections/Contact";
import { motion } from "framer-motion";
import { DotBackground } from "@/components/ui/DotBackground";

const ProductsPage = () => {
  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian">
      <Navbar />

      {/* Hardware Hero */}
      <section className="pt-40 md:pt-64 pb-16 md:pb-32 relative overflow-hidden">
        <div className="container-luxury relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-label mb-8 block">Hardware Ecosystem</span>
            <h1 className="text-huge font-display leading-[0.85] mb-8">
              The <span className="text-accent">Collection.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/50 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Engineering the physical layer of your environment.
              Precision-crafted hardware designed to integrate flawlessly with
              your life.
            </p>
          </motion.div>
        </div>

        {/* Background Decor */}
        <DotBackground
          dotSize={1.3}
          gap={37}
          dotColor="rgba(139, 92, 246, 0.1)"
          fade={true}
        />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 blur-[150px] rounded-full pointer-events-none z-0" />
      </section>

      {/* Product Grid */}
      <div className="border-t border-white/5 bg-[#0B0F19]">
        <ProductCatalogGrid />
      </div>

      <Contact />

      <Footer />
    </main>
  );
};

export default ProductsPage;

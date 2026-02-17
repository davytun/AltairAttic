import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCatalogGrid from "@/components/product/ProductCatalogGrid";
import { motion } from "framer-motion";
import { DotBackground } from "@/components/ui/DotBackground";
import { ShoppingBag } from "lucide-react";

const ShopPage = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 backdrop-blur-md">
              <ShoppingBag size={14} className="text-accent" />
              <span className="text-accent text-[10px] uppercase font-black tracking-[0.3em]">
                Official Store
              </span>
            </div>
            <h1 className="text-huge font-display leading-[0.85] mb-8 text-silk-white">
              Browse <br />
              <span className="text-accent">Hardware.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-silk-white/50 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Select premium Altair Attic products for your space. Order now for
              expert installation and full warranty support across Nigeria.
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
      <div className="border-t border-border-dim bg-obsidian-surface">
        <ProductCatalogGrid variant="shop" />
      </div>

      <Footer />
    </main>
  );
};

export default ShopPage;

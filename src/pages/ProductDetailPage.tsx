import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
  Cog,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { products } from "@/utils/productsData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Contact } from "@/components/sections/Contact";
import { DotBackground } from "@/components/ui/DotBackground";
import { GridBackground } from "@/components/ui/GridBackground";

const ProductDetailPage = () => {
  const { id: slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="bg-obsidian selection:bg-accent selection:text-obsidian min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-b from-obsidian via-transparent to-obsidian" />
        </div>

        <DotBackground
          dotSize={1.4}
          gap={34}
          dotColor="rgba(139, 92, 246, 0.11)"
          fade={true}
          className="z-5"
        />

        <div className="container-luxury relative z-10 px-[6vw] w-full">
          <Link
            to="/"
            className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-white/40 hover:text-accent transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />{" "}
            Back to Collection
          </Link>

          <div className="max-w-4xl space-y-8">
            <span className="text-label block">{product.category}</span>
            <h1 className="text-7xl md:text-9xl font-display uppercase tracking-tighter leading-[0.85] text-white">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed max-w-2xl">
              {product.description}
            </p>
            <div className="flex items-center gap-8 pt-8">
              <span className="text-4xl font-display text-accent font-medium">
                {product.price}
              </span>
              <Button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
                className="h-20 px-12 rounded-full bg-white text-obsidian hover:bg-accent transition-all font-black uppercase tracking-widest text-xs"
              >
                Inquire Now <ArrowRight className="ml-4 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Details & Specs */}
      <section className="py-32 px-[6vw] bg-obsidian-surface border-y border-white/5 relative overflow-hidden">
        <GridBackground
          gridSize={65}
          gridColor="rgba(139, 92, 246, 0.07)"
          fade={true}
        />

        <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
          <div className="space-y-12">
            <h2 className="text-4xl font-display uppercase tracking-tight text-white">
              Technical Excellence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.specs.map((spec, i) => (
                <div
                  key={spec}
                  className="p-8 bg-obsidian border border-white/5 rounded-3xl space-y-4"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    {i % 3 === 0 ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : i % 3 === 1 ? (
                      <Cog className="w-5 h-5" />
                    ) : (
                      <Zap className="w-5 h-5" />
                    )}
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest text-white/80">
                    {spec}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
            <img
              src={product.image}
              alt="Detail view"
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
            />
          </div>
        </div>
      </section>

      <Contact initialSubject={`Inquiry regarding ${product.name}`} />

      <Footer />
    </main>
  );
};

export default ProductDetailPage;

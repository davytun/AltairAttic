import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <main className="bg-obsidian min-h-screen text-silk-white selection:bg-accent selection:text-obsidian overflow-hidden flex flex-col">
      <Helmet>
        <title>Page Not Found - Altair Attic</title>
      </Helmet>

      <Navbar />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Large decorative 404 */}
          <div className="relative mb-8">
            <h1 className="text-[12rem] md:text-[20rem] font-display font-black leading-none tracking-tighter text-white/5 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Compass
                  className="w-24 h-24 md:w-32 md:h-32 text-accent"
                  strokeWidth={1}
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6 max-w-lg mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight">
              Lost in Space?
            </h2>
            <p className="text-silk-white/60 text-lg font-light leading-relaxed">
              The page you are looking for seems to have vanished into the
              digital void. Let's get you back on track.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <button className="px-10 py-4 bg-accent text-obsidian rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all transform active:scale-95 shadow-xl shadow-accent/20 [html[data-theme='light']_&:hover]:bg-obsidian [html[data-theme='light']_&:hover]:text-silk-white">
                  Return Home
                </button>
              </Link>
              <Link to="/catalogue">
                <button className="px-10 py-4 bg-white/5 border border-white/10 text-silk-white rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all transform active:scale-95">
                  View Catalog
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Grid */}
        <div
          className="absolute inset-0 z-[-1] opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Footer />
    </main>
  );
};

export default NotFoundPage;

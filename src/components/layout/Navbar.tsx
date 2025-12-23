import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Philosophy", path: "/" },
    { name: "Expertise", path: "/services" },
    { name: "Works", path: "/projects" },
    { name: "Manifesto", path: "/about" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-100 transition-all duration-700 px-[4vw]",
          isScrolled ? "py-6 bg-black/80 backdrop-blur-md" : "py-10"
        )}
      >
        <div className="container-luxury flex items-center justify-between">
          <Link to="/" className="block">
            <img
              src="/logo.png"
              alt="Altair Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
              <button className="text-[10px] uppercase font-bold tracking-[0.3em] px-6 py-2 border border-white/10 hover:border-white/40 transition-all">
                Inquire
              </button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-90 bg-black flex flex-col items-center justify-center gap-12"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-4xl font-display font-bold uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="text-[10px] uppercase font-bold tracking-[0.3em] mt-12 px-12 py-4 bg-white text-black">
                Start Inquiry
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

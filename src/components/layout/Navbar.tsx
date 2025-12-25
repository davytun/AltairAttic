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
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-100 transition-all duration-700 px-[4vw] border-b",
          isScrolled
            ? "py-4 bg-obsidian/90 backdrop-blur-xl border-white/10"
            : "py-8 bg-transparent border-transparent"
        )}
      >
        <div className="container-luxury flex items-center justify-between">
          <Link to="/" className="group">
            <img
              src="/logo.png"
              alt="Altair Attic Limited"
              className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-[10px] uppercase font-black tracking-[0.35em] text-white/60 hover:text-white transition-all duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
            <Link to="/contact">
              <button className="text-[10px] uppercase font-black tracking-[0.35em] px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:border-accent hover:text-obsidian transition-all duration-500">
                Contact Us
              </button>
            </Link>
          </div>

          <button
            className="md:hidden p-3 rounded-full border border-white/10 hover:border-accent text-white hover:text-accent transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-90 bg-obsidian backdrop-blur-xl flex flex-col items-center justify-center gap-10 px-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="text-5xl font-display font-black uppercase tracking-tight text-white hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="text-[10px] uppercase font-black tracking-[0.4em] mt-12 px-16 py-5 rounded-full bg-accent text-obsidian hover:bg-white transition-all duration-500">
                  Start Inquiry
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

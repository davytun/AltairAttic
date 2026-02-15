import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "/public/logo.png";
import { useTheme } from "@/components/providers/ThemeProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-100 transition-all duration-700",
          isScrolled
            ? "py-3 bg-obsidian/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-border-dim"
            : "py-6 bg-obsidian/0 backdrop-blur-none",
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <Link to="/" className="group relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* Subtle glow effect on logo */}
                <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={logo}
                  alt="Altair Attic Limited"
                  className="h-9 md:h-11 w-auto object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-[9px] lg:text-[10px] uppercase font-black tracking-[0.4em] text-text-muted hover:text-silk-white transition-all duration-300 group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="relative group p-2 text-silk-white/70 hover:text-accent transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link to="/contact">
              <button className="text-[9px] lg:text-[10px] uppercase font-black tracking-[0.4em] px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent hover:border-accent hover:text-obsidian hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-500 text-silk-white">
                Contact Us
              </button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-silk-white/70 hover:text-accent transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              className="p-2.5 rounded-lg bg-silk-white/5 border border-border-dim hover:border-accent hover:bg-accent/10 text-silk-white hover:text-accent transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-999 bg-obsidian backdrop-blur-xl flex flex-col items-center justify-center gap-10 px-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)] z-0" />

            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-lg bg-silk-white/5 border border-border-dim hover:border-accent hover:bg-accent/10 text-silk-white hover:text-accent transition-all duration-300 z-20"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 flex flex-col items-center justify-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-5xl font-display font-black uppercase tracking-tight text-silk-white hover:text-accent transition-colors"
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
                  <button className="text-[10px] uppercase font-black tracking-[0.4em] mt-12 px-16 py-5 rounded-xl bg-accent text-obsidian hover:bg-white transition-all duration-500">
                    Start Inquiry
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

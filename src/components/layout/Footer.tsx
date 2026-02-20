import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {

  return (
    <footer className="bg-obsidian py-12 sm:py-16 md:py-32 border-t border-border-dim">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 md:gap-20 mb-16 sm:mb-20 md:mb-32 items-end">
          <div className="md:col-span-6 space-y-8 sm:space-y-12 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-display leading-[0.9] uppercase tracking-tighter text-silk-white">
              Empowering <br /> Your World.
            </h2>
            <div className="flex gap-8 justify-center md:justify-start">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full border border-border-dim flex items-center justify-center hover:bg-silk-white hover:text-obsidian transition-all duration-500"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 text-center sm:text-left">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-bold block">
                Company
              </span>
              <ul className="space-y-4">
                {[
                  "Home",
                  "Services",
                  "Projects",
                  "Events",
                  "Activities",
                  "About",
                  "Contact",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-bold block">
                Office
              </span>
              <p className="text-xs text-text-muted leading-relaxed uppercase tracking-widest">
                3rd floor, Opposite Cathedral of St. Peter Ang. Sec. Sch,{" "}
                <br className="hidden sm:block" />
                Along Oba Ademola Maternity Hospital, Ake, Abeokuta.
              </p>
              <div className="space-y-2">
                <p className="text-xs text-silk-white font-bold tracking-widest">
                  +2347077195098
                </p>
                <p className="text-xs text-silk-white font-bold tracking-widest">
                  hello@altair-attic.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 sm:pt-12 border-t border-border-dim flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <Link to="/" className="block">
              <img
                src="/fLogo.png"
                alt="Altair Logo"
                className="h-10 w-auto object-contain sm:hidden"
              />
              <img
                src="/logo.png"
                alt="Altair Attic"
                className="hidden h-8 sm:block sm:h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[10px] uppercase tracking-[0.2em] sm:tracking-widest text-text-muted">
              © 2025 Altair Attic Limited.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] sm:tracking-widest text-text-muted">
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

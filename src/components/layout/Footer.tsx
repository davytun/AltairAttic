import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-obsidian py-16 md:py-32 border-t border-white/5">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20 mb-20 md:mb-32 items-end">
          <div className="md:col-span-6 space-y-12">
            <h2 className="text-4xl md:text-7xl font-display leading-[0.9] uppercase tracking-tighter text-white">
              Empowering <br /> Your World.
            </h2>
            <div className="flex gap-8">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-base-dark transition-all duration-500"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold block">
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
                      className="text-sm uppercase tracking-widest text-white/50 hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold block">
                Office
              </span>
              <p className="text-xs text-white/40 leading-relaxed uppercase tracking-widest">
                3rd floor, Opposite Cathedral of St. Peter Ang. Sec. Sch, <br />
                Along Oba Ademola Maternity Hospital, Ake, Abeokuta.
              </p>
              <div className="space-y-2">
                <p className="text-xs text-white font-bold tracking-widest">
                  +2347077195098
                </p>
                <p className="text-xs text-white font-bold tracking-widest">
                  hello@altair-attic.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="block">
              <img
                src="/logo.png"
                alt="Altair Logo"
                className="h-6 w-auto object-contain"
              />
            </Link>
            <p className="text-[10px] uppercase tracking-widest text-gray-600">
              © 2025 Altair Attic Limited. All Rights Reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors group"
          >
            Back to Top{" "}
            <div className="p-3 rounded-full border border-white/10 group-hover:bg-accent group-hover:text-obsidian transition-all">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

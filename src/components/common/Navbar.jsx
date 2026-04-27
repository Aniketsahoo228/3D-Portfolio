import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "../../data/personal-data";
import { navItems } from "../../data/nav-items";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.link.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[9998] border-b bg-white/70 backdrop-blur-md transition-all duration-300 dark:bg-black/35 ${
          isScrolled
            ? "border-black/10 dark:border-white/10"
            : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#hero");
              }}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                <img
                  src={personalData.profile}
                  alt={personalData.name}
                  className="relative w-10 h-10 rounded-full border-2 border-purple-500/50 object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-900 dark:text-white font-bold text-lg">{personalData.name}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{personalData.designation}</p>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.link.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.link);
                    }}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive ? "text-gray-900 dark:text-white" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 rounded-lg border border-indigo-400/30 bg-gradient-to-r from-indigo-600/15 to-sky-500/15 dark:border-purple-500/30 dark:from-purple-600/20 dark:to-cyan-600/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                );
              })}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/60"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.link.replace("#", "");
                  return (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(item.link);
                      }}
                      className={`block px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600/15 to-sky-500/15 border border-indigo-400/30 text-gray-900 dark:from-purple-600/20 dark:to-cyan-600/20 dark:border-purple-500/30 dark:text-white"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/60 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/50"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;

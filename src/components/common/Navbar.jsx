import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "../../data/personal-data";
import { navItems } from "../../data/nav-items";
import { FiMenu, FiX } from "react-icons/fi";
import { FloatingNav } from "../ui/FloatingNavbar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navItems.map((item) => item.link.replace("#", ""));

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 120 && rect.bottom >= 120) {
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMobileMenuOpen(false);
  };

  const enhancedNavItems = navItems.map((item) => ({
    ...item,
    onClick: () => scrollToSection(item.link),
    active: activeSection === item.link.replace("#", ""),
  }));

  return (
    <>
      {/* Floating Right Navigation */}
      <FloatingNav navItems={enhancedNavItems} />

      {/* Left Brand Card */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="fixed top-3 left-3 z-[9999] pointer-events-none"
      >
        <div
          className={`
            pointer-events-auto h-16 px-4 md:px-6
            flex items-center justify-between
            rounded-2xl border
            backdrop-blur-2xl
            shadow-[0_12px_40px_rgba(0,0,0,0.18)]
            transition-all duration-500
            min-w-[320px]
            ${
              isScrolled
                ? "bg-white/65 border-black/10 dark:bg-[#050816]/75 dark:border-white/10"
                : "bg-white/40 border-black/5 dark:bg-[#050816]/45 dark:border-white/5"
            }
          `}
        >
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#hero");
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-md opacity-70 group-hover:scale-110 transition duration-300" />

              <img
                src={personalData.profile}
                alt={personalData.name}
                className="relative w-10 h-10 rounded-full object-cover border-2 border-white/40"
              />
            </div>

            <div className="hidden sm:block leading-tight">
              <span className="block font-bold text-gray-900 dark:text-white text-lg">
                {personalData.name}
              </span>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {personalData.designation}
              </p>
            </div>
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-white pointer-events-auto"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 8 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-2 rounded-2xl border border-black/10 bg-white/85 dark:bg-[#050816]/85 dark:border-white/10 backdrop-blur-2xl shadow-xl p-3 md:hidden pointer-events-auto"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    activeSection === item.link.replace("#", "");

                  return (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.link);
                      }}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/15 to-cyan-500/15 border border-cyan-400/20 text-gray-900 dark:text-white"
                          : "text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5"
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

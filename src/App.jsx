import { useEffect, useMemo } from "react";
import Lenis from "lenis";
import { useTheme } from "./context/ThemeContext";

import LoadingScreen from "./components/common/LoadingScreen";
import Navbar from "./components/common/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import ThemeToggle from "./components/common/ThemeToggle";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

function App() {
  const { isDark } = useTheme();

  // ✅ Optimized Lenis (less CPU usage)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ✅ Memoized backgrounds (avoid recalculation every render)
  const sectionBackground = useMemo(
    () => ({
      about: isDark ? "rgba(3,0,20,0.45)" : "rgba(248,250,255,0.45)",
      projects: isDark ? "rgba(3,0,20,0.55)" : "rgba(248,250,255,0.55)",
      skills: isDark ? "rgba(3,0,20,0.45)" : "rgba(248,250,255,0.45)",
      experience: isDark ? "rgba(3,0,20,0.55)" : "rgba(248,250,255,0.55)",
      certs: isDark ? "rgba(3,0,20,0.5)" : "rgba(248,250,255,0.5)",
      contact: isDark ? "rgba(3,0,20,0.65)" : "rgba(248,250,255,0.65)",
      footer: isDark ? "rgba(3,0,20,0.8)" : "rgba(248,250,255,0.8)",
    }),
    [isDark]
  );

  return (
    <div className="relative min-h-screen isolate">
      
      {/* ✅ Optimized background (NO framer-motion here) */}
      <img
        src={isDark ? "/hero-dark.jpg" : "/hero-light.jpg"}
        alt=""
        className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none z-[-10] transition-opacity duration-700"
        style={{ opacity: isDark ? 0.45 : 0.6 }}
      />

      <LoadingScreen />
      <ThemeToggle />
      <Navbar />

      <main className="relative z-0">
        <section className="bg-transparent">
          <Hero />
        </section>

        <section style={{ background: sectionBackground.about }}>
          <About />
        </section>

        <section style={{ background: sectionBackground.projects }}>
          <Projects />
        </section>

        <section style={{ background: sectionBackground.skills }}>
          <Skills />
        </section>

        <section style={{ background: sectionBackground.experience }}>
          <Experience />
        </section>

        <section style={{ background: sectionBackground.certs }}>
          <Certifications />
        </section>

        <section style={{ background: sectionBackground.contact }}>
          <Contact />
        </section>

        <section style={{ background: sectionBackground.footer }}>
          <Footer />
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;
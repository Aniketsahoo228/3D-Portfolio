import { useEffect, useMemo, lazy, Suspense } from "react";
import Lenis from "lenis";
import { useTheme } from "./context/ThemeContext";

import LoadingScreen from "./components/common/LoadingScreen";
import Navbar from "./components/common/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import ThemeToggle from "./components/common/ThemeToggle";
// Hero is the only section rendered above the fold — keep it eager so
// first paint isn't blocked on anything else.
import Hero from "./components/sections/Hero";

// Everything below the fold is code-split: its JS (and the libraries it
// pulls in — tsparticles, simplex-noise, gsap, etc.) is no longer part of
// the initial bundle, and only downloads once the user is about to reach it.
const About = lazy(() => import("./components/sections/About"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Certifications = lazy(() => import("./components/sections/Certifications"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/sections/Footer"));

// Lightweight placeholder so lazy sections don't cause layout jump while
// their chunk is fetched.
const SectionFallback = () => <div className="min-h-[40vh]" />;

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
        src={isDark ? "/hero-dark.webp" : "/hero-light.webp"}
        alt=""
        fetchpriority="high"
        decoding="async"
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

        <Suspense fallback={<SectionFallback />}>
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
        </Suspense>
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;
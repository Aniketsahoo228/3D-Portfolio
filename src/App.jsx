import { useEffect } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const sectionBackground = (darkOpacity, lightOpacity) => ({
    background: isDark
      ? `rgba(3, 0, 20, ${darkOpacity})`
      : `rgba(248, 250, 255, ${lightOpacity})`,
  });

  return (
    <div className="relative min-h-screen" style={{ isolation: "isolate" }}>
      {/* Full page background image - fixed behind everything */}
      <motion.img
        key={isDark ? "dark" : "light"}
        src={isDark ? "/hero-dark.jpg" : "/hero-light.jpg"}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.45 : 0.6 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          objectPosition: "center center",
          zIndex: -10,
          pointerEvents: "none",
        }}
      />

      <LoadingScreen />
      <ThemeToggle />
      <Navbar />

      <main className="relative z-0">
        <section style={{ background: "transparent" }}>
          <Hero />
        </section>
        <section style={sectionBackground(0.45, 0.45)}>
          <About />
        </section>
        <section style={sectionBackground(0.55, 0.55)}>
          <Projects />
        </section>
        <section style={sectionBackground(0.45, 0.45)}>
          <Skills />
        </section>
        <section style={sectionBackground(0.55, 0.55)}>
          <Experience />
        </section>
        <section style={sectionBackground(0.5, 0.5)}>
          <Certifications />
        </section>
        <section style={sectionBackground(0.65, 0.65)}>
          <Contact />
        </section>
        <section style={sectionBackground(0.8, 0.8)}>
          <Footer />
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;

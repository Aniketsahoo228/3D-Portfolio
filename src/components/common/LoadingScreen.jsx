
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// LoadingScreen.jsx
// Place this file in: src/components/common/LoadingScreen.jsx
//
// UIVERSE.IO button style adapted (free, no login needed):
// https://uiverse.io/buttons  (search: "glowing button")
//
// Aceternity UI inspiration:
// Spotlight + TextGenerateEffect concept applied here
// https://ui.aceternity.com/components/spotlight
// ============================================================

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState(0); // 0=counting, 1=text, 2=exit

  useEffect(() => {
    // Animate progress bar 0 → 100
    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 4) + 1;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => setPhase(1), 300); // show name
        setTimeout(() => setPhase(2), 1400); // start exit
        setTimeout(() => setDone(true), 2200); // unmount
      }
      setProgress(start);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={styles.overlay}
        >
          {/* ── Spotlight glow — Aceternity Spotlight style ── */}
          <div style={styles.spotlightPurple} />
          <div style={styles.spotlightBlue} />

          {/* ── Grid background — Aceternity grid style ── */}
          <div style={styles.gridBg} />

          {/* ── Center content ── */}
          <div style={styles.center}>

            {/* Animated brackets + name — inspired by developer-portfolio hero */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={styles.nameRow}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    style={styles.bracket}
                  >
                    &lt;
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    style={styles.nameText}
                  >
                    YourName
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    style={styles.bracket}
                  >
                    /&gt;
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Logo / Initials orb ── */}
            {phase < 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={styles.orb}
              >
                {/* Replace YN with your actual initials */}
                <span style={styles.orbText}>YN</span>
                {/* Spinning ring — uiverse.io glow spinner style */}
                <span style={styles.ring} />
              </motion.div>
            )}

            {/* ── Progress counter ── */}
            <motion.div
              style={styles.counterRow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span style={styles.counterNum}>{progress}</span>
              <span style={styles.counterPct}>%</span>
            </motion.div>

            {/* ── Progress bar — uiverse.io glowing bar style ── */}
            <div style={styles.barTrack}>
              <motion.div
                style={{
                  ...styles.barFill,
                  width: `${progress}%`,
                }}
              />
              {/* Glow tip */}
              <motion.div
                style={{
                  ...styles.barGlow,
                  left: `${progress}%`,
                }}
              />
            </div>

            {/* ── Status text ── */}
            <motion.p
              style={styles.statusText}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              {progress < 40
                ? "Loading assets..."
                : progress < 75
                ? "Setting up 3D scene..."
                : progress < 99
                ? "Almost ready..."
                : "Welcome ✦"}
            </motion.p>

            {/* ── Tech stack pills — shows what's being loaded ── */}
            <div style={styles.pillRow}>
              {["React", "Three.js", "GSAP", "Framer"].map((tech, i) => (
                <motion.span
                  key={tech}
                  style={{
                    ...styles.pill,
                    opacity: progress > i * 22 ? 1 : 0.15,
                  }}
                  animate={
                    progress > i * 22
                      ? { borderColor: ["#7c3aed", "#06b6d4", "#7c3aed"] }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Corner decoration ── */}
          <div style={{ ...styles.corner, top: 20, left: 20 }} />
          <div style={{ ...styles.corner, top: 20, right: 20, transform: "rotate(90deg)" }} />
          <div style={{ ...styles.corner, bottom: 20, left: 20, transform: "rotate(-90deg)" }} />
          <div style={{ ...styles.corner, bottom: 20, right: 20, transform: "rotate(180deg)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── Inline styles (no Tailwind dependency, works immediately) ──
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "#030014",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  // Aceternity Spotlight style glows
  spotlightPurple: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
    top: "-100px",
    left: "-100px",
    pointerEvents: "none",
  },
  spotlightBlue: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
    bottom: "-80px",
    right: "-80px",
    pointerEvents: "none",
  },

  // Aceternity grid background style
  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    pointerEvents: "none",
  },

  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    position: "relative",
    zIndex: 2,
    width: "320px",
  },

  // Initials orb
  orb: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  orbText: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: "2px",
  },
  // Spinning ring — uiverse.io glowing spinner adapted
  ring: {
    position: "absolute",
    inset: "-6px",
    borderRadius: "50%",
    border: "2px solid transparent",
    borderTopColor: "#7c3aed",
    borderRightColor: "#06b6d4",
    animation: "spin 1.2s linear infinite",
  },

  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  bracket: {
    color: "#7c3aed",
    fontSize: "32px",
    fontFamily: "monospace",
    fontWeight: "700",
  },
  nameText: {
    color: "#ffffff",
    fontSize: "28px",
    fontFamily: "monospace",
    fontWeight: "700",
    letterSpacing: "3px",
    // CHANGE "YourName" to your actual name in the JSX above
  },

  counterRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "2px",
  },
  counterNum: {
    color: "#ffffff",
    fontSize: "48px",
    fontWeight: "800",
    fontFamily: "monospace",
    lineHeight: 1,
    minWidth: "72px",
    textAlign: "right",
  },
  counterPct: {
    color: "#7c3aed",
    fontSize: "24px",
    fontWeight: "700",
    fontFamily: "monospace",
  },

  // uiverse.io glowing progress bar style
  barTrack: {
    width: "280px",
    height: "4px",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: "999px",
    position: "relative",
    overflow: "visible",
  },
  barFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
    transition: "width 0.08s linear",
    position: "absolute",
    top: 0,
    left: 0,
  },
  barGlow: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#06b6d4",
    boxShadow: "0 0 12px 4px rgba(6,182,212,0.7)",
    transition: "left 0.08s linear",
    pointerEvents: "none",
  },

  statusText: {
    color: "rgba(255,255,255,0.45)",
    fontSize: "13px",
    fontFamily: "monospace",
    letterSpacing: "1px",
    margin: 0,
  },

  pillRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pill: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "11px",
    fontFamily: "monospace",
    border: "1px solid #7c3aed",
    borderRadius: "999px",
    padding: "3px 10px",
    transition: "opacity 0.4s ease, border-color 0.4s ease",
  },

  // Corner bracket decorations
  corner: {
    position: "absolute",
    width: "20px",
    height: "20px",
    borderTop: "2px solid rgba(124,58,237,0.5)",
    borderLeft: "2px solid rgba(124,58,237,0.5)",
    pointerEvents: "none",
  },
};

// ── Inject keyframe for spinning ring ──
const styleTag = document.createElement("style");
styleTag.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);

export default LoadingScreen;
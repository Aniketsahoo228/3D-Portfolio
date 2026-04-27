import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalData } from "../../data/personal-data";

// ============================================================
// LoadingScreen.jsx — Terminal Compiler Edition
// ✅ Matrix-style character rain canvas
// ✅ Real-time compiler log typewriter
// ✅ CRT scanline overlay
// ✅ Glitch reveal on completion
// ✅ Zero generic spinner vibes
// ============================================================

const LOGS = [
  { sym: "$", cls: "dim",  text: `./bootstrap ${personalData.name?.split(" ")[0]?.toLowerCase() ?? "portfolio"}.sh --prod` },
  { sym: "›", cls: "info", text: "Node.js v20.11.0 detected" },
  { sym: "›", cls: "info", text: "React 18.3.1 · Three.js r168 · GSAP 3.12" },
  { sym: "✓", cls: "ok",   text: "Dependencies resolved (1,247 packages)" },
  { sym: "⚡", cls: "warn", text: "Compiling shaders... [WebGL2]" },
  { sym: "✓", cls: "ok",   text: "Vertex shader compiled successfully" },
  { sym: "✓", cls: "ok",   text: "Fragment shader compiled successfully" },
  { sym: "›", cls: "info", text: "Loading 3D scene graph..." },
  { sym: "✓", cls: "ok",   text: "Geometry buffers allocated (14.2 MB)" },
  { sym: "⚡", cls: "warn", text: "Optimizing texture atlases..." },
  { sym: "✓", cls: "ok",   text: "Assets bundled — 98.4 kB gzip" },
  { sym: "›", cls: "info", text: "Preloading projects & metadata" },
  { sym: "✓", cls: "ok",   text: "Animation sequences registered" },
  { sym: "✓", cls: "ok",   text: "Service worker installed" },
  { sym: "🔥", cls: "hi",  text: "Build complete — no errors, no warnings" },
];

const PROG_LABELS = ["INITIALIZING", "COMPILING", "BUNDLING", "OPTIMIZING", "LAUNCHING"];
const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\|;:";

// Portfolio palette
// bg:      #050d1a  (deep navy)
// primary: #7c3aed  (purple)
// accent:  #06b6d4  (cyan/teal)
// mid:     #a855f7  (violet mid)
// glow hi: #38bdf8  (sky blue)

const LoadingScreen = () => {
  const canvasRef = useRef(null);
  const logRef = useRef(null);
  const [visLogs, setVisLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 14);
    const drops = Array(cols).fill(1);

    const frame = setInterval(() => {
      ctx.fillStyle = "rgba(5,5,5,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const c = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.font = "12px monospace";
        ctx.fillStyle = Math.random() > 0.85 ? "#06b6d4" : Math.random() > 0.5 ? "#7c3aed" : "#a855f7";
        ctx.globalAlpha = Math.random() * 0.7 + 0.1;
        ctx.fillText(c, i * 14, y * 14);
        ctx.globalAlpha = 1;
        if (y * 14 > canvas.height && Math.random() > 0.92) drops[i] = 0;
        else drops[i]++;
      });
    }, 50);

    return () => {
      clearInterval(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Progress ticker
  useEffect(() => {
    let prog = 0;
    const tick = setInterval(() => {
      prog = Math.min(100, prog + Math.random() * 2.5 + 0.5);
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(tick);
        setGlitch(true);
        setTimeout(() => setGlitch(false), 600);
        setTimeout(() => setDone(true), 900);
        setTimeout(() => setExit(true), 2600);
      }
    }, 60);
    return () => clearInterval(tick);
  }, []);

  // Log drip
  useEffect(() => {
    let idx = 0;
    const drip = setInterval(() => {
      if (idx < LOGS.length && progress < 98) {
        setVisLogs((prev) => [...prev, { ...LOGS[idx], key: idx }]);
        idx++;
      }
    }, 360);
    return () => clearInterval(drip);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [visLogs]);

  const labelIdx = Math.min(
    Math.floor((progress / 100) * PROG_LABELS.length),
    PROG_LABELS.length - 1
  );

  if (exit) return null;

  const clsMap = {
    ok: s.ok, warn: s.warn, info: s.info, hi: s.hi, dim: s.dim,
  };

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={s.overlay}
      >
        {/* Matrix rain */}
        <canvas ref={canvasRef} style={s.rain} />

        {/* CRT scanlines */}
        <div style={s.scan} />

        {/* Corner decorations */}
        <span style={{ ...s.corner, top: 16, left: 16, borderTop: "1px solid #1a3a1a", borderLeft: "1px solid #1a3a1a" }} />
        <span style={{ ...s.corner, top: 16, right: 16, borderTop: "1px solid #1a3a1a", borderRight: "1px solid #1a3a1a" }} />
        <span style={{ ...s.corner, bottom: 16, left: 16, borderBottom: "1px solid #1a3a1a", borderLeft: "1px solid #1a3a1a" }} />
        <span style={{ ...s.corner, bottom: 16, right: 16, borderBottom: "1px solid #1a3a1a", borderRight: "1px solid #1a3a1a" }} />

        <div style={s.center}>
          {/* Window chrome */}
          <div style={s.topBar}>
            <span style={{ ...s.dot, background: "#ff5f57" }} />
            <span style={{ ...s.dot, background: "#febc2e" }} />
            <span style={{ ...s.dot, background: "#28c840" }} />
            <span style={s.tabLabel}>portfolio.sh — bash</span>
          </div>

          {/* Terminal log */}
          <div style={s.terminal} ref={logRef}>
            {visLogs.map((l) => (
              <motion.div
                key={l.key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                style={s.logLine}
              >
                <span style={{ ...s.sym, ...clsMap[l.cls] }}>{l.sym}</span>
                <span style={s.logText}>
                  <span style={s.t1}>{l.text.slice(0, 18)}</span>
                  <span style={s.t2}>{l.text.slice(18, 36)}</span>
                  <span style={s.t3}>{l.text.slice(36)}</span>
                </span>
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <span style={s.cursor} />
          </div>

          {/* Progress bar */}
          <div style={s.progWrap}>
            <div style={s.progMeta}>
              <span style={s.progLabel}>{PROG_LABELS[labelIdx]}</span>
              <span style={s.pct}>{Math.floor(progress)}%</span>
            </div>
            <div style={s.track}>
              <motion.div
                style={s.fill}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.06 }}
              />
              <motion.div
                style={s.tip}
                animate={{ left: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.06 }}
              />
            </div>
          </div>

          {/* Final reveal */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={s.reveal}
              >
                <div
                  style={{
                    ...s.bigText,
                    ...(glitch ? s.bigTextGlitch : {}),
                  }}
                >
                  {personalData.name?.toUpperCase() ?? "READY"}
                </div>
                <div style={s.sub}>Portfolio loaded — entering now</div>
                <motion.div
                  style={s.cursor2}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                >
                  [ press any key to continue ]
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const s = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    // Deep navy matching portfolio dark bg, with subtle purple/cyan radial glows
    background: "#050d1a",
    backgroundImage:
      "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(124,58,237,0.18) 0%, transparent 60%)," +
      "radial-gradient(ellipse 55% 45% at 85% 80%, rgba(6,182,212,0.14) 0%, transparent 60%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  },
  rain: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0.22,
  },
  scan: {
    position: "absolute",
    inset: 0,
    // Subtle scanlines tinted purple
    backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(124,58,237,0.03) 2px,rgba(124,58,237,0.03) 4px)",
    pointerEvents: "none",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    display: "block",
  },
  center: {
    width: 580,
    maxWidth: "94vw",
    position: "relative",
    zIndex: 10,
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingLeft: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "block",
  },
  tabLabel: {
    marginLeft: "auto",
    fontSize: 11,
    color: "#334155",
    letterSpacing: 1,
  },
  terminal: {
    border: "1px solid rgba(124,58,237,0.25)",
    borderRadius: 6,
    // Dark navy terminal bg slightly lighter than overlay
    background: "#080f1f",
    padding: "16px 20px",
    minHeight: 200,
    maxHeight: 240,
    overflowY: "hidden",
  },
  logLine: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontSize: 12,
    lineHeight: 1.85,
  },
  sym: {
    fontSize: 12,
    width: 16,
    flexShrink: 0,
  },
  logText: { display: "inline" },
  // Text layers: dim → mid → bright (navy tones)
  t1: { color: "#1e3a5f" },
  t2: { color: "#2e5080" },
  t3: { color: "#4a7ab5" },
  ok:   { color: "#06b6d4" },   // cyan — portfolio accent
  warn: { color: "#a855f7" },   // purple — portfolio primary
  info: { color: "#818cf8" },   // indigo mid
  hi:   { color: "#38bdf8" },   // sky blue highlight
  dim:  { color: "#1e3a5f" },
  cursor: {
    display: "inline-block",
    width: 7,
    height: 13,
    // Gradient cursor — purple to cyan
    background: "linear-gradient(180deg, #7c3aed, #06b6d4)",
    animation: "blink 0.7s step-end infinite",
    verticalAlign: "middle",
  },
  progWrap: {
    marginTop: 18,
  },
  progMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#334155",
    letterSpacing: 2,
    marginBottom: 6,
  },
  progLabel: { color: "#475569" },
  pct: { color: "#06b6d4" },
  track: {
    width: "100%",
    height: 3,
    background: "#0f172a",
    borderRadius: 2,
    position: "relative",
    overflow: "visible",
  },
  fill: {
    height: "100%",
    // Progress bar: purple → cyan — exactly the portfolio avatar ring
    background: "linear-gradient(90deg, #7c3aed, #a855f7, #06b6d4)",
    borderRadius: 2,
    position: "absolute",
    left: 0,
    top: 0,
  },
  tip: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#06b6d4",
    boxShadow: "0 0 10px rgba(6,182,212,0.9), 0 0 20px rgba(124,58,237,0.5)",
  },
  reveal: {
    marginTop: 22,
    textAlign: "center",
  },
  bigText: {
    fontSize: 38,
    fontWeight: 700,
    // Gradient text via background-clip trick — purple to cyan
    background: "linear-gradient(90deg, #7c3aed, #a855f7 40%, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: 8,
    lineHeight: 1,
    filter: "drop-shadow(0 0 20px rgba(124,58,237,0.4))",
  },
  bigTextGlitch: {
    filter: "drop-shadow(2px 0 0 rgba(168,85,247,0.7)) drop-shadow(-2px 0 0 rgba(6,182,212,0.7))",
  },
  sub: {
    fontSize: 11,
    color: "#334155",
    letterSpacing: 4,
    marginTop: 8,
    textTransform: "uppercase",
  },
  cursor2: {
    display: "block",
    marginTop: 14,
    fontSize: 11,
    color: "#334155",
    letterSpacing: 3,
  },
};

// inject blink keyframe once
if (typeof document !== "undefined" && !document.getElementById("ls-kf")) {
  const st = document.createElement("style");
  st.id = "ls-kf";
  st.innerHTML = `@keyframes blink{50%{opacity:0}}`;
  document.head.appendChild(st);
}

export default LoadingScreen;
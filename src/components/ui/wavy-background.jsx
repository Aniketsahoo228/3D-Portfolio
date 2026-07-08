import { cn } from "../../lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { useTheme } from "../../context/ThemeContext";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 45,
  blur = 12,
  speed = "fast",
  waveOpacity,
  ...props
}) => {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const noise = useRef(createNoise3D()).current;
  const isVisibleRef = useRef(true);

  const getSpeed = () => {
    if (speed === "slow") return 0.0008;
    if (speed === "fast") return 0.0018;
    return 0.0012;
  };

  const themeColors =
    colors ||
    (isDark
      ? ["#22d3ee", "#8b5cf6", "#ec4899", "#38bdf8", "#c084fc"]
      : ["#6366f1", "#0ea5e9", "#8b5cf6", "#06b6d4", "#a855f7"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let time = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;

      canvas.width = w;
      canvas.height = h;
      // Blur is applied via CSS on the canvas element (GPU-composited,
      // computed once per paint) instead of ctx.filter (which forces the
      // browser to re-rasterize the blur on every single stroke/frame).
    };

    const linesY = [0.2, 0.45, 0.7];

    const draw = () => {
      // Skip all work while the section is off-screen instead of burning
      // CPU on a canvas nobody can see.
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      time += getSpeed();

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = waveOpacity ?? (isDark ? 0.55 : 0.78);

      for (let band = 0; band < linesY.length; band++) {
        for (let i = 0; i < themeColors.length; i++) {
          ctx.beginPath();
          ctx.lineWidth = waveWidth;
          ctx.strokeStyle = themeColors[i];

          for (let x = 0; x <= w; x += 6) {
            const y =
              noise(x / 700, i * 0.25 + band, time) * 90 +
              h * linesY[band];

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          ctx.stroke();
          ctx.closePath();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark, blur, waveWidth, speed, waveOpacity, colors]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-transparent",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          background: "transparent",
          filter: `blur(${blur}px)`,
        }}
      />

      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
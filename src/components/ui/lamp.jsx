"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">

        {/* ── LEFT BEAM ── */}
        <motion.div
          initial={{ opacity: 0.3, width: "6rem" }}
          whileInView={{ opacity: 1, width: "13rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-40 overflow-visible bg-gradient-conic from-pink-400 via-transparent to-transparent dark:from-cyan-400 dark:via-transparent dark:to-transparent text-white"
        >
          {/* Bottom soft fade */}
          <div
            className="absolute w-full left-0 bottom-0 h-full z-20"
            style={{
              maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
              WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
              background: "transparent",
            }}
          />
          {/* Right soft fade */}
          <div
            className="absolute w-16 h-full left-0 bottom-0 z-20"
            style={{
              maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
              background: "transparent",
            }}
          />
        </motion.div>

        {/* ── RIGHT BEAM ── */}
        <motion.div
          initial={{ opacity: 0.3, width: "6rem" }}
          whileInView={{ opacity: 1, width: "13rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-40 overflow-visible bg-gradient-conic from-transparent via-transparent to-orange-400 dark:from-transparent dark:via-transparent dark:to-cyan-400 text-white"
        >
          {/* Bottom soft fade */}
          <div
            className="absolute w-full right-0 bottom-0 h-full z-20"
            style={{
              maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
              WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
              background: "transparent",
            }}
          />
          {/* Left soft fade */}
          <div
            className="absolute w-16 h-full right-0 bottom-0 z-20"
            style={{
              maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
              background: "transparent",
            }}
          />
        </motion.div>

        {/* ── MAIN GLOW BLOB ── */}
        <motion.div
          initial={{ opacity: 0.3, width: "8rem" }}
          whileInView={{ opacity: 0.7, width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-24 -translate-y-1/2 rounded-full blur-3xl bg-pink-400 dark:bg-cyan-400"
        />

        {/* ── INNER BRIGHT CORE BLOB ── */}
        <motion.div
          initial={{ width: "4rem", opacity: 0.5 }}
          whileInView={{ width: "10rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-28 -translate-y-[5rem] rounded-full blur-xl bg-orange-200 dark:bg-cyan-200"
        />

        {/* ── THIN BRIGHT LINE ── */}
        <motion.div
          initial={{ width: "6rem", opacity: 0.6 }}
          whileInView={{ width: "18rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[6.5rem] rounded-full bg-pink-300 dark:bg-cyan-200"
          style={{
            boxShadow:
              "0 0 16px 4px rgba(251,113,133,0.9), 0 0 40px 8px rgba(251,146,60,0.5)",
          }}
        />

        {/* ── SOFT RADIAL BOTTOM VIGNETTE ── */}
        <div
          className="absolute inset-auto z-40 h-48 w-full -translate-y-[11rem]"
          style={{
            background: "transparent",
            maskImage:
              "radial-gradient(ellipse 55% 55% at 50% 0%, transparent 60%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 55% 55% at 50% 0%, transparent 60%, black 100%)",
          }}
        />

        {/* ── SIDE VIGNETTES ── */}
        <div
          className="absolute inset-0 z-40 pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)",
          }}
        />
      </div>

      {/* Children */}
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
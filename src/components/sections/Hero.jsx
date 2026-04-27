"use client";
import React, { useState } from "react";
import { Spotlight } from "../ui/Spotlight";
import { Cover } from "../ui/Cover";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { FloatingDock } from "../ui/floating-dock";
import { personalData } from "../../data/personal-data";
import { socialMedia } from "../../data/social-media";
import { motion, useAnimation } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import {
  BsGithub,
  BsLinkedin,
  BsTwitterX,
  BsEnvelopeFill,
  BsTelephoneFill,
} from "react-icons/bs";

const iconMap = {
  BsGithub: <BsGithub size={20} />,
  BsLinkedin: <BsLinkedin size={20} />,
  BsTwitterX: <BsTwitterX size={20} />,
  BsEnvelopeFill: <BsEnvelopeFill size={20} />,
  BsTelephoneFill: <BsTelephoneFill size={20} />,
};

const words = [
  { text: "Frontend" },
  { text: "Developer" },
  { text: "React", className: "text-purple-700 dark:text-purple-300" },
  { text: "&", className: "text-gray-900 dark:text-white" },
  { text: "Three.js", className: "text-indigo-700 dark:text-cyan-300" },
];

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const dockItems = socialMedia.map((s) => ({
    name: s.name,
    link: s.url,
    icon: iconMap[s.icon],
  }));

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Ambient Spotlights */}
      <Spotlight className="-top-40 -left-10 md:-left-32" fill="purple" />
      <Spotlight className="top-10 left-full -translate-x-1/2" fill="cyan" />

      <div className="relative z-10 max-w-6xl mx-auto w-full pt-24 grid md:grid-cols-2 gap-12 items-center">

        {/* ── LEFT SIDE ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left"
        >
          <p className="mb-4 text-sm font-mono tracking-[0.35em] uppercase text-indigo-600 dark:text-cyan-300">
            Hello, I am
          </p>

          <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 dark:from-cyan-300 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              <Cover>{personalData.name}</Cover>
            </span>
          </h1>

          <div className="mb-6 flex justify-center md:justify-start">
            <TypewriterEffect words={words} />
          </div>

          <p className="mb-8 max-w-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {personalData.description}
          </p>

          <div className="mb-8 flex justify-center md:justify-start">
            <FloatingDock items={dockItems} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-600 shadow-lg shadow-indigo-500/30 dark:shadow-cyan-500/20 transition-all"
            >
              View Projects
            </motion.a>

            <motion.a
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full font-medium flex items-center gap-2 border border-indigo-400/50 dark:border-cyan-500/40 text-gray-800 dark:text-white backdrop-blur-sm bg-white/10 dark:bg-white/5 hover:bg-indigo-50/30 dark:hover:bg-cyan-500/10 transition-all"
            >
              <FiDownload size={16} />
              Resume
            </motion.a>
          </div>
        </motion.div>

        {/* ── RIGHT SIDE — Profile + Lamp ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >

            {/* ── LAMP OVERLAY — opacity only, no width changes ── */}
            <motion.div
              animate={
                isHovered
                  ? { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }
                  : { opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }
              }
              initial={{ opacity: 0 }}
              className="absolute pointer-events-none"
              style={{
                top: "-8rem",
                left: "50%",
                transform: "translateX(-50%)",
                width: "480px",
                overflow: "visible",
                zIndex: 0,
              }}
            >
              {/* Left conic beam */}
              <div
                style={{
                  position: "absolute",
                  right: "50%",
                  top: 0,
                  width: "25rem",
                  height: "10rem",
                  backgroundImage:
                    "conic-gradient(from 70deg at center top, #06b6d4, transparent, transparent)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, transparent 85%), linear-gradient(to right, black 0%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, transparent 85%), linear-gradient(to right, black 0%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              />

              {/* Right conic beam */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  width: "25rem",
                  height: "10rem",
                  backgroundImage:
                    "conic-gradient(from 290deg at center top, transparent, transparent, #06b6d4)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, transparent 85%), linear-gradient(to left, black 0%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, transparent 85%), linear-gradient(to left, black 0%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              />

              {/* Center glow blob */}
              <div
                style={{
                  position: "absolute",
                  top: "-0.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "12rem",
                  height: "4rem",
                  borderRadius: "9999px",
                  background: "rgba(34,211,238,0.7)",
                  filter: "blur(1.5rem)",
                  zIndex: 30,
                }}
              />

              {/* Thin bright line */}
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "12rem",
                  height: "2px",
                  borderRadius: "9999px",
                  background: "#67e8f9",
                  boxShadow:
                    "0 0 12px 4px rgba(103,232,249,0.9), 0 0 32px 8px rgba(34,211,238,0.5)",
                  zIndex: 50,
                }}
              />
            </motion.div>

            {/* ── Profile image ── */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 z-10 mt-4">

              {/* Spinning gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  padding: "3px",
                  background:
                    "conic-gradient(from 0deg, #8b5cf6, #06b6d4, #6366f1, #8b5cf6)",
                  borderRadius: "9999px",
                }}
              >
                <div className="w-full h-full rounded-full" style={{ background: "transparent" }} />
              </motion.div>

              {/* Inner ambient glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/20 blur-xl" />

              {/* Hover ring glow */}
              <motion.div
                animate={
                  isHovered
                    ? { opacity: 1, scale: 1.06, transition: { duration: 0.4 } }
                    : { opacity: 0, scale: 1, transition: { duration: 0.4 } }
                }
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 40px 14px rgba(34,211,238,0.3), 0 0 80px 30px rgba(99,102,241,0.15)",
                }}
              />

              {/* Profile image */}
              <div className="absolute inset-[6px] overflow-hidden rounded-full border border-cyan-500/20">
                <img
                  src="/profile.png"
                  alt={personalData.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-cyan-500/40 bg-white/10 dark:bg-black/50 px-4 py-1.5 backdrop-blur-md shadow-md whitespace-nowrap"
              >
                <span className="text-xs font-mono text-indigo-700 dark:text-cyan-300">
                  Available for work
                </span>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
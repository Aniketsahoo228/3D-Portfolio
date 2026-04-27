// src/components/ui/FloatingNavbar.jsx

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious() || 0;
      const direction = current - previous;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        className={cn(
          "fixed top-6 inset-x-0 mx-auto z-[5000] flex max-w-fit items-center justify-center gap-4 rounded-xl px-6 py-3 shadow-xl",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={idx}
            href={navItem.link}
            className="flex items-center gap-2 text-sm text-neutral-200 transition hover:text-cyan-400"
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="cursor-pointer">{navItem.name}</span>
          </a>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
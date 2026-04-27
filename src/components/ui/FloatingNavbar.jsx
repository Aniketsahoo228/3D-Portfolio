import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({ navItems = [], className }) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const hideTimer = useRef(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;

    const previous = scrollYProgress.getPrevious() || 0;
    const direction = current - previous;

    // Always show near top
    if (scrollYProgress.get() < 0.03) {
      setVisible(true);
      return;
    }

    // Scrolling up -> show temporarily
    if (direction < 0) {
      setVisible(true);

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      hideTimer.current = setTimeout(() => {
        setVisible(false);
      }, 1600); // visible for 1.6 sec
    }

    // Scrolling down -> hide immediately
    if (direction > 0) {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      setVisible(false);
    }
  });

  const handleClick = (item, index, event) => {
    event.preventDefault();
    setActiveIndex(index);

    if (item.onClick) {
      item.onClick();
      return;
    }

    const target = document.querySelector(item.link);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className={cn(
          "fixed top-3 right-3 z-[5000] hidden md:block w-auto",
          className
        )}
      >
        <div
          className="
            relative flex items-center justify-center gap-1 lg:gap-2
            rounded-2xl px-3 py-2
            border border-white/10
            bg-white/10 dark:bg-black/25
            backdrop-blur-2xl
            shadow-[0_14px_40px_rgba(0,0,0,0.22)]
          "
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 blur-xl -z-10" />

          {navItems.map((item, index) => {
            const isActive =
              item.active !== undefined
                ? item.active
                : activeIndex === index;

            return (
              <a
                key={item.name || index}
                href={item.link}
                onClick={(event) => handleClick(item, index, event)}
                className="relative px-4 lg:px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                {isActive && (
                  <motion.div
                    layoutId="floating-navbar-pill"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                    className="
                      absolute inset-0 rounded-xl
                      border border-cyan-400/20
                      bg-gradient-to-r
                      from-purple-500/20
                      via-blue-500/20
                      to-cyan-500/20
                      shadow-[0_0_20px_rgba(34,211,238,0.18)]
                    "
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {item.icon && (
                    <span className="text-base text-cyan-300">
                      {item.icon}
                    </span>
                  )}

                  <span
                    className={cn(
                      isActive
                        ? "text-white"
                        : "text-neutral-300 hover:text-cyan-300"
                    )}
                  >
                    {item.name}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
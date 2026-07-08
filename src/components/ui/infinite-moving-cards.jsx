// ============================================================
// src/components/ui/InfiniteCards.jsx
// Fixed for Vite React (removed "use client")
// Fixed for SKILLS display (icon + name) not testimonials
// ============================================================

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for seamless infinite loop
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        // Fade edges
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative shrink-0 cursor-pointer group"
          >
            {/* Skill card */}
            <div className="flex flex-col items-center justify-center gap-3
                            w-[100px] h-[100px] rounded-2xl
                            border border-purple-500/20
                            bg-gray-900/60 backdrop-blur-sm
                            hover:border-purple-500/60
                            hover:bg-gray-800/80
                            hover:-translate-y-1
                            transition-all duration-300">

              {/* Skill icon */}
              {item.img && (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              )}

              {/* Skill name */}
              <span className="text-xs text-gray-400 group-hover:text-purple-300 font-mono transition-colors duration-300 text-center px-1">
                {item.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
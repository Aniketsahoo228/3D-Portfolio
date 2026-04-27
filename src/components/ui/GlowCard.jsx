// src/components/ui/GlowCard.jsx

import { useEffect } from "react";

const GlowCard = ({ children, identifier }) => {
  useEffect(() => {
    const container = document.querySelector(
      `.glow-container-${identifier}`
    );

    const cards = document.querySelectorAll(
      `.glow-card-${identifier}`
    );

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const update = (event) => {
      cards.forEach((card) => {
        const bounds = card.getBoundingClientRect();

        const inside =
          event?.x > bounds.left - CONFIG.proximity &&
          event?.x < bounds.left + bounds.width + CONFIG.proximity &&
          event?.y > bounds.top - CONFIG.proximity &&
          event?.y < bounds.top + bounds.height + CONFIG.proximity;

        card.style.setProperty(
          "--active",
          inside ? 1 : CONFIG.opacity
        );

        const center = [
          bounds.left + bounds.width * 0.5,
          bounds.top + bounds.height * 0.5,
        ];

        let angle =
          (Math.atan2(
            event?.y - center[1],
            event?.x - center[0]
          ) *
            180) /
          Math.PI;

        angle = angle < 0 ? angle + 360 : angle;

        card.style.setProperty("--start", `${angle + 90}`);
      });
    };

    const restyle = () => {
      if (!container) return;

      container.style.setProperty("--gap", CONFIG.gap);
      container.style.setProperty("--blur", CONFIG.blur);
      container.style.setProperty("--spread", CONFIG.spread);
      container.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row"
      );
    };

    document.body.addEventListener("pointermove", update);
    restyle();
    update({ x: 0, y: 0 });

    return () => {
      document.body.removeEventListener("pointermove", update);
    };
  }, [identifier]);

  return (
    <div className={`glow-container glow-container-${identifier}`}>
      <article
        className={`glow-card glow-card-${identifier} relative w-full h-fit cursor-pointer rounded-xl border border-[#2a2e5a] bg-[#101123] text-gray-200 transition-all duration-300 hover:border-transparent`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
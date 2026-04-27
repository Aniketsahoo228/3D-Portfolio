// src/components/ui/TextGenerateEffect.jsx

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({ words, className }) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)" },
      {
        duration: 0.8,
        delay: stagger(0.08),
      }
    );
  }, [animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className={cn(
              "opacity-0 blur-sm inline-block mr-2",
              idx > 2
                ? "text-purple-400"
                : "text-black dark:text-white"
            )}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="leading-snug tracking-wide text-2xl md:text-4xl lg:text-6xl">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
// File: src/components/ui/typewriter-effect.jsx

import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/**
 * PREMIUM TYPEWRITER EFFECT
 * -----------------------------------
 * Features:
 * ✅ Types character by character
 * ✅ Deletes smoothly
 * ✅ Loops infinitely
 * ✅ Keeps word colors/styles
 * ✅ No layout shift
 * ✅ Responsive
 * ✅ Clean cursor blink
 *
 * Hero Usage:
 * <TypewriterEffect words={words} />
 */

export const TypewriterEffect = ({
  words = [],
  className,
  cursorClassName,
}) => {
  const textGroups = useMemo(
    () => [
      words,

      [
    { text: "Full-Stack" },
    { text: "Developer", className: "text-purple-700 dark:text-purple-300" },
    { text: "Next.js", className: "text-cyan-600 dark:text-cyan-300" },
    { text: "&", className: "text-black dark:text-white" },
    { text: "FastAPI", className: "text-indigo-700 dark:text-indigo-300" },
  ],

  [
    { text: "Creative" },
    { text: "Frontend" },
    { text: "Developer", className: "text-pink-600 dark:text-pink-400" },
    { text: "GSAP", className: "text-violet-600 dark:text-violet-300" },
    { text: "&", className: "text-black dark:text-white" },
    { text: "Three.js", className: "text-sky-600 dark:text-sky-300" },
  ],

  [
    { text: "Backend" },
    { text: "API" },
    { text: "Developer", className: "text-cyan-600 dark:text-cyan-300" },
    { text: "Node.js", className: "text-green-600 dark:text-green-300" },
    { text: "&", className: "text-black dark:text-white" },
    { text: "Django", className: "text-emerald-600 dark:text-emerald-300" },
  ],

  [
    { text: "Modern" },
    { text: "UI/UX" },
    { text: "Developer", className: "text-violet-600 dark:text-violet-300" },
    { text: "React", className: "text-sky-600 dark:text-sky-300" },
    { text: "&", className: "text-black dark:text-white" },
    { text: "Animations", className: "text-pink-600 dark:text-pink-400" },
  ],

  [
    { text: "Software" },
    { text: "Developer", className: "text-indigo-700 dark:text-cyan-300" },
    { text: "Scalable", className: "text-orange-600 dark:text-orange-300" },
    { text: "&", className: "text-black dark:text-white" },
    { text: "Clean", className: "text-teal-600 dark:text-teal-300" },
    { text: "Code" },
  ],

  [
    { text: "AI" },
    { text: "Developer", className: "text-sky-600 dark:text-sky-300" },
    { text: "Automation", className: "text-purple-700 dark:text-purple-300" },
    { text: "&", className: "text-black dark:text-white" },
    { text: "Integration", className: "text-pink-600 dark:text-pink-400" },
  ],
    ],
    [words]
  );

  const [groupIndex, setGroupIndex] = useState(0);
  const [displayed, setDisplayed] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentGroup = textGroups[groupIndex];

  const characters = useMemo(() => {
    return currentGroup.flatMap((word, wordIndex) => {
      const chars = word.text.split("").map((char) => ({
        char,
        className: word.className || "",
      }));

      if (wordIndex !== currentGroup.length - 1) {
        chars.push({
          char: "\u00A0",
          className: "",
        });
      }

      return chars;
    });
  }, [currentGroup]);

  useEffect(() => {
    let timeout;

    const typingSpeed = 65;
    const deletingSpeed = 35;
    const pauseAfterTyping = 1600;
    const pauseBeforeNext = 300;

    if (!isDeleting && displayed.length < characters.length) {
      timeout = setTimeout(() => {
        setDisplayed(characters.slice(0, displayed.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayed.length === characters.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(characters.slice(0, displayed.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setGroupIndex((prev) => (prev + 1) % textGroups.length);
      }, pauseBeforeNext);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, characters, textGroups.length]);

  const longestLength = useMemo(() => {
    return Math.max(...textGroups.map((group) =>
      group.reduce((acc, item) => acc + item.text.length + 1, 0)
    ));
  }, [textGroups]);

  return (
    <div
      className={cn(
        "flex justify-center md:justify-start items-center",
        className
      )}
    >
      <div
        className="relative"
        style={{
          minWidth: `${longestLength * 0.65}ch`,
        }}
      >
        <div
          className={cn(
            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight flex flex-wrap"
          )}
        >
          {displayed.map((item, index) => (
            <span
              key={index}
              className={cn(
                "text-black dark:text-white whitespace-pre",
                item.className
              )}
            >
              {item.char}
            </span>
          ))}

          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "ml-1 inline-block w-[3px] h-7 md:h-10 lg:h-12 rounded-full bg-blue-500",
              cursorClassName
            )}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * KEEPING YOUR SMOOTH VERSION ALSO
 */

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <span
                key={`char-${index}`}
                className={cn(
                  "dark:text-white text-black",
                  word.className
                )}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold"
          style={{ whiteSpace: "nowrap" }}
        >
          {renderWords()}
        </div>
      </motion.div>

      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
        }}
        className={cn(
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};
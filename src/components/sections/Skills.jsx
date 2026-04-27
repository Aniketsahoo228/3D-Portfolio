// src/components/sections/Skills.jsx

import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { SparklesCore } from "../ui/sparkles";
import { skillsData } from "../../data/skills";

const Skills = () => {
  const items = skillsData.map((skill) => ({
    name: skill,
    img: `/skills/${skill.toLowerCase().replace(/ /g, "")}.svg`,
  }));

  const reverseItems = [...items].reverse();

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-20 px-4 md:px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#7C3AED"
        />
      </div>

      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Skills
        </h2>
      </div>

      {/* Centered Content Wrapper */}
      <div className="max-w-7xl mx-auto">
        {/* Row 1 */}
        <div className="flex justify-center">
          <div className="w-full">
            <InfiniteMovingCards
              items={items}
              direction="left"
              speed="slow"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-6 flex justify-center">
          <div className="w-full">
            <InfiniteMovingCards
              items={reverseItems}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { SparklesCore } from "../ui/sparkles";
import { skillsData } from "../../data/skills";

const Skills = () => {
  const items = skillsData.map((skill) => ({
    name: skill,
    img: `/skills/${skill.toLowerCase().replace(/ /g, "")}.svg`,
  }));

  return (
    <section
      id="skills"
      className="relative py-20 overflow-hidden"
    >
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
  id="skills-particles"
  background="transparent"
  minSize={1}
  maxSize={2.4}
  particleDensity={70}
  speed={3}
  particleColor="#8B5CF6"
  className="w-full h-full opacity-100"
/>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Skills
        </h2>

        <InfiniteMovingCards
          items={items}
          direction="left"
          speed="slow"
        />

        <div className="mt-6">
          <InfiniteMovingCards
            items={[...items].reverse()}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
import { Timeline } from "../ui/Timeline";
import { experiences } from "../../data/experience";

const Experience = () => {
  const data = experiences.map((exp, index) => ({
    title: exp.duration.replace("Present", "Current"),
    content: (
      <div
        className={`rounded-2xl border border-black/10 bg-[rgba(255,255,255,0.72)] backdrop-blur-md p-7 md:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[rgba(3,0,20,0.72)]
        ${index % 2 === 0 ? "md:-rotate-[0.5deg]" : "md:rotate-[0.5deg]"}`}
      >
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">
          {exp.title}
        </h3>

        <p className="mt-1 font-medium text-indigo-700 dark:text-cyan-300">
          {exp.company}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {exp.description}
        </p>
      </div>
    ),
  }));

  return (
    <section id="experience" className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="mb-2 text-sm font-mono tracking-widest uppercase text-indigo-700 dark:text-cyan-300">
            My Journey
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Experience
          </h2>

          <div className="mt-3 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
        </div>

        <Timeline data={data} />
      </div>
    </section>
  );
};

export default Experience;

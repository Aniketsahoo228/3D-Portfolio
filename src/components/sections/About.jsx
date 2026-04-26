import { WavyBackground } from "../ui/WavyBackground";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { personalData } from "../../data/personal-data";
import { educations } from "../../data/educations";

const About = () => {
  const latestEducation = educations[0];

  return (
    <section id="about">
      <WavyBackground className="max-w-full py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-2">
              Get To Know Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About Me
            </h2>
          </div>

          {/* Grid */}
          <BentoGrid className="max-w-5xl mx-auto">
            <BentoGridItem
              title="Who I Am"
              description={personalData.description}
              className="md:col-span-2"
            />

            <BentoGridItem
              title="Location"
              description={personalData.address}
            />

            <BentoGridItem
              title="Education"
              description={`${latestEducation.title} • ${latestEducation.institution}`}
            />

            <BentoGridItem
              title="Currently Focused On"
              description="Full Stack Development, SaaS Products, AI Integrations, and Real-World Projects."
              className="md:col-span-2"
            />

            <BentoGridItem
              title="Available For"
              description="Internships, Freelance Projects, Startup Collaborations, and Remote Opportunities."
              className="md:col-span-2"
            />
          </BentoGrid>
        </div>
      </WavyBackground>
    </section>
  );
};

export default About;
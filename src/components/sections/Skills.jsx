// Skills.jsx
import { InfiniteMovingCards } from '../ui/InfiniteCards'
import { SparklesCore } from '../ui/Sparkles'
import { skillsData } from '../../data/skills'

const Skills = () => (
  <section className="py-20 relative overflow-hidden">
    <SparklesCore className="absolute inset-0 -z-10" particleColor="#7C3AED" background="transparent" />
    <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
    <InfiniteMovingCards
      items={skillsData.map(skill => ({ name: skill, img: `/skills/${skill.toLowerCase().replace(' ', '')}.svg` }))}
      direction="left"
      speed="slow"
    />
    <InfiniteMovingCards
      items={[...skillsData].reverse().map(skill => ({ name: skill, img: `/skills/${skill.toLowerCase().replace(' ', '')}.svg` }))}
      direction="right"
      speed="slow"
    />
  </section>
)
export default Skills
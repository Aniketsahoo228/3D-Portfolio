// Experience.jsx
import { Timeline } from '../ui/Timeline'
import { experiences } from '../../data/experience'

const Experience = () => {
  const data = experiences.map(exp => ({
    title: exp.duration,
    content: (
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-purple-400">{exp.title}</h3>
        <p className="text-cyan-400 font-medium">{exp.company}</p>
        <p className="text-gray-400 mt-2 text-sm">{exp.description}</p>
      </div>
    ),
  }))
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
      <Timeline data={data} />
    </section>
  )
}
export default Experience
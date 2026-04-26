// Projects.jsx
import { CardBody, CardContainer, CardItem } from '../ui/3DCard'
import { projectsData } from '../../data/projects-data'

const Projects = () => (
  <section className="py-20 px-4">
    <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {projectsData.map((project) => (
        <CardContainer key={project.id}>
          <CardBody className="bg-gray-900 border border-purple-500/20 rounded-xl p-6 h-auto">
            <CardItem translateZ={50}>
              <img src={project.img} alt={project.name} className="w-full rounded-lg" />
            </CardItem>
            <CardItem translateZ={60} as="h3" className="text-xl font-bold mt-4">{project.name}</CardItem>
            <CardItem translateZ={40} as="p" className="text-gray-400 text-sm mt-2">{project.description}</CardItem>
            <div className="flex gap-2 mt-4 flex-wrap">
              {project.tools.map(t => (
                <span key={t} className="text-xs px-2 py-1 bg-purple-900/40 text-purple-300 rounded-full">{t}</span>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              {project.code && <a href={project.code} target="_blank" className="text-xs text-cyan-400 hover:underline">GitHub</a>}
              {project.demo && <a href={project.demo} target="_blank" className="text-xs text-purple-400 hover:underline">Live Demo</a>}
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  </section>
)
export default Projects
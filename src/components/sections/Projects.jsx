// Projects.jsx

import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { FollowerPointerCard } from "../ui/following-pointer";
import { projectsData } from "../../data/projects-data";

const Projects = () => (
  <section id="projects" className="py-20 px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Projects</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {projectsData.map((project) => (
        <FollowerPointerCard
          key={project.id}
          title={project.name}
          className="w-full"
        >
          <CardContainer>
            <CardBody className="h-auto rounded-xl border border-indigo-200 bg-white/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-indigo-400 dark:border-purple-500/20 dark:bg-[#0b1120]/85 dark:hover:border-cyan-400/40">
              <CardItem translateZ={50}>
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full rounded-lg"
                />
              </CardItem>

              <CardItem
                translateZ={60}
                as="h3"
                className="text-xl font-bold mt-4 text-gray-900 dark:text-white"
              >
                {project.name}
              </CardItem>

              <CardItem
                translateZ={40}
                as="p"
                className="text-gray-700 dark:text-gray-300 text-sm mt-2"
              >
                {project.description}
              </CardItem>

              <div className="flex gap-2 mt-4 flex-wrap">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full dark:bg-purple-500/15 dark:text-purple-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-700 hover:underline dark:text-cyan-300"
                  >
                    GitHub
                  </a>
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-700 hover:underline dark:text-purple-300"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </CardBody>
          </CardContainer>
        </FollowerPointerCard>
      ))}
    </div>
  </section>
);

export default Projects;

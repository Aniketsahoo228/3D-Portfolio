"use client";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { projectsData } from "../../data/projects-data";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Projects = () => (
  <section id="projects" className="py-20 px-4">

    <div className="text-center mb-12">
      <p className="text-indigo-700 dark:text-cyan-300 uppercase tracking-[0.3em] text-sm mb-2">
        What I've Built
      </p>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        Projects
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {(projectsData ?? []).map((project, i) => (
        <motion.div
          key={project.id ?? i}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <CardContainer containerClassName="py-0 w-full" className="w-full">
            <CardBody
  className="
    w-full h-auto
    rounded-2xl
    border border-white/10
    bg-white/60 dark:bg-white/10
    p-6
    shadow-lg
    relative
    group
  "
>
              {/* Title — floats highest */}
              <CardItem
                translateZ={100}
                as="h3"
                className="text-lg font-bold text-white w-full mb-1"
              >
                {project.name}
              </CardItem>

              {/* Description — floats above image */}
              <CardItem
                translateZ={80}
                as="p"
                className="text-gray-400 text-sm w-full mb-4 line-clamp-2 leading-relaxed"
              >
                {project.description}
              </CardItem>

              {/* Image — base layer */}
              <CardItem translateZ={80} className="w-full -mx-6 px-6" style={{width: "calc(100% + 3rem)", marginLeft: "-1.5rem"}}>
                <div className="w-full h-48 rounded-xl overflow-hidden">
                  {project.img ? (
                    <img
                      src={project.img}
                      alt={project.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-600 text-sm">
                      No preview
                    </div>
                  )}
                </div>
              </CardItem>

              {/* Tech tags */}
              <CardItem translateZ={60} className="w-full mt-4">
                <div className="flex gap-1.5 flex-wrap">
                  {(project.tools ?? []).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium
                        bg-purple-500/15 text-purple-200
                        border border-purple-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </CardItem>

              {/* Links row */}
              <CardItem translateZ={80} className="w-full mt-5">
                <div className="flex items-center justify-between">
                  {/* GitHub */}
                  {project.code ? (
                   <a 
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex items-center gap-1.5 text-xs font-medium
                        text-gray-400 hover:text-cyan-300
                        transition-colors duration-200
                      "
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub →
                    </a>
                  ) : <span />}

                  {/* Live Demo */}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex items-center gap-1.5 text-xs font-medium
                        px-4 py-1.5 rounded-full
                        bg-white text-black
                        hover:bg-gray-100
                        transition-colors duration-200
                      "
                    >
                      Live Demo
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  )}
                </div>
              </CardItem>

            </CardBody>
          </CardContainer>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;

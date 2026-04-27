"use client";
import { WavyBackground } from "../ui/wavy-background";
import { personalData } from "../../data/personal-data";
import { educations } from "../../data/educations";
import { motion } from "framer-motion";
import {
  HiUser,
  HiLocationMarker,
  HiAcademicCap,
  HiLightningBolt,
  HiBriefcase,
  HiCode,
} from "react-icons/hi";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const About = () => {
  // ── Safe destructuring — nothing can be undefined ──
  const name        = personalData?.name ?? "Developer";
  const description = personalData?.description ?? "";
  const address     = personalData?.address ?? "";
  const stats       = personalData?.stats ?? {};
  const skills      = Array.isArray(personalData?.skills) ? personalData.skills : [];
  const services    = Array.isArray(personalData?.services) ? personalData.services : [];
  const safeEdus    = Array.isArray(educations) ? educations : [];
  const availability= personalData?.stats?.availability ?? "Open to Work";

  return (
    <section id="about" className="-mt-px">
      <WavyBackground className="max-w-full py-20 px-4">
        <div className="max-w-6xl mx-auto">

          {/* ── Heading ── */}
          <div className="text-center mb-12">
            <p className="text-indigo-700 dark:text-cyan-300 uppercase tracking-[0.3em] text-sm mb-2">
              Get To Know Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">

            {/* ── WHO I AM ── */}
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 relative group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 overflow-hidden shadow-sm cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-indigo-400/10 via-purple-400/5 to-transparent rounded-2xl" />

              <div className="mb-4 w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                <HiUser className="text-indigo-600 dark:text-indigo-300" size={20} />
              </div>

              <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
                Who I Am
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
              </p>

              {/* Stats row */}
              {Object.keys(stats).length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(stats).map(([key, val]) => (
                    <div
                      key={key}
                      className="rounded-xl bg-indigo-50/60 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-500/20 px-3 py-2 text-center"
                    >
                      <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        {val}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-indigo-300/20 dark:bg-indigo-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            {/* ── LOCATION ── */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="relative group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 overflow-hidden shadow-sm cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-400/10 via-rose-400/5 to-transparent rounded-2xl" />

              <div className="mb-4 w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
                <HiLocationMarker className="text-pink-600 dark:text-pink-300" size={20} />
              </div>

              <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2">
                Location
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {address}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500" />
                </span>
                <span className="text-xs text-pink-600 dark:text-pink-300 font-mono">
                  Based in India
                </span>
              </div>

              {/* Availability pills — hardcoded, no Object.entries */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Remote", "Freelance", "Internship", "Relocation"].map((key) => (
                  <span
                    key={key}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-pink-100/80 dark:bg-pink-500/15 text-pink-700 dark:text-pink-300 border border-pink-200/50 dark:border-pink-500/20 capitalize"
                  >
                    {key}
                  </span>
                ))}
              </div>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-pink-300/20 dark:bg-pink-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            {/* ── EDUCATION TIMELINE ── */}
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
              className="md:col-span-2 relative group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 overflow-hidden shadow-sm cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-400/10 via-purple-400/5 to-transparent rounded-2xl" />

              <div className="mb-4 w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                <HiAcademicCap className="text-violet-600 dark:text-violet-300" size={20} />
              </div>

              <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
                Education
              </h3>

              <div className="relative pl-4 space-y-4">
                <div className="absolute left-0 top-1 bottom-1 w-px bg-gradient-to-b from-violet-400 via-purple-300 to-transparent dark:from-violet-500 dark:via-purple-400" />

                {safeEdus.map((edu, idx) => (
                  <motion.div
                    key={edu.id ?? idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, duration: 0.4 }}
                    className="relative"
                  >
                    <div className="absolute -left-[1.15rem] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-500 dark:bg-violet-400 border-2 border-white dark:border-[#030014]" />

                    <div className="rounded-xl bg-violet-50/60 dark:bg-violet-500/10 border border-violet-100/50 dark:border-violet-500/20 px-3 py-2">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                          {edu.title ?? ""}
                        </p>
                        <span className="text-[10px] font-mono text-violet-600 dark:text-violet-300 whitespace-nowrap">
                          {edu.duration ?? ""}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {edu.institution ?? ""}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-violet-300/20 dark:bg-violet-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            {/* ── SKILLS ── */}
            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="relative group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 overflow-hidden shadow-sm cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sky-400/10 via-blue-400/5 to-transparent rounded-2xl" />

              <div className="mb-4 w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center">
                <HiCode className="text-sky-600 dark:text-sky-300" size={20} />
              </div>

              <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-1.5">
  {[
    "Next.js", "React.js", "JavaScript", "TypeScript",
    "Python", "Django", "FastAPI", "Node.js",
    "Tailwind CSS", "Framer Motion", "MongoDB",
    "PostgreSQL", "Git", "Docker"
  ].map((skill) => (
    <span
      key={skill}
      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-100/80 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-200/50 dark:border-sky-500/20"
    >
      {skill}
    </span>
  ))}
</div>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-sky-300/20 dark:bg-sky-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            {/* ── CURRENTLY FOCUSED ON ── */}
            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 relative group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 overflow-hidden shadow-sm cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/10 via-sky-400/5 to-transparent rounded-2xl" />

              <div className="mb-4 w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center">
                <HiLightningBolt className="text-cyan-600 dark:text-cyan-300" size={20} />
              </div>

              <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                Currently Focused On
              </h3>

              <div className="flex flex-wrap gap-2">
                {["Full Stack Development", "SaaS Products", "AI Integrations", "Real-World Projects"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100/80 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              {/* Services — uses safe array */}
              {services.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
  "Full Stack Web Development",
  "Frontend UI Engineering", 
  "Backend API Development",
  "SaaS Product Development",
  "AI Integration",
  "Performance Optimization"
].map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 flex-shrink-0" />
                      {service}
                    </div>
                  ))}
                </div>
              )}

              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-cyan-300/20 dark:bg-cyan-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            {/* ── AVAILABLE FOR ── */}
            <motion.div
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.01 }}
              className="md:col-span-3 relative group rounded-2xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 overflow-hidden shadow-sm cursor-default"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-400/10 via-amber-400/5 to-transparent rounded-2xl" />

              <div className="mb-4 w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                <HiBriefcase className="text-orange-600 dark:text-orange-300" size={20} />
              </div>

              <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">
                Available For
              </h3>

              <div className="flex flex-wrap gap-2">
                {["Internships", "Freelance Projects", "Startup Collaborations", "Remote Opportunities"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100/80 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-200/50 dark:border-orange-500/20"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              {/* Open to work badge */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100/80 dark:bg-green-500/15 border border-green-200/50 dark:border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  {availability}
                </span>
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

          </div>
        </div>
      </WavyBackground>
    </section>
  );
};

export default About;
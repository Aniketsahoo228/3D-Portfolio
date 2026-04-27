import { motion } from "framer-motion";
import { certificationsData } from "../../data/certifications";
import { MovingBorder } from "../ui/MovingBorders";

// Verified Badge Icon
const VerifiedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="#06B6D4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Individual Card
const CertCard = ({ cert, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative [perspective:1400px]"
  >
    <MovingBorder duration={3000} rx="12px" ry="12px">
      <div className="h-[2px] w-[2px] bg-[radial-gradient(#7C3AED_40%,transparent_60%)]" />
    </MovingBorder>

    <div className="relative h-[430px] w-full rounded-xl [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)]">
      
      {/* FRONT SIDE */}
      <div className="absolute inset-0 rounded-xl overflow-hidden border border-black/10 bg-[rgba(255,255,255,0.72)] backdrop-blur-md shadow-xl [backface-visibility:hidden] dark:border-white/10 dark:bg-[rgba(3,0,20,0.72)]">
        {cert.img && (
          <div className="relative h-44 overflow-hidden">
            <img
              src={cert.img}
              alt={cert.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent dark:from-gray-900 dark:via-gray-900/20" />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-semibold tracking-wider uppercase text-indigo-700 dark:text-cyan-300">
              {cert.issuer}
            </span>
            <VerifiedIcon />
          </div>

          <h3 className="text-gray-900 dark:text-white font-bold text-base leading-snug mb-1">
            {cert.title}
          </h3>

          <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
            {cert.date}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {cert.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-purple-500/15 dark:text-purple-200 dark:border-purple-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-black/10 dark:border-white/10">
            <span className="text-gray-500 dark:text-gray-400 text-xs font-mono truncate max-w-[140px]">
              ID: {cert.credentialId}
            </span>

            <a
              href={cert.verify}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-medium text-blue-700 hover:underline dark:text-cyan-300"
            >
              Verify ↗
            </a>
          </div>
        </div>
      </div>

      {/* BACK SIDE */}
      <div className="absolute inset-0 rounded-xl border border-indigo-400/30 bg-[rgba(255,255,255,0.88)] dark:bg-[rgba(10,10,30,0.95)] backdrop-blur-xl shadow-xl p-6 flex flex-col justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          What I Learned
        </h3>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-5">
          {cert.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-indigo-700 dark:text-cyan-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={cert.verify}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
        >
          Verify Certificate ↗
        </a>
      </div>
    </div>
  </motion.div>
);
// Main Section
const Certifications = () => {
  return (
    <section id="certifications" className="relative py-20 px-4">
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="mb-2 text-sm font-mono tracking-widest uppercase text-indigo-700 dark:text-cyan-300">
            What I Have Earned
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Certifications
          </h2>

          <div className="mt-3 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm font-mono text-gray-500 dark:text-gray-400"
        >
          {certificationsData.length} certifications earned and counting
        </motion.p>
      </div>
    </section>
  );
};

export default Certifications;

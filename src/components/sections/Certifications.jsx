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
    className="relative group"
  >
    <MovingBorder duration={3000} rx="12px" ry="12px">
      <div className="h-[2px] w-[2px] bg-[radial-gradient(#7C3AED_40%,transparent_60%)]" />
    </MovingBorder>

    <div className="relative rounded-xl overflow-hidden border border-purple-500/20 bg-gray-900/80 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
      {cert.img && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={cert.img}
            alt={cert.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-semibold tracking-wider uppercase text-cyan-400">
            {cert.issuer}
          </span>
          <VerifiedIcon />
        </div>

        <h3 className="text-white font-bold text-base leading-snug mb-1">
          {cert.title}
        </h3>

        <p className="text-gray-500 text-xs mb-3">{cert.date}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-800/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          {cert.credentialId && (
            <span className="text-gray-600 text-xs font-mono truncate max-w-[140px]">
              ID: {cert.credentialId}
            </span>
          )}

          {cert.verify && (
            <a
              href={cert.verify}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Verify ↗
            </a>
          )}
        </div>
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
          <p className="mb-2 text-sm font-mono tracking-widest uppercase text-cyan-400">
            What I Have Earned
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
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
          className="mt-12 text-center text-sm font-mono text-gray-600"
        >
          {certificationsData.length} certifications earned and counting
        </motion.p>
      </div>
    </section>
  );
};

export default Certifications;
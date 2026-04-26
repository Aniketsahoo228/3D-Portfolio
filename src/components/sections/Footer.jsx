import { personalData } from "../../data/personal-data";
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { navItems } from "../../data/nav-items";
 
// Map icon string names to actual components
const iconMap = {
  BsGithub:   <BsGithub size={20} />,
  BsLinkedin: <BsLinkedin size={20} />,
  BsTwitterX: <BsTwitterX size={20} />,
  FiMail:     <FiMail size={20} />,
};
 
const socialLinks = [
  { name: "GitHub",   url: personalData.github,   icon: "BsGithub" },
  { name: "LinkedIn", url: personalData.linkedIn,  icon: "BsLinkedin" },
  { name: "Twitter",  url: personalData.twitter,   icon: "BsTwitterX" },
  { name: "Email",    url: `mailto:${personalData.email}`, icon: "FiMail" },
];
 
const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="relative w-full overflow-hidden bg-[#030014]">
 
      {/* ── Top gradient border ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
 
      {/* ── Subtle background glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
 
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
 
        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
 
          {/* Column 1 — Logo + tagline */}
          <div className="flex flex-col gap-3">
            <a href="#hero" className="text-2xl font-bold font-mono tracking-wider">
              <span className="text-white">&lt;</span>
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {personalData.name}
              </span>
              <span className="text-white"> /&gt;</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Building beautiful, interactive web experiences with React, Three.js and modern animations.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-gray-500 hover:text-purple-400 transition-colors duration-200"
                >
                  {iconMap[s.icon]}
                </a>
              ))}
            </div>
          </div>
 
          {/* Column 2 — Quick nav links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-1">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors duration-200 py-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
 
          {/* Column 3 — Contact info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-1">
              Get In Touch
            </h4>
            <a
              href={`mailto:${personalData.email}`}
              className="text-gray-500 hover:text-cyan-400 text-sm transition-colors duration-200 break-all"
            >
              {personalData.email}
            </a>
            <p className="text-gray-500 text-sm">{personalData.address}</p>
            <a
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
            >
              Download Resume ↗
            </a>
          </div>
        </div>
 
        {/* ── Bottom divider ── */}
        <div className="h-px w-full bg-gray-800 mb-6" />
 
        {/* ── Copyright bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600 font-mono">
          <p>
            © {currentYear}{" "}
            <span className="text-gray-500">{personalData.name}</span>
            . All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with
            <span className="text-purple-500 mx-1">React</span>·
            <span className="text-cyan-500 mx-1">Three.js</span>·
            <span className="text-purple-500 mx-1">GSAP</span>·
            <span className="text-cyan-500 mx-1">Framer Motion</span>
          </p>
          <a
            href="#hero"
            className="text-gray-600 hover:text-purple-400 transition-colors duration-200"
          >
            Back to top ↑
          </a>
        </div>
 
      </div>
    </footer>
  );
};
 
export default Footer;
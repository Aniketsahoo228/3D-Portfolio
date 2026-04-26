// Hero.jsx
import { Spotlight } from '../ui/Spotlight'
import { Cover } from '../ui/Cover'
import { TypewriterEffect } from '../ui/TypewriterEffect'
import { personalData } from '../../data/personal-data'

const words = [
  { text: 'Frontend' },
  { text: 'Developer,' },
  { text: 'React', className: 'text-purple-500' },
  { text: '&', className: 'text-purple-500' },
  { text: 'Three.js', className: 'text-cyan-500' },
]

const Hero = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img src="/hero-dark.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 -z-10" />
    <Spotlight className="-top-40 -left-10" fill="purple" />
    <Spotlight className="top-10 left-full" fill="cyan" />
    <div className="text-center z-10 px-4">
      <p className="text-cyan-400 font-mono mb-4 tracking-widest">Hello, I am</p>
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        <Cover>{personalData.name}</Cover>
      </h1>
      <TypewriterEffect words={words} className="mb-8" />
      <p className="text-gray-400 max-w-xl mx-auto mb-10">{personalData.description}</p>
      <div className="flex gap-4 justify-center">
        <a href="#projects" className="px-8 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition">View Projects</a>
        <a href={personalData.resume} target="_blank" className="px-8 py-3 border border-purple-600 rounded-full hover:bg-purple-600/10 transition">Resume</a>
      </div>
    </div>
  </div>
)
export default Hero
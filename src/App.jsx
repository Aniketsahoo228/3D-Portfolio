import { useEffect } from 'react'
import Lenis from 'lenis'

import LoadingScreen   from './components/common/LoadingScreen'
import Navbar          from './components/common/Navbar'
import ScrollToTop     from './components/common/ScrollToTop'
import Hero            from './components/sections/Hero'
import About           from './components/sections/About'
import Projects        from './components/sections/Projects'
import Skills          from './components/sections/Skills'
import Experience      from './components/sections/Experience'
import Certifications  from './components/sections/Certifications'
import Contact         from './components/sections/Contact'
import Footer          from './components/sections/Footer'
import { FollowingPointer } from './components/ui/FollowingPointer'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <LoadingScreen />
      <FollowingPointer />
      <Navbar />
      <main>
        <section id="hero">            <Hero />            </section>
        <section id="about">           <About />           </section>
        <section id="projects">        <Projects />        </section>
        <section id="skills">          <Skills />          </section>
        <section id="experience">      <Experience />      </section>
        <section id="certifications">  <Certifications />  </section>
        <section id="contact">         <Contact />         </section>
        <Footer />
      </main>
      <ScrollToTop />
    </>
  )
}

export default App

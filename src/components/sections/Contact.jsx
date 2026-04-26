// Contact.jsx
import { BackgroundBeams } from '../ui/BackgroundBeams'
import { ShootingStars } from '../ui/ShootingStars'

const Contact = () => (
  <section className="relative py-20 min-h-screen flex items-center justify-center overflow-hidden">
    <ShootingStars />
    <BackgroundBeams />
    <div className="relative z-10 w-full max-w-xl px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
      {/* Paste contact-form.jsx from developer-portfolio here */}
    </div>
  </section>
)
export default Contact
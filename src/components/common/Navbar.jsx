// In Navbar.jsx
import { FloatingDock } from '../ui/FloatingDock'
import { navItems } from '../../data/nav-items'
const Navbar = () => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
    <FloatingDock items={navItems} />
  </div>
)
export default Navbar
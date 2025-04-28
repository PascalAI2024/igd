import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import NavigationButton from './NavigationButton';

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const industries = [
  { name: 'Local Retail', path: '/industries/local-retail' },
  { name: 'Small Restaurants', path: '/industries/restaurants' },
  { name: 'Local Services', path: '/industries/local-services' },
  { name: 'Small Healthcare', path: '/industries/healthcare' },
  { name: 'Auto Services', path: '/industries/auto-services' },
  { name: 'Small Manufacturing', path: '/industries/manufacturing' }
];

const services = [
  { name: 'AI & Machine Learning', path: '/services/ai-machine-learning' },
  { name: 'Digital Marketing', path: '/services/digital-marketing' },
  { name: 'Lead Generation', path: '/services/lead-generation' },
  { name: 'CRM Solutions', path: '/services/crm' },
  { name: 'Web Development', path: '/services/web-development' },
  { name: 'Communication', path: '/services/communication' },
  { name: 'Photography', path: '/services/photography' },
  { name: 'Videography', path: '/services/videography' },
  { name: 'Ad Management', path: '/services/ad-management' },
  { name: 'Business Automation', path: '/services/business-automation' }
];

const mainLinks = [
  { name: 'About', path: '/about' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (activeDropdown) {
      setActiveDropdown(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleMouseEnter = (menu: string) => {
    setHoveredDropdown(menu);
  };

  const handleMouseLeave = () => {
    setHoveredDropdown(null);
  };

  const NavLink: React.FC<{ to: string; className?: string; children: React.ReactNode }> = ({
    to,
    className = "text-gray-300 hover:text-white px-3 py-2 text-sm font-medium",
    children
  }) => (
    <NavigationButton
      to={to}
      className={className}
      onClick={closeMenu}
    >
      {children}
    </NavigationButton>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo onClick={closeMenu} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('industries')}
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Small Business
                </button>
                <AnimatePresence>
                  {(activeDropdown === 'industries' || hoveredDropdown === 'industries') && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-64 rounded-xl shadow-xl bg-black/90 backdrop-blur-lg border border-white/10"
                      onMouseEnter={() => handleMouseEnter('industries')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-1">
                        {industries.map((industry) => (
                          <NavLink
                            key={industry.path}
                            to={industry.path}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                          >
                            {industry.name}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('services')}
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  Services
                </button>
                <AnimatePresence>
                  {(activeDropdown === 'services' || hoveredDropdown === 'services') && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-56 rounded-xl shadow-xl bg-black/90 backdrop-blur-lg border border-white/10"
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-1">
                        {services.map((service) => (
                          <NavLink
                            key={service.path}
                            to={service.path}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                          >
                            {service.name}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white p-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu-backdrop"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 inset-x-0 z-40 bg-black/90 backdrop-blur-lg border-t border-white/10 md:hidden"
          >
            <div className="mobile-menu-container">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div>
                  <button
                    onClick={() => toggleDropdown('industries')}
                    className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                  >
                    Small Business
                  </button>
                  {activeDropdown === 'industries' && (
                    <div className="pl-4">
                      {industries.map((industry) => (
                        <NavLink
                          key={industry.path}
                          to={industry.path}
                          className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                        >
                          {industry.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleDropdown('services')}
                    className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                  >
                    Services
                  </button>
                  {activeDropdown === 'services' && (
                    <div className="pl-4">
                      {services.map((service) => (
                        <NavLink
                          key={service.path}
                          to={service.path}
                          className="block px-3 py-2 text-sm text-gray-400 hover:text-white"
                        >
                          {service.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>

                {mainLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

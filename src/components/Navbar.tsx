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
    className = "text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group",
    children
  }) => (
    <NavigationButton
      to={to}
      className={className}
      onClick={closeMenu}
    >
      {children}
      {className.includes("relative group") && (
        <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 ease-out"></span>
      )}
    </NavigationButton>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-md shadow-black/20" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 3px rgba(255, 0, 0, 0.05)' }}>
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
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group flex items-center"
                >
                  <span>Small Business</span>
                  <span className={`ml-1 transition-transform duration-200 ${activeDropdown === 'industries' || hoveredDropdown === 'industries' ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 ease-out"></span>
                </button>
                <AnimatePresence>
                  {(activeDropdown === 'industries' || hoveredDropdown === 'industries') && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-64 nav-dropdown"
                      onMouseEnter={() => handleMouseEnter('industries')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="nav-dropdown-arrow"></div>
                      <div className="py-1">
                        {industries.map((industry, index) => (
                          <NavLink
                            key={industry.path}
                            to={industry.path}
                            className="nav-dropdown-item"
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
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group flex items-center"
                >
                  <span>Services</span>
                  <span className={`ml-1 transition-transform duration-200 ${activeDropdown === 'services' || hoveredDropdown === 'services' ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 ease-out"></span>
                </button>
                <AnimatePresence>
                  {(activeDropdown === 'services' || hoveredDropdown === 'services') && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-56 nav-dropdown"
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="nav-dropdown-arrow"></div>
                      <div className="py-1">
                        {services.map((service, index) => (
                          <NavLink
                            key={service.path}
                            to={service.path}
                            className="nav-dropdown-item"
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
            className="fixed top-20 inset-x-0 z-40 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-lg border-t border-white/10 md:hidden glass-premium"
            style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 4px 15px -3px rgba(255, 0, 0, 0.1)' }}
          >
            <div className="mobile-menu-container">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div>
                  <button
                    onClick={() => toggleDropdown('industries')}
                    className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium flex items-center justify-between"
                  >
                    <span>Small Business</span>
                    <span className={`transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'industries' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 border-l border-red-500/20 ml-3 my-2">
                          {industries.map((industry) => (
                            <NavLink
                              key={industry.path}
                              to={industry.path}
                              className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:pl-5 transition-all duration-200"
                            >
                              {industry.name}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <button
                    onClick={() => toggleDropdown('services')}
                    className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium flex items-center justify-between"
                  >
                    <span>Services</span>
                    <span className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 border-l border-red-500/20 ml-3 my-2">
                          {services.map((service) => (
                            <NavLink
                              key={service.path}
                              to={service.path}
                              className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:pl-5 transition-all duration-200"
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
                    className="text-gray-200 hover:text-white block px-3 py-2 text-base font-medium"
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

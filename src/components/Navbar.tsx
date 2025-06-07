import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import NavigationButton from './NavigationButton';
import NavigationErrorBoundary from './NavigationErrorBoundary';
import { 
  mainRoutes, 
  industryRoutes, 
  serviceRoutes, 
  type RouteItem, 
  type RouteGroup 
} from '../data/routes';

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Keyboard navigation hook
const useKeyboardNavigation = (
  isOpen: boolean, 
  setIsOpen: (open: boolean) => void,
  activeDropdown: string | null,
  setActiveDropdown: (dropdown: string | null) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key closes mobile menu or dropdowns
      if (event.key === 'Escape') {
        if (isOpen) {
          setIsOpen(false);
        } else if (activeDropdown) {
          setActiveDropdown(null);
        }
      }
      
      // Tab key management for focus trapping in mobile menu
      if (event.key === 'Tab' && isOpen) {
        const focusableElements = document.querySelectorAll(
          'nav[aria-label="Main navigation"] button:not([disabled]), nav[aria-label="Main navigation"] a:not([disabled])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeDropdown, setIsOpen, setActiveDropdown]);
};

const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  
  // Use keyboard navigation hook
  useKeyboardNavigation(isOpen, setIsOpen, activeDropdown, setActiveDropdown);

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

  // Enhanced NavLink component with active state detection
  const NavLink: React.FC<{ 
    to: string; 
    className?: string; 
    children: React.ReactNode;
    prefetch?: boolean;
  }> = ({
    to,
    className = "text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group transition-colors duration-200",
    children,
    prefetch = false
  }) => {
    const isActive = location.pathname === to;
    const activeClass = isActive ? 'nav-link-active' : '';
    const finalClassName = `${className} ${activeClass}`.trim();

    return (
      <NavigationButton
        to={to}
        className={finalClassName}
        onClick={closeMenu}
        prefetch={prefetch}
      >
        {children}
        {className.includes("relative group") && !isActive && (
          <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300 ease-out"></span>
        )}
      </NavigationButton>
    );
  };

  // Dropdown item component with active state
  const DropdownItem: React.FC<{ 
    item: RouteItem; 
    className?: string;
  }> = ({ item, className = "nav-dropdown-item" }) => {
    const isActive = location.pathname === item.path;
    const activeClass = isActive ? 'nav-dropdown-item-active' : '';
    const finalClassName = `${className} ${activeClass}`.trim();

    return (
      <NavigationButton
        key={item.path}
        to={item.path}
        className={finalClassName}
        prefetch={true}
        aria-label={item.description}
      >
        {item.name}
      </NavigationButton>
    );
  };

  return (
    <NavigationErrorBoundary>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={(e) => e.target.scrollIntoView()}
      >
        Skip to main content
      </a>
      
      <nav 
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-md shadow-black/20" 
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 3px rgba(255, 0, 0, 0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo onClick={closeMenu} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {/* Industries Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('industries')}
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group flex items-center nav-button"
                  aria-expanded={activeDropdown === 'industries' || hoveredDropdown === 'industries'}
                  aria-haspopup="true"
                  aria-label={`${industryRoutes.name} - ${industryRoutes.description}`}
                >
                  <span>{industryRoutes.name}</span>
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
                      role="menu"
                      aria-label={industryRoutes.name}
                    >
                      <div className="nav-dropdown-arrow"></div>
                      <div className="py-1">
                        {industryRoutes.items.map((item) => (
                          <DropdownItem key={item.path} item={item} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => toggleDropdown('services')}
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative group flex items-center nav-button"
                  aria-expanded={activeDropdown === 'services' || hoveredDropdown === 'services'}
                  aria-haspopup="true"
                  aria-label={`${serviceRoutes.name} - ${serviceRoutes.description}`}
                >
                  <span>{serviceRoutes.name}</span>
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
                      role="menu"
                      aria-label={serviceRoutes.name}
                    >
                      <div className="nav-dropdown-arrow"></div>
                      <div className="py-1">
                        {serviceRoutes.items.map((item) => (
                          <DropdownItem key={item.path} item={item} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Main Navigation Links */}
              {mainRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  prefetch={true}
                >
                  {route.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white p-2 nav-button"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
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
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 inset-x-0 z-40 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-lg border-t border-white/10 md:hidden glass-premium"
            style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 4px 15px -3px rgba(255, 0, 0, 0.1)' }}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="mobile-menu-container">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Industries Dropdown */}
                <div>
                  <button
                    onClick={() => toggleDropdown('industries')}
                    className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium flex items-center justify-between nav-button"
                    aria-expanded={activeDropdown === 'industries'}
                    aria-controls="mobile-industries-menu"
                    aria-label={`${industryRoutes.name} - ${industryRoutes.description}`}
                  >
                    <span>{industryRoutes.name}</span>
                    <span className={`transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'industries' && (
                      <motion.div
                        id="mobile-industries-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                        role="menu"
                        aria-label={industryRoutes.name}
                      >
                        <div className="pl-4 border-l border-red-500/20 ml-3 my-2">
                          {industryRoutes.items.map((item) => (
                            <DropdownItem 
                              key={item.path} 
                              item={item}
                              className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:pl-5 transition-all duration-200 nav-dropdown-item"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    onClick={() => toggleDropdown('services')}
                    className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 text-base font-medium flex items-center justify-between nav-button"
                    aria-expanded={activeDropdown === 'services'}
                    aria-controls="mobile-services-menu"
                    aria-label={`${serviceRoutes.name} - ${serviceRoutes.description}`}
                  >
                    <span>{serviceRoutes.name}</span>
                    <span className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.div
                        id="mobile-services-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                        role="menu"
                        aria-label={serviceRoutes.name}
                      >
                        <div className="pl-4 border-l border-red-500/20 ml-3 my-2">
                          {serviceRoutes.items.map((item) => (
                            <DropdownItem 
                              key={item.path} 
                              item={item}
                              className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:pl-5 transition-all duration-200 nav-dropdown-item"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Main Links */}
                {mainRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className="text-gray-200 hover:text-white block px-3 py-2 text-base font-medium nav-button"
                  >
                    {route.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavigationErrorBoundary>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import NavigationButton from './NavigationButton';
import { 
  mainRoutes, 
  industryRoutes, 
  serviceRoutes,
  type RouteItem
} from '../data/routes';

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, setIsOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, setIsOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isOpen) {
          setIsOpen(false);
        } else if (activeDropdown) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeDropdown, setIsOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-red-500/20 fixed w-full top-0 z-50" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => toggleDropdown('services', e)}
                  className="text-gray-300 hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  aria-expanded={activeDropdown === 'services'}
                  aria-haspopup="true"
                >
                  Services
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-64 bg-black/95 backdrop-blur-md rounded-lg shadow-2xl border border-red-500/20 z-50 overflow-hidden"
                      style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 61, 61, 0.1)'
                      }}
                    >
                      <div className="py-2">
                        {serviceRoutes.items.map((item: RouteItem, index) => (
                          <NavigationButton
                            key={item.path}
                            to={item.path}
                            onClick={closeMenu}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-red-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-500/5 transition-all duration-200 border-b border-white/5 last:border-b-0"
                            style={{
                              animationDelay: `${index * 50}ms`
                            }}
                          >
                            {item.name}
                          </NavigationButton>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => toggleDropdown('industries', e)}
                  className="text-gray-300 hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  aria-expanded={activeDropdown === 'industries'}
                  aria-haspopup="true"
                >
                  Small Business
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'industries' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-64 bg-black/95 backdrop-blur-md rounded-lg shadow-2xl border border-red-500/20 z-50 overflow-hidden"
                      style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 61, 61, 0.1)'
                      }}
                    >
                      <div className="py-2">
                        {industryRoutes.items.map((item: RouteItem, index) => (
                          <NavigationButton
                            key={item.path}
                            to={item.path}
                            onClick={closeMenu}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-red-400 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-500/5 transition-all duration-200 border-b border-white/5 last:border-b-0"
                            style={{
                              animationDelay: `${index * 50}ms`
                            }}
                          >
                            {item.name}
                          </NavigationButton>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Main Navigation Links */}
              {mainRoutes.map((route) => (
                <NavigationButton
                  key={route.path}
                  to={route.path}
                  className="text-gray-300 hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {route.name}
                </NavigationButton>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-red-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded="false"
              aria-label="Open main menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-black/95 backdrop-blur-md border-l border-red-500/20 z-50 overflow-y-auto"
            >
              <div className="px-6 py-6 space-y-6">
                {/* Services Section */}
                <div>
                  <h3 className="text-red-400 font-semibold text-lg mb-3">Services</h3>
                  <div className="space-y-2">
                    {serviceRoutes.items.map((item: RouteItem) => (
                      <NavigationButton
                        key={item.path}
                        to={item.path}
                        onClick={closeMenu}
                        className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors duration-200"
                      >
                        {item.name}
                      </NavigationButton>
                    ))}
                  </div>
                </div>

                {/* Industries Section */}
                <div>
                  <h3 className="text-red-400 font-semibold text-lg mb-3">Small Business</h3>
                  <div className="space-y-2">
                    {industryRoutes.items.map((item: RouteItem) => (
                      <NavigationButton
                        key={item.path}
                        to={item.path}
                        onClick={closeMenu}
                        className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors duration-200"
                      >
                        {item.name}
                      </NavigationButton>
                    ))}
                  </div>
                </div>

                {/* Main Routes Section */}
                <div>
                  <h3 className="text-red-400 font-semibold text-lg mb-3">Company</h3>
                  <div className="space-y-2">
                    {mainRoutes.map((route) => (
                      <NavigationButton
                        key={route.path}
                        to={route.path}
                        onClick={closeMenu}
                        className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors duration-200"
                      >
                        {route.name}
                      </NavigationButton>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
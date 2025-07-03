import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';
import { 
  lockBodyScroll, 
  triggerHapticFeedback,
  TOUCH_TARGET,
  preventBounceScroll 
} from '../utils/mobileOptimizations';
import MobileTouchButton from './ui/MobileTouchButton';
import { mainRoutes, serviceRoutes, industryRoutes } from '../data/routes';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const unlock = lockBodyScroll();
      return unlock;
    }
  }, [isOpen]);

  // Prevent bounce scroll on menu
  useEffect(() => {
    if (menuRef.current && isOpen) {
      preventBounceScroll(menuRef.current);
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    onClose();
    setActiveSection(null);
  }, [location.pathname, onClose]);

  // Handle swipe to close
  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100 && info.velocity.x > 0) {
      triggerHapticFeedback('light');
      onClose();
    }
  };

  // Handle touch start for swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  // Handle section toggle
  const toggleSection = (section: string) => {
    triggerHapticFeedback('light');
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDrag={handlePan}
            onTouchStart={handleTouchStart}
            className="fixed top-0 right-0 w-[85vw] max-w-sm h-full bg-black/95 backdrop-blur-md z-50 overflow-hidden"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <MobileTouchButton
                onClick={onClose}
                variant="ghost"
                size="small"
                ariaLabel="Close menu"
                className="p-2"
              >
                <X className="w-6 h-6" />
              </MobileTouchButton>
            </div>

            {/* Menu Content */}
            <div className="h-[calc(100%-64px)] overflow-y-auto overscroll-contain">
              <nav className="py-4">
                {/* Services Section */}
                <div className="mb-2">
                  <button
                    onClick={() => toggleSection('services')}
                    className={cn(
                      'w-full flex items-center justify-between',
                      'px-4 py-3 text-left',
                      `min-h-[${TOUCH_TARGET.RECOMMENDED_SIZE}px]`,
                      'text-white font-medium',
                      'active:bg-white/5 transition-colors'
                    )}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Services</span>
                    <motion.div
                      animate={{ rotate: activeSection === 'services' ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeSection === 'services' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {serviceRoutes.items.map((item, index) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                              'block px-8 py-3',
                              `min-h-[${TOUCH_TARGET.MIN_SIZE}px]`,
                              'text-gray-300 active:text-white active:bg-white/5',
                              'transition-colors border-l-2 border-transparent',
                              location.pathname === item.path && 'text-red-400 border-red-400 bg-red-500/5'
                            )}
                            style={{ 
                              WebkitTapHighlightColor: 'transparent',
                              animationDelay: `${index * 50}ms` 
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Industries Section */}
                <div className="mb-2">
                  <button
                    onClick={() => toggleSection('industries')}
                    className={cn(
                      'w-full flex items-center justify-between',
                      'px-4 py-3 text-left',
                      `min-h-[${TOUCH_TARGET.RECOMMENDED_SIZE}px]`,
                      'text-white font-medium',
                      'active:bg-white/5 transition-colors'
                    )}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Small Business</span>
                    <motion.div
                      animate={{ rotate: activeSection === 'industries' ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeSection === 'industries' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {industryRoutes.items.map((item, index) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                              'block px-8 py-3',
                              `min-h-[${TOUCH_TARGET.MIN_SIZE}px]`,
                              'text-gray-300 active:text-white active:bg-white/5',
                              'transition-colors border-l-2 border-transparent',
                              location.pathname === item.path && 'text-red-400 border-red-400 bg-red-500/5'
                            )}
                            style={{ 
                              WebkitTapHighlightColor: 'transparent',
                              animationDelay: `${index * 50}ms` 
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Main Navigation Links */}
                <div className="border-t border-white/10 pt-2">
                  {mainRoutes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className={cn(
                        'block px-4 py-3',
                        `min-h-[${TOUCH_TARGET.RECOMMENDED_SIZE}px]`,
                        'text-white font-medium',
                        'active:bg-white/5 transition-colors',
                        location.pathname === route.path && 'text-red-400 bg-red-500/5'
                      )}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {route.name}
                    </Link>
                  ))}
                </div>

                {/* Contact Section - Mobile Specific */}
                <div className="border-t border-white/10 mt-4 pt-4 px-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Get in Touch
                  </h3>
                  
                  {/* Click to Call */}
                  <MobileTouchButton
                    onClick={() => window.location.href = 'tel:+12085550123'}
                    variant="secondary"
                    size="medium"
                    className="w-full mb-3 justify-start"
                    hapticFeedback
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    <span>(208) 555-0123</span>
                  </MobileTouchButton>

                  {/* Email */}
                  <MobileTouchButton
                    onClick={() => window.location.href = 'mailto:info@ingeniousdigital.com'}
                    variant="secondary"
                    size="medium"
                    className="w-full mb-3 justify-start"
                    hapticFeedback
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    <span>Email Us</span>
                  </MobileTouchButton>

                  {/* Directions */}
                  <MobileTouchButton
                    onClick={() => window.open('https://maps.google.com/?q=Ingenious+Digital+Boise+ID', '_blank')}
                    variant="secondary"
                    size="medium"
                    className="w-full justify-start"
                    hapticFeedback
                  >
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>Get Directions</span>
                  </MobileTouchButton>
                </div>

                {/* CTA Section */}
                <div className="px-4 py-6">
                  <MobileTouchButton
                    onClick={() => {
                      onClose();
                      // Navigate to contact or show contact form
                      window.location.href = '/contact';
                    }}
                    variant="primary"
                    size="large"
                    className="w-full"
                    hapticFeedback
                  >
                    Get Started Today
                  </MobileTouchButton>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { getBreadcrumbs } from '../../data/routes';

interface EnhancedBreadcrumbsProps {
  className?: string;
  maxItems?: number;
  separator?: 'chevron' | 'slash' | 'arrow';
  showHome?: boolean;
  animate?: boolean;
}

/**
 * Enhanced breadcrumb navigation with animations
 * Features:
 * - Smooth entrance animations
 * - Interactive hover states
 * - Collapsible long paths
 * - Custom separators
 * - Responsive design
 */
const EnhancedBreadcrumbs: React.FC<EnhancedBreadcrumbsProps> = ({
  className = '',
  maxItems = 4,
  separator = 'chevron',
  showHome = true,
  animate = true,
}) => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  
  // Don't show on home or if only one item
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }
  
  // Handle long breadcrumb trails
  const displayBreadcrumbs = breadcrumbs.length > maxItems
    ? [
        breadcrumbs[0],
        { name: '...', path: '', isEllipsis: true },
        ...breadcrumbs.slice(-2),
      ]
    : breadcrumbs;
  
  // Separator component
  const Separator = () => {
    switch (separator) {
      case 'slash':
        return <span className="text-gray-500 mx-2">/</span>;
      case 'arrow':
        return <span className="text-gray-500 mx-2">→</span>;
      default:
        return <ChevronRight className="w-4 h-4 text-gray-500 mx-1" />;
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };
  
  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-4 ${className}`}
    >
      <motion.ol
        className="flex items-center flex-wrap text-sm"
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
      >
        {displayBreadcrumbs.map((crumb, index) => {
          const isLast = index === displayBreadcrumbs.length - 1;
          const isFirst = index === 0;
          const isEllipsis = 'isEllipsis' in crumb && crumb.isEllipsis;
          
          return (
            <motion.li
              key={`${crumb.path}-${index}`}
              className="flex items-center"
              variants={animate ? itemVariants : undefined}
            >
              {/* Separator */}
              {index > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                >
                  <Separator />
                </motion.div>
              )}
              
              {/* Breadcrumb item */}
              {isEllipsis ? (
                <motion.button
                  className="px-2 py-1 text-gray-500 hover:text-gray-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Could implement breadcrumb menu here
                    console.log('Show full breadcrumb trail');
                  }}
                >
                  •••
                </motion.button>
              ) : isLast ? (
                <motion.span
                  className="px-2 py-1 text-white font-medium"
                  aria-current="page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  {crumb.name}
                </motion.span>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={crumb.path}
                    className="group flex items-center px-2 py-1 text-gray-400 hover:text-white transition-all duration-200 rounded-md hover:bg-white/5"
                  >
                    {isFirst && showHome && (
                      <Home className="w-4 h-4 mr-1.5" />
                    )}
                    <span className="relative">
                      {crumb.name}
                      {/* Underline animation */}
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-red-500 to-orange-500"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ originX: 0 }}
                      />
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

export default EnhancedBreadcrumbs;
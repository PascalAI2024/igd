import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import NavigationButton from './NavigationButton';
import { getBreadcrumbs } from '../data/routes';

interface BreadcrumbsProps {
  className?: string;
  maxItems?: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  className = '',
  maxItems = 4
}) => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  // Don't show breadcrumbs on home page or if only one item
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  // Truncate breadcrumbs if too many items
  const displayBreadcrumbs = breadcrumbs.length > maxItems 
    ? [
        breadcrumbs[0], // Always show home
        { name: '...', path: '' }, // Ellipsis
        ...breadcrumbs.slice(-2) // Show last 2 items
      ]
    : breadcrumbs;

  return (
    <nav 
      aria-label="Breadcrumb"
      className={`py-4 ${className}`}
    >
      <motion.ol 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center space-x-2 text-sm"
      >
        {displayBreadcrumbs.map((crumb, index) => {
          const isLast = index === displayBreadcrumbs.length - 1;
          const isEllipsis = crumb.name === '...';
          
          return (
            <motion.li 
              key={`${crumb.path}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="flex items-center"
            >
              {index > 0 && (
                <ChevronRight 
                  size={14} 
                  className="text-gray-500 mx-2 flex-shrink-0" 
                  aria-hidden="true"
                />
              )}
              
              {isEllipsis ? (
                <span className="text-gray-500 px-2" aria-hidden="true">
                  ...
                </span>
              ) : isLast ? (
                <span 
                  className="text-white font-medium"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <NavigationButton
                  to={crumb.path}
                  className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-black rounded px-1"
                >
                  {index === 0 ? (
                    <span className="flex items-center">
                      <Home size={14} className="mr-1" />
                      {crumb.name}
                    </span>
                  ) : (
                    crumb.name
                  )}
                </NavigationButton>
              )}
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

export default Breadcrumbs;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Breadcrumb {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface EnhancedBreadcrumbsProps {
  items?: Breadcrumb[];
  separator?: React.ReactNode;
  showHome?: boolean;
  className?: string;
}

export const EnhancedBreadcrumbs: React.FC<EnhancedBreadcrumbsProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4" />,
  showHome = true,
  className
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from URL if items not provided
  const generateBreadcrumbs = (): Breadcrumb[] => {
    if (items) return items;

    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs: Breadcrumb[] = [];

    pathnames.forEach((value, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();
  const allItems = showHome 
    ? [{ label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> }, ...breadcrumbItems]
    : breadcrumbItems;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-2 text-sm', className)}
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        
        return (
          <motion.div
            key={index}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {index > 0 && (
              <motion.span
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.05 }}
              >
                {separator}
              </motion.span>
            )}
            
            {isLast ? (
              <span className="flex items-center gap-1 text-gray-300 font-medium">
                {item.icon}
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href || '#'}
                className="group flex items-center gap-1 text-gray-400 hover:text-white transition-colors relative"
              >
                {item.icon}
                <span className="relative">
                  {item.label}
                  
                  {/* Hover underline effect */}
                  <motion.span
                    className="absolute left-0 bottom-0 h-px bg-gradient-to-r from-orange-500 to-pink-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
                
                {/* Hover glow */}
                <motion.span
                  className="absolute inset-0 blur-md opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{ color: '#f97316' }}
                >
                  {item.label}
                </motion.span>
              </Link>
            )}
          </motion.div>
        );
      })}
    </nav>
  );
};
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EnhancedLinkProps extends Omit<LinkProps, 'to'> {
  to?: string;
  href?: string;
  external?: boolean;
  showExternalIcon?: boolean;
  variant?: 'default' | 'gradient' | 'glow' | 'underline';
  glowColor?: string;
  children: React.ReactNode;
}

export const EnhancedLink: React.FC<EnhancedLinkProps> = ({
  to,
  href,
  external,
  showExternalIcon = true,
  variant = 'default',
  glowColor = '#f97316',
  children,
  className,
  ...props
}) => {
  const isExternal = external || href?.startsWith('http') || href?.startsWith('//');
  const linkDestination = to || href || '#';

  const variantStyles = {
    default: 'text-orange-500 hover:text-orange-400',
    gradient: 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent',
    glow: 'text-orange-500 hover:text-orange-400',
    underline: 'text-gray-300 hover:text-white'
  };

  const content = (
    <motion.span
      className={cn(
        'relative inline-flex items-center gap-1 transition-all duration-300',
        'transform-gpu will-change-transform',
        variantStyles[variant],
        className
      )}
      whileHover="hover"
      initial="initial"
    >
      {/* Text content with glow effect */}
      <span className="relative">
        {variant === 'glow' && (
          <motion.span
            className="absolute inset-0 blur-md opacity-0"
            style={{ color: glowColor }}
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 0.7 }
            }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>
        )}
        <span className="relative z-10">{children}</span>
      </span>

      {/* External link icon */}
      {isExternal && showExternalIcon && (
        <motion.span
          variants={{
            initial: { opacity: 0.5, scale: 0.9 },
            hover: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.2 }}
        >
          <ExternalLink className="w-3 h-3" />
        </motion.span>
      )}

      {/* Gradient underline animation */}
      {(variant === 'underline' || variant === 'gradient') && (
        <motion.span
          className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
          style={{
            transformOrigin: 'left center',
            backgroundSize: '200% 100%'
          }}
          initial={{ scaleX: 0, backgroundPosition: '0% 0%' }}
          variants={{
            initial: { scaleX: 0, backgroundPosition: '0% 0%' },
            hover: { 
              scaleX: 1, 
              backgroundPosition: '100% 0%',
              transition: {
                scaleX: { duration: 0.3, ease: 'easeOut' },
                backgroundPosition: { duration: 1.5, ease: 'linear' }
              }
            }
          }}
        />
      )}

      {/* Default underline for simple variant */}
      {variant === 'default' && (
        <motion.span
          className="absolute left-0 bottom-0 h-px bg-current opacity-25"
          initial={{ scaleX: 0 }}
          variants={{
            initial: { scaleX: 0 },
            hover: { scaleX: 1 }
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shimmer effect for gradient variant */}
      {variant === 'gradient' && (
        <motion.span
          className="absolute inset-0 opacity-0"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, white 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          variants={{
            initial: { opacity: 0, backgroundPosition: '200% 0%' },
            hover: { 
              opacity: 0.3,
              backgroundPosition: '-200% 0%',
              transition: {
                backgroundPosition: { duration: 1, ease: 'easeInOut' }
              }
            }
          }}
        />
      )}
    </motion.span>
  );

  if (isExternal) {
    return (
      <a
        href={linkDestination}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={linkDestination}
      className="inline-flex"
      {...props}
    >
      {content}
    </Link>
  );
};
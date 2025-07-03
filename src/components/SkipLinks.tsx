import React from 'react';

interface SkipLink {
  id: string;
  label: string;
}

const defaultLinks: SkipLink[] = [
  { id: 'main-content', label: 'Skip to main content' },
  { id: 'main-navigation', label: 'Skip to navigation' },
  { id: 'footer', label: 'Skip to footer' },
];

interface SkipLinksProps {
  links?: SkipLink[];
}

/**
 * Skip links component for keyboard navigation
 * Allows users to quickly jump to main sections of the page
 */
export const SkipLinks: React.FC<SkipLinksProps> = ({ links = defaultLinks }) => {
  const handleSkip = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="skip-links">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            handleSkip(link.id);
          }}
        >
          {link.label}
        </a>
      ))}
      
      <style jsx>{`
        .skip-links {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9999;
        }
        
        .skip-link {
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
          background-color: #1a202c;
          color: white;
          padding: 1rem 1.5rem;
          text-decoration: none;
          border-radius: 0.375rem;
          font-weight: 500;
        }
        
        .skip-link:focus {
          position: absolute;
          left: 1rem;
          top: 1rem;
          width: auto;
          height: auto;
          overflow: visible;
          z-index: 10000;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .skip-link:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

/**
 * Main content wrapper with proper landmark and focus management
 */
export const MainContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <main
      id="main-content"
      className={className}
      tabIndex={-1}
      style={{ outline: 'none' }}
    >
      {children}
    </main>
  );
};

/**
 * Navigation wrapper with proper landmark
 */
export const NavigationWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <nav
      id="main-navigation"
      className={className}
      aria-label="Main navigation"
      tabIndex={-1}
      style={{ outline: 'none' }}
    >
      {children}
    </nav>
  );
};
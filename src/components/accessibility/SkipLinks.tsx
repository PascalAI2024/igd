import React from 'react';
import { skipToContent } from '../../utils/accessibility';

interface SkipLink {
  id: string;
  label: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
}

export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = [
    { id: 'main-content', label: 'Skip to main content' },
    { id: 'navigation', label: 'Skip to navigation' },
    { id: 'footer', label: 'Skip to footer' },
  ],
}) => {
  return (
    <div className="skip-links">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            skipToContent(link.id);
          }}
        >
          {link.label}
        </a>
      ))}
      <style jsx>{`
        .skip-links {
          position: absolute;
          top: -40px;
          left: 0;
          background: #000;
          z-index: 9999;
        }
        
        .skip-link {
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
          color: white;
          padding: 8px;
          text-decoration: none;
          white-space: nowrap;
        }
        
        .skip-link:focus {
          position: static;
          width: auto;
          height: auto;
          overflow: visible;
          clip: auto;
          white-space: normal;
          left: 0;
          display: inline-block;
          padding: 12px 24px;
          background: #000;
          color: #fff;
          text-decoration: underline;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};
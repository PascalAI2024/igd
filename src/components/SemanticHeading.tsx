import React from 'react';

interface SemanticHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  visualLevel?: 1 | 2 | 3 | 4 | 5 | 6; // For visual styling different from semantic level
}

/**
 * Semantic heading component that ensures proper heading hierarchy
 * while allowing flexible visual styling
 */
export const SemanticHeading: React.FC<SemanticHeadingProps> = ({
  level,
  children,
  className = '',
  id,
  visualLevel,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const styleLevel = visualLevel || level;

  // Default styles for each heading level
  const defaultStyles = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
    4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
    5: 'text-lg md:text-xl lg:text-2xl font-medium',
    6: 'text-base md:text-lg lg:text-xl font-medium',
  };

  const combinedClassName = `${defaultStyles[styleLevel]} ${className}`.trim();

  return React.createElement(
    Tag,
    { className: combinedClassName, id },
    children
  );
};

/**
 * Page title component (always h1)
 */
export const PageTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}> = ({ children, className = '', subtitle }) => {
  return (
    <div className="mb-8">
      <SemanticHeading level={1} className={className}>
        {children}
      </SemanticHeading>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * Section heading component
 */
export const SectionHeading: React.FC<{
  children: React.ReactNode;
  level?: 2 | 3 | 4;
  className?: string;
  id?: string;
}> = ({ children, level = 2, className = '', id }) => {
  return (
    <SemanticHeading
      level={level}
      className={`mb-4 ${className}`}
      id={id}
    >
      {children}
    </SemanticHeading>
  );
};

/**
 * Card heading component
 */
export const CardHeading: React.FC<{
  children: React.ReactNode;
  level?: 3 | 4 | 5;
  className?: string;
}> = ({ children, level = 3, className = '' }) => {
  return (
    <SemanticHeading
      level={level}
      className={`mb-2 ${className}`}
      visualLevel={4} // Cards typically use smaller visual styling
    >
      {children}
    </SemanticHeading>
  );
};

/**
 * Hook to track heading hierarchy in a component
 */
export const useHeadingLevel = (parentLevel: number = 1): number => {
  return Math.min(parentLevel + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6;
};

/**
 * Context for managing heading levels automatically
 */
const HeadingLevelContext = React.createContext<number>(1);

export const HeadingLevelProvider: React.FC<{
  level: number;
  children: React.ReactNode;
}> = ({ level, children }) => {
  return (
    <HeadingLevelContext.Provider value={level}>
      {children}
    </HeadingLevelContext.Provider>
  );
};

/**
 * Auto-leveling heading component
 */
export const AutoHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
  visualLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}> = ({ children, className, visualLevel }) => {
  const contextLevel = React.useContext(HeadingLevelContext);
  const level = Math.min(contextLevel, 6) as 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <HeadingLevelProvider level={level + 1}>
      <SemanticHeading
        level={level}
        className={className}
        visualLevel={visualLevel}
      >
        {children}
      </SemanticHeading>
    </HeadingLevelProvider>
  );
};
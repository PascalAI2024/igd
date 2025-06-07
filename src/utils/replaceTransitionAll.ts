/**
 * Utility to help replace transition-all with specific transitions
 * 
 * This file contains mappings and helpers to convert generic transition-all
 * classes to more performant specific transitions.
 */

/**
 * Common transition replacements for different use cases
 */
export const transitionReplacements: Record<string, string> = {
  // For hover states on buttons and cards
  'hover:scale': 'transition-transform duration-200',
  'hover:shadow': 'transition-shadow duration-300',
  'hover:bg': 'transition-colors duration-300',
  'hover:text': 'transition-colors duration-200',
  'hover:border': 'transition-colors duration-300',
  'hover:opacity': 'transition-opacity duration-200',
  
  // For focus states
  'focus:border': 'transition-colors duration-200',
  'focus:ring': 'transition-shadow duration-200',
  'focus:outline': 'transition-colors duration-200',
  
  // For general animations
  'transform': 'transition-transform duration-300',
  'opacity': 'transition-opacity duration-300',
  'colors': 'transition-colors duration-300',
  'shadow': 'transition-shadow duration-300',
  
  // Composite transitions
  'scale-shadow': 'transition-[transform,box-shadow] duration-300',
  'colors-shadow': 'transition-[colors,box-shadow] duration-300',
  'transform-opacity': 'transition-[transform,opacity] duration-300',
};

/**
 * Get the appropriate transition class based on the element's other classes
 */
export function getOptimizedTransition(className: string): string {
  // Check what properties are being animated
  const hasHoverScale = /hover:scale/.test(className);
  const hasHoverShadow = /hover:shadow/.test(className);
  const hasHoverBg = /hover:bg/.test(className);
  const hasHoverText = /hover:text/.test(className);
  const hasHoverBorder = /hover:border/.test(className);
  const hasHoverOpacity = /hover:opacity/.test(className);
  const hasFocusBorder = /focus:border/.test(className);
  const hasFocusRing = /focus:ring/.test(className);
  
  // Build transition array
  const transitions: string[] = [];
  
  if (hasHoverScale) transitions.push('transform');
  if (hasHoverShadow) transitions.push('box-shadow');
  if (hasHoverBg || hasHoverText || hasHoverBorder || hasFocusBorder) transitions.push('colors');
  if (hasHoverOpacity) transitions.push('opacity');
  if (hasFocusRing && !hasHoverShadow) transitions.push('box-shadow');
  
  // Return appropriate transition class
  if (transitions.length === 0) {
    return ''; // No transition needed
  } else if (transitions.length === 1) {
    // Single property transition
    switch (transitions[0]) {
      case 'transform': return 'transition-transform duration-200';
      case 'box-shadow': return 'transition-shadow duration-300';
      case 'colors': return 'transition-colors duration-300';
      case 'opacity': return 'transition-opacity duration-200';
      default: return 'transition-colors duration-300';
    }
  } else {
    // Multiple properties - use custom property syntax
    const properties = transitions.join(',');
    return `transition-[${properties}] duration-300`;
  }
}

/**
 * Replace transition-all in a className string with optimized transitions
 */
export function replaceTransitionAll(className: string): string {
  if (!className.includes('transition-all')) {
    return className;
  }
  
  // Get the optimized transition
  const optimizedTransition = getOptimizedTransition(className);
  
  // Replace transition-all with the optimized version
  let newClassName = className.replace(/transition-all\s*(duration-\d+)?/g, optimizedTransition);
  
  // Clean up any duplicate spaces
  newClassName = newClassName.replace(/\s+/g, ' ').trim();
  
  return newClassName;
}

/**
 * Add will-change property for elements that will be animated
 */
export function addWillChange(className: string): string {
  const hasTransform = /transition-transform|hover:scale|hover:-?translate/.test(className);
  const hasOpacity = /transition-opacity|hover:opacity/.test(className);
  const hasShadow = /transition-shadow|hover:shadow/.test(className);
  
  const willChangeProps: string[] = [];
  
  if (hasTransform) willChangeProps.push('transform');
  if (hasOpacity) willChangeProps.push('opacity');
  if (hasShadow) willChangeProps.push('box-shadow');
  
  if (willChangeProps.length > 0) {
    return `${className} will-change-[${willChangeProps.join(',')}]`;
  }
  
  return className;
}

/**
 * Example usage in a component:
 * 
 * ```tsx
 * import { replaceTransitionAll, addWillChange } from '../utils/replaceTransitionAll';
 * 
 * // Before
 * <div className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
 * 
 * // After
 * <div className={addWillChange(replaceTransitionAll("transition-all duration-300 hover:scale-105 hover:shadow-lg"))}>
 * ```
 */
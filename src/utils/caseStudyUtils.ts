/**
 * Utilities for working with case studies from different data sources
 */
import { CaseStudy } from '../data/case-studies/types';
import { caseStudies as simpleCaseStudies } from '../pages/SimpleCaseStudies';
import { allCaseStudies } from '../data/case-studies/all-case-studies';
import { caseStudies as legacyCaseStudies } from '../data/case-studies';

// Combine case studies from all sources
export const getAllCaseStudies = (): CaseStudy[] => {
  // Create a map to deduplicate case studies by ID
  const caseStudyMap = new Map<string, CaseStudy>();

  // Process all source arrays
  [
    ...allCaseStudies,
    ...simpleCaseStudies,
    ...legacyCaseStudies
  ].forEach(study => {
    // Skip if no ID
    if (!study.id) return;

    // Normalize image URLs to use local paths when possible
    const normalizedStudy = normalizeImagePaths(study);

    // Add to map, overwriting duplicates (assuming later sources are more up-to-date)
    caseStudyMap.set(study.id, normalizedStudy);
  });

  // Convert map back to array
  return Array.from(caseStudyMap.values());
};

// Default fallback images for case studies
const FALLBACK_IMAGES = [
  '/images/tech/react.webp',
  '/images/tech/nodejs.webp',
  '/images/tech/mongodb.webp'
];

// Get a fallback image based on study ID for consistency
const getFallbackImage = (studyId: string): string => {
  const hash = studyId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
};

// Normalize image paths for a single case study
export const normalizeImagePaths = (study: any): CaseStudy => {
  // Create a shallow copy to avoid mutating the original
  const normalizedStudy = { ...study };

  // Normalize image paths to use local paths
  if (study.id) {
    // Set local path for imageUrl with fallback
    const expectedImagePath = `/case-studies/${study.id}.webp`;
    normalizedStudy.imageUrl = expectedImagePath;
    
    // Set local path for image property if it exists
    if ('image' in study) {
      normalizedStudy.image = expectedImagePath;
    }
    
    // Add fallback image for safety
    normalizedStudy.fallbackImage = getFallbackImage(study.id);
  }

  return normalizedStudy as CaseStudy;
};

// Get a case study by ID from any source
export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return getAllCaseStudies().find(study => study.id === id);
};

// Utility for checking if an object conforms to the CaseStudy interface
export const isValidCaseStudy = (obj: any): obj is CaseStudy => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    (typeof obj.imageUrl === 'string' || typeof obj.image === 'string')
  );
};

// Export default functions for easy importing
export default {
  getAllCaseStudies,
  normalizeImagePaths,
  getCaseStudyById,
  isValidCaseStudy
};
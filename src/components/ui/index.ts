/**
 * UI components package
 * 
 * This package provides a set of reusable UI components with consistent styling.
 */

// Core UI components
export { default as CTAButton } from './CTAButton';
export type { CTAButtonType, CTAButtonSize } from './CTAButton';
export { default as CTAButtonShowcase } from './CTAButtonShowcase';

// Advanced Interaction Components
export { default as EnhancedButton } from './EnhancedButton';
export { default as EnhancedLink } from './EnhancedLink';
export { default as EnhancedCard } from './EnhancedCard';
export { default as EnhancedBreadcrumbs } from './EnhancedBreadcrumbs';
export { default as EnhancedCTAButton } from './EnhancedCTAButton';

// Navigation & Progress Components
export { default as ScrollProgress } from './ScrollProgress';
export { default as BackToTop } from './BackToTop';
export { default as StickyCTA } from './StickyCTA';

// Layout & Content Components
export { default as SectionDivider } from './SectionDivider';
export { default as Skeleton, SkeletonList } from './Skeleton';
export { default as StaggerReveal, TextReveal, LineReveal } from './StaggerReveal';

// Feedback & Trust Components
export { useToast, ToastContainer } from './Toast';
export { default as Tooltip, TooltipIcon } from './Tooltip';
export { 
  default as SocialProofNotification,
  MetricCounter,
  ClientLogoCarousel,
  RecentActivityFeed,
  ROIIndicator
} from './SocialProof';
export { 
  default as TrustSignals, 
  SecurityBadges, 
  PartnerLogos, 
  YearsInBusinessBadge 
} from './TrustSignals';

// Table Components
export { default as ComparisonTable, BeforeAfterComparison } from './ComparisonTable';

// Widget Components
export { default as PlaceholderWidget } from './PlaceholderWidget';

// Constants
export * from './uiConstants';
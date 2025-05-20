# Add LocationDemographics3D Component

## Summary

This PR adds a new interactive 3D visualization component for displaying location demographic data. The component has been integrated into both the Location detail pages and the main Locations listing page. The visualizations help users understand location-specific market data in an engaging and interactive way.

## Changes

- Added `LocationDemographics3D` component with interactive 3D bar charts
- Integrated the component into the Location detail page in a new Demographics section
- Added a preview of the component on the Locations listing page
- Fixed TypeScript issues related to Lucide React icons
- Added documentation for location components
- Updated main README with information about 3D components

## Dependencies

This component requires the following new dependencies:
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/postprocessing`
- `three`

These libraries are already used in other parts of the application but were not fully TypeScript-compatible. I've made adjustments to ensure proper TypeScript support.

## Test Plan

1. Navigate to a location detail page (e.g., `/locations/fort-lauderdale`) and verify the Demographics section appears with the 3D visualization
2. Check that hovering over bars in the chart shows tooltips with additional information
3. Visit the Locations listing page and verify the preview section appears
4. Test responsiveness on mobile, tablet, and desktop viewports
5. Verify there are no console errors related to the 3D components

## Screenshots

[Add screenshots here when creating the PR]

## Notes for Review

- There are TypeScript errors in other 3D visualization components in the codebase that should be addressed in a future PR
- The component follows the same pattern as other 3D components in the project
- I've updated imports for `EffectComposer` and `Bloom` to use `@react-three/postprocessing` instead of `@react-three/drei`
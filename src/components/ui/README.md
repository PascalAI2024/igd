# UI Component System

This directory contains standardized UI components and constants to ensure consistent styling and behavior across the site.

## Components

### CTAButton

A standardized call-to-action button component with consistent styling, animations, and behavior.

```tsx
import { CTAButton, CTA_TEXT } from '@/components/ui';

// Primary CTA with link
<CTAButton buttonType="primary" to="/contact" showArrow>
  {CTA_TEXT.START_PROJECT}
</CTAButton>

// Secondary CTA with click handler
<CTAButton buttonType="secondary" onClick={handleClick}>
  {CTA_TEXT.LEARN_MORE}
</CTAButton>

// External link
<CTAButton external href="https://example.com">
  Visit Example
</CTAButton>

// Loading state
<CTAButton buttonType="primary" isLoading loadingText="Processing...">
  {CTA_TEXT.BOOK_CONSULTATION}
</CTAButton>
```

#### Button Types

- `primary`: Main call-to-action (red gradient)
- `secondary`: Secondary option (white border)
- `tertiary`: Text link with underline on hover
- `ghost`: Subtle background on hover

#### Button Sizes

- `small`: Compact size (px-4 py-2)
- `medium`: Standard size (px-6 py-3) - Default
- `large`: Prominent size (px-8 py-4)

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | React.ReactNode | Button text content |
| `buttonType` | 'primary' \| 'secondary' \| 'tertiary' \| 'ghost' | Visual style |
| `size` | 'small' \| 'medium' \| 'large' | Button size |
| `to` | string | Internal navigation link |
| `onClick` | function | Click handler |
| `showArrow` | boolean | Show arrow icon |
| `className` | string | Additional classes |
| `icon` | React.ReactNode | Custom icon |
| `isLoading` | boolean | Loading state |
| `disabled` | boolean | Disabled state |
| `loadingText` | string | Text during loading |
| `external` | boolean | External link flag |
| `href` | string | External URL |

## Constants

### CTA_TEXT

Standardized button text options to maintain consistent messaging.

```tsx
import { CTA_TEXT } from '@/components/ui';

<button>{CTA_TEXT.START_PROJECT}</button>
<button>{CTA_TEXT.LEARN_MORE}</button>
```

### SPACING

Consistent spacing values for layout.

```tsx
import { SPACING } from '@/components/ui';

<section className={`${SPACING.SECTION.MEDIUM} ${SPACING.CONTAINER.NARROW}`}>
  <div className={SPACING.GAP.MEDIUM}>
    {/* Content */}
  </div>
</section>
```

### CARD_STYLES

Standardized card style classes.

```tsx
import { CARD_STYLES } from '@/components/ui';

<div className={CARD_STYLES.DEFAULT}>
  {/* Card content */}
</div>
```

### ICON_SIZES

Consistent icon size classes.

```tsx
import { ICON_SIZES } from '@/components/ui';
import { Phone } from 'lucide-react';

<Phone className={ICON_SIZES.MEDIUM} />
```

### GRADIENTS

Common gradient styles.

```tsx
import { GRADIENTS } from '@/components/ui';

<div className={GRADIENTS.RED}>
  {/* Content with gradient background */}
</div>
```

## Usage Guidelines

### CTA Button Usage

1. **Primary CTAs** should be used for:
   - Main conversion actions (contact, start project)
   - Service signup/purchase
   - Primary user journey progression

2. **Secondary CTAs** should be used for:
   - Alternative options
   - Learn more actions
   - Supporting conversion paths

3. **Tertiary CTAs** should be used for:
   - Less prominent actions
   - Contextual links
   - Secondary information

4. **Ghost CTAs** should be used for:
   - Subtle actions
   - Utility functions
   - Cancel options

### Text Consistency

Always use the predefined CTA_TEXT constants to ensure messaging consistency across the site.

### Spacing Consistency

Use the SPACING constants for consistent layout throughout the application.

### Card Style Consistency

Use the CARD_STYLES constants for consistent card styling.
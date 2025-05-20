# Location Components

This directory contains components for location-specific pages.

## LocationDemographics3D

This component provides an interactive 3D visualization of location demographics data. It uses Three.js through React Three Fiber to render a 3D bar chart with demographic information.

### Features

- Interactive 3D bar chart with demographic data
- Hover interactions for detailed information
- Animated transitions and effects
- Responsive design
- Customizable data visualization

### Usage

```tsx
import LocationDemographics3D from '../components/locations/LocationDemographics3D';

// Example usage in a component
<LocationDemographics3D
  locationName="Fort Lauderdale"
  state="Florida"
  population="182437"
  medianIncome="$64,850"
  medianHomeValue="$378,000"
  medianAge="42.4"
  employmentRate="95.8%"
  educationRate="36%"
  householdSize="2.4"
  commuteTime="27 min"
  topIndustries={["Tourism", "Healthcare", "Technology", "Retail"]}
  additionalInfo={[
    { label: "Internet Adoption", value: "92%" },
    { label: "Smartphone Usage", value: "86%" },
    { label: "E-commerce Shoppers", value: "73%" }
  ]}
/>
```

### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| locationName | string | Name of the location | Required |
| state | string | State of the location | Required |
| population | string | Population of the location | Required |
| medianAge | string | Median age of residents | "38.5" |
| medianIncome | string | Median household income | "$58,250" |
| medianHomeValue | string | Median home value | "$325,000" |
| employmentRate | string | Employment rate | "95.5%" |
| topIndustries | string[] | List of top industries | ["Healthcare", "Retail", "Technology", "Education"] |
| educationRate | string | Percentage with bachelor's degree or higher | "32%" |
| householdSize | string | Average household size | "2.6" |
| commuteTime | string | Average commute time | "26 min" |
| additionalInfo | {label: string, value: string}[] | Additional demographic information | [] |

### Dependencies

This component requires the following dependencies:

- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing
- three
- framer-motion
- lucide-react

### Troubleshooting

If you encounter TypeScript errors with lucide-react icons, make sure to use `React.createElement` instead of JSX syntax when passing props to the icons:

```tsx
// Correct way
{React.createElement(Target, { size: 24, color: "#ef4444" })}

// Incorrect way (will cause TypeScript errors)
<Target className="w-6 h-6" style={{ color: item.color }} />
```
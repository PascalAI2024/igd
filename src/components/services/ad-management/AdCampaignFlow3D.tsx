import React from 'react';
import { 
  Search, Target, BarChart2,
  Settings, TrendingUp, CheckCircle
} from 'lucide-react';
import ProcessFlow3D from '../shared/ProcessFlow3D';

// Define the ad management process steps
const adManagementSteps = [
  {
    icon: Search,
    title: "Research & Strategy",
    description: "Understanding your audience and goals.",
    focus: "1-2 weeks",
    details: [
      "Market Research",
      "Competitor Analysis",
      "Target Audience Analysis",
      "Campaign Goals Definition"
    ]
  },
  {
    icon: Settings,
    title: "Campaign Setup",
    description: "Creating optimized ad campaigns.",
    focus: "1 week",
    details: [
      "Account Structure Setup",
      "Campaign Settings Configuration",
      "Ad Creation & Design",
      "Targeting Parameters Setup"
    ]
  },
  {
    icon: Target,
    title: "Targeting",
    description: "Reaching the right audience.",
    focus: "Ongoing",
    details: [
      "Audience Segmentation",
      "Keyword Selection & Research",
      "Placement Strategy Development",
      "Bid Strategy Optimization"
    ]
  },
  {
    icon: BarChart2,
    title: "Monitoring",
    description: "Tracking campaign performance.",
    focus: "Daily",
    details: [
      "Performance Metrics Tracking",
      "Budget Monitoring",
      "Conversion Analysis",
      "ROI Measurement"
    ]
  },
  {
    icon: TrendingUp,
    title: "Optimization",
    description: "Improving campaign results.",
    focus: "Weekly",
    details: [
      "A/B Testing Implementation",
      "Bid Adjustments & Refinement",
      "Ad Creative Refinement",
      "Budget Allocation Optimization"
    ]
  },
  {
    icon: CheckCircle,
    title: "Reporting",
    description: "Analyzing and presenting results.",
    focus: "Monthly",
    details: [
      "Performance Reporting",
      "ROI Analysis & Calculation",
      "Insights Generation",
      "Strategy Updates & Recommendations"
    ]
  }
];

const AdCampaignFlow3D = () => {
  return (
    <ProcessFlow3D 
      steps={adManagementSteps}
      primaryColor="#ef4444"
      secondaryColor="#f59e0b"
      title="Strategic Ad Campaign Process"
      subtitle="Our comprehensive approach ensures measurable results and maximum ROI"
    />
  );
};

export default AdCampaignFlow3D;
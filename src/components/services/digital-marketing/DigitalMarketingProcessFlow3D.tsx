import React from 'react';
import { Search, Target, BarChart, TrendingUp } from 'lucide-react';
import ProcessFlow3D from '../shared/ProcessFlow3D';

// Define the digital marketing process steps
const marketingSteps = [
  {
    icon: Search,
    title: "Research & Discovery",
    description: "In-depth analysis of your local market and target audience",
    focus: "1-2 weeks",
    details: [
      "Competitor analysis to identify opportunities",
      "Keyword research for local search terms",
      "Market trends analysis for your industry",
      "Audience insights and behavior patterns"
    ]
  },
  {
    icon: Target,
    title: "Strategy Development",
    description: "Custom strategy development focused on your service area",
    focus: "2-3 weeks",
    details: [
      "Campaign planning with measurable goals",
      "Content strategy aligned with business objectives",
      "Channel selection based on audience behavior",
      "Budget allocation for maximum ROI"
    ]
  },
  {
    icon: BarChart,
    title: "Implementation",
    description: "Execution of targeted marketing campaigns with real-time monitoring",
    focus: "2-4 weeks",
    details: [
      "Campaign launch across selected channels",
      "Performance tracking with advanced analytics",
      "A/B testing to optimize conversion rates",
      "Real-time adjustments based on performance data"
    ]
  },
  {
    icon: TrendingUp,
    title: "Optimization & Growth",
    description: "Continuous improvement based on performance data",
    focus: "Ongoing",
    details: [
      "Data analysis to identify improvement areas",
      "Strategy refinement for better performance",
      "ROI optimization to maximize results",
      "Growth scaling to expand your market reach"
    ]
  }
];

const DigitalMarketingProcessFlow3D = () => {
  return (
    <ProcessFlow3D 
      steps={marketingSteps}
      primaryColor="#ef4444"
      secondaryColor="#3b82f6"
      title="Strategic Digital Marketing Process"
      subtitle="Our comprehensive approach ensures consistent results and growth for your business"
    />
  );
};

export default DigitalMarketingProcessFlow3D;
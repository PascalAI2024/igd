import React from 'react';
import { ShoppingCart, BarChart2, Globe, Smartphone, Database } from 'lucide-react';
import IndustryPageTemplate from '../../components/IndustryPageTemplate';

const Retail = () => {
  const solutions = [
    {
      title: 'E-commerce Solutions',
      description: 'Boost conversion rates to industry-leading 2-4% with optimized platforms.',
      icon: ShoppingCart,
      features: [
        'Conversion optimization (target 2-4% rate)',
        'Real-time inventory sync across channels',
        'Cart abandonment recovery (save 15-25%)',
        'Mobile-first design (60% of traffic)'
      ]
    },
    {
      title: 'Analytics & Insights',
      description: 'Make data-driven decisions to improve margins by 12-20%.',
      icon: BarChart2,
      features: [
        'Customer lifetime value tracking',
        'Seasonal trend analysis and forecasting',
        'Inventory turnover optimization (25% improvement)',
        'Product performance heat mapping'
      ]
    },
    {
      title: 'Omnichannel Retail',
      description: 'Unified retail experience across all channels.',
      icon: Globe,
      features: [
        'Multi-channel Integration',
        'Unified Customer View',
        'Cross-channel Marketing',
        'Consistent Experience'
      ]
    },
    {
      title: 'Mobile Commerce',
      description: 'Mobile-first retail solutions for modern shoppers.',
      icon: Smartphone,
      features: [
        'Mobile Apps',
        'Progressive Web Apps',
        'Mobile Payments',
        'Push Notifications'
      ]
    }
  ];

  const stats = [
    {
      value: '2-4%',
      label: 'Conversion Rate'
    },
    {
      value: '22%',
      label: 'AOV Increase'
    },
    {
      value: '25%',
      label: 'Inventory Efficiency'
    },
    {
      value: '18%',
      label: 'Cost Reduction'
    }
  ];

  const features = [
    {
      title: 'Real-time Inventory',
      description: 'Synchronized inventory across all channels',
      icon: Database
    },
    {
      title: 'Customer Analytics',
      description: 'Deep insights into customer behavior',
      icon: BarChart2
    },
    {
      title: 'Global Reach',
      description: 'Expand your market presence worldwide',
      icon: Globe
    }
  ];

  return (
    <IndustryPageTemplate
      title="Retail Solutions"
      description="Navigate the challenges of thin margins, inventory management, and seasonal fluctuations with data-driven retail solutions."
      icon={ShoppingCart}
      solutions={solutions}
      stats={stats}
      features={features}
      ctaTitle="Ready to Improve Your Retail Metrics?"
      ctaDescription="Let's create a phased approach that delivers measurable improvements in conversion, AOV, and inventory efficiency."
    />
  );
};

export default Retail;
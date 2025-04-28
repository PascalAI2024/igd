import React from 'react';
import { ShoppingCart, BarChart2, Globe, Smartphone, Database } from 'lucide-react';
import IndustryPageTemplate from '../../components/IndustryPageTemplate';

const Retail = () => {
  const solutions = [
    {
      title: 'E-commerce Solutions',
      description: 'Scalable online retail platforms with seamless customer experiences.',
      icon: ShoppingCart,
      features: [
        'Custom Shopping Platforms',
        'Inventory Management',
        'Payment Integration',
        'Order Processing'
      ]
    },
    {
      title: 'Analytics & Insights',
      description: 'Data-driven retail analytics for better decision making.',
      icon: BarChart2,
      features: [
        'Customer Behavior Analysis',
        'Sales Analytics',
        'Inventory Optimization',
        'Performance Tracking'
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
      value: '200%',
      label: 'Sales Growth'
    },
    {
      value: '99.9%',
      label: 'Uptime'
    },
    {
      value: '<1s',
      label: 'Page Load'
    },
    {
      value: '24/7',
      label: 'Support'
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
      description="Transform your retail business with innovative digital solutions."
      icon={ShoppingCart}
      solutions={solutions}
      stats={stats}
      features={features}
      ctaTitle="Ready to Transform Your Retail Business?"
      ctaDescription="Let's discuss how our retail solutions can help you grow your business."
    />
  );
};

export default Retail;
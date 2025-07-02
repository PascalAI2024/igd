export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  industry: string;
  results?: {
    label: string;
    value: string;
  }[];
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Robert Chen',
    role: 'Owner',
    company: 'Wellness Medical Center (12 staff)',
    quote: "After struggling with outdated systems for years, Ingenious Digital helped us modernize gradually. It took about 6 months to fully implement, but now we can see 40% more patients daily. The initial learning curve was challenging, but their training and ongoing support made the transition manageable for our small team.",
    rating: 5,
    industry: 'Healthcare',
    results: [
      { label: 'Patient Capacity', value: '+40% over 6 months' },
      { label: 'Administrative Time', value: '-25% after training' },
      { label: 'Patient Satisfaction', value: '+35% (survey-based)' }
    ]
  },
  {
    id: 2,
    name: 'Maria Gonzalez',
    role: 'Director',
    company: 'Family Treasures Retail (Local boutique, 3 locations)',
    quote: "As a small retailer, we were losing ground to big box stores. Ingenious Digital started with a basic e-commerce site, then gradually added inventory management features. After 8 months, our online sales grew from almost nothing to 35% of total revenue. The journey had bumps - especially integrating with our existing POS - but their patient support got us through.",
    rating: 5,
    industry: 'Retail',
    results: [
      { label: 'Online Sales', value: '0% to 35% of revenue' },
      { label: 'Inventory Accuracy', value: '+60% improvement' },
      { label: 'Repeat Customers', value: '+45% year-over-year' }
    ]
  },
  {
    id: 3,
    name: 'David Thompson',
    role: 'Owner',
    company: 'Premier Properties (Independent brokerage, 8 agents)',
    quote: "We were drowning in paperwork and missing leads. Ingenious Digital didn't promise overnight miracles - they started by organizing our client data, then built automated follow-ups over 4 months. Now we save about 20 hours weekly on admin work. The first month was rough as we adjusted, but now I can't imagine working without these systems.",
    rating: 5,
    industry: 'Real Estate',
    results: [
      { label: 'Admin Time Saved', value: '20 hrs/week after 4 months' },
      { label: 'Lead Response Time', value: '24hrs to 2hrs average' },
      { label: 'Active Listings', value: '+55% capacity increase' }
    ]
  },
  {
    id: 4,
    name: 'Lisa Chang',
    role: 'Operations Manager',
    company: 'Urban Eats Restaurant Group (5 locations, family-owned)',
    quote: "Managing inventory across 5 locations was a nightmare. Ingenious Digital implemented their system one location at a time over 3 months. We had some resistance from staff initially, and the first few weeks were chaotic. But once everyone was trained, we started seeing real improvements. Food waste is down 30% and our online orders have grown steadily to about 40% of revenue.",
    rating: 5,
    industry: 'Food & Beverage',
    results: [
      { label: 'Food Waste', value: '-30% after full rollout' },
      { label: 'Order Accuracy', value: '92% to 98%' },
      { label: 'Online Orders', value: '40% of total revenue' }
    ]
  },
  {
    id: 5,
    name: 'Thomas Williams',
    role: 'Founder',
    company: 'Guardian Insurance Agency (Local independent, 4 employees)',
    quote: "As a small agency, we were losing clients to bigger firms with better tech. Ingenious Digital took time to understand our workflow, then built a CRM that actually fits how we work. Implementation took 5 months with plenty of tweaks along the way. We've grown our client base by 75% over 18 months - not overnight, but sustainable growth we can handle.",
    rating: 5,
    industry: 'Insurance',
    results: [
      { label: 'Client Growth', value: '+75% over 18 months' },
      { label: 'Quote Turnaround', value: '3 days to same-day' },
      { label: 'Client Retention', value: '78% to 89%' }
    ]
  }
];
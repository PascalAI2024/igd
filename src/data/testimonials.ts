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
    name: 'Robert',
    role: 'Owner',
    company: 'Wellness Medical Center',
    quote: "They modernized our entire practice management system. They understood our budget constraints and delivered a solution that increased our patient capacity by 40% while reducing administrative work. The custom scheduling system has been a game-changer for our staff.",
    rating: 5,
    industry: 'Healthcare',
    results: [
      { label: 'Patient Capacity', value: '+40%' },
      { label: 'Administrative Time', value: '-25%' },
      { label: 'Patient Satisfaction', value: '+35%' }
    ]
  },
  {
    id: 2,
    name: 'Maria',
    role: 'Director',
    company: 'Family Treasures Retail',
    quote: "Working with this team transformed our local retail business. They built us a custom inventory and POS system that helped us compete with larger chains. Our online sales increased by 150% in just three months, and the integrated marketing automation has been invaluable.",
    rating: 5,
    industry: 'Retail',
    results: [
      { label: 'Online Sales', value: '+150%' },
      { label: 'Inventory Turnover', value: '+60%' },
      { label: 'Customer Retention', value: '+45%' }
    ]
  },
  {
    id: 3,
    name: 'David',
    role: 'Owner',
    company: 'Premier Properties',
    quote: "Their team developed a property management platform that revolutionized how we operate. The automated systems they built save us 20 hours per week in administrative tasks. Their personal attention to our needs was outstanding, and the custom CRM integration has streamlined our client communications.",
    rating: 5,
    industry: 'Real Estate',
    results: [
      { label: 'Time Saved Weekly', value: '20 hrs' },
      { label: 'Lead Conversion', value: '+75%' },
      { label: 'Property Listings', value: '+120%' }
    ]
  },
  {
    id: 4,
    name: 'Lisa',
    role: 'Manager',
    company: 'Urban Eats Restaurant Group',
    quote: "The restaurant management system they developed streamlined our operations across all five locations. Their solution helped us reduce food waste by 30% and improve our delivery times significantly. The integrated online ordering system has increased our takeout revenue by 85%.",
    rating: 5,
    industry: 'Food & Beverage',
    results: [
      { label: 'Food Waste Reduction', value: '-30%' },
      { label: 'Delivery Time', value: '-40%' },
      { label: 'Takeout Revenue', value: '+85%' }
    ]
  },
  {
    id: 5,
    name: 'Thomas',
    role: 'Founder',
    company: 'Guardian Insurance Agency',
    quote: "They understood exactly what our small agency needed. Their team built a custom CRM that automated our client communications and claims processing. We've doubled our client base without adding staff, and the analytics dashboard gives us insights we never had before.",
    rating: 5,
    industry: 'Insurance',
    results: [
      { label: 'Client Base Growth', value: '+100%' },
      { label: 'Claims Processing Time', value: '-65%' },
      { label: 'Client Satisfaction', value: '+50%' }
    ]
  }
];
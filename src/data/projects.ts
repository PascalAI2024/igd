import {
  BarChart3,
  ShoppingCart,
  Stethoscope,
  Utensils,
  Plane,
  Coffee,
  Activity,
  Building2,
} from "lucide-react";

export const projects = [
  {
    id: "healthcare-platform",
    title: "Healthcare Management Platform",
    client: "Regional Medical Center",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
    description:
      "Comprehensive healthcare management system with patient records and scheduling.",
    technologies: ["React", "Node.js", "MongoDB", "HIPAA Compliant"],
    metrics: [
      "50% reduced wait times",
      "10,000+ patient records",
      "HIPAA compliant",
      "Improved patient care",
    ],
    features: [
      "Electronic Health Records",
      "Appointment Scheduling",
      "Billing Integration",
      "Patient Portal",
    ],
    icon: Stethoscope,
    industry: "Healthcare",
    testimonial: {
      quote: "This system revolutionized our patient care workflow.",
      author: "Dr. Sarah Johnson",
      role: "Medical Director",
    },
  },
  {
    id: "smart-retail",
    title: "Smart Retail Management",
    client: "Local Retail Chain",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80",
    description:
      "Integrated retail management system with inventory tracking and customer analytics.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    metrics: [
      "200% increase in online sales",
      "15,000+ monthly orders",
      "99.9% uptime",
      "Sub-second page loads",
    ],
    features: [
      "Real-time inventory sync",
      "Multi-store management",
      "Customer loyalty program",
      "Mobile POS integration",
    ],
    icon: ShoppingCart,
    industry: "Retail",
  },
  {
    id: "restaurant-management",
    title: "Restaurant Management System",
    client: "Restaurant Chain",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80",
    description:
      "All-in-one restaurant management solution with ordering and inventory.",
    technologies: ["Vue.js", "Express", "MySQL", "Socket.io"],
    metrics: [
      "30% increase in efficiency",
      "5,000+ daily orders",
      "Real-time order tracking",
      "Inventory optimization",
    ],
    features: [
      "Online Ordering",
      "Kitchen Display System",
      "Inventory Management",
      "Analytics Dashboard",
    ],
    icon: Utensils,
    industry: "Restaurant",
  },
  {
    id: "travel-booking",
    title: "Travel Booking Platform",
    client: "Travel Agency",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80",
    description:
      "Modern travel booking system with real-time availability and pricing.",
    technologies: ["React", "GraphQL", "PostgreSQL", "Redis"],
    metrics: [
      "40% booking increase",
      "1M+ monthly searches",
      "Real-time pricing",
      "Multi-provider integration",
    ],
    features: [
      "Flight Booking",
      "Hotel Reservations",
      "Package Deals",
      "User Reviews",
    ],
    icon: Plane,
    industry: "Travel",
  },
  {
    id: "coffee-chain",
    title: "Coffee Shop Chain Management",
    client: "Local Coffee Chain",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
    description:
      "Custom management system for multi-location coffee shop operations.",
    technologies: ["React Native", "Firebase", "Node.js", "Square"],
    metrics: [
      "25% revenue increase",
      "50+ locations managed",
      "Streamlined operations",
      "Enhanced customer loyalty",
    ],
    features: [
      "Order Management",
      "Inventory Tracking",
      "Staff Scheduling",
      "Loyalty Program",
    ],
    icon: Coffee,
    industry: "Food Service",
  },  
  {
    id: "smart-manufacturing",
    title: "Smart Manufacturing System",
    client: "Manufacturing Plant",
    image:
      "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?q=80&w=2070?auto=format&fit=crop&q=80",
    description: "IoT-based manufacturing monitoring and control system.",
    technologies: ["Python", "Node.js", "InfluxDB", "Docker"],
    metrics: [
      "30% productivity increase",
      "50% defect reduction",
      "Real-time monitoring",
      "Predictive maintenance",
    ],
    features: [
      "Production Monitoring",
      "Quality Control",
      "Equipment Maintenance",
      "Inventory Tracking",
    ],
    icon: Activity,
    industry: "Manufacturing",
  },
  {
    id: "property-management",
    title: "Property Management Suite",
    client: "Real Estate Group",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    description:
      "Comprehensive property management solution for residential and commercial properties.",
    technologies: ["Vue.js", "Laravel", "MySQL", "AWS"],
    metrics: [
      "80% reduction in paperwork",
      "150+ properties managed",
      "30% faster maintenance",
      "Improved tenant satisfaction",
    ],
    features: [
      "Tenant Portal",
      "Maintenance Tracking",
      "Automated Billing",
      "Document Management",
    ],
    icon: Building2,
    industry: "Real Estate",
  },
];

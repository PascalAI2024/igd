import React from 'react';
import { Code, Layout, Zap, Server, CheckCircle } from 'lucide-react';
import ProcessFlow3D from '../shared/ProcessFlow3D';

// Define the web development process steps
const webDevSteps = [
  {
    icon: Layout,
    title: "Design",
    description: "Creating the visual blueprint of your website",
    focus: "1-2 weeks",
    details: [
      "Wireframing & Prototyping",
      "UI/UX Design",
      "Design System Creation",
      "Responsive Layout Design"
    ]
  },
  {
    icon: Code,
    title: "Development",
    description: "Building the functional structure of your website",
    focus: "2-4 weeks",
    details: [
      "Frontend Development",
      "Backend Implementation",
      "Database Architecture",
      "API Integration"
    ]
  },
  {
    icon: Zap,
    title: "Optimization",
    description: "Enhancing performance and user experience",
    focus: "1-2 weeks",
    details: [
      "Performance Optimization",
      "SEO Implementation",
      "Accessibility Compliance",
      "Cross-browser Testing"
    ]
  },
  {
    icon: Server,
    title: "Deployment",
    description: "Launching your website to the world",
    focus: "1 week",
    details: [
      "Server Configuration",
      "CI/CD Pipeline Setup",
      "Domain & SSL Setup",
      "Security Hardening"
    ]
  },
  {
    icon: CheckCircle,
    title: "Launch & Support",
    description: "Your website goes live with ongoing maintenance",
    focus: "Ongoing",
    details: [
      "Launch Monitoring",
      "Performance Tracking",
      "Regular Updates",
      "Continuous Improvement"
    ]
  }
];

const WebDevelopmentProcess3D = () => {
  return (
    <ProcessFlow3D 
      steps={webDevSteps}
      primaryColor="#ef4444"
      secondaryColor="#3b82f6"
      title="Web Development Process"
      subtitle="Our comprehensive approach to building high-performance websites"
    />
  );
};

export default WebDevelopmentProcess3D;
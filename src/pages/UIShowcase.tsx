import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, Search } from 'lucide-react';
import {
  EnhancedButton,
  EnhancedLink,
  EnhancedCard,
  EnhancedBreadcrumbs,
  ScrollProgress,
  BackToTop,
  SectionDivider,
  Skeleton,
  SkeletonList,
  StaggerReveal,
  TextReveal,
  LineReveal,
  StickyCTA,
} from '../components/ui';
import EnhancedFormField from '../components/forms/EnhancedFormField';
import MetaTags from '../components/MetaTags';

/**
 * UI Components Showcase
 * Demonstrates all the new micro-interactions and advanced UI components
 */
const UIShowcase: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [showSkeletons, setShowSkeletons] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <>
      <MetaTags
        title="UI Components Showcase"
        description="Advanced UI components with sophisticated micro-interactions"
      />
      
      {/* Scroll Progress */}
      <ScrollProgress color="linear-gradient(to right, #ef4444, #f97316)" showPercentage />
      
      {/* Back to Top */}
      <BackToTop showProgress />
      
      {/* Enhanced Breadcrumbs */}
      <div className="container mx-auto px-4 pt-20">
        <EnhancedBreadcrumbs animate />
      </div>
      
      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <LineReveal>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Advanced UI Components
            </h1>
          </LineReveal>
          
          <TextReveal
            text="Experience sophisticated micro-interactions and premium animations that elevate the user experience."
            className="text-xl text-gray-400 mb-8"
          />
        </div>
      </section>
      
      <SectionDivider variant="gradient" />
      
      {/* Enhanced Buttons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <StaggerReveal>
            <h2 className="text-3xl font-bold text-white mb-8">Enhanced Buttons</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <EnhancedCard hoverEffect="lift" spotlight>
                <h3 className="text-xl font-semibold text-white mb-4">Primary Button</h3>
                <p className="text-gray-400 mb-6">With ripple effect and magnetic hover</p>
                <EnhancedButton
                  variant="primary"
                  onClick={() => console.log('Primary clicked')}
                >
                  Click Me
                </EnhancedButton>
              </EnhancedCard>
              
              <EnhancedCard hoverEffect="tilt" background="gradient">
                <h3 className="text-xl font-semibold text-white mb-4">Secondary Button</h3>
                <p className="text-gray-400 mb-6">With 3D depth and glow effect</p>
                <EnhancedButton
                  variant="secondary"
                  onClick={() => console.log('Secondary clicked')}
                  glow
                >
                  Hover Me
                </EnhancedButton>
              </EnhancedCard>
              
              <EnhancedCard hoverEffect="glow" background="mesh">
                <h3 className="text-xl font-semibold text-white mb-4">Ghost Button</h3>
                <p className="text-gray-400 mb-6">Subtle interactions with depth</p>
                <EnhancedButton
                  variant="ghost"
                  onClick={() => console.log('Ghost clicked')}
                  magnetic={false}
                >
                  Explore
                </EnhancedButton>
              </EnhancedCard>
            </div>
          </StaggerReveal>
        </div>
      </section>
      
      <SectionDivider variant="dots" theme="subtle" />
      
      {/* Enhanced Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <StaggerReveal animation="fadeLeft">
            <h2 className="text-3xl font-bold text-white mb-8">Enhanced Links</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 mb-2">Default link with gradient underline:</p>
                <EnhancedLink to="/services">
                  Explore our services
                </EnhancedLink>
              </div>
              
              <div>
                <p className="text-gray-400 mb-2">Gradient text link:</p>
                <EnhancedLink to="/about" variant="gradient">
                  Learn more about us
                </EnhancedLink>
              </div>
              
              <div>
                <p className="text-gray-400 mb-2">Glow effect link:</p>
                <EnhancedLink to="/contact" variant="glow">
                  Get in touch
                </EnhancedLink>
              </div>
              
              <div>
                <p className="text-gray-400 mb-2">External link with indicator:</p>
                <EnhancedLink href="https://example.com" external>
                  Visit external site
                </EnhancedLink>
              </div>
            </div>
          </StaggerReveal>
        </div>
      </section>
      
      <SectionDivider variant="wave" theme="accent" />
      
      {/* Enhanced Form Fields */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <StaggerReveal animation="scale">
            <h2 className="text-3xl font-bold text-white mb-8">Enhanced Form Fields</h2>
            
            <div className="max-w-2xl mx-auto">
              <EnhancedCard background="glass" padding="large">
                <form className="space-y-6">
                  <EnhancedFormField
                    type="text"
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    icon={<User className="w-5 h-5" />}
                    required
                  />
                  
                  <EnhancedFormField
                    type="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    icon={<Mail className="w-5 h-5" />}
                    required
                    error={formData.email && !formData.email.includes('@') ? 'Please enter a valid email' : ''}
                    success={formData.email.includes('@')}
                  />
                  
                  <EnhancedFormField
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    icon={<Phone className="w-5 h-5" />}
                  />
                  
                  <EnhancedFormField
                    type="textarea"
                    name="message"
                    label="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                  />
                </form>
              </EnhancedCard>
            </div>
          </StaggerReveal>
        </div>
      </section>
      
      <SectionDivider variant="fade" />
      
      {/* Loading States */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <StaggerReveal animation="blur">
            <h2 className="text-3xl font-bold text-white mb-8">Loading States</h2>
            
            <div className="mb-6">
              <EnhancedButton
                onClick={() => setShowSkeletons(!showSkeletons)}
                variant="secondary"
              >
                {showSkeletons ? 'Hide' : 'Show'} Skeletons
              </EnhancedButton>
            </div>
            
            {showSkeletons && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Text Skeleton</h3>
                  <Skeleton variant="text" lines={3} animation="wave" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Card Skeleton</h3>
                  <Skeleton variant="card" animation="pulse" />
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4">List Skeleton</h3>
                  <SkeletonList count={3} variant="card" />
                </div>
              </div>
            )}
          </StaggerReveal>
        </div>
      </section>
      
      <SectionDivider variant="geometric" />
      
      {/* Card Variants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <StaggerReveal>
            <h2 className="text-3xl font-bold text-white mb-8">Enhanced Cards</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <EnhancedCard hoverEffect="lift">
                <h3 className="text-lg font-semibold text-white mb-2">Lift Effect</h3>
                <p className="text-gray-400 text-sm">Hover to see the card lift with dynamic shadow</p>
              </EnhancedCard>
              
              <EnhancedCard hoverEffect="tilt" background="gradient">
                <h3 className="text-lg font-semibold text-white mb-2">3D Tilt</h3>
                <p className="text-gray-400 text-sm">Move your mouse to tilt the card in 3D</p>
              </EnhancedCard>
              
              <EnhancedCard hoverEffect="glow" background="solid">
                <h3 className="text-lg font-semibold text-white mb-2">Glow Effect</h3>
                <p className="text-gray-400 text-sm">Hover for a subtle glow animation</p>
              </EnhancedCard>
              
              <EnhancedCard spotlight background="mesh">
                <h3 className="text-lg font-semibold text-white mb-2">Spotlight</h3>
                <p className="text-gray-400 text-sm">Mouse tracking spotlight effect</p>
              </EnhancedCard>
            </div>
          </StaggerReveal>
        </div>
      </section>
      
      {/* Sticky CTA */}
      <StickyCTA
        text="Ready to transform your digital presence?"
        buttonText="Get Started"
        onButtonClick={() => console.log('CTA clicked')}
        showAfter={300}
      />
    </>
  );
};

export default UIShowcase;
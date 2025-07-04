import React from 'react';
import {
  EnhancedButton,
  EnhancedLink,
  EnhancedCard,
  ScrollProgress,
  BackToTop,
  EnhancedBreadcrumbs,
  SectionDivider,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonImage,
  StaggerReveal,
  FadeIn,
  SlideIn,
  ScaleIn,
  RotateIn,
  TextReveal,
  CharacterReveal,
  StickyCTA
} from '../components/ui';

export default function UIComponentsDemo() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Scroll Progress */}
      <ScrollProgress color="#f97316" showPercentage />
      
      {/* Back to Top */}
      <BackToTop />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto space-y-12">
        <FadeIn>
          <h1 className="text-5xl font-bold mb-4">
            <CharacterReveal text="UI Components Showcase" />
          </h1>
          <EnhancedBreadcrumbs />
        </FadeIn>

        <SectionDivider variant="gradient" spacing="lg" />

        {/* Enhanced Buttons */}
        <section className="space-y-8">
          <SlideIn from="left">
            <h2 className="text-3xl font-bold mb-6">Enhanced Buttons</h2>
          </SlideIn>
          
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <EnhancedButton variant="primary">
              Primary Button
            </EnhancedButton>
            <EnhancedButton variant="secondary">
              Secondary Button
            </EnhancedButton>
            <EnhancedButton variant="ghost">
              Ghost Button
            </EnhancedButton>
            <EnhancedButton variant="gradient">
              Gradient Button
            </EnhancedButton>
          </StaggerReveal>

          <div className="space-y-2">
            <p className="text-gray-400">Different sizes:</p>
            <div className="flex gap-4 items-center">
              <EnhancedButton size="sm">Small</EnhancedButton>
              <EnhancedButton size="md">Medium</EnhancedButton>
              <EnhancedButton size="lg">Large</EnhancedButton>
            </div>
          </div>
        </section>

        <SectionDivider variant="dots" />

        {/* Enhanced Links */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold mb-6">
            <TextReveal text="Enhanced Links" />
          </h2>
          
          <div className="space-y-4">
            <p>
              Check out our <EnhancedLink to="/services" variant="default">services</EnhancedLink> or 
              visit our <EnhancedLink href="https://github.com" external variant="gradient">GitHub</EnhancedLink> page.
            </p>
            <p>
              Learn more with a <EnhancedLink to="/about" variant="glow" glowColor="#8b5cf6">glowing link</EnhancedLink> or 
              explore with an <EnhancedLink to="/blog" variant="underline">underlined link</EnhancedLink>.
            </p>
          </div>
        </section>

        <SectionDivider variant="wave" />

        {/* Enhanced Cards */}
        <section className="space-y-8">
          <ScaleIn>
            <h2 className="text-3xl font-bold mb-6">Enhanced Cards</h2>
          </ScaleIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RotateIn delay={0}>
              <EnhancedCard variant="default">
                <h3 className="text-xl font-bold mb-2">Default Card</h3>
                <p className="text-gray-400">This is a default card with 3D tilt effects and dynamic shadows.</p>
              </EnhancedCard>
            </RotateIn>
            
            <RotateIn delay={0.1}>
              <EnhancedCard variant="glass" glassOpacity={0.1}>
                <h3 className="text-xl font-bold mb-2">Glass Card</h3>
                <p className="text-gray-400">A glassmorphism card with backdrop blur effects.</p>
              </EnhancedCard>
            </RotateIn>
            
            <RotateIn delay={0.2}>
              <EnhancedCard variant="gradient">
                <h3 className="text-xl font-bold mb-2">Gradient Card</h3>
                <p className="text-gray-400">Features an animated gradient border on hover.</p>
              </EnhancedCard>
            </RotateIn>
            
            <RotateIn delay={0.3}>
              <EnhancedCard variant="spotlight" spotlightColor="#ec4899">
                <h3 className="text-xl font-bold mb-2">Spotlight Card</h3>
                <p className="text-gray-400">Tracks your mouse with a spotlight effect.</p>
              </EnhancedCard>
            </RotateIn>
          </div>
        </section>

        <SectionDivider variant="glow" />

        {/* Skeleton Loaders */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold mb-6">Skeleton Loaders</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Text Skeleton</h3>
              <SkeletonText lines={4} />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Image Skeleton</h3>
              <SkeletonImage aspectRatio="16/9" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Card Skeleton</h3>
              <SkeletonCard />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Table Skeleton</h3>
              <SkeletonTable rows={3} columns={4} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Custom Skeletons</h3>
            <div className="flex gap-4 items-center">
              <Skeleton variant="circular" width={48} height={48} />
              <Skeleton variant="rectangular" width={200} height={20} />
              <Skeleton variant="rounded" width={100} height={32} animation="shimmer" />
            </div>
          </div>
        </section>

        <SectionDivider variant="gradient" spacing="xl" />

        {/* Animation Showcase */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold mb-6">Animation Components</h2>
          
          <StaggerReveal className="grid md:grid-cols-3 gap-6" staggerDelay={0.2}>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Stagger Reveal</h3>
              <p className="text-gray-400">Children animate in sequence</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">With Delay</h3>
              <p className="text-gray-400">Customizable stagger timing</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Direction Control</h3>
              <p className="text-gray-400">Animate from any direction</p>
            </div>
          </StaggerReveal>
        </section>

        {/* Extra space for scroll demonstration */}
        <div className="h-96" />
      </div>

      {/* Sticky CTA */}
      <StickyCTA
        title="Ready to enhance your UI?"
        description="Try these components in your own projects"
        buttonText="Get Started"
        onButtonClick={() => console.log('CTA clicked!')}
        variant="gradient"
        showAfter={300}
      />
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedCTAButton from '../ui/EnhancedCTAButton';
import { Check, X, Zap, Shield, Star, TrendingUp, HelpCircle } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  highlighted?: boolean;
  badge?: string;
  cta: {
    text: string;
    variant: 'default' | 'urgent' | 'value' | 'social' | 'trust' | 'limited';
  };
  socialProof?: {
    count: number;
    text: string;
  };
}

const OptimizedPricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$499' : '$399',
      priceNote: billingCycle === 'annual' ? 'Save $1,200/year' : '/month',
      description: 'Perfect for small businesses ready to grow',
      features: [
        'Professional website (up to 5 pages)',
        'Basic SEO optimization',
        'Mobile responsive design',
        'Contact form integration',
        'Monthly performance reports',
        '2 hours of updates/month'
      ],
      notIncluded: [
        'Advanced analytics',
        'A/B testing',
        'Priority support'
      ],
      cta: {
        text: 'Start Free Trial',
        variant: 'default'
      }
    },
    {
      id: 'growth',
      name: 'Growth',
      price: billingCycle === 'monthly' ? '$999' : '$799',
      priceNote: billingCycle === 'annual' ? 'Save $2,400/year' : '/month',
      description: 'Scale your business with proven strategies',
      features: [
        'Everything in Starter, plus:',
        'Advanced website (up to 15 pages)',
        'Complete SEO & content strategy',
        'Social media management (3 platforms)',
        'Email marketing automation',
        'Lead generation system',
        'Weekly performance reports',
        '5 hours of updates/month',
        'A/B testing & optimization'
      ],
      highlighted: true,
      badge: 'Most Popular',
      cta: {
        text: 'Get Started Now',
        variant: 'urgent'
      },
      socialProof: {
        count: 234,
        text: 'businesses chose this plan'
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for ambitious businesses',
      features: [
        'Everything in Growth, plus:',
        'Unlimited pages & features',
        'Dedicated account manager',
        'Custom integrations',
        'Priority 24/7 support',
        'Advanced analytics & reporting',
        'Unlimited updates & optimization',
        'Custom training for your team',
        'Quarterly strategy sessions'
      ],
      cta: {
        text: 'Schedule Consultation',
        variant: 'trust'
      }
    }
  ];

  const handlePricingClick = (tierId: string) => {
    // Track conversion event
    console.log(`Pricing CTA clicked: ${tierId}`);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose the perfect plan for your business. Upgrade or downgrade anytime.
          </p>

          {/* Billing Toggle with Savings Badge */}
          <div className="inline-flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                billingCycle === 'annual'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
            </button>
            {billingCycle === 'annual' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 px-3 py-1 bg-green-500 text-white text-sm rounded-full font-semibold"
              >
                Save 20%
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Setup within 48 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-blue-400" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-gradient-to-b from-red-500/20 to-purple-500/20 border-2 border-red-500/50 scale-105'
                  : 'bg-white/5 border border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                >
                  {tier.badge}
                </motion.div>
              )}

              {/* Tier Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  {tier.priceNote && (
                    <span className="text-sm text-gray-400">{tier.priceNote}</span>
                  )}
                </div>
                {tier.socialProof && (
                  <AnimatePresence>
                    {hoveredTier === tier.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-green-400 mt-2"
                      >
                        {tier.socialProof.count}+ {tier.socialProof.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {tier.notIncluded && tier.notIncluded.length > 0 && (
                  <ul className="space-y-3 mt-4">
                    {tier.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500 text-sm line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* CTA */}
              <EnhancedCTAButton
                variant={tier.cta.variant}
                size="large"
                to={tier.id === 'enterprise' ? '/contact' : '/signup'}
                onClick={() => handlePricingClick(tier.id)}
                className="w-full justify-center"
                urgencyText={tier.id === 'growth' ? 'Limited spots available' : undefined}
                socialProof={tier.socialProof}
                trustBadges={tier.id === 'enterprise' ? ['secure', 'guarantee'] : undefined}
                pulseAnimation={tier.highlighted}
              >
                {tier.cta.text}
              </EnhancedCTAButton>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">
            Have questions about our pricing?
          </p>
          <EnhancedCTAButton
            variant="default"
            size="medium"
            to="/pricing-faq"
            showArrow={false}
            className="bg-white/5 hover:bg-white/10"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            View Pricing FAQ
          </EnhancedCTAButton>
        </motion.div>

        {/* Bottom Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl p-8 border border-blue-500/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Not Sure? Let's Talk!
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Every business is unique. Schedule a free consultation to discuss your 
              specific needs and get a custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedCTAButton
                variant="trust"
                size="large"
                to="/consultation"
                trustBadges={['secure']}
              >
                Schedule Free Consultation
              </EnhancedCTAButton>
              <EnhancedCTAButton
                variant="default"
                size="large"
                href="tel:+19545158586"
                external={true}
                className="bg-white/10 hover:bg-white/20"
              >
                Call (954) 515-8586
              </EnhancedCTAButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OptimizedPricingSection;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Info, Zap, Shield, Award, Clock, DollarSign } from 'lucide-react';
import ComparisonTable from './ui/ComparisonTable';
import Tooltip from './ui/Tooltip';
import { SecurityBadges } from './ui/TrustSignals';

interface PricingComparisonProps {
  service: string;
  className?: string;
}

const PricingComparison: React.FC<PricingComparisonProps> = ({ service, className = '' }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const getPricingData = () => {
    switch (service) {
      case 'digital-marketing':
        return {
          title: 'Digital Marketing Packages',
          description: 'Choose the perfect marketing plan to grow your local business',
          features: [
            { name: 'Google Business Profile Setup', tooltip: 'Complete setup and optimization of your Google Business listing' },
            { name: 'Local SEO Optimization', tooltip: 'On-page and technical SEO for local search visibility' },
            { name: 'Monthly Blog Posts', tooltip: 'Professional content creation for your website' },
            { name: 'Social Media Management', tooltip: 'Active management of your social media presence' },
            { name: 'Review Management', tooltip: 'Monitor and respond to customer reviews' },
            { name: 'Competitor Analysis', tooltip: 'Regular analysis of competitor strategies' },
            { name: 'Custom Reporting Dashboard', tooltip: 'Real-time performance metrics and insights' },
            { name: 'Email Marketing', tooltip: 'Targeted email campaigns to your customer base' },
            { name: 'Paid Ad Management', tooltip: 'Google Ads and social media advertising' },
            { name: 'Dedicated Account Manager', tooltip: 'Personal point of contact for all your needs' }
          ],
          columns: [
            {
              title: 'Starter',
              subtitle: 'Essential online presence',
              price: billingCycle === 'monthly' ? '$599/mo' : '$5,990/yr',
              priceNote: billingCycle === 'yearly' ? 'Save $598' : 'No setup fee',
              features: [
                true,
                { value: true, note: 'Basic' },
                { value: '2', note: 'posts/mo' },
                { value: true, note: '3 platforms' },
                true,
                false,
                { value: true, note: 'Monthly' },
                false,
                false,
                { value: 'Email support' }
              ]
            },
            {
              title: 'Growth',
              subtitle: 'Accelerate your growth',
              price: billingCycle === 'monthly' ? '$1,299/mo' : '$12,990/yr',
              priceNote: billingCycle === 'yearly' ? 'Save $1,598' : 'Most popular',
              highlight: true,
              popular: true,
              features: [
                true,
                { value: true, note: 'Advanced' },
                { value: '4', note: 'posts/mo' },
                { value: true, note: 'All platforms' },
                true,
                { value: true, note: 'Quarterly' },
                { value: true, note: 'Weekly' },
                { value: true, note: '500 contacts' },
                { value: '$500', note: 'ad spend included' },
                { value: true, note: 'Phone & email' }
              ]
            },
            {
              title: 'Enterprise',
              subtitle: 'Maximum results',
              price: billingCycle === 'monthly' ? '$2,499/mo' : '$24,990/yr',
              priceNote: billingCycle === 'yearly' ? 'Save $4,998' : 'All inclusive',
              features: [
                { value: true, note: 'Premium' },
                { value: true, note: 'Enterprise' },
                { value: '8+', note: 'posts/mo' },
                { value: true, note: 'Unlimited' },
                { value: true, note: 'Real-time' },
                { value: true, note: 'Monthly' },
                { value: true, note: 'Real-time' },
                { value: true, note: 'Unlimited' },
                { value: '$1,500', note: 'ad spend included' },
                { value: true, note: 'Dedicated manager' }
              ]
            }
          ]
        };

      case 'web-development':
        return {
          title: 'Web Development Solutions',
          description: 'Professional websites built for local business success',
          features: [
            { name: 'Custom Design', tooltip: 'Unique design tailored to your brand identity' },
            { name: 'Mobile Responsive', tooltip: 'Perfect display on all screen sizes' },
            { name: 'Page Count', tooltip: 'Number of pages included in your website' },
            { name: 'SEO Foundation', tooltip: 'Basic search engine optimization setup' },
            { name: 'SSL Certificate', tooltip: 'Secure connection for visitor trust' },
            { name: 'Content Management System', tooltip: 'Easy-to-use interface for updates' },
            { name: 'E-commerce Features', tooltip: 'Online store and payment processing' },
            { name: 'Contact Forms', tooltip: 'Lead capture and email notifications' },
            { name: 'Performance Optimization', tooltip: 'Fast loading speeds guaranteed' },
            { name: 'Monthly Maintenance', tooltip: 'Regular updates and security patches' }
          ],
          columns: [
            {
              title: 'Basic',
              subtitle: 'Great for startups',
              price: '$1,999',
              priceNote: '+ $99/mo hosting',
              features: [
                { value: true, note: 'Template-based' },
                true,
                { value: '5-7', note: 'pages' },
                { value: true, note: 'Basic' },
                true,
                false,
                false,
                { value: '1', note: 'form' },
                { value: true, note: 'Standard' },
                { value: false }
              ]
            },
            {
              title: 'Professional',
              subtitle: 'Perfect for growth',
              price: '$4,999',
              priceNote: '+ $149/mo hosting',
              highlight: true,
              popular: true,
              features: [
                { value: true, note: 'Semi-custom' },
                true,
                { value: '10-15', note: 'pages' },
                { value: true, note: 'Advanced' },
                true,
                { value: true, note: 'WordPress' },
                { value: true, note: 'Basic store' },
                { value: '3', note: 'forms' },
                { value: true, note: 'Optimized' },
                { value: true, note: 'Quarterly' }
              ]
            },
            {
              title: 'Custom',
              subtitle: 'Tailored solution',
              price: '$9,999+',
              priceNote: 'Custom hosting',
              features: [
                { value: true, note: 'Fully custom' },
                true,
                { value: 'Unlimited' },
                { value: true, note: 'Enterprise' },
                true,
                { value: true, note: 'Custom CMS' },
                { value: true, note: 'Full store' },
                { value: 'Unlimited' },
                { value: true, note: 'Premium' },
                { value: true, note: 'Weekly' }
              ]
            }
          ]
        };

      default:
        return null;
    }
  };

  const pricingData = getPricingData();
  if (!pricingData) return null;

  return (
    <div className={className}>
      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/5 rounded-lg p-1 flex items-center">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              billingCycle === 'monthly' 
                ? 'bg-red-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${
              billingCycle === 'yearly' 
                ? 'bg-red-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              Save 10%
            </span>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <ComparisonTable
        title={pricingData.title}
        description={pricingData.description}
        features={pricingData.features}
        columns={pricingData.columns}
        variant="package"
      />

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-gray-300">30-Day Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-gray-300">Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-300">No Hidden Fees</span>
          </div>
        </div>
        
        <SecurityBadges />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 bg-white/5 rounded-xl p-8 border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Common Questions</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              What's included in the price?
            </h4>
            <p className="text-gray-400 text-sm">
              All packages include setup, training, and ongoing support. No hidden fees or surprise charges.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              How quickly can I see results?
            </h4>
            <p className="text-gray-400 text-sm">
              Most clients see initial improvements within 30-60 days, with significant results by month 3.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Can I upgrade or downgrade?
            </h4>
            <p className="text-gray-400 text-sm">
              Yes! You can change your plan at any time. Changes take effect at the next billing cycle.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              Is there a contract?
            </h4>
            <p className="text-gray-400 text-sm">
              No long-term contracts. All services are month-to-month with the flexibility to cancel anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingComparison;
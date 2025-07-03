import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Lock, Star, CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';
import Tooltip from './Tooltip';

interface TrustBadge {
  icon: React.ElementType;
  label: string;
  value?: string;
  tooltip?: string;
  color: string;
}

interface TrustSignalsProps {
  variant?: 'compact' | 'detailed' | 'inline';
  showAll?: boolean;
  className?: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: Shield,
    label: 'SSL Secured',
    tooltip: 'All data transmissions are encrypted with industry-standard SSL certificates',
    color: 'text-green-500'
  },
  {
    icon: Award,
    label: 'Certified Partner',
    tooltip: 'Official partner of Google, Meta, and other leading platforms',
    color: 'text-yellow-500'
  },
  {
    icon: Lock,
    label: 'GDPR Compliant',
    tooltip: 'We follow strict data protection regulations to keep your information safe',
    color: 'text-blue-500'
  },
  {
    icon: Star,
    label: '4.9/5 Rating',
    value: '50+ Reviews',
    tooltip: 'Based on verified client reviews across multiple platforms',
    color: 'text-purple-500'
  },
  {
    icon: CheckCircle,
    label: '100% Satisfaction',
    tooltip: 'Money-back guarantee on all services within 30 days',
    color: 'text-green-500'
  },
  {
    icon: TrendingUp,
    label: '7+ Years',
    value: 'In Business',
    tooltip: 'Established in 2017, serving local businesses across Fort Lauderdale',
    color: 'text-red-500'
  },
  {
    icon: Users,
    label: '50+ Clients',
    value: 'Served',
    tooltip: 'Trusted by businesses across various industries',
    color: 'text-indigo-500'
  },
  {
    icon: Clock,
    label: '24/7 Support',
    tooltip: 'Round-the-clock assistance for critical issues',
    color: 'text-orange-500'
  }
];

const TrustSignals: React.FC<TrustSignalsProps> = ({
  variant = 'compact',
  showAll = false,
  className = ''
}) => {
  const badges = showAll ? trustBadges : trustBadges.slice(0, 4);

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <badge.icon className={`w-5 h-5 ${badge.color}`} />
            <span className="text-sm text-gray-300">{badge.label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-red-500/30 transition-all duration-300"
          >
            <Tooltip content={badge.tooltip || ''} position="top">
              <div className="text-center cursor-help">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 mb-3`}>
                  <badge.icon className={`w-6 h-6 ${badge.color}`} />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{badge.label}</h4>
                {badge.value && (
                  <p className="text-gray-400 text-xs">{badge.value}</p>
                )}
              </div>
            </Tooltip>
          </motion.div>
        ))}
      </div>
    );
  }

  // Compact variant (default)
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Tooltip content={badge.tooltip || ''} position="top">
            <div className="flex items-center gap-2 cursor-help">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center`}>
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{badge.label}</p>
                {badge.value && (
                  <p className="text-gray-400 text-xs">{badge.value}</p>
                )}
              </div>
            </div>
          </Tooltip>
        </motion.div>
      ))}
    </div>
  );
};

// Security Badges Component
export const SecurityBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  const securityFeatures = [
    { icon: Lock, label: '256-bit SSL', color: 'text-green-500' },
    { icon: Shield, label: 'PCI Compliant', color: 'text-blue-500' },
    { icon: CheckCircle, label: 'GDPR Ready', color: 'text-purple-500' }
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {securityFeatures.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
        >
          <feature.icon className={`w-4 h-4 ${feature.color}`} />
          <span className="text-xs text-gray-300">{feature.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Partner Logos Component
export const PartnerLogos: React.FC<{ className?: string }> = ({ className = '' }) => {
  const partners = [
    { name: 'Google Partner', logo: '🔍' },
    { name: 'Meta Business', logo: '📘' },
    { name: 'AWS Partner', logo: '☁️' },
    { name: 'Shopify Partner', logo: '🛍️' }
  ];

  return (
    <div className={`${className}`}>
      <p className="text-center text-gray-400 text-sm mb-4">Trusted Partners</p>
      <div className="flex items-center justify-center gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl mb-1">{partner.logo}</div>
            <p className="text-xs text-gray-400">{partner.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Years in Business Badge
export const YearsInBusinessBadge: React.FC<{ years: number; className?: string }> = ({ years, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-full px-4 py-2 ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center">
        <span className="text-white font-bold text-lg">{years}</span>
      </div>
      <div>
        <p className="text-white font-semibold text-sm">Years of Excellence</p>
        <p className="text-gray-400 text-xs">Serving Fort Lauderdale</p>
      </div>
    </motion.div>
  );
};

export default TrustSignals;
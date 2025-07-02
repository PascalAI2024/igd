import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  Globe, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  MessageSquare,
  CheckCircle,
  DollarSign,
  Clock,
  Zap,
  Target,
  ArrowRight,
  Plus,
  Minus,
  Star
} from 'lucide-react';

interface SolutionComponent {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  basePrice: number;
  category: 'essential' | 'growth' | 'advanced';
  features: string[];
  setupTime: string;
}

interface BusinessProfile {
  businessType: string;
  size: string;
  currentWebsite: boolean;
  onlinePresence: string;
  budget: string;
  timeline: string;
}

const BusinessSolutionBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<BusinessProfile>({
    businessType: '',
    size: '',
    currentWebsite: false,
    onlinePresence: '',
    budget: '',
    timeline: ''
  });
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const solutionComponents: SolutionComponent[] = [
    {
      id: 'website',
      name: 'Professional Website',
      description: 'Mobile-responsive website with modern design',
      icon: Globe,
      basePrice: 2500,
      category: 'essential',
      features: ['Responsive design', 'SEO optimization', 'Contact forms', 'Google Analytics'],
      setupTime: '2-3 weeks'
    },
    {
      id: 'ecommerce',
      name: 'Online Store',
      description: 'E-commerce platform with payment processing',
      icon: ShoppingBag,
      basePrice: 3500,
      category: 'growth',
      features: ['Product catalog', 'Shopping cart', 'Payment gateway', 'Inventory management'],
      setupTime: '3-4 weeks'
    },
    {
      id: 'crm',
      name: 'Customer Management',
      description: 'CRM system for customer relationships',
      icon: Users,
      basePrice: 2000,
      category: 'growth',
      features: ['Contact management', 'Lead tracking', 'Email automation', 'Sales pipeline'],
      setupTime: '2 weeks'
    },
    {
      id: 'analytics',
      name: 'Business Analytics',
      description: 'Data dashboard and reporting tools',
      icon: BarChart3,
      basePrice: 1500,
      category: 'advanced',
      features: ['Custom dashboards', 'Performance metrics', 'Automated reports', 'Data insights'],
      setupTime: '1-2 weeks'
    },
    {
      id: 'marketing',
      name: 'Digital Marketing',
      description: 'SEO, social media, and online advertising',
      icon: Target,
      basePrice: 1800,
      category: 'growth',
      features: ['SEO optimization', 'Social media setup', 'Google Ads', 'Content strategy'],
      setupTime: '2-3 weeks'
    },
    {
      id: 'automation',
      name: 'Business Automation',
      description: 'Workflow automation and integrations',
      icon: Zap,
      basePrice: 2200,
      category: 'advanced',
      features: ['Process automation', 'API integrations', 'Workflow design', 'Time tracking'],
      setupTime: '2-4 weeks'
    }
  ];

  const businessTypes = [
    'Restaurant', 'Retail Store', 'Professional Services', 'Healthcare', 'Real Estate', 'Other'
  ];

  const businessSizes = [
    '1-5 employees', '6-20 employees', '21-50 employees', '50+ employees'
  ];

  const budgetRanges = [
    'Under $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '$20,000+'
  ];

  const timelines = [
    '1-2 weeks', '1 month', '2-3 months', 'Flexible'
  ];

  // Calculate total cost based on selected components
  useEffect(() => {
    const cost = selectedComponents.reduce((total, componentId) => {
      const component = solutionComponents.find(c => c.id === componentId);
      return total + (component?.basePrice || 0);
    }, 0);
    setTotalCost(cost);
  }, [selectedComponents]);

  const toggleComponent = (componentId: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const getRecommendedComponents = () => {
    const recommendations = ['website']; // Always recommend website
    
    if (profile.businessType === 'Restaurant' || profile.businessType === 'Retail Store') {
      recommendations.push('ecommerce');
    }
    
    if (profile.size !== '1-5 employees') {
      recommendations.push('crm');
    }
    
    if (profile.budget === '$10,000 - $20,000' || profile.budget === '$20,000+') {
      recommendations.push('marketing', 'analytics');
    }
    
    return recommendations;
  };

  const applyRecommendations = () => {
    setSelectedComponents(getRecommendedComponents());
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential': return 'border-green-500/40 bg-green-500/10';
      case 'growth': return 'border-blue-500/40 bg-blue-500/10';
      case 'advanced': return 'border-purple-500/40 bg-purple-500/10';
      default: return 'border-gray-500/40 bg-gray-500/10';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-white">Tell us about your business</h4>
      
      <div>
        <label className="block text-gray-400 text-sm mb-2">Business Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {businessTypes.map(type => (
            <button
              key={type}
              onClick={() => setProfile(prev => ({ ...prev, businessType: type }))}
              className={`p-3 rounded-lg border transition-colors text-sm ${
                profile.businessType === type
                  ? 'border-red-500/40 bg-red-500/10 text-white'
                  : 'border-white/10 bg-black/30 text-gray-300 hover:bg-white/5'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Business Size</label>
        <div className="grid grid-cols-2 gap-2">
          {businessSizes.map(size => (
            <button
              key={size}
              onClick={() => setProfile(prev => ({ ...prev, size }))}
              className={`p-3 rounded-lg border transition-colors text-sm ${
                profile.size === size
                  ? 'border-red-500/40 bg-red-500/10 text-white'
                  : 'border-white/10 bg-black/30 text-gray-300 hover:bg-white/5'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Budget Range</label>
        <div className="grid grid-cols-2 gap-2">
          {budgetRanges.map(budget => (
            <button
              key={budget}
              onClick={() => setProfile(prev => ({ ...prev, budget }))}
              className={`p-3 rounded-lg border transition-colors text-sm ${
                profile.budget === budget
                  ? 'border-red-500/40 bg-red-500/10 text-white'
                  : 'border-white/10 bg-black/30 text-gray-300 hover:bg-white/5'
              }`}
            >
              {budget}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold text-white">Choose your solutions</h4>
        <button
          onClick={applyRecommendations}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
        >
          Apply Recommendations
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solutionComponents.map(component => {
          const isSelected = selectedComponents.includes(component.id);
          const isRecommended = getRecommendedComponents().includes(component.id);
          
          return (
            <motion.div
              key={component.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleComponent(component.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'border-red-500/40 bg-red-500/10'
                  : getCategoryColor(component.category)
              } ${isRecommended ? 'ring-2 ring-yellow-400/30' : ''}`}
            >
              {isRecommended && (
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 text-xs">Recommended</span>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <component.icon className="w-6 h-6 text-red-400" />
                  <div>
                    <h5 className="text-white font-medium">{component.name}</h5>
                    <p className="text-gray-400 text-sm">{component.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">${component.basePrice.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">{component.setupTime}</p>
                </div>
              </div>

              <div className="space-y-1">
                {component.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-gray-300 text-xs">{feature}</span>
                  </div>
                ))}
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-white">Your Custom Solution</h4>
      
      <div className="bg-black/30 border border-white/10 rounded-lg p-6">
        <h5 className="text-white font-semibold mb-4">Selected Components</h5>
        <div className="space-y-3">
          {selectedComponents.map(componentId => {
            const component = solutionComponents.find(c => c.id === componentId);
            if (!component) return null;
            
            return (
              <div key={componentId} className="flex items-center justify-between p-3 bg-white/5 rounded">
                <div className="flex items-center gap-3">
                  <component.icon className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">{component.name}</p>
                    <p className="text-gray-400 text-sm">{component.setupTime}</p>
                  </div>
                </div>
                <p className="text-white font-bold">${component.basePrice.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
        
        <div className="border-t border-white/10 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-white">Total Investment:</span>
            <span className="text-2xl font-bold text-red-400">${totalCost.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-green-400 font-semibold">Timeline</p>
          <p className="text-gray-300 text-sm">4-8 weeks</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
          <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-blue-400 font-semibold">Dedicated Team</p>
          <p className="text-gray-300 text-sm">3-5 experts</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
          <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-purple-400 font-semibold">Support</p>
          <p className="text-gray-300 text-sm">6 months included</p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🏢 Interactive Business Solution Builder</h3>
        <p className="text-gray-400">Build your custom digital solution package - see pricing and timeline in real-time!</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map(stepNum => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= stepNum ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-400'
            }`}>
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div className={`w-16 h-1 ${step > stepNum ? 'bg-red-500' : 'bg-gray-600'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          Previous
        </button>
        
        {step < 3 ? (
          <button
            onClick={() => setStep(Math.min(3, step + 1))}
            disabled={step === 1 && !profile.businessType}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2">
            Get Quote
            <MessageSquare className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🏢 Solution Builder:</strong> This interactive tool helps you build a custom 
          solution package for your business. Pricing is based on real project costs and includes everything you need!
        </p>
      </div>
    </motion.div>
  );
};

export default BusinessSolutionBuilder;

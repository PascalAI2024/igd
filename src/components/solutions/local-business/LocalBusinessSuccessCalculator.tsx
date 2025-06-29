import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Globe, 
  Phone,
  MapPin,
  Star,
  Target,
  BarChart3,
  Zap,
  RefreshCw,
  Eye,
  MousePointer
} from 'lucide-react';

interface BusinessInputs {
  businessType: string;
  currentCustomers: number;
  avgTransactionValue: number;
  monthlyRevenue: number;
  hasWebsite: boolean;
  googleReviews: number;
  socialMediaFollowers: number;
  marketingBudget: number;
}

interface ProjectedResults {
  newCustomers: number;
  revenueIncrease: number;
  onlineVisibility: number;
  customerRetention: number;
  marketingROI: number;
  yearlyGrowth: number;
}

const LocalBusinessSuccessCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BusinessInputs>({
    businessType: 'restaurant',
    currentCustomers: 200,
    avgTransactionValue: 45,
    monthlyRevenue: 15000,
    hasWebsite: false,
    googleReviews: 25,
    socialMediaFollowers: 150,
    marketingBudget: 800
  });

  const [results, setResults] = useState<ProjectedResults>({
    newCustomers: 0,
    revenueIncrease: 0,
    onlineVisibility: 0,
    customerRetention: 0,
    marketingROI: 0,
    yearlyGrowth: 0
  });

  const businessTypes = [
    { id: 'restaurant', name: 'Restaurant', multiplier: 1.8 },
    { id: 'retail', name: 'Retail Store', multiplier: 2.2 },
    { id: 'services', name: 'Professional Services', multiplier: 2.5 },
    { id: 'healthcare', name: 'Healthcare', multiplier: 1.9 },
    { id: 'beauty', name: 'Beauty/Salon', multiplier: 2.1 },
    { id: 'fitness', name: 'Fitness/Gym', multiplier: 2.0 }
  ];

  // Calculate projections in real-time
  useEffect(() => {
    const businessType = businessTypes.find(bt => bt.id === inputs.businessType);
    const multiplier = businessType?.multiplier || 2.0;

    // Website impact calculations
    const websiteImpact = inputs.hasWebsite ? 1.2 : 2.5; // 150% more impact if no website
    
    // New customers from digital presence
    const newCustomers = Math.floor(inputs.currentCustomers * 0.3 * websiteImpact);
    
    // Revenue increase calculation
    const revenueIncrease = newCustomers * inputs.avgTransactionValue * multiplier;
    
    // Online visibility improvement
    const onlineVisibility = inputs.hasWebsite ? 65 : 85; // % improvement
    
    // Customer retention improvement
    const customerRetention = 25; // % improvement from better engagement
    
    // Marketing ROI improvement
    const marketingROI = (revenueIncrease / inputs.marketingBudget) * 100;
    
    // Yearly growth projection
    const yearlyGrowth = revenueIncrease * 12;

    setResults({
      newCustomers,
      revenueIncrease,
      onlineVisibility,
      customerRetention,
      marketingROI,
      yearlyGrowth
    });
  }, [inputs]);

  const updateInput = (field: keyof BusinessInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      businessType: 'restaurant',
      currentCustomers: 200,
      avgTransactionValue: 45,
      monthlyRevenue: 15000,
      hasWebsite: false,
      googleReviews: 25,
      socialMediaFollowers: 150,
      marketingBudget: 800
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">📈 Local Business Success Calculator</h3>
            <p className="text-gray-400">Calculate your potential growth with our digital solutions</p>
          </div>
          <button
            onClick={resetCalculator}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Current Business Metrics</h4>
          
          {/* Business Type */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Business Type</label>
            <select
              value={inputs.businessType}
              onChange={(e) => updateInput('businessType', e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {businessTypes.map(type => (
                <option key={type.id} value={type.id} className="bg-black">
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Current Customers */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Monthly Customers</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.currentCustomers}
                onChange={(e) => updateInput('currentCustomers', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="200"
              />
            </div>
          </div>

          {/* Average Transaction Value */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Average Transaction Value</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.avgTransactionValue}
                onChange={(e) => updateInput('avgTransactionValue', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="45"
              />
            </div>
          </div>

          {/* Monthly Revenue */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Monthly Revenue</label>
            <div className="relative">
              <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.monthlyRevenue}
                onChange={(e) => updateInput('monthlyRevenue', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="15000"
              />
            </div>
          </div>

          {/* Has Website */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Current Website</label>
            <div className="flex gap-4">
              <button
                onClick={() => updateInput('hasWebsite', true)}
                className={`flex-1 p-3 rounded-lg border transition-colors ${
                  inputs.hasWebsite
                    ? 'border-green-500/40 bg-green-500/10 text-green-400'
                    : 'border-white/10 bg-black/30 text-gray-300'
                }`}
              >
                Yes, I have a website
              </button>
              <button
                onClick={() => updateInput('hasWebsite', false)}
                className={`flex-1 p-3 rounded-lg border transition-colors ${
                  !inputs.hasWebsite
                    ? 'border-red-500/40 bg-red-500/10 text-red-400'
                    : 'border-white/10 bg-black/30 text-gray-300'
                }`}
              >
                No website yet
              </button>
            </div>
          </div>

          {/* Google Reviews */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Google Reviews</label>
            <div className="relative">
              <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.googleReviews}
                onChange={(e) => updateInput('googleReviews', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="25"
              />
            </div>
          </div>

          {/* Marketing Budget */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Monthly Marketing Budget</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.marketingBudget}
                onChange={(e) => updateInput('marketingBudget', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="800"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Projected Growth Results</h4>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                label: 'New Monthly Customers',
                value: `+${results.newCustomers} customers`,
                icon: Users,
                color: 'text-green-400',
                bgColor: 'bg-green-500/10',
                borderColor: 'border-green-500/20'
              },
              {
                label: 'Monthly Revenue Increase',
                value: formatCurrency(results.revenueIncrease),
                icon: TrendingUp,
                color: 'text-blue-400',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-500/20'
              },
              {
                label: 'Online Visibility Boost',
                value: `+${results.onlineVisibility}%`,
                icon: Eye,
                color: 'text-purple-400',
                bgColor: 'bg-purple-500/10',
                borderColor: 'border-purple-500/20'
              },
              {
                label: 'Customer Retention',
                value: `+${results.customerRetention}%`,
                icon: Star,
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-500/10',
                borderColor: 'border-yellow-500/20'
              },
              {
                label: 'Marketing ROI',
                value: `${results.marketingROI.toFixed(0)}%`,
                icon: Target,
                color: 'text-orange-400',
                bgColor: 'bg-orange-500/10',
                borderColor: 'border-orange-500/20'
              },
              {
                label: 'Annual Growth',
                value: formatCurrency(results.yearlyGrowth),
                icon: BarChart3,
                color: 'text-red-400',
                bgColor: 'bg-red-500/10',
                borderColor: 'border-red-500/20'
              }
            ].map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${result.bgColor} ${result.borderColor} border rounded-lg p-4`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{result.label}</p>
                    <p className={`text-xl font-bold ${result.color}`}>{result.value}</p>
                  </div>
                  <result.icon className={`w-6 h-6 ${result.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Growth Projection */}
          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="text-white font-semibold mb-3">Growth Projection Summary</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Monthly Revenue:</span>
                <span className="text-white">{formatCurrency(inputs.monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Projected Monthly Revenue:</span>
                <span className="text-green-400">{formatCurrency(inputs.monthlyRevenue + results.revenueIncrease)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Growth Percentage:</span>
                <span className="text-green-400">
                  +{((results.revenueIncrease / inputs.monthlyRevenue) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/10 pt-2">
                <span className="text-gray-400">Annual Revenue Growth:</span>
                <span className="text-green-400">{formatCurrency(results.yearlyGrowth)}</span>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-2">
            <h5 className="text-white font-semibold">What You'll Get</h5>
            {[
              'Professional website with mobile optimization',
              'Google My Business optimization',
              'Social media presence enhancement',
              'Online review management system',
              'Local SEO and search visibility',
              'Customer engagement tools'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-red-400" />
                <span className="text-gray-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">📈 Success Calculator:</strong> Adjust your business metrics to see potential 
          growth with our digital solutions. Calculations based on real client results and industry averages.
        </p>
      </div>
    </motion.div>
  );
};

export default LocalBusinessSuccessCalculator;

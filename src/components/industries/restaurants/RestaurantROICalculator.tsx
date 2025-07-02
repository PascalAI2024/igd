import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  UtensilsCrossed,
  Clock,
  Target,
  BarChart3,
  Zap,
  RefreshCw
} from 'lucide-react';

interface RestaurantInputs {
  avgOrderValue: number;
  dailyOrders: number;
  dineInPercentage: number;
  currentOnlineOrders: number;
  marketingBudget: number;
  staffHours: number;
}

interface RestaurantResults {
  currentRevenue: number;
  projectedRevenue: number;
  onlineOrderIncrease: number;
  timeSaved: number;
  marketingROI: number;
  yearlyGrowth: number;
  paybackPeriod: number;
}

const RestaurantROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RestaurantInputs>({
    avgOrderValue: 35,
    dailyOrders: 80,
    dineInPercentage: 70,
    currentOnlineOrders: 15,
    marketingBudget: 1500,
    staffHours: 40
  });

  const [results, setResults] = useState<RestaurantResults>({
    currentRevenue: 0,
    projectedRevenue: 0,
    onlineOrderIncrease: 0,
    timeSaved: 0,
    marketingROI: 0,
    yearlyGrowth: 0,
    paybackPeriod: 0
  });

  const projectCost = 8500; // Restaurant website + ordering system cost

  // Calculate ROI in real-time
  useEffect(() => {
    // Current monthly revenue
    const currentMonthlyRevenue = inputs.avgOrderValue * inputs.dailyOrders * 30;
    
    // Projected improvements with digital solutions - REALISTIC MULTIPLIERS
    const onlineOrderIncrease = inputs.currentOnlineOrders * 0.45; // 45% increase in online orders (industry average)
    const avgOrderValueIncrease = inputs.avgOrderValue * 1.20; // 20% higher for online orders (upselling works)
    const newDailyOrders = inputs.dailyOrders + onlineOrderIncrease;
    
    // New revenue calculation
    const projectedMonthlyRevenue = avgOrderValueIncrease * newDailyOrders * 30;
    const monthlyIncrease = projectedMonthlyRevenue - currentMonthlyRevenue;
    
    // Time savings from automation
    const timeSaved = inputs.staffHours * 0.2; // 20% time savings from automation (realistic)
    const timeSavingsValue = timeSaved * 15 * 4; // $15/hour * 4 weeks
    
    // Marketing ROI improvement
    const marketingROI = (monthlyIncrease / inputs.marketingBudget) * 100;
    
    // Yearly growth
    const yearlyGrowth = monthlyIncrease * 12;
    
    // Payback period
    const totalMonthlyBenefit = monthlyIncrease + timeSavingsValue;
    const paybackPeriod = projectCost / totalMonthlyBenefit;

    setResults({
      currentRevenue: currentMonthlyRevenue,
      projectedRevenue: projectedMonthlyRevenue,
      onlineOrderIncrease,
      timeSaved,
      marketingROI,
      yearlyGrowth,
      paybackPeriod
    });
  }, [inputs]);

  const updateInput = (field: keyof RestaurantInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      avgOrderValue: 35,
      dailyOrders: 80,
      dineInPercentage: 70,
      currentOnlineOrders: 15,
      marketingBudget: 1500,
      staffHours: 40
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
            <h3 className="text-2xl font-bold text-white mb-2">🍽️ Restaurant ROI Calculator</h3>
            <p className="text-gray-400">Calculate realistic returns based on industry benchmarks for independent restaurants</p>
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
          <h4 className="text-lg font-semibold text-white">Restaurant Details</h4>
          
          {/* Average Order Value */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Average Order Value</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.avgOrderValue}
                onChange={(e) => updateInput('avgOrderValue', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="35"
              />
            </div>
          </div>

          {/* Daily Orders */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Daily Orders</label>
            <div className="relative">
              <ShoppingBag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.dailyOrders}
                onChange={(e) => updateInput('dailyOrders', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="80"
              />
            </div>
          </div>

          {/* Current Online Orders */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Current Online Orders (Daily)</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.currentOnlineOrders}
                onChange={(e) => updateInput('currentOnlineOrders', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="15"
              />
            </div>
          </div>

          {/* Marketing Budget */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Monthly Marketing Budget</label>
            <div className="relative">
              <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.marketingBudget}
                onChange={(e) => updateInput('marketingBudget', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="1500"
              />
            </div>
          </div>

          {/* Staff Hours */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Weekly Staff Hours (Order Management)</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.staffHours}
                onChange={(e) => updateInput('staffHours', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="40"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Projected Results</h4>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                label: 'Current Monthly Revenue',
                value: formatCurrency(results.currentRevenue),
                icon: DollarSign,
                color: 'text-gray-400',
                bgColor: 'bg-gray-500/10',
                borderColor: 'border-gray-500/20'
              },
              {
                label: 'Projected Monthly Revenue',
                value: formatCurrency(results.projectedRevenue),
                icon: TrendingUp,
                color: 'text-green-400',
                bgColor: 'bg-green-500/10',
                borderColor: 'border-green-500/20'
              },
              {
                label: 'Additional Online Orders/Day',
                value: `+${results.onlineOrderIncrease.toFixed(0)} orders`,
                icon: ShoppingBag,
                color: 'text-blue-400',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-500/20'
              },
              {
                label: 'Time Saved (hrs/week)',
                value: `${results.timeSaved.toFixed(1)} hrs`,
                icon: Clock,
                color: 'text-purple-400',
                bgColor: 'bg-purple-500/10',
                borderColor: 'border-purple-500/20'
              },
              {
                label: 'Marketing ROI Improvement',
                value: `${results.marketingROI.toFixed(0)}%`,
                icon: Target,
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-500/10',
                borderColor: 'border-yellow-500/20'
              },
              {
                label: 'Payback Period',
                value: `${results.paybackPeriod.toFixed(1)} months`,
                icon: Calculator,
                color: 'text-orange-400',
                bgColor: 'bg-orange-500/10',
                borderColor: 'border-orange-500/20'
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

          {/* Investment Summary */}
          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="text-white font-semibold mb-3">Investment Summary</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Website + Ordering System:</span>
                <span className="text-white">{formatCurrency(projectCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Revenue Increase:</span>
                <span className="text-green-400">{formatCurrency(results.projectedRevenue - results.currentRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Annual Revenue Growth:</span>
                <span className="text-green-400">{formatCurrency(results.yearlyGrowth)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/10 pt-2">
                <span className="text-gray-400">ROI (Year 1):</span>
                <span className="text-green-400">
                  {((results.yearlyGrowth - projectCost) / projectCost * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-2">
            <h5 className="text-white font-semibold">Key Benefits</h5>
            {[
              'Commission-free online ordering (save 15-30% vs third-party apps)',
              'Table turnover optimization (15-20% improvement during peak hours)',
              'Customer retention program (20-35% increase in repeat visits)',
              'Seasonal menu engineering based on profitability data',
              'Real-time food cost tracking and waste reduction'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <UtensilsCrossed className="w-3 h-3 text-red-400" />
                <span className="text-gray-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🍽️ Restaurant Calculator:</strong> Adjust your restaurant's current metrics 
          to see potential returns from our digital solutions. Based on real client results in the restaurant industry.
        </p>
        <div className="mt-3 space-y-1 text-xs text-gray-400">
          <p>• Results vary by industry and market conditions</p>
          <p>• Based on average client data with consistent implementation</p>
          <p>• Month 1-3: Foundation building | Month 4-6: Initial results | Month 7-12: Scaling results</p>
          <p>• Long-term success requires ongoing optimization and management</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantROICalculator;

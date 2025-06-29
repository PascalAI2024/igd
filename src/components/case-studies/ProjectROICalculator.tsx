import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  BarChart3,
  Zap,
  Award,
  RefreshCw
} from 'lucide-react';

interface ROIInputs {
  projectType: string;
  currentRevenue: number;
  teamSize: number;
  timeSpent: number;
  conversionRate: number;
}

interface ROIResults {
  projectedRevenue: number;
  timeSaved: number;
  efficiencyGain: number;
  roi: number;
  paybackPeriod: number;
  yearlyBenefit: number;
}

const ProjectROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    projectType: 'web-development',
    currentRevenue: 50000,
    teamSize: 5,
    timeSpent: 20,
    conversionRate: 2.5
  });

  const [results, setResults] = useState<ROIResults>({
    projectedRevenue: 0,
    timeSaved: 0,
    efficiencyGain: 0,
    roi: 0,
    paybackPeriod: 0,
    yearlyBenefit: 0
  });

  const projectTypes = [
    { id: 'web-development', name: 'Web Development', multiplier: 2.5, cost: 15000 },
    { id: 'crm-system', name: 'CRM System', multiplier: 3.2, cost: 25000 },
    { id: 'automation', name: 'Business Automation', multiplier: 4.0, cost: 20000 },
    { id: 'ecommerce', name: 'E-commerce Platform', multiplier: 3.8, cost: 30000 },
    { id: 'mobile-app', name: 'Mobile Application', multiplier: 2.8, cost: 35000 },
    { id: 'analytics', name: 'Analytics Dashboard', multiplier: 3.5, cost: 18000 }
  ];

  const selectedProject = projectTypes.find(p => p.id === inputs.projectType);

  // Calculate ROI in real-time
  useEffect(() => {
    if (!selectedProject) return;

    const projectCost = selectedProject.cost;
    const revenueMultiplier = selectedProject.multiplier;
    
    // Calculate projected improvements
    const projectedRevenue = inputs.currentRevenue * revenueMultiplier;
    const revenueIncrease = projectedRevenue - inputs.currentRevenue;
    
    // Time savings calculation (automation and efficiency)
    const timeSaved = inputs.timeSpent * 0.6; // 60% time savings on average
    const hourlyCost = 75; // Average hourly cost
    const timeSavingsValue = timeSaved * hourlyCost * 52; // Weekly savings * 52 weeks
    
    // Efficiency gains
    const efficiencyGain = ((revenueIncrease + timeSavingsValue) / inputs.currentRevenue) * 100;
    
    // ROI calculation
    const totalBenefit = revenueIncrease + timeSavingsValue;
    const roi = ((totalBenefit - projectCost) / projectCost) * 100;
    
    // Payback period (in months)
    const monthlyBenefit = totalBenefit / 12;
    const paybackPeriod = projectCost / monthlyBenefit;
    
    setResults({
      projectedRevenue,
      timeSaved,
      efficiencyGain,
      roi,
      paybackPeriod,
      yearlyBenefit: totalBenefit
    });
  }, [inputs, selectedProject]);

  const updateInput = (field: keyof ROIInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      projectType: 'web-development',
      currentRevenue: 50000,
      teamSize: 5,
      timeSpent: 20,
      conversionRate: 2.5
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
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
            <h3 className="text-2xl font-bold text-white mb-2">🧮 Interactive ROI Calculator</h3>
            <p className="text-gray-400">Calculate potential returns on your digital transformation investment</p>
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
          <h4 className="text-lg font-semibold text-white">Project Details</h4>
          
          {/* Project Type */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Project Type</label>
            <select
              value={inputs.projectType}
              onChange={(e) => updateInput('projectType', e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {projectTypes.map(type => (
                <option key={type.id} value={type.id} className="bg-black">
                  {type.name} - {formatCurrency(type.cost)}
                </option>
              ))}
            </select>
          </div>

          {/* Current Revenue */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Current Monthly Revenue</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.currentRevenue}
                onChange={(e) => updateInput('currentRevenue', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="50000"
              />
            </div>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Team Size</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.teamSize}
                onChange={(e) => updateInput('teamSize', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="5"
              />
            </div>
          </div>

          {/* Time Spent on Manual Tasks */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Hours/Week on Manual Tasks</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={inputs.timeSpent}
                onChange={(e) => updateInput('timeSpent', parseInt(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="20"
              />
            </div>
          </div>

          {/* Current Conversion Rate */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Current Conversion Rate (%)</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                step="0.1"
                value={inputs.conversionRate}
                onChange={(e) => updateInput('conversionRate', parseFloat(e.target.value) || 0)}
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="2.5"
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
                label: 'Projected Monthly Revenue',
                value: formatCurrency(results.projectedRevenue),
                icon: DollarSign,
                color: 'text-green-400',
                bgColor: 'bg-green-500/10',
                borderColor: 'border-green-500/20'
              },
              {
                label: 'Annual ROI',
                value: formatPercentage(results.roi),
                icon: TrendingUp,
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
                label: 'Efficiency Gain',
                value: formatPercentage(results.efficiencyGain),
                icon: Zap,
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-500/10',
                borderColor: 'border-yellow-500/20'
              },
              {
                label: 'Payback Period',
                value: `${results.paybackPeriod.toFixed(1)} months`,
                icon: BarChart3,
                color: 'text-orange-400',
                bgColor: 'bg-orange-500/10',
                borderColor: 'border-orange-500/20'
              },
              {
                label: 'Annual Benefit',
                value: formatCurrency(results.yearlyBenefit),
                icon: Award,
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

          {/* Summary */}
          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-lg p-4">
            <h5 className="text-white font-semibold mb-2">Investment Summary</h5>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Project Cost:</span>
                <span className="text-white">{formatCurrency(selectedProject?.cost || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Annual Benefit:</span>
                <span className="text-green-400">{formatCurrency(results.yearlyBenefit)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-400">Net Benefit (Year 1):</span>
                <span className="text-green-400">
                  {formatCurrency(results.yearlyBenefit - (selectedProject?.cost || 0))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🧮 ROI Calculator:</strong> Adjust the inputs above to see how our solutions 
          can impact your business. These calculations are based on real client results and industry averages.
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectROICalculator;

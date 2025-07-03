import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Users, ShoppingCart, BarChart3, ArrowUp, Download } from 'lucide-react';

interface ROIInputs {
  currentRevenue: number;
  currentConversionRate: number;
  currentTraffic: number;
  averageOrderValue: number;
  marketingBudget: number;
}

interface ROIResults {
  currentMetrics: {
    monthlyRevenue: number;
    yearlyRevenue: number;
    conversions: number;
  };
  projectedMetrics: {
    monthlyRevenue: number;
    yearlyRevenue: number;
    conversions: number;
    revenueIncrease: number;
    roi: number;
    paybackPeriod: number;
  };
  improvements: {
    trafficIncrease: number;
    conversionRateIncrease: number;
    aovIncrease: number;
  };
}

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentRevenue: 10000,
    currentConversionRate: 2,
    currentTraffic: 5000,
    averageOrderValue: 50,
    marketingBudget: 2000
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'improvements'>('current');

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const calculateROI = () => {
    // Current metrics
    const currentConversions = (inputs.currentTraffic * inputs.currentConversionRate) / 100;
    const currentMonthlyRevenue = currentConversions * inputs.averageOrderValue;
    const currentYearlyRevenue = currentMonthlyRevenue * 12;

    // Projected improvements (based on industry averages)
    const trafficIncrease = 35; // 35% traffic increase
    const conversionRateIncrease = 25; // 25% conversion rate improvement
    const aovIncrease = 15; // 15% AOV increase

    // Calculate projected metrics
    const projectedTraffic = inputs.currentTraffic * (1 + trafficIncrease / 100);
    const projectedConversionRate = inputs.currentConversionRate * (1 + conversionRateIncrease / 100);
    const projectedAOV = inputs.averageOrderValue * (1 + aovIncrease / 100);
    
    const projectedConversions = (projectedTraffic * projectedConversionRate) / 100;
    const projectedMonthlyRevenue = projectedConversions * projectedAOV;
    const projectedYearlyRevenue = projectedMonthlyRevenue * 12;
    
    const revenueIncrease = projectedYearlyRevenue - currentYearlyRevenue;
    const yearlyInvestment = inputs.marketingBudget * 12;
    const roi = ((revenueIncrease - yearlyInvestment) / yearlyInvestment) * 100;
    const paybackPeriod = yearlyInvestment / (revenueIncrease / 12);

    setResults({
      currentMetrics: {
        monthlyRevenue: currentMonthlyRevenue,
        yearlyRevenue: currentYearlyRevenue,
        conversions: currentConversions
      },
      projectedMetrics: {
        monthlyRevenue: projectedMonthlyRevenue,
        yearlyRevenue: projectedYearlyRevenue,
        conversions: projectedConversions,
        revenueIncrease,
        roi,
        paybackPeriod
      },
      improvements: {
        trafficIncrease,
        conversionRateIncrease,
        aovIncrease
      }
    });
  };

  const handleInputChange = (field: keyof ROIInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const downloadReport = () => {
    if (!results) return;
    
    const report = `
ROI Analysis Report
==================

Current Performance:
- Monthly Revenue: ${formatCurrency(results.currentMetrics.monthlyRevenue)}
- Yearly Revenue: ${formatCurrency(results.currentMetrics.yearlyRevenue)}
- Monthly Conversions: ${Math.round(results.currentMetrics.conversions)}

Projected Performance:
- Monthly Revenue: ${formatCurrency(results.projectedMetrics.monthlyRevenue)}
- Yearly Revenue: ${formatCurrency(results.projectedMetrics.yearlyRevenue)}
- Monthly Conversions: ${Math.round(results.projectedMetrics.conversions)}

Expected Improvements:
- Traffic Increase: ${results.improvements.trafficIncrease}%
- Conversion Rate Increase: ${results.improvements.conversionRateIncrease}%
- Average Order Value Increase: ${results.improvements.aovIncrease}%

ROI Summary:
- Revenue Increase: ${formatCurrency(results.projectedMetrics.revenueIncrease)}
- ROI: ${results.projectedMetrics.roi.toFixed(0)}%
- Payback Period: ${results.projectedMetrics.paybackPeriod.toFixed(1)} months
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roi-analysis-report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ROI Comparison Calculator</h2>
        <p className="text-gray-600">See the potential return on your digital marketing investment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'current'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Current Metrics
            </button>
            <button
              onClick={() => setActiveTab('improvements')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'improvements'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expected Improvements
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'current' ? (
              <motion.div
                key="current"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Monthly Website Traffic
                  </label>
                  <input
                    type="number"
                    value={inputs.currentTraffic}
                    onChange={(e) => handleInputChange('currentTraffic', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    Current Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.currentConversionRate}
                    onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ShoppingCart className="inline w-4 h-4 mr-1" />
                    Average Order Value ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.averageOrderValue}
                    onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Monthly Marketing Budget ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.marketingBudget}
                    onChange={(e) => handleInputChange('marketingBudget', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="2000"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="improvements"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Improvements with Our Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Traffic Increase</span>
                      <span className="text-2xl font-bold text-blue-600">+{results?.improvements.trafficIncrease}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Conversion Rate Boost</span>
                      <span className="text-2xl font-bold text-green-600">+{results?.improvements.conversionRateIncrease}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Average Order Value</span>
                      <span className="text-2xl font-bold text-purple-600">+{results?.improvements.aovIncrease}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-sm text-gray-600">
                    These improvements are based on average results from our client portfolio. 
                    Your actual results may vary based on your industry, competition, and current optimization level.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Section */}
        {results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* ROI Summary */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Projected ROI</h3>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">{results.projectedMetrics.roi.toFixed(0)}%</p>
                <p className="text-blue-100">Return on Investment</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{formatCurrency(results.projectedMetrics.revenueIncrease)}</p>
                  <p className="text-sm text-blue-100">Annual Revenue Increase</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{results.projectedMetrics.paybackPeriod.toFixed(1)} mo</p>
                  <p className="text-sm text-blue-100">Payback Period</p>
                </div>
              </div>
            </div>

            {/* Before & After Comparison */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Before vs After</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                    <span className="text-sm font-medium text-green-600">
                      +{((results.projectedMetrics.monthlyRevenue / results.currentMetrics.monthlyRevenue - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Current</p>
                      <p className="font-bold">{formatCurrency(results.currentMetrics.monthlyRevenue)}</p>
                    </div>
                    <ArrowUp className="w-5 h-5 text-green-600" />
                    <div className="flex-1 bg-green-100 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Projected</p>
                      <p className="font-bold">{formatCurrency(results.projectedMetrics.monthlyRevenue)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Monthly Conversions</span>
                    <span className="text-sm font-medium text-green-600">
                      +{((results.projectedMetrics.conversions / results.currentMetrics.conversions - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Current</p>
                      <p className="font-bold">{Math.round(results.currentMetrics.conversions)}</p>
                    </div>
                    <ArrowUp className="w-5 h-5 text-green-600" />
                    <div className="flex-1 bg-green-100 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Projected</p>
                      <p className="font-bold">{Math.round(results.projectedMetrics.conversions)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadReport}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download ROI Report
              </motion.button>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-shadow"
              >
                Get Your Custom ROI Analysis
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;
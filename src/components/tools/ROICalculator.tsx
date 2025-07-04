import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Download, BarChart3, PieChart } from 'lucide-react';

interface ROIInputs {
  currentRevenue: number;
  currentConversionRate: number;
  currentTraffic: number;
  investmentAmount: number;
  timeframe: number; // months
  industry: string;
}

interface ROIResults {
  projectedRevenue: number;
  revenueIncrease: number;
  roi: number;
  breakEvenMonths: number;
  projectedConversionRate: number;
  projectedTraffic: number;
  monthlyData: {
    month: number;
    revenue: number;
    cumulative: number;
  }[];
  industryComparison: {
    yourROI: number;
    industryAverage: number;
    topPerformers: number;
  };
}

const industries = [
  { value: 'ecommerce', label: 'E-commerce', avgROI: 380, topROI: 650 },
  { value: 'saas', label: 'SaaS', avgROI: 450, topROI: 800 },
  { value: 'professional', label: 'Professional Services', avgROI: 320, topROI: 550 },
  { value: 'healthcare', label: 'Healthcare', avgROI: 280, topROI: 480 },
  { value: 'real-estate', label: 'Real Estate', avgROI: 420, topROI: 720 },
  { value: 'hospitality', label: 'Hospitality', avgROI: 350, topROI: 600 },
  { value: 'manufacturing', label: 'Manufacturing', avgROI: 300, topROI: 520 },
  { value: 'other', label: 'Other', avgROI: 350, topROI: 600 }
];

const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentRevenue: 50000,
    currentConversionRate: 2.5,
    currentTraffic: 10000,
    investmentAmount: 5000,
    timeframe: 12,
    industry: 'ecommerce'
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const industry = industries.find(i => i.value === inputs.industry) || industries[0];
    
    // Calculate improvements based on investment
    const conversionRateImprovement = 0.3 + (inputs.investmentAmount / 10000) * 0.2; // 30-50% improvement
    const trafficImprovement = 0.5 + (inputs.investmentAmount / 10000) * 0.3; // 50-80% improvement
    
    const newConversionRate = inputs.currentConversionRate * (1 + conversionRateImprovement);
    const newTraffic = inputs.currentTraffic * (1 + trafficImprovement);
    
    // Calculate new revenue
    const revenuePerConversion = inputs.currentRevenue / (inputs.currentTraffic * inputs.currentConversionRate / 100);
    const newMonthlyRevenue = newTraffic * (newConversionRate / 100) * revenuePerConversion;
    
    // Generate monthly projections
    const monthlyData = [];
    let cumulative = 0;
    for (let i = 1; i <= inputs.timeframe; i++) {
      // Gradual ramp-up over first 3 months
      const rampFactor = i <= 3 ? i / 3 : 1;
      const monthRevenue = (newMonthlyRevenue - inputs.currentRevenue) * rampFactor + inputs.currentRevenue;
      cumulative += monthRevenue - inputs.currentRevenue;
      monthlyData.push({
        month: i,
        revenue: monthRevenue,
        cumulative: cumulative
      });
    }
    
    const totalRevenueIncrease = cumulative;
    const roi = ((totalRevenueIncrease - inputs.investmentAmount) / inputs.investmentAmount) * 100;
    const breakEvenMonths = inputs.investmentAmount / ((newMonthlyRevenue - inputs.currentRevenue) || 1);
    
    setResults({
      projectedRevenue: newMonthlyRevenue,
      revenueIncrease: totalRevenueIncrease,
      roi: roi,
      breakEvenMonths: Math.ceil(breakEvenMonths),
      projectedConversionRate: newConversionRate,
      projectedTraffic: newTraffic,
      monthlyData: monthlyData,
      industryComparison: {
        yourROI: roi,
        industryAverage: industry.avgROI,
        topPerformers: industry.topROI
      }
    });
    
    setShowResults(true);
  };

  const downloadReport = () => {
    if (!results) return;
    
    // Create a simple text report
    const report = `
ROI ANALYSIS REPORT
==================

Current State:
- Monthly Revenue: $${inputs.currentRevenue.toLocaleString()}
- Conversion Rate: ${inputs.currentConversionRate}%
- Monthly Traffic: ${inputs.currentTraffic.toLocaleString()} visitors
- Investment: $${inputs.investmentAmount.toLocaleString()}
- Timeframe: ${inputs.timeframe} months
- Industry: ${industries.find(i => i.value === inputs.industry)?.label}

Projected Results:
- New Monthly Revenue: $${results.projectedRevenue.toFixed(0).toLocaleString()}
- New Conversion Rate: ${results.projectedConversionRate.toFixed(2)}%
- New Monthly Traffic: ${results.projectedTraffic.toFixed(0).toLocaleString()} visitors
- Total Revenue Increase: $${results.revenueIncrease.toFixed(0).toLocaleString()}
- ROI: ${results.roi.toFixed(0)}%
- Break-even: ${results.breakEvenMonths} months

Industry Comparison:
- Your ROI: ${results.roi.toFixed(0)}%
- Industry Average: ${results.industryComparison.industryAverage}%
- Top Performers: ${results.industryComparison.topPerformers}%

Monthly Projections:
${results.monthlyData.map(m => `Month ${m.month}: $${m.revenue.toFixed(0).toLocaleString()} (Cumulative: $${m.cumulative.toFixed(0).toLocaleString()})`).join('\n')}
`;

    // Create and download file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roi-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (field: keyof ROIInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ROI Comparison Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Calculate potential returns on your digital marketing investment
        </p>
      </div>

      {/* Input Form */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Monthly Revenue
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={inputs.currentRevenue}
              onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Conversion Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={inputs.currentConversionRate}
            onChange={(e) => handleInputChange('currentConversionRate', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Monthly Traffic
          </label>
          <input
            type="number"
            value={inputs.currentTraffic}
            onChange={(e) => handleInputChange('currentTraffic', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Marketing Investment
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={inputs.investmentAmount}
              onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timeframe (months)
          </label>
          <input
            type="number"
            min="1"
            max="24"
            value={inputs.timeframe}
            onChange={(e) => handleInputChange('timeframe', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry
          </label>
          <select
            value={inputs.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {industries.map(industry => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={calculateROI}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate ROI
        </button>
      </div>

      {/* Results */}
      {showResults && results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-100">ROI</span>
                <TrendingUp className="w-5 h-5 text-green-200" />
              </div>
              <p className="text-3xl font-bold">
                {results.roi.toFixed(0)}%
              </p>
              <p className="text-sm text-green-100 mt-1">
                Return on Investment
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-100">Revenue Increase</span>
                <DollarSign className="w-5 h-5 text-blue-200" />
              </div>
              <p className="text-3xl font-bold">
                ${results.revenueIncrease.toFixed(0).toLocaleString()}
              </p>
              <p className="text-sm text-blue-100 mt-1">
                Over {inputs.timeframe} months
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-100">Break-even</span>
                <BarChart3 className="w-5 h-5 text-purple-200" />
              </div>
              <p className="text-3xl font-bold">
                {results.breakEvenMonths} months
              </p>
              <p className="text-sm text-purple-100 mt-1">
                To recover investment
              </p>
            </div>
          </div>

          {/* Before/After Comparison */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Before vs After Projections
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Monthly Revenue</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${inputs.currentRevenue.toLocaleString()} → ${results.projectedRevenue.toFixed(0).toLocaleString()}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +{((results.projectedRevenue / inputs.currentRevenue - 1) * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Conversion Rate</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {inputs.currentConversionRate}% → {results.projectedConversionRate.toFixed(2)}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +{((results.projectedConversionRate / inputs.currentConversionRate - 1) * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Monthly Traffic</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {inputs.currentTraffic.toLocaleString()} → {results.projectedTraffic.toFixed(0).toLocaleString()}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +{((results.projectedTraffic / inputs.currentTraffic - 1) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          {/* Industry Comparison */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Industry Comparison
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Your ROI</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.roi.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, (results.roi / results.industryComparison.topPerformers) * 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Industry Average</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.industryComparison.industryAverage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full"
                    style={{ width: `${(results.industryComparison.industryAverage / results.industryComparison.topPerformers) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">Top Performers</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {results.industryComparison.topPerformers}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Projections Chart */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Monthly Revenue Projections
            </h3>
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {results.monthlyData.map((data, index) => {
                  const height = (data.revenue / Math.max(...results.monthlyData.map(d => d.revenue))) * 100;
                  return (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className="flex-1 bg-blue-600 rounded-t-lg relative group cursor-pointer"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${data.revenue.toFixed(0).toLocaleString()}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 dark:text-gray-300 -mb-6">
                {results.monthlyData.filter((_, i) => i % Math.ceil(results.monthlyData.length / 6) === 0).map((data) => (
                  <span key={data.month}>Month {data.month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Download Report */}
          <div className="flex justify-center">
            <button
              onClick={downloadReport}
              className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ROICalculator;
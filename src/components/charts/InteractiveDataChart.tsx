import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any; // Allow additional properties
}

interface InteractiveDataChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  height?: number;
  animationDelay?: number;
  defaultType?: ChartType;
  dataKeys?: string[];
  colors?: string[];
}

type ChartType = 'area' | 'bar' | 'line';

const InteractiveDataChart: React.FC<InteractiveDataChartProps> = ({
  title,
  description,
  data,
  height = 400,
  animationDelay = 0.3,
  defaultType = 'area',
  dataKeys = ['value'],
  colors = ['#ff4d4d', '#ff9933', '#ffff33', '#33ff33', '#33ffff', '#3333ff', '#ff33ff']
}) => {
  const [chartType, setChartType] = useState<ChartType>(defaultType);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  // Chart type options
  const chartTypes: { type: ChartType; label: string }[] = [
    { type: 'area', label: 'Area' },
    { type: 'bar', label: 'Bar' },
    { type: 'line', label: 'Line' }
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
          <p className="text-white font-bold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render the selected chart type
  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {dataKeys.map((key, i) => (
                <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: 'white' }} />
            {dataKeys.map((key, i) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[i % colors.length]}
                fillOpacity={1}
                fill={`url(#color-${key})`}
                activeDot={{ r: 8, onClick: (e, payload) => setHoveredPoint(payload as any) }}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {dataKeys.map((key, i) => (
                <linearGradient key={key} id={`color-${key}-bar`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0.3} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: 'white' }} />
            {dataKeys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                fill={`url(#color-${key}-bar)`}
                onClick={(data) => setHoveredPoint(data as any)}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: 'white' }} />
            {dataKeys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
                dot={{ r: 4, fill: colors[i % colors.length], strokeWidth: 1 }}
                activeDot={{ r: 8, onClick: (e, payload) => setHoveredPoint(payload as any) }}
              />
            ))}
          </LineChart>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {description && <p className="text-gray-400">{description}</p>}
        </div>

        <div className="flex space-x-2 mt-2 md:mt-0">
          {chartTypes.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                chartType === type
                  ? 'bg-red-500/20 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {hoveredPoint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-white/5 rounded-lg"
        >
          <h4 className="font-bold mb-2">Selected: {hoveredPoint.name}</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(hoveredPoint)
              .filter(([key]) => key !== 'name' && key !== 'payload')
              .map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-400">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveDataChart;

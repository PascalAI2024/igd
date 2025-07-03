import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Star, Zap, Shield, Award, TrendingUp, Info } from 'lucide-react';
import Tooltip from './Tooltip';

export interface ComparisonFeature {
  name: string;
  description?: string;
  tooltip?: string;
}

export interface ComparisonColumn {
  title: string;
  subtitle?: string;
  price?: string;
  priceNote?: string;
  highlight?: boolean;
  popular?: boolean;
  features: (boolean | string | { value: boolean | string; note?: string })[];
}

interface ComparisonTableProps {
  title?: string;
  description?: string;
  features: ComparisonFeature[];
  columns: ComparisonColumn[];
  className?: string;
  showPricing?: boolean;
  variant?: 'service' | 'competitor' | 'package';
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title,
  description,
  features,
  columns,
  className = '',
  showPricing = true,
  variant = 'package'
}) => {
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const getFeatureValue = (feature: boolean | string | { value: boolean | string; note?: string }) => {
    if (typeof feature === 'object' && feature !== null) {
      return feature.value;
    }
    return feature;
  };

  const getFeatureNote = (feature: boolean | string | { value: boolean | string; note?: string }) => {
    if (typeof feature === 'object' && feature !== null && 'note' in feature) {
      return feature.note;
    }
    return null;
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-gray-500" />
      );
    }
    return <span className="text-gray-300 text-sm">{value}</span>;
  };

  return (
    <div className={`${className}`}>
      {(title || description) && (
        <div className="text-center mb-8">
          {title && (
            <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-4">{title}</h3>
          )}
          {description && (
            <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-[2fr,repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
            <div className="p-4">
              <h4 className="text-lg font-semibold text-white">Features</h4>
            </div>
            {columns.map((column, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-4 rounded-xl text-center cursor-pointer
                  ${column.highlight ? 'bg-gradient-to-br from-red-500/20 to-purple-500/20 border-2 border-red-500/30' : 'bg-white/5 border border-white/10'}
                  ${selectedColumn === index ? 'ring-2 ring-red-500' : ''}
                  hover:border-red-500/30 transition-all duration-300
                `}
                onClick={() => setSelectedColumn(index === selectedColumn ? null : index)}
              >
                {column.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h5 className="text-xl font-bold text-white mb-1">{column.title}</h5>
                {column.subtitle && (
                  <p className="text-sm text-gray-400 mb-2">{column.subtitle}</p>
                )}
                
                {showPricing && column.price && (
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-gradient">{column.price}</div>
                    {column.priceNote && (
                      <p className="text-xs text-gray-400 mt-1">{column.priceNote}</p>
                    )}
                  </div>
                )}

                {variant === 'competitor' && (
                  <div className="mt-3 flex justify-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <Award className="w-4 h-4 text-yellow-500" />
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Feature Rows */}
          <div className="space-y-2">
            {features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * featureIndex }}
                className="grid grid-cols-[2fr,repeat(auto-fit,minmax(200px,1fr))] gap-4 items-center"
              >
                <div className="p-4 flex items-center gap-2">
                  <span className="text-white font-medium">{feature.name}</span>
                  {feature.tooltip && (
                    <Tooltip content={feature.tooltip} variant="help">
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </Tooltip>
                  )}
                  {feature.description && (
                    <span className="text-xs text-gray-500 ml-2">{feature.description}</span>
                  )}
                </div>
                
                {columns.map((column, columnIndex) => {
                  const featureData = column.features[featureIndex];
                  const value = getFeatureValue(featureData);
                  const note = getFeatureNote(featureData);
                  
                  return (
                    <div
                      key={columnIndex}
                      className={`
                        p-4 flex items-center justify-center
                        ${selectedColumn === columnIndex ? 'bg-white/5' : ''}
                        ${column.highlight ? 'bg-red-500/5' : ''}
                        rounded-lg transition-all duration-300
                      `}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {renderFeatureValue(value)}
                        {note && (
                          <span className="text-xs text-gray-500">{note}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>

          {/* Summary Row */}
          {variant === 'service' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="grid grid-cols-[2fr,repeat(auto-fit,minmax(200px,1fr))] gap-4">
                <div className="p-4">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Best For
                  </span>
                </div>
                {columns.map((column, index) => (
                  <div key={index} className="p-4 text-center">
                    <span className="text-sm text-gray-300">
                      {index === 0 && "Small businesses starting out"}
                      {index === 1 && "Growing businesses needing more"}
                      {index === 2 && "Established businesses scaling up"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      {variant === 'package' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 mb-4">
            Not sure which plan is right for you? Let's discuss your needs.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-purple-600 transition-all duration-300">
            Get Custom Recommendation
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Before/After Comparison Component
export const BeforeAfterComparison: React.FC<{
  title?: string;
  before: { title: string; items: string[] };
  after: { title: string; items: string[] };
  className?: string;
}> = ({ title, before, after, className = '' }) => {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl font-bold text-gradient mb-6 text-center">{title}</h3>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-red-500/10 border border-red-500/20 rounded-xl p-6"
        >
          <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <X className="w-6 h-6" />
            {before.title}
          </h4>
          <ul className="space-y-3">
            {before.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
        >
          <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <Check className="w-6 h-6" />
            {after.title}
          </h4>
          <ul className="space-y-3">
            {after.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonTable;
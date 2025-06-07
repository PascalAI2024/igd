import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Settings,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Loader,
  Box,
  Move,
  Eye,
  EyeOff
} from 'lucide-react';
import animationSystem from '../styles/animation-system';

interface ExampleItem {
  name: string;
  variants?: Variants;
  interaction?: any;
  continuous?: boolean;
  icon?: React.ReactNode;
  isContainer?: boolean;
  children?: number;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  examples: ExampleItem[];
}

/**
 * Animation Playground Component
 * 
 * Interactive showcase of all animation variants and utilities
 * from the unified animation design system.
 */
const AnimationPlayground: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('entrance');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState<string>('normal');
  const [selectedEasing, setSelectedEasing] = useState<string>('smooth');
  const [key, setKey] = useState(0);

  // Force re-render to replay animations
  const replay = () => {
    setKey(prev => prev + 1);
    setIsPlaying(true);
  };

  const categories: Record<string, Category> = {
    entrance: {
      title: 'Entrance Animations',
      icon: <ChevronRight className="w-5 h-5" />,
      examples: [
        { name: 'Fade', variants: animationSystem.variants.fade },
        { name: 'Slide Up', variants: animationSystem.variants.slide.up },
        { name: 'Slide Down', variants: animationSystem.variants.slide.down },
        { name: 'Slide Left', variants: animationSystem.variants.slide.left },
        { name: 'Slide Right', variants: animationSystem.variants.slide.right },
        { name: 'Scale', variants: animationSystem.variants.scale },
        { name: 'Blur', variants: animationSystem.variants.blur },
        { name: 'Slide + Blur', variants: animationSystem.variants.slideBlur.up },
        { name: 'Rotate', variants: animationSystem.variants.rotate },
      ],
    },
    interaction: {
      title: 'Interaction States',
      icon: <Move className="w-5 h-5" />,
      examples: [
        { 
          name: 'Hover Scale', 
          variants: animationSystem.variants.fade,
          interaction: animationSystem.states.hover.scale 
        },
        { 
          name: 'Hover Lift', 
          variants: animationSystem.variants.fade,
          interaction: animationSystem.states.hover.lift 
        },
        { 
          name: 'Hover Glow', 
          variants: animationSystem.variants.fade,
          interaction: animationSystem.states.hover.glow 
        },
        { 
          name: 'Tap Scale', 
          variants: animationSystem.variants.fade,
          interaction: animationSystem.states.tap.scale 
        },
        { 
          name: 'Tap Press', 
          variants: animationSystem.variants.fade,
          interaction: animationSystem.states.tap.press 
        },
        { 
          name: 'Focus Ring', 
          variants: animationSystem.variants.fade,
          interaction: animationSystem.states.focus.ring 
        },
      ],
    },
    loading: {
      title: 'Loading States',
      icon: <Loader className="w-5 h-5" />,
      examples: [
        { 
          name: 'Pulse', 
          variants: animationSystem.states.loading.pulse,
          continuous: true 
        },
        { 
          name: 'Spinner', 
          variants: animationSystem.states.loading.spinner,
          continuous: true 
        },
      ],
    },
    states: {
      title: 'Error & Success States',
      icon: <AlertCircle className="w-5 h-5" />,
      examples: [
        { 
          name: 'Error Shake', 
          variants: animationSystem.states.error.shake,
          icon: <X className="w-6 h-6 text-red-500" />
        },
        { 
          name: 'Success Bounce', 
          variants: animationSystem.states.success.bounce,
          icon: <Check className="w-6 h-6 text-green-500" />
        },
      ],
    },
    stagger: {
      title: 'Staggered Animations',
      icon: <Box className="w-5 h-5" />,
      examples: [
        { 
          name: 'Stagger Container', 
          isContainer: true,
          children: 4
        },
      ],
    },
  };

  const durations = Object.entries(animationSystem.duration).map(([key, value]) => ({
    key,
    value,
    label: `${key} (${value}s)`,
  }));

  const easings = [
    { key: 'spring', label: 'Spring', value: animationSystem.easing.spring.default },
    { key: 'smooth', label: 'Smooth', value: animationSystem.transitions.smooth },
    { key: 'fast', label: 'Fast', value: animationSystem.transitions.fast },
    { key: 'elegant', label: 'Elegant', value: animationSystem.transitions.elegant },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-600 text-transparent bg-clip-text">
            Animation Design System
          </h1>
          <p className="text-gray-400 text-lg">
            Interactive playground for exploring and testing animation variants
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={replay}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Replay
          </button>
          
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            {showGrid ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showGrid ? 'Hide Grid' : 'Show Grid'}
          </button>

          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-400" />
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-3 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-red-500 transition-colors"
            >
              {durations.map(duration => (
                <option key={duration.key} value={duration.key}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gray-400" />
            <select
              value={selectedEasing}
              onChange={(e) => setSelectedEasing(e.target.value)}
              className="px-3 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-red-500 transition-colors"
            >
              {easings.map(easing => (
                <option key={easing.key} value={easing.key}>
                  {easing.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${selectedCategory === key 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }
              `}
            >
              {category.icon}
              {category.title}
            </button>
          ))}
        </div>

        {/* Animation Examples */}
        <div className={`grid gap-6 ${showGrid ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}`}>
          {categories[selectedCategory].examples.map((example: ExampleItem, index: number) => (
            <div key={`${selectedCategory}-${index}-${key}`} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-200">{example.name}</h3>
              
              {example.isContainer ? (
                // Staggered container example
                <motion.div
                  variants={animationSystem.variants.container}
                  initial="hidden"
                  animate={isPlaying ? "visible" : "hidden"}
                  className="space-y-2"
                >
                  {Array.from({ length: example.children || 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      variants={animationSystem.variants.slide.up}
                      className="p-4 bg-white/10 rounded-lg border border-white/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                          <span className="text-red-500 font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">Staggered Item</div>
                          <div className="text-sm text-gray-400">Delay: {i * 0.1}s</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // Regular animation example
                <AnimatePresence mode="wait">
                  {isPlaying && (
                    <motion.div
                      variants={example.variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      {...(example.interaction || {})}
                      className={`
                        p-8 bg-gradient-to-br from-white/10 to-white/5 
                        rounded-xl border border-white/20 backdrop-blur-sm
                        ${example.interaction ? 'cursor-pointer' : ''}
                        ${example.continuous ? '' : ''}
                      `}
                      style={{
                        minHeight: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {example.icon || (
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2 text-red-500">
                            {example.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {example.interaction ? 'Interactive - Try hovering!' : 'Animation Demo'}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Code snippet */}
              <div className="p-4 bg-black/50 rounded-lg border border-white/10 font-mono text-xs">
                <div className="text-gray-400 mb-1">// Usage example</div>
                <div className="text-blue-400">
                  {example.isContainer ? (
                    <div>
                      variants={'{animationSystem.variants.container}'}
                    </div>
                  ) : (
                    <div>
                      variants={`{animationSystem.variants.${example.name.toLowerCase().replace(/\s+/g, '')}}`}
                      {example.interaction && (
                        <div className="text-green-400 mt-1">
                          {`...animationSystem.states.${example.interaction === animationSystem.states.hover.scale ? 'hover.scale' : 'interaction'}`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Guidelines */}
        <div className="mt-16 p-8 bg-white/5 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Performance Guidelines</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-500">FPS Targets</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Desktop: {animationSystem.performance.targetFPS.desktop} FPS</li>
                <li>• Mobile: {animationSystem.performance.targetFPS.mobile} FPS</li>
                <li>• Low Power: {animationSystem.performance.targetFPS.lowPower} FPS</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-500">Best Practices</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Use GPU acceleration</li>
                <li>• Throttle scroll events</li>
                <li>• Pause off-screen animations</li>
                <li>• Respect reduced motion</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-500">Optimization</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Max {animationSystem.performance.maxConcurrent} concurrent animations</li>
                <li>• Use transform over position</li>
                <li>• Batch DOM updates</li>
                <li>• Prefer opacity/transform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationPlayground;
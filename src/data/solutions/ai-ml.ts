import { Brain, Network, Cpu, Database, LineChart, Bot, Zap, Code2, Search, Layers } from 'lucide-react';
import type { Solution } from './types';

export const solutions: Solution[] = [
  {
    id: 'predictive-analytics',
    title: 'Advanced Predictive Analytics',
    description: 'Transform raw data into actionable insights with state-of-the-art predictive models.',
    icon: LineChart,
    features: [
      'Deep Learning Models',
      'Time Series Forecasting',
      'Anomaly Detection',
      'Pattern Recognition'
    ],
    benefits: [
      {
        title: 'Enhanced Decision Making',
        description: 'Make data-driven decisions with AI-powered insights'
      },
      {
        title: 'Operational Efficiency',
        description: 'Automate complex tasks and optimize processes'
      }
    ],
    technologies: [
      'TensorFlow',
      'PyTorch',
      'scikit-learn',
      'Apache Spark'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Data Assessment',
        description: 'Evaluate data quality and requirements'
      },
      {
        step: '02',
        title: 'Model Development',
        description: 'Design and train custom AI models'
      }
    ],
    metrics: {
      accuracy: '99%',
      performance: '10x',
      efficiency: '60%'
    },
    path: '/services/ai-ml/predictive-analytics'
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Unlock insights from text data with cutting-edge NLP solutions.',
    icon: Bot,
    features: [
      'Advanced Text Analytics',
      'Multilingual Processing',
      'Sentiment Analysis',
      'Named Entity Recognition'
    ],
    benefits: [
      {
        title: 'Text Understanding',
        description: 'Extract meaning from unstructured text data'
      },
      {
        title: 'Automated Processing',
        description: 'Handle large volumes of text efficiently'
      }
    ],
    technologies: [
      'BERT',
      'GPT',
      'spaCy',
      'Transformers'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Text Analysis',
        description: 'Analyze text requirements'
      },
      {
        step: '02',
        title: 'Model Selection',
        description: 'Choose appropriate NLP models'
      }
    ],
    metrics: {
      accuracy: '95%',
      languages: '50+',
      processing: '1M+ docs/day'
    },
    path: '/services/ai-ml/nlp'
  }
  // Add more AI/ML solutions...
];
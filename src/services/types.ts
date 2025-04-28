// Common types for services
export interface Metric {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: any;
}

export interface ServiceBase {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  metrics: Metric[];
  path: string;
  color: string;
}

export interface ServiceDetails extends ServiceBase {
  benefits: {
    title: string;
    description: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  technologies?: string[];
  showcaseMetrics?: Metric[];
  additionalFeatures?: Feature[];
}
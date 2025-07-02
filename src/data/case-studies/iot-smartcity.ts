import { CaseStudy } from './types';
import { Network } from 'lucide-react';

export const iotSmartCity: CaseStudy = {
  id: 'iot-smart-city',
  title: 'IoT Smart City Infrastructure',
  client: 'Metropolitan Development Authority',
  industry: 'Government',
  challenge: 'The client needed a comprehensive IoT infrastructure to transform their urban area into a smart city, with real-time monitoring of utilities, traffic, public safety, and environmental conditions.',
  solution: 'We developed an integrated IoT platform connecting thousands of sensors across the city, with real-time data processing, predictive analytics, and a central command dashboard for city administrators.',
  results: [
    '18% reduction in traffic congestion during peak hours',
    '12% decrease in energy consumption after optimization',
    '22% improvement in emergency response times',
    'Near real-time monitoring with 15-minute data updates',
    'Predictive maintenance saving $850K annually after first year'
  ],
  icon: Network,
  testimonial: {
    quote: "Rolling out IoT infrastructure city-wide presented significant challenges - from connectivity issues to data integration complexity. It took 18 months to achieve stable operations, but we're now seeing measurable improvements in city services and resource management.",
    author: "James Wilson",
    role: "Chief Innovation Officer, Metropolitan Development Authority"
  },
  technologies: [
    'Python',
    'React',
    'Node.js',
    'MQTT',
    'LoRaWAN',
    'AWS IoT',
    'TensorFlow',
    'Time Series DB',
    'Kafka',
    'Docker',
    'Kubernetes',
    'Computer Vision'
  ],
  imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
  description: "How we developed an integrated IoT platform connecting thousands of sensors across a city for real-time monitoring and management of urban infrastructure.",
  subtitle: 'IoT Smart City Infrastructure Development'
};

export default iotSmartCity;

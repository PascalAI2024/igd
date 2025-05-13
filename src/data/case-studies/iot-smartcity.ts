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
    '35% reduction in traffic congestion',
    '28% decrease in energy consumption',
    '40% improvement in emergency response times',
    'Real-time monitoring of air quality and noise pollution',
    'Predictive maintenance saving $2.5M annually in infrastructure costs'
  ],
  icon: Network,
  testimonial: {
    quote: "The smart city platform has transformed how we manage urban infrastructure. From traffic flow to energy usage, we now have real-time insights that allow us to make data-driven decisions that improve quality of life for our citizens while reducing operational costs.",
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

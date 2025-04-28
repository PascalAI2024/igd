import { solutions as aiSolutions } from './ai-ml';
import { solutions as cloudSolutions } from './cloud';
import { solutions as cyberSolutions } from './cybersecurity';
import { solutions as customSolutions } from './custom-software';
import { solutions as mobileSolutions } from './mobile';

export const allSolutions = [
  ...aiSolutions,
  ...cloudSolutions,
  ...cyberSolutions,
  ...customSolutions,
  ...mobileSolutions
];

export const categories = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    solutions: customSolutions
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    solutions: aiSolutions
  },
  {
    id: 'cloud',
    title: 'Cloud Services',
    solutions: cloudSolutions
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    solutions: cyberSolutions
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    solutions: mobileSolutions
  }
];

export { aiSolutions, cloudSolutions, cyberSolutions, customSolutions, mobileSolutions };
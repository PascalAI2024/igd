import React from 'react';
import SolutionTemplate from './SolutionTemplate';
import { getSolutionBySlug } from '../../data/solutions/solutions';

const DigitalGrowth: React.FC = () => {
  const solution = getSolutionBySlug('digital-growth');
  
  if (!solution) {
    return <div>Solution not found</div>;
  }
  
  return <SolutionTemplate solution={solution} />;
};

export default DigitalGrowth;
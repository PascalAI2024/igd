import React from 'react';
import SolutionTemplate from './SolutionTemplate';
import { getSolutionBySlug } from '../../data/solutions/solutions';

const Automation: React.FC = () => {
  const solution = getSolutionBySlug('automation');
  
  if (!solution) {
    return <div>Solution not found</div>;
  }
  
  return <SolutionTemplate solution={solution} />;
};

export default Automation;
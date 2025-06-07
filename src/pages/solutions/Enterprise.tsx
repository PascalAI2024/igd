import React from 'react';
import SolutionTemplate from './SolutionTemplate';
import { getSolutionBySlug } from '../../data/solutions/solutions';

const Enterprise: React.FC = () => {
  const solution = getSolutionBySlug('enterprise');
  
  if (!solution) {
    return <div>Solution not found</div>;
  }
  
  return <SolutionTemplate solution={solution} />;
};

export default Enterprise;
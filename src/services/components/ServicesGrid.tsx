import React from 'react';
import { ServiceCard } from './ServiceCard';
import { ServiceBase } from '../types';

interface ServicesGridProps {
  services: ServiceBase[];
  activeService: number | null;
  onHover: (index: number | null) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  activeService,
  onHover
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          isActive={activeService === index}
          onHover={onHover}
        />
      ))}
    </div>
  );
};
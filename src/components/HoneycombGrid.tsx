import React from 'react';
import TechBadge from './TechBadge';

interface Technology {
  name: string;
  icon: React.ReactNode;
}

interface HoneycombGridProps {
  technologies: Technology[];
  itemsPerRow?: number;
}

export const HoneycombGrid: React.FC<HoneycombGridProps> = ({ 
  technologies
}) => {
  return (
    <div className="honeycomb-grid">
      {technologies.map((tech, index) => (
        <div key={index} className="honeycomb-item">
          <TechBadge
            icon={tech.icon}
            name={tech.name}
          />
        </div>
      ))}
    </div>
  );
};

export default HoneycombGrid;

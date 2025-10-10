import React from 'react';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import TechBadge from './TechBadge';

interface Technology {
  name: string;
  icon: React.ReactNode;
  q: number;
  r: number;
  s: number;
}

interface ReactHexGridProps {
  technologies: Technology[];
}

// Custom hexagon component that renders our TechBadge
const CustomHexagon: React.FC<{ tech: Technology }> = ({ tech }) => {
  return (
    <Hexagon q={tech.q} r={tech.r} s={tech.s}>
      <foreignObject x="-50" y="-55" width="100" height="110">
        <div className="flex items-center justify-center w-full h-full">
          <TechBadge icon={tech.icon} name={tech.name} />
        </div>
      </foreignObject>
    </Hexagon>
  );
};

export const ReactHexGrid: React.FC<ReactHexGridProps> = ({ technologies }) => {
  return (
    <div className="w-full flex justify-center">
      <HexGrid 
        width={1200} 
        height={900} 
        viewBox="-200 -200 400 400"
        className="honeycomb-svg"
      >
        <Layout 
          size={{ x: 43, y: 43 }} 
          flat={false} 
          spacing={1.2} 
          origin={{ x: 0, y: 0 }}
        >
          {technologies.map((tech, index) => (
            <CustomHexagon key={index} tech={tech} />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export default ReactHexGrid;

import React, { useState, useEffect } from 'react';
import { HexGrid, Layout, Hexagon } from 'react-hexgrid';
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
      <foreignObject x="-43" y="-43.5" width="86" height="87">
        <div className="flex items-center justify-center w-full h-full">
          <TechBadge icon={tech.icon} name={tech.name} />
        </div>
      </foreignObject>
    </Hexagon>
  );
};

export const ReactHexGrid: React.FC<ReactHexGridProps> = ({ technologies }) => {
  const [screenSize, setScreenSize] = useState('desktop');
  const [hexSize, setHexSize] = useState({ x: 50, y: 50 });
  const [spacing, setSpacing] = useState(1.0);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        setScreenSize('mobile');
        setHexSize({ x: 35, y: 35 });
        setSpacing(0.8);
      } else if (width < 768) {
        setScreenSize('tablet-small');
        setHexSize({ x: 40, y: 40 });
        setSpacing(0.9);
      } else if (width < 1200) {
        setScreenSize('tablet');
        setHexSize({ x: 45, y: 45 });
        setSpacing(1.0);
      } else {
        setScreenSize('desktop');
        setHexSize({ x: 50, y: 50 });
        setSpacing(1.0);
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Filter technologies based on screen size
  const getFilteredTechnologies = () => {
    switch (screenSize) {
      case 'mobile':
        return technologies.slice(0, 12); // Show only first 12 on mobile
      case 'tablet-small':
        return technologies.slice(0, 16); // Show first 16 on small tablets
      case 'tablet':
        return technologies.slice(0, 20); // Show first 20 on tablets
      default:
        return technologies; // Show all on desktop
    }
  };

  return (
      <HexGrid 
        width="100%" 
        height="auto" 
        viewBox="-500 -500 1000 1000"
        className={`honeycomb-svg w-full responsive-hexgrid ${screenSize}`}
      >
        <Layout 
          size={hexSize} 
          flat={false} 
          spacing={spacing} 
          origin={{ x: 0, y: 0 }}
        >
          {getFilteredTechnologies().map((tech, index) => (
            <CustomHexagon key={index} tech={tech} />
          ))}
        </Layout>
    </HexGrid>
  );
};

export default ReactHexGrid;

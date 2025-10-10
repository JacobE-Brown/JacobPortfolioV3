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
const CustomHexagon: React.FC<{ tech: Technology; zoomLevel?: number }> = ({ tech, zoomLevel = 1 }) => {
  return (
    <Hexagon q={tech.q} r={tech.r} s={tech.s}>
      <foreignObject 
        x="-43" 
        y="-43.5" 
        width="86" 
        height="87"
        className="hexagon-foreign-object overflow-hidden"
        style={{ 
          '--zoom-level': zoomLevel
        } as React.CSSProperties}
      >
        <div className="flex items-center justify-center w-full h-full hexagon-content">
          <TechBadge icon={tech.icon} name={tech.name} zoomLevel={zoomLevel} />
        </div>
      </foreignObject>
    </Hexagon>
  );
};

export const ReactHexGrid: React.FC<ReactHexGridProps> = ({ technologies }) => {
  const [screenSize, setScreenSize] = useState('desktop');
  const [hexSize, setHexSize] = useState({ x: 50, y: 50 });
  const [spacing, setSpacing] = useState(1.0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Calculate dynamic spacing based on zoom level
  const getDynamicSpacing = () => {
    // Start adding spacing from 150% zoom onwards
    if (zoomLevel >= 1.5) {
      // Base spacing + additional spacing based on zoom level
      const additionalSpacing = (zoomLevel - 1.0) * 0.2; // 0.2 spacing per 100% zoom above 100%
      const finalSpacing = Math.max(spacing, spacing + additionalSpacing);
      
      // Debug logging
      console.log(`Zoom: ${zoomLevel.toFixed(2)}x, Base: ${spacing}, Additional: ${additionalSpacing.toFixed(2)}, Final: ${finalSpacing.toFixed(2)}`);
      
      return finalSpacing;
    }
    return spacing;
  };

  // Keep hex size consistent - let spacing handle the separation
  const getDynamicHexSize = () => {
    return hexSize;
  };

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

    // Detect zoom level
    const updateZoomLevel = () => {
      const zoom = window.devicePixelRatio || 1;
      setZoomLevel(zoom);
    };

    updateScreenSize();
    updateZoomLevel();
    
    window.addEventListener('resize', updateScreenSize);
    window.addEventListener('resize', updateZoomLevel);
    
    return () => {
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('resize', updateZoomLevel);
    };
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
        style={{ 
          '--zoom-level': zoomLevel,
          '--screen-size': screenSize,
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center'
        } as React.CSSProperties}
      >
        <Layout 
          size={getDynamicHexSize()} 
          flat={false} 
          spacing={getDynamicSpacing()} 
          origin={{ x: 0, y: 0 }}
        >
          {getFilteredTechnologies().map((tech, index) => (
            <CustomHexagon key={index} tech={tech} zoomLevel={zoomLevel} />
          ))}
        </Layout>
    </HexGrid>
  );
};

export default ReactHexGrid;

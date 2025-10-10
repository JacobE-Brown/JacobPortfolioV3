import React, { useState, useEffect, useRef } from 'react';
import { HexGrid, Layout, Hexagon } from 'react-hexgrid';
import { gsap } from 'gsap';
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
const CustomHexagon: React.FC<{ 
  tech: Technology; 
  zoomLevel?: number;
  onHover?: (tech: Technology, isHovering: boolean) => void;
  isHovered?: boolean;
  isAdjacent?: boolean;
  hoveredTech?: Technology | null;
}> = ({ tech, zoomLevel = 1, onHover, isHovered = false, isAdjacent = false, hoveredTech }) => {
  const hexRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hexRef.current || !badgeRef.current) return;

    const hexElement = hexRef.current;
    const badgeElement = badgeRef.current;

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([hexElement, badgeElement]);

    if (isHovered) {
      // Hovered hexagon animation - subtle scale up
      gsap.timeline()
        .to(hexElement, {
          scale: 1.04,
          x: 0,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        })
        .to(badgeElement, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out"
        }, 0);
    } else if (isAdjacent && hoveredTech) {
      // Calculate starburst direction for adjacent hexagons
      const dx = tech.q - hoveredTech.q;
      const dy = tech.r - hoveredTech.r;
      
      // Convert hexagonal coordinates to screen direction
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const distance = 2; // Reduced movement distance for subtler starburst
      
      const moveX = Math.cos(angle * Math.PI / 180) * distance;
      const moveY = Math.sin(angle * Math.PI / 180) * distance;
      
      // Adjacent hexagon starburst animation
      gsap.timeline()
        .to(hexElement, {
          scale: 0.99,
          x: moveX,
          y: moveY,
          duration: 0.15,
          ease: "back.out(1.7)"
        });
    } else {
      // Reset to normal state
      gsap.timeline()
        .to(hexElement, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        })
        .to(badgeElement, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        }, 0);
    }
  }, [isHovered, isAdjacent, hoveredTech, tech]);

  const handleMouseEnter = () => {
    onHover?.(tech, true);
  };

  const handleMouseLeave = () => {
    onHover?.(tech, false);
  };

  return (
    <Hexagon q={tech.q} r={tech.r} s={tech.s}>
      <foreignObject 
        x="-50" 
        y="-50" 
        width="100" 
        height="100"
        className="hexagon-foreign-object overflow-hidden"
        style={{ 
          '--zoom-level': zoomLevel
        } as React.CSSProperties}
      >
        <div 
          ref={hexRef}
          className="flex items-center justify-center w-full h-full hexagon-content cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={badgeRef}>
            <TechBadge icon={tech.icon} name={tech.name} zoomLevel={zoomLevel} />
          </div>
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
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);

  // Function to check if two hexagons are adjacent
  const areAdjacent = (tech1: Technology, tech2: Technology): boolean => {
    const dx = Math.abs(tech1.q - tech2.q);
    const dy = Math.abs(tech1.r - tech2.r);
    const dz = Math.abs(tech1.s - tech2.s);
    
    // In a hexagonal grid, adjacent hexagons have exactly one coordinate difference of 1
    // and the sum of all coordinate differences should be 2
    return (dx === 1 && dy === 1 && dz === 0) || 
           (dx === 1 && dy === 0 && dz === 1) || 
           (dx === 0 && dy === 1 && dz === 1);
  };

  // Handle hover events
  const handleHover = (tech: Technology, isHovering: boolean) => {
    if (isHovering) {
      setHoveredTech(tech);
    } else {
      setHoveredTech(null);
    }
  };

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
            <CustomHexagon 
              key={index} 
              tech={tech} 
              zoomLevel={zoomLevel}
              onHover={handleHover}
              isHovered={hoveredTech?.name === tech.name}
              isAdjacent={hoveredTech ? areAdjacent(hoveredTech, tech) : false}
              hoveredTech={hoveredTech}
            />
          ))}
        </Layout>
    </HexGrid>
  );
};

export default ReactHexGrid;

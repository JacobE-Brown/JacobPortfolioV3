import React, { useRef, useEffect, useState, useCallback } from 'react';
import HexTile from './HexTile';

interface HexData {
  id: string;
  q: number;
  r: number;
  icon: React.ReactNode;
  label: string;
}

interface HexGridProps {
  hexes: HexData[];
  size?: number;
  onSelect?: (id: string) => void;
  onReturn?: () => void;
  className?: string;
}

const HexGrid: React.FC<HexGridProps> = ({
  hexes,
  size = 50,
  onSelect,
  onReturn,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedHex, setSelectedHex] = useState<string | null>(null);
  const [, setHoveredHex] = useState<string | null>(null);
  const [screenSize, setScreenSize] = useState('desktop');

  // Calculate hex position from QRS coordinates (pointy-top hexagons)
  // Always use the base size for positioning - scaling happens at the container level
  const getHexPosition = useCallback((q: number, r: number) => {
    // Pointy-top hexagon formulas from Red Blob Games
    const x = size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = size * (3 / 2 * r);
    
    return { x, y };
  }, [size]);

  // Calculate grid bounds using the base size
  const getGridBounds = useCallback(() => {
    if (hexes.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    hexes.forEach(hex => {
      const pos = getHexPosition(hex.q, hex.r);
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    });
    
    return { minX, maxX, maxY, minY };
  }, [hexes, getHexPosition]);

  // Get responsive scale factor based on container dimensions
  const getResponsiveScale = useCallback(() => {
    if (containerSize.width === 0 || containerSize.height === 0) {
      return 1; // Fallback to no scaling
    }

    // Calculate the maximum size that fits in the container
    const maxWidth = containerSize.width * 0.8; // Use 80% of container width
    const maxHeight = containerSize.height * 0.8; // Use 80% of container height
    
    // Calculate grid bounds using base size
    const bounds = getGridBounds();
    const gridWidth = Math.abs(bounds.maxX - bounds.minX);
    const gridHeight = Math.abs(bounds.maxY - bounds.minY);
    
    // Calculate scale factors based on both width and height constraints
    const widthScale = maxWidth / (gridWidth + size * 2); // Add padding
    const heightScale = maxHeight / (gridHeight + size * 2); // Add padding
    
    // Use the smaller scale to ensure everything fits
    const scale = Math.min(widthScale, heightScale, 1); // Don't scale up beyond original
    
    // Apply screen size constraints
    const screenScale = screenSize === 'mobile' ? 0.6 :
                       screenSize === 'tablet-small' ? 0.7 :
                       screenSize === 'tablet' ? 0.8 : 1;
    
    return Math.max(scale * screenScale, 0.3); // Minimum 30% scale
  }, [size, screenSize, containerSize, getGridBounds]);



  // Calculate center offset to center the grid
  const getCenterOffset = useCallback(() => {
    const bounds = getGridBounds();
    const gridWidth = bounds.maxX - bounds.minX;
    const gridHeight = bounds.maxY - bounds.minY;
    
    return {
      x: (containerSize.width - gridWidth) / 2 - bounds.minX,
      y: (containerSize.height - gridHeight) / 2 - bounds.minY
    };
  }, [containerSize, getGridBounds]);

  // Update container size and screen size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
        
        // Update screen size for responsive behavior
        const width = window.innerWidth;
        if (width < 480) {
          setScreenSize('mobile');
        } else if (width < 768) {
          setScreenSize('tablet-small');
        } else if (width < 1200) {
          setScreenSize('tablet');
        } else {
          setScreenSize('desktop');
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedHex) {
        setSelectedHex(null);
        onReturn?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedHex, onReturn]);

  // Handle hex selection
  const handleSelect = useCallback((id: string) => {
    if (selectedHex === id) {
      // Deselect if clicking the same hex
      setSelectedHex(null);
      onReturn?.();
    } else {
      setSelectedHex(id);
      onSelect?.(id);
    }
  }, [selectedHex, onSelect, onReturn]);

  // Handle hex hover
  const handleHover = useCallback((id: string, isHovering: boolean) => {
    setHoveredHex(isHovering ? id : null);
  }, []);

  // Check if two hexes are adjacent
  const areAdjacent = useCallback((hex1: HexData, hex2: HexData): boolean => {
    const dx = Math.abs(hex1.q - hex2.q);
    const dy = Math.abs(hex1.r - hex2.r);
    const dz = Math.abs((hex1.q + hex1.r) - (hex2.q + hex2.r));
    
    return (dx === 1 && dy === 1 && dz === 0) || 
           (dx === 1 && dy === 0 && dz === 1) || 
           (dx === 0 && dy === 1 && dz === 1);
  }, []);

  // Always show all hexes, but scale them down on smaller screens
  const getFilteredHexes = useCallback(() => {
    return hexes; // Show all hexes on all screen sizes
  }, [hexes]);

  // Get center offset
  const centerOffset = getCenterOffset();
  const filteredHexes = getFilteredHexes();

  return (
    <div
      ref={containerRef}
      className={`hex-grid-container relative w-full h-full overflow-hidden transition-all duration-300 p-2 sm:p-4 md:p-6 lg:p-8 ${className}`}
      style={{ 
        minHeight: screenSize === 'mobile' ? '400px' : 
                   screenSize === 'tablet-small' ? '450px' :
                   screenSize === 'tablet' ? '500px' : '600px'
      }}
    >
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{
          transform: `scale(${getResponsiveScale()})`,
          transformOrigin: 'center'
        }}
      >
        {filteredHexes.map((hex) => {
          const position = getHexPosition(hex.q, hex.r);
          const isSelected = selectedHex === hex.id;
          const isAdjacent = selectedHex ? 
            hexes.find(h => h.id === selectedHex) && 
            areAdjacent(hex, hexes.find(h => h.id === selectedHex)!) : false;
          
          return (
            <HexTile
              key={hex.id}
              id={hex.id}
              q={hex.q}
              r={hex.r}
              icon={hex.icon}
              label={hex.label}
              size={size}
              x={position.x + centerOffset.x}
              y={position.y + centerOffset.y}
              isSelected={isSelected}
              isVisible={!selectedHex || isSelected || isAdjacent}
              onClick={handleSelect}
              onHover={handleHover}
            />
          );
        })}
      </div>
      
      {/* Selected hex details overlay */}
      {selectedHex && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-medium-2/20">
          <div className="text-center">
            <h3 className="text-lg font-bold text-text-1 mb-2">
              {hexes.find(h => h.id === selectedHex)?.label}
            </h3>
            <p className="text-sm text-text-2">
              Click the hex again or press Escape to return to grid view
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HexGrid;

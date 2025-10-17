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
  const [selectedHex, setSelectedHex] = useState<string | null>(null);
  const [, setHoveredHex] = useState<string | null>(null);
  const [responsiveSize, setResponsiveSize] = useState(size);

  // Calculate hex position from QRS coordinates (pointy-top hexagons)
  // Use responsive size for positioning with increased spacing
  const getHexPosition = useCallback((q: number, r: number) => {
    // Pointy-top hexagon formulas from Red Blob Games with increased spacing
    const spacingMultiplier = 1.1; // Increase spacing by 10%
    const x = responsiveSize * spacingMultiplier * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = responsiveSize * spacingMultiplier * (3 / 2 * r);
    
    return { x, y };
  }, [responsiveSize]);

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

  // No longer needed - using responsive sizing instead of scaling



  // Calculate container size based on hexagon bounds
  const getContainerSize = useCallback(() => {
    const bounds = getGridBounds();
    const padding = responsiveSize * 2; // Add padding around the grid
    return {
      width: Math.abs(bounds.maxX - bounds.minX) + padding,
      height: Math.abs(bounds.maxY - bounds.minY) + padding
    };
  }, [getGridBounds, responsiveSize]);

  const calculatedContainerSize = getContainerSize();

  // Calculate center offset to center the grid
  const getCenterOffset = useCallback(() => {
    const bounds = getGridBounds();
    const gridWidth = bounds.maxX - bounds.minX;
    const gridHeight = bounds.maxY - bounds.minY;
    
    return {
      x: (calculatedContainerSize.width - gridWidth) / 2 - bounds.minX,
      y: (calculatedContainerSize.height - gridHeight) / 2 - bounds.minY
    };
  }, [calculatedContainerSize, getGridBounds]);

  // Update responsive size on resize
  useEffect(() => {
    const updateSize = () => {
      // Update responsive size based on screen width
      const width = window.innerWidth;
      let newResponsiveSize = size;
      
      if (width < 480) {
        newResponsiveSize = size * 0.6; // 60% of base size
      } else if (width < 768) {
        newResponsiveSize = size * 0.8; // 80% of base size
      } else if (width < 1200) {
        newResponsiveSize = size * 0.9; // 90% of base size
      } else {
        newResponsiveSize = size; // Full size
      }
      
      setResponsiveSize(newResponsiveSize);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

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
      className={`hex-grid-container relative overflow-visible transition-all duration-300 p-2 sm:p-4 md:p-6 lg:p-8 ${className}`}
      style={{ 
        width: `${calculatedContainerSize.width}px`,
        height: `${calculatedContainerSize.height}px`,
        minWidth: '300px', // Ensure minimum width
        minHeight: '200px'  // Ensure minimum height
      }}
    >
      <div 
        className="w-full h-full flex items-center justify-center"
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
              size={responsiveSize}
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

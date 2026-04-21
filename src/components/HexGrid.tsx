import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
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
  fadedIds?: Set<string>;
  onSelect?: (id: string) => void;
  onReturn?: () => void;
  initialSelectedId?: string;
  className?: string;
}

const HexGrid: React.FC<HexGridProps> = ({
  hexes,
  size = 50,
  fadedIds,
  onSelect,
  onReturn,
  initialSelectedId,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHex, setSelectedHex] = useState<string | null>(initialSelectedId ?? null);
  const selectedHexRef = useRef<string | null>(initialSelectedId ?? null);
  const [, setHoveredHex] = useState<string | null>(null);
  const [responsiveSize, setResponsiveSize] = useState(size);

  // Calculate hex position from QRS coordinates (pointy-top hexagons)
  const getHexPosition = useCallback((q: number, r: number) => {
    // Red Blob Games formulas with proper spacing
    const spacingMultiplier = 1.1; // 10% more spacing to prevent overlap
    const x = responsiveSize * spacingMultiplier * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
    const y = responsiveSize * spacingMultiplier * (3 / 2 * r);
    
    return { x, y };
  }, [responsiveSize]);

  // Calculate grid bounds
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
      const width = window.innerWidth;
      let newResponsiveSize = size;
      
      if (width < 640) {
        newResponsiveSize = size * 0.6; // 60% — phones (sm)
      } else if (width < 768) {
        newResponsiveSize = size * 0.8; // 80% — large phones (md)
      } else if (width < 1280) {
        newResponsiveSize = size * 0.8; // 80% — diamond without side panel (xl)
      } else {
        newResponsiveSize = size * 0.9; // 90% — diamond with side detail panel (xl+)
      }
      
      setResponsiveSize(newResponsiveSize);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);


  // Animate the initially selected tile once responsive size is resolved
  const hasAnimatedInitial = useRef(false);
  useEffect(() => {
    if (hasAnimatedInitial.current || !selectedHexRef.current) return;
    hasAnimatedInitial.current = true;
    const el = document.getElementById(`hex-${selectedHexRef.current}`);
    if (el) gsap.to(el, { scale: 1.18, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 });
  }, [responsiveSize]);

  // Handle hex selection
  const handleSelect = useCallback((id: string) => {
    const prev = selectedHexRef.current;
    const fallback = initialSelectedId ?? null;

    // Shrink previous (unless it's the fallback we're about to re-enlarge)
    if (prev && prev !== id) {
      const prevEl = document.getElementById(`hex-${prev}`);
      if (prevEl) gsap.to(prevEl, { scale: 1, duration: 0.25, ease: 'power2.out' });
    }

    if (prev === id) {
      // Toggle off — revert to fallback
      const el = document.getElementById(`hex-${id}`);
      if (el) gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });

      if (fallback && fallback !== id) {
        // Pop the fallback back
        const fallbackEl = document.getElementById(`hex-${fallback}`);
        if (fallbackEl) gsap.to(fallbackEl, { scale: 1.18, duration: 0.35, ease: 'back.out(1.5)' });
        selectedHexRef.current = fallback;
        setSelectedHex(fallback);
        onSelect?.(fallback);
      } else {
        // Fallback is the same tile or none — stay put
        selectedHexRef.current = prev;
      }
    } else {
      // Select new
      const el = document.getElementById(`hex-${id}`);
      if (el) gsap.to(el, { scale: 1.18, duration: 0.35, ease: 'back.out(1.5)' });
      selectedHexRef.current = id;
      setSelectedHex(id);
      onSelect?.(id);
    }
  }, [onSelect, onReturn, initialSelectedId]);

  // Calculate adjacent hexagons for starburst effect
  const getAdjacentHexes = useCallback((targetHex: HexData): HexData[] => {
    const directions = [
      { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
      { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
    ];
    
    return directions
      .map(dir => ({
        q: targetHex.q + dir.q,
        r: targetHex.r + dir.r
      }))
      .map(coord => hexes.find(hex => hex.q === coord.q && hex.r === coord.r))
      .filter(Boolean) as HexData[];
  }, [hexes]);

  // Handle starburst animation on hover
  const handleStarburstHover = useCallback((targetHexId: string, isHovering: boolean) => {
    const targetHex = hexes.find(h => h.id === targetHexId);
    if (!targetHex) return;

    const adjacentHexes = getAdjacentHexes(targetHex);
    const targetElement = document.getElementById(`hex-${targetHexId}`);
    
    if (!targetElement) return;

    if (isHovering) {
      // Scale up the hovered hex
      gsap.to(targetElement, {
        scale: 1.05,
        duration: 0.2,
        ease: "back.out(1.2)"
      });

      // Push adjacent hexes away along hexagonal grid axes
      adjacentHexes.forEach((hex) => {
        const adjacentElement = document.getElementById(`hex-${hex.id}`);
        if (adjacentElement) {
          // Convert axial direction to screen direction (pointy-top hex)
          const dq = hex.q - targetHex.q;
          const dr = hex.r - targetHex.r;
          const screenDx = Math.sqrt(3) * dq + (Math.sqrt(3) / 2) * dr;
          const screenDy = (3 / 2) * dr;

          const magnitude = Math.sqrt(screenDx * screenDx + screenDy * screenDy);
          const pushDistance = 10;

          let finalX = 0;
          let finalY = 0;

          if (magnitude > 0) {
            finalX = (screenDx / magnitude) * pushDistance;
            finalY = (screenDy / magnitude) * pushDistance;
          }
          
          gsap.to(adjacentElement, {
            x: finalX,
            y: finalY,
            scale: 0.98,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    } else {
      // Reset — return selected tile to 1.18, others to 1
      gsap.to(targetElement, {
        scale: selectedHexRef.current === targetHexId ? 1.18 : 1,
        duration: 0.2,
        ease: "power2.out"
      });

      adjacentHexes.forEach(hex => {
        const adjacentElement = document.getElementById(`hex-${hex.id}`);
        if (adjacentElement) {
          gsap.to(adjacentElement, {
            x: 0,
            y: 0,
            scale: selectedHexRef.current === hex.id ? 1.18 : 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    }
  }, [hexes, getAdjacentHexes]);

  // Handle hex hover
  const handleHover = useCallback((id: string, isHovering: boolean) => {
    setHoveredHex(isHovering ? id : null);
    handleStarburstHover(id, isHovering);
  }, [handleStarburstHover]);

  // Get center offset
  const centerOffset = getCenterOffset();

  return (
    <div
      ref={containerRef}
      className={`hex-grid-container relative transition-all duration-300 p-2 sm:p-4 md:p-6 lg:p-8 ${className}`}
      style={{ 
        width: `${calculatedContainerSize.width}px`,
        height: `${calculatedContainerSize.height}px`,
        minWidth: '300px',
        minHeight: '200px'
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        {hexes.map((hex) => {
          const position = getHexPosition(hex.q, hex.r);
          const isSelected = selectedHex === hex.id;
          const isFaded = fadedIds?.has(hex.id) ?? false;
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
              faded={isFaded}
              onClick={handleSelect}
              onHover={handleHover}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HexGrid;
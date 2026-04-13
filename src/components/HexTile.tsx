import React from 'react';
import TechBadge from './TechBadge';

interface HexTileProps {
  id: string;
  q: number;
  r: number;
  icon: React.ReactNode;
  label: string;
  size: number;
  x: number;
  y: number;
  isSelected?: boolean;
  faded?: boolean;
  onClick?: (id: string) => void;
  onHover?: (id: string, isHovering: boolean) => void;
  className?: string;
}

const HexTile: React.FC<HexTileProps> = ({
  id,
  icon,
  label,
  size,
  x,
  y,
  isSelected = false,
  faded = false,
  onClick,
  onHover,
  className = ""
}) => {

  const handleClick = () => {
    onClick?.(id);
  };

  const handleMouseEnter = () => {
    onHover?.(id, true);
  };

  const handleMouseLeave = () => {
    onHover?.(id, false);
  };

  // Calculate position without transform to avoid rendering artifacts
  const left = x - size; // Center horizontally
  const top = y - (size * Math.sqrt(3)) / 2; // Center vertically

  return (
    <div
      id={`hex-${id}`}
      className={`hex-tile absolute cursor-pointer ${className}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${size * 2}px`,
        height: `${size * Math.sqrt(3)}px`,
        zIndex: isSelected ? 10 : 1,
        opacity: faded ? 0.2 : 1,
        pointerEvents: faded ? 'none' as const : 'auto' as const,
        filter: faded ? 'grayscale(80%)' : 'none',
        transition: 'opacity 0.4s ease, filter 0.4s ease',
        transformOrigin: 'center center'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full flex items-center justify-center">
        <TechBadge 
          icon={icon} 
          name={label}
          hexSize={{ x: size, y: size }}
        />
      </div>
    </div>
  );
};

export default HexTile;
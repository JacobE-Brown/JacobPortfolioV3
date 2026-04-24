import React from 'react';
import { gsap } from 'gsap';
import TechBadge from './TechBadge';

interface HexTileProps {
  id: string;
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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Haptic feedback on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(12);
    }

    // Quick tap-punch animation before selection kicks in
    const el = document.getElementById(`hex-${id}`);
    if (el) {
      gsap.fromTo(el,
        { scale: 1 },
        { scale: 1.15, duration: 0.1, ease: 'power2.out', yoyo: true, repeat: 1 }
      );
    }

    onClick?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(id)
    }
  }

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
      role="button"
      tabIndex={faded ? -1 : 0}
      aria-label={label}
      className={`hex-tile absolute cursor-pointer origin-center transition-[opacity,filter] duration-400 ease-in-out
        ${isSelected ? 'selected z-10' : 'z-1'}
        ${faded ? 'opacity-20 pointer-events-none grayscale-80' : 'opacity-100 pointer-events-auto'}
        ${className}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${size * 2}px`,
        height: `${size * Math.sqrt(3)}px`,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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
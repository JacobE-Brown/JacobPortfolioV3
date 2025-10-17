import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
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
  isVisible?: boolean;
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
  isVisible = true,
  onClick,
  onHover,
  className = ""
}) => {
  const tileRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tileRef.current || !badgeRef.current) return;

    const tileElement = tileRef.current;
    const badgeElement = badgeRef.current;

    // Kill any existing animations
    gsap.killTweensOf([tileElement, badgeElement]);

    if (isSelected) {
      // Selected state - scale up and move to center
      gsap.timeline()
        .to(tileElement, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(badgeElement, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out"
        }, 0);
    } else if (!isVisible) {
      // Hidden state - fade out and scale down
      gsap.timeline()
        .to(tileElement, {
          opacity: 0.3,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.out"
        });
    } else {
      // Normal state - reset
      gsap.timeline()
        .to(tileElement, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(badgeElement, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        }, 0);
    }
  }, [isSelected, isVisible]);

  const handleClick = () => {
    onClick?.(id);
  };

  const handleMouseEnter = () => {
    onHover?.(id, true);
  };

  const handleMouseLeave = () => {
    onHover?.(id, false);
  };

  return (
    <div
      ref={tileRef}
      className={`hex-tile absolute cursor-pointer transition-all duration-300 ${className}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size * 2}px`,
        height: `${size * Math.sqrt(3)}px`,
        transform: 'translate(-50%, -50%)', // Center the hex on its coordinates
        zIndex: isSelected ? 10 : 1
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={badgeRef}
        className="w-full h-full flex items-center justify-center"
      >
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

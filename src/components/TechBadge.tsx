import React from "react";
import HexBase from "./HexBase";

interface TechBadgeProps {
  icon: React.ReactNode;
  name: string;
  className?: string;
  zoomLevel?: number;
  hexSize?: { x: number; y: number };
  hexBgSrc?: string;
}

const TechBadge = ({ icon, name, className = "", zoomLevel = 1, hexSize = { x: 50, y: 50 }, hexBgSrc }: TechBadgeProps) => {
  // Calculate responsive sizes based on hex size and zoom level
  const baseIconSize = Math.max(hexSize.x * 0.7, 24); // 70% of hex size, minimum 24px
  const baseFontSize = Math.max(hexSize.x * 0.15, 6); // 15% of hex size, minimum 6px
  const basePadding = Math.max(hexSize.x * 0.1, 2); // 10% of hex size, minimum 2px
  
  // Apply zoom level scaling (cap at 1.5x for performance)
  const scaleFactor = Math.min(zoomLevel, 1.5);
  const iconSize = baseIconSize * scaleFactor;
  const fontSize = baseFontSize * scaleFactor;
  const padding = basePadding * scaleFactor;
  
  return (
    <HexBase
      className={`${className} tech-badge-responsive`}
      hexSize={hexSize}
      bgSrc={hexBgSrc}
      style={{ 
        '--zoom-level': zoomLevel,
        '--scale-factor': scaleFactor,
        '--icon-size': `${iconSize}px`,
        '--font-size': `${fontSize}px`,
        '--padding': `${padding}px`,
        '--base-icon-size': `${baseIconSize}px`,
        '--base-font-size': `${baseFontSize}px`,
        '--base-padding': `${basePadding}px`,
        transition: 'transform 0.3s ease'
      } as React.CSSProperties}
    >
      <div
        className="relative flex items-center justify-center tech-icon"
        style={{
          width: iconSize,
          height: iconSize,
          '--icon-size': `${iconSize}px`,
        } as React.CSSProperties}
      >
        <div
          className="w-full h-full flex items-center justify-center origin-center tech-icon-content"
          style={{
            transform: `scale(${scaleFactor})`,
          }}
        >
          {icon}
        </div>
      </div>
      <div 
        className="flex items-center justify-center gap-1 relative flex-[0_0_auto] overflow-hidden tech-label"
        style={{
          borderRadius: `${fontSize * 0.8}px`,
          border: `${fontSize * 0.15}px solid var(--color-blue-medium-2)`,
          background: 'var(--color-blue-neutral)',
          boxShadow: `0 ${fontSize * 0.15}px ${fontSize * 0.15}px 0 rgba(0, 0, 0, 0.25)`,
          fontSize: `${fontSize}px`,
          padding: `${padding}px ${padding * 1.5}px`,
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'center'
        }}
      >
        <div 
          className="relative flex items-center justify-center w-fit font-black text-text-1 tracking-[0] leading-[normal] whitespace-nowrap tech-label-text"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize * 1.2}px`
          }}
        >
          {name}
        </div>
      </div>
    </HexBase>
  );
};

export default TechBadge;
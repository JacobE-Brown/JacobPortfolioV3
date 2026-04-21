import React from "react";
import base from "@/assets/images/misc/hex-base.svg";

interface HexBaseProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hexSize?: { x: number; y: number };
}

export const HexBase = ({ children, className = "", style, hexSize = { x: 50, y: 50 } }: HexBaseProps) => {
  // Calculate responsive dimensions based on hexSize
  const width = hexSize.x * 1.72; // 86px for 50px base = 1.72 ratio
  const height = hexSize.y * 1.74; // 87px for 50px base = 1.74 ratio
  const contentWidth = hexSize.x * 1.609; // 80.45px for 50px base = 1.609 ratio
  const gap = hexSize.x * 0.0612; // 3.06px for 50px base = 0.0612 ratio
  const padding = hexSize.x * 0.1652; // 8.26px for 50px base = 0.1652 ratio
  const contentGap = hexSize.x * 0.1102; // 5.51px for 50px base = 0.1102 ratio

  return (
    <article 
      className={`flex flex-col items-center justify-end relative ${className}`} 
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`,
        gap: `${gap}px`,
        padding: `0 ${padding}px`,
      }}
    >
      <div 
        className="absolute top-0 left-0" 
        aria-hidden="true"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <img
          className="absolute w-full h-full top-0 left-0"
          alt="Hexagonal background shape"
          src={base}
        />
      </div>

      <div 
        className="flex flex-col items-center relative flex-[0_0_auto]"
        style={{
          width: `${contentWidth}px`,
          gap: `${contentGap}px`,
        }}
      >
        {children}
      </div>
    </article>
  );
};

export default HexBase;
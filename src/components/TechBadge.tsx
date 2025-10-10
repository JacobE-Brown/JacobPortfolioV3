import React from "react";
import HexBase from "./HexBase";

interface TechBadgeProps {
  icon: React.ReactNode;
  name: string;
  className?: string;
  zoomLevel?: number;
}

const TechBadge = ({ icon, name, className = "", zoomLevel = 1 }: TechBadgeProps) => {
  return (
    <HexBase 
      className={`${className} tech-badge-responsive`}
      style={{ 
        '--zoom-level': zoomLevel,
        transition: 'transform 0.3s ease'
      } as React.CSSProperties}
    >
      <div className="relative w-[33.65px] h-[33.65px] tech-icon">
        {icon}
      </div>
      <div 
        className="flex w-[69.74px] items-center justify-center gap-[3.06px] px-[8.87px] py-[1.84px] relative flex-[0_0_auto] overflow-hidden tech-label"
        style={{
          borderRadius: '6.118px',
          border: '1.224px solid #54BAB9',
          background: '#F7FBFC',
          boxShadow: '0 1.224px 1.224px 0 rgba(0, 0, 0, 0.25)'
        }}
      >
        <div className="relative flex items-center justify-center w-fit mt-[-1.22px] font-black text-text-1 text-[8px] tracking-[0] leading-[normal] whitespace-nowrap">
          {name}
        </div>
      </div>
    </HexBase>
  );
};

export default TechBadge;
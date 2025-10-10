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
      <div className="flex w-[69.74px] items-center justify-center gap-[3.06px] px-[8.87px] py-[1.84px] relative flex-[0_0_auto] bg-blue-neutral rounded-[6.12px] overflow-hidden border-[1.22px] border-solid border-blue-medium-2 shadow-[0px_1.22px_1.22px_#00000040] tech-label">
        <div className="relative flex items-center justify-center w-fit mt-[-1.22px] font-black text-text-1 text-[8px] tracking-[0] leading-[normal] whitespace-nowrap">
          {name}
        </div>
      </div>
    </HexBase>
  );
};

export default TechBadge;
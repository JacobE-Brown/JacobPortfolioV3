import React from "react";
import HexBase from "./HexBase";

interface TechBadgeProps {
  icon: React.ReactNode;
  name: string;
  className?: string;
}

const TechBadge = ({ icon, name, className = "" }: TechBadgeProps) => {
  return (
    <HexBase className={className}>
      <div className="relative w-[33.65px] h-[33.65px]">
        {icon}
      </div>
      <div className="flex w-[69.74px] items-center justify-center gap-[3.06px] px-[8.87px] py-[1.84px] relative flex-[0_0_auto] bg-blue-neutral rounded-[6.12px] overflow-hidden border-[1.22px] border-solid border-blue-medium-2 shadow-[0px_1.22px_1.22px_#00000040]">
        <div className="relative flex items-center justify-center w-fit mt-[-1.22px] font-black text-text-1 text-[8px] tracking-[0] leading-[normal] whitespace-nowrap">
          {name}
        </div>
      </div>
    </HexBase>
  );
};

export default TechBadge;
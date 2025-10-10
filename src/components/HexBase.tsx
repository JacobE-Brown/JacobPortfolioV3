import React from "react";
import base from "@/assets/images/TechLogos/hex-base.svg";

interface HexBaseProps {
  children: React.ReactNode;
  className?: string;
}

export const HexBase = ({ children, className = "" }: HexBaseProps) => {
  return (
    <article className={`flex flex-col w-[86px] h-[87px] items-center justify-end gap-[3.06px] px-0 py-[8.26px] relative ${className}`}>
      <div className="absolute top-0 left-0 w-[86px] h-[87px]" aria-hidden="true">
        <img
          className="absolute w-full h-full top-0 left-0"
          alt="Hexagonal background shape"
          src={base}
        />
      </div>

      <div className="flex flex-col w-[80.45px] items-center gap-[5.51px] relative flex-[0_0_auto]">
        {children}
      </div>
    </article>
  );
};

export default HexBase;
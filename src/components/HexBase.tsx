import React from "react";

type HexVariant = 'default' | 'teal';

interface HexBaseProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hexSize?: { x: number; y: number };
  variant?: HexVariant;
}

const HEX_PATH = "M39.7676 4.95142C41.9491 3.68744 44.6407 3.68744 46.8223 4.95142L74.9971 21.2756C77.1686 22.5338 78.5059 24.8538 78.5059 27.3635V60.0696C78.5058 62.5792 77.1685 64.8983 74.9971 66.1565L46.8223 82.4817C44.6407 83.7457 41.9491 83.7457 39.7676 82.4817L11.5918 66.1565C9.42057 64.8983 8.08404 62.579 8.08398 60.0696V27.3635C8.08398 24.8539 9.42033 22.5338 11.5918 21.2756L39.7676 4.95142Z";

const VARIANTS: Record<HexVariant, { fill: string; stroke: string }> = {
  default: { fill: '#FFF0DD', stroke: '#70CFFB' },
  teal: { fill: '#E6FAF8', stroke: '#2DD4BF' },
};

export const HexBase = ({ children, className = "", style, hexSize = { x: 50, y: 50 }, variant = 'default' }: HexBaseProps) => {
  // Calculate responsive dimensions based on hexSize
  const width = hexSize.x * 1.72; // 86px for 50px base = 1.72 ratio
  const height = hexSize.y * 1.74; // 87px for 50px base = 1.74 ratio
  const contentWidth = hexSize.x * 1.609; // 80.45px for 50px base = 1.609 ratio
  const gap = hexSize.x * 0.0612; // 3.06px for 50px base = 0.0612 ratio
  const padding = hexSize.x * 0.1652; // 8.26px for 50px base = 0.1652 ratio
  const contentGap = hexSize.x * 0.1102; // 5.51px for 50px base = 0.1102 ratio

  const { fill, stroke } = VARIANTS[variant];

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
      <svg
        className="absolute top-0 left-0 drop-shadow-sm"
        width={width}
        height={height}
        viewBox="0 0 87 87"
        fill="none"
        aria-hidden="true"
      >
        <path d={HEX_PATH} fill={fill} stroke={stroke} strokeWidth="4.28247" />
      </svg>

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
interface HexProfileFrameProps {
  src: string;
  alt?: string;
  className?: string;
}

/**
 * Build a flat-top hexagon SVG path with rounded corners.
 * cx, cy = center; r = circumradius; cr = corner radius.
 */
function roundedHexPath(cx: number, cy: number, r: number, cr: number): string {
  // Flat-top hex vertices at 0°, 60°, 120°, 180°, 240°, 300°
  const angles = [0, 60, 120, 180, 240, 300].map((d) => (d * Math.PI) / 180);
  const vertices = angles.map((a) => ({
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  }));

  const n = vertices.length;
  const parts: string[] = [];

  for (let i = 0; i < n; i++) {
    const prev = vertices[(i - 1 + n) % n];
    const curr = vertices[i];
    const next = vertices[(i + 1) % n];

    // Unit vectors from curr toward prev and next
    const toPrevLen = Math.hypot(prev.x - curr.x, prev.y - curr.y);
    const toNextLen = Math.hypot(next.x - curr.x, next.y - curr.y);
    const toPrev = { x: (prev.x - curr.x) / toPrevLen, y: (prev.y - curr.y) / toPrevLen };
    const toNext = { x: (next.x - curr.x) / toNextLen, y: (next.y - curr.y) / toNextLen };

    // Points offset from vertex by corner radius
    const startPt = { x: curr.x + toPrev.x * cr, y: curr.y + toPrev.y * cr };
    const endPt = { x: curr.x + toNext.x * cr, y: curr.y + toNext.y * cr };

    if (i === 0) {
      parts.push(`M ${startPt.x.toFixed(2)} ${startPt.y.toFixed(2)}`);
    } else {
      parts.push(`L ${startPt.x.toFixed(2)} ${startPt.y.toFixed(2)}`);
    }
    parts.push(
      `Q ${curr.x.toFixed(2)} ${curr.y.toFixed(2)} ${endPt.x.toFixed(2)} ${endPt.y.toFixed(2)}`
    );
  }
  parts.push("Z");
  return parts.join(" ");
}

export default function HexProfileFrame({
  src,
  alt = "Profile photo",
  className = "",
}: HexProfileFrameProps) {
  const cx = 110;
  const cy = 110;
  const cornerRadius = 12;

  const outerPath = roundedHexPath(cx, cy, 100, cornerRadius);
  const tealPath = roundedHexPath(cx, cy, 92, cornerRadius * 0.92);
  const clipPath = roundedHexPath(cx, cy, 89, cornerRadius * 0.89);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-full"
        role="img"
        aria-label={alt}
      >
        <defs>
          <clipPath id="hex-photo-clip">
            <path d={clipPath} />
          </clipPath>
        </defs>

        {/* Outer hex ring — navy */}
        <path d={outerPath} fill="#002A58" />

        {/* Inner hex ring — teal */}
        <path d={tealPath} fill="#54BAB9" />

        {/* Photo background fallback */}
        <path d={clipPath} fill="#F7FBFC" />

        {/* Profile image clipped to innermost hex */}
        <image
          href={src}
          x="20"
          y="20"
          width="180"
          height="180"
          clipPath="url(#hex-photo-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </div>
  );
}

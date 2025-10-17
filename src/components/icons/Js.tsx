const Js = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 112 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="JavaScript logo"
      >
        <rect width="112" height="112" rx="12" fill="#F7DF1E" />
        <path d="M30 30h52v52H30V30z" fill="#F7DF1E" />
        <text
          x="56"
          y="72"
          fontFamily="Arial, sans-serif"
          fontSize="48"
          fontWeight="bold"
          fill="#000000"
          textAnchor="middle"
        >
          JS
        </text>
      </svg>
    </div>
  );
};

export default Js;
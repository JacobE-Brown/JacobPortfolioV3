const Figma = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 112 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Figma logo"
      >
        <rect width="112" height="112" rx="12" fill="#F24E1E" />
        <rect x="20" y="20" width="32" height="32" rx="8" fill="#A259FF" />
        <rect x="60" y="20" width="32" height="32" rx="8" fill="#FF7262" />
        <rect x="20" y="60" width="32" height="32" rx="8" fill="#1ABCFE" />
        <rect x="60" y="60" width="32" height="32" rx="8" fill="#0ACF83" />
        <rect x="40" y="40" width="32" height="32" rx="8" fill="#F24E1E" />
      </svg>
    </div>
  );
};

export default Figma;
const Python = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 112 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Python logo"
      >
        <rect width="112" height="112" rx="12" fill="#3776AB" />
        <path d="M56 20c-20 0-36 7-36 16v8h20v-4h32v4h20v-8c0-9-16-16-36-16z" fill="#FFD43B" />
        <path d="M56 92c20 0 36-7 36-16v-8h-20v4h-32v-4h-20v8c0 9 16 16 36 16z" fill="#3776AB" />
        <circle cx="36" cy="44" r="8" fill="#FFD43B" />
        <circle cx="76" cy="68" r="8" fill="#3776AB" />
      </svg>
    </div>
  );
};

export default Python;
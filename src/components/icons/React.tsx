import React from "react";

const ReactIcon = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 112 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="React logo"
      >
        <circle cx="56" cy="56" r="50" fill="#61DAFB" />
        <circle cx="56" cy="56" r="8" fill="#61DAFB" />
        <ellipse cx="56" cy="56" rx="50" ry="25" fill="none" stroke="#61DAFB" strokeWidth="2" />
        <ellipse cx="56" cy="56" rx="25" ry="50" fill="none" stroke="#61DAFB" strokeWidth="2" />
        <ellipse cx="56" cy="56" rx="50" ry="25" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 56 56)" />
        <ellipse cx="56" cy="56" rx="25" ry="50" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 56 56)" />
      </svg>
    </div>
  );
};

export default ReactIcon;
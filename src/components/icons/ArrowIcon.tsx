import React from "react";

const ArrowIcon = ({ size }: { size?: { width: string; height: string } }) => {
  return (
    <svg
      focusable="false"
      className="arrow-icon"
      aria-hidden="true"
      width={size ? size.width : "14"}
      height={size ? size.height : "14"}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
    </svg>
  );
};

export default ArrowIcon;

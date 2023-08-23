import React from 'react';

const BookIcon = ({ size }: { size?: { width: string; height: string } }) => (
  <svg
    focusable="false"
    className="book-icon"
    aria-hidden="true"
    width={size ? size.width : '16px'}
    height={size ? size.height : '16px'}
    fill="currentColor"
    viewBox="0 0 50 50"
  >
    <path
      stroke="white"
      strokeWidth="1"
      d="M 12 2 C 8.699219 2 6 4.699219 6 8 L 6 42.417969 C 6 45.59375 8.832031 48 12 48 L 44 48 L 44 46 L 12 46 C 9.839844 46 8 44.378906 8 42.417969 C 8 40.457031 9.800781 39 12 39 L 44 39 L 44 2 Z M 12 4 L 42 4 L 42 37 L 12 37 C 10.507813 37 9.09375 37.539063 8 38.417969 L 8 8 C 8 5.78125 9.78125 4 12 4 Z M 15 9 C 13.90625 9 13 9.90625 13 11 L 13 15 C 13 16.09375 13.90625 17 15 17 L 36 17 C 37.09375 17 38 16.09375 38 15 L 38 11 C 38 9.90625 37.09375 9 36 9 Z M 15 11 L 36 11 L 36 15 L 15 15 Z"
    />
  </svg>
);

export default BookIcon;

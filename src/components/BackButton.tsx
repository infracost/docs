import React from 'react';
import ArrowIcon from './icons/ArrowIcon';

const BackButton = ({ toPath, toText }) => (
  <a href={toPath} className="back-button" rel="noopener noreferrer">
    <ArrowIcon />
    Back to {toText}
  </a>
);

export default BackButton;

import React from 'react';
import Check from './icons/Check';

const LiWithCheck = ({ children }) => (
  <li className="product-card__li">
    <span className="icon primary">
      <Check size={18} color="#DB44B8" />
    </span>
    <span>{children}</span>
  </li>
);

export default LiWithCheck;

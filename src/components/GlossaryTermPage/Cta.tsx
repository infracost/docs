import React from 'react';
import './Cta.css';

const Cta = () => (
  <div className="glossary-cta">
    <div className="glossary-cta__wrapper">
      <div className="glossary-cta__text-wrapper">
        <h3 className="glossary-cta__header">Shifting FinOps Left 👈</h3>
        <p className="glossary-cta__text">
          Put cloud costs in engineering workflows, and see the cost of upcoming code changes{' '}
          <b>before resources are launched</b>.
        </p>
      </div>
      <a href="https://dashboard.infracost.io/" className="button medium flat primary">
        Sign up and get started now
      </a>
    </div>
  </div>
);
export default Cta;

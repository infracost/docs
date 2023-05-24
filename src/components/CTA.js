import React from 'react';

function CTA() {
  return (
    <div className="cta">
      <div className="container">
        <img
          src="/img/icon-primary.svg"
          alt="Infracost icon"
          width={100}
          height={100}
        />
        <p className="action">Try Infracost for free</p>
        <a href="https://dashboard.infracost.io/" className="button primary">
          Signup and get started now
        </a>
      </div>
    </div>
  );
}

export default CTA;

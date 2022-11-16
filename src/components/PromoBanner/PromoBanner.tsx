import React from 'react';

import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <div className="promo-banner">
      <div className="container">
        <div className="promo-banner__card">
          <div className="promo-banner__body">
            <h1 className="promo-banner__tagline">
              $50 $30 till end of the year! 💸
            </h1>
            <p className="promo-banner__sub-text">
              An offer as a thank you to our open-source community.
            </p>
            <p className="promo-banner__text">
              As a thank you to our open-source community, and to celebrate the
              end of the year, we are reducing the price of Infracost Cloud from
              $50 per seat per month to $30 per seat per month. This offer is
              live now, and ends on the 31st December 2022.{' '}
            </p>
            <div className="promo-banner__cta-wrapper">
              <a href="/docs/" className="button primary">
                Get Infracost now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;

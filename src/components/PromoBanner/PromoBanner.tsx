import React from 'react';

import './PromoBanner.css';

const PromoBanner = () => {
  return (
    <div className="promo-banner">
      <div className="container promo-banner__container">
        <div className="promo-banner__card">
          <div className="promo-banner__body">
            <div className="promo-banner__label">Promo</div>
            <h1 className="promo-banner__tagline">
              <span className="promo-banner__tagline--strike-through">
                $50
                <span className="promo-banner__arrow-head">&#8963;</span>
              </span>
              <span className="promo-banner__tagline--bold">
                $30 till end of the year! 💸
              </span>
            </h1>
            <div className="promo-banner__description">
              <p className="promo-banner__sub-text">
                An offer as a thank you to our open-source community.
                <img
                  src="/img/icons/open-source.svg"
                  alt="Open source icon"
                  width={22}
                  height={22}
                />{' '}
                <span>💜</span>
              </p>
              <p className="promo-banner__text">
                As a thank you to our open-source community, and to celebrate
                the end of the year, we are reducing the price of Infracost
                Cloud from $50 per seat per month to $30 per seat per month.
                This offer is live now, and ends on the 31st December 2022.{' '}
              </p>
            </div>
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

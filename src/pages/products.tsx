import React, { ReactElement } from 'react';
import PageLayout from '../components/PageLayout';
import WorksWith from '../components/WorksWith';
import ProductCard from '../components/ProductCard';
import Check from '../components/icons/Check';

export enum ColourCoding {
  'cloud' = 'green',
  'cd-ci' = 'orange',
  'providers' = 'purple',
  'vscode-extension' = 'blue',
}

function Pricing() {
  const vsCodeExtensionImg = (
    <img
      src="/img/screenshots/pr-step-4.png"
      alt="Comment in pull request posted by Infracost"
    />
  );

  const LiWithCheck = ({ children }) => (
    <li className="product-card__li">
      <span className="icon primary">
        <Check size={18} color="#DB44B8" />
      </span>
      <span>{children}</span>
    </li>
  );

  return (
    <PageLayout
      title="Products"
      description="Cloud costs, loved by developers"
      pageClass="products"
      hideCTA={false}
      noIndex={false}
    >
      <div className="products-wrapper">
        <div className="container">
          <div className="intro">
            <h1 className="tagline">Cloud costs, loved by developers</h1>
          </div>

          <WorksWith />
          <ProductCard
            title="Cloud cost estimates, as you write code"
            designerFor="Engineers developing infrastructure as code"
            image={vsCodeExtensionImg}
            pillText="Infracost VSCode Extension"
            pillColourCoding={ColourCoding['vscode-extension']}
            ctaText="Install VSCode Extension"
            ctaLink="https://github.com/infracost/vscode-infracost"
            targetBlank
          >
            <ul>
              <LiWithCheck>
                Directly installed into VSCode as an extension
              </LiWithCheck>
            </ul>
          </ProductCard>
        </div>
      </div>
    </PageLayout>
  );
}

export default Pricing;

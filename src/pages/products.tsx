import React from 'react';
import PageLayout from '../components/PageLayout';
import Pill from '../components/Pill';
import WorksWith from '../components/WorksWith';

export enum ColourCoding {
  'cloud' = 'green',
  'cd-ci' = 'orange',
  'providers' = 'purple',
  'vscode-extension' = 'blue',
}

function Pricing() {
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
          <Pill text="test" colour={ColourCoding['cloud']} />
          <Pill text="test" colour={ColourCoding['cd-ci']} />
          <Pill text="test" colour={ColourCoding['vscode-extension']} />
        </div>
      </div>
    </PageLayout>
  );
}

export default Pricing;

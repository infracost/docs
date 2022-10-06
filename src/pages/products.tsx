import React from 'react';
import PageLayout from '../components/PageLayout';
import WorksWith from '../components/WorksWith/WorksWith';
import ProductCard from '../components/ProductCard/ProductCard';
import Check from '../components/icons/Check';
import Questions from '../components/questions/Questions';

export enum ColourCoding {
  'cloud' = 'green',
  'ci-cd' = 'orange',
  'providers' = 'purple',
  'vscode-extension' = 'blue',
}

function Pricing() {
  const vsCodeExtensionImg = (
    <img
      src="/img/vscode-extension/maintf.png"
      alt="Infracost VSCode Extension"
      width="806"
      height="397"
    />
  );

  const ciCdImg = (
    <img
      src="/img/ci-cd/github_actions_screenshot.png"
      alt="Infracost CI/CD"
      width="572"
      height="346"
    />
  );

  const cloudImg = (
    <img
      src="/img/infracost-cloud/dashboard.png"
      alt="Infracost Cloud"
      width="572"
      height="437"
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
        <div className="intro">
          <h1 className="tagline container">
            Cloud costs, loved by developers{' '}
            <img src="/img/icons/heart.svg" alt="Heart icon" />
          </h1>
        </div>
        <div className="container products-wrapper__container">
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
            imgBgColor="#212121"
          >
            <ul className="product-card__ul">
              <LiWithCheck>
                Directly installed into VSCode as an extension
              </LiWithCheck>
              <LiWithCheck>
                Compare configs, instance types, regions etc
              </LiWithCheck>
              <LiWithCheck>
                Quick cost estimates: no cloud calculators needed
              </LiWithCheck>
              <LiWithCheck>Catch costly typos </LiWithCheck>
              <LiWithCheck>Open Source </LiWithCheck>
            </ul>
          </ProductCard>

          <ProductCard
            title="Cloud costs for dev/eng team review"
            designerFor="DevOps and SRE"
            image={ciCdImg}
            pillText="Infracost CI/CD"
            pillColourCoding={ColourCoding['ci-cd']}
            ctaText="Add to CI/CD"
            ctaLink="https://www.infracost.io/docs/integrations/cicd/"
            targetBlank
            alternate
          >
            <ul className="product-card__ul">
              <LiWithCheck>Direct integration into CI/CD</LiWithCheck>
              <LiWithCheck>
                Review cost impact with the team alongside security and code
                quality
              </LiWithCheck>
              <LiWithCheck>
                Shows the cost impact of the specific change
              </LiWithCheck>
              <LiWithCheck>
                Usage-based resources (e.g. storage and serverless) can be
                modeled
              </LiWithCheck>
              <LiWithCheck>Manual integrations (GitHub Actions) </LiWithCheck>
              <LiWithCheck>Open Source </LiWithCheck>
            </ul>
          </ProductCard>

          <ProductCard
            title="Proactive cloud costs for Team Leads and FinOps"
            designerFor="Engineering teams, team leads, managers and FinOps"
            image={cloudImg}
            pillText="Infracost Cloud"
            pillColourCoding={ColourCoding['cloud']}
            ctaText="Start free trial now"
            ctaLink="https://www.infracost.io/docs/infracost_cloud/get_started/"
            targetBlank
          >
            <ul className="product-card__ul">
              <LiWithCheck>
                Automatically works on top of Infracost Open Source
              </LiWithCheck>
              <LiWithCheck>
                Shows all infrastructure changes alongside cost impact (up and
                down)
              </LiWithCheck>
              <LiWithCheck>
                Supports custom price books, EDPs, EAs and commitment agreements
              </LiWithCheck>
              <LiWithCheck>
                Shows top changes per repo, project, pull request and users
              </LiWithCheck>
              <LiWithCheck>
                Weekly summary reports and threshold alerts{' '}
              </LiWithCheck>
              <LiWithCheck>Organization and team management</LiWithCheck>
              <LiWithCheck>Automated integrations (GitHub App)</LiWithCheck>
              <LiWithCheck>SaaS</LiWithCheck>
            </ul>
          </ProductCard>
          <Questions />
        </div>
      </div>
    </PageLayout>
  );
}

export default Pricing;

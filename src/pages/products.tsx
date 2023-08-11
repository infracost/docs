import React from 'react';
import PageLayout from '../components/PageLayout';
import WorksWith from '../components/WorksWith/WorksWith';
import ProductCard from '../components/ProductCard/ProductCard';

import ProductQuestions from '../components/questions/ProductQuestions';
import WebPPngFallback from '../components/utils/WebPPngFallback';
import LiWithCheck from '../components/LiWithCheck';

export enum ColourCoding {
  'cloud' = 'green',
  'ci-cd' = 'orange',
  'providers' = 'purple',
  'vscode-extension' = 'blue',
}

function Products() {
  const vsCodeExtensionImg = (
    <WebPPngFallback filePath={'/img/vscode-extension/maintf'}>
      <img
        src="/img/vscode-extension/maintf.png"
        alt="Infracost VS Code Extension"
        width="655"
        height="385"
      />
    </WebPPngFallback>
  );

  const ciCdImg = (
    <WebPPngFallback filePath="/img/ci-cd/github_actions_screenshot">
      <img
        src="/img/ci-cd/github_actions_screenshot.png"
        alt="Infracost CI/CD"
        width="572"
        height="346"
      />
    </WebPPngFallback>
  );

  const cloudImg = (
    <WebPPngFallback filePath="/img/infracost-cloud/dashboard">
      <img
        src="/img/infracost-cloud/dashboard.png"
        alt="Infracost Cloud"
        width="572"
        height="437"
      />
    </WebPPngFallback>
  );

  return (
    <PageLayout
      title="Products"
      description="Infracost has multiple products for each person ranging from engineering to FinOps. Making FinOps proactive by shifting cloud costs left"
      pageClass="products default-page-bg"
      hideCTA={false}
      noIndex={false}
    >
      <div className="products-wrapper">
        <div className="intro">
          <h1 className="tagline container">
            Cloud costs, loved by developers{' '}
            <img src="/img/icons/heart.svg" alt="Heart icon" width={27} height={24} />
          </h1>
        </div>
        <div className="container products-wrapper__container">
          <WorksWith />
          <ProductCard
            title="Cloud cost estimates, as you write code"
            designerFor="Engineers writing infrastructure as code"
            image={vsCodeExtensionImg}
            pillText="Infracost VS Code Extension"
            pillColourCoding={ColourCoding['vscode-extension']}
            ctaText="Install VS Code Extension"
            ctaLink="https://github.com/infracost/vscode-infracost"
            imgBgColor="#212121"
          >
            <ul className="product-card__ul">
              <LiWithCheck>Directly installed into VS Code as an extension</LiWithCheck>
              <LiWithCheck>Compare configs, instance types, regions etc</LiWithCheck>
              <LiWithCheck>Quick cost estimates: no cloud calculators needed</LiWithCheck>
              <LiWithCheck>Catch costly typos </LiWithCheck>
              <LiWithCheck>Open source </LiWithCheck>
            </ul>
          </ProductCard>

          <ProductCard
            title="Cloud costs for engineering team review"
            designerFor="DevOps, SRE, Platform teams"
            image={ciCdImg}
            pillText="Infracost CI/CD"
            pillColourCoding={ColourCoding['ci-cd']}
            ctaText="Add to CI/CD"
            ctaLink="https://www.infracost.io/docs/integrations/cicd/"
            alternate
          >
            <ul className="product-card__ul">
              <LiWithCheck>Direct integration into source control systems or CI/CD</LiWithCheck>
              <LiWithCheck>
                Review cost impact with the team alongside security and code quality
              </LiWithCheck>
              <LiWithCheck>Shows the cost impact of the specific change</LiWithCheck>
              <LiWithCheck>
                Usage-based resources (e.g. storage and serverless) can be modeled
              </LiWithCheck>
              <LiWithCheck>Open source </LiWithCheck>
            </ul>
          </ProductCard>

          <ProductCard
            title="Proactive cloud costs for Team Leads and FinOps"
            designerFor="Engineering teams, team leads, managers and FinOps"
            image={cloudImg}
            pillText="Infracost Cloud"
            pillColourCoding={ColourCoding.cloud}
            ctaText="Start free trial now"
            ctaLink="https://dashboard.infracost.io?screen_hint=signup"
          >
            <ul className="product-card__ul">
              <LiWithCheck>Automatically works on top of Infracost CI/CD</LiWithCheck>
              <LiWithCheck>
                Shows all infrastructure changes alongside cost impact (up and down)
              </LiWithCheck>
              <LiWithCheck>
                Guardrails alert engineers and team leads if a change is going to break budgets
              </LiWithCheck>
              <LiWithCheck>
                Policies check all changes against best practices and your custom policies
              </LiWithCheck>
              <LiWithCheck>Cloud costs for product managers reported directly in Jira</LiWithCheck>
              <LiWithCheck>Shows top changes per repo, project, pull request and users</LiWithCheck>
              <LiWithCheck>Weekly summary reports</LiWithCheck>
              <LiWithCheck>Organization and team management</LiWithCheck>
              <LiWithCheck>
                Supports custom price books, AWS EDP and Enterprise Agreement discounts
              </LiWithCheck>
              <LiWithCheck>
                Integrate across all your repositories with the GitHub App or the GitLab App
              </LiWithCheck>
            </ul>
          </ProductCard>
          <ProductQuestions />
        </div>
      </div>
    </PageLayout>
  );
}

export default Products;

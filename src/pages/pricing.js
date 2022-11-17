import React from 'react';
import PageLayout from '../components/PageLayout';
import Check from '../components/icons/Check';
import PricingQuestions from '../components/questions/PricingQuestions';
import UsedBy from '../components/UsedBy';
import PromoBanner from '../components/PromoBanner/PromoBanner';
import Pill from '../components/Pill/Pill';

function Pricing() {
  return (
    <PageLayout
      title="Pricing"
      description="Cloud cost estimates for engineers"
      pageClass="pricing"
      hideCTA={true}
    >
      <div className="pricing-wrapper">
        <PromoBanner />

        <div className="container">
          <div className="intro">
            <h1 className="tagline">Pricing</h1>
            <p className="sub-tagline">
              Infracost provides cloud cost estimates for engineers
            </p>
          </div>

          <div className="plans">
            <div className="plan box">
              <div className="heading">
                <h2>Infracost CI/CD</h2>
                <Pill colour="green">Free</Pill>
              </div>
              <ul className="price__free">
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Open source</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Get cost breakdowns and diffs</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>
                    CI/CD integrations (GitHub, GitLab, Bitbucket, Azure
                    DevOps...)
                  </span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Works with Terraform Cloud &amp; Terragrunt</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Use our hosted Cloud Pricing API or self-host</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Community supported</span>
                </li>
              </ul>
              <div className="action">
                <a href="/docs/" className="button primary">
                  Get started
                </a>
              </div>
            </div>

            <div className="plan box">
              <div className="heading">
                <h2>
                  Infracost Cloud <span className="coming-soon"></span>
                </h2>
                <div className="price__wrapper">
                  <span>
                    <Pill colour="violet">$50 per seat per month</Pill>
                  </span>
                  <span className="price__footnote">(billed annually)</span>
                </div>
                <span className="price">
                  A seat is needed for anyone making infrastructure changes, and
                  those who access the Infracost Cloud dashboard
                </span>
              </div>
              <ul>
                <li>
                  <span>
                    <b>In addition to Infracost Community:</b>
                  </span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>
                    Visibility across all changes, see pull requests that
                    increase/decrease costs the most
                  </span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Custom price books and discounts</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Weekly reports</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>
                    GitHub App integration with pull request status/metadata
                  </span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Team management</span>
                </li>
                <li className="pricing plan__coming-soon">
                  <span>
                    <b>Coming soon:</b>
                  </span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Guardrails with custom messages/notifications</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>JIRA integration</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>Recommendations in pull requests</span>
                </li>
                <li>
                  <span className="icon primary">
                    <Check size={18} />
                  </span>
                  <span>SSO</span>
                </li>
              </ul>
              <div className="action">
                <a
                  href="https://dashboard.infracost.io"
                  className="button primary"
                >
                  Start free trial
                </a>
              </div>
            </div>
          </div>
          <h3>
            Enterprise support can be added onto any plan, email{' '}
            <a href="mailto:hello@infracost.io?subject=Enterprise support">
              hello@infracost.io
            </a>{' '}
            for details.
          </h3>
          <PricingQuestions />
        </div>
      </div>

      <UsedBy />
    </PageLayout>
  );
}

export default Pricing;

import React from 'react';
import PageLayout from '../components/PageLayout';
import Check from '../components/icons/Check';
import PricingQuestions from '../components/questions/PricingQuestions';
import UsedBy from '../components/UsedBy';

function Pricing() {
  const PRICE_PER_SEAT = 50;

  return (
    <PageLayout
      title="Pricing"
      description="Cloud cost estimates for engineers"
      pageClass="pricing default-page-bg"
      hideCTA={true}
    >
      <div className="pricing-wrapper">
        <div className="intro">
          <div className="container">
            <h1 className="tagline">Pricing</h1>
            <p className="sub-tagline">
              Infracost provides cloud cost estimates for engineers
            </p>
          </div>
        </div>

        <div className="container">
          <div className="plans">
            <div className="plan box plan--free">
              <div className="heading">
                <h2>Infracost CI/CD</h2>
              </div>
              <div className="plan__wrapper">
                <span className="price__tier">Free</span>
                <ul>
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
                  <a href="/docs/" className="button secondary">
                    Get started
                  </a>
                </div>
              </div>
            </div>
            <div className="plan box plan--paid">
              <div className="heading">
                <h2>Infracost Cloud</h2>
              </div>
              <div className="plan__wrapper">
                <div className="price__wrapper">
                  <span>
                    <span className="price__tier">${PRICE_PER_SEAT}</span>
                  </span>
                  <span className="price__suppl">
                    per seat per month (billed annually)
                    <span className="price__description">
                      A seat is needed for anyone making infrastructure changes,
                      and those who access the Infracost Cloud dashboard
                    </span>
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
                    <span>Guardrails with custom messages/notifications/actions</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Policies in pull requests (e.g. gp2 to gp3)</span>
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
                    <span>Jira integration</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Custom reports</span>
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
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>SSO</span>
                  </li>
                  {/* <li className="pricing plan__coming-soon">
                    <span>
                      <b>Coming soon:</b>
                    </span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>n/a</span>
                  </li> */}
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

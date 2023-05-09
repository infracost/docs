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

        <UsedBy
          logos={[
            "safe-fleet.svg",
            "cisco.svg",
            "bmw.svg",
            "nbc_sports_group.png",
            "capgemini.svg",
          ]}
          sectionTagline="Trusted by teams at:"
          withBorderTop={false}
        />

        <div className="container">
          <div className="plans">
            <div className="plan box plan--free">
              <div className="heading">
                <h2>Infracost CI/CD</h2>
                <span className="sub">For engineers</span>
              </div>

              <div className="plan__wrapper">
                <span className="price__tier">Free</span>
                <div className="price__description">
                  Occaecat veniam sit enim veniam minim. Cupidatat ea tempor
                  sint quis et cupidatat non ullamco aute aliqua.
                </div>
                <ul>
                  <li className="price__li--spacer"> </li>
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
                <span className="sub">
                  For FinOps, DevOps and Platform teams
                </span>
              </div>
              <div className="plan__wrapper">
                <div className="price__wrapper">
                  <span>
                    <span className="price__tier">${PRICE_PER_SEAT}</span>
                  </span>
                  <span className="price__suppl">per seat per month</span>
                </div>
                <div className="price__description">
                  A seat is needed for anyone making infrastructure changes, and
                  those who access the Infracost Cloud dashboard
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
                    <span>
                      Guardrails with custom messages, notifications & actions
                    </span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>
                      Policies in pull requests (e.g. change AWS GP2 to GP3
                      volumes)
                    </span>
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
                    <span>Pull request status & audit trail</span>
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
                    <span>Custom price books & discounts</span>
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
                    <span>Single Sign-On</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Dedicated support chat</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Access to SOC2 Type II report</span>
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
            <div className="plan box plan--enterprise">
              <div className="heading">
                <h2>Infracost Cloud Enterprise</h2>
                <span className="sub">
                  For Enterprises requiring more than 100 seats
                </span>
              </div>
              <div className="plan__wrapper">
                <div className="price__wrapper">
                  <span className="price__tier">Talk to us</span>
                </div>
                <div className="price__description">
                  Occaecat veniam sit enim veniam minim. Cupidatat ea tempor
                  sint quis et cupidatat non ullamco aute aliqua.
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
                      GitHub Enterprise Server & GitLab Enterprise apps
                    </span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Complex SKU-level discount support</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Enterprise onboarding</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>SLAs</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Enterprise Support (dedicated chat & email)</span>
                  </li>
                  <li>
                    <span className="icon primary">
                      <Check size={18} />
                    </span>
                    <span>Complex security requirements</span>
                  </li>
                </ul>
                <div className="action">
                  {/* where do we link this to? */}
                  <a
                    href="https://dashboard.infracost.io"
                    className="button primary"
                  >
                    Talk to us
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h3>
            Enterprise support can be added onto any plan, email{" "}
            <a href="mailto:hello@infracost.io?subject=Enterprise support">
              hello@infracost.io
            </a>{" "}
            for details.
          </h3>
          <PricingQuestions />
        </div>
      </div>
    </PageLayout>
  );
}

export default Pricing;

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
          noBorder={true}
        />

        <div className="container">
          <div className="plans">
            <div className="plan box plan--free">
              <div className="plan__wrapper">
                <div className="price__wrapper">
                  <span className="price__tier">Infracost CI/CD</span>
                  <span className="price">$0</span>
                  <span className="sub">
                    For <b>engineers</b>
                  </span>
                  <div className="action">
                    <a href="/docs/" className="button primary">
                      Get started
                    </a>
                  </div>
                </div>
                <div className="price__main-wrapper">
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
                </div>
              </div>
            </div>
            <div className="plan box plan--cloud">
              <div className="plan__wrapper">
                <div className="price__wrapper">
                  <span className="price__tier">Infracost Cloud</span>
                  <span className="price">
                    ${PRICE_PER_SEAT}
                    <span className="price__suppl">per seat *</span>
                  </span>
                  <span className="sub">
                    For <b>FinOps</b>, <b>DevOps</b> and <b>Platform</b> teams
                  </span>
                  <div className="action">
                    <a
                      href="https://dashboard.infracost.io"
                      className="button secondary"
                    >
                      Start free trial
                    </a>
                  </div>
                </div>
                <div className="price__main-wrapper">
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

                  <div className="price__description">
                    * A seat is needed for anyone making infrastructure changes,
                    and those who access the Infracost Cloud dashboard
                  </div>
                </div>
              </div>
            </div>
            <div className="plan box plan--enterprise">
              <div className="plan__wrapper">
                <div className="price__wrapper">
                  <span className="price__tier">Infracost Enterprise</span>
                  <span className="price">Talk to us</span>
                  <span className="sub">
                    {" "}
                    For <b>Enterprises</b> requiring more than 100 seats
                  </span>

                  <div className="action">
                    {/* where do we link this to? */}
                    <a
                      href="https://dashboard.infracost.io"
                      className="button secondary"
                    >
                      Talk to us
                    </a>
                  </div>
                </div>
                <div className="price__main-wrapper">
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

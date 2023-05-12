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
              Cloud costs in engineering workflow before resources are launched
            </p>
            <p className="sub-tagline">The cloud checkout screen</p>
          </div>
        </div>

        <div className="container">
          <UsedBy
            logos={[
              "safe-fleet.svg",
              "cisco.svg",
              "bmw.svg",
              "nbc_sports_group.png",
              "capgemini.svg",
            ]}
            sectionTagline="Trusted by teams at:"
            classes="used-by--flush"
          />
          <div className="plans">
            <div className="plan box plan--free">
              <div className="plan__wrapper">
                <div className="price__wrapper">
                  <span className="price__tier">Infracost CI/CD</span>
                  <span className="price">$0</span>
                  <span className="sub">
                    For <b>Engineers</b>
                  </span>
                  <div className="action">
                    <a href="/docs/" className="button secondary">
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
                      <span>
                        Use our hosted Cloud Pricing API * or self-host
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>Community supported</span>
                    </li>
                  </ul>

                  <div className="price__description">
                    * Up to 1,000 runs per month, upgrade packs can be purchased
                    (contact us).
                  </div>
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
                      className="button primary"
                    >
                      Start free trial
                    </a>
                  </div>
                </div>
                <div className="price__main-wrapper">
                  <ul>
                    <li>
                      <span>
                        <b>In addition to Infracost CI/CD:</b>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Visibility:</b> All changes & cost impacts in a
                        single dashboard
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Guardrails:</b> Automatic budget checks and approval
                        workflows before money is spent
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Policies:</b> Ensuring changes are using best
                        practices, directly in workflow (e.g. AWS GP2 should be
                        GP3)
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Jira integration: </b> Inform product management of
                        cost impact of features in their workflow
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Reporting: </b> Daily, weekly and monthly custom
                        reports of all upcoming changes
                      </span>
                    </li>
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Team management: </b>Access to all teams and managers
                        with different access levels
                      </span>
                    </li>

                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Audit trails: </b>Track when and who made changes &
                        approved budgets
                      </span>
                    </li>

                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Custom price books: </b> Enterprise negotiated rates,
                        EDPs and EA discounts
                      </span>
                    </li>

                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>
                        <b>Security: </b>SOC2 Type II report access
                      </span>
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
                    For larger <b>Enterprises</b> with complex setups
                  </span>

                  <div className="action text">
                    <div>
                      Contact us on{" "}
                      <a href="mailto:hello@infracost.io?subject=Enterprise support">
                        {" "}
                        hello@infracost.io
                      </a>{" "}
                      for details
                    </div>
                  </div>
                </div>
                <div className="price__main-wrapper">
                  <ul>
                    <li>
                      <span>
                        <b>In addition to Infracost Cloud:</b>
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
                    <li>
                      <span className="icon primary">
                        <Check size={18} />
                      </span>
                      <span>Single Sign-On</span>
                    </li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <PricingQuestions />
        </div>
      </div>
    </PageLayout>
  );
}

export default Pricing;

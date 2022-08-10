import React from 'react';
import PageLayout from '../components/PageLayout';
import Check from '../components/icons/Check';
import UsedBy from '../components/UsedBy';


function Pricing() {
  return (
    <PageLayout
        title="Pricing"
      description="Cloud cost estimates for engineers"
        pageClass="pricing"
        hideCTA={true}>

      <div className="pricing-wrapper">
        <div className="container">
          <div className="intro">
            <h1 className="tagline">Pricing</h1>
            <p className="sub-tagline">Infracost provides cloud cost estimates for engineers</p>
          </div>

          <div className="plans">
            <div className="plan box">
              <div className="heading">
                <h2>Infracost Community</h2>
                <span className="price">Free</span>
              </div>
              <ul>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Open source</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Get cost breakdowns and diffs</span>
                </li>                
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>CI/CD integrations (GitHub, GitLab, Bitbucket, Azure DevOps...)</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Works with Terraform Cloud &amp; Terragrunt</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Use our hosted Cloud Pricing API or self-host</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Community supported</span>
                </li>
              </ul>
              <div className="action">
                <a href="/docs/" className="button primary">Get started</a>
              </div>
            </div>

            <div className="plan box">
              <div className="heading">
                <h2>Infracost Cloud <span className="coming-soon"></span></h2>
                <span className="price">Email <a href="mailto:hello@infracost.io?subject=Infracost Cloud">hello@infracost.io</a> for pricing</span>
              </div>
              <ul>
                <li>
                  <span><b>In addition to Infracost Community:</b></span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Team lead visibility across all changes. See most expensive pull requests</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Custom price books and discounts</span>
                </li>
                <li>
                  <span><b>Coming soon:</b></span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Team management</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Weekly email digests and notifications</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Recommendations in pull requests</span>
                </li>
              </ul>
              <div className="action">
                <a href="https://dashboard.infracost.io" className="button primary">Start free trial</a>
              </div>              
            </div>
          </div>
          <h3>Enterprise support can be added onto any plan, email <a href="mailto:hello@infracost.io?subject=Enterprise support">hello@infracost.io</a> for details.</h3>
        </div>
      </div>

      <UsedBy />

    </PageLayout>
  );
}

export default Pricing;

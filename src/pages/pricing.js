import React from 'react';
import PageLayout from '../components/PageLayout';
import Check from '../components/icons/Check';
import UsedBy from '../components/UsedBy';


function Pricing() {
  return (
    <PageLayout
        title="Pricing"
        description="Infracost is open source and free for the community."
        pageClass="pricing"
        hideCTA={true}>

      <div className="pricing-wrapper">
        <div className="container">
          <div class="intro">
            <h1 className="tagline">Pricing</h1>
            <p className="sub-tagline">Infracost is open source and free for the community</p>
          </div>

          <div className="plans">
            <div className="plan box">
              <div class="heading">
                <h2>Community</h2>
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
                  <span>CI/CD integrations (GitHub, GitLab, CircleCI, Bitbucket, Atlantis)</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Works with Terraform Cloud/Enterprise &amp; Terragrunt</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Community supported</span>
                </li>
              </ul>
              <div class="action">
                <a href="/docs/" className="button primary">Get started</a>
              </div>
            </div>

            <div className="plan box">
              <div class="heading">
                <h2>Enterprise <span class="coming-soon">(coming soon)</span></h2>
                <span className="price">Contact us for pricing</span>
              </div>
              <ul>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>All community features</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Multi-team support</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Management dashboards</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>On-premise source code integrations (GitHub, Bitbucket, GitLab)</span>
                </li>                      
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Self-hosted option</span>
                </li>
                <li>
                  <span className="icon primary"><Check size={18} /></span>
                  <span>Dedicated support &amp; SLA</span>
                </li>
              </ul>
              <div class="action">
                Contact us: <a href="mailto:hello@infracost.io?subject=Infracost Enterprise pricing">hello@infracost.io</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UsedBy />

    </PageLayout>
  );
}

export default Pricing;

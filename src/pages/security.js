import React from 'react';
import PageLayout from '../components/PageLayout';
import UsedBy from '../components/UsedBy';


function Security() {
  return (
    <PageLayout
        title="Security"
      description="Cloud cost estimates for engineers"
        pageClass="security"
        hideCTA={true}>

      <div className="security-wrapper">
        <div className="container">
          <div className="intro">
            <h1 className="tagline">Security at Infracost</h1>
            <p className="sub-tagline">
              Infracost’s software is trusted by thousands of companies around the world, including many of the Fortune 500.
            </p>
          </div>

          <div className="sections">
            <div className="box section">
              <div className="heading">
                <h2>Responsible disclosure</h2>
              </div>
              <div>
                <p>
                  If you believe you have found a security vulnerability within Infracost, please let us know right away. We'll try and fix the problem as soon as possible.
                </p>
                <p>
                  Do not report vulnerabilities using public GitHub issues. Instead, email <a href="mailto:security@infracost.io">security@infracost.io</a> with a detailed account of the issue. Please submit one issue per email, this helps us triage vulnerabilities.
                </p>
                <p>
                  Once we've received your email we'll keep you updated as we fix the vulnerability.
                </p>
              </div>
            </div>

            <div className="box section">
              <div className="heading">
                <h2>Compliance</h2>
              </div>
              <div>
                <p>
                  We are currently undergoing the process to achieve SOC 2 Type II compliance.
                </p>
                <p>
                  Please email <a href="mailto:hello@infracost.io">hello@infracost.io</a> for more details or to submit a security questionnaire.
                </p>
              </div>
            </div>

            <div className="box section">
              <div className="heading">
                <h2>Security process</h2>
              </div>
              <div>
                <h3>Infrastructure</h3>
                <p>
                  Infracost uses Amazon Web Services to host our applications. We utilize AWS services for Intrusion Detection and Audit Logging and utilize VPCs and Security Groups to isolate our infrastructure.
                  Production environments are separated from development environments.
                </p>
                <p>
                  We use Vanta to continually monitor our AWS configurations are meeting our high security standards.
                </p>
                <h3>Application</h3>
                <p>
                  Infracost uses code analysis and vulnerability scanning tools, including GitHub CodeQL, Dependabot and Snyk.
                </p>
                <p>
                  We implement best practices for our Software Development Lifecycle including continuous integration and deployment, review requests and code branch protection.
                </p>
                <h3>Database</h3>
                <p>
                  All customer data stored by Infracost is encrypted at rest and during transit. All Infracost's databases have regular backups enabled and periodically tested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UsedBy />

    </PageLayout>
  );
}

export default Security;

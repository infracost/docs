import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="sections">
          <div className="section">
            <h1>Documentation</h1>
            <ul>
              <li>
                <a href="/docs/">Getting started</a>
              </li>
              <li>
                <a href="/docs/integrations/cicd/">CI/CD integrations</a>
              </li>
              <li>
                <a href="/docs/supported_resources/">Supported resources</a>
              </li>
              <li>
                <a href="/docs/support/">Support</a>
              </li>
              <li>
                <a href="/docs/faq/">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="section">
            <h1>Community</h1>
            <ul>
              <li>
                <a href="/community-chat/" target="_blank" rel="noreferrer">
                  Join Slack
                </a>
              </li>
              <li>
                <a href="https://community-chat.infracost.io" target="_blank" rel="noreferrer">
                  Search Slack
                </a>
              </li>
              <li>
                <a href="https://github.com/infracost/infracost" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/infracost/infracost/#community-and-contributing"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a href="https://twitter.com/infracost" target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div className="section company">
            <h1>Company</h1>
            <ul>
              <li>
                <a href="/about/">About</a>
              </li>
              <li>
                <a href="/blog/">Blog</a>
              </li>
              <li>
                <a href="/security/">Security</a>
              </li>
              <li></li>
              <li>
                <a href="/contact/">Contact Us</a>
              </li>
              <li>
                <a href="https://infracost.io/join-the-team">Careers (we're hiring!)</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="company-info level">
          <div className="left">
            <span className="copyright">Copyright © {currentYear} Infracost Inc.</span>
          </div>
          <div className="right">
            <ul>
              <li>
                <a href="/docs/privacy-policy/#do-not-sell">Do not sell/share my personal information</a>
              </li>
              <li>
                <a href="/docs/privacy-policy/">Privacy policy</a>
              </li>
              <li>
                <a href="/docs/terms-of-service/">Terms of service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

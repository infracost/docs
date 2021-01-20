import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="sections">
          <div className="section">
            <h4>Docs</h4>
            <ul>
              <li><a href="/docs">Getting started</a></li>
              <li><a href="/docs/integrations">CI/CD integrations</a></li>
              <li><a href="/docs/supported_resources">Supported resources</a></li>
              <li><a href="/docs/support">Support</a></li>
              <li><a href="/docs/faq">FAQ</a></li>
            </ul>
          </div>
          <div className="section">
            <h4>Community</h4>
            <ul>
              <li><a href="https://www.infracost.io/community-chat" target="_blank">Slack</a></li>
              <li><a href="https://github.com/infracost/infracost" target="_blank">GitHub</a></li>
              <li><a href="https://github.com/infracost/infracost/projects/2" target="_blank">Roadmap</a></li>
              <li><a href="https://github.com/infracost/infracost/blob/master/CONTRIBUTING.md" target="_blank">Contribute</a></li>
              <li><a href="https://github.com/infracost/infracost/issues" target="_blank">Issues</a></li>
            </ul>
          </div>
          <div className="section outreach">
            <h4>Outreach</h4>
            <ul>
              <li><a href="mailto:hello@infracost.io" target="_blank">hello@infracost.io</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="https://twitter.com/infracost" target="_blank">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="company-info level">
          <div className="left">
            <span className="copyright">Copyright © 2021 Infracost Inc.</span>
          </div>
          <div className="right">
            <ul>
              <li><a href="/docs/privacy-policy">Privacy policy</a></li>
              <li><a href="/docs/terms-of-service">Terms of service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

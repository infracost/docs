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
              <li><a href="/docs/support">Support</a></li>
              <li><a href="/docs/privacy-policy">Privacy policy</a></li>
              <li><a href="/docs/terms-of-service">Terms of service</a></li>
            </ul>
          </div>
          <div className="section">
            <h4>Community</h4>
            <ul>
              <li><a href="/community-chat" target="_blank">Slack</a></li>
              <li><a href="https://github.com/infracost/infracost" target="_blank">GitHub</a></li>
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
        <span className="copyright">Copyright © 2021 Infracost</span>
      </div>
    </footer>
  );
}

export default Footer;

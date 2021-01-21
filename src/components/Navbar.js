import React, { useState, useEffect } from 'react';
import SearchBar from '@theme/SearchBar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, {windowSizes} from '@theme/hooks/useWindowSize';
import GitHubStarCount from '../components/GitHubStarCount';

function Navbar({ isDocs }) {
  const { isClient } = useDocusaurusContext();

  const [atTop, setAtTop] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

  if (isClient) {
    const checkAtTop = () => {
      setAtTop(window.scrollY <= 64);
    }

    window.addEventListener('scroll', checkAtTop);
  }

  useLockBodyScroll(showSidebar);

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setShowSidebar(false);
    }
  }, [windowSize]);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  const hamburger = (
    <span className="hamburger" onClick={toggleSidebar}>
      <img src="/img/icons/hamburger.svg" alt="Menu" />
    </span>
  );

  const logo = (
    <a className="logo" href="/" aria-label="Infracost logo">
      <img src="/img/logo.svg" className="logo-large" alt="Infracost logo" />
    </a>
  );

  const topMenu = (
    <div className="menu">
      <a className="navbar-item navbar-link" href="/docs">Documentation</a>
      <a className="navbar-item navbar-link" href="/blog">Blog</a>
    </div>
  );

  const docs = (
    <>
      <a className="navbar-item" href="/docs">
        Documentation
      </a>
      <a className="navbar-item" href="/docs/integrations" target="">
        CI/CD integrations
      </a>
      <a className="navbar-item" href="/docs/supported_resources">
        Supported resources
      </a>
      <a className="navbar-item" href="/docs/support">
        Support
      </a>
      <a className="navbar-item" href="/docs/faq">
        FAQ
      </a>
    </>
  );


  const community = (
    <>
      <a className="navbar-item github" href="https://github.com/infracost/infracost" target="_blank" aria-label="Star us on GitHub">
        <img className="icon" src="/img/icons/github.svg" alt="GitHub icon" />
        <span className="link-text">GitHub</span>
        <GitHubStarCount />
      </a>
      <a className="navbar-item slack" href="https://www.infracost.io/community-chat" target="_blank" aria-label="Join our community slack">
        <img className="icon" src="/img/icons/slack.svg" alt="Slack icon" />
        <span className="link-text">Slack</span>
      </a>
    </>
  );

  const outreach = (
    <>
      <a className="navbar-item" href="mailto:hello@infracost.io" target="_blank">
        hello@infracost.io
      </a>
      <a className="navbar-item" href="/blog" target="">
        Blog
      </a>
      <a className="navbar-item" href="https://twitter.com/infracost" target="_blank">
        Twitter
      </a>
    </>
  );

  const getStarted = (
    <a href="/docs" className="get-started button primary small">Get started</a>
  );

  return (
    <nav className={`navbar ${atTop ? 'at-top': ''} ${showSidebar ? 'sidebar-open' : ''} ${isDocs ? 'docs' : ''}`}>
      <div className="container">
        <div className="top level">
          <div className="left">
            {hamburger}
            {logo}
            <div className="community">
              {community}
            </div>
          </div>
          <div className="right">
            {topMenu}
            {isDocs &&
              (
                <SearchBar
                handleSearchBarToggle={setIsSearchBarExpanded}
                isSearchBarExpanded={isSearchBarExpanded}
                />
              )
            }
          </div>
        </div>
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
        <div className="sidebar">
          <div className="container">
            <div className="header level">
              <div className="left">
                {hamburger}
              </div>
              <div className="right">
                {getStarted}
              </div>
            </div>
            <div className="sidebar-content">
              <div className="navbar-section">
                <h4>Docs</h4>
                {docs}
              </div>
              <div className="navbar-section">
                <h4>Community</h4>
                {community}
              </div>
              <div className="navbar-section">
                <h4>Outreach</h4>
                {outreach}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

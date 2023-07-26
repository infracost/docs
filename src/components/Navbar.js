import React, { useState, useEffect } from 'react';
import SearchBar from '@theme/SearchBar';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useWindowSize } from '@docusaurus/theme-common';
import { useNavbarSecondaryMenu, useLockBodyScroll, useHideableNavbar } from '@docusaurus/theme-common/internal';
import GitHubStarCount from '../components/GitHubStarCount';

function Navbar({ isDocs }) {
  const isBrowser = useIsBrowser();

  const [atTop, setAtTop] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const [mobileDocsSidebarState, setMobileDocsSidebarState] = useState(null); // 'show' | 'hide' or null

  if (isBrowser) {
    const checkAtTop = () => {
      setAtTop(window.scrollY <= 64);
    };

    window.addEventListener('scroll', checkAtTop);
  }

  useLockBodyScroll(showSidebar);

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize === 'desktop') {
      setShowSidebar(false);
    }
  }, [windowSize]);

  function resetMobileDocsSidebar() {
    setMobileDocsSidebarState(null);
  }

  function toggleSidebar() {
    resetMobileDocsSidebar();
    setShowSidebar(!showSidebar);
  }

  const docsMenu = useNavbarSecondaryMenu();

  useEffect(() => {
    if (
      isDocs &&
      showSidebar &&
      !!docsMenu.content &&
      mobileDocsSidebarState !== 'hide'
    ) {
      setMobileDocsSidebarState('show');
    }
  }, [showSidebar, docsMenu]);

  const { navbarRef } = useHideableNavbar(false);

  const hamburger = (
    <span className="hamburger" onClick={toggleSidebar}>
      <img src="/img/icons/hamburger.svg" alt="Menu" width={20} height={17} />
    </span>
  );

  const logo = (
    <a className="logo" href="/" aria-label="Infracost logo">
      <img
        src="/img/logo.svg"
        className="logo-large"
        alt="Infracost logo"
        width={118}
        height={24}
      />
    </a>
  );

  const topMenu = (
    <div className="menu">
      <a className="navbar-item navbar-link" href="/finops">
        Finops
      </a>
      <a className="navbar-item navbar-link" href="/products">
        Products
      </a>
      <a className="navbar-item navbar-link" href="/use-cases">
        Use Cases
      </a>
      <a className="navbar-item navbar-link" href="/pricing">
        Pricing
      </a>
      <a className="navbar-item navbar-link" href="/about">
        About
      </a>
      <a className="navbar-item navbar-link" href="/blog">
        Blog
      </a>
      <a className="navbar-item navbar-link" href="/docs">
        Docs
      </a>
      <a
        className="navbar-item navbar-link"
        href="https://dashboard.infracost.io"
      >
        Sign up / Log in
      </a>
    </div>
  );

  const docs = (
    <>
      <a className="navbar-item" href="/products">
        Products
      </a>
      <a className="navbar-item" href="/use-cases">
        Use Cases
      </a>
      <a className="navbar-item" href="/pricing">
        Pricing
      </a>
      <a className="navbar-item" href="/about">
        About
      </a>
      <a className="navbar-item" href="/blog">
        Blog
      </a>
      <a className="navbar-item" href="/docs">
        Docs
      </a>
      <a
        className="navbar-item navbar-link"
        href="https://dashboard.infracost.io"
      >
        Sign up / Log in
      </a>
    </>
  );

  const community = (
    <>
      <a
        className="navbar-item github"
        href="https://github.com/infracost/infracost"
        target="_blank"
        aria-label="Star us on GitHub"
      >
        <img
          className="icon"
          src="/img/icons/github.svg"
          alt="GitHub icon"
          width={24}
          height={24}
        />
        <span className="link-text">GitHub</span>
        <GitHubStarCount />
      </a>
      <a
        className="navbar-item slack"
        href="https://www.infracost.io/community-chat"
        target="_blank"
        aria-label="Join our community slack"
      >
        <img
          className="icon"
          src="/img/icons/slack.svg"
          alt="Slack icon"
          width={24}
          height={24}
        />
        <span className="link-text">Slack</span>
      </a>
    </>
  );

  const outreach = (
    <>
      <a
        className="navbar-item"
        href="mailto:hello@infracost.io"
        target="_blank"
      >
        hello@infracost.io
      </a>
      <a
        className="navbar-item"
        href="https://twitter.com/infracost"
        target="_blank"
      >
        Twitter
      </a>
    </>
  );

  const getStarted = (
    <a href="/docs" className="get-started button primary small">
      Get started
    </a>
  );

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${atTop ? 'at-top' : ''} ${
        showSidebar ? 'sidebar-open' : ''
      } ${isDocs ? 'docs' : ''}`}
    >
      <div className="container">
        <div className="top level">
          <div className="left">
            {hamburger}
            {logo}
            <div className="community">{community}</div>
          </div>
          <div className="right">
            {topMenu}
            {isDocs && (
              <SearchBar
                handleSearchBarToggle={setIsSearchBarExpanded}
                isSearchBarExpanded={isSearchBarExpanded}
              />
            )}
          </div>
        </div>
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
        <div className="sidebar">
          <div className="container">
            <div className="header level">
              <div className="left">{hamburger}</div>
              <div className="right">{getStarted}</div>
            </div>
            {mobileDocsSidebarState === 'show' ? (
              <MobileDocsSidebar
                content={docsMenu.content}
                onHide={() => setMobileDocsSidebarState('hide')}
              />
            ) : (
              <div className="sidebar-content">
                <div className="navbar-section">
                  {/* <h4>Docs</h4> */}
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileDocsSidebar({ content, onHide }) {
  return (
    <>
      <button type="button" className="back navbar-item" onClick={onHide}>
        ← Back to main menu
      </button>
      {content}
    </>
  );
}

export default Navbar;

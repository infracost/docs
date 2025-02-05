import React, { useState, useEffect } from 'react';
import SearchBar from '@theme/SearchBar';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useWindowSize } from '@docusaurus/theme-common';
import {
  useNavbarSecondaryMenu,
  useLockBodyScroll,
  useHideableNavbar,
} from '@docusaurus/theme-common/internal';
import GitHubStarCount from './GitHubStarCount';

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
    if (isDocs && showSidebar && !!docsMenu.content && mobileDocsSidebarState !== 'hide') {
      setMobileDocsSidebarState('show');
    }
  }, [showSidebar, docsMenu, mobileDocsSidebarState, isDocs]);

  const { navbarRef } = useHideableNavbar(false);

  const logo = (
    <a className="logo" href="/" aria-label="Infracost logo">
      <img
        src="/docs/img/logo-light.svg"
        className="logo-large"
        alt="Infracost logo"
        width={118}
        height={24}
      />
    </a>
  );

  const login = (
    <a className="infra-navbar__menu-item--login" href="https://dashboard.infracost.io">
      Sign up / Log in
    </a>
  );

  const menuItems = [
    {
      label: 'Products',
      groupItems: [
        {
          label: 'Product Overview',
          href: '/products/',
        },
        {
          label: 'Case Studies',
          href: '/bourne-leisure/',
        },
        {
          label: 'For FinOps',
          href: '/finops/',
        },
      ],
    },
    {
      label: 'Pricing',
      href: '/pricing/',
    },
    {
      label: 'Resources',
      groupItems: [
        {
          label: 'Docs',
          href: '/docs/',
        },
        {
          label: 'Resource Articles',
          href: '/resources/',
        },
        {
          label: 'FinOps Glossary',
          href: '/glossary/',
        },
        {
          label: 'FinOps Policies',
          href: '/finops-policies/',
        },
        {
          label: 'Blog',
          href: '/blog/',
        },
      ],
    },
    {
      label: 'About',
      groupItems: [
        {
          label: 'About Us',
          href: '/about/',
        },
        {
          label: 'Contact Us',
          href: '/contact/',
        },
      ],
    },
  ];

  const topMenu = (
    <div className="nav menu">
      {menuItems.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {item.href ? (
            <div className="infra-navbar__nav-item">
              <a className="infra-navbar__menu-item" href={item.href}>
                {item.label}
              </a>
            </div>
          ) : (
            <div className="infra-navbar__group">
              <div className="infra-navbar__group-title">
                {item.label} {caret}
              </div>
              <div className="infra-navbar__items">
                {item.groupItems.map((item) => (
                  <div className="infra-navbar__item" key={item.href}>
                    <a className="infra-navbar__item-a" href={item.href}>
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
      {!showSidebar ? <div className="infra-navbar__nav-item">{login}</div> : null}
    </div>
  );

  const community = (showSidebar) => (
    <>
      <a
        className="navbar-item github"
        href="https://github.com/infracost/infracost"
        target="_blank"
        aria-label="Star us on GitHub"
        rel="noreferrer"
      >
        <img
          className={`icon ${showSidebar ? '' : 'dark'}`}
          src="/docs/img/icons/github.svg"
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
        rel="noreferrer"
      >
        <img
          className="icon"
          src="/docs/img/icons/slack.webp"
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
        href="mailto:support@infracost.io"
        target="_blank"
        rel="noreferrer"
      >
        support@infracost.io
      </a>
      <a
        className="navbar-item"
        href="https://twitter.com/infracost"
        target="_blank"
        rel="noreferrer"
      >
        Twitter
      </a>
    </>
  );

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${atTop ? 'at-top' : ''} ${showSidebar ? 'sidebar-open' : ''} docs`}
    >
      <div className="container">
        <div className="top level">
          <div className="left">
            {logo}
            <div className="community">{community(showSidebar)}</div>
            <SearchBar
              handleSearchBarToggle={setIsSearchBarExpanded}
              isSearchBarExpanded={isSearchBarExpanded}
            />
          </div>
          <div className="right">
            {topMenu}
            <span className="hamburger filter-invert" onClick={toggleSidebar}>
              <img src="/docs/img/icons/hamburger.svg" alt="Menu" width={32} height={32} />
            </span>
          </div>
        </div>
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
        <div className="sidebar">
          <div className="container">
            <div className="header level">
              <div className="left">
                {mobileDocsSidebarState === 'show' ? (
                  <button
                    type="button"
                    className="back"
                    onClick={() => setMobileDocsSidebarState('hide')}
                  >
                    ← Back to main menu
                  </button>
                ) : (
                  <div className="infra-navbar__nav-item infra-navbar__menu-item--login-mobile">
                    {login}
                  </div>
                )}
              </div>
              <div className="right filter-invert">
                <span className="" onClick={toggleSidebar}>
                  <img src="/docs/img/icons/close.svg" alt="Menu" width={25} height={25} />
                </span>
              </div>
            </div>
            {mobileDocsSidebarState === 'show' ? (
              docsMenu.content
            ) : (
              <div className="sidebar-content">
                <div className="navbar-section">
                  {menuItems.map((item, index) => (
                    <div key={`${item.label}-${index}`}>
                      {item.href ? (
                        <div className="infra-navbar__nav-item">
                          <a className="infra-navbar__menu-item" href={item.href}>
                            {item.label}
                          </a>
                        </div>
                      ) : (
                        <MenuGroup item={item} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="navbar-section">
                  <h4>Community</h4>
                  {community(showSidebar)}
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

const caret = (
  <svg
    aria-hidden="true"
    focusable="false"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="infra-navbar__group-caret-icon"
  >
    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
  </svg>
);

const MenuGroup = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="infra-navbar__group">
      <div
        className="infra-navbar__group-title infra-navbar__group-title--with-caret"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <div
          className={`infra-navbar__group-caret ${
            isOpen ? `infra-navbar__group-caret--expanded` : ''
          }`}
        >
          {caret}
        </div>
      </div>
      {isOpen && (
        <div className="infra-navbar__items">
          {item.groupItems?.length &&
            item.groupItems.map((item) => (
              <div key={item.href} className="infra-navbar__item">
                <a className="infra-navbar__item-a" href={item.href}>
                  {item.label}
                </a>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

const path = require('path');

let infracostDashboardApiEndpoint = 'https://dashboard.api-dev.infracost.io';
if (process.env.NODE_ENV === 'production') {
  infracostDashboardApiEndpoint = 'https://dashboard.api.infracost.io';
}

module.exports = {
  title: 'Infracost',
  url: 'https://www.infracost.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'infracost',
  projectName: 'docs',
  customFields: {
    infracostDashboardApiEndpoint,
  },
  plugins: [
    [
      'docusaurus-plugin-plausible',
      {
        domain: 'infracost.io',
      },
    ]
  ],
  themeConfig: {
    image: 'img/social-image.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
      switchConfig: {
        darkIcon: ' ',
        darkIconStyle: {
          marginLeft: '-2px',
          backgroundImage: 'url("/img/sun.svg")',
          backgroundSize: 'contain',
          height: '14px',
          width: '14px',
        },
        lightIcon: ' ',
        lightIconStyle: {
          marginLeft: '4px',
          backgroundImage: 'url("/img/moon.svg")',
          backgroundSize: 'contain',
          height: '14px',
          width: '14px',
        },
      },
    },
    announcementBar: {
      id: 'support_us',
      content: '⭐️ If you like Infracost, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/infracost/infracost">GitHub</a>! ⭐️',
      backgroundColor: '#3578e5',
      textColor: '#fff',
    },
    navbar: {
      logo: {
        alt: 'Infracost logo',
        src: 'img/logo-light.svg',
        srcDark: 'img/logo-dark.svg'
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: `https://github.com/infracost/infracost`,
          className: 'navbar__github-icon',
          position: 'right',
          label: 'GitHub',
          'aria-label': 'Infracost GitHub repository',
        },
        {
          href: `https://www.infracost.io/community-chat`,
          className: 'navbar__slack-icon',
          position: 'right',
          label: 'Slack',
          'aria-label': 'Infracost Community Slack',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting started',
              to: 'docs/',
            },
            {
              label: 'CI/CD integrations',
              to: 'docs/integrations',
            },
            {
              label: 'Support',
              to: 'docs/getting_support',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://www.infracost.io/community-chat',
            },
            {
              label: 'GitHub',
              href: `https://github.com/infracost/infracost`,
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'hello@infracost.io',
              href: `mailto:hello@infracost.io`,
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/infracost',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Infracost`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
          `https://github.com/infracost/docs/edit/master`,
        },
        theme: {
          customCss: require.resolve('./src/css/index.css'),
        },
      },
    ],
  ],
};

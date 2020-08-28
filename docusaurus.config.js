const path = require('path');

const organizationName = 'aliscott';
const projectName = 'infracost';
const docsProjectName = 'infracost-docs';
const domain = 'docs.infracost.io';

module.exports = {
  title: 'Infracost',
  url: 'https://infracost.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName,
  projectName,
  plugins: [
    [
      'docusaurus-plugin-plausible',
      {
        domain,
      },
    ]
  ],
  themeConfig: {
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
          href: `https://github.com/${organizationName}/${projectName}`,
          className: 'navbar__github-icon',
          position: 'right',
          'aria-label': 'Infracost GitHub repository',
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
              label: 'Integrations',
              to: 'docs/integrations',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/Cu9ftEg',
            },
            {
              label: 'GitHub',
              href: `https://github.com/${organizationName}/${projectName}`,
            },
          ],
        },
        {
          title: 'More',
          items: [
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
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
          `https://github.com/${organizationName}/${docsProjectName}/edit/master/website/`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

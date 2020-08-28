module.exports = {
  title: 'Infracost',
  url: 'https://infracost.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'aliscott',
  projectName: 'infracost',
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
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/aliscott/infracost',
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
              to: 'docs/a',
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
              href: 'https://github.com/aliscott/infracost',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
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
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'getting_started',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/infracost/infracost-docs/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/infracost/infracost-docs/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

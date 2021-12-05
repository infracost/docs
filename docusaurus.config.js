const path = require('path');
const remarkExternalLinks = require('remark-external-links');

let infracostDashboardApiEndpoint = 'https://dashboard.api-dev.infracost.io';
if (process.env.NODE_ENV === 'production') {
  infracostDashboardApiEndpoint = 'https://dashboard.api.infracost.io';
}

module.exports = {
  title: 'Infracost',
  url: 'https://www.infracost.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  trailingSlash: false,
  favicon: 'img/favicon.png',
  organizationName: 'infracost',
  projectName: 'docs',
  customFields: {
    infracostDashboardApiEndpoint,
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/integrations',
            to: '/docs/integrations/cicd',
          },
          {
            from: '/docs/environment_variables',
            to: '/docs/integrations/environment_variables',
          },
          {
            from: '/docs/infracost_api',
            to: '/docs/integrations/infracost_api',
          },
          {
            from: '/docs/terraform_cloud_enterprise',
            to: '/docs/iac_tools/terraform_cloud_enterprise',
          },
          {
            from: '/docs/terragrunt',
            to: '/docs/iac_tools/terragrunt',
          },
          {
            from: '/docs/config_file',
            to: '/docs/multi_project/config_file',
          },
          {
            from: '/docs/report',
            to: '/docs/multi_project/report',
          },
          {
            from: '/docs/terraform_modules',
            to: '/docs/guides/terraform_modules',
          },
          {
            from: '/docs/supported_resources',
            to: '/docs/supported_resources/overview',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/social-image.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'support_us',
      content: '<span class="announcement-message">If you like Infracost, give it a <a target="_blank" rel="noopener noreferrer" href="https://github.com/infracost/infracost">star on GitHub</a>!<img src="/img/icons/star-white.svg" class="star-right" alt="Star icon" /></span>',
      backgroundColor: '#2A2A5B',
      textColor: '#EBEBF2',
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['hcl'],
    },
    gtag: {
      trackingID: 'G-9GFV9Z9NNZ',
      anonymizeIP: true,
    },
    algolia: {
      apiKey: 'eda298ffac1d3706d1c694cc83eff045',
      indexName: 'infracost',
      contextualSearch: false,
      searchParameters: {
        facetFilters: [],
      },
    },
    navbar: {
      logo: {
        alt: 'Infracost logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          to: 'blog',
          blog: 'blog',
          label: 'Blog',
          position: 'right'
        },
      ],
    },
    footer: {
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
              to: 'docs/integrations/cicd',
            },
            {
              label: 'Support',
              to: 'docs/support',
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
              label: 'Blog',
              to: 'blog/',
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
        blog: {
          blogDescription: 'Infracost blog - Cloud cost estimates for Terraform',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All posts',
          include: ['**/*.md', '**/*.mdx'],
          remarkPlugins: [[
            remarkExternalLinks,
            {
              rel: ['noopener'],
            }
          ]]
        },
        theme: {
          customCss: require.resolve('./src/css/index.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        }
      },
    ],
  ],
};

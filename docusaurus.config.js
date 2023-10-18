/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

require('dotenv').config();

module.exports = {
  title: 'Infracost',
  url: 'https://www.infracost.io',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  trailingSlash: true,
  favicon: 'img/favicon.png',
  organizationName: 'infracost',
  projectName: 'docs',
  customFields: {
    infracostDocsApiToken: process.env.INFRACOST_DOCS_API_TOKEN,
    infracostDashboardApiEndpoint: process.env.INFRACOST_DASHBOARD_API_ENDPOINT,
    infracostDashboardEndpoint: process.env.INFRACOST_DASHBOARD_ENDPOINT,
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/integrations',
            to: '/integrations/github_actions',
          },
          {
            from: ['/environment_variables', '/integrations/environment_variables'],
            to: '/features/environment_variables',
          },
          {
            from: '/infracost_api',
            to: '/integrations/infracost_api',
          },
          {
            from: '/terraform_cloud_enterprise',
            to: '/integrations/terraform_cloud_enterprise',
          },
          {
            from: '/terragrunt',
            to: '/features/terragrunt',
          },
          {
            from: '/config_file',
            to: '/features/config_file',
          },
          {
            from: '/report',
            to: '/features/cli_commands',
          },
          {
            from: '/supported_resources',
            to: '/supported_resources/overview',
          },
          {
            from: '/iac_tools/terraform_cloud_enterprise',
            to: '/integrations/terraform_cloud_enterprise',
          },
          {
            from: '/iac_tools/terragrunt',
            to: '/features/terragrunt',
          },
          {
            from: '/multi_project/config_file',
            to: '/features/config_file',
          },
          {
            from: '/features/config_file_template/',
            to: '/features/config_file',
          },
          {
            from: '/usage_based_resources/',
            to: '/features/usage_based_resources/',
          },
          {
            from: '/multi_project/report',
            to: '/features/cli_commands',
          },
          {
            from: '/terraform_modules',
            to: '/features/terraform_modules',
          },
          {
            from: '/guides/terraform_modules',
            to: '/features/terraform_modules',
          },
          {
            from: '/infracost_cloud/overview',
            to: '/infracost_cloud/get_started',
          },
          {
            from: '/integrations/jira',
            to: '/infracost_cloud/jira_integration',
          },
          {
            from: '/infracost_cloud/authentication',
            to: '/infracost_cloud/key_concepts',
          },
          {
            from: '/infracost_cloud/sso/overview',
            to: '/infracost_cloud/sso',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'docs/img/social-image.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    announcementBar: {
      id: 'support_us',
      content:
        '<span class="announcement-message">If you like Infracost, give it a <a target="_blank" rel="noopener noreferrer" href="https://github.com/infracost/infracost">star on GitHub</a>!<img src="/docs/img/icons/star-white.svg" class="star-right" alt="Star icon" /></span>',
      backgroundColor: '#2A2A5B',
      textColor: '#EBEBF2',
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['hcl'],
    },
    algolia: {
      appId: 'ERN68FLCI1',
      apiKey: 'e62759e664aae55a8bfef8e93ecf6111',
      indexName: 'infracost',
      contextualSearch: false,
      searchParameters: {
        facetFilters: [],
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `https://github.com/infracost/docs/edit/master`,
        },
        theme: {
          customCss: require.resolve('./src/css/index.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'G-9GFV9Z9NNZ',
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: 'GTM-NKN87ZL3',
        },
      },
    ],
  ],
};

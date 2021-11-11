module.exports = {
  someSidebar: [
    {
      type: 'doc',
      id: 'getting_started',
    },
    {
      type: 'doc',
      id: 'usage_based_resources',
    },
    {
      type: 'doc',
      id: 'faq',
    },
    {
      type: 'category',
      label: 'Supported resources',
      collapsed: false,
      items: [
        `supported_resources/overview`,
        'supported_resources/aws',
        'supported_resources/azure',
        'supported_resources/google',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/cicd',
        'integrations/environment_variables',
        'integrations/infracost_api',
      ],
    },
    {
      type: 'category',
      label: 'Infra-as-code tools',
      collapsed: false,
      items: [
        'iac_tools/terraform_cloud_enterprise',
        'iac_tools/terragrunt',
      ],
    },
    {
      type: 'category',
      label: 'Multi-project setups',
      collapsed: false,
      items: [
        'multi_project/config_file',
        'multi_project/report',
      ], 
    },
    {
      type: 'category',
      label: 'Cloud Pricing API',
      collapsed: true,
      items: [
        'cloud_pricing_api/api_usage',
        'cloud_pricing_api/self_hosted',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/v0.8_migration',
        'guides/v0.9_migration',
        `guides/advanced_usage`,
        'guides/terraform_modules',
      ],
    },
  ]
};

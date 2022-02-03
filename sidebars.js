module.exports = {
  someSidebar: [
    {
      type: 'doc',
      id: 'getting_started',
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/github_actions',
        'integrations/gitlab_ci',
        'integrations/atlantis',
        'integrations/azure_pipelines',
        'integrations/terraform_cloud_enterprise',
        'integrations/cicd',
        'integrations/environment_variables',
        'integrations/infracost_api',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/cli_commands',
        'features/config_file',
        'features/usage_based_resources',
        'features/share_links',
        'features/cost_policies',
        'features/terragrunt',
      ],
    },
    {
      type: 'category',
      label: 'Supported clouds',
      collapsed: true,
      items: [
        `supported_resources/overview`,
        'supported_resources/aws',
        'supported_resources/azure',
        'supported_resources/google',
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
        'guides/actions_migration',
        'guides/gitlab_ci_migration',
        'guides/atlantis_migration',
        'guides/azure_devops_migration',
        'guides/v0.8_migration',
        'guides/v0.9_migration',
        `guides/advanced_usage`,
        'guides/terraform_modules',
      ],
    },
    {
      type: 'doc',
      id: 'faq',
    },
    {
      type: 'doc',
      id: 'troubleshooting',
    },
  ]
};

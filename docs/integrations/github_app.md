---
slug: github_app
title: GitHub App
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost GitHub App is an automated integration meaning that Infracost runs on our infrastructure and we keep it uptodate. The GitHub App is part of [Infracost Cloud](/docs/infracost_cloud/get_started/), our paid SaaS product. If you prefer a manual integration where you maintain Infracost, see [GitHub Actions](https://github.com/infracost/actions/) integration.

We are currently working on our SOC 2 Type II compliance process, see our [security page](/security) for more details.

| 1. Install the Infracost GitHub App | 2. Get pull request comments |
|--------------|-----------|
<img src={useBaseUrl("img/screenshots/github-app-install.png")} alt="Install the GitHub App into any GitHub organization"/> | <img src={useBaseUrl("img/screenshots/github-app-comment.png")} alt="Infracost automatically leaves a comment on every pull request"/>

## Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

2. Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

  <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

3. Click on Integrations > GitHub and follow the wizard to select the repos you want to give Infracost access to.
    - If you use private git modules, add your private SSH key (RSA format is recommended) and/or Git HTTPS credentials so Infracost can clone the repos in the same way that Terraform does.
    - If you use private Terraform Registry modules, see [this page](/docs/features/terraform_modules/#terraform-registry-modules) to set the required environment variables in the integration settings page in Infracost Cloud.

4. If you need to customize how Infracost runs, add an `infracost.yml` [config file](/docs/features/config_file/) to the root of your repo. The GitHub App will automatically use that file if it's present. The app will also apply any usage values defined in the `infracost-usage-yml` [usage file](/docs/features/usage_based_resources/) at the root of the repo.

5. Open a test pull request and wait for Infracost to leave a pull request comment. The [Infracost Cloud dashboard](https://dashboard.infracost.io) should also show the cost estimate too.

6. When the pull request is merged the Infracost Cloud dashboard will show you the time it was merged, who approved it and who merged it.

## Pull request status

The Infracost GitHub App enables the [dashboard](https://dashboard.infracost.io/) to show you the status of pull requests so you can filter on them. You can also filter on the date range that the pull request was last updated, and the base branch that pull requests are being merged into (e.g. main, stage, production).

<img src={useBaseUrl("img/infracost-cloud/pull-request-status-filter.png")} alt="Create new organization" />

:::tip
If you don't use the GitHub App integration, [use our API](/docs/features/cli_commands/#pull-request-status) to set pull request statuses from your CI/CD system.
:::

The pull request status can be:
  - **open**: the pull request is currently open, thus if you want to review the most expensive pull requests that are in-flight, only focus on these.
  - **closed**: the pull request was closed without being merged. These pull requests can probably be ignored altogether as most of the time they're just noise.
  - **merged**: the pull request was merged into the base branch, these can be checked when auditing actual cloud costs to see what happened.
  - **deployed**: the pull request was deployed. This usually happens after the pull request was merged. The GitHub App integration does not yet set the deployed status, so you can [use our API](/docs/features/cli_commands/#pull-request-status) to set it.

## GitHub Enterprise

Our automated GitHub App integration works with both GitHub Enterprise Cloud and GitHub Enterprise Server. Directly integrating Infracost Cloud to GitHub Enterprise means you'll get the latest features, the fastest cost estimates and the most robust solution.

### GitHub Enterprise Cloud

Follow the same [usage steps](#usage) as the regular GitHub App above.

If you use the GitHub Enterprise "Enable IP allow list", you need to allow incoming traffic from `3.133.40.66` to your GitHub instance port 443 (or whatever port you use); this is the IP address used by Infracost Cloud services to call the integration.

If you have restricted out-going traffic from your instance, you need to allow traffic to be sent to `dashboard.api.infracost.io:443` too. If you can only do that by IP address (and not domains), you should whitelist `13.58.92.216`, `3.142.138.46` and `13.58.157.166` but we recommend you whitelist the domain as these IP addresses are likely to change.

### GitHub Enterprise Server

Email us at [hello@infracost.io](mailto:hello@infracost.io) to enable GitHub Enterprise Server in your Infracost Cloud account. This requires a meeting with your server admin so we can install the Infracost GitHub App in your GitHub organization.

## Migrating from GitHub Actions to GitHub App

We recommend enabling the GitHub App first, testing to ensure you're happy with it, then removing the Infracost GitHub Actions yaml configs from your repo.

---
slug: github_app
title: GitHub App
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost GitHub App is an automated integration meaning that Infracost runs on our infrastructure and we keep it uptodate. The GitHub App is part of [Infracost Cloud](/docs/infracost_cloud/get_started/), our paid SaaS product.

We are currently working on our SOC 2 Type II compliance process, see our [security page](/security) for more details.

| 1. Install the Infracost GitHub App | 2. Get pull request comments |
|--------------|-----------|
<img src={useBaseUrl("img/screenshots/github-app-install.png")} alt="Install the GitHub App into any GitHub organization"/> | <img src={useBaseUrl("img/screenshots/github-app-comment.png")} alt="Infracost automatically leaves a comment on every pull request"/>

## Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

2. Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

  <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

3. Click on Integrations > GitHub and follow the wizard to select the repos you want to give Infracost access to.
    - If you use private git modules, add your private SSH key (RSA format is recommended) so Infracost can clone the repos in the same way that Terraform does.
    - If you use private Terraform Registry modules, see [this page](/docs/features/terraform_modules/#terraform-registry-modules).
    - Email [hello@infracost.io](mailto:hello@infracost.io) if you use [GitHub Enterprise](https://github.com/enterprise) (where you have a dedicated instance of GitHub).

4. If you need to customize how Infracost runs, add an `infracost.yml` [config file](/docs/features/config_file/) to the root of your repo. The GitHub App will automatically use that file if it's present. The app will also apply any usage values defined in the `infracost-usage-yml` [usage file](/docs/features/usage_based_resources/) at the root of the repo.

5. Open a test pull request and wait for Infracost to leave a pull request comment. The [Infracost Cloud dashboard](https://dashboard.infracost.io) should also show the cost estimate too.

## Migrating from GitHub Actions to GitHub App
We recommend enabling the GitHub App first, testing to ensure you're happy with it, then removing the Infracost GitHub Actions yaml configs from your repo.

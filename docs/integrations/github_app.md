---
slug: github_app
title: GitHub App
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost GitHub App is an automated integration meaning that Infracost runs on our infrastructure and we keep it up to date. Infracost is trusted by thousands of companies around the world, including many of the Fortune 500. We are <a href="https://www.infracost.io/security/" target="_self" rel="">SOC 2 Type II</a> certified.

| 1. Install the Infracost GitHub App | 2. Get pull request comments |
|--------------|-----------|
<img src={useBaseUrl("img/screenshots/github-app-install.png")} alt="Install the GitHub App into any GitHub organization"/> | <img src={useBaseUrl("img/screenshots/github-app-comment.png")} alt="Infracost automatically leaves a comment on every pull request"/>

## Benefits

There are two key benefits of using the GitHub App over manual CI/CD integrations:
1. You can add Infracost to multiple repos with one click, no need to install or update CLI versions in your CI/CD pipeline.
2. Infracost runs faster as only changed folders are run based on the GitHub App events.

## Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

2. Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

  <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

3. Click on Org Settings > Integrations > GitHub and follow the wizard to select the repos you want to give Infracost access to.

4. If you use private modules:
    - For private **git modules**, add your private SSH key (RSA format is recommended) and/or Git HTTPS credentials so Infracost can clone the repos in the same way that Terraform does.

    - For private **registry modules**, see [this page](/docs/features/terraform_modules/#terraform-registry-modules) and set the required Terraform registry token and host in the integration settings page in Infracost Cloud.

5. If you need to customize how Infracost runs, add an `infracost.yml` or `infracost.yml.tmpl` [config file](/docs/features/config_file/) in the Repo > my repo > Settings tab, or to the root of your repo. The GitHub App will automatically use that file if it's present. The app will also apply any usage values defined in the `infracost-usage.yml` [usage file](/docs/features/usage_based_resources/) at the root of the repo.

6. Open a test pull request and wait for Infracost to leave a pull request comment. The [Infracost Cloud dashboard](https://dashboard.infracost.io) should also show the cost estimate too.

7. When the pull request is merged the Infracost Cloud dashboard will show you the time it was merged, who approved it, who merged it, and any labels associated with it on GitHub.

## GitHub Enterprise

Our automated GitHub App integration works with both GitHub Enterprise Cloud and GitHub Enterprise Server. Directly integrating Infracost Cloud to GitHub Enterprise means you'll get the latest features, the fastest cost estimates and the most robust solution.

### GitHub Enterprise Cloud

Follow the same [usage steps](#usage) as the regular GitHub App above.

#### Incoming traffic to GitHub
If you use the GitHub Enterprise "Enable IP allow list", the Infracost GitHub App will automatically add the required IP address to your GitHub organization's IP allow list. If you need to do that manually, please allow incoming traffic from `3.133.40.66` to your GitHub instance port 443 (or whatever port you use); this is the IP address used by Infracost Cloud services to call the integration.

#### Outgoing traffic from GitHub
If you have restricted out-going traffic from your instance, you need to allow traffic to be sent to `dashboard.api.infracost.io:443` too. If you can only do that by IP address (and not domains), you should whitelist `52.223.24.69`, and `76.223.127.201`.

### GitHub Enterprise Server

Email us at [hello@infracost.io](mailto:hello@infracost.io) to enable GitHub Enterprise Server in your Infracost Cloud account. This requires a meeting with your server admin so we can install the Infracost GitHub App in your GitHub organization.

Infracost Cloud optionally supports mTLS with GitHub Enterprise Server by using client certificates. If a client's GitHub Enterprise Server requires such a certificate, they have the option to supply Infracost with one. This certificate is securely stored and encrypted at rest. For each request sent to the client's GitHub Enterprise Server, Infracost Cloud will use this certificate. When Infracost Cloud instantiates its ephemeral isolated runners they use this certificate when scanning the code to provide cost estimates and when posting comments to the pull requests.

## How the GitHub App works

The GitHub App needs read access to code repos so it can run the CLI against them, and write access to pull requests so it can post the cost estimate comment. You can select the repos you would like to give access to the App.

Each time a pull request is opened or a new commit is pushed to open pull requests, the Infracost GitHub App shows the cost difference between the most recent commit of the pull request branch, and the merge base of the base branch. The merge base is the latest common commit of the pull request base and target branch. This mirrors GitHub's pull request diff logic and shows only the cost of 'what a pull request introduces'.

The GitHub App automatically reflects the following changes in Infracost:
- Repos that are **renamed** are automatically updated in Infracost.
- When a repo is **moved** from one GitHub Org to another, that change is reflected in Infracost. When the source and destination GitHub Orgs are in different Infracost Orgs, the move is also performed as long as the Infracost Cloud orgs are in the same Enterprise.
- Repos that are **deleted** or **archived** are marked as archived in Infracost and preserved for audit purposes. Their issues no longer show in the dashboard.

### Disable pull request comments

From the Org Settings > Integrations > GitHub App page, you can disable pull request comments so cost estimates, guardrails and tagging policies are only shown in Infracost Cloud. This enables you to test these features without impacting engineering workflows.

### GitHub Actions to App migration

1. Follow the [usage](#usage) docs to install the app. You can do this from the same Infracost organization you use already, and going into the Org Settings > Integrations page.
2. Test it by [sending a pull request](/docs/infracost_cloud/get_started/#4-send-a-pull-request).
3. Remove all Infracost steps from your GitHub Actions.

---
slug: gitlab_app
title: GitLab App (recommended)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost GitLab App is an automated integration meaning that Infracost runs on our infrastructure and we keep it up to date. Infracost is trusted by thousands of companies around the world, including many of the Fortune 500. We are [SOC 2 Type II](/security) certified.

| 1. Install the Infracost GitLab App | 2. Get merge request comments |
|--------------|-----------|
<img src={useBaseUrl("img/screenshots/gitlab-app-install.png")} alt="Install the GitLab App into any GitLab organization" width="100%"/> | <img src={useBaseUrl("img/screenshots/gitlab-app-comment.png")} alt="Infracost automatically leaves a comment on every merge request"/>

## Benefits

There are three key benefits of using the GitLab App over manual CI/CD integrations:
1. You can add Infracost to multiple repos with one click, no need to install or update CLI versions in your CI/CD pipeline.
2. Infracost runs significantly faster as only changed folders are run based on the GitLab App events.
3. If you use Infracost Cloud (our SaaS product), all features work without you needing to make any changes to your CI/CD pipelines. If you use CI/CD integrations, you should implement [these extra steps](/docs/guides/source_control_benefits/).

## Usage

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

2. Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

  <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

3. Click on Org Settings > Integrations > GitLab and follow the wizard to select the repos you want to give Infracost access to.

4. If you use private modules:
    - For private **git modules**, add your private SSH key (RSA format is recommended) and/or Git HTTPS credentials so Infracost can clone the repos in the same way that Terraform does.

    - For private **registry modules**, see [this page](/docs/features/terraform_modules/#terraform-registry-modules) and set the required Terraform registry token and host in the integration settings page in Infracost Cloud.

5. If you need to customize how Infracost runs, add an `infracost.yml` or `infracost.yml.tmpl` [config file](/docs/features/config_file/) in the Repo > my repo > Settings tab, or to the root of your repo. The GitLab App will automatically use that file if it's present. The app will also apply any usage values defined in the `infracost-usage.yml` [usage file](/docs/features/usage_based_resources/) at the root of the repo.

6. Open a test merge request and wait for Infracost to leave a merge request comment. The [Infracost Cloud dashboard](https://dashboard.infracost.io) should also show the cost estimate too.

7. When the merge request is merged the Infracost Cloud dashboard will show you the time it was merged, who approved it, who merged it, and any labels associated with it on GitLab.

## Merge request status

The Infracost GitLab App enables the [dashboard](https://dashboard.infracost.io/) to show you the status of merge requests so you can filter on them. You can also filter on the date range that the merge request was last updated, and the base branch that merge requests are being merged into (e.g. main, stage, production).

<img src={useBaseUrl("img/infracost-cloud/pull-request-status-filter.png")} alt="Pull request status filter" />

The merge request status can be:
  - **open**: the merge request is currently open, thus if you want to review the most expensive merge requests that are in-flight, only focus on these.
  - **closed**: the merge request was closed without being merged. These merge requests can probably be ignored altogether as most of the time they're just noise.
  - **merged**: the merge request was merged into the base branch, these can be checked when auditing actual cloud costs to see what happened.

## GitLab Enterprise and self-managed

Our automated GitLab App integration works with both GitLab Enterprise and GitLab self-managed installations too. Directly integrating Infracost Cloud to GitLab self-managed means you'll get the latest features, the fastest cost estimates and the most robust solution.

Follow the same [usage steps](#usage) as the regular GitLab App above but note that in the installation wizard, you will need to provide your GitLab's domain, and create a new OAuth application in GitLab. The Application ID and Secret from your OAuth application will be needed by Infracost Cloud.

### Incoming traffic to GitLab

If you use GitLab's IP allow-list to restrict access to your GitLab installation, you need to allow incoming traffic from `3.133.40.66` to your GitLab instance's port 443 (or whatever port you use); this is the IP address used by Infracost Cloud services to call the integration.

### Outgoing traffic from GitLab

If you have restricted out-going traffic from your instance, you need to allow traffic to be sent to `dashboard.api.infracost.io:443` too. If you can only do that by IP address (and not domains), you should whitelist `13.58.92.216`, `3.142.138.46` and `13.58.157.166` but we recommend you whitelist the domain as these IP addresses are likely to change.

### Other network/security requirements

Email us at [hello@infracost.io](mailto:hello@infracost.io) if you have custom network or security requirements, for example the use of TLS certificates, or private tunnels.

## How the GitLab App works

The GitLab App needs access to code repos so it can run the CLI against them, and post merge request comments with the cost estimate. Therefore the bot/user that is installing the GitLab App should have "Maintainer" access to repos; "Developer" and lower does not work as those roles are not authorized to create repo webhooks (that are used to notify Infracost Cloud about new merge requests).

Each time a merge request is opened or a new commit is pushed to open merge requests, the Infracost GitLab App shows the cost difference between the most recent commit of the merge request branch, and the merge base of the base branch. The merge base is the latest common commit of the merge request base and target branch. This mirrors GitLab's merge request diff logic and shows only the cost of 'what a merge request introduces'.

### Disable merge request comments

From the Org Settings > Integrations > GitLab App page, you can disable merge request comments so cost estimates, guardrails and tagging policies are only shown in Infracost Cloud. This enables you to test these features without impacting engineering workflows.

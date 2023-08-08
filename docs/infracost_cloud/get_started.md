---
slug: get_started
title: Get started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our SaaS product that builds on top of Infracost open source. It enables team leads, managers and FinOps practitioners to setup tagging policies, guardrails and best practices to help guide the team. For example, you can check for required tag keys/values, or suggest switching AWS GP2 volumes to GP3 as they are more performant and cheaper. See our [demo video](https://www.youtube.com/watch?v=IYyul9WX7Pw) to learn more.

<img src={useBaseUrl("img/infracost-cloud/dashboard-chart.png")} alt="Team visibility across all changes" />

### 1. Sign up or log in

Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

### 2. Create new organization

Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

<img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

### 3. Setup Infracost Cloud

Follow the onboarding wizard to setup Infracost Cloud. Infracost supports direct integration with GitHub and GitLab. We recommend these integrations as they are much simpler to setup, and faster to run.

:::note
If you do not use the GitHub App or GitLab App integrations, you need to implement [some extra steps](/docs/guides/source_control_benefits/) for Infracost Cloud features to work. If you run into any issues, check the [troubleshooting guide](/docs/troubleshooting/#6-infracost-cloud-dashboard) or join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄
:::

### 4. Send a pull request

Send a new pull request to change something in Terraform that costs money, Infracost should post a pull request comment in your CI/CD system.

### 5. See cost estimate in Infracost Cloud

Go to [**Infracost Cloud**](https://dashboard.infracost.io) > **your organization** > **Dashboard** to see your pull request on the chart and cost breakdowns by repo, pull request and user. Clicking on a chart dot shows the corresponding estimate so you can investigate deeper or talk to the people working on the change. You can also see all repos and their pull requests from the **Visibility** > **Pull requests** page.

<img src={useBaseUrl("img/infracost-cloud/pull-requests-tab.png")} alt="Infracost Cloud shows pull request cost changes" />

### 6. Add your team members

Use the Members page to [invite](/docs/infracost_cloud/key_concepts/#team-management) your team members to join your organization.

We also recommend setting up [tagging policies](/docs/infracost_cloud/tagging_policies/) and [guardrails](/docs/infracost_cloud/guardrails/).

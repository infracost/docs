---
slug: get_started
title: Get started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our SaaS product that builds on top of Infracost open source. It gives team leads, managers and FinOps practitioners dashboards, guardrails and centralized cost policies so they can help guide the team (e.g. switch AWS GP2 volumes to GP3). See our [demo video](https://www.youtube.com/watch?v=DDi6GE9RIik) to learn more.

<img src={useBaseUrl("img/infracost-cloud/dashboard-chart.png")} alt="Team visibility across all changes" />

### 1. Sign up or log in

Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

### 2. Create new organization

Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

<img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

### 3. Setup Infracost Cloud

Follow the onboarding wizard to setup Infracost Cloud. If you run into any issues, check the [troubleshooting guide](/docs/troubleshooting/#6-infracost-cloud-dashboard) or join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

### 4. Send a pull request

Send a new pull request to change something in Terraform that costs money, you should see a pull request comment in your CI/CD system.

If you do not use the `infracost comment` command in your CI/CD system, you can [upload Infracost JSON files](/docs/features/cli_commands/#upload-runs) to Infracost Cloud.

### 5. See cost estimate in Infracost Cloud

Go to [**Infracost Cloud**](https://dashboard.infracost.io) > **your organization** > **Dashboard** to see your pull request on the chart and cost breakdowns by repo, pull request and user. Clicking on a chart dot shows the corresponding estimate so you can investigate deeper or talk to the people working on the change.

<img src={useBaseUrl("img/infracost-cloud/dashboard-chart.png")} alt="Infracost Cloud dashboard showing pull request cost changes over the last 30 days" />

### 6. Add your team members

Use the Members page to [invite](/docs/infracost_cloud/key_concepts/#team-management) your team members to join your organization. You can also setup [reports](/docs/infracost_cloud/reports/) and [guardrails](/docs/infracost_cloud/guardrails/).

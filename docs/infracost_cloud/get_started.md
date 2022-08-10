---
slug: get_started
title: Get started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our SaaS product focused on team leads, managers and FinOps practitioners. Read our [announcement blog](/blog/aug-2022-update/) to learn about its benefits. It gives you visibility across all cost estimates and lets you and answer questions like:
1. What are the top pull requests that are going to increase/decrease costs the most? Who is working on them?
2. What were all the pull requests to the `main` branch on the date we had a spike in cloud costs?

<img src={useBaseUrl("img/infracost-cloud/dashboard.png")} alt="Team visibility across all changes" />

### 1. Sign up or log in

Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

### 2. Create new organization

Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

<img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

### 3. Setup Infracost Cloud

<ol type="i">
  <li>Switch to the desired organization</li>
  <li>Click on Org Settings</li>
  <li>Copy your Infracost API key, you will need it in Step 4</li>
  <li>Tick the box under Cost estimate dashboard. This instructs the Infracost CLI to send its <a href="/docs/features/cli_commands/#examples">JSON output</a> to Infracost Cloud (the JSON does not contain any cloud credentials or secrets).</li>
  <img src={useBaseUrl("img/infracost-cloud/org-api-key-tick.png")} alt="Get organization API key" />
</ol>

### 4. Update API key in CI/CD

If you are **already running Infracost in your CI/CD system**: 
- update the `INFRACOST_API_KEY` environment variable to your organization API key. Note that only API keys starting with `ico-` work with Infracost Cloud; if you have old API keys, discard them and use the one from your Org Settings page.
- ensure that the Infracost CLI version being used is v0.10.9 or later.

**Otherwise**, setup one of our [CI/CD integrations](/docs/integrations/cicd/) and set the `INFRACOST_API_KEY` environment variable to your organization API key.

### 5. Send a pull request

Send a new pull request to change something in Terraform that costs money, you should see a pull request comment in your CI/CD system.

### 6. See cost estimate in Infracost Cloud

Go to [**Infracost Cloud**](https://dashboard.infracost.io) > **your organization** > **Dashboard** to see your pull request on the chart and cost breakdowns by user, project and pull request. The dashboard provides visibility across all cost changes, clicking on the chart dots opens a new tab with the corresponding pull request so you can investigate deeper or talk to the people working on the change.

If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/infracost-cloud/dashboard-chart.png")} alt="Infracost Cloud dashboard showing pull request cost changes over the last 30 days" />

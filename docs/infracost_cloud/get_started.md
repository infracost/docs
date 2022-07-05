---
slug: get_started
title: Get started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our new hosted service. It enables team leads, managers and FinOps practitioners to have visibility across all cost estimates in CI/CD and answer questions like:
1. What are the top pull requests that are going to increase/decrease costs the most? Who is working on them?
2. What were all the pull requests to the `main` branch on the date we had a spike in cloud costs?

We're also working on enabling team leads to setup notifications of budget-breaking pull requests, and best practice recommendations directly in pull requests. Contact hello@infracost.io if you'd like to learn more.

<img src={useBaseUrl("img/infracost-cloud/runs.png")} alt="Team visibility across all changes" />

### 1. Sign up or log in

Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.

### 2. Create new organization

If you haven't done so already, create a new organization for your company.

<img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Team visibility across all changes" />

### 3. Get organization API key

Switch to the desired organization and from the top menu, go to Org Settings to copy your Infracost API key.

:::note
Only API keys starting with `ico-` work with Infracost Cloud. If you have old API keys, discard them and use the one from your Org Settings page.
:::

### 4. Update your CI/CD system

Setup one of our [CI/CD integrations](/docs/integrations/cicd/) and set the `INFRACOST_API_KEY` environment variable to your organization API key.

### 5. Enable Infracost Cloud

In your CI/CD integration, set the `INFRACOST_ENABLE_CLOUD=true` environment variable just for the `infracost diff` step. For example in GitHub Actions, this is needed:

```shell
- name: Run Infracost
  id: infracost-run
  run: |
    infracost diff --path=. \
        --format=json \
        --compare-to=/tmp/infracost-base.json \
        --out-file=/tmp/infracost.json
  env:
    INFRACOST_ENABLE_CLOUD: true
```

This instructs the Infracost CLI to send its [JSON output](/docs/features/cli_commands/#examples) to Infracost Cloud. This JSON output does not contain any cloud credentials or secrets.

### 6. Send a pull request

Send a pull request to test the setup.

### 7. See cost estimate in Infracost Cloud

Go to [Infracost Cloud](https://dashboard.infracost.io) > your organization > Projects to see the cost estimate from the pull request.

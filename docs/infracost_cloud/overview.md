---
slug: overview
title: Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our new hosted service. It enables team leads, managers and FinOps practitioners to have visibility across all cost estimates in CI/CD and answer questions like:
1. What are the top pull requests that are going to increase/decrease costs the most? Who is working on them?
2. What were all the pull requests to the `main` branch on the date we had a spike in cloud costs?

We're also working on enabling team leads to setup notifications of budget-breaking pull requests, and best practice recommendations directly in pull requests. Contact hello@infracost.io if you'd like to learn more.

<img src={useBaseUrl("img/infracost-cloud/runs.png")} alt="Team visibility across all changes" />

## Get started

1. Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in.

2. If you haven't done so already, create a new organization for your company and use that organization's API key in your CI/CD integration.

  <img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Team visibility across all changes" width="65%" />

3. Assuming you've already setup Infracost in your [CI/CD systems](/docs/integrations/cicd/), update just the `infracost diff` command so the environment variable `INFRACOST_ENABLE_CLOUD=true` is set just for that step. For example in GitHub Actions, this is needed:

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

  This instructs the Infracost CLI to sends its [JSON output](/docs/features/cli_commands/#examples) to Infracost Cloud. This JSON output does not contain any cloud credentials or secrets.

4. Send a pull request to test it.

5. Go to [Infracost Cloud](https://dashboard.infracost.io) > your organization > Projects to see the cost estimate from the pull request.

## Project names

Projects are a flexible concept in Infracost Cloud that are used to represent code repos, deployment environments, workspaces etc. Projects with the same name are grouped together. See the [project name docs](/docs/features/cli_commands/#project-names) for details on how you can customize them.

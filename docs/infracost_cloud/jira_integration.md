---
slug: jira_integration
title: Jira integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Connect Infracost Cloud to Jira to enrich your team's cost estimates with powerful contextual information. Our Jira integration provides an automated two-way connection that helps you better understand why your teams' cloud costs have changed.

Once enabled, our Jira integration updates Jira issues with Infracost cost estimates along with a direct link to our dashboard. Use this to dive into specific cloud costs impacted by engineering changes.

![jira issue](/img/jira/app-issue.png)

You'll also be able to view and action blocking [guardrails](docs/infracost_cloud/guardrails/) in pull requests.

![jira filter](/img/jira/app-guardrails.png)

We'll also add Jira metadata to any Infracost Cloud runs, meaning you can search, filter and analyze Infracost runs based on your team's Jira issues.

![dashboard](/img/jira/dashboard.png)

## Get started

Navigate to the **Integrations** tab under the organization settings page on Infracost Cloud.

![organization settings](/img/jira/0-organization-settings.png)

You'll need to create a Infracost Cloud service account token. This will authenticate your Jira instance with Infracost Cloud, enabling it to fetch cost estimates for pull requests.

![generate token](/img/jira/1-generate-token.png)

Click the generate token button and copy your service account token. Make sure to save this to a safe place as service account tokens are only shown once. If you lose your token you'll need to generate a new one, which will invalidate any prior tokens.

![copy token](/img/jira/2-copy-token.png)

Once you generate a token a status banner appears. This highlights if Jira has successfuly connected to Infracost Cloud. We'll check back here later to make sure everything looks good.

![integration status](/img/jira/3-integration-status.png)

Now let's head over to Atlassian to complete the setup. Click the install app button.

![install app](/img/jira/4-install-app.png)

This will take you an approval screen where you'll be able to select which server you want to install the Infracost Jira app into.

![select server](/img/jira/5-select-server.png)

Go ahead and install the app onto the server you want to link to your Infracost Cloud organization.

![success install](/img/jira/6-success-install.png)

Once installed you'll need to provide the Jira app your service account token, so that it can communicate with Infracost Cloud. Head over to the Manage Apps section of your Jira instance.

> **Note**: Configuring the Infracost App in Jira requires **Admin access**.

![manage apps](/img/jira/7-manage-apps.png)

Then select Infracost from the sidebar.

![select infracost](/img/jira/8-select-infracost.png)

Add your service account token into the input.

![add token](/img/jira/9-add-token.png)

Once you've saved your service account token, let's head back to Infracost Cloud. On our Jira integration page you should see a success banner.

![success status](/img/jira/10-success-status.png)

All pull requests moving forward will have a two-way link with Jira and Infracost Cloud. Pull requests in Infracost cloud will display a link to the Jira issue the pull request references.

![pull request link](/img/jira/11-pull-request.png)

Click this to navigate directly to the Jira issue, which should now display a Infracost sidebar item. This will list any pull requests that reference the issue, and their associated costs and guardrails.

![successful pr](/img/jira/13-successful-pr.png)

> **Note**: The first time that you view the sidebar in Jira, you'll be prompted to accept access before you can see pull requests.

![accept permissions](/img/jira/12-accept-permissions.png).

## Requirements

Once you've set up the Jira integration, all future pull requests will be synced with Jira from Infracost Cloud. Infracost detects Jira issues from VCS systems exactly the same way the official Jira GitHub connection does. It checks if a Jira issue key prefixes either:

1. A pull request title, e.g. _"TEST-2 my pull request title"_
2. A git commit message, e.g. _"TEST-2 my commit message."_
3. A git branch name, e.g. _"TEST-2-my-branch-name"_

## Migrating from our Legacy Jira integration

Users of our legacy Jira integrations (If you connected Infracost cloud to Jira before 02/06/2023) will not be able to upgrade automatically to Infracost's Jira app integration. Instead, users should contact [hello@infracost.io,](mailto:hello@infracost.io) and we'll help you migrate to the new integration. 

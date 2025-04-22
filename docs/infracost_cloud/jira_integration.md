---
slug: jira_integration
title: Jira integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Connect Infracost Cloud to Jira to enrich your team's cost estimates with powerful contextual information. Our Jira integration provides an automated two-way connection that helps you better understand why your teams' cloud costs have changed.

Once enabled, the Jira integration:
- **Updates Jira issues with cost estimates** along with a direct link to your Infracost Cloud dashboard. Use this to dive into specific cloud costs impacted by engineering changes.
  ![jira issue](/img/jira/app-issue.png)
- You'll also be able to **review and unblock pull requests** that triggered [guardrails](/docs/infracost_cloud/guardrails/).
  ![jira filter](/img/jira/app-guardrails.png)
- We'll also add Jira metadata to any Infracost Cloud estimate, meaning you can **search, filter and analyze costs** based on your team's Jira issues.
  ![dashboard](/img/jira/dashboard.png)

## Usage

1. In [Infracost Cloud](https://dashboard.infracost.io), go to the Org Settings page and click on the **Integrations** tab.
  ![organization settings](/img/jira/0-organization-settings.png)
2. You'll need to create a Infracost Cloud service account token. This will authenticate your Jira instance with Infracost Cloud, enabling it to fetch cost estimates for pull requests.
  ![generate token](/img/jira/1-generate-token.png)
3. Click the **Generate service token** button and copy your token. Make sure to save this to a safe place as service account tokens are only shown once. If you lose your token you'll need to generate a new one, which will invalidate any prior tokens.
  ![copy token](/img/jira/2-copy-token.png)
4. Once you generate the token, a status banner appears. This highlights if Jira has successfully connected to Infracost Cloud. We'll check back here later to make sure everything looks good.
  ![integration status](/img/jira/3-integration-status.png)
5. Click the install app button, this takes you over to Atlassian Jira to complete the setup.
  ![install app](/img/jira/4-install-app.png)
6. This will take you an approval screen where you'll be able to select which server you want to install the Infracost Jira app into.
  ![select server](/img/jira/5-select-server.png)
7. Go ahead and install the app onto the server you want to link to your Infracost Cloud organization.
  ![success install](/img/jira/6-success-install.png)
8. Once installed you'll need to provide the Jira app your Infracost service account token, so that it can communicate with Infracost Cloud. Head over to the Manage Apps section of your Jira instance.
  :::note
  Configuring the Infracost App in Jira requires **Admin access**.
  :::
  ![manage apps](/img/jira/7-manage-apps.png)
9. Then select Infracost from the sidebar.
  ![select infracost](/img/jira/8-select-infracost.png)
10. Add your Infracost service account token into the input.
  ![add token](/img/jira/9-add-token.png)
11. Once you've saved your service account token, let's head back to Infracost Cloud > Org Settings > Integrations > Jira. On the Jira integration page you should see a success banner.
  ![success status](/img/jira/10-success-status.png)
12. All pull requests moving forward will have a two-way link with Jira and Infracost Cloud. Pull requests in Infracost cloud will display a link to the Jira issue the pull request references.
  ![pull request link](/img/jira/11-pull-request.png)
13. Click the Jira issue button to navigate directly to the issue, which should now display an Infracost sidebar item.
  :::note
  The first time that you view the sidebar in Jira, you'll be prompted to accept access before you can see pull requests. Each user in Jira only needs to do this once.
  :::
  ![accept permissions](/img/jira/12-accept-permissions.png)
14. This Infracost sidebar will list any pull requests that reference the Jira issue, and their associated costs and guardrails.
  ![successful pr](/img/jira/13-successful-pr.png)

## Requirements

The Jira integration should work with Jira Cloud, Jira Data Center, and Jira Server. [Contact us](mailto:support@infracost.io) if you have any issues.

Once you've set up the Jira integration, all future pull requests will be synced with Jira from Infracost Cloud. Infracost detects Jira issues from VCS systems in the following ways:

1. A Jira issue key at the beginning of a string, e.g., _"TEST-2 my pull request title"_
2. A Jira issue key after a slash in a branch name, e.g., _"feature/TEST-2_some_description"_
3. A Jira issue key at the end of a string, e.g., _"Some description TEST-2"_
4. A Jira issue key within parentheses, e.g., _"Some description (TEST-2)"_

This detection works across pull request titles, commit messages, and branch names.

**Note:** Jira issue keys must follow the standard format of uppercase project key followed by a hyphen and number (e.g., "TEST-123"). Lowercase project keys (e.g., "test-123") will not be detected.

## Migration from legacy Infracost Jira integration

Users of our legacy Jira integrations (if you connected Infracost cloud to Jira before 2 June 2023) will not be able to upgrade automatically to Infracost's Jira app integration. Instead, users should [contact us](mailto:support@infracost.io) and we'll help you migrate to the new integration.

The new Jira integration does not currently have issue fields for costs so you cannot run manual queries or reports in Jira. We plan to add that in the future, please [contact us](mailto:support@infracost.io) if this is blocking your migration.

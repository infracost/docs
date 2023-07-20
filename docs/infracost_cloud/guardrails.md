---
slug: guardrails
title: Guardrails
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Guardrails help you control costs by monitoring pull requests (PRs) and triggering actions when your defined thresholds are exceeded. Once you define a cost or percentage-based threshold for the relevant repositories, projects, and branches, you can set up email, Slack, or Microsoft Teams notifications. You can also customize the PR comment (e.g. "This change exceeds the budget, please discuss with your team lead") or even block the PR until it has been reviewed.

<img src={useBaseUrl("img/infracost-cloud/guardrails/cost-saving.png")} alt="Cost savings from guardrails" />

Guardrails also have an audit trail of the pull requests that triggered them:

<img src={useBaseUrl("img/infracost-cloud/guardrails/guardrail-events.png")} alt="Guardrail events" />

## Usage

You can create multiple guardrails, for example one with a lower threshold that simply notifies team leads and FinOps, and another one with a very high threshold that blocks the pull request until it has been reviewed.

To create a guardrail, log in to [Infracost Cloud](https://dashboard.infracost.io) and go to the Governance > Guardrails page.

### 1. Scope of guardrail

Give your guardrail a name, and select the whether the guardrail should be evaluated against the pull request cost as a whole, or against projects individually.

[Projects](/docs/infracost_cloud/key_concepts/#projects) are an optional sub-grouping concept within a repo and can be mapped to things like workspaces (e.g., dev/stage/prod) or Terraform modules (e.g., auth/api/dashboard).

<img src={useBaseUrl("img/infracost-cloud/guardrails/name-and-scope.png")} alt="Guardrail name and scope" />

### 2. Pull requests to monitor

Usually users monitor all pull requests for the guardrails. However, you can also set filters, e.g. only monitor pull requests in certain repositories.

<img src={useBaseUrl("img/infracost-cloud/guardrails/pull-request-filters.png")} alt="Create a guardrail using pull request filters" />

### 3. Thresholds

Next you should select the thresholds that should trigger this guardrail, the three common use-cases are:
1. **Diff: Cost change**: triggered when costs are increased by more than this value, which protects against unexpected cost spikes. For example, trigger a guardrails whenever a pull request adds more than $2000 to the monthly costs.
2. **Diff: Cost change percentage**: similar to the above but using a percentage instead of a fixed value. For example, trigger a guardrails whenever a pull request adds more than 25% to the monthly costs.
3. **Budget: New monthly cost**: triggered when the new monthly cost exceeds this value, which protects against budgets being exceeded. For example, trigger a guardrails whenever the new monthly cost exceeds $10,000.

<img src={useBaseUrl("img/infracost-cloud/guardrails/thresholds.png")} alt="Set the thresholds that should trigger the guardrail" />

### 4. Notifications to send

You can select the users who should be emailed when a guardrail is triggered. You can also create a [Slack channel webhook](https://slack.com/intl/en-tr/help/articles/115005265063-Incoming-webhooks-for-Slack) and use that for notifications.

We recommend enabling the pull request option, so engineers are shown the guardrail information in the Infracost pull request comment too. The pull request option **only works** if you are using the [GitHub App](/docs/integrations/github_app), [GitLab App](/docs/integrations/gitlab_app), or the [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) command in CI/CD.

Regardless of which notification option you select, you can set a custom message to be included in them to give additional context or instructions. For example, you can describe why this guardrail is important or what will happen next after someone has reviewed the notification.

<img src={useBaseUrl("img/infracost-cloud/guardrails/notifications.png")} alt="Select the notifications that should be sent when the guardrail is triggered" />

#### Email

The following screenshot shows an example email notification.

<img src={useBaseUrl("img/infracost-cloud/guardrails/email.png")} alt="Example email notification" />

#### Slack

The following screenshot shows an example Slack notification.

<img src={useBaseUrl("img/infracost-cloud/guardrails/slack-message.png")} alt="Example Slack message" />

#### Microsoft Teams

Guardrails can send an email to Microsoft Teams [channel email addresses](https://support.microsoft.com/en-us/office/tip-send-email-to-a-channel-2c17dbae-acdf-4209-a761-b463bdaaa4ca), which will be sent to the corresponding channel. The [email screenshot](#email) above shows the content of the message.

#### Custom pull request message

The following screenshot shows an example pull request comment with a custom message.

<img src={useBaseUrl("img/infracost-cloud/guardrails/custom-pull-request-message.png")} alt="Example pull request comment with a custom message" />

### 5. Block pull requests

This feature works by failing the CI/CD pipeline that runs Infracost (`infracost comment` will `exit 1`). Depending on how you have configured your source control system this blocks the pull request from being merged, but your source control system admins can usually override this during urgent cases.

This feature only works if you are using the [GitHub App](/docs/integrations/github_app), [GitLab App](/docs/integrations/gitlab_app), or the [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) command in CI/CD.

#### Setup

To setup this feature, you should:

1. Enable the "Block pull request from being merged" option when you create the guardrail.

  <img src={useBaseUrl("img/infracost-cloud/guardrails/actions.png")} alt="Blocking pull requests" />

2. If you are using the GitHub App integration, in your GitHub repository, go to Settings > Branches > and tick the "Require status checks to pass before merging" option under Protect matching branches. Otherwise ensure that your CI/CD pipeline is blocking pull requests that fail the CI/CD pipeline as `infracost comment` command will `exit 1` when a guardrail triggers.

  <img src={useBaseUrl("img/infracost-cloud/guardrails/github-require-status-pass.png")} alt="Configure GitHub to require status checks to pass before pull requests can be merged" />

#### Example output

The following screenshot shows an example pull request that has been blocked due to a guardrail that was triggered.

<img src={useBaseUrl("img/infracost-cloud/guardrails/blocked-pull-request.png")} alt="Example pull request being blocked due to a triggered guardrail" />

### 5. Unblock pull requests

When a pull request (PR) is blocked by a guardrail, the email notification will now include a link to the PR page in Infracost Cloud. From there (as shown below), you can review the cost estimate, see details of the triggered guardrail, and unblock the PR.

If someone with admin access on GitHub overrides the guardrail and merges the PR, Infracost Cloud will send an additional email notification to the people subscribed to the guardrail. This provides everyone with visibility of the change, thus preventing surprises in the cloud bill.

<img src={useBaseUrl("img/infracost-cloud/guardrails/unblock-pr.png")} alt="Unblock pull requests" />

## How Guardrails work

Cost thresholds are currency-independent, a guardrail with a threshold of 2000 would be triggered by a pull request that increases your monthly costs by $2001 or €2001. 

The following example describes how guardrails work. Let's say you have two guardrails:
1. A guardrail called "20 percent threshold" that notified FinOps when a pull request (PR) increases costs by more than 20%. This keeps them in the loop and avoids surprising them as this is an anticipated change being made by engineering.
2. Another guardrail called "budget" that blocks the PR when the total cost goes over the budget, $10K/month. This enables the team lead to review and unblock the PR, and coordinate the budget increase with the management team.

When a new PR is opened that is below the threshold, both guardrails pass.
- When new commits are added to the open PR that exceed the 20% threshold, the first guardrail triggers and notifies the FinOps team.
- When more commits are added to the open PR that exceed the second threshold (budget), the second guardrail triggers and blocks the PR until it has been reviewed.
- When the PR is unblocked by a team lead in Infracost Cloud, it can be merged.
- Now if more commits are added to the open PR that increase the costs even further, the PR is not blocked by the guardrail as it has already been unblocked once. This reduces noise and prevents frustrating the engineering team as the team leads are now in the loop about the upcoming change.

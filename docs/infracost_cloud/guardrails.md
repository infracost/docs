---
slug: guardrails
title: Guardrails
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Guardrails help you control costs by monitoring pull requests and triggering actions when your defined thresholds are exceeded. Once you define a cost or percentage based threshold for the relevant repos, projects, and branches, you can specify actions including email or Slack notifications, or even commenting on or blocking pull requests.

<img src={useBaseUrl("img/infracost-cloud/guardrails/cost-saving.png")} alt="Cost savings from guardrails" />

Guardrails also have an audit trail of the pull requests that triggered them:

<img src={useBaseUrl("img/infracost-cloud/guardrails/guardrail-events.png")} alt="Guardrail events" />

## Usage

To create a guardrail, log in to [Infracost Cloud](https://dashboard.infracost.io) and go to the Guardrails page.

## 1. Pull requests to monitor and their thresholds

First you should select any filters for the pull requests that this guardrail will monitor, e.g. only monitor pull requests in certain repositories.

Next you should select the thresholds that should trigger this guardrail, the three common use-cases are:
1. **Total monthly cost exceeds the budget**: triggered when a pull request's monthly cost exceeds this value, which protects against monthly budgets being exceeded.
2. **Increases monthly cost by a fixed amount**: triggered when a pull request's monthly cost *increases* by more than this value, which protects against unexpected cost spikes.
3. **Increases monthly cost by percentage**: triggered when a pull request's monthly cost *increases* by more than this *percent*, which also protects against unexpected cost spikes.

<img src={useBaseUrl("img/infracost-cloud/guardrails/pull-request-filters-and-thresholds.png")} alt="Create a guardrail using pull request filters, and the thresholds that should trigger the guardrail" />

## 2. Notifications to send

You can select the users who should be emailed when a guardrail is triggered. You can also create a [Slack channel webhook](https://slack.com/intl/en-tr/help/articles/115005265063-Incoming-webhooks-for-Slack) and use that for notifications.

We recommend enabling the pull request option, so engineers are shown the guardrail information in the Infracost pull request comment too. The pull request option **only works** if you are using the [GitHub App](/docs/integrations/github_app) integration or the [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) command in CI/CD.

Regardless of which notification option you select, you can set a custom message to be included in them to give additional context or instructions. For example, you can describe why this guardrail is important or what will happen next after someone has reviewed the notification.

<img src={useBaseUrl("img/infracost-cloud/guardrails/notifications.png")} alt="Select the notifications that should be sent when the guardrail is triggered" />

### Email

The following screenshot shows an example email notification.

<img src={useBaseUrl("img/infracost-cloud/guardrails/email.png")} alt="Example email notification" />

### Slack

The following screenshot shows an example Slack notification.

<img src={useBaseUrl("img/infracost-cloud/guardrails/slack-message.png")} alt="Example Slack message" />

### Microsoft Teams

Guardrails can send an email to Microsoft Teams [channel email addresses](https://support.microsoft.com/en-us/office/tip-send-email-to-a-channel-2c17dbae-acdf-4209-a761-b463bdaaa4ca), which will be sent to the corresponding channel. The [email screenshot](#email) above shows the content of the message.

### Custom pull request message

The following screenshot shows an example pull request comment with a custom message.

<img src={useBaseUrl("img/infracost-cloud/guardrails/custom-pull-request-message.png")} alt="Example pull request comment with a custom message" />

## 3. Block pull requests

Use this option carefully. It works by failing the CI/CD pipeline that runs Infracost (`infracost comment` will `exit 1`). Depending on how you have configured your source control system this blocks the pull request from being merged, but your source control system admins can usually override this during urgent cases.

This feature only works if you are using the [GitHub App](/docs/integrations/github_app) integration or the [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) command in CI/CD.

### Setup

To setup this feature, you should:

1. Enable the "Block pull request from being merged" option when you create the guardrail.

  <img src={useBaseUrl("img/infracost-cloud/guardrails/actions.png")} alt="Blocking pull requests" />

2. If you are using the GitHub App integration, in your GitHub repository, go to Settings > Branches > and tick the "Require status checks to pass before merging" option under Protect matching branches. Otherwise ensure that your CI/CD pipeline is blocking pull requests that fail the CI/CD pipeline as `infracost comment` command will `exit 1` when a guardrail triggers.

  <img src={useBaseUrl("img/infracost-cloud/guardrails/github-require-status-pass.png")} alt="Configure GitHub to require status checks to pass before pull requests can be merged" />

### Example output

The following screenshot shows an example pull request that has been blocked due to a guardrail that was triggered.

<img src={useBaseUrl("img/infracost-cloud/guardrails/blocked-pull-request.png")} alt="Example pull request being blocked due to a triggered guardrail" />

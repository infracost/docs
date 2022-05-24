---
slug: slack
title: Slack
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To post cost estimates to Slack:

1. Create a [Slack Webhook](https://slack.com/intl/en-tr/help/articles/115005265063-Incoming-webhooks-for-Slack) in your workspace.
2. Use the `infracost output --format slack-message` [command](/docs/features/cli_commands/) to produce a Slack-flavored Markdown message. Slack message blocks have a 3000 char limit so the Infracost CLI automatically truncates the middle of the `slack-message` output format if required.
3. Post the message to Slack using `curl` from your CI/CD system. See [this example](https://gitlab.com/infracost/infracost-gitlab-ci/-/tree/master/examples/slack) for how to do this in GitLab, the same bash commands can be used in other systems.

If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/screenshots/post_to_slack.png")} alt="Example Infracost diff output" />

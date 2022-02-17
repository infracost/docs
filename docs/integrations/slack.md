---
slug: slack
title: Slack
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `infracost output --format slack-message` command can be used to produce a Slack-flavored Markdown message. Slack
message blocks have a 3000 char limit so the Infracost CLI automatically truncates the middle of the `slack-message`
output format if required. To use it, create
a [Slack Webhook](https://slack.com/intl/en-tr/help/articles/115005265063-Incoming-webhooks-for-Slack) and follow the
CI/CD integration docs to post a comment to a Slack channel.

<img src={useBaseUrl("img/screenshots/post_to_slack.png")} alt="Example Infracost diff output" />

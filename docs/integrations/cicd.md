---
slug: cicd
title: Other CI/CD integrations
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost CI/CD integrations can be used to automatically add a pull request comment showing the diff of monthly costs between the current and planned state. Minor cost increase/decrease changes can be ignored by setting a threshold for the comment to be added.

## Docker images

Infracost can be used in any CI/CD system using our CI [Docker images](https://hub.docker.com/r/infracost/infracost/tags):
- `infracost/infracost:ci-0.9` - **Recommended**. Use the latest 0.9.x version to pick up bug fixes and new resource costs.
- `infracost/infracost:ci-0.9.17` - Lock the version.
- `infracost/infracost:ci-latest` - Use the latest Infracost image. This might break when new minor or major versions are released.

The images contain the Infracost [CLI binary](https://github.com/infracost/infracost), [Compost](https://github.com/infracost/compost) and [comment.sh](https://github.com/infracost/infracost/blob/master/scripts/ci/comment.sh). Our [GitLab CI](https://gitlab.com/infracost/infracost-gitlab-ci) examples demonstrate how these components can be used in a composable way to post pull request comments in any CI/CD system.

## Jenkins

See the [Infracost Jenkins integration](https://github.com/infracost/infracost-jenkins/) for instructions and a demo.

<img src="https://raw.githubusercontent.com/infracost/infracost-jenkins/master/screenshot.png" width="550px" alt="Example Infracost diff output" />

## Bitbucket Pipelines

See the [Infracost Bitbucket Pipeline](https://bitbucket.org/infracost/infracost-bitbucket-pipeline) for instructions and a demo.

<img src="https://bitbucket.org/infracost/infracost-bitbucket-pipeline/raw/f90fbe9e8e93bd830575e24398c75255ba711c17/screenshot.png" width="550px" alt="Example Infracost diff output" />

## CircleCI

See the [Infracost CircleCI Orb](https://github.com/infracost/infracost-orb) for instructions and a demo of using it with GitHub and Bitbucket.

## Slack

The `infracost output --format slack-message` command can be used to produce a Slack-flavored Markdown message. Slack message blocks have a 3000 char limit so the Infracost CLI automatically truncates the middle of the `slack-message` output format if required. To use it, create a [Slack Webhook](https://slack.com/intl/en-tr/help/articles/115005265063-Incoming-webhooks-for-Slack) and follow the CI/CD integration docs to post a comment to a Slack channel.

<img src={useBaseUrl("img/screenshots/post_to_slack.png")} alt="Example Infracost diff output" />

## Scalr

See the [Scalr docs](https://docs.scalr.com/en/latest/cost_estimate.html) to enable the Infracost integration.

## Env0

See the [Env0 docs](https://docs.env0.com/docs/cost-monitoring#cost-estimation) to enable the Infracost integration.

## Spacelift

See the [Spacelift docs](https://docs.spacelift.io/vendors/terraform/infracost) to enable the Infracost integration.

## My CI/CD isn't supported

Please [create an issue](https://github.com/infracost/infracost/issues/new/choose); we'll try to prioritize it depending on the community feedback. There is already a request for [BuildKite](https://github.com/infracost/infracost/issues/499) and [Codefresh](https://github.com/infracost/infracost/issues/975). Please 👍 it if you'd like us to work on them sooner. You can also join our [community Slack channel](https://www.infracost.io/community-chat) if you like to work on an integration, the existing GitLab CI integration can act as a blueprint.

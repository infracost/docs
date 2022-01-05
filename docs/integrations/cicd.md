---
slug: cicd
title: Other CI/CD integrations
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost CI/CD integrations can be used to automatically add a pull request comment showing the diff of monthly costs between the current and planned state. Minor cost increase/decrease changes can be ignored by setting a threshold for the comment to be added.

## Docker images

Infracost can be used in any CI/CD system using our CI [Docker images](https://hub.docker.com/r/infracost/infracost/tags):
- `infracost/infracost:ci-0.9` - **Recommended**. Use the latest 0.9.x version to pick up bug fixes and new resource costs.
- `infracost/infracost:ci-0.9.15` - Lock the version.
- `infracost/infracost:ci-latest` - Use the latest Infracost image. This might break when new minor or major versions are released.

The images contain the Infracost [CLI binary](https://github.com/infracost/infracost), [Compost](https://github.com/infracost/compost) and our [CI scripts](https://github.com/infracost/infracost/tree/master/scripts/ci).

## Azure DevOps

See the [Infracost Azure DevOps integration](https://github.com/infracost/infracost-azure-devops/) for instructions and demos using Azure DevOps Repos (git) and GitHub repos.

<img src="https://raw.githubusercontent.com/infracost/infracost-azure-devops/master/screenshot.png" width="700px" alt="Example Infracost diff output" />

## Jenkins

See the [Infracost Jenkins integration](https://github.com/infracost/infracost-jenkins/) for instructions and a demo.

<img src="https://raw.githubusercontent.com/infracost/infracost-jenkins/master/screenshot.png" width="550px" alt="Example Infracost diff output" />

## Bitbucket Pipelines

See the [Infracost Bitbucket Pipeline](https://bitbucket.org/infracost/infracost-bitbucket-pipeline) for instructions and a demo.

<img src="https://bitbucket.org/infracost/infracost-bitbucket-pipeline/raw/f90fbe9e8e93bd830575e24398c75255ba711c17/screenshot.png" width="550px" alt="Example Infracost diff output" />

## CircleCI

See the [Infracost CircleCI Orb](https://github.com/infracost/infracost-orb) for instructions and a demo of using it with GitHub and Bitbucket.

## Slack

All of the above CI/CD integrations support also posting the pull request comment to a Slack channel. To enable it, create a [Slack Webhook](https://slack.com/intl/en-tr/help/articles/115005265063-Incoming-webhooks-for-Slack) and set its value to the `SLACK_WEBHOOK_URL` environment variable.

<img src={useBaseUrl("img/screenshots/post_to_slack.png")} alt="Example Infracost diff output" />

## CI/CD troubleshooting

Please try the following steps and if that doesn't help, [create an issue](https://github.com/infracost/infracost/issues/new/choose) or join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.

1. Set the [`INFRACOST_LOG_LEVEL`](/docs/integrations/environment_variables#infracost_log_level) environment variable to `debug` in case that provides more useful details. For Atlantis, also set [`atlantis_debug=true`](https://github.com/infracost/infracost-atlantis/#atlantis_debug).
2. Check the Terraform version that Infracost is using matches the version you need. Use the [`INFRACOST_TERRAFORM_BINARY`](/docs/integrations/environment_variables/#infracost_terraform_binary) environment variable to change that.
3. Use `ls -lah` in the CI build to check for any `.terraform*` files/folders that might be confusing Terraform running in CI vs previous runs that were used to create them. Removing those files might help.
4. Check the [Terraform Cloud/Enterprise](/docs/integrations/terraform_cloud_enterprise) or [Terragrunt](/docs/features/terragrunt) docs pages if applicable.

## My CI/CD isn't supported

Please [create an issue](https://github.com/infracost/infracost/issues/new/choose); we'll try to prioritize it depending on the community feedback. There is already a request for [BuildKite](https://github.com/infracost/infracost/issues/499) and [Codefresh](https://github.com/infracost/infracost/issues/975). Please 👍 it if you'd like us to work on them sooner. You can also join our [community Slack channel](https://www.infracost.io/community-chat) if you like to work on an integration, the existing GitHub Actions integration can act as a blueprint.

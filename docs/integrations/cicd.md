---
slug: cicd
title: CI/CD integrations
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost CI/CD integrations can be used to automatically add a pull request comment showing the diff of monthly costs between the current and planned state. Minor cost increase/decrease changes can be ignored by setting a percentage threshold for the comment to be added.

Infracost can be used in any CI/CD system using the [infracost binary](https://github.com/infracost/infracost/releases) or the [infracost/infracost Docker image](https://hub.docker.com/r/infracost/infracost). You might also find our [CI diff script](https://github.com/infracost/infracost/tree/master/scripts/ci/diff.sh) useful; it's used in the following integrations.

## GitHub Action

See the [Infracost GitHub Action](https://github.com/marketplace/actions/infracost) for instructions, and a demo [here](https://github.com/infracost/gh-actions-demo).

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example Infracost diff output" />

## GitLab CI

See the [Infracost GitLab CI template](https://gitlab.com/infracost/infracost-gitlab-ci) for instructions, and a demo [here](https://gitlab.com/infracost/gitlab-ci-demo).

<img src="https://gitlab.com/infracost/infracost-gitlab-ci/-/raw/master/screenshot.png" width="550px" alt="Example Infracost diff output" />

## CircleCI

See the [Infracost CircleCI Orb](https://github.com/infracost/infracost-orb) for instructions; it supports GitHub and Bitbucket. A demo of the GitHub integration is [here](https://github.com/infracost/circleci-github-demo), and Bitbucket is [here](https://bitbucket.org/infracost/circleci-bitbucket-demo)

## Bitbucket Pipelines

See the [Infracost Bitbucket Pipeline](https://bitbucket.org/infracost/infracost-bitbucket-pipeline) for instructions, and a demo [here](https://bitbucket.org/infracost/circleci-bitbucket-demo).

<img src="https://bitbucket.org/infracost/infracost-bitbucket-pipeline/raw/f90fbe9e8e93bd830575e24398c75255ba711c17/screenshot.png" width="550px" alt="Example Infracost diff output" />

## Atlantis

See the [Infracost Atlantis integration](https://github.com/infracost/infracost-atlantis/) for instructions. There is a demo [here](https://github.com/infracost/infracost-atlantis/pull/2#issuecomment-773427685), expand the Show Output sections and scroll down to see the Infracost output.

<img src="https://raw.githubusercontent.com/infracost/infracost-atlantis/master/screenshot.png" width="550px" alt="Example Infracost diff output" />

## Jenkins

See the [Infracost Jenkins integration](https://github.com/infracost/infracost-jenkins/) for instructions, and a demo [here](https://github.com/infracost/jenkins-demo).

<img src="https://raw.githubusercontent.com/infracost/infracost-jenkins/master/screenshot.png" width="550px" alt="Example Infracost diff output" />

## Azure DevOps

See the [Infracost Azure DevOps integration](https://github.com/infracost/infracost-azure-devops/) for instructions. A demo of the Azure DevOps Repos (git) integration is [here](https://dev.azure.com/infracost/base/_git/azure-devops-repo-demo), and GitHub repos is [here](https://github.com/infracost/azure-devops-github-demo).

<img src="https://raw.githubusercontent.com/infracost/infracost-azure-devops/master/screenshot.png" width="700px" alt="Example Infracost diff output" />

## Terraform Cloud Run Tasks

See the [Run Tasks integration](/docs/iac_tools/terraform_cloud_enterprise#terraform-cloud-run-tasks) for instructions and the following screenshot for a demo. [Run Tasks](https://www.terraform.io/docs/cloud/workspaces/run-tasks.html) is a beta Terraform Cloud feature that can be used to integrate Infracost into the Terraform Cloud pipeline directly. This enables Infracost to work with Terraform Cloud natively, meaning you do not need to install/upgrade our CLI into your CI/CD systems.

<img src={useBaseUrl("img/screenshots/tfc_integration.png")} alt="Infracost running as a Run Task" width="550px" />

## Slack

All of the above CI/CD integrations support also posting the pull request comment to a Slack channel. To enable it, create a [Slack Webhook](https://slack.com/intl/en-tr/help/articles/115005265063-Incoming-webhooks-for-Slack) and set its value to the `SLACK_WEBHOOK_URL` environment variable.

<img src={useBaseUrl("img/screenshots/post_to_slack.png")} alt="Example Infracost diff output" />

## CI/CD troubleshooting

Please try the following steps and if that doesn't help, [create an issue](https://github.com/infracost/infracost/issues/new/choose) or join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.

1. Set the [`INFRACOST_LOG_LEVEL`](/docs/integrations/environment_variables#infracost_log_level) environment variable to `debug` in case that provides more useful details. For Atlantis, also set [`atlantis_debug=true`](https://github.com/infracost/infracost-atlantis/#atlantis_debug).
2. Check the Terraform version that Infracost is using matches the version you need. Use the [`INFRACOST_TERRAFORM_BINARY`](/docs/integrations/environment_variables/#infracost_terraform_binary) environment variable to change that.
3. Use `ls -lah` in the CI build to check for any `.terraform*` files/folders that might be confusing Terraform running in CI vs previous runs that were used to create them. Removing those files might help.
4. Check the [Terraform Cloud/Enterprise](/docs/iac_tools/terraform_cloud_enterprise) or [Terragrunt](/docs/iac_tools/terragrunt) docs pages if applicable.

## My CI/CD isn't supported

Please [create an issue](https://github.com/infracost/infracost/issues/new/choose); we'll try to prioritize it depending on the community feedback. There is already a request for [BuildKite](https://github.com/infracost/infracost/issues/499). Please 👍 it if you'd like us to work on them sooner. You can also join our [community Slack channel](https://www.infracost.io/community-chat) if you like to work on an integration, the existing integrations can act as a blueprint.

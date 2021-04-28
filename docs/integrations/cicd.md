---
slug: cicd
title: CI/CD integrations
---

Infracost CI/CD integrations can be used to automatically add a pull request comment showing the diff of monthly costs between the current and planned state. Minor cost increase/decrease changes can be ignored by setting a percentage threshold for the comment to be added.

Infracost can be used in any CI/CD system using [our binary](https://github.com/infracost/infracost/releases) or [Docker image](https://hub.docker.com/r/infracost/infracost). You might also find our [CI diff script](https://github.com/infracost/infracost/tree/master/scripts/ci/diff.sh) useful; it's used in the following integrations.

If you're upgrading your integrations from an older version to `v0.8.0`, please see the [**migration guide**](/docs/guides/v0.8_migration#cicd-integrations).

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

See the [Infracost Jenkins integration](https://github.com/infracost/infracost-jenkins/) for instructions.

<img src="https://raw.githubusercontent.com/infracost/infracost-jenkins/master/screenshot.png" width="550px" alt="Example Infracost diff output" />


## CI/CD troubleshooting

Please try the following steps and if that doesn't help, [create an issue](https://github.com/infracost/infracost/issues/new/choose) or join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.

1. Set the [`INFRACOST_LOG_LEVEL`](/docs/integrations/environment_variables#infracost_log_level) environment variable to `debug` in case that provides more useful details. For Atlantis, also set [`atlantis_debug=true`](https://github.com/infracost/infracost-atlantis/#atlantis_debug).
2. Check the Terraform version that Infracost is using matches the version you need. Use the [`INFRACOST_TERRAFORM_BINARY`](/docs/integrations/environment_variables/#infracost_terraform_binary) environment variable to change that.
3. Use `ls -lah` in the CI build to check for any `.terraform*` files/folders that might be confusing Terraform running in CI vs previous runs that were used to create them. Removing those files might help.
4. Check the [Terraform Cloud/Enterprise](/docs/iac_tools/terraform_cloud_enterprise) or [Terragrunt](/docs/iac_tools/terragrunt) docs pages if applicable.

## My CI/CD isn't supported

Please [create an issue](https://github.com/infracost/infracost/issues/new/choose); we'll try to prioritize it depending on the community feedback. There are already requests for [Jenkins](https://github.com/infracost/infracost/issues/406), [BuildKite](https://github.com/infracost/infracost/issues/499) and [Azure DevOps](https://github.com/infracost/infracost/issues/531). Please 👍 them if you'd like us to work on them sooner. You can also join our [community Slack channel](https://www.infracost.io/community-chat) if you like to work on an integration, the existing integrations can act as a blueprint.

Please email [hello@infracost.io](mailto:hello@infracost.io) if you'd like to discuss integrations with GitHub Enterprise, GitLab Enterprise Edition, or Bitbucket Data Center.

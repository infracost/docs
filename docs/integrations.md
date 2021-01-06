---
slug: integrations
title: CI/CD integrations
---

The Infracost CI/CD integration can be used to automatically add a pull request comment showing the cost estimate difference (similar to `git diff`) between the master branch and the working branch. You can also select to ignore changes with minor cost increase/decreases by setting a percentage threshold for the comment to be added - details are in each integration document.

Infracost can be used in any CI/CD system using [our binary](https://github.com/infracost/infracost/releases) or [Docker image](https://hub.docker.com/r/infracost/infracost). You might also find our [CI diff script](https://github.com/infracost/infracost/tree/master/scripts/ci) useful; it's used in the following integrations.

If you run into any issues with CI/CD integrations, please join our [community Slack channel](https://www.infracost.io/community-chat); we'd be happy to guide you through it.

## GitHub Action

See the [Infracost GitHub Action](https://github.com/marketplace/actions/run-infracost) for instructions, and a demo [here](https://github.com/infracost/gh-actions-demo)

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## GitLab CI

See the [Infracost GitLab CI template](https://gitlab.com/infracost/infracost-gitlab-ci) for instructions, and a demo [here](https://gitlab.com/infracost/gitlab-ci-demo).

<img src="https://gitlab.com/infracost/infracost-gitlab-ci/-/raw/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## CircleCI

See the [Infracost CircleCI Orb](https://github.com/infracost/infracost-orb) for instructions; it supports GitHub and Bitbucket. A demo of the GitHub integration is [here](https://github.com/infracost/circleci-github-demo), and Bitbucket is [here](https://bitbucket.org/infracost/circleci-bitbucket-demo)

## Bitbucket Pipelines

See the [Infracost Bitbucket Pipeline](https://bitbucket.org/infracost/infracost-bitbucket-pipeline) for instructions, and a demo [here](https://bitbucket.org/infracost/circleci-bitbucket-demo).


<img src="https://bytebucket.org/infracost/infracost-bitbucket-pipeline/raw/8fcac59619308deb44ebc11170bfec349e855ee6/screenshot.png" width="550px" alt="Example infracost diff usage" />

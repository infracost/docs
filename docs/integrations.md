---
slug: integrations
title: CI/CD integrations
---

Infracost can be used in CI/CD pipelines using the [`infracost` binary](https://github.com/infracost/infracost/releases) or [Docker image](https://hub.docker.com/r/infracost/infracost). You might also find our [CI diff script](https://github.com/infracost/infracost/tree/master/scripts/ci) useful; it's used in the following integrations.

If you run into any issues with CI/CD integrations, please join our [community Slack channel](https://www.infracost.io/community-chat); we'd be happy to guide you through it.

## GitHub Action

The [Infracost GitHub Action](https://github.com/marketplace/actions/run-infracost) can be used to automatically add a pull request comment showing the cost estimate difference (similar to `git diff`) between a pull request and the master branch whenever Terraform files change.

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## GitLab CI

The [Infracost GitLab CI template](https://gitlab.com/infracost/infracost-gitlab-ci) can be used to automatically add a merge request comment showing the cost estimate difference (similar to `git diff`) between a pull request and the master branch.

<img src="https://gitlab.com/infracost/infracost-gitlab-ci/-/raw/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## CircleCI

The [Infracost CircleCI Orb](https://github.com/infracost/infracost-orb) can be used to automatically add a pull request comment showing the cost estimate difference (similar to `git diff`) between a pull request and the master branch. It supports GitHub and BitBucket.

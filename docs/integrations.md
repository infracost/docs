---
slug: integrations
title: CI/CD integrations
---

## GitHub Action

The [Infracost GitHub Action](https://github.com/marketplace/actions/run-infracost) can be used to automatically add a pull request comment showing the cost estimate difference (similar to `git diff`) between a pull request and the master branch whenever Terraform files change.

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## GitLab CI

The [Infracost GitLab CI template](https://gitlab.com/infracost/infracost-gitlab-ci) can be used to automatically add a merge request comment showing the cost estimate difference (similar to `git diff`) between a pull request and the master branch.

<img src="https://gitlab.com/infracost/infracost-gitlab-ci/-/raw/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## CircleCI

Please check [this](https://github.com/infracost/infracost-orb) for our work-in-progress and subscribe to [this GitHub issue](https://github.com/infracost/infracost/issues/56) for updates.

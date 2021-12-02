---
slug: actions_migration
title: GitHub Actions migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate from our old [infracost-gh-actions](https://github.com/infracost/infracost-gh-action) repo to our new [actions](https://github.com/infracost/actions/) repo. The infracost-gh-actions repo will be deprecated in the next Infracost release.

<img src={useBaseUrl("img/screenshots/actions-pull-request.png")} alt="Cost estimate comment for multiple projects" />

## What's new?

🚀 The new Infracost actions repo provides a composable way of using our actions in your workflow. These JavaScript (not Docker) actions simplify integrating Infracost into your GitHub Actions. In addition, we've added CI-specific output formats, a cost summary table, and different behaviors so you can control when comments are be posted.

### Composable actions

The actions repo contains two main actions as well as many examples demonstrating how they can be used in different workflows. One of the workflows this enables is matrix builds, where one cost estimate comment can be created from a group of Terraform projects. The new actions are:
- setup: install the Infracost CLI in your GitHub Actions workflow.
- comment: adds comments to pull requests.

Composable actions provide three key benefits:
1. No need for a bloated Docker image: The Infracost CLI setup has been split out from the Terraform/Terragrunt setup. This avoids needing a large Docker image and enables other actions to be used to to install required versions of [Terraform](https://github.com/hashicorp/setup-terraform) and [Terragrunt](https://github.com/autero1/action-terragrunt).
2. Safe version upgrades: the Infracost setup action has a `version` field for the CLI, which supports [Semver Ranges](https://www.npmjs.com/package/semver#ranges). So instead of a [full version](https://github.com/infracost/infracost/releases) string, you can use `0.9.x`. This enables you to automatically get the latest backward compatible changes in the 0.9 release (e.g. new resources/features and bug fixes) without worrying about CI/CD pipelines breaking.
3. Versioning for the integration itself: the integration has a version, `infracost/action@v1`, which also supports Semver. So you can use v1 to get backward compatible updates for the integration (e.g. bug fixes).

### CI-specific formats

The `infracost output` command now has two new format options: `github-comment` and `slack-message`. We will be adding formats for GitLab, Azure DevOps repos and Bitbucket later.

### Cost summary

As shown by in the screenshot at the top of this page, comments now include a summary table showing the total cost diff for any projects that have changed.

### Comment behaviors

The comment action includes a `behavior` and a `target` attribute.

Behavior describes how and when comments should be posted; we support four options:
- `update`: Create a single comment and update it on changes. This is the "quietest" option. The GitHub comments UI shows [what/when changed](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) when the comment is updated. Pull request followers will only be notified on the comment create (not updates), and the comment will stay at the same location in the comment history.
- `delete-and-new`: Delete previous cost estimate comments and create a new one. Pull request followers will be notified on each comment.
- `hide-and-new`: Minimize previous cost estimate comments and create a new one. Pull request followers will be notified on each comment.
- `new`: Create a new cost estimate comment. Pull request followers will be notified on each comment.

The `target-type` describes where the comment should be posted against, which can be either `pull-request` (default) or `commit`.

## Migration guide

1. Follow the [Quick start guide](https://github.com/infracost/actions/#quick-start) to see how the actions can be used together with `setup-terraform`.

2. Find [an example](https://github.com/infracost/actions/#examples) that is the closest to your use-case and adapt the example as required. We have developed examples for:

    - Terraform directory: a Terraform directory containing HCL code
    - Terraform plan JSON: a Terraform plan JSON file
    - Terragrunt: a Terragrunt project
    - Terraform Cloud/Enterprise: a Terraform project using Terraform Cloud/Enterprise
    - Multi-project using config file: multiple Terraform projects using the Infracost config file
    - Multi-project using build matrix: multiple Terraform projects using GitHub Actions build matrix
    - Multi-Terraform workspace: multiple Terraform workspaces using the Infracost config file
    - Private Terraform module: a Terraform project using a private Terraform module
    - Thresholds: only post a comment when cost thresholds are exceeded
    - Slack: send cost estimates to Slack

If you encounter any issues while migrating, please [create an issue](https://github.com/infracost/actions/issues/new) and we'll address them as soon as possible.

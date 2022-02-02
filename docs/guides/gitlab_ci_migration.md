---
slug: gitlab_ci_migration
title: GitLab CI migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate from our old [GitLab template](https://gitlab.com/infracost/infracost-gitlab-ci/-/blob/master/README-deprecated.md) to our new [GitLab pipeline examples](https://gitlab.com/infracost/infracost-gitlab-ci/).

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/screenshots/gitlab-comment.png")} alt="Cost estimate comment for multiple projects" />

## What's new?

🚀 The new Infracost GitLab CI repo provides a composable way of using Infracost in your workflow. It contains a collection of examples for integrating Infracost into your GitLab CI pipelines. In addition, we've added CI-specific output formats, a cost summary table, and different behaviors so you can control when comments are be posted.

### Composable example pipelines

The example pipelines demonstrate how Infracost can be used in different workflows in your `.gitlab-ci.yml` file, e.g. if you're using Terragrunt, Terraform Cloud or you have multiple Terraform projects in your repo.

The examples include steps to do the following: 
1. Run Terraform/Terragrunt to generate the Terraform plan JSONs.
2. Pass these plan JSON files to `infracost breakdown` to generate Infracost JSON output.
3. Run the Infracost `/script/ci/comment` script, which uses `infracost output` to combine the Infracost JSON files and post one comment on the merge request.

The examples provide three key benefits:
1. A smaller Docker image. The old images contained the Infracost CLI along with multiple versions of Terraform and Terragrunt. The `infracost:ci-*` Docker images only contains the Infracost CLI, [Compost](https://github.com/infracost/compost) and additional scripts that are useful in CI environments. For running Terraform and Terragrunt commands, the examples use the HashiCorp or alpine images. 
2. Safe version upgrades: You can specify the Infracost Docker image tag to lock to specific Infracost versions, or ensure you are getting updated bug fixes and new resources. For example:
  - `infracost/infracost:ci-0.9` (recommended) - Always use the latest 0.9.x version to pick up bug fixes and new resources.
  - `infracost/infracost:ci-0.9.18` - Lock the version.
  - `infracost/infracost:ci-latest` - Always use the latest Infracost image. This might break when new minor or major versions are released.
3. Easier debugging: The examples show how to generate the Terraform plan JSON files prior to running Infracost. This means that Infracost doesn't need to wrap the Terraform or Terragrunt binaries, so it's easy to debug any issues that are Terraform-related.

### CI-specific formats

The `infracost output` command now has two new format options: `gitlab-comment` and `slack-message`. We already have formats for GitHub which are used by our [GitHub actions](https://github.com/infracost/actions) and we will be adding formats for Azure DevOps repos and Bitbucket later.

### Cost summary

As shown by in the screenshot at the top of this page, comments now include a summary table showing the total cost diff for any projects that have changed.

### Comment behaviors

The Infracost image's `comment` script supports different commenting behaviors and target types that can be specified using  `COMMENT_BEHAVIOR` and `COMMENT_TARGET_TYPE` variables.

The `COMMENT_BEHAVIOR` describes how and when comments should be posted; we support three options for GitLab:
- `update`: Create a single comment and update it on changes. This is the "quietest" option. Merge request followers will only be notified on the comment create (not updates), and the comment will stay at the same location in the comment history.
- `delete-and-new`: Delete previous cost estimate comments and create a new one. Merge request followers will be notified on each comment.
- `new`: Create a new cost estimate comment. Merge request followers will be notified on each comment.

The `COMMENT_TARGET_TYPE` describes where the comment should be posted against, which can be either `merge-request` (default) or `commit`.

## Migration guide

Find [an example](https://gitlab.com/infracost/infracost-gitlab-ci#examples) that is the closest to your use-case and adapt the example as required. We have developed examples for:

  - Terraform directory: a Terraform directory containing HCL code
  - GitLab Terraform: a Terraform directory using the gitlab-terraform Docker image
  - Terraform plan JSON: a Terraform plan JSON file
  - Terragrunt: a Terragrunt project
  - Terraform Cloud/Enterprise: a Terraform project using Terraform Cloud/Enterprise
  - Multi-project using parallel matrix jobs: multiple Terraform projects using parallel matrix jobs
  - Multi-Terraform workspace: multiple Terraform workspaces using parallel matrix jobs
  - Private Terraform module: a Terraform project using a private Terraform module
  - Slack: send cost estimates to Slack

And cost policy examples:

  - Thresholds: only post a comment when cost thresholds are exceeded
  - Conftest: check Infracost cost estimates against policies using Conftest
  - OPA: check Infracost cost estimates against policies using Open Policy Agent
  - Sentinel: check Infracost cost estimates against policies using Hashicorp's Sentinel 

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

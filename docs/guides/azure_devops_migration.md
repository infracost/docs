---
slug: azure_devops_migration
title: Azure DevOps migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate from our old [pipeline bash scripts](https://github.com/infracost/infracost-azure-devops/blob/0c662db3982f53666e89e69a406c572f48dc5c33/README.md) to our new [Azure DevOps Extension](https://marketplace.visualstudio.com/items?itemName=Infracost.infracost-tasks).

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/screenshots/azure-pull-request.png")} alt="Cost estimate comment for azure pipeline" />

## What's new?

🚀 The new [Infracost Azure DevOps Extension](https://marketplace.visualstudio.com/items?itemName=Infracost.infracost-tasks) provides a set of Azure Pipelines tasks offering a composable way of using Infracost in your pipeline. These JavaScript tasks simplify integrating Infracost into your Azure pipeline. In addition, we've added Azure specific output formats, a cost summary table, and different behaviors, so you can control when comments are posted.

### Composable tasks

The [Azure DevOps Extension](https://marketplace.visualstudio.com/items?itemName=Infracost.infracost-tasks) contains two main tasks:

- InfracostSetup: install the Infracost CLI in your Azure pipeline.
- InfracostComment: add comments to pull requests.

We've complied an expansive list of [examples](https://github.com/infracost/infracost-azure-devops#examples) demonstrating how these task can be used in different pipelines.

Composable tasks provide three key benefits:

1. No need for a large setup steps: Installing the Infracost toolchain is now abstracted behind our nice new tasks, so there's no need for large "setup" steps that deal with pre-configuring Infracost dependencies.
2. Safe version upgrades: The InfracostSetup task has a `version` field for the CLI, which supports [SemVer ranges](https://www.npmjs.com/package/semver#ranges). So instead of a [full version](https://github.com/infracost/infracost/releases) string, you can use `0.9.x`. This enables you to automatically get the latest backward-compatible changes in the 0.9 release (e.g. new resources/features and bug fixes) without worrying about CI/CD pipelines breaking.
3. Versioning for the CI integration: Each Infracost task has a version, `InfracostSetup@0` & `InfracostComment@0`, which also supports Semver. So you can use `@0` to get backward-compatible updates for the extension (e.g. bug fixes).

### CI-specific formats

The `infracost output` command now has two new format options: `azure-repos-comment` and `slack-message`. We already have formats for GitHub & GitLab which are used by our [GitHub Actions](https://github.com/infracost/actions) and [GitLab CI](https://gitlab.com/infracost/infracost-gitlab-ci/) integrations.

### Cost summary

As shown in the screenshot at the top of this page, comments now include a summary table showing the total cost diff for any projects that have changed.

### Comment behaviors

The InfracostComment task includes a `behavior` and a `targetType` attributes.

Behavior describes how and when comments should be posted; we support four options:
- `update`: Create a single comment and update it on changes. This is the "quietest" option. For Azure DevOps Repos users, comments will simply be overwritten. GitHub users have additional UI that shows [what/when changed](https://docs.github.com/en/communities/moderating-comments-and-conversations/tracking-changes-in-a-comment) when the comment is updated. Pull request followers will only be notified on the comment create (not updates), and the comment will stay at the same location in the comment history.
- `delete-and-new`: Delete previous cost estimate comments and create a new one. Pull request followers will be notified on each comment.
- `hide-and-new`: Minimize previous cost estimate comments and create a new one. Pull request followers will be notified on each comment. This behavior is available only for GitHub.
- `new`: Create a new cost estimate comment. Pull request followers will be notified on each comment.

The `targetType` describes where the comment should be posted against, which can be either `pull-request` (default) or `commit`. `commit` is available only for GitHub.

## Migration guide

1. Follow the [Quick start guide](https://github.com/infracost/infracost-azure-devops/#quick-start) to see how the tasks can be used together with a simple `terraform plan` flow.
2. Find [an example](https://github.com/infracost/infracost-azure-devops/#examples) that is the closest to your use-case and adapt the example as required. We have developed examples for:

   - [Terraform directory](https://github.com/infracost/infracost-azure-devops/tree/master/examples/terraform-directory): a Terraform directory containing HCL code
   - [Terraform plan JSON](https://github.com/infracost/infracost-azure-devops/tree/master/examples/terraform-plan-json): a Terraform plan JSON file
   - [Terragrunt](https://github.com/infracost/infracost-azure-devops/tree/master/examples/terragrunt): a Terragrunt project
   - [Terraform Cloud/Enterprise](https://github.com/infracost/infracost-azure-devops/tree/master/examples/terraform-cloud-enterprise): a Terraform project using Terraform Cloud/Enterprise
   - [Multi-project using config file](https://github.com/infracost/infracost-azure-devops/tree/master/examples/multi-project/README.md#using-an-infracost-config-file): multiple Terraform projects using the Infracost [config file](https://www.infracost.io/docs/multi_project/config_file)
   - [Multi-project using ajob matrix](https://github.com/infracost/infracost-azure-devops/tree/master/examples/multi-project/README.md#using-azure-devops-pipeline-matrix-strategy): multiple Terraform projects using Azure pipeline job matrix strategy
   - [Multi-Terraform workspace](https://github.com/infracost/infracost-azure-devops/tree/master/examples/multi-terraform-workspace): multiple Terraform workspaces using the Infracost [config file](https://www.infracost.io/docs/multi_project/config_file)
   - [Private Terraform module](https://github.com/infracost/infracost-azure-devops/tree/master/examples/private-terraform-module)

   And cost policy examples:

   - [Thresholds](https://github.com/infracost/infracost-azure-devops/tree/master/examples/thresholds): only post a comment when cost thresholds are exceeded
   - [Conftest](https://github.com/infracost/infracost-azure-devops/tree/master/examples/conftest): check Infracost cost estimates against policies using Conftest
   - [OPA](https://github.com/infracost/infracost-azure-devops/tree/master/examples/opa): check Infracost cost estimates against policies using Open Policy Agent
   - [Sentinel](https://github.com/infracost/infracost-azure-devops/tree/master/examples/sentinel): check Infracost cost estimates against policies using Hashicorp's Sentinel

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

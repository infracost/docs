---
slug: config_file
title: Config file
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An Infracost config file can be created in each of your Terraform project repos to specify how Infracost should be run. This has three main advantages over CLI flags:
1. Not having to remember or specify flags for each run.
2. Ability to run Infracost with multiple Terraform projects or workspaces, and combine them into the same breakdown or diff output.
3. Enable multi-project or workspace runs in [CI/CD integrations](/docs/integrations/cicd).
4. Enable multi-directory [Terragrunt projects](/docs/iac_tools/terragrunt).

## Usage

1. Create an `infracost.yml` file in each of your Terraform project repos. Each project can have the parameters mentioned in the table below; you might find the following [examples](#examples) helpful.
  ```yml
  version: 0.1

  projects:
    - path: path/to/my_terraform
      # other params
    - path: another/project
  ```
2. Pass the file to the `infracost breakdown` or `infracost diff` using the `--config-file` option. This flag should not be confused with the `--usage-file` option that is used to define resource [usage](/docs/usage_based_resources) estimates.

| Parameter             | Description      | Notes |
| ---                   | ---              | ---   |
| `path`                  | Path to the Terraform directory or JSON/plan file. A path can be repeated with different parameters, e.g. for multiple workspaces. | Required |
| `usage_file`          | Path to Infracost usage file that specifies values for [usage-based resources](/docs/usage_based_resources). If you are using the same usage file for each project, you can specify per-project usages using the [`projects` array in the usage file](/docs/usage_based_resources#multi-project-setups). | Not required |
| `terraform_binary`      | Used to change the path to the `terraform` or `terragrunt` binary | Not required, e.g. can be set to `~/bin/terraform_0.13` or another path |
| `terraform_plan_flags`  | Flags to pass to `terraform plan` with Terraform directory paths | Not required. Can be space delimited, e.g. `-var-file=prod.tfvars -var-file=us-east.tfvars` |
| `terraform_workspace`   | Used to set the Terraform workspace | Not required. Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported" |
| `terraform_use_state`   | Use Terraform state instead of generating a plan, useful if you want to see the breakdown of the current Terraform state. | Not required. Applicable when path is a Terraform directory. Can't be used with the `diff` command. |
| `terraform_cloud_host`  | For Terraform Enterprise users, used to override the default `app.terraform.io` backend host | Not required |
| `terraform_cloud_token` | For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan | Not required. If [this](/docs/integrations/environment_variables#infracost_terraform_cloud_token) environment variable is set, that'll be used for all projects instead of this parameter |

## Examples

<Tabs
  defaultValue="multi-workspaces"
  values={[
    {label: 'Multi-workspaces', value: 'multi-workspaces'},
    {label: 'Multi-projects', value: 'multi-projects'},
  ]}>
  <TabItem value="multi-workspaces">

  ```yml
  version: 0.1

  projects:
    - path: examples/terraform
      terraform_plan_flags: -var-file=prod.tfvars -var-file=us-east.tfvars 
      terraform_workspace: prod

    - path: examples/terraform
      terraform_plan_flags: -var-file=stage.tfvars
      terraform_workspace: stage

    - path: examples/terraform
      terraform_workspace: dev
  ```
  </TabItem>
  <TabItem value="multi-projects">

  ```yml
  version: 0.1

  projects:
    - path: my/terraform/plans/project1.json
      usage_file: project1-usage.yml

    - path: my/terraform/plans/project2.json
      usage_file: project2-usage.yml
  ```
  </TabItem>
</Tabs>

If your requirements cannot be satisfied with a config file, please [create an issue](https://github.com/infracost/infracost/issues/new/choose) so we can understand the use-case. Also consider using [these bash](/docs/multi_project/report#bulk-run) scripts that demonstrate how Infracost commands can be combined.

## Precedence

Infracost configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. [Environment variables](/docs/integrations/environment_variables)
3. Config file

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

## Usage

1. Create an `infracost.yml` file in each of your Terraform project repos; you might find the following [examples](#examples) helpful.
  ```yml
  version: 0.1
  projects:
    - path: examples/terraform
  ```
2. Pass it to the `infracost breakdown` or `infracost diff` using the `--config-file` option. This flag should not be confused with the `--usage-file` option that is used to define resource [usage](/docs/usage_based_resources) estimates.

| Parameter             | Description | Notes |
| ---                   | ---         | ---   |
| path                  | | Required. |       
| usage_file            | | Not required. |
| terraform_binary      | | Not required. |
| terraform_plan_flags  | | Not required. |
| terraform_workspace   | | Not required. |
| terraform_use_state   | | Not required. |
| terraform_cloud_host  | | Not required. |
| terraform_cloud_token | | Not required. If the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable is set, that'll be used for all projects instead of this parameter. |

## Examples

<Tabs
  defaultValue="multi-workspaces"
  values={[
    {label: 'Multi-workspaces', value: 'multi-workspaces'},
    {label: 'Multi-projects', value: 'multi-projects'},
    {label: 'Terragrunt', value: 'terragrunt'},
  ]}>
  <TabItem value="multi-workspaces">

  ```yml
  version: 0.1
  projects:
    - path: examples/terraform
      terraform_plan_flags: -var-file=prod.tfvars -var-file=us-east.tfvars 
      terraform_workspace: prod
    - path: examples/terraform
      terraform_workspace: dev
  ```
  </TabItem>
  <TabItem value="multi-projects">

  ```yml
  version: 0.1
  projects:
    - path: tfplans/project1.json
      usage_file: project1-usage.yml
    - path: tfplans/project2.json
      usage_file: project2-usage.yml
  ```
  </TabItem>
  <TabItem value="terragrunt">

  ```yml
  version: 0.1
  projects:
    - path: examples/project
      terraform_binary: terragrunt
  ```
  </TabItem>
</Tabs>

## Precedence

Infracost configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. [Environment variables](/docs/integrations/environment_variables)
3. Config file

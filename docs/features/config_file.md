---
slug: config_file
title: Config file
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An Infracost config file can be created in each of your Terraform repos to specify how Infracost should be run. The main advantages of this over CLI flags are:
1. Not having to remember or specify flags for each run. Just run `infracost breakdown --config-file infracost.yml` instead.
2. Ability to run Infracost with multiple Terraform projects or workspaces, and combine them into the same breakdown or diff output.
3. Enable multi-project or workspace runs in [CI/CD integrations](/docs/integrations/cicd).
4. Enable multi-directory [Terragrunt projects](/docs/features/terragrunt).

If you're looking to combine cost estimates from multiple runs (e.g. from a CI build matrix), see the [`infracost output`](/docs/features/cli_commands/#combined-output-formats) command's docs.

## Precedence

Infracost configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. [Environment variables](/docs/features/environment_variables)
3. Config file
4. Infracost Cloud organization settings

## Usage

1. Create an `infracost.yml` file in the root of your repo. Each project can have the parameters mentioned in the table below; you might find the following [examples](#examples) helpful.
  ```yml
  version: 0.1

  projects:
    - path: dev
      name: development
      terraform_var_files:
        - dev.tfvars

    - path: prod
      name: production
      terraform_var_files:
        - prod.tfvars
  ```

| Parameter               | Description                                                                                                                                                                                                             | Notes                                                                                                                                                                             |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `path`                  | Path to the Terraform directory or JSON/plan file. A path can be repeated with different parameters, e.g. for multiple workspaces.                                                                                      | Required. The path is relative to the present working directory.                                                                                                                  |
| `exclude_paths`         | Array of paths (of directories) to exclude from evaluation.                                                                                                                                                             | Optional. Supports glob patterns too, e.g. `"app/*/ignore_dir"`.                                                                                                                  |
| `name`                  | Name of project to use in all outputs (CLI, CI/CD integrations and Infracost Cloud). See details about [repos and projects](/docs/infracost_cloud/key_concepts/#repos).                                                 | Optional. Defaults to code path, workspace or Terraform/Terragrunt module within a repo.                                                                                          |
| `usage_file`            | Path to Infracost usage file that specifies values for [usage-based resources](/docs/features/usage_based_resources)                                                                                                    | Optional                                                                                                                                                                          |
| `env`                   | Map of environment variables, also supports referencing existing environment variables.                                                                                                                                 | Optional. Useful if you want to define each project's AWS credentials used to [fetch data](/docs/features/usage_based_resources/#fetch-from-cloudwatch) from CloudWatch           |
| `terraform_vars`        | Array of input variables to use when parsing HCL, similar to Terraform's `-var` flag.                                                                                                                                   | Optional                                                                                                                                                                          |
| `terraform_var_files`   | Array of variable files to use when parsing HCL, similar to Terraform's `-var-file` flag.                                                                                                                               | Optional                                                                                                                                                                          |
| `terraform_workspace`   | Used to set the Terraform workspace                                                                                                                                                                                     | Optional. Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported"                                              |
| `terraform_cloud_host`  | For Terraform Enterprise users, used to override the default `app.terraform.io` backend host                                                                                                                            | Optional                                                                                                                                                                          |
| `terraform_cloud_token` | For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can automatically retrieve variables | Optional. If [this](/docs/features/environment_variables#infracost_terraform_cloud_token) environment variable is set, that'll be used for all projects instead of this parameter |

2. Run `infracost breakdown --config-file infracost.yml` or `infracost diff --config-file infracost.yml`. The `--config-file` option can be used alongside `--sync-usage-file` and `--show-skipped`.

## Examples

<Tabs
  defaultValue="mono-repo"
  values={[
    {label: 'Mono-repo', value: 'mono-repo'},
    {label: 'Multi-workspaces', value: 'multi-workspaces'},
    {label: 'Multi-plans', value: 'multi-plans'},
    {label: 'Terragrunt with multi-usage files', value: 'terragrunt-multi-usage'},
  ]}>
  <TabItem value="mono-repo">

  ```yml
  version: 0.1

  projects:
    - path: dev
      usage_file: dev/infracost-usage.yml
      env:
        AWS_PROFILE: my-dev

    - path: prod
      usage_file: prod/infracost-usage.yml
      env:
        AWS_ACCESS_KEY_ID: ${PROD_AWS_ACCESS_KEY_ID}
        AWS_SECRET_ACCESS_KEY: ${PROD_AWS_SECRET_ACCESS_KEY}
  ```
  </TabItem>

  <TabItem value="multi-workspaces">

  ```yml
  version: 0.1

  projects:
    - path: examples/terraform
      terraform_workspace: dev

    - path: examples/terraform
      terraform_workspace: stage
      terraform_var_files:
        - stage.tfvars

    - path: examples/terraform
      terraform_workspace: prod
      terraform_var_files:
        - prod.tfvars
        - us-east.tfvars
  ```
  </TabItem>
  <TabItem value="multi-plans">

  ```yml
  version: 0.1

  projects:
    - path: my/terraform/plans/project1.json
      name: project1
      usage_file: project1-usage.yml

    - path: my/terraform/plans/project2.json
      name: project2
      usage_file: project2-usage.yml
  ```
  </TabItem>
  <TabItem value="terragrunt-multi-usage">

  ```yml
  version: 0.1

  projects:
    - path: my/terragrunt/dev
      name: dev
      usage_file: dev-usage.yml

    - path: my/terragrunt/prod
      name: prod
      usage_file: prod-usage.yml
  ```
  </TabItem>
</Tabs>

If your requirements cannot be satisfied with a config file, please [create an issue](https://github.com/infracost/infracost/issues/new/choose) so we can understand the use-case. Also consider using [this bash script](/docs/troubleshooting/#multi-projects) that demonstrates how to generate plan JSON files for multiple projects and dynamically create a config file that can be used with Infracost.

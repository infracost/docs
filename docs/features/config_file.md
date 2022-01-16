---
slug: config_file
title: Multi-projects/workspaces
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An Infracost config file can be created in each of your Terraform repos to specify how Infracost should be run. The main advantages of this over CLI flags are:
1. Not having to remember or specify flags for each run. Just run `infracost breakdown --config-file infracost.yml` instead.
2. Ability to run Infracost with multiple Terraform projects or workspaces, and combine them into the same breakdown or diff output.
3. Enable multi-project or workspace runs in [CI/CD integrations](/docs/integrations/cicd).
4. Enable multi-directory [Terragrunt projects](/docs/iac_tools/terragrunt).

If you're looking to combine cost estimates from multiple runs (e.g. from a CI build matrix), see the [`infracost output`](/docs/features/cli_commands/#combined-output-formats) command's docs.

## Precedence

Infracost configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. [Environment variables](/docs/integrations/environment_variables)
3. Config file

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
| `usage_file`          | Path to Infracost usage file that specifies values for [usage-based resources](/docs/usage_based_resources) | Not required |
| `terraform_binary`      | Used to change the path to the `terraform` or `terragrunt` binary | Not required, e.g. can be set to `~/bin/terraform_0.13` or another path |
| `terraform_plan_flags`  | Flags to pass to `terraform plan` with Terraform directory paths | Not required. Can be space delimited, e.g. `-var-file=prod.tfvars -var-file=us-east.tfvars` |
| `terraform_workspace`   | Used to set the Terraform workspace | Not required. Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported" |
| `terraform_use_state`   | Use Terraform state instead of generating a plan, useful if you want to see the breakdown of the current Terraform state. | Not required. Applicable when path is a Terraform directory. Can't be used with the `diff` command. |
| `terraform_cloud_host`  | For Terraform Enterprise users, used to override the default `app.terraform.io` backend host | Not required |
| `terraform_cloud_token` | For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan | Not required. If [this](/docs/integrations/environment_variables#infracost_terraform_cloud_token) environment variable is set, that'll be used for all projects instead of this parameter |
| `env`                  | Any environment variables to pass when running `terraform` commands | Not required. These should be specified as a map and also supports referencing existing environment variables. This is useful if you want to pass different AWS credentials to different projects (see the Multi-workspaces example below). |

## Examples

<Tabs
  defaultValue="multi-workspaces"
  values={[
    {label: 'Multi-workspaces', value: 'multi-workspaces'},
    {label: 'Multi-projects', value: 'multi-projects'},
    {label: 'Terragrunt with multi-usage files', value: 'terragrunt-multi-usage'},
  ]}>
  <TabItem value="multi-workspaces">

  ```yml
  version: 0.1

  projects:
    - path: examples/terraform
      terraform_plan_flags: -var-file=prod.tfvars -var-file=us-east.tfvars 
      terraform_workspace: prod
      env:
        AWS_ACCESS_KEY_ID: ${PROD_AWS_ACCESS_KEY_ID}
        AWS_SECRET_ACCESS_KEY: ${PROD_AWS_SECRET_ACCESS_KEY}

    - path: examples/terraform
      terraform_plan_flags: -var-file=stage.tfvars
      terraform_workspace: stage
      env:
        AWS_ACCESS_KEY_ID: ${STAGE_AWS_ACCESS_KEY_ID}
        AWS_SECRET_ACCESS_KEY: ${STAGE_AWS_SECRET_ACCESS_KEY}

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
  <TabItem value="terragrunt-multi-usage">

  ```yml
  version: 0.1

  projects:
    - path: my/terragrunt/dev
      usage_file: dev-usage.yml

    - path: my/terragrunt/prod
      usage_file: prod-usage.yml
  ```
  </TabItem>
</Tabs>

If your requirements cannot be satisfied with a config file, please [create an issue](https://github.com/infracost/infracost/issues/new/choose) so we can understand the use-case. Also consider using the following bash script that demonstrate how Infracost commands can be combined.

## Bulk run

If using a config
The following bash script runs Infracost on all subfolders that have `.tf` files and outputs the combined results using the [`infracost output`](/docs/features/cli_commands/#combined-output-formats) command. You can customize it based on which folders should be excluded or how you run Infracost (e.g. pass `--terraform-plan-flags`).

```shell
#!/usr/bin/env bash

# Find all subfolders that have .tf files, but exclude "modules" folders, can be customized
tfprojects=$(find . -type f -name '*.tf' | sed -E 's|/[^/]+$||' | grep -v modules | sort -u)

# Run infracost on the folders individually
while IFS= read -r tfproject; do
  echo "Running infracost breakdown for $tfproject"
  filename=$(echo $tfproject | sed 's:/:-:g' | cut -c3-)

  # TODO: customize to how you run infracost, or run terraform first to generate a plan JSON file and pass that to --path
  infracost breakdown --path $tfproject --format json --out-file "$filename-infracost-out.json"
done <<< "$tfprojects"

# Run infracost output to merge the subfolder results
jsonfiles=($(find . -name "*-infracost-out.json" | tr '\n' ' '))
infracost output --format diff $(echo ${jsonfiles[@]/#/--path })

echo "Also saving the full breakdown in infracost-table.txt"
infracost output --format table $(echo ${jsonfiles[@]/#/--path }) --out-file=infracost-table.txt

# Remove temp json files
rm $jsonfiles
```

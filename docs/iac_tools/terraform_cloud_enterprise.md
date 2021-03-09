---
slug: terraform_cloud_enterprise
title: Terraform Cloud/Enterprise
---

The environment variables mentioned in this page can also be set in an Infracost [config file](/docs/multi_project/config_file).

## Terraform Cloud users

This section is only applicable for Terraform Cloud users.

Running Infracost locally requires no additional steps as your Terraform CLI config file is used to access the plan.

When running Infracost on CI/CD systems, you should **either**:
1. Set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
2. Set the Terraform environment variable [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file.

## Terraform Enterprise users

When running Infracost locally or on CI/CD systems, you should set **both** of the following environment variables:
1. `INFRACOST_TERRAFORM_CLOUD_TOKEN` to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
2. `INFRACOST_TERRAFORM_CLOUD_HOST` to your backend host, this overrides the default `app.terraform.io` value.

## Terraform workspaces

If you use multiple Terraform workspaces, use an Infracost [config file](/docs/multi_project/config_file) to define them; their results will be combined into the same breakdown or diff output.

If you'd like to select one workspace, you can do so by **either**:
1. using the `--terraform-workspace` flag.
2. setting the `INFRACOST_TERRAFORM_WORKSPACE` environment variable (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally).

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

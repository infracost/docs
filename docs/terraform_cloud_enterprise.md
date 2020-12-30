---
slug: /terraform_cloud_enterprise
title: Terraform Cloud/Enterprise
---

## Terraform Cloud users

This section is only applicable for Terraform Cloud users.

Running Infracost locally requires no additional steps as your Terraform CLI config file is used to access the plan.

When running Infracost on CI/CD systems, you should **either**:
1. Set the `TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
2. Set the Terraform environment variable [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file.

## Terraform Enterprise users

When running Infracost locally or on CI/CD systems, you should set the **both** of following environment variables:
1. `TERRAFORM_CLOUD_TOKEN` to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
2. `TERRAFORM_CLOUD_HOST` to your backend host, this overrides the default `app.terraform.io` value.

## Terraform workspaces

If you use multiple Terraform workspaces, set the Terraform environment variable [`TF_WORKSPACE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to select a workspace.

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported"; if you see this error, try running `unset TF_WORKSPACE`.

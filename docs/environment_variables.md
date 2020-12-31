---
slug: /environment_variables
title: Environment variables
---

Infracost uses a number of environment variables to customize various aspects of its behavior; these can be particularly useful in [CI/CD integrations](integrations).

### INFRACOST_API_KEY
Infracost API key, run `infracost register` to get one.

### INFRACOST_LOG_LEVEL
Can be set to `info` or `warn` in CI/CD systems to reduce noise, or `debug` to troubleshoot.

### INFRACOST_SKIP_UPDATE_CHECK
Set to `true` to skip the Infracost update check; can be useful in CI/CD systems. Be sure to upgrade regularly as we continually add new resources to Infracost.

### TERRAFORM_BINARY
Used to change the path to the `terraform` binary:
  ```sh
  TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir /path/to/code
  # or
  TERRAFORM_BINARY=terragrunt infracost --tfdir=/path/to/code
  ```

### TERRAFORM_CLOUD_TOKEN
For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan.

### TERRAFORM_CLOUD_HOST
For Terraform Enterprise users, used to override the default `app.terraform.io` backend host.

### Terraform environment variables
Standard Terraform [environment variables](https://www.terraform.io/docs/commands/environment-variables.html) such as `TF_WORKSPACE` and `TF_CLI_CONFIG_FILE` can also be added if required, for example:
```sh
TF_WORKSPACE=dev infracost --tfdir /path/to/code

TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost --tfdir /path/to/code
```

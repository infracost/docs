---
slug: /environment_variables
title: Environment variables
---

Infracost uses a number of environment variables to customize various aspects of its behavior; these can be particularly useful in [CI/CD integrations](integrations). Configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. Environment variables
3. [Configuration file](/docs/config_file)

### INFRACOST_API_KEY
Infracost API key, run `infracost register` to get one.

### INFRACOST_LOG_LEVEL
Can be set to `info` or `warn` in CI/CD systems to reduce noise, or `debug` to troubleshoot.

### INFRACOST_SKIP_UPDATE_CHECK
Set to `true` to skip the Infracost update check; can be useful in CI/CD systems. We recommend watching the Infracost repo for releases by going to the [repo](https://github.com/infracost/infracost) page, clicking on the Watch button, selecting Custom, then Releases and clicking on Apply. Be sure to upgrade regularly as we continually add new resources to Infracost.

### INFRACOST_TERRAFORM_BINARY
Used to change the path to the `terraform` binary, e.g.:
  ```sh
  INFRACOST_TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --terraform-dir /path/to/code
  # or
  INFRACOST_TERRAFORM_BINARY=terragrunt infracost --terraform-dir=/path/to/code
  ```

#### CI/CD integrations
If you're using a [CI/CD integration](integrations), our [Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the latest stable versions of terraform and terragrunt; so you can set this environment variable to:
- `terraform` (default, latest stable version of terraform)
- `terraform_0.14` (latest patch version of 0.14)
- `terraform_0.13` (latest patch version of 0.13)
- `terraform_0.12` (latest patch version of 0.12)
- `terragrunt` (latest patch version of 0.27, if you need other versions of Terragrunt in the Docker image, please create an [issue](https://github.com/infracost/infracost/issues/new/choose))

Infracost works with Terraform v0.12 and above.

### INFRACOST_TERRAFORM_WORKSPACE
Used to set the Terraform workspace (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally):
  ```sh
  INFRACOST_TERRAFORM_WORKSPACE=dev infracost --terraform-dir /path/to/code
  ```

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

### INFRACOST_TERRAFORM_CLOUD_TOKEN
For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan.

### INFRACOST_TERRAFORM_CLOUD_HOST
For Terraform Enterprise users, used to override the default `app.terraform.io` backend host.

### INFRACOST_SELF_HOSTED_TELEMETRY
Set to `false` to opt-out of telemetry when using a self-hosted Cloud Pricing API.

### Terraform environment variables
Standard Terraform [environment variables](https://www.terraform.io/docs/commands/environment-variables.html) such as `TF_CLI_CONFIG_FILE` can also be added if required, for example:
```sh
TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost --terraform-dir /path/to/code
```

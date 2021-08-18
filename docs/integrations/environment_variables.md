---
slug: environment_variables
title: Environment variables
---

The Infracost CLI uses a number of environment variables to customize various aspects of its behavior; these can be particularly useful in [CI/CD integrations](/docs/integrations/cicd). Configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. Environment variables
3. [Config file](/docs/multi_project/config_file)

### INFRACOST_API_KEY
Infracost API key, run `infracost register` to get one.

### INFRACOST_CURRENCY
The currency ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)) prices should be converted to. Defaults to USD.

### INFRACOST_LOG_LEVEL
Can be set to `info` or `warn` in CI/CD systems to reduce noise, or `debug` to troubleshoot. Turns off spinners in output.

### INFRACOST_SKIP_UPDATE_CHECK
Set to `true` to skip the Infracost update check; can be useful in CI/CD systems. We regularly add support for new resources so we recommend watching our repo for releases: goto the [repo](https://github.com/infracost/infracost) page, click on the Watch button > select Custom > Releases and click on Apply. Be sure to upgrade regularly.

### INFRACOST_TERRAFORM_WORKSPACE
Used to set the Terraform workspace (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally). The `--terraform-workspace` flag can also be used.
  ```shell
  INFRACOST_TERRAFORM_WORKSPACE=dev infracost breakdown --path /path/to/code
  ```

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

### INFRACOST_TERRAFORM_CLOUD_TOKEN
For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan.

### INFRACOST_TERRAFORM_CLOUD_HOST
For Terraform Enterprise users, used to override the default `app.terraform.io` backend host.

### INFRACOST_TERRAFORM_BINARY
Used to change the path to the `terraform` binary, e.g.:
  ```shell
  INFRACOST_TERRAFORM_BINARY=~/bin/terraform_0.13 infracost breakdown --path /path/to/code
  # or
  INFRACOST_TERRAFORM_BINARY=terragrunt infracost breakdown --path=/path/to/code
  ```

#### CI/CD integrations
If you're using a [CI/CD integration](/docs/integrations/cicd), the [infracost/infracost Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the latest stable versions of terraform and terragrunt; so you can set this environment variable to:
- `terraform` (default, latest stable version of terraform)
- `terraform_1.0` (latest patch version of 1.0)
- `terraform_0.15` (latest patch version of 0.15)
- `terraform_0.14` (latest patch version of 0.14)
- `terraform_0.13` (latest patch version of 0.13)
- `terraform_0.12` (latest patch version of 0.12)
- `terragrunt` (latest patch version of 0.29, if you need other versions of Terragrunt in that Docker image, please create an [issue](https://github.com/infracost/infracost/issues/new/choose))

Infracost works with Terraform v0.12 and above.

### Terraform environment variables
Standard Terraform [environment variables](https://www.terraform.io/docs/commands/environment-variables.html) such as `TF_CLI_CONFIG_FILE` can also be added if required, for example:
```shell
TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost breakdown --path /path/to/code
```

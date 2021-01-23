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
Used to change the path to the `terraform` binary, e.g.:
  ```sh
  TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir /path/to/code
  # or
  TERRAFORM_BINARY=terragrunt infracost --tfdir=/path/to/code
  ```

#### CI/CD integrations
If you're using a [CI/CD integration](integrations), our [Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the latest stable versions of terraform and terragrunt; so you can set this environment variable to: 
- `terraform` (default, latest stable version of terraform)
- `terraform_0.14` (latest patch version of 0.14)
- `terraform_0.13` (latest patch version of 0.13)
- `terraform_0.12` (latest patch version of 0.12)
- `terragrunt` (latest patch version of 0.27, if you need other versions of Terragrunt in the Docker image, please create an [issue](https://github.com/infracost/infracost/issues/new/choose))

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

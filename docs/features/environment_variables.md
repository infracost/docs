---
slug: environment_variables
title: Environment variables
---

The Infracost CLI uses a number of environment variables to customize various aspects of its behavior; these can be particularly useful in [CI/CD integrations](/docs/integrations/cicd). Configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. Environment variables
3. [Config file](/docs/features/config_file)
4. Infracost Cloud organization settings

### INFRACOST_API_KEY
Infracost API key, run `infracost auth login` to sign up or log in via the CLI. Run `infracost configure get api_key` to retrieve your API key. Use [Infracost Cloud](/docs/infracost_cloud/authentication/) to rotate your API key.

### INFRACOST_CURRENCY
The currency ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)) prices should be converted to. Defaults to USD.
This is only used by the `infracost breakdown` and `diff` commands. The `output` command uses the currency from the Infracost JSON file.

### INFRACOST_ENABLE_CLOUD
Can be set to `true` to enable [Infracost Cloud](/docs/infracost_cloud/overview/). The main use-case for this is in CI/CD and it should only be set for the `infracost diff` command so only the Infracost JSON output from that step is sent to your Infracost Cloud account.

### INFRACOST_LOG_LEVEL
Controls the log verbosity level. Can be set to `info` or `warn` in CI/CD systems to reduce noise, or `debug` to troubleshoot. Turns off spinners in output. Setting this environment variable is the same as using the `--log-level` flag.

### INFRACOST_SKIP_UPDATE_CHECK
Set to `true` to skip the Infracost update check; can be useful in CI/CD systems. We regularly add support for new resources so we recommend watching our repo for releases: goto the [repo](https://github.com/infracost/infracost) page, click on the Watch button > select Custom > Releases and click on Apply. Be sure to upgrade regularly.

### INFRACOST_TERRAFORM_WORKSPACE
Used to set the Terraform workspace (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally). The `--terraform-workspace` flag can also be used.
  ```shell
  INFRACOST_TERRAFORM_WORKSPACE=dev infracost breakdown --path /code
  ```

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

### INFRACOST_TERRAFORM_CLOUD_TOKEN
For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan.

### INFRACOST_TERRAFORM_CLOUD_HOST
For Terraform Enterprise users, used to override the default `app.terraform.io` backend host.

### INFRACOST_PARALLELISM
If using multiple projects using a [config_file](/docs/features/config_file) this limits the number of projects processed in parallel. By default the parallelization level is set to 4×CPU count but capped at 16. To help with debugging set this to `1` so that the projects are processed synchronously.

### Terraform environment variables
Standard Terraform [environment variables](https://www.terraform.io/docs/commands/environment-variables.html) such as `TF_CLI_CONFIG_FILE`, `TF_WORKSPACE` and `TF_VAR_` can also be added if required, for example:
```shell
TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost breakdown \
    --path /path/to/code
```

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

Infracost API key, run `infracost auth login` to sign up or log in via the CLI. Run `infracost configure get api_key` to retrieve your API key. Use the Org Settings page in [Infracost Cloud](https://dashboard.infracost.io) to rotate your API key.

We recommend using this environment variable in CI/CD integrations; it overrides any values you might have set in `.config/infracost/credentials.yml`, `.env` or `.env.local` too.

### INFRACOST_CURRENCY

The currency ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)) prices should be converted to (e.g. EUR, BRL or INR). Defaults to USD. Use this environment variable with the `infracost breakdown` and `diff` commands, which also save the currency in the [Infracost JSON file](/docs/features/cli_commands/#examples). The `output` command and Infracost Cloud use the currency from that JSON file.

Cloud vendors usually publish prices in USD so the costs will be converted from USD to your preferred currency using the current exchange rate when the CLI is run.

On the terminal, you can also run `infracost configure set currency CURRENCY_CODE` to set the currency.

### INFRACOST_CURRENCY_FORMAT

A template string used to override the formatting of prices. The template should consist of the currency code, followed by a `:`, followed by an example of the desired formatting (including currency symbol) for the number 1234.56789. Note that the currency code prefix must match the value of `INFRACOST_CURRENCY` in order to have any effect.
.

These examples show the output of the number `64145.4525` with different formatting options:

| Enivornment variables                                                      | Output for 64145.4525 |
| -------------------------------------------------------------------------- | --------------------- |
| INFRACOST_CURRENCY=USD<br/>INFRACOST_CURRENCY_FORMAT="USD: 1.234,567890 $" | `64.145,452500 $`     |
| INFRACOST_CURRENCY=EUR<br/>INFRACOST_CURRENCY_FORMAT="EUR: 1.234,56€"      | `64.145,45€`          |
| INFRACOST_CURRENCY=GBP<br/>INFRACOST_CURRENCY_FORMAT="GBP: £ 1,234.567"    | `£ 64,145.453`        |

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

For Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan, variables or private registry modules.

### INFRACOST_TERRAFORM_CLOUD_HOST

For Terraform Enterprise users, used to override the default `app.terraform.io` backend host.

### INFRACOST_TERRAFORM_CLOUD_WORKSPACE

For Terraform Enterprise/Cloud users, used if your Terraform Cloud workspace name is different from the Terraform workspace name.

Only use if Infracost cannot infer the workspace name from the Terraform Cloud block configuration. If you have a valid Terraform Cloud block (shown below), use `INFRACOST_TERRAFORM_WORKSPACE` instead.

```hcl
terraform {
	cloud {
		organization = "acmeinc"
		workspace {
			prefix = "acme-"
		}
	}
}
```

### INFRACOST_TERRAFORM_CLOUD_ORG

For Terraform Cloud/Enterprise users, used to specify the organization name. This is only needed if you do not have a valid Terraform Cloud block configuration with an organization name.

### INFRACOST_TERRAFORM_SOURCE_MAP

Accepts a comma separated list of `source=dest` pairs, and replaces any matched source URL value found in Terraform `module` or Terragrunt `terraform` blocks. This is useful when you have module URLs that are referenced in your infra-as-code repos one way (e.g. using a private URL), but they should use a different URL when Infracost runs them (e.g. using a public URL). See [this docs section](/docs/features/terraform_modules/#source-map) for more details.

### INFRACOST_SPACELIFT_API_KEY_ENDPOINT
- The URL to your Spacelift account, e.g., `https://mycorp.app.spacelift.io`. For more information see our documentation on our Spacelift integration [here](/docs/integrations/spacelift/).

### INFRACOST_SPACELIFT_API_KEY_ID
- The ID of your Spacelift API key. For more information see our documentation on our Spacelift integration [here](/docs/integrations/spacelift/).

### INFRACOST_SPACELIFT_API_KEY_SECRET
- The secret associated with your API key. This is only available when the secret is created. For more information see our documentation on our Spacelift integration [here](/docs/integrations/spacelift/).


### INFRACOST_PARALLELISM

Do not set this if you are using the Infracost [GitHub](/docs/integrations/github_app/) or [GitLab App](/docs/integrations/gitlab_app/).
If using multiple projects using a [config_file](/docs/features/config_file) this limits the number of projects processed in parallel. By default the parallelization level is set to 4×CPU count but capped at 16. To help with debugging set this to `1` so that the projects are processed synchronously.

### Terraform environment variables

Standard Terraform [environment variables](https://www.terraform.io/docs/commands/environment-variables.html) such as `TF_CLI_CONFIG_FILE`, `TF_WORKSPACE` and `TF_VAR_` can also be added if required, for example:

```shell
TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost breakdown \
    --path /path/to/code
```

## Environment variables to override cloud provider region

The following environment variables can be used with `infracost breakdown` and `diff` commands to override the cloud provider region. GitHub App users can set these from Org Settings > Integrations > GitHub App > Run configurations. These environment variables cannot currently be set in the [config file](/docs/features/config_file/) as they apply to all projects, not individual ones.

- `INFRACOST_AWS_OVERRIDE_REGION` for AWS
- `INFRACOST_AZURE_OVERRIDE_REGION` for Azure
- `INFRACOST_GOOGLE_OVERRIDE_REGION` for Google

For example, with the following provider block, using the environment variable `INFRACOST_AWS_OVERRIDE_REGION=eu-central-1` Infracost will show costs for `eu-central-1` region.

```tf
provider "aws" {
  region = "us-east-1"
  # ...
}
```

## Environment variables to set metadata

The following environment variables should be set **before** `infracost breakdown` **and** `diff` are run to set or override the values that are automatically generated as part of the [Infracost JSON output](/docs/features/cli_commands/#examples). This is needed when running Infracost in a CI/CD where our CLI cannot detect the metadata, e.g Jenkins.

:::note
We recommend exporting environment variables using quotes so values with spaces are captured correctly, e.g. `export MY_ENV="my value"`
:::

- `INFRACOST_VCS_PROVIDER`: Required. Can be "github", "gitlab", "azure_repos" or "bitbucket". For GitHub Enterprise also use "github", for GitLab Enterprise also use "gitlab".
- `INFRACOST_VCS_REPOSITORY_URL`: Required. HTTPS URL of the repository, e.g. `https://github.com/infracost/example-terraform`
- `INFRACOST_VCS_PULL_REQUEST_URL`: Required. HTTP URL of the pull request, e.g. `https://github.com/alikhajeh1/example-terraform/pull/2`
- `INFRACOST_VCS_PULL_REQUEST_AUTHOR`: Required. Author username or full name of the pull request, e.g. "john190" or "John Smith". If you can't get this easily, you can also set this to the git username of the first or last commit.
- `INFRACOST_VCS_PULL_REQUEST_TITLE`: Required. Title of the pull request, e.g. "Increase IOPS"
- `INFRACOST_VCS_BASE_BRANCH`: Required. Name of the base branch that the pull request is being merged into, this is usually "master" or "main". Without this the Jira integration does not work properly.
- `INFRACOST_VCS_BRANCH`: Required. Name of the branch that was used to generate the estimate, e.g. "increase_iops"
- `INFRACOST_VCS_COMMIT_SHA`: Required. Long commit SHA of the branch that was used to generate the estimate, e.g. "1af413ad15ad6cbdfca667361231231231231231"
- `INFRACOST_VCS_COMMIT_MESSAGE`: Required. The commit message, e.g. "use m5.large"
- `INFRACOST_VCS_COMMIT_TIMESTAMP`: Required. Unix epoch timestamp of the commit, e.g. `1661801540`. You can use the following command to get the timestamp on the latest commit from the current branch `export INFRACOST_VCS_COMMIT_TIMESTAMP=$(git show -s --format=%ct)`
- `INFRACOST_VCS_COMMIT_AUTHOR_EMAIL`: Required. Git email of author of the commit, e.g. "john@company.com"
- `INFRACOST_VCS_COMMIT_AUTHOR_NAME`: Required. Git author name of the commit, e.g. "John Smith"
- `INFRACOST_VCS_SUB_PATH`: Optional. Path of the project relative to the root of the code repository, e.g. "prod/us-east"
- `INFRACOST_TERRAFORM_WORKSPACE`: Optional. Terraform workspace if specified for the project, e.g. "prod"
- `INFRACOST_VCS_PIPELINE_RUN_ID`: Optional. A way to differentiate pipelines that are run within one pull request, this is the top-level pipeline ID, not individual jobs/runs within it, e.g. "2846680866"
- `INFRACOST_VCS_PULL_REQUEST_LABELS`: Optional. A comma separated list of any labels (e.g. GitHub labels) added to the pull request.

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

We recommend using this environment variable in CI/CD integrations; it overrides any values you might have set in `.config/infracost/credentials.yml`, `.env` or `.env.local` too.

### INFRACOST_CURRENCY
The currency ([ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)) prices should be converted to (e.g. EUR, BRL or INR). Defaults to USD. Use this environment variable with the `infracost breakdown` and `diff` commands, which also save the currency in the [Infracost JSON file](/docs/features/cli_commands/#examples). The `output` command and Infracost Cloud use the currency from that JSON file.

Cloud vendors usually publish prices in USD so the costs will be converted from USD to your preferred currency using the current exchange rate when the CLI is run.

On the terminal, you can also run `infracost configure set currency CURRENCY_CODE` to set the currency.

### INFRACOST_ENABLE_CLOUD
Can be set to `true` to enable [Infracost Cloud](/docs/infracost_cloud/overview/). The main use-case for this is in CI/CD so the Infracost JSON output is sent to your Infracost Cloud account.

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

## Environment variables to override metadata

The following environment variables can be used with `infracost breakdown` and `diff` to override the values that are automatically generated as part of the [Infracost JSON output](/docs/features/cli_commands/#examples). This is useful when [uploading an Infracost JSON file](/docs/features/cli_commands/#upload-runs) to Infracost Cloud.

:::note
We recommend exporting environment variables using quotes so values with spaces are captured correctly, e.g. `export MY_ENV="my value"`
:::

### When a pull request exists
If you are integrating Infracost into a CI/CD system and you have pull requests, you can use the following environment variables to override relevant metadata.

**Required:**
- `INFRACOST_VCS_PROVIDER`: can be "github", "gitlab", "azure_repos" or "bitbucket"
- `INFRACOST_VCS_REPOSITORY_URL`: HTTPS URL of the repository, e.g. "https://github.com/infracost/example-terraform"
- `INFRACOST_VCS_PULL_REQUEST_URL`: HTTP URL of the pull request, e.g. "https://github.com/alikhajeh1/example-terraform/pull/2"
- `INFRACOST_VCS_PULL_REQUEST_AUTHOR`: author username or full name of the pull request, e.g. "john190" or "John Smith"
- `INFRACOST_VCS_PULL_REQUEST_TITLE`: title of the pull request, e.g. "Increase IOPS"

The following example shows how you can override the above environment variables in the [Infracost Atlantis integration](https://github.com/infracost/infracost-atlantis):

  ```bash
  INFRACOST_VCS_PROVIDER="github" # For GitHub Enterprise, also use "github"
  INFRACOST_VCS_REPOSITORY_URL="https://github.com/$BASE_REPO_OWNER/$BASE_REPO_NAME"
  INFRACOST_VCS_PULL_REQUEST_URL="$INFRACOST_VCS_REPOSITORY_URL/pulls/$PULL_NUM"
  INFRACOST_VCS_PULL_REQUEST_AUTHOR="$PULL_AUTHOR"

  INFRACOST_VCS_PULL_REQUEST_TITLE=\"$(curl -s \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: $GITHUB_TOKEN" \
      "https://api.github.com/repos/$BASE_REPO_OWNER/$BASE_REPO_NAME/pulls/$PULL_NUM" | jq -r '.title')\"
  ```

**Optional:**
- `INFRACOST_VCS_BASE_BRANCH`: name of the base branch that the pull request is being merged into, this is usually "master" or "main"
- `INFRACOST_VCS_BRANCH`: name of the branch that was used to generate the estimate, e.g. "increase_iops"
- `INFRACOST_VCS_COMMIT_SHA`: long commit SHA of the branch that was used to generate the estimate, e.g. "1af413ad15ad6cbdfca667361231231231231231"
- `INFRACOST_VCS_COMMIT_MESSAGE`: the commit message, e.g. "use m5.large"
- `INFRACOST_VCS_COMMIT_TIMESTAMP`: unix epoch timestamp of the commit, e.g. `1661801540`. You can use the following command to get the timestamp on the latest commit from the current branch `export INFRACOST_VCS_COMMIT_TIMESTAMP=$(git show -s --format=%ct)`
- `INFRACOST_VCS_COMMIT_AUTHOR_EMAIL`: git email of author of the commit, e.g. "john@company.com"
- `INFRACOST_VCS_COMMIT_AUTHOR_NAME`: git author name of the commit, e.g. "John Smith"
- `INFRACOST_VCS_SUB_PATH`: path of the project relative to the root of the code repository, e.g. "prod/us-east"
- `INFRACOST_TERRAFORM_WORKSPACE`: Terraform workspace if specified for the project, e.g. "prod"
- `INFRACOST_VCS_PIPELINE_RUN_ID`: a way to differentiate pipelines that are run within one pull request, this is the top-level pipeline ID, not individual jobs/runs within it, e.g. "2846680866"

### When no pull requests exist

If you are integrating Infracost into a CI/CD system and you do not use pull requests in your workflow, you can use the following environment variables to override relevant metadata.

**Required:**
- `INFRACOST_VCS_PROVIDER`: can be "github", "gitlab", "azure_repos" or "bitbucket"
- `INFRACOST_VCS_REPOSITORY_URL`: HTTPS URL of the repository, e.g. "https://github.com/infracost/example-terraform"
- `INFRACOST_VCS_BRANCH`: name of the branch that was used to generate the estimate, e.g. "increase_iops"
- `INFRACOST_VCS_COMMIT_SHA`: long commit SHA of the branch that was used to generate the estimate, e.g. "1af413ad15ad6cbdfca667361231231231231231"
- `INFRACOST_VCS_COMMIT_MESSAGE`: the commit message, e.g. "use m5.large"
- `INFRACOST_VCS_COMMIT_TIMESTAMP`: unix epoch timestamp of the commit, e.g. `1661801540`. You can use the following command to get the timestamp on the latest commit from the current branch `export INFRACOST_VCS_COMMIT_TIMESTAMP=$(git show -s --format=%ct)`
- `INFRACOST_VCS_COMMIT_AUTHOR_EMAIL`: git email of author of the commit, e.g. "john@company.com"
- `INFRACOST_VCS_COMMIT_AUTHOR_NAME`: git author name of the commit, e.g. "John Smith"

**Optional:**
- `INFRACOST_VCS_SUB_PATH`: path of the project relative to the root of the code repository, e.g. "prod/us-east"
- `INFRACOST_TERRAFORM_WORKSPACE`: Terraform workspace if specified for the project, e.g. "prod"
- `INFRACOST_VCS_PIPELINE_RUN_ID`: a way to differentiate pipelines that are run within one CI/CD run, this is the top-level pipeline ID, not individual jobs/runs within it, e.g. "2846680866"

---
slug: cli_commands
title: CLI commands
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost has multiple commands, all of which support `--help`:
- Basic commands:
  - `infracost breakdown`: Show breakdown of costs
  - `infracost diff`: Show diff of monthly costs between current and planned state

- The following commands work with the Infracost JSON output, which is generated via `infracost breakdown --format json`: 
  - `infracost comment`: Post cost estimates to pull requests in GitHub, GitLab, Azure Repos and Bitbucket
  - `infracost output`: Combine and output Infracost JSON files in different formats

- The following auxiliary commands are also helpful:
  - `infracost configure`: Display or change global configuration, including currency settings
  - `infracost register`: Register for a free Infracost API key
  - `infracost completion`: Generate shell completion script

## Breakdown

This command shows a breakdown of costs. You can point Infracost to either a Terraform directory, or plan JSON file, using the `--path` flag.

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown output.

### Option 1: Terraform directory

This is the simplest method to run `infracost breakdown`. Internally Infracost runs Terraform init, plan and show; [Terraform init](/docs/faq#does-infracost-need-cloud-credentials) requires cloud credentials to be set, e.g. via the usual [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables), [Google](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference#full-reference) or [Azure](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret) environment variables or other methods.

Any required Terraform `init` and `plan` flags can be passed using `--terraform-init-flags` and `--terraform-plan-flags` respectively. The `--terraform-workspace` flag can be used to define a workspace.

  ```shell
  infracost breakdown --path path/to/code \
      --terraform-init-flags "-upgrade=true" \
      --terraform-plan-flags "-var-file=my.tfvars"
  ```

### Option 2: Terraform plan JSON

If the above method does not work for your use-case, you can use Terraform to generate a plan JSON file (as shown below), and point Infracost to it using `--path`. In this case, cloud credentials are not needed by Infracost.

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json

  infracost breakdown --path plan.json
  ```

### Option 3: Parse HCL directly

This method **does not require the Terraform binary** and is lightning fast. Internally Infracost parses the Terraform HCL directly and does not need cloud credentials. This makes it perfect for local development (it'll also be useful for CI/CD once we have a method to generate diffs too).

  ```shell
  infracost breakdown --path path/to/code \
      --terraform-parse-hcl \
      --terraform-var-file "my.tfvars" \
      --terraform-var "my_var=value"
  ```

Usually no extra setup is needed for handling private modules since Infracost downloads these using the same method that Terraform does. That means the same version control credentials (e.g. for github) are used by Infracost to download private modules. You can follow [Terraform's docs](https://www.terraform.io/language/modules/sources) for more information.

See the [advanced usage](/docs/guides/advanced_usage) guide for other usage options.

### Useful flags

The `breakdown` command has many useful flags, run it with `--help` to see them. For example, `breakdown` supports:

```shell
  --terraform-workspace  Terraform workspace to use. Applicable when path is a Terraform directory
  --format               Output format: json, table, html (default "table")
  --config-file          Path to Infracost config file. Cannot be used with path, terraform* or usage-file flags
  --usage-file           Path to Infracost usage file that specifies values for usage-based resources
  --sync-usage-file      Sync usage-file with missing resources, needs usage-file too (experimental)
  --fields               Comma separated list of output fields: all,price,monthlyQuantity,unit,hourlyCost,monthlyCost.
                         Only supported by table output format (default [monthlyQuantity,unit,monthlyCost])
  --show-skipped         Show unsupported resources
  --no-cache             Don't attempt to cache Terraform plans
  --out-file string      Save output to a file, helpful with format flag
  --log-level            Use "debug" to troubleshoot, can be set to "info" or "warn" in CI/CD systems to reduce noise, turns off spinners in output
  --no-color             Turn off colored output
```

## Diff

This command shows a diff of monthly costs between current and planned state. You can point Infracost to either a Terraform directory, or plan JSON file, using the `--path` flag.

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown output.

### Option 1: Terraform directory

This is the simplest way to run `infracost diff`. Internally Infracost runs Terraform init, plan and show; [Terraform init](/docs/faq#does-infracost-need-cloud-credentials) requires cloud credentials to be set, e.g. via the usual [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables), [Google](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference#full-reference) or [Azure](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret) environment variables or other methods.

Any required Terraform `init` and `plan` flags can be passed using `--terraform-init-flags` and `--terraform-plan-flags` respectively. The `--terraform-workspace` flag can be used to define a workspace.

```shell
  infracost diff --path /code \
      --terraform-init-flags "-upgrade=true" \
      --terraform-plan-flags "-var-file=my.tfvars"
```

### Option 2: Terraform plan JSON

If the above method does not work for your use-case, you can use Terraform to generate a plan JSON file (as shown below), and point Infracost to it using `--path`. In this case, cloud credentials are not needed by Infracost.

```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json
  
  infracost diff --path plan.json

```

See the [advanced usage](/docs/guides/advanced_usage) guide for other usage options.

### Useful flags

The `diff` command has many useful flags, run with `--help` to see them. For example, `diff` supports:

```shell
  --terraform-workspace  Terraform workspace to use. Applicable when path is a Terraform directory
  --config-file          Path to Infracost config file. Cannot be used with path, terraform* or usage-file flags
  --usage-file           Path to Infracost usage file that specifies values for usage-based resources
  --sync-usage-file      Sync usage-file with missing resources, needs usage-file too (experimental)
  --show-skipped         Show unsupported resources
  --no-cache             Don't attempt to cache Terraform plans
  --out-file string      Save output to a file, helpful with format flag
  --log-level            Use "debug" to troubleshoot, can be set to "info" or "warn" in CI/CD systems to reduce noise, turns off spinners in output
  --no-color             Turn off colored output
```

## Comment on pull requests

The Infracost CLI can post cost estimates to pull request or commits on [GitHub](#github), [GitLab](#gitlab), [Azure Repos](#azure-repos) and [Bitbucket](#bitbucket), which is useful in CI/CD pipelines.

  ```shell
  # Generate Infracost JSON files for each Terraform plan JSON or directory/workspace
  infracost breakdown --path tf-plan-1.json --format json --out-file infracost-1.json
  infracost breakdown --path tf-plan-2.json --format json --out-file infracost-2.json

  # Post one comment with above Infracost JSON files, glob patterns need quotes
  infracost comment github --path "infracost-*.json" ...
  ```

The following `--behavior` options are supported when posting cost estimate comments:
  - `update` (good default): Create a single comment and update it. The "quietest" option.
  - `hide-and-new`: Minimize previous comments and create a new one. Only supported by GitHub.
  - `delete-and-new`: Delete previous comments and create a new one.
  - `new`: Create a new cost estimate comment on every push.

The optional and experimental `--policy-path` flag can be used to setup [cost policies](/docs/features/cost_policies/), which can be used to setup passing/failing policies in Infracost pull request comments (shown below) without having to install anything else.

<div className="img-box">
  <img
      src={useBaseUrl("img/screenshots/policy-failure-github.png")}
      alt="Example cost policy failing in GitHub Actions"/>
</div>

### GitHub

Run `infracost comment github --help` to see the options. For example, GitHub Enterprise users can specify `--github-api-url` (e.g. in GitHub Actions you can set this to `$GITHUB_API_URL`). You might find the following common examples helpful.

#### GitHub Actions

```sh
infracost comment github --path infracost.json \
                         --repo $GITHUB_REPOSITORY \
                         --pull-request $PR_NUMBER `# or --commit $GITHUB_SHA` \
                         --github-token $GITHUB_TOKEN \
                         --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use the predefined `$GITHUB_REPOSITORY` environment variable.
- `--pull-request`: required to post on a pull request, can be extracted from workflows's event and set as an environment variable: `PR_NUMBER: ${{ github.event.number }}`. Mutually exclusive with the `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$GITHUB_SHA`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, use `$GITHUB_TOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

#### Azure Pipelines with GitHub

```sh
infracost comment github --path infracost.json \
                         --repo $BUILD_REPOSITORY_NAME \
                         --pull-request $SYSTEM_PULLREQUEST_PULLREQUESTNUMBER `# or --commit $BUILD_SOURCEVERSION` \
                         --github-token $GITHUB_TOKEN \
                         --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use the predefined `$BUILD_REPOSITORY_NAME` environment variable.
- `--pull-request`: required to post on a pull request, `$SYSTEM_PULLREQUEST_PULLREQUESTNUMBER`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$BUILD_SOURCEVERSION`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, use `$GITHUB_TOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

#### Atlantis with GitHub

```sh
infracost comment github --path infracost.json \
                         --repo $BASE_REPO_OWNER/$BASE_REPO_NAME \
                         --pull-request $PULL_NUM `# or --commit $HEAD_COMMIT` \
                         --github-token $GITHUB_TOKEN \
                         --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$BASE_REPO_OWNER/$BASE_REPO_NAME` combination of predefined environment variables.
- `--pull-request`: required to post on a pull request, use `$PULL_NUM`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$HEAD_COMMIT`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, provide your GitHub token, for example, as an environment variable `$GITHUB_TOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

#### CircleCI with GitHub

```sh
infracost comment github --path infracost.json \
                         --repo $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME \
                         --pull-request ${CIRCLE_PULL_REQUEST##*/} `# or --commit $CIRCLE_SHA1` \
                         --github-token $GITHUB_TOKEN \
                         --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME` combination of predefined environment variables.
- `--pull-request`: required to post on a pull request, use `${CIRCLE_PULL_REQUEST##*/}` to extract the pull request's number from its URL. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$CIRCLE_SHA1`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, provide your GitHub token, for example, as an environment variable `$GITHUB_TOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

### GitLab

Run `infracost comment gitlab --help` to see the options. For example, GitLab for Enterprise users can specify `--gitlab-server-url` (e.g. in GitLab CI you can set this to `$CI_SERVER_URL`). You might find the following common examples helpful.

#### GitLab CI

```sh
infracost comment gitlab --path infracost.json \
                         --repo $CI_PROJECT_PATH \
                         --merge-request $CI_MERGE_REQUEST_IID `# or --commit $CI_COMMIT_SHA` \
                         --gitlab-token $GITLAB_TOKEN \
                         --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use the predefined `$CI_PROJECT_PATH` environment variable.
- `--merge-request`: required to post on a merge request, use `$CI_MERGE_REQUEST_IID`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a merge request's commit, use `$CI_COMMIT_SHA`. Mutually exclusive with `--merge-request` flag.
- `--gitlab-token`: required, use `$GITLAB_TOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

#### Atlantis with GitLab

```sh
infracost comment gitlab --path infracost.json \
                         --repo $BASE_REPO_OWNER/$BASE_REPO_NAME \
                         --merge-request $PULL_NUM `# or --commit $HEAD_COMMIT` \
                         --gitlab-token $GITLAB_TOKEN \
                         --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$BASE_REPO_OWNER/$BASE_REPO_NAME` combination of predefined environment variables.
- `--merge-request`: required to post on a merge request, use `$PULL_NUM`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a merge request's commit, use `$HEAD_COMMIT`. Mutually exclusive with `--merge-request` flag.
- `--gitlab-token`: required, provide your GitLab token as an environment variable, for example as `$GITLAB_TOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

### Azure Repos

Run `infracost comment azure-repos --help` to see the options. You might find the following common examples helpful.

#### Azure Pipelines with Azure Repos

```sh
infracost comment azure-repos --path infracost.json \
                              --repo-url $BUILD_REPOSITORY_URI \
                              --pull-request $SYSTEM_PULLREQUEST_PULLREQUESTID \
                              --azure-access-token $SYSTEM_ACCESSTOKEN \
                              --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo-url`: required, use `$BUILD_REPOSITORY_URI` predefined environment variable.
- `--pull-request`: required to post on a pull request, `$SYSTEM_PULLREQUEST_PULLREQUESTID`.
- `--azure-access-token`: required, use `$SYSTEM_ACCESSTOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

#### Atlantis with Azure Repos

```sh
infracost comment azure-repos --path infracost.json \
                              --repo-url $AZURE_REPO_URL \
                              --pull-request $PULL_NUM \
                              --azure-access-token $AZURE_ACCESS_TOKEN \
                              --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo-url`: required, provide your repo's URL as an environment variable, for example as `$AZURE_REPO_URL`.
- `--pull-request`: required to post on a pull request, use `$PULL_NUM`.
- `--azure-access-token`: required, provide your Azure DevOps access token, for example, as an environment variable `$AZURE_ACCESS_TOKEN`.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

### Bitbucket

Run `infracost comment bitbucket --help` to see the options. For example, Bitbucket Server/Data Center users can specify `--bitbucket-server-url`. You might find the following common examples helpful.

#### Bitbucket Pipelines

```sh
infracost comment bitbucket --path infracost.json \
                            --repo $BITBUCKET_WORKSPACE/$BITBUCKET_REPO_SLUG \
                            --pull-request $BITBUCKET_PR_ID `# or --commit $BITBUCKET_COMMIT` \
                            --bitbucket-token $BITBUCKET_TOKEN \
                            --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$BITBUCKET_WORKSPACE/$BITBUCKET_REPO_SLUG` combination of predefined environment variables.
- `--pull-request`: required to post on a pull request, use `$BITBUCKET_PR_ID`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$BITBUCKET_COMMIT`. Mutually exclusive with `--pull-request` flag, available only for Bitbucket Cloud.
- `--bitbucket-token`: required. For Bitbucket Cloud provide `username:$BITBUCKET_TOKEN`, where the token can be a user or App password. For Bitbucket Server provide only an HTTP access token.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

#### CircleCI with Bitbucket

```sh
infracost comment bitbucket --path infracost.json \
                            --repo $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME \
                            --pull-request ${CIRCLE_PULL_REQUEST##*/} `# or --commit $CIRCLE_SHA1` \
                            --bitbucket-token $BITBUCKET_TOKEN \
                            --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME` combination of predefined environment variables.
- `--pull-request`: required to post on a pull request, use `${CIRCLE_PULL_REQUEST##*/}` to extract the pull request's number from its URL. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$CIRCLE_SHA1`. Mutually exclusive with `--pull-request` flag, available only for Bitbucket Cloud.
- `--bitbucket-token`: required. For Bitbucket Cloud provide `username:$BITBUCKET_TOKEN`, where the token can be a user or App password. For Bitbucket Server provide only an HTTP access token.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

#### Atlantis with Bitbucket

```sh
infracost comment bitbucket --path infracost.json \
                            --repo $BASE_REPO_OWNER/$BASE_REPO_NAME \
                            --pull-request $PULL_NUM `# or --commit $HEAD_COMMIT` \
                            --bitbucket-token $BITBUCKET_TOKEN \
                            --behavior update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$BASE_REPO_OWNER/$BASE_REPO_NAME` combination of predefined environment variables.
- `--pull-request`: required to post on a pull request, use `$PULL_NUM`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$HEAD_COMMIT`. Mutually exclusive with `--pull-request` flag, available only for Bitbucket Cloud.
- `--bitbucket-token`: required. For Bitbucket Cloud provide `username:$BITBUCKET_TOKEN`, where the token can be a user or App password. For Bitbucket Server provide only an HTTP access token.
- `--policy-path`: Path to Infracost policy files, glob patterns need quotes (experimental).

## Combined output formats

The Infracost CLI can generate cost estimates in many formats: `json`, `diff`, `table`, `html`, `github-comment`, `gitlab-comment`, `azure-repos-comment`, `bitbucket-comment` and `slack-message`. To use them:

1. Generate Infracost JSON output for each Terraform project and combine them into one file. This is the recommended way to store the snapshot of a cost estimate; it can be used by the CLI to generate other formats. The JSON format can also be used to setup [cost policies](/docs/features/cost_policies/).
  ```sh
  infracost breakdown --path tf-plan-1.json --format json --out-file infracost-1.json
  infracost breakdown --path tf-plan-2.json --format json --out-file infracost-2.json

  # Combine above Infracost JSON files, glob patterns need quotes
  infracost output --path "infracost-*.json" --format json --out-file infracost.json    
  ```

2. Use the `infracost output` command to generate different formats, for example:

  ```sh
  # Slack output
  infracost output --path infracost.json --format slack-message --out-file slack.md

  # Diff output
  infracost output --path infracost.json --format diff

  # HTML output
  infracost output --path infracost.json --format html --out-file report.html
  ```

  Cost estimates can be shared with others including team members or management using either:
    - The [share reports](/docs/features/share_links/) feature (recommended).
    - Generating the HTML format, uploading it to object storage such as AWS S3. This format also includes the file names and Terraform tags from the files that were used to generate it.

Run `infracost output --help` to see other options, such as `--fields` and `--show-skipped`.

### Examples

<Tabs
  defaultValue="json"
  values={[
    {label: 'JSON format', value: 'json'},
    {label: 'HTML', value: 'html'},
    {label: 'Table', value: 'table'},
    {label: 'Diff', value: 'diff'},
    {label: 'Pull request comment', value: 'pull-request-comment'},
    {label: 'Slack message', value: 'slack-message'}
  ]}>
  <TabItem value="json">

  **Tip**: You can use `jq` to extract values. For example, to see the total monthly cost increase of a project you can use:

  ```shell
  jq -r '.projects[0].diff.totalMonthlyCost'
  # or to see the sum of all projects:
  jq -r '.diffTotalMonthlyCost'
  ```

  Here is an example of the full JSON output:

  ```json
  {
    "version": "0.2",
    "currency": "USD",
    "projects": [
      {
        "name": "infracost/infracost/examples/terraform",
        "metadata": {
          "path": "examples/terraform",
        },
        /* This contains any resources that are in the prior Terraform state */
        "pastBreakdown": {
          "resources": [],
          "totalHourlyCost": "0",
          "totalMonthlyCost": "0"
        },
        /* This contains the breakdown of resources that are in the planned Terraform state */
        "breakdown": {
          "resources": [
            {
              "name": "aws_instance.web_app",
              "metadata": {},
              "hourlyCost": "1.017315068493150679",
              "monthlyCost": "742.64",
              "costComponents": [
                {
                  "name": "Linux/UNIX usage (on-demand, m5.4xlarge)",
                  "unit": "hours",
                  "hourlyQuantity": "1",
                  "monthlyQuantity": "730",
                  "price": "0.768",
                  "hourlyCost": "0.768",
                  "monthlyCost": "560.64"
                }
              ],
              "subresources": [
                {
                  "name": "root_block_device",
                  "metadata": {},
                  "hourlyCost": "0.00684931506849315",
                  "monthlyCost": "5",
                  "costComponents": [
                    {
                      "name": "General Purpose SSD storage (gp2)",
                      "unit": "GB-months",
                      "hourlyQuantity": "0.0684931506849315",
                      "monthlyQuantity": "50",
                      "price": "0.1",
                      "hourlyCost": "0.00684931506849315",
                      "monthlyCost": "5"
                    }
                  ]
                },
                {
                  "name": "ebs_block_device[0]",
                  "metadata": {},
                  "hourlyCost": "0.242465753424657529",
                  "monthlyCost": "177",
                  "costComponents": [
                    {
                      "name": "Provisioned IOPS SSD storage (io1)",
                      "unit": "GB-months",
                      "hourlyQuantity": "1.3698630136986301",
                      "monthlyQuantity": "1000",
                      "price": "0.125",
                      "hourlyCost": "0.1712328767123287625",
                      "monthlyCost": "125"
                    },
                    {
                      "name": "Provisioned IOPS",
                      "unit": "IOPS-months",
                      "hourlyQuantity": "1.0958904109589041",
                      "monthlyQuantity": "800",
                      "price": "0.065",
                      "hourlyCost": "0.0712328767123287665",
                      "monthlyCost": "52"
                    }
                  ]
                }
              ]
            },
            {
              "name": "aws_lambda_function.hello_world",
              "metadata": {},
              "hourlyCost": null,
              "monthlyCost": null,
              "costComponents": [
                {
                  "name": "Requests",
                  "unit": "1M requests",
                  "hourlyQuantity": null,
                  "monthlyQuantity": null,
                  "price": "0.2",
                  "hourlyCost": null,
                  "monthlyCost": null
                },
                {
                  "name": "Duration",
                  "unit": "GB-seconds",
                  "hourlyQuantity": null,
                  "monthlyQuantity": null,
                  "price": "0.0000166667",
                  "hourlyCost": null,
                  "monthlyCost": null
                }
              ]
            }
          ],
          "totalHourlyCost": "1.017315068493150679",
          "totalMonthlyCost": "742.64"
        },
        /* This contains the diff of the resources between the prior state and planned state */
        "diff": {
          "resources": [
            {
              "name": "aws_instance.web_app",
              "metadata": {},
              "hourlyCost": "1.017315068493150679",
              "monthlyCost": "742.64",
              "costComponents": [
                {
                  "name": "Linux/UNIX usage (on-demand, m5.4xlarge)",
                  "unit": "hours",
                  "hourlyQuantity": "1",
                  "monthlyQuantity": "730",
                  "price": "0.768",
                  "hourlyCost": "0.768",
                  "monthlyCost": "560.64"
                }
              ],
              "subresources": [
                {
                  "name": "root_block_device",
                  "metadata": {},
                  "hourlyCost": "0.00684931506849315",
                  "monthlyCost": "5",
                  "costComponents": [
                    {
                      "name": "General Purpose SSD storage (gp2)",
                      "unit": "GB-months",
                      "hourlyQuantity": "0.0684931506849315",
                      "monthlyQuantity": "50",
                      "price": "0.1",
                      "hourlyCost": "0.00684931506849315",
                      "monthlyCost": "5"
                    }
                  ]
                },
                {
                  "name": "ebs_block_device[0]",
                  "metadata": {},
                  "hourlyCost": "0.242465753424657529",
                  "monthlyCost": "177",
                  "costComponents": [
                    {
                      "name": "Provisioned IOPS SSD storage (io1)",
                      "unit": "GB-months",
                      "hourlyQuantity": "1.3698630136986301",
                      "monthlyQuantity": "1000",
                      "price": "0.125",
                      "hourlyCost": "0.1712328767123287625",
                      "monthlyCost": "125"
                    },
                    {
                      "name": "Provisioned IOPS",
                      "unit": "IOPS-months",
                      "hourlyQuantity": "1.0958904109589041",
                      "monthlyQuantity": "800",
                      "price": "0.065",
                      "hourlyCost": "0.0712328767123287665",
                      "monthlyCost": "52"
                    }
                  ]
                }
              ]
            },
            {
              "name": "aws_lambda_function.hello_world",
              "metadata": {},
              "hourlyCost": "0",
              "monthlyCost": "0",
              "costComponents": [
                {
                  "name": "Requests",
                  "unit": "1M requests",
                  "hourlyQuantity": "0",
                  "monthlyQuantity": "0",
                  "price": "0.2",
                  "hourlyCost": "0",
                  "monthlyCost": "0"
                },
                {
                  "name": "Duration",
                  "unit": "GB-seconds",
                  "hourlyQuantity": "0",
                  "monthlyQuantity": "0",
                  "price": "0.0000166667",
                  "hourlyCost": "0",
                  "monthlyCost": "0"
                }
              ]
            }
          ],
          // The summary format is not finalized and is subject to change
          "summary": {
            "unsupportedResourceCounts": {}
          },
          "totalHourlyCost": "1.017315068493150679",
          "totalMonthlyCost": "742.64"
        }
      }
    ],
    "timeGenerated": "2021-02-17T17:46:51.690235Z",
    // The summary format is not finalized and is subject to change
    "summary": {
      "unsupportedResourceCounts": {}
    },
    "totalHourlyCost": "1.017315068493150679",
    "totalMonthlyCost": "742.64",
    "pastTotalHourlyCost": "0",
    "pastTotalMonthlyCost": "0",
    "diffTotalHourlyCost": "1.017315068493150679",
    "diffTotalMonthlyCost": "742.64",
  }
  ```

  </TabItem>
  <TabItem value="html">
    <img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
  </TabItem>
  <TabItem value="table">

  ```
  Project: infracost/infracost/examples/terraform

  Name                                     Quantity  Unit                           Monthly Cost

  aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.4xlarge)   730  hours                              $560.64
  ├─ root_block_device
  │  └─ General Purpose SSD storage (gp2)        50  GB                                   $5.00
  └─ ebs_block_device[0]
      ├─ Provisioned IOPS SSD storage (io1)   1,000  GB                                 $125.00
      └─ Provisioned IOPS                       800  IOPS                                $52.00

  aws_lambda_function.hello_world
  ├─ Requests                       Monthly cost depends on usage: $0.20 per 1M requests
  └─ Duration                       Monthly cost depends on usage: $0.0000166667 per GB-seconds

  PROJECT TOTAL                                                               $742.64

  ----------------------------------
  To estimate usage-based resources use --usage-file, see https://infracost.io/usage-file
  ```
  </TabItem>
  <TabItem value="diff">

  ```
  Project: infracost/infracost/examples/terraform

  + aws_instance.web_app
    +$743

      + Linux/UNIX usage (on-demand, m5.4xlarge)
        +$561

      + root_block_device

          + General Purpose SSD storage (gp2)
            +$5.00

      + ebs_block_device[0]

          + Provisioned IOPS SSD storage (io1)
            +$125

          + Provisioned IOPS
            +$52.00

  + aws_lambda_function.hello_world
    Cost depends on usage

      + Requests
        Cost depends on usage
          +$0.20 per 1M requests

      + Duration
        Cost depends on usage
          +$0.0000166667 per GB-seconds

  Monthly cost change for examples/terraform
  Amount:  +$743 ($0.00 -> $743)

  ----------------------------------
  Key: ~ changed, + added, - removed

  To estimate usage-based resources use --usage-file, see https://infracost.io/usage-file
  ```
  </TabItem>
  <TabItem value="pull-request-comment">  
    The following screenshot is for the 'github-comment' format. The 'gitlab-comment', 'azure-repos-comment' and 'bitbucket-comment' formats produce similar output.
    <img src={useBaseUrl("img/screenshots/github-comment-format.png")} alt="Infracost GitHub comment report" />
  </TabItem>
  <TabItem value="slack-message">
    <img src={useBaseUrl("img/screenshots/slack-message-format.png")} alt="Infracost Slack message report" />
  </TabItem>
</Tabs>

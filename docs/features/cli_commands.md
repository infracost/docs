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
  - `infracost auth login`: Get a free Infracost API key
  - `infracost completion`: Generate shell completion script

## Breakdown

This command shows a breakdown of costs. It can also generate Infracost JSON output. You can point Infracost to either a Terraform directory, or plan JSON file, using the `--path` flag.

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown output.

### Option 1: Terraform directory

This is the default and recommended option. It does not require a Terraform plan so it's super-fast. Internally Infracost parses the Terraform HCL code directly thus no cloud credentials or Terraform secrets are required.

  ```shell
  cd path/to/code

  # Terraform variables can be set using --terraform-var-file or --terraform-var
  infracost breakdown --path .
  ```

#### Notes

Usually no extra setup is needed for handling:
- **Private modules** see [this page](/docs/features/terraform_modules/) for more details.
- **Terragrunt** see [this page](/docs/features/terragrunt/) for more details.
- **Terraform Cloud/Enterprise** see [this page](/docs/integrations/terraform_cloud_enterprise/#running-infracost-on-local-dev-machines) for more details.

### Option 2: Terraform plan JSON

If the above method does not work for your use-case, you can use Terraform to generate a plan JSON file (as shown below), and point Infracost to it using `--path`.

  ```shell
  cd path/to/code

  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json

  infracost breakdown --path plan.json
  ```

## Diff

This command shows a diff of monthly costs between current and planned state. You can point Infracost to either a Terraform directory, or plan JSON file, using the `--path` flag.

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same diff output.

### Option 1: Terraform directory

This is the default and recommended option. It does not require a Terraform plan so it's super-fast. Internally Infracost parses the Terraform HCL code directly thus no cloud credentials or Terraform secrets are required. To show cost estimate diff:

<ol type="i">
  <li>Generate an Infracost JSON file as the baseline:</li>

  ```shell
  cd path/to/code

  # Terraform variables can be set using --terraform-var-file or --terraform-var
  infracost breakdown --path . --format json --out-file infracost-base.json
  ```

  <li>Edit your Terraform project:</li>

  ```shell
  vim main.tf
  ```

  <li>Generate a diff by comparing the latest code change with the baseline:</li>

  ```shell
  infracost diff --path . --compare-to infracost-base.json
  ```
</ol>

The same [notes from breakdown](/docs/features/cli_commands/#notes) apply to this method of running diff.

#### Compare Infracost runs

The `infracost diff` command can also be used to compare Infracost runs. Assuming you generated the files `infracost-last-week.json` and `infracost-today.json` using the `infracost breakdown --path /code --format json` command, you can compare them using:

```shell
infracost diff --path infracost-today.json --compare-to infracost-last-week.json
```

### Option 2: Terraform plan JSON

If the above method does not work for your use-case, you can use Terraform to generate a plan JSON file (as shown below), and point Infracost to it using `--path`. With this option, Infracost parses the current and planned state from the plan JSON file, thus you do not need to run a `infracost breakdown` to create a baseline first.

  ```shell
  cd path/to/code

  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json

  infracost diff --path plan.json
  ```

## Project names

Infracost auto-generates project names based on the user-provided path, or git repo name. The name appears in the CLI output, pull request comments and Infracost Cloud. When paths such as `/tmp/plan.json` are used, you might want to override it with a more understandable name. Use the `--project-name` flag with `infracost breakdown` and `diff` to achieve this. This flag can also be set in CI/CD integrations, where you can also use environment variables to customize the value.

```shell
infracost breakdown --path plan.json --project-name my-project-123

infracost diff --path plan.json --project-name my-project-123
```

:::tip
The `--project-name` flag should be set to the same value for both `infracost breakdown` and `diff` commands in CI/CD integrations. Otherwise the diff command will not be able to match the projects from the first breakdown run. Failing to do this results in odd diffs.
:::

The `name` attribute in [config-files](/docs/features/config_file/) provides the same functionality as `--project-name`.

## Comment on pull requests

The Infracost CLI can post cost estimates to pull request or commits on [GitHub](#github), [GitLab](#gitlab), [Azure Repos](#azure-repos) and [Bitbucket](#bitbucket), which is useful in CI/CD pipelines.

<details><summary>Example commands to post a pull request comment</summary>

  ```shell
  # Generate Infracost JSON files as the baseline
  git checkout main
  infracost breakdown --path dev --format json --out-file infracost-base-dev.json
  infracost breakdown --path prod --format json --out-file infracost-base-prod.json

  # Generate a diff by comparing the latest code change with the baselines
  git checkout my-branch
  infracost diff --path dev --format json \
      --compare-to infracost-base-dev.json --out-file infracost-report-dev.json
  infracost diff --path prod --format json \
      --compare-to infracost-base-prod.json --out-file infracost-report-prod.json

  # Post one comment with above Infracost JSON files, glob patterns need quotes
  infracost comment github --path "infracost-report-*.json" ...
  ```
</details>

The following `--behavior` options are supported when posting cost estimate comments:
  - `update` (good default): Create a single comment and update it. The "quietest" option.
  - `hide-and-new`: Minimize previous comments and create a new one. Only supported by GitHub.
  - `delete-and-new`: Delete previous comments and create a new one.
  - `new`: Create a new cost estimate comment on every push.

### GitHub

Run `infracost comment github --help` to see the options.

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
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `$GITHUB_API_URL` in GitHub Actions.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `https://GITHUB_SERVER/api`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `https://GITHUB_SERVER/api`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `https://GITHUB_SERVER/api`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

### GitLab

Run `infracost comment gitlab --help` to see the options.

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
- `--gitlab-server-url`: optional, URL for GitLab Enterprise users (default "https://gitlab.com"). In GitLab CI you can set this to `$CI_SERVER_URL`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--gitlab-server-url`: optional, URL for GitLab Enterprise users (default "https://gitlab.com").
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

### Bitbucket

Run `infracost comment bitbucket --help` to see the options.

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
- `--bitbucket-server-url`: optional, URL for Bitbucket Server/Data Center users (default "https://bitbucket.org").
- `--exclude-cli-output`: optional, exclude CLI output so comment has just the summary table.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--bitbucket-server-url`: optional, URL for Bitbucket Server/Data Center users (default "https://bitbucket.org").
- `--exclude-cli-output`: optional, exclude CLI output so comment has just the summary table.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

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
- `--bitbucket-server-url`: optional, URL for Bitbucket Server/Data Center users (default "https://bitbucket.org").
- `--exclude-cli-output`: optional, exclude CLI output so comment has just the summary table.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).

## Combined output formats

The Infracost CLI can generate cost estimates in many formats: `json`, `diff`, `table`, `html`, `github-comment`, `gitlab-comment`, `azure-repos-comment`, `bitbucket-comment` and `slack-message`. To use them:

1. Generate Infracost JSON output for each Terraform project and combine them into one file. This is the recommended way to store the snapshot of a cost estimate; it can be used by the CLI to generate other formats. The JSON format can also be used to setup [cost policies](/docs/features/cost_policies/).
  ```sh
  infracost breakdown --path dev --format json --out-file infracost-dev.json
  infracost breakdown --path prod --format json --out-file infracost-prod.json

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

  **Tip**: You can use `jq` to extract values, for example:

  ```shell
  # To see the total monthly cost increase of a project you can use:
  infracost breakdown --path /code --format json | jq -r '.projects[0].diff.totalMonthlyCost'
  # To see the sum of all projects:
  infracost breakdown --path /code --format json | jq -r '.diffTotalMonthlyCost'
  ```

  Here is an example of the full JSON output:

```json
{
  "version": "0.2",
  "currency": "USD",
  "projects": [
    {
      "name": "infracost/infracost/examples/terraform",
      // The metadata section is not finalized and is subject to change
      "metadata": {
        "path": "examples/terraform",
        "type": "terraform_dir",
        /* can be "breakdown" or "diff" so it's clear how the JSON file was generated */
        "infracostCommand": "breakdown",
        /* name of the branch that was used to generate the estimate */
        "branch": "master",
        /* long commit SHA of the branch that was used to generate the estimate */
        "commit": "1af413ad15ad6cbdfca667361231231231231231",
        /* git author name of the commit */
        "commitAuthorName": "Ali Khajeh-Hosseini",
        /* git email of author of commit */
        "commitAuthorEmail": "ali@email.com",
        /* timestamp of the commit, ISO 8601 UTC string */
        "commitTimestamp": "2022-06-27T16:03:44Z",
        /* the commit message */
        "commitMessage": "feat: change instance type",
        "vcsRepoUrl": "git@github.com:infracost/infracost.git",
        "vcsSubPath": "examples/terraform"
        /*
        The following metadata are currently only populated for GitHub Action and GitLab CI:
        "vcsProvider": name of the VCS provider (github, gitlab, azure_repos, bitbucket)
        "vcsBaseBranch": name of the base branch that the pull request is being merged into
        "vcsPullRequestTitle": name of the pull request
        "vcsPullRequestUrl": link to the pull request
        "vcsPullRequestID": the unique identifier of the pull request for the vcsProvider
        "vcsPullRequestAuthor": name of the person who opened the pull request, this is probably the same as commitAuthor most of the time but it's helpful to see this if they're different
        "vcsPipelineRunId": a way to differentiate pipelines that are run within one pull request, this is the top-level pipeline ID, not individual jobs/runs within it. */
      },
      /* When Infracost is used with a Terraform plan JSON, this contains any
      resources that are in the prior Terraform state.

      When Infracost is used with a Terraform directory, this contains any
      resources that are found in the `--compare-to` part of
      `infracost diff --compare-to /code` */
      "pastBreakdown": {
        "resources": [],
        "totalHourlyCost": "0",
        "totalMonthlyCost": "0"
      },
      /* When Infracost is used with a Terraform plan JSON, this contains
      the breakdown of resources that are in the planned Terraform state.

      When Infracost is used with a Terraform directory, this contains the
      breakdown of resources that are found in `--path` part of
      `infracost breakdown --path /code` */
      "breakdown": {
        "resources": [
          {
            "name": "aws_instance.web_app",
            "metadata": {
              "calls": [
                {
                  "blockName": "aws_instance.web_app",
                  "filename": "main.tf"
                }
              ],
              "filename": "main.tf"
            },
            "hourlyCost": "1.017315068493150679",
            "monthlyCost": "742.64",
            "costComponents": [
              {
                "name": "Instance usage (Linux/UNIX, on-demand, m5.4xlarge)",
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
                    "name": "Storage (general purpose SSD, gp2)",
                    "unit": "GB",
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
                    "name": "Storage (provisioned IOPS SSD, io1)",
                    "unit": "GB",
                    "hourlyQuantity": "1.3698630136986301",
                    "monthlyQuantity": "1000",
                    "price": "0.125",
                    "hourlyCost": "0.1712328767123287625",
                    "monthlyCost": "125"
                  },
                  {
                    "name": "Provisioned IOPS",
                    "unit": "IOPS",
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
            "metadata": {
              "calls": [
                {
                  "blockName": "aws_lambda_function.hello_world",
                  "filename": "main.tf"
                }
              ],
              "filename": "main.tf"
            },
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
      // This contains the diff of resources between the pastBreakdown and breakdown
      "diff": {
        "resources": [
          {
            "name": "aws_instance.web_app",
            "metadata": {},
            "hourlyCost": "1.017315068493150679",
            "monthlyCost": "742.64",
            "costComponents": [
              {
                "name": "Instance usage (Linux/UNIX, on-demand, m5.4xlarge)",
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
                    "name": "Storage (general purpose SSD, gp2)",
                    "unit": "GB",
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
                    "name": "Storage (provisioned IOPS SSD, io1)",
                    "unit": "GB",
                    "hourlyQuantity": "1.3698630136986301",
                    "monthlyQuantity": "1000",
                    "price": "0.125",
                    "hourlyCost": "0.1712328767123287625",
                    "monthlyCost": "125"
                  },
                  {
                    "name": "Provisioned IOPS",
                    "unit": "IOPS",
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
        "totalHourlyCost": "1.017315068493150679",
        "totalMonthlyCost": "742.64"
      },
      // The summary format is not finalized and is subject to change
      "summary": {
        "totalDetectedResources": 2,
        "totalSupportedResources": 2,
        "totalUnsupportedResources": 0,
        "totalUsageBasedResources": 2,
        "totalNoPriceResources": 0,
        "unsupportedResourceCounts": {},
        "noPriceResourceCounts": {}
      }
    }
  ],
  "totalHourlyCost": "1.017315068493150679",
  "totalMonthlyCost": "742.64",
  "pastTotalHourlyCost": "0",
  "pastTotalMonthlyCost": "0",
  "diffTotalHourlyCost": "1.017315068493150679",
  "diffTotalMonthlyCost": "742.64",
  "timeGenerated": "2022-05-23T20:11:05.005205-07:00",
  // The summary format is not finalized and is subject to change
  "summary": {
    "totalDetectedResources": 2,
    "totalSupportedResources": 2,
    "totalUnsupportedResources": 0,
    "totalUsageBasedResources": 2,
    "totalNoPriceResources": 0,
    "unsupportedResourceCounts": {},
    "noPriceResourceCounts": {}
  }
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
    See the Integrations > Slack page for more details.

    <img src={useBaseUrl("img/screenshots/slack-message-format.png")} alt="Infracost Slack message report" />
  </TabItem>
</Tabs>

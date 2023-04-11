---
slug: cli_commands
title: CLI commands
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost has multiple commands, all of which support `--help`:
- Basic commands:
  - [`infracost breakdown`](#breakdown): Show breakdown of costs, can also be used to generate a baseline
  - [`infracost diff`](#diff): Show diff of monthly costs between current branch and baseline
  - [`infracost generate config`](#generate-config): Generate Infracost config file from a template file

- The following commands work with the Infracost JSON output, which is generated via `infracost diff --format json`:
  - [`infracost output`](#combined-output-formats): Combine and output Infracost JSON files in different formats
  - [`infracost comment`](#comment-on-pull-requests): Post cost estimates to pull requests in GitHub, GitLab, Azure Repos and Bitbucket
  - [`infracost upload`](#upload-runs): Upload an Infracost JSON file to Infracost Cloud

- The following auxiliary commands are also helpful:
  - `infracost configure`: Display or change global configuration, including currency settings
  - `infracost auth login`: Get a free Infracost API key
  - `infracost completion`: Generate shell completion script

## Repos and project

See [this section](/docs/infracost_cloud/key_concepts/#repos) for details about repos and projects, and how you can customize project names.

## Breakdown

This command shows a breakdown of costs. It can also generate Infracost JSON output. You can point Infracost to either a Terraform directory, or plan JSON file, using the `--path` flag.

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown output.

### Option 1: Terraform directory (recommended)

This is the **default and recommended** option. It does not require a Terraform plan so it's super-fast. Internally Infracost parses the Terraform HCL code directly thus no cloud credentials or Terraform secrets are required.

  ```shell
  cd path/to/code

  # Terraform variables can be set using --terraform-var-file or --terraform-var
  infracost breakdown --path .
  ```

#### Notes

Usually no extra setup is needed for handling the following on your local development machines. For CI/CD, see the corresponding pages.
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

### CDK for Terraform

The [CDK for Terraform](https://developer.hashicorp.com/terraform/cdktf) is also supported as it can generate Terraform. Thus the same Terraform directory option can be used to get a cost breakdown:

  ```shell
  cd path/to/code

  cdktf synth

  infracost breakdown --path cdktf.out/stacks/mystack/
  ```

## Diff

This command shows a diff of monthly costs between current and planned state. You can point Infracost to either a Terraform directory, or plan JSON file, using the `--path` flag.

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same diff output.

### Option 1: Terraform directory (recommended)

This is the **default and recommended** option. It does not require a Terraform plan so it's super-fast. Internally Infracost parses the Terraform HCL code directly thus no cloud credentials or Terraform secrets are required. To show cost estimate diff:

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

  See [this example JSON output](/docs/features/json_output_format/). You can use `jq` to extract values, for example:

  ```shell
  infracost breakdown --path /code --format json --out-file infracost-base.json
  # Edit your Terraform project, e.g. vim main.tf
  infracost diff --path . --compare-to infracost-base.json --format json --out-file infracost.json

  # To see the total monthly cost increase of a project:
  cat infracost.json | jq -r '.projects[0].diff.totalMonthlyCost'
  # To see the sum of all projects:
  cat infracost.json | jq -r '.diffTotalMonthlyCost'
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
    <p>The following screenshot is for the <code>github-comment</code> format. The <code>gitlab-comment</code>, <code>azure-repos-comment</code> and <code>bitbucket-comment</code> formats produce similar output.</p>
    <img src={useBaseUrl("img/screenshots/github-comment-format.png")} alt="Infracost GitHub comment report" />
  </TabItem>
  <TabItem value="slack-message">
    <p>See the <a href="/docs/integrations/slack">Slack integration</a> page for more details.</p>
    <img src={useBaseUrl("img/screenshots/slack-message-format.png")} alt="Infracost Slack message report" />
  </TabItem>
</Tabs>

## Comment on pull requests

The Infracost CLI can post cost estimates to pull request or commits on [GitHub](#github), [GitLab](#gitlab), [Azure Repos](#azure-repos) and [Bitbucket](#bitbucket), which is useful in CI/CD pipelines.

<details><summary>Example commands to post a pull request comment</summary>

  ```shell
  # Generate Infracost JSON baseline
  git checkout main
  infracost breakdown --config-file infracost.yml --format json \
      --out-file infracost-base.json

  # Generate a diff by comparing the latest code change with the baseline
  git checkout my-branch
  infracost diff --config-file infracost.yml --format json \
      --compare-to infracost-base.json --out-file infracost.json

  # Post one comment with above Infracost JSON file
  infracost comment github --path infracost.json ...
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
infracost comment github --path=infracost.json \
    --repo=$GITHUB_REPOSITORY \
    --pull-request=$PR_NUMBER `# or --commit=$GITHUB_SHA` \
    --github-token=$GITHUB_TOKEN \
    --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use the predefined `$GITHUB_REPOSITORY` environment variable.
- `--pull-request`: required to post on a pull request, can be extracted from workflows's event and set as an environment variable: `PR_NUMBER: ${{ github.event.number }}`. Mutually exclusive with the `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$GITHUB_SHA`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, use `$GITHUB_TOKEN`.
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `$GITHUB_API_URL` in GitHub Actions. Also see `--github-tls-cert-file`, `--github-tls-key-file` and `--github-tls-insecure-skip-verify`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

#### Azure Pipelines with GitHub

```sh
infracost comment github --path=infracost.json \
    --repo=$BUILD_REPOSITORY_NAME \
    --pull-request=$SYSTEM_PULLREQUEST_PULLREQUESTNUMBER `# or --commit=$BUILD_SOURCEVERSION` \
    --github-token=$GITHUB_TOKEN \
    --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use the predefined `$BUILD_REPOSITORY_NAME` environment variable.
- `--pull-request`: required to post on a pull request, `$SYSTEM_PULLREQUEST_PULLREQUESTNUMBER`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$BUILD_SOURCEVERSION`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, use `$GITHUB_TOKEN`.
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `https://GITHUB_SERVER/api`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

#### Atlantis with GitHub

```sh
infracost comment github --path=infracost.json \
    --repo=$BASE_REPO_OWNER/$BASE_REPO_NAME \
    --pull-request=$PULL_NUM `# or --commit=$HEAD_COMMIT` \
    --github-token=$GITHUB_TOKEN \
    --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$BASE_REPO_OWNER/$BASE_REPO_NAME` combination of predefined environment variables.
- `--pull-request`: required to post on a pull request, use `$PULL_NUM`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$HEAD_COMMIT`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, provide your GitHub token, for example, as an environment variable `$GITHUB_TOKEN`.
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `https://GITHUB_SERVER/api`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

#### CircleCI with GitHub

```sh
infracost comment github --path=infracost.json \
                         --repo=$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME \
                         --pull-request=${CIRCLE_PULL_REQUEST##*/} `# or --commit=$CIRCLE_SHA1` \
                         --github-token=$GITHUB_TOKEN \
                         --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME` combination of predefined environment variables.
- `--pull-request`: required to post on a pull request, use `${CIRCLE_PULL_REQUEST##*/}` to extract the pull request's number from its URL. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a pull request's commit, use `$CIRCLE_SHA1`. Mutually exclusive with `--pull-request` flag.
- `--github-token`: required, provide your GitHub token, for example, as an environment variable `$GITHUB_TOKEN`.
- `--github-api-url`: optional (default "https://api.github.com"), GitHub Enterprise users can set this to `https://GITHUB_SERVER/api`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

### GitLab

Run `infracost comment gitlab --help` to see the options.

#### GitLab CI

```sh
infracost comment gitlab --path=infracost.json \
    --repo=$CI_PROJECT_PATH \
    --merge-request=$CI_MERGE_REQUEST_IID `# or --commit=$CI_COMMIT_SHA` \
    --gitlab-token=$GITLAB_TOKEN \
    --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use the predefined `$CI_PROJECT_PATH` environment variable.
- `--merge-request`: required to post on a merge request, use `$CI_MERGE_REQUEST_IID`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a merge request's commit, use `$CI_COMMIT_SHA`. Mutually exclusive with `--merge-request` flag.
- `--gitlab-token`: required, use `$GITLAB_TOKEN`.
- `--gitlab-server-url`: optional, URL for GitLab Enterprise users (default "https://gitlab.com"). In GitLab CI you can set this to `$CI_SERVER_URL`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

#### Atlantis with GitLab

```sh
infracost comment gitlab --path=infracost.json \
    --repo=$BASE_REPO_OWNER/$BASE_REPO_NAME \
    --merge-request=$PULL_NUM `# or --commit=$HEAD_COMMIT` \
    --gitlab-token=$GITLAB_TOKEN \
    --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo`: required, use this `$BASE_REPO_OWNER/$BASE_REPO_NAME` combination of predefined environment variables.
- `--merge-request`: required to post on a merge request, use `$PULL_NUM`. Mutually exclusive with `--commit` flag.
- `--commit`: required to post on a merge request's commit, use `$HEAD_COMMIT`. Mutually exclusive with `--merge-request` flag.
- `--gitlab-token`: required, provide your GitLab token as an environment variable, for example as `$GITLAB_TOKEN`.
- `--gitlab-server-url`: optional, URL for GitLab Enterprise users (default "https://gitlab.com").
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

### Azure Repos

Run `infracost comment azure-repos --help` to see the options. You might find the following common examples helpful.

#### Azure Pipelines with Azure Repos

```sh
infracost comment azure-repos --path=infracost.json \
                              --repo-url=$BUILD_REPOSITORY_URI \
                              --pull-request=$SYSTEM_PULLREQUEST_PULLREQUESTID \
                              --azure-access-token=$SYSTEM_ACCESSTOKEN \
                              --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo-url`: required, use `$BUILD_REPOSITORY_URI` predefined environment variable.
- `--pull-request`: required to post on a pull request, `$SYSTEM_PULLREQUEST_PULLREQUESTID`.
- `--azure-access-token`: required, use `$SYSTEM_ACCESSTOKEN`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

#### Atlantis with Azure Repos

```sh
infracost comment azure-repos --path=infracost.json \
                              --repo-url=$AZURE_REPO_URL \
                              --pull-request=$PULL_NUM \
                              --azure-access-token=$AZURE_ACCESS_TOKEN \
                              --behavior=update
```

- `--path`: required, path to Infracost JSON files, glob patterns need quotes.
- `--repo-url`: required, provide your repo's URL as an environment variable, for example as `$AZURE_REPO_URL`.
- `--pull-request`: required to post on a pull request, use `$PULL_NUM`.
- `--azure-access-token`: required, provide your Azure DevOps access token, for example, as an environment variable `$AZURE_ACCESS_TOKEN`.
- `--tag`: optional, customize hidden markdown tag used to detect comments posted by Infracost.
- `--policy-path`: optional, path to Infracost [cost policy](/docs/features/cost_policies/) files, glob patterns need quotes (experimental).
- `--show-all-projects`: optional, show all projects in the table of the comment output.

### Bitbucket

Run `infracost comment bitbucket --help` to see the options.

#### Bitbucket Pipelines

```sh
infracost comment bitbucket --path=infracost.json \
                            --repo=$BITBUCKET_WORKSPACE/$BITBUCKET_REPO_SLUG \
                            --pull-request=$BITBUCKET_PR_ID `# or --commit=$BITBUCKET_COMMIT` \
                            --bitbucket-token=$BITBUCKET_TOKEN \
                            --behavior=update
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
- `--show-all-projects`: optional, show all projects in the table of the comment output.

#### CircleCI with Bitbucket

```sh
infracost comment bitbucket --path infracost.json \
    --repo=$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME \
    --pull-request=${CIRCLE_PULL_REQUEST##*/} `# or --commit=$CIRCLE_SHA1` \
    --bitbucket-token=$BITBUCKET_TOKEN \
    --behavior=update
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
- `--show-all-projects`: optional, show all projects in the table of the comment output.

#### Atlantis with Bitbucket

```sh
infracost comment bitbucket --path=infracost.json \
    --repo=$BASE_REPO_OWNER/$BASE_REPO_NAME \
    --pull-request=$PULL_NUM `# or --commit=$HEAD_COMMIT` \
    --bitbucket-token=$BITBUCKET_TOKEN \
    --behavior=update
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
- `--show-all-projects`: optional, show all projects in the table of the comment output.

## Upload runs

When you use the `infracost comment` command, Infracost automatically detects pull request and commit metadata from various CI/CD systems. The metadata is stored in the Infracost JSON output as it is useful to show you what repo, pull request or commit was used to generate the cost estimate.

The metadata is also needed by Infracost Cloud's dashboard to show you pull request costs over time. If you **do not** use `infracost comment`, you can still define this metadata as follows and use Infracost Cloud as normal:
1. Set the [required environment variables](/docs/features/environment_variables/#environment-variables-to-set-metadata) **before** you run `infracost breakdown` and `diff`.
2. If you have multiple Terraform projects in your repo, use a [config file](/docs/features/config_file/) to combine them into one Infracost JSON file.
3. In your CI/CD system, run `infracost upload --path infracost.json`. This uploads the Infracost JSON file to Infracost Cloud and associates it with the organization from your `INFRACOST_API_KEY`. This command uploads the data regardless of your Org Settings.

  Example commands:
  ```shell
  # Generate Infracost JSON baseline
  git checkout main
  infracost breakdown --config-file infracost.yml --format json \
      --out-file infracost-base.json

  # Generate a diff by comparing the latest code change with the baseline
  git checkout my-branch
  infracost diff --config-file infracost.yml --format json \
      --compare-to infracost-base.json --out-file infracost.json

  # Instead of using `infracost comment`, just upload the file to Infracost Cloud
  infracost upload --path infracost.json
  ```

If you defined pull request metadata, you should see the cost estimate in your Infracost Cloud dashboard. If you did not define pull request metadata and only defined commit metadata, you should see the cost estimate in the Repos > All estimates page.

## Pull request status

The Infracost [GitHub App](/docs/integrations/github_app/) integration automatically sets the pull request status from the events that GitHub sends Infracost Cloud. If you are not using that integration, or want to set the statuses manually, use the following API call from your CI/CD system (e.g. Jenkins):

```shell
curl -X POST -H "Content-Type: application/json" \
-H "X-API-Key: $INFRACOST_API_KEY" \
-d '{ "query": "mutation { updatePullRequestStatus(url: \"https://github.com/YOUR_ORG/YOUR_REPO/pull/323\\", status: MERGED) }" }' \
https://dashboard.api.infracost.io/graphql
```

The pull request status can be one of three:
  - `OPEN`: the pull request is currently open, thus if you want to review the most expensive pull requests that are in-flight, only focus on these.
  - `CLOSED`: the pull request was closed without being merged. These pull requests can probably be ignored altogether as most of the time they're just noise.
  - `MERGED`: the pull request was merged into the base branch, these can be checked when auditing actual cloud costs to see what happened.


<details><summary>Example GitLab CI code to set status to Merged</summary>

  ```yaml
  stages:
    - infracost # the main infracost stage from https://gitlab.com/infracost/infracost-gitlab-ci
    - infracost:update-mr-status # new stage below to update the merge request status

  # Set the MR status to Merged in Infracost Cloud
  infracost:update-mr-status:
    image: bash:latest
    before_script:
      - apk add curl --upgrade
      # Extract Merge Request ID from the Commit Message
      - if [[ ${CI_COMMIT_MESSAGE} =~ ${PATTERN} ]];
        then MR_ID=${BASH_REMATCH[1]};
        else echo "${VTY_RB}Unable to extract Merge Request ID${VTY_P}"; exit 1;
        fi;
    script:
      - |
        curl \
          --request POST \
          --header "Content-Type: application/json" \
          --header "X-API-Key: ${INFRACOST_API_KEY}" \
          --data "{ \"query\": \"mutation {updatePullRequestStatus( url: \\\"${CI_PROJECT_URL}/merge_requests/${MR_ID}\\\", status: MERGED )}\" }" \
          "https://dashboard.api.infracost.io/graphql";
    variables:
      PATTERN: "See merge request.+?!([0-9]+)"
      INFRACOST_API_KEY: $INFRACOST_API_KEY
    rules:
      - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH && $CI_COMMIT_TITLE =~ /^Merge branch/
  ```
</details>

<details><summary>Example Azure Pipelines code to set status to Merged</summary>

  ```yaml
  trigger:
    - main
  
  pool:
    vmImage: ubuntu-latest
  
  steps:
    - bash: |
        PATTERN="Merged PR ([0-9]+):"
        if [[ "$(Build.SourceVersionMessage)" =~ $PATTERN ]]; then 
          PR_ID=${BASH_REMATCH[1]}
          echo "Updating status of $PR_ID"
          curl \
            --request POST \
            --header "Content-Type: application/json" \
            --header "X-API-Key: $(infracostApiKey)" \
            --data "{ \"query\": \"mutation {updatePullRequestStatus( url: \\\"$(Build.Repository.Uri)/pullrequest/${PR_ID}\\\", status: MERGED )}\" }" \
            "https://dashboard.api.infracost.io/graphql";
        else 
          echo "No Pull Request ID detected"
        fi
      displayName: 'Update PR status in Infracost'

  ```
</details>

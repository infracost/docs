---
slug: /
title: Getting started
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows hourly and monthly cost estimates for a Terraform project. This helps users quickly see the cost breakdown and compare different deployment options upfront.

The [Infracost GitHub Action](integrations#github-action) or [GitLab CI template](integrations#gitlab-ci) can be used to automatically add a PR comment showing the cost estimate `diff` between a pull/merge request and the master branch.

## Installation

1. Install the latest Infracost release:
  <Tabs
    defaultValue="macos-homebrew"
    values={[
      {label: 'macOS (Homebrew)', value: 'macos-homebrew'},
      {label: 'macOS (manual)', value: 'macos-manual'},
      {label: 'Linux', value: 'linux'},
      {label: 'Docker', value: 'docker'}
    ]}>
    <TabItem value="macos-homebrew">

    ```sh
    brew install infracost
    ```

    </TabItem>
    <TabItem value="macos-manual">

    ```sh
    curl -s -L https://github.com/infracost/infracost/releases/latest/download/infracost-darwin-amd64.tar.gz | tar xz -C /tmp && \
    sudo mv /tmp/infracost-darwin-amd64 /usr/local/bin/infracost
    ```

    </TabItem>
    <TabItem value="linux">

    ```sh
    curl -s -L https://github.com/infracost/infracost/releases/latest/download/infracost-linux-amd64.tar.gz | tar xz -C /tmp && \
    sudo mv /tmp/infracost-linux-amd64 /usr/local/bin/infracost
    ```

    </TabItem>
    <TabItem value="docker">

    ```sh
    docker pull infracost/infracost

    docker run --rm \
      -e INFRACOST_API_KEY=see_following_step_on_how_to_get_this \
      -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
      -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
      -v $PWD/:/code/ infracost/infracost --tfdir /code/
      # add other required flags for infracost or envs for Terraform
    ```

    </TabItem>
  </Tabs>

2.	Use our free hosted API for cloud prices by registering for an API key:
    ```sh
    infracost register
    ```

    The `INFRACOST_API_KEY` environment variable can be used to set the API key in CI systems.
    If you prefer, you can run your own [Cloud Pricing API](faq#can-i-run-my-own-cloud-pricing-api).

3.	Run Infracost using our example Terraform project to see how it works. You can also play with the `main.tf` file in the example:

    ```sh
    git clone https://github.com/infracost/example-terraform.git
    infracost --tfdir example-terraform/aws
    ```

## Usage methods

Infracost can be run with different options depending on the use-case, for example:

### 1. Terraform directory

This is the default method. Point to the Terraform directory using `--tfdir` and pass any required Terraform flags using `--tfflags`. Internally Infracost runs Terraform `init`, `plan` and `show`; `init` requires cloud credentials to be set, e.g. via the usual `AWS_ACCESS_KEY_ID` environment variables. This method works with remote state too.
  ```sh
  infracost --tfdir /path/to/code --tfflags "-var-file=myvars.tfvars"
  ```

### 2. Terraform state file

Point to the Terraform directory using `--tfdir` and instruct Infracost to use the Terraform state file using `--use-tfstate`. This implies that you have already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set. This method takes less time to run compared with method #1 and also works with remote state.
  ```sh
  terraform init

  infracost --tfdir /path/to/code --use-tfstate
  ```

### 3. Terraform plan JSON

Point to an existing Terraform plan JSON file using `--tfjson`. This implies that the user has already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set.
  ```sh
  cd path/to/code
  terraform init
  terraform plan -out plan.save .
  terraform show -json plan.save > plan.json

  infracost --tfjson plan.json
  ```

### 4. Terraform plan file

Point to the Terraform directory and use the Terraform plan. This implies that the user has already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set. This method works with remote state too.
  ```sh
  cd path/to/code
  terraform init
  terraform plan -out plan.save .

  infracost --tfdir /path/to/code --tfplan plan.save
  ```

## Useful options

Run `infracost --help` to see the available options, which include:
```sh
--output value  Output format (json, table) (default: "table")
--show-skipped  Show unsupported resources, some of which might be free (default: false)
--no-color      Turn off colored output (default: false)
```

### Environment variables

`INFRACOST_API_KEY`: Infracost API key, run `infracost register` to get one.

`TERRAFORM_BINARY`: used to change the path to the `terraform` binary:
  ```sh
  TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir /path/to/code
  ```

`INFRACOST_SKIP_UPDATE_CHECK=true`: can be useful in CI/CD systems to skip the Infracost update check.

`INFRACOST_LOG_LEVEL`: can be set to `warn` in CI/CD systems to reduce noise.

Standard Terraform environment variables such as `TF_*` can also be added if required, for example:
```sh
TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost --tfdir /path/to/code
```

### Terragrunt users

There are currently two methods of using Infracost with Terragrunt:

1. For costs for a single Terragrunt directory you can run infracost with the `TERRAFORM_BINARY` environment variable set to `terragrunt`. For example:
    ```sh
    TERRAFORM_BINARY=terragrunt infracost --tfdir=/path/to/code
    ```

2. For aggregating costs across multiple Terragrunt directories, i.e. in cases where you would run terragrunt *-all, you can use the `infracost report` command to combine multiple Infracost JSON files into a single table. For an example of a script that does this see [scripts/terragrunt/report_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/report_all.sh).

If you have any feedback about the above methods, please leave on comment on [the GitHub issue](https://github.com/infracost/infracost/issues/224) or join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.

### Terraform Cloud users

Infracost supports Terraform Cloud, AWS S3 or other remote state stores. If you use Terraform Cloud with Remote Execution Mode, please subscribe to [this GitHub issue](https://github.com/infracost/infracost/issues/221) for updates as we're working on supporting it too.

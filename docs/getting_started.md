---
slug: /
title: Getting started
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows cloud cost estimates for a Terraform project. It helps developers, devops and others to quickly see the cost breakdown and compare different options upfront.

## Installation

1. Assuming [Terraform](https://www.terraform.io/downloads.html) is already installed, get the latest Infracost release:
  <Tabs
    defaultValue="macos-homebrew"
    values={[
      {label: 'macOS Homebrew', value: 'macos-homebrew'},
      {label: 'macOS manual', value: 'macos-manual'},
      {label: 'Linux', value: 'linux'},
      {label: 'Docker', value: 'docker'},
      {label: 'Windows', value: 'windows'}
    ]}>
    <TabItem value="macos-homebrew">

    ```sh
    brew install infracost
    ```

    Subsequent updates can be installed in the usual way: `brew upgrade infracost`

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
    <TabItem value="windows">

    Download and unzip the [infracost-windows-amd64.tar.gz](https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.tar.gz) file. It has an .exe file that you should move to a folder that is in your `PATH` environment variable. [This Stack Overflow article](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows) contains instructions for setting the PATH on Windows through the user interface.

    </TabItem>
  </Tabs>

2.	Use our free Cloud Pricing API by registering for an API key:
    ```sh
    infracost register
    ```

    The key is saved in `~/.config/infracost/config.yml`. If you prefer, you can run your own [Cloud Pricing API](faq#can-i-run-my-own-cloud-pricing-api).

3.	Run Infracost using our example Terraform project to see how it works.

    ```sh
    git clone https://github.com/infracost/example-terraform.git
    cd example-terraform
    # You can play with `aws/main.tf` and re-run infracost to compare costs
    infracost --tfdir aws
    ```

The [Infracost GitHub Action](integrations#github-action), [GitLab CI template](integrations#gitlab-ci) or [CircleCI Orb](integrations#circleci) can be used to automatically add a comment showing the cost estimate `diff` between a pull/merge request and the master branch.

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
--output value  Output format: json, table, html (default: "table")
--show-skipped  Show unsupported resources, some of which might be free. Only for table and HTML output (default: false)
--no-color      Turn off colored output (default: false)
```

### Report

The `infracost report` command can be used to generate table or HTML reports from multiple infracost JSON files. These reports can be uploaded to object storage such as AWS S3 and shared with others.
```sh
infracost --tfdir /path/to/module1 --output json > module1.json
infracost --tfdir /path/to/module2 --output json > module2.json

infracost report --output html module*.json > report.html
```

Run `infracost report --help` to see the available options.

<img src={useBaseUrl("img/html_report.png")} alt="Infracost HTML report" width="70%" />

### Environment variables

`INFRACOST_API_KEY`: Infracost API key, run `infracost register` to get one.

`TERRAFORM_BINARY`: used to change the path to the `terraform` binary:
  ```sh
  TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir /path/to/code
  ```

`TERRAFORM_CLOUD_TOKEN`: for Terraform Cloud/Enterprise users, set this to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) so Infracost can use it to access the plan. Optionally, `TERRAFORM_CLOUD_HOST` can be used to override the default `app.terraform.io` backend host for Terraform Enterprise users.

`INFRACOST_SKIP_UPDATE_CHECK=true`: can be useful in CI/CD systems to skip the Infracost update check. Be sure to upgrade regularly as we continually add new resources to Infracost.

`INFRACOST_LOG_LEVEL`: can be set to `warn` in CI/CD systems to reduce noise, or `debug` to troubleshoot.

Standard Terraform [environment variables](https://www.terraform.io/docs/commands/environment-variables.html) such as `TF_WORKSPACE` and `TF_CLI_CONFIG_FILE` can also be added if required, for example:
```sh
TF_WORKSPACE=dev infracost --tfdir /path/to/code

TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost --tfdir /path/to/code
```

### Terragrunt users

There are currently two methods of using Infracost with Terragrunt:

1. For costs for a single Terragrunt directory you can run infracost with the `TERRAFORM_BINARY` environment variable set to `terragrunt`. For example:
    ```sh
    TERRAFORM_BINARY=terragrunt infracost --tfdir=/path/to/code
    ```

2. For aggregating costs across multiple Terragrunt directories, i.e. in cases where you would run terragrunt *-all, you can use the `infracost report` command to combine multiple Infracost JSON files into a single table. For an example of a script that does this see [scripts/terragrunt/report_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/report_all.sh).

If you have any feedback about the above methods, please leave on comment on [this GitHub issue](https://github.com/infracost/infracost/issues/224) or join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.

### Terraform Cloud users

This section is only applicable for Terraform Cloud or Terraform Enterprise users.

Running Infracost locally requires no additional steps as your Terraform CLI config file is used to access the plan.

When running Infracost on CI/CD systems, you should **either**:
1. Set the `TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html). Optionally, `TERRAFORM_CLOUD_HOST` can be used to override the default `app.terraform.io` backend host for Terraform Enterprise users.
2. Set the Terraform environment variable [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file.

If you use multiple Terraform workspaces, set the Terraform environment variable `TF_WORKSPACE` to select a workspace. Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported".

---
slug: /
title: Getting started
description: Get started with Infracost in your Terraform workflow, integrate it into your pull requests and CI pipeline and view cost estimates for your AWS/Google cloud infrastructure.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows cloud cost estimates for Terraform projects. It helps developers, devops and others to quickly see the cost breakdown and compare different options upfront.

## Installation

### 1. Install Infracost
Assuming [Terraform](https://www.terraform.io/downloads.html) is already installed, get the latest Infracost release:
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

  Subsequent updates can be installed in the usual way: `brew upgrade infracost` (you might need `brew update` first if your brew version is old)

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
    -v $PWD/:/code/ infracost/infracost --terraform-dir /code/
    # add other required flags for infracost or envs for Terraform
  ```

  </TabItem>
  <TabItem value="windows">

  Download and unzip the [latest release](https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.tar.gz). Rename the file `infracost-windows-amd64` to `infracost.exe`, then run it from the Command Prompt or Powershell using `.\infracost.exe --no-color` alongside other required flags/commands (color output has a bug we need to fix on Windows). You should also move the exe file to a folder that is in your `PATH` [environment variable](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows), e.g. `C:\Windows`.

  </TabItem>
</Tabs>

### 2. Get API key
Use our free Cloud Pricing API by registering for an API key:
```sh
infracost register
```

The key is saved in `~/.config/infracost/credentials.yml`. If you prefer, you can run your own [Cloud Pricing API](faq#can-i-run-my-own-cloud-pricing-api).

### 3. Run it
Run Infracost using our example Terraform project to see how it works.

```sh
git clone https://github.com/infracost/example-terraform.git
cd example-terraform

# You can play with `aws/main.tf` and `aws/infracost-usage.yml`, and re-run infracost to compare costs
infracost --terraform-dir aws --usage-file aws/infracost-usage.yml
```

Our [CI/CD integrations](integrations) can be used to automatically add a comment showing the cost estimate `diff` between a pull request and the master branch.

## Usage methods

Infracost can be run with different options depending on the use-case. As mentioned in the [FAQ](/docs/faq), you can run Infracost in your Terraform directories without worrying about security or privacy issues as no cloud credentials, secrets, tags or Terraform resource identifiers are sent to the open-source [Cloud Pricing API](https://github.com/infracost/cloud-pricing-api). Infracost does not make any changes to your Terraform state or cloud resources. The Cloud Pricing API does not become aware of your cloud spend; it returns price points to the CLI so calculations can be done on your machine.

### Configuration file

The following usage methods are also supported by the Infracost [configuration file](/docs/config_file). We recommend that you create an `infracost.yml` file in each of your Terraform project repos using [this example](https://github.com/infracost/infracost/blob/master/infracost-example.yml). This file can be passed to Infracost using the `--config-file` option and has [many advantages](/docs/config_file#advantages).

### 1. Terraform directory

This is the default method. Point to the Terraform directory using `--terraform-dir` and pass any required Terraform flags using `--terraform-plan-flags`. Internally Infracost runs Terraform `init`, `plan` and `show`; `init` requires cloud credentials to be set, e.g. via the usual `AWS_ACCESS_KEY_ID` environment variables. This method works with remote state too.

<Tabs
  defaultValue="terraform-directory-cli"
  values={[
    {label: 'CLI flags', value: 'terraform-directory-cli'},
    {label: 'Config file', value: 'terraform-directory-config'},
  ]}>
  <TabItem value="terraform-directory-cli">

  ```sh
  infracost --terraform-dir /path/to/code \
            --terraform-plan-flags "-var-file=myvars.tfvars"
  ```

  </TabItem>
  <TabItem value="terraform-directory-config">

  ```yml
  projects:
    terraform:
      - dir: /path/to/code
        plan_flags: -var-file=myvars.tfvars
  ```

  </TabItem>
</Tabs>

### 2. Terraform state file

Point to the Terraform directory using `--terraform-dir` and instruct Infracost to use the Terraform state file using `--terraform-use-state`. This implies that you have already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set. This method takes less time to run compared with method #1 and also works with remote state.

<Tabs
  defaultValue="terraform-state-cli"
  values={[
    {label: 'CLI flags', value: 'terraform-state-cli'},
    {label: 'Config file', value: 'terraform-state-config'},
  ]}>
  <TabItem value="terraform-state-cli">

  ```sh
  terraform init

  infracost --terraform-dir /path/to/code --terraform-use-state
  ```

  </TabItem>
  <TabItem value="terraform-state-config">

  ```yml
  projects:
    terraform:
      - dir: /path/to/code
        use_state: true
  ```

  </TabItem>
</Tabs>

### 3. Terraform plan JSON

Point to an existing Terraform plan JSON file using `--terraform-json-file`. This implies that the user has already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set.

<Tabs
  defaultValue="terraform-json-cli"
  values={[
    {label: 'CLI flags', value: 'terraform-json-cli'},
    {label: 'Config file', value: 'terraform-json-config'},
  ]}>
  <TabItem value="terraform-json-cli">

  ```sh
  cd path/to/code
  terraform init
  terraform plan -out plan.save .
  terraform show -json plan.save > plan.json

  infracost --terraform-json-file plan.json
  ```

  </TabItem>
  <TabItem value="terraform-json-config">

  ```yml
  projects:
    terraform:
      - json_file: /path/to/plan.json
  ```

  </TabItem>
</Tabs>

### 4. Terraform plan file

Point to the Terraform directory and use the Terraform plan. This implies that the user has already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set. This method works with remote state too.

<Tabs
  defaultValue="terraform-plan-cli"
  values={[
    {label: 'CLI flags', value: 'terraform-plan-cli'},
    {label: 'Config file', value: 'terraform-plan-config'},
  ]}>
  <TabItem value="terraform-plan-cli">

  ```sh
  cd path/to/code
  terraform init
  terraform plan -out plan.save .

  infracost --terraform-dir /path/to/code --terraform-plan-file plan.save
  ```

  </TabItem>
  <TabItem value="terraform-plan-config">

  ```yml
  projects:
    terraform:
      - dir: /path/to/code
        plan_file: plan.save # This should be relative to the dir
  ```

  </TabItem>
</Tabs>

## Useful options

Run `infracost --help` to see the available options, which include:

<Tabs
  defaultValue="useful-options-cli"
  values={[
    {label: 'CLI flags', value: 'useful-options-cli'},
    {label: 'Config file', value: 'useful-options-config'},
  ]}>
  <TabItem value="useful-options-cli">

  ```sh
  --config-file      Path to the Infracost config file. Cannot be used with other flags
  --usage-file       Path to Infracost usage file that specifies values for usage-based resources
  --format value     Output format: json, table, html (default: "table")
  --show-skipped     Show unsupported resources, some of which might be free. Only for table and HTML output (default: false)
  --no-color         Turn off colored output (default: false)
  --log-level value  Use "debug" to troubleshoot, can be set to "info" or "warn" in CI/CD systems to reduce noise
  ```

  </TabItem>
  <TabItem value="useful-options-config">

  ```yml
  log_level: warn
  no_color: true

  projects:
    terraform:
      - dir: /path/to/code
        usage_file: infracost-usage.yml

  outputs:
    - format: table
      show_skipped: true
    - format: html
      path: infracost-report.html # Save report in this file
    - format: json
      path: infracost-output.json # Save output in this file
  ```

  </TabItem>
</Tabs>

---
slug: /
title: Getting started
description: Get started with Infracost in your Terraform workflow, integrate it into your pull requests and CI pipeline and view cost estimates for your AWS/Google/Azure cloud infrastructure.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows cloud cost estimates for infrastructure-as-code projects such as Terraform. It helps DevOps, SRE and developers to quickly see a cost breakdown and compare different options upfront.

If you're upgrading from an older version to `v0.8`, please see the [**migration guide**](/docs/guides/v0.8_migration).

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

  ```shell
  brew install infracost
  ```

  Subsequent updates can be installed in the usual way: `brew upgrade infracost` (you might need `brew update` first if your brew isn't up-to-date)

  </TabItem>
  <TabItem value="macos-manual">

  ```shell
  # Downloads the CLI based on your OS/arch and puts it in /usr/local/bin
  curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh
  ```

  </TabItem>
  <TabItem value="linux">

  ```shell
  # Downloads the CLI based on your OS/arch and puts it in /usr/local/bin
  curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh
  ```

  </TabItem>
  <TabItem value="docker">

  ```shell
  docker pull infracost/infracost

  docker run --rm \
    -e INFRACOST_API_KEY=see_following_step_on_how_to_get_this \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    -v $PWD/:/code/ infracost/infracost breakdown --path /code/
    # Add other required flags/envs for Infracost or Terraform
    # For example, these might be required if you are using AWS assume-role:
    # -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
    # -e AWS_REGION=$AWS_REGION \
  ```

  </TabItem>
  <TabItem value="windows">

  Download and unzip the [latest release](https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.tar.gz). Rename the file `infracost-windows-amd64` to `infracost.exe`, then run it from the Command Prompt or Powershell using `.\infracost.exe --no-color` alongside other required commands/flags (color output has a bug we need to fix on Windows). You should also move the exe file to a folder that is in your `PATH` [environment variable](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows), e.g. `C:\Windows`.

  </TabItem>
</Tabs>

### 2. Get API key
Register for a free API key:
```shell
infracost register
```

The key is saved in `~/.config/infracost/credentials.yml`.

### 3. Run it
Run Infracost using our example Terraform project to see how it works:

```shell
git clone https://github.com/infracost/example-terraform.git
cd example-terraform/sample1

# Play with main.tf and re-run to compare costs
infracost breakdown --path .

# Show diff of monthly costs, edit the yml file and re-run to compare costs
infracost diff --path . --sync-usage-file --usage-file infracost-usage.yml
```

Use our [CI/CD integrations](/docs/integrations/cicd) to automatically add pull request comments showing cost estimate diffs.

## Usage

As mentioned in the [FAQs](/docs/faq), **no** cloud credentials, secrets, tags or resource identifiers are sent to the Cloud Pricing API. That API does not become aware of your cloud spend; it simply returns cloud prices to the CLI so calculations can be done on your machine. Infracost does not make any changes to your Terraform state or cloud resources.

The `infracost` CLI has the following main commands. Use the `--path` flag to point to a Terraform directory or plan JSON file:
- `breakdown`: show full breakdown of costs
- `diff`: show diff of monthly costs between current and planned state

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/multi_project/config_file) to define them; their results will be combined into the same breakdown or diff output.

### Terraform directory

As shown below, any required Terraform flags can be passed using `--terraform-plan-flags`. The `--terraform-workspace` flag can be used to define a workspace.

Internally Infracost runs Terraform init, plan and show; [Terraform init](/docs/faq#does-infracost-need-cloud-credentials) requires cloud credentials to be set, e.g. via the usual `AWS_ACCESS_KEY_ID` or `GOOGLE_CREDENTIALS` environment variables.

  ```shell
  infracost breakdown --path /code --terraform-plan-flags "-var-file=my.tfvars"

  infracost diff --path /code --terraform-plan-flags "-var-file=my.tfvars"
  ```

### Terraform plan JSON

Point to a Terraform plan JSON file using `--path`. This implies that Terraform `init` has been run, thus Infracost just runs Terraform `show`, which does not require cloud creds to be set.

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json

  infracost breakdown --path plan.json

  infracost diff --path plan.json
  ```

See the [advanced usage](/docs/guides/advanced_usage) guide for other usage options.

## Useful options

Run `infracost breakdown --help` to see the available options, which include:

  ```
  --terraform-workspace  Terraform workspace to use. Applicable when path is a Terraform directory
  --format               Output format: json, table, html (default "table")
  --config-file          Path to Infracost config file. Cannot be used with path, terraform* or usage-file flags
  --usage-file           Path to Infracost usage file that specifies values for usage-based resources
  --sync-usage-file      Sync usage-file with missing resources, needs usage-file too (experimental)
  --show-skipped         Show unsupported resources, some of which might be free
  --log-level            Use "debug" to troubleshoot, can be set to "info" or "warn" in CI/CD systems to reduce noise, turns off spinners in output
  --no-color             Turn off colored output
  ```

The `infracost diff --help` and `infracost output --help` commands show related options.

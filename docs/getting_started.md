---
slug: /
title: Getting started
description: Get started with Infracost in your Terraform workflow, integrate it into your pull requests and CI pipeline and view cost estimates for your AWS/Google/Azure cloud infrastructure.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost calculates cloud costs based on Terraform. Cost estimates can be shown in the terminal or put in pull requests using our CI/CD integrations. This helps you understand the cost of services before you use them, and take action to optimize costs within your existing workflow.

If you're upgrading from an older version to `v0.9`, please see the [**migration guide**](/docs/guides/v0.9_migration).

## Quick start

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

  infracost --version # Should show v0.9.15
  ```

  If the version is old, please run `brew update` then `brew upgrade infracost`.

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

  Download and unzip the [latest release](https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.tar.gz). Run it from the Command Prompt or Powershell using `.\infracost.exe --no-color` alongside other required commands/flags (color output has a bug we need to fix on Windows). You should also move the exe file to a folder that is in your `PATH` [environment variable](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows), e.g. `C:\Windows`.

  </TabItem>
</Tabs>

### 2. Get API key
Register for a free API key, which is used by the CLI to query the Cloud Pricing API, e.g. get prices for instance types. No cloud credentials or secrets are sent to the API. 
```shell
infracost register
```

The key is saved in `~/.config/infracost/credentials.yml`.

### 3. Run it
Infracost does not make any changes to your Terraform state or cloud resources. Run Infracost using our example Terraform project to see how it works:

```shell
git clone https://github.com/infracost/example-terraform.git
cd example-terraform/sample1

# Play with main.tf and re-run to compare costs
infracost breakdown --path .

# Show diff of monthly costs, edit the yml file and re-run to compare costs
infracost diff --path . --sync-usage-file --usage-file infracost-usage.yml
```

### 4. Add to CI/CD
Use our [CI/CD integrations](/docs/integrations/cicd) to add cost estimates to pull request comments. This provides a safety net as teams can discuss the cost impact of changes as part of their workflow.

## Usage

The `infracost` CLI has the following main commands. Use the `--path` flag to point to either a **Terraform directory** or **plan JSON file**:
- `breakdown`: show full breakdown of costs
- `diff`: show diff of monthly costs between current and planned state

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/multi_project/config_file) to define them; their results will be combined into the same breakdown or diff output.

### Option 1: Terraform directory

This is the simplest way to run Infracost. As shown below, any required Terraform flags can be passed using `--terraform-plan-flags`. The `--terraform-workspace` flag can be used to define a workspace.

Internally Infracost runs Terraform init, plan and show; [Terraform init](/docs/faq#does-infracost-need-cloud-credentials) requires cloud credentials to be set, e.g. via the usual [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables), [Google](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference#full-reference) or [Azure](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret) environment variables or other methods.

  ```shell
  infracost breakdown --path /code --terraform-plan-flags "-var-file=my.tfvars"

  infracost diff --path /code --terraform-plan-flags "-var-file=my.tfvars"
  ```

### Option 2: Terraform plan JSON

If the above method does not work for your use-case, you can use Terraform to generate a plan JSON file (as shown below), and point Infracost to it using `--path`. In this case, cloud credentials are not needed by Infracost.

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
  --fields               Comma separated list of output fields: all,price,monthlyQuantity,unit,hourlyCost,monthlyCost.
                         Only supported by table output format (default [monthlyQuantity,unit,monthlyCost])
  --show-skipped         Show unsupported resources
  --no-cache             Don't attempt to cache Terraform plans
  --out-file string      Save output to a file, helpful with format flag
  --log-level            Use "debug" to troubleshoot, can be set to "info" or "warn" in CI/CD systems to reduce noise, turns off spinners in output
  --no-color             Turn off colored output
  ```

Other useful commands:
- `infracost diff --help` to show diff of monthly costs between current and planned state
- `infracost output --help` to combine and output Infracost JSON files in different formats
- `infracost completion --help` for shell completion scripts
- `infracost configure --help` for global configs, including currency settings

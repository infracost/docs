---
slug: /
title: Getting started
description: Get started with Infracost in your Terraform workflow, integrate it into your CI pipeline and view cost estimates for your AWS/Azure/Google infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows cloud cost estimates for Terraform. It enables DevOps, SRE and engineers to see a cost breakdown and understand costs **before making changes**, either in the terminal or pull requests. This provides your team with a safety net as people can discuss costs as part of the workflow.

## Quick start

### 1. Install Infracost
Assuming [Terraform](https://www.terraform.io/downloads.html) is already installed, get the latest Infracost release:
<Tabs
  defaultValue="macos-homebrew"
  values={[
    {label: 'macOS brew', value: 'macos-homebrew'},
    {label: 'macOS/Linux manual', value: 'macos-linux-manual'},
    {label: 'Windows chocolatey', value: 'windows-chocolatey'},
    {label: 'Windows manual', value: 'windows-manual'},
    {label: 'Docker', value: 'docker'},
]}>
  <TabItem value="macos-homebrew">

  ```shell
  brew install infracost

  infracost --version
  ```

  To upgrade Infracost, run `brew update` then `brew upgrade infracost`.

  </TabItem>
  <TabItem value="macos-linux-manual">

  ```shell
  # Downloads the CLI based on your OS/arch and puts it in /usr/local/bin
  curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh
  ```

  </TabItem>
  <TabItem value="windows-chocolatey">

  ```shell
  choco install infracost

  infracost --version
  ```

  To upgrade Infracost, run `choco upgrade infracost`.

  </TabItem>
  <TabItem value="windows-manual">

  Download and unzip the [latest release](https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.zip). Run it from the Command Prompt or Powershell using `.\infracost.exe` alongside other required commands/flags. You should also move the exe file to a folder that is in your `PATH` [environment variable](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows), e.g. `C:\Windows`.

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

  We also have dedicated [CI/CD images](/docs/integrations/cicd/#my-cicd-system-isnt-supported).

  </TabItem>
</Tabs>

### 2. Get API key
Register for a free API key, which is used by the CLI to retrieve prices from our Cloud Pricing API, e.g. get prices for instance types. No cloud credentials or secrets are [sent](/docs/faq/#what-data-is-sent-to-the-cloud-pricing-api) to the API and you can also [self-host](/docs/cloud_pricing_api/self_hosted/) it.
```shell
infracost register
```

The key can be retrieved with `infracost configure get api_key`.

### 3. Run it
Infracost does not make any changes to your Terraform state or cloud resources. Run Infracost using our example Terraform project to see how it works. The [CLI commands](/docs/features/cli_commands/) page describes the options for `--path`, which can point to a Terraform directory or plan JSON file.

```shell
git clone https://github.com/infracost/example-terraform.git

cd example-terraform/sample1

# Play with main.tf and re-run to compare costs
infracost breakdown --path .

# Show diff of monthly costs between current and planned state
infracost diff --path .
```

Infracost can also estimate [usage-based resources](/docs/features/usage_based_resources/) such as AWS S3 or Lambda.

### 4. Add to CI/CD
[Use our CI/CD integrations](/docs/integrations/cicd) to add cost estimates to pull requests, it only takes 15 minutes. This provides your team with a safety net as people can understand cloud costs upfront, and discuss them as part of your workflow.

If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

---

### Screenshots

Infracost running in pull requests:

<img src={useBaseUrl("img/screenshots/actions-pull-request.png")} alt="Infracost pull request comment" />

Show full breakdown of costs, see the [CLI commands page](/docs/features/cli_commands/) for the other commands.

<img src={useBaseUrl("img/screenshots/breakdown-screenshot.png")} alt="Infracost breakdown command" width="600"/>

Show diff of monthly costs between current and planned state:

<img src={useBaseUrl("img/screenshots/diff-screenshot.png")} alt="Infracost diff command" width="600" />

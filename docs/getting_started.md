---
slug: /
title: Getting started
description: Get started with Infracost in your Terraform workflow, integrate it into your CI pipeline and view cost estimates for your AWS/Azure/Google infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost calculates cloud costs based on Terraform. Cost estimates can be shown in the terminal or put in pull requests using our CI/CD integrations. This helps you understand the cost of services before you use them, and take action to optimize costs within your existing workflow.

If you're upgrading from an older version to `v0.9`, please see the [migration guide](/docs/guides/v0.9_migration).

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

  infracost --version # Should show v0.9.16
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
Register for a free API key, which is used by the CLI to query the Cloud Pricing API, e.g. get prices for instance types. No cloud credentials or secrets are [sent](/docs/faq/#what-data-is-sent-to-the-cloud-pricing-api) to the API. 
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

Screenshots of example outputs: [breakdown](https://github.com/infracost/infracost/raw/master/.github/assets/breakdown_screenshot.png), [diff](https://github.com/infracost/infracost/raw/master/.github/assets/diff_screenshot.png).

### 4. Add to CI/CD
Use our CI/CD integrations to add cost estimates to pull request comments. This provides a safety net as teams can discuss the cost impact of changes as part of their workflow.
- [GitHub Actions](https://github.com/infracost/actions/)
- [GitLab CI](https://gitlab.com/infracost/infracost-gitlab-ci)
- [Atlantis](https://github.com/infracost/infracost-atlantis/)
- [Terraform Cloud/Enterprise](/docs/integrations/terraform_cloud_enterprise/)
- [Azure DevOps](https://github.com/infracost/infracost-azure-devops/)​
- [Jenkins](https://github.com/infracost/infracost-jenkins/)​
- [Bitbucket Pipelines](https://bitbucket.org/infracost/infracost-bitbucket-pipeline)​
- [CircleCI​](https://github.com/infracost/infracost-orb)

<img src={useBaseUrl("img/screenshots/actions-pull-request.png")} alt="Infracost pull request comment" />

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
    {label: 'macOS Homebrew', value: 'macos-homebrew'},
    {label: 'macOS manual', value: 'macos-manual'},
    {label: 'Linux', value: 'linux'},
    {label: 'Docker', value: 'docker'},
    {label: 'Windows', value: 'windows'}
  ]}>
  <TabItem value="macos-homebrew">

  ```shell
  brew install infracost

  infracost --version # Should show v0.9.18
  ```

  If the version is old, please run `brew update` then `brew upgrade infracost`.

  </TabItem>
  <TabItem value="macos-manual">

  Download the relevant Infracost CLI tar for your architecture (this example follows amd64).
  ```shell
  curl -L -O https://github.com/infracost/infracost/releases/latest/download/infracost-darwin-amd64.tar.gz
  ```
  Verify the CLI tar checksums.
  ```shell
  curl -L -O https://github.com/infracost/infracost/releases/latest/download/infracost-darwin-amd64.tar.gz.sha256
  shasum -c infracost-darwin-amd64.tar.gz.sha256 # should show: infracost-darwin-amd64.tar.gz: OK
  ```
  Unzip the tar file.
  ```shell
  tar -xvzf infracost-darwin-amd64.tar.gz
  ```
  Make the Infracost binary executable and move it into your PATH.
  ```shell
  chmod +x infracost-darwin-amd64
  mv infracost-darwin-amd64 /usr/local/bin/infracost
  ```
  Check the Infracost version to make sure installation has succeeded.
  ```shell
  infracost --version # Should show v*.*.*
  ```
  </TabItem>
  <TabItem value="linux">

  Download the relevant Infracost CLI tar for your architecture (this example follows amd64).
  ```shell
  curl -L -O https://github.com/infracost/infracost/releases/latest/download/infracost-linux-amd64.tar.gz
  ```
  Verify the CLI tar checksums.
  ```shell
  curl -L -O https://github.com/infracost/infracost/releases/latest/download/infracost-linux-amd64.tar.gz.sha256
  shasum -c infracost-linux-amd64.tar.gz.sha256 # should show: infracost-linux-amd64.tar.gz: OK
  ```
  Unzip the tar file.
  ```shell
  tar -xvzf infracost-linux-amd64.tar.gz
  ```
  Make the Infracost binary executable and move it into your PATH.
  ```shell
  chmod +x infracost-linux-amd64
  mv infracost-linux-amd64 /usr/local/bin/infracost
  ```
  Check the Infracost version to make sure installation has succeeded.
  ```shell
  infracost --version # Should show v*.*.*
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

  This installation step assumes that you're using a Windows machine with curl installed. As of Windows 10 this comes as standard. If you don't have curl installed you can
  install it through a number of package managers (chocolatey, scoop, pacman) or manually. See this [stack overflow response](https://stackoverflow.com/a/16216825) for a number of available options.

  Download the relevant Infracost CLI tar for your architecture (this example follows amd64).
  ```shell
  curl -L -O https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.tar.gz
  ```
  Verify the CLI tar checksums.
  ```shell
  curl -L -O https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.tar.gz.sha256
  certutil -hashfile infracost-windows-amd64.tar.gz sha256
  # certutil should echo a hash to the command prompt, check this hash is the same
  # as one contained in the infracost-windows-amd64.tar.gz.sha256
  ```
  Unzip the tar file.
  ```shell
  tar -xvzf infracost-windows-amd64.tar.gz
  ```
  Move the Infracost executable into your PATH. Then restart your command prompt.
  ```shell
  setx PATH "%PATH%;C:\Path\to\bin"
  ```
  Check the Infracost version to make sure installation has succeeded.
  ```shell
  infracost --version # Should show v*.*.*
  ```
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

# Show diff of monthly costs, edit the yml file and re-run to compare costs
infracost diff --path . --sync-usage-file --usage-file infracost-usage.yml
```

Screenshots of example outputs are [shown below](#screenshots).

### 4. Add to CI/CD
Use our CI/CD integrations to add cost estimates to pull requests. This provides your team with a safety net as people can understand cloud costs upfront, and discuss them as part of your workflow.
- [GitHub Actions](https://github.com/infracost/actions/)
- [GitLab CI](https://gitlab.com/infracost/infracost-gitlab-ci)
- [Atlantis](https://github.com/infracost/infracost-atlantis/)
- [Azure DevOps](https://github.com/infracost/infracost-azure-devops/)
- [Terraform Cloud/Enterprise](/docs/integrations/terraform_cloud_enterprise/)
- [Jenkins](https://github.com/infracost/infracost-jenkins/)
- [Bitbucket Pipelines](https://bitbucket.org/infracost/infracost-bitbucket-pipeline)
- [CircleCI](https://github.com/infracost/infracost-orb)

Other CI/CD systems can be supported using [our Docker images](/docs/integrations/cicd/#docker-images). If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

### Screenshots

Infracost running in pull requests:

<img src={useBaseUrl("img/screenshots/actions-pull-request.png")} alt="Infracost pull request comment" />

Show full breakdown of costs, see the [CLI commands page](/docs/features/cli_commands/) for the other commands.

<img src={useBaseUrl("img/screenshots/breakdown-screenshot.png")} alt="Infracost breakdown command" width="600"/>

Show diff of monthly costs between current and planned state:

<img src={useBaseUrl("img/screenshots/diff-screenshot.png")} alt="Infracost diff command" width="600" />

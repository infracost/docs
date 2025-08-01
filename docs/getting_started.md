---
slug: /
title: Get started
description: Get started with Infracost and add it to your CI/CD pipeline to view AWS/Azure/Google cost estimates in pull requests.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost enables a shift-left approach for cloud costs by providing cost estimates for Terraform **before** deployment. Additionally, it can check for FinOps best practices in accordance with the Well-Architected Frameworks of cloud vendors, and your company's required tag keys/values. This not only saves your team money but also streamlines discussions about costs within the engineering workflow rather than it being a post-deployment consideration. Infracost works with AWS, Azure and Google.

### 1. Install Infracost
Get the latest Infracost release:

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

  infracost --version # Should show 0.10.42
  ```

  To upgrade Infracost, run `brew update` then `brew upgrade infracost`.

  </TabItem>
  <TabItem value="macos-linux-manual">

  The easiest way is to use our install script:
  ```shell
  # Downloads the CLI based on your OS/arch and puts it in /usr/local/bin
  curl -fsSL https://raw.githubusercontent.com/infracost/infracost/master/scripts/install.sh | sh
  ```

  Or you can install it manually:
  1. Download the archive for your platform from our [releases](https://github.com/infracost/infracost/releases/latest).
  2. Unarchive and copy it to one of the directories in your `$PATH`, e.g. `/usr/local/bin`:
    ```shell
    tar xzf infracost-linux-amd64.tar.gz -C /tmp
    mv /tmp/infracost-linux-amd64 /usr/local/bin/infracost
    ```
  3. Check that it works correctly:
    ```shell
    infracost --version # Should show 0.10.42
    ```


  </TabItem>
  <TabItem value="windows-chocolatey">

  ```shell
  choco install infracost

  infracost --version # Should show 0.10.42
  ```

  To upgrade Infracost, run `choco upgrade infracost`.

  </TabItem>
  <TabItem value="windows-manual">

  Download and unzip the [latest release](https://github.com/infracost/infracost/releases/latest/download/infracost-windows-amd64.zip). Run it from the Command Prompt or Powershell using `.\infracost.exe` alongside other required commands/flags. You should also move the exe file to a folder that is in your `PATH` [environment variable](https://stackoverflow.com/questions/1618280/where-can-i-set-path-to-make-exe-on-windows), e.g. `C:\Windows`.

  </TabItem>
  <TabItem value="docker">

  ```shell
  docker pull infracost/infracost:ci-latest

  docker run --rm \
    -e INFRACOST_API_KEY=see_following_step_on_how_to_get_this \
    -v $PWD/:/code/ infracost/infracost:ci-latest breakdown --path /code/
    # Add other required flags/envs, e.g. --terraform-var-file or --terraform-var
  ```

  </TabItem>
</Tabs>

---

### 2. Get API key
Register for a free API key, which is used by the CLI to retrieve prices from our Cloud Pricing API, e.g. get prices for instance types.

:::note
- No cloud credentials or secrets are [sent](/docs/faq/#what-data-is-sent-to-the-cloud-pricing-api) to the API.
- Infracost does not make any changes to your Terraform state or cloud resources.
:::

```shell
infracost auth login
```

The key can be retrieved with `infracost configure get api_key`.

---

### 3. Show cost estimate breakdown

Infracost parses the project locally to determine resource types and quantities needed to calculate costs. The `--path` flag should point to your Terraform directory.

```shell
# You can also: git clone https://github.com/infracost/example-terraform
cd my-terraform-project
```

```shell
# Terraform variables can be set using --terraform-var-file or --terraform-var
infracost breakdown --path .
```

<p>
Example output:
<img src={useBaseUrl("img/screenshots/get-started-breakdown.png")} alt="Infracost breakdown command" />
</p>

:::tip
Infracost can also estimate [usage-based resources](/docs/features/usage_based_resources/) such as AWS S3 or Lambda
:::

---

### 4. Add to your CI/CD
[Use our integrations](/docs/integrations/cicd) to add Infracost to pull requests, it only takes 15 minutes! This provides your team with a safety net as people can understand cloud costs and FinOps best practices upfront, and discuss them as part of your workflow. See our [demo video](https://www.youtube.com/watch?v=BQeO137DDo8) to learn more.

If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/screenshots/actions-pull-request.png")} alt="Infracost pull request comment" />

---
slug: /
title: Get started
description: Get started with Infracost in your Terraform workflow, integrate it into your CI pipeline and view cost estimates for your AWS/Azure/Google infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows cloud cost estimates for Terraform. It lets DevOps, SRE and engineers see a cost breakdown and understand costs **before making changes**, either in the terminal or pull requests. This provides your team with a safety net as people can discuss costs as part of the workflow.

If you're upgrading from an older version, see the [v0.10 migration guide](/docs/guides/v0.10_migration/).

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

  infracost --version # Should show 0.10.10
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
    infracost --version # Should show 0.10.10
    ```


  </TabItem>
  <TabItem value="windows-chocolatey">

  ```shell
  choco install infracost

  infracost --version # Should show 0.10.10
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
- No cloud credentials or secrets are [sent](/docs/faq/#what-data-is-sent-to-the-cloud-pricing-api) to the API and you can also [self-host](/docs/cloud_pricing_api/self_hosted/) it.
- Infracost does not make any changes to your Terraform state or cloud resources.
:::

```shell
infracost auth login
```

The key can be retrieved with `infracost configure get api_key`.

---

### 3. Show cost estimate breakdown
Infracost parses the project locally to determine resource types and quantities needed to calculate costs. The [`--path` flag](/docs/features/cli_commands/#breakdown) can point to a Terraform directory or plan JSON file.

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

### 4. Show cost estimate diff

<ol type="i">
  <li>Generate an Infracost JSON file as the baseline:</li>

  ```shell
  infracost breakdown --path . --format json --out-file infracost-base.json
  ```

  <li>Edit your Terraform project. If you're using our example project, try changing the instance type:</li>

  ```shell
  vim main.tf
  ```

  <li>Generate a diff by comparing the latest code change with the baseline:</li>

  ```shell
  infracost diff --path . --compare-to infracost-base.json
  ```
</ol>

<p>
Example output:
<img src={useBaseUrl("img/screenshots/get-started-diff.png")} alt="Infracost diff command" />
</p>

---

### 5. Monitor cost estimates

<ol type="i">
  <li>The following environment variable instructs the CLI to send its JSON output to Infracost Cloud. This is our SaaS product that builds on top of Infracost open source and works with CI/CD integrations (next step). It helps team leads, managers and FinOps practitioners see all cost estimates from a central place so they can help guide the team.</li>

  ```shell
  INFRACOST_ENABLE_CLOUD=true infracost diff \
      --path . --compare-to infracost-base.json
  ```

  <li>
    Log in to <a href="https://dashboard.infracost.io">Infracost Cloud</a> > <b>Projects</b> page to see the cost estimate.
  </li>
</ol>

<img src={useBaseUrl("img/infracost-cloud/dashboard-chart.png")} alt="Infracost Cloud dashboard showing pull request costs over the last 30 days" />

---

### 6. Add to your CI/CD
[Use our CI/CD integrations](/docs/integrations/cicd) to add cost estimates to pull requests, it only takes 15 minutes. This provides your team with a safety net as people can understand cloud costs upfront, and discuss them as part of your workflow.

If you run into any issues, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

<img src={useBaseUrl("img/screenshots/actions-pull-request.png")} alt="Infracost pull request comment" />

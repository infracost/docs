---
slug: /
title: Getting started
description: Get started with Infracost in your Terraform workflow, integrate it into your pull requests and CI pipeline and view cost estimates for your AWS/Google cloud infrastructure.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows cloud cost estimates for Terraform projects. It integrates into pull requests and allows developers and DevOps to see cost breakdowns and compare options upfront.

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

### 2. Get API key
Use our free Cloud Pricing API by registering for an API key:
```sh
infracost register
```

The key is saved in `~/.config/infracost/config.yml`. If you prefer, you can run your own [Cloud Pricing API](faq#can-i-run-my-own-cloud-pricing-api).

### 3. Run it
Run Infracost using our example Terraform project to see how it works.

```sh
git clone https://github.com/infracost/example-terraform.git
cd example-terraform

# You can play with `aws/main.tf` and `aws/infracost-usage.yml`, and re-run infracost to compare costs
infracost --tfdir aws --usage-file aws/infracost-usage.yml
```

Our [CI/CD integrations](integrations) can be used to automatically add a comment showing the cost estimate `diff` between a pull request and the master branch.

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
--usage-file       Path to Infracost usage file that specifies values for usage-based resources
--output value     Output format: json, table, html (default: "table")
--show-skipped     Show unsupported resources, some of which might be free. Only for table and HTML output (default: false)
--no-color         Turn off colored output (default: false)
--log-level value  Use "debug" to troubleshoot, can be set to "info" or "warn" in CI/CD systems to reduce noise
```

Run `infracost feedback` if you'd like to submit feedback directly to the Infracost team.

## Onboarding

[Ali](https://www.linkedin.com/in/alikhajeh1/), co-founder of Infracost, does a personal onboarding with new users. This onboarding is customized to your goals and includes setting up CI/CD if required. Book your own [here](http://calendly.com/alikhajeh1/infracost-onboarding).

---
slug: /
title: Getting started
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost shows hourly and monthly cost estimates for a Terraform project. This helps users quickly see the cost breakdown and compare different deployment options upfront.

<img alt="Example infracost output" width="600px" src={useBaseUrl('img/screenshot.png')} />

## Installation

1. Install the latest Infracost release:
  <Tabs
    defaultValue="macos-homebrew"
    values={[
      {label: 'macOS (Homebrew)', value: 'macos-homebrew'},
      {label: 'macOS (manual)', value: 'macos-manual'},
      {label: 'Linux', value: 'linux'},
      {label: 'Docker', value: 'docker'}
    ]}>
    <TabItem value="macos-homebrew">

    ```sh
    brew install infracost
    ```

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
  </Tabs>

2.	Use our free hosted API for cloud prices by registering for an API key:
    ```sh
    infracost register
    ```

    The `INFRACOST_API_KEY` environment variable can be used to set the API key in CI systems.
    If you prefer, you can run your own [pricing API](faq#can-i-run-my-own-pricing-api).

3.	Run `infracost` using our example Terraform project to see how it works. You can also play with the `main.tf` file in the example:

    ```sh
    git clone https://github.com/infracost/example-terraform.git
    infracost --tfdir example-terraform
    ```

## Basic usage

Generate a cost breakdown from a Terraform directory and pass any required Terraform flags using the `--tfflags` option:
```sh
infracost --tfdir /path/to/code --tfflags "-var-file=myvars.tfvars"
```

The [Infracost GitHub action](https://github.com/marketplace/actions/run-infracost) can be used to automatically add a PR comment showing the cost estimate `diff` between a pull request and the master branch whenever Terraform files change.

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## Useful options

Run `infracost --help` to see the available options.

To change the path to the `terraform` binary, set the `TERRAFORM_BINARY` env variable:
```sh
TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir examples/terraform_0.13
```

Standard Terraform env variables such as `TF_*` can also be added if required, for example:
```sh
TF_CLI_CONFIG_FILE="$HOME/.terraformrc-custom" infracost --tfdir /path/to/code
```

In CI systems, the `INFRACOST_SKIP_UPDATE_CHECK=true` env variable can be set to skip the Infracost update check.

To generate a cost breakdown from a Terraform plan JSON file:
```sh
cd examples/terraform
terraform plan -out plan.save .
terraform show -json plan.save > plan.json
infracost --tfjson plan.json
```

## Cost estimation of usage-based resources

This is an experimental feature with limited support; please email [hello@infracost.io](mailto:hello@infracost.io) if you use it so we can better understand your use-case and improve the feature.

Infracost distinguishes the **price** of a resource from its **cost**. Price is the per-unit price advertised by a cloud vendor. The cost of a resource is calculated by multiplying its price by its usage. For example, an EC2 instance might be priced at $0.02 per hour, and if run for 100 hours (its usage), it'll cost $2.00. Supported resources in Infracost will always show prices, but if a resource has a usage-based cost component, we can't show its cost as we don't know how much it'll be used. For example, an AWS Lambda resource shows zero hourly/monthly costs for duration and requests:

  ```
  NAME                              MONTHLY QTY  UNIT         PRICE   HOURLY COST  MONTHLY COST

  aws_lambda_function.lambda
  ├─ Duration                                 0  GB-seconds    2e-05       0.0000        0.0000
  └─ Requests                                 0  requests      2e-07       0.0000        0.0000
  Total                                                                    0.0000        0.0000
  ```

To solve this problem, the [Infracost Terraform Provider](https://registry.terraform.io/providers/infracost/infracost/latest/docs) can be used to describe usage estimates, which are used to calculate costs. As shown in the following example, it is easy to add this to Terraform projects. Instead of using cloud vendor cost calculators, spreadsheets or wiki pages, developers can track their usage estimates in their code, get cost estimates from them, and adjust them if needed. This enables quick "what-if" analysis to be done too; for example, what happens to the cost estimate if a Lambda function gets 2x more requests.

  Enable terraform-provider-infracost: 
  ```hcl
  terraform {
    required_providers {
      aws = { source = "hashicorp/aws" }
      infracost = { source = "infracost/infracost" }
    }
  }
  provider "infracost" {}
  ```

  A Lambda function with usage estimates:
  ```
  resource "aws_lambda_function" "my_lambda" {
    function_name = "lambda_function_name"
    role          = "arn:aws:lambda:us-east-1:account-id:resource-id"
    handler       = "exports.test"
    runtime       = "nodejs12.x"
    memory_size   = 512
  }

  data "infracost_aws_lambda_function" "lambda" {
    resources = [aws_lambda_function.my_lambda.id]

    monthly_requests {
      value = 100000000
    }

    average_request_duration {
      value = 350
    }
  }
  ```

  Infracost can now show hourly/monthly cost estimates:
  ```
  NAME                              MONTHLY QTY  UNIT         PRICE   HOURLY COST  MONTHLY COST

  aws_lambda_function.lambda
  ├─ Duration                          20000000  GB-seconds    2e-05       0.4566      333.3340
  └─ Requests                         100000000  requests      2e-07       0.0274       20.0000
  Total                                                                    0.4840      353.3340
  ```

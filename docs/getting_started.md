---
slug: /
title: Getting started
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import SignUp from '../src/components/SignUp';

Infracost shows hourly and monthly cost estimates for a Terraform project. This helps developers, DevOps et al. quickly see the cost breakdown and compare different deployment options upfront.

<img alt="Example infracost output" width="600px" src={useBaseUrl('img/screenshot.png')} />

## Installation

1. Download and install the latest Infracost release

    Linux:
    ```sh
    curl --silent --location "https://github.com/infracost/infracost/releases/latest/download/infracost-linux-amd64.tar.gz" | tar xz -C /tmp
    sudo mv /tmp/infracost-linux-amd64 /usr/local/bin/infracost
    ```

    Mac OSX:
    ```sh
    brew install infracost
    ```

2.	Use our free hosted API for cloud prices by registering for an API key:
    ```sh
    infracost register
    ```

    Alternatively you can run your [own pricing API](https://github.com/infracost/cloud-pricing-api) and set the `INFRACOST_PRICING_API_ENDPOINT` environment variable to point to it.

3. Set the `INFRACOST_API_KEY` environment variable to your API key, e.g.:
    ```sh
    export INFRACOST_API_KEY=XXXXX
    ```
    Or persist it in your .zshrc or .bashrc file.

## Basic usage

Generate a cost breakdown from a Terraform directory:
```sh
infracost --tfdir /my/code/path
```

The [Infracost GitHub action](https://github.com/marketplace/actions/run-infracost) can be used to automatically add a PR comment showing the cost estimate `diff` between a pull request and the master branch whenever Terraform files change.

<img src="https://raw.githubusercontent.com/infracost/infracost-gh-action/master/screenshot.png" width="550px" alt="Example infracost diff usage" />

## Cost estimation of usage-based resources

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

## Useful options

To change the path to your `terraform` binary you can set the `TERRAFORM_BINARY` env variable:
```sh
TERRAFORM_BINARY=~/bin/terraform_0.13 infracost --tfdir examples/terraform_0.13
```

Standard Terraform env variables such as `TF_CLI_ARGS` can also be added if required:
```sh
TF_VAR_key=value infracost --tfdir examples/terraform
# or
TF_CLI_ARGS_plan="-var-file=my.tfvars" infracost --tfdir examples/terraform
```

Generate a cost breakdown from a Terraform plan JSON file:
```sh
cd examples/terraform
terraform plan -out plan.save .
terraform show -json plan.save > plan.json
infracost --tfjson plan.json
```

## How does it work?

Prices are retrieved using [https://github.com/infracost/cloud-pricing-api](https://github.com/infracost/cloud-pricing-api). There is a demo version of that service deployed at [https://pricing.infracost.io/graphql](https://pricing.infracost.io/graphql), which `infracost` uses by default. On this service, spot prices are refreshed once per hour.

You can run `infracost` in your terraform directories without worrying about security or privacy issues as no terraform secrets/tags/IDs etc are sent to the pricing service (only generic price-related attributes are used). Also, do not be alarmed by seeing the `terraform init` in output, no changes are made to your terraform or cloud resources. Read-only AWS IAM creds can be used as a security precaution in CI pipelines that run `infracost`.

You can also deploy the price list API yourself and specify it by setting the `infracost_API_URL` env variable or passing the `--api-url` option.

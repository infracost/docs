---
slug: usage_based_resources
title: Cost estimation of usage-based resources
---

Infracost distinguishes the **price** of a resource from its **cost**. Price is the per-unit price advertised by a cloud vendor. The cost of a resource is calculated by multiplying its price by its usage. For example, an EC2 instance might be priced at $0.02 per hour, and if run for 100 hours (its usage), it'll cost $2.00. Supported resources in Infracost will always show prices, but if a resource has a usage-based cost component, we can't show its cost as we don't know how much it'll be used. For example, an AWS Lambda resource shows no hourly/monthly costs for requests and duration:

  ```
  NAME                     MONTHLY QTY  UNIT         PRICE   HOURLY COST  MONTHLY COST

  aws_lambda_function.hello_world
  ├─ Requests                        -  1M requests  0.2000            -             -
  └─ Duration                        -  GB-seconds    2e-05            -             -
  Total                                                                -             -
  ```

## Infracost Terraform Provider

To solve the above problem, the [Infracost Terraform Provider](https://registry.terraform.io/providers/infracost/infracost/latest/docs) can be used to describe usage estimates, which are used to calculate costs. As shown in the following example, it is easy to add this to Terraform projects. Instead of using cloud vendor cost calculators, spreadsheets or wiki pages, developers can track their usage estimates in their code, get cost estimates from them, and adjust them if needed. This enables quick "what-if" analysis to be done too; for example, what happens to the cost estimate if a Lambda function gets 2x more requests.

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
  resource "aws_lambda_function" "hello_world" {
    function_name = "hello_world"
    role          = "arn:aws:lambda:us-east-1:account-id:resource-id"
    handler       = "exports.test"
    runtime       = "nodejs12.x"
    memory_size   = 128
  }

  # Get cost estimates for Lambda requests and duration
  data "infracost_aws_lambda_function" "hello_world_usage" {
    resources = [aws_lambda_function.hello_world.id]
    monthly_requests { value = 100000000 }
    average_request_duration { value = 250 }
  }
  ```

  Infracost can now show hourly/monthly cost estimates:
  ```
  NAME                     MONTHLY QTY  UNIT         PRICE   HOURLY COST  MONTHLY COST

  aws_lambda_function.hello_world
  ├─ Requests                      100  1M requests  0.2000       0.0274       20.0000
  └─ Duration                3,750,000  GB-seconds    2e-05       0.0856       62.5001
  Total                                                           0.1130       82.5001
  ```

We'd love to hear feedback about this feature either via email [hello@infracost.io](mailto:hello@infracost.io) or our [Discord community](https://discord.gg/rXCTaH3) to chat with us.

---
slug: usage_based_resources
title: Usage-based resources
---

Infracost distinguishes the **price** of a resource from its **cost**. Price is the per-unit price advertised by a cloud vendor. The cost of a resource is calculated by multiplying its price by its usage. For example, an EC2 instance might be priced at $0.02 per hour, and if run for 100 hours (its usage), it'll cost $2. Supported resources in Infracost will always show prices, but if a resource has a usage-based cost component, we can't show its cost as we don't know how much it'll be used. For example, an AWS Lambda resource shows no monthly costs for requests and duration:

  ```
  Name                             Quantity  Unit                 Monthly Cost

  aws_lambda_function.hi
  ├─ Requests              Cost depends on usage: $0.20 per 1M requests
  └─ Duration              Cost depends on usage: $0.0000166667 per GB-seconds

  PROJECT TOTAL                                                          $0.00
  ```

## Infracost usage file

Infracost enables you to describe usage estimates in a file called [`infracost-usage.yml`](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml), which can be passed to Infracost using the `--usage-file` option so it can calculate costs. This flag should not be confused with the `--config-file` option that is used to [configure](/docs/multi_project/config_file) how Infracost runs.

Instead of using cloud vendor cost calculators, spreadsheets or wiki pages, you can check-in usage estimates into git alongside other code, get cost estimates from them, and adjust them when needed. This enables quick "what-if" analysis to be done too; for example, what happens to the cost estimate if a Lambda function gets 2x more requests.

Follow these simple steps to use this feature:

### 1. Generate usage file

Use the `--sync-usage-file` to generate a new usage file or update an existing one. This option is a **safe** sync: it adds any missing resources (with zeros for the usage estimates), it does not overwrite any lines that you have changed in the yaml, and it deletes any resources that are not used in the Terraform project.

  ```sh
  infracost breakdown --sync-usage-file --usage-file infracost-usage.yml --path /code
  ```

### 2. Edit usage file

Edit the generated usage file with your usage estimates, for example a Lambda function can have the following parameters. You can check-in usage estimates into git alongside other code, get cost estimates from them, and adjust them when needed.

  ```yaml
  version: 0.1

  resource_usage:
    aws_lambda_function.hi:
      monthly_requests: 100000000 # Monthly requests to the Lambda function.
      request_duration_ms: 250 # Average duration of each request in milliseconds.
  ```

The usage file also supports specifying usage for resources inside modules, by specifying the full path to the resource. This is the same value as Infracost outputs in the Name column , e.g.:
  ```yaml
  version: 0.1

  resource_usage:
    module.my_module.aws_dynamodb_table.my_table:
      storage_gb: 1000

    module.lambda_function.aws_lambda_function.this[0]:
      monthly_requests: 20000
      request_duration_ms: 600
  ```

### 3. Run with usage file 

Run `infracost breakdown` or `infracost diff` with the usage file to see monthly cost estimates:

  ```sh
  infracost breakdown --path /code --usage-file infracost-usage.yml

  Name                               Quantity  Unit         Monthly Cost

  aws_lambda_function.hi
  ├─ Requests                             100  1M requests        $20.00
  └─ Duration                      12,500,000  GB-seconds        $208.33

  PROJECT TOTAL                                                  $228.33
  ```

## Supported parameters

The [infracost-usage-example.yml](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) file contains the list of all of the available parameters and their descriptions. You can copy/paste resources you use from that file to create your own usage-file.

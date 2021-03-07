---
slug: usage_based_resources
title: Usage-based resources
---

Infracost distinguishes the **price** of a resource from its **cost**. Price is the per-unit price advertised by a cloud vendor. The cost of a resource is calculated by multiplying its price by its usage. For example, an EC2 instance might be priced at $0.02 per hour, and if run for 100 hours (its usage), it'll cost $2. Supported resources in Infracost will always show prices, but if a resource has a usage-based cost component, we can't show its cost as we don't know how much it'll be used. For example, an AWS Lambda resource shows no monthly costs for requests and duration:

  ```
  Name                             Quantity  Unit                  Monthly Cost

  aws_lambda_function.hi
  ├─ Requests              Cost depends on usage: $0.20 per 1M requests
  └─ Duration              Cost depends on usage: $0.0000166667 per GB-seconds

  PROJECT TOTAL                                                           $0.00
  ```

## Infracost usage file

Infracost solves the above problem by enabling you to describe usage estimates in a file called [`infracost-usage.yml`](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml), which can be passed to Infracost using the `--usage-file` option so it can calculate costs; as shown in the following example. This flag should not be confused with the `--config-file` option that is used to [configure](/docs/config_file) how Infracost runs.

Instead of using cloud vendor cost calculators, spreadsheets or wiki pages, developers can track their usage estimates alongside their code, get cost estimates from them, and adjust them if needed. This enables quick "what-if" analysis to be done too; for example, what happens to the cost estimate if a Lambda function gets 2x more requests.

  An `infracost-usage.yml` file with Lambda function usage estimates:
  ```yaml
  version: 0.1
  resource_usage:
    aws_lambda_function.hi:
      monthly_requests: 100000000 # Monthly requests to the Lambda function.
      request_duration_ms: 250 # Average duration of each request in milliseconds.
  ```

  Running `infracost breakdown --path=/code --usage-file=infracost-usage.yml` now shows monthly cost estimates:
  ```
  Name                               Quantity  Unit         Monthly Cost

  aws_lambda_function.hello_world
  ├─ Requests                             100  1M requests        $20.00
  └─ Duration                      12,500,000  GB-seconds        $208.33

  PROJECT TOTAL                                                  $228.33
  ```

The usage file also supports specifying usage for resources inside modules, by specifying the full path to the resource. This is the same value as Infracost outputs in the NAME column , e.g.:
  ```yaml
  version: 0.1
  resource_usage:
    module.my_module.aws_dynamodb_table.my_table:
      storage_gb: 1000
    module.lambda_function.aws_lambda_function.this[0]:
      monthly_requests: 20000
      request_duration_ms: 600
  ```

### Supported parameters

This [infracost-usage-example.yml](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) contains the list of all of the available parameters and their descriptions.

We'd love to hear feedback about this feature either via email [hello@infracost.io](mailto:hello@infracost.io) or our [community Slack channel](https://www.infracost.io/community-chat).

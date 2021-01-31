---
slug: usage_based_resources
title: Usage-based resources
---

Infracost distinguishes the **price** of a resource from its **cost**. Price is the per-unit price advertised by a cloud vendor. The cost of a resource is calculated by multiplying its price by its usage. For example, an EC2 instance might be priced at $0.02 per hour, and if run for 100 hours (its usage), it'll cost $2.00. Supported resources in Infracost will always show prices, but if a resource has a usage-based cost component, we can't show its cost as we don't know how much it'll be used. For example, an AWS Lambda resource shows no hourly/monthly costs for requests and duration:

  ```
  NAME                     MONTHLY QTY  UNIT         PRICE   HOURLY COST  MONTHLY COST

  aws_lambda_function.hello_world
  ├─ Requests                        -  1M requests  0.2000            -             -
  └─ Duration                        -  GB-seconds    2e-05            -             -
  Total                                                                -             -
  ```

## Infracost usage file

Infracost solves the above problem by letting you describe usage estimates in a file called [`infracost-usage.yml`](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml), which can be passed to Infracost using the `--usage-file` option so it can calculate costs; as shown in the following example.

Instead of using cloud vendor cost calculators, spreadsheets or wiki pages, developers can track their usage estimates alongside their code, get cost estimates from them, and adjust them if needed. This enables quick "what-if" analysis to be done too; for example, what happens to the cost estimate if a Lambda function gets 2x more requests.

  An `infracost-usage.yml` file with Lambda function usage estimates:
  ```yaml
  version: v0.1
  resource_usage:
    aws_lambda_function.my_function:
      monthly_requests: 100000000   # Monthly requests to the Lambda function.
      average_request_duration: 250 # Average duration of each request in milliseconds.
  ```

  Running `infracost --tfdir=/path/to/project --usage-file=path/to/infracost-usage.yml` now shows hourly/monthly cost estimates:
  ```
  NAME                     MONTHLY QTY  UNIT         PRICE   HOURLY COST  MONTHLY COST

  aws_lambda_function.hello_world
  ├─ Requests                      100  1M requests  0.2000       0.0274       20.0000
  └─ Duration                3,750,000  GB-seconds    2e-05       0.0856       62.5001
  Total                                                           0.1130       82.5001
  ```

### Supported parameters

This [infracost-usage-example.yml](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) contains the list of all of the available parameters and their descriptions.

We'd love to hear feedback about this feature either via email [hello@infracost.io](mailto:hello@infracost.io) or our [community Slack channel](https://www.infracost.io/community-chat).

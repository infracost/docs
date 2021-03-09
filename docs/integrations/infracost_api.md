---
slug: infracost_api
title: Infracost API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The majority of users should use the [Infracost CLI](/docs/#installation), which **does not** send the Terraform statefile to the Cloud Pricing API; instead it [sends](/docs/faq#what-data-is-sent-to-the-cloud-pricing-api) the relevant data for finding a unique cloud price point.

The API described in this page can be useful for CI/CD integrations, such as [Atlantis](/docs/integrations/cicd#atlantis), where it might be easier to use `curl` or an HTTP library instead of installing the Infracost CLI. Terraform plan JSON files can be sent to this API, which runs `infracost diff` and returns the results (`text/plain` response). Whilst this API deletes files from the server after they are processed, it is a good security practice to remove secrets from the file before sending it to the API. For example, AWS provides [a grep command](https://gist.github.com/alikhajeh1/f2c3f607c44dabc70c73e04d47bb1307) that can be used to do this.

## Usage

To use this API, send an HTTP POST request to https://pricing.api.infracost.io/terraform-json-file with the `terraform-json-file` parameter using the multipart/form-data request body format, as shown in the following example curl request. The `x-api-key` header must be set to your [Infracost API key](/docs/#2-get-api-key).

| Parameter | Description | Notes |
| ---       | ---         | ---   |
| terraform-json-file | Terraform plan JSON file | Required. Use '@' to upload the file with curl, e.g. `-F "terraform-json-file=@plan.json"` |
| usage-file | Infracost [usage file](/docs/usage_based_resources) that specifies values for usage-based resources | Not required. Use '@' to upload the file with curl, e.g. `-F "usage-file=@infracost-usage.yml"` |
| show-skipped | Show unsupported resources, some of which might be free. | Not required. Defaults to false |
| no-color | Turn off colored output, useful for CI/CD or Windows users (color output has a bug we need to fix on Windows) | Not required. Defaults to false |

## Examples

<Tabs
  defaultValue="request"
  values={[
    {label: 'Example request', value: 'request'},
    {label: 'Response', value: 'response'},
  ]}>
  <TabItem value="request">

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json

  curl -X POST -H "x-api-key: my-api-key" -F "ci-platform=atlantis" \
       -F "terraform-json-file=@plan.json" \
       https://pricing.api.infracost.io/terraform-json-file
  ```

  </TabItem>
  <TabItem value="response">

  ```shell
  Project: examples/terraform

  + aws_instance.web_app
    +$743

      + Linux/UNIX usage (on-demand, m5.4xlarge)
        +$561

      + root_block_device

          + General Purpose SSD storage (gp2)
            +$5.00

      + ebs_block_device[0]

          + Provisioned IOPS SSD storage (io1)
            +$125

          + Provisioned IOPS
            +$52.00

  + aws_lambda_function.hello_world
    Cost depends on usage

      + Requests
        Cost depends on usage
          +$0.20 per 1M requests

      + Duration
        Cost depends on usage
          +$0.0000166667 per GB-seconds

  Monthly cost change for examples/terraform
  Amount:  +$743 ($0.00 -> $743)

  ----------------------------------
  Key: ~ changed, + added, - removed

  To estimate usage-based resources use --usage-file, see https://infracost.io/usage_file
  ```

  </TabItem>
</Tabs>

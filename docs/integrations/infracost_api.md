---
slug: infracost_api
title: Plan JSON API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

The majority of users should be able to use Infracost [CI/CD integrations](/docs/integrations/cicd/). However, when a self-service provisioning portal such ServiceNow or Atlantis needs to integrate with Infracost, an HTTP library is often the simplest option. This API accepts a Terraform plan JSON file and returns the results in various formats.

To use this API, send an HTTP POST request to desired endpoint (e.g. https://pricing.api.infracost.io/diff) with a Terraform plan JSON file sent in the `path` parameter using the multipart/form-data request body format, as shown in the following example curl request. The `x-api-key` header must be set to your [Infracost API key](/docs/#2-get-api-key).

This API deletes files from the server after they are processed, however, it is also good security practice to remove secrets from the file before sending it to the API. For example, AWS provides [a grep command](https://gist.github.com/alikhajeh1/f2c3f607c44dabc70c73e04d47bb1307) that can be used to do this.

## Breakdown

Show breakdown of costs. This is the main API call that should be used. It can return a [JSON response](/docs/features/json_output_format/), which contains the total costs as well as detailed breakdowns:
```
cat infracost.json | jq -r '.totalMonthlyCost'
cat infracost.json | jq -r '.pastTotalMonthlyCost'
cat infracost.json | jq -r '.diffTotalMonthlyCost'
```

Send an HTTP POST to: https://pricing.api.infracost.io/breakdown

| Header | Description | Notes |
| ---       | ---         | ---   |
| `x-api-key` | Infracost API Key | Required.  Must be set to your [Infracost API key](/docs/#2-get-api-key). |

| Parameter | Description | Notes |
| ---       | ---         | ---   |
| path | Terraform plan JSON file | Required. Use '@' to upload the file with curl, e.g. `-F "path=@plan.json"` |
| usage-file | Infracost [usage file](/docs/features/usage_based_resources) that specifies values for usage-based resources | Not required. Use '@' to upload the file with curl, e.g. `-F "usage-file=@infracost-usage.yml"` |
| show-skipped | List unsupported and free resources. | Not required. Defaults to false |
| no-color | Turn off colored output, useful for CI/CD users | Not required. Defaults to false |
| format | Content type of the response | Not required.  Must be one of `table`, `html` or `json`.  Defaults to `table` |
| fields | Fields to include in the response | Not required, supported by `table` and `html` formats.  Must be a comma separated list of fields: all, price, monthlyQuantity, unit, hourlyCost, monthlyCost.  Defaults to `monthlyQuantity,unit,monthlyCost` |

### Examples

<Tabs
defaultValue="request"
values={[
{label: 'Example request', value: 'request'},
{label: 'Table response', value: 'table'},
{label: 'JSON response', value: 'json'},
{label: 'HTML response', value: 'html'},
]}>
<TabItem value="request">

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json

  curl -X POST -H "x-api-key: my-api-key" -F "ci-platform=atlantis" \
       -F "path=@plan.json" \
       https://pricing.api.infracost.io/breakdown
  ```

  </TabItem>
  <TabItem value="table">

  ```text
  Project: examples/terraform
  
   Name                                                           Monthly Qty  Unit                        Monthly Cost 
                                                                                                                        
   aws_instance.web_app                                                                                                 
   ├─ Instance usage (Linux/UNIX, on-demand, m5.4xlarge)                  730  hours                            $560.64 
   ├─ root_block_device                                                                                                 
   │  └─ Storage (general purpose SSD, gp2)                                50  GB                                 $5.00 
   └─ ebs_block_device[0]                                                                                               
      ├─ Storage (provisioned IOPS SSD, io1)                            1,000  GB                               $125.00 
      └─ Provisioned IOPS                                                 800  IOPS                              $52.00 
                                                                                                                        
   aws_lambda_function.hello_world                                                                                      
   ├─ Requests                                            Monthly cost depends on usage: $0.20 per 1M requests          
   └─ Duration                                            Monthly cost depends on usage: $0.0000166667 per GB-seconds   
                                                                                                                        
   OVERALL TOTAL                                                                                                $742.64 
  ----------------------------------
  To estimate usage-based resources use --usage-file, see https://infracost.io/usage-file
  ```

  </TabItem>
  <TabItem value="json">

  See example [JSON output here](/docs/features/json_output_format/).

  </TabItem>
  <TabItem value="html">
    <img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
  </TabItem>
</Tabs>

## Diff 

The [breakdown](#breakdown) API call should be used most of the time as it supports a JSON format and includes the breakdown as well as the diff of the costs (between current and planned state).

This API call is useful when you want to get a text diff format, similar to `git diff`, as shown in the example response below.

Send an HTTP POST to: https://pricing.api.infracost.io/diff

| Header | Description | Notes |
| ---       | ---         | ---   |
| `x-api-key` | Infracost API Key | Required.  Must be set to your [Infracost API key](/docs/#2-get-api-key). |

| Parameter | Description | Notes |
| ---       | ---         | ---   |
| path | Terraform plan JSON file | Required. Use '@' to upload the file with curl, e.g. `-F "path=@plan.json"` |
| usage-file | Infracost [usage file](/docs/features/usage_based_resources) that specifies values for usage-based resources | Not required. Use '@' to upload the file with curl, e.g. `-F "usage-file=@infracost-usage.yml"` |
| show-skipped | List unsupported and free resources. | Not required. Defaults to false |
| no-color | Turn off colored output, useful for CI/CD users | Not required. Defaults to false |

### Examples

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
       -F "path=@plan.json" \
       https://pricing.api.infracost.io/diff
  ```

  </TabItem>
  <TabItem value="response">

  ```text
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

  To estimate usage-based resources use --usage-file, see https://infracost.io/usage-file
  ```

  </TabItem>
</Tabs>

---
slug: infracost_api
title: Plan JSON API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::note
The majority of users should use the [Infracost CLI](/docs/#quick-start), which **does not** send the Terraform plan file to the Cloud Pricing API; instead it [sends](/docs/faq#what-data-is-sent-to-the-cloud-pricing-api) cost-related parameters, such as the instance type or disk size, so cloud prices can be found.
:::

We plan to move and open source the API described in this page to the Cloud Pricing API, as it can be useful for CI/CD integrations such as [Atlantis](/docs/integrations/cicd#atlantis). In such cases, it might be easier to use `curl` or an HTTP library instead of installing the Infracost CLI. Terraform plan JSON files can be sent to this API, which runs `infracost` and returns the results. Whilst this API deletes files from the server after they are processed, it is a good security practice to remove secrets from the file before sending it to the API. For example, AWS provides [a grep command](https://gist.github.com/alikhajeh1/f2c3f607c44dabc70c73e04d47bb1307) that can be used to do this.

To use this API, send an HTTP POST request to desired endpoint (e.g. https://pricing.api.infracost.io/diff) with a Terraform plan JSON file sent in the `path` parameter using the multipart/form-data request body format, as shown in the following example curl request. The `x-api-key` header must be set to your [Infracost API key](/docs/#2-get-api-key).

## Breakdown

Show breakdown of costs.

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

  **Tip**: You can use `jq` to extract values. For example, to see the total monthly cost increase of a project you can use:

  ```shell
  jq '.projects[0].diff.totalMonthlyCost'
  # or to see the sum of all projects:
  jq '[.projects[].diff.totalMonthlyCost | select (.!=null) | tonumber] | add'
  ```

  Here is an example of the full JSON output:

  ```json
  {
    "version": "0.2",
    "currency": "USD",
    "projects": [
      {
        "name": "infracost/infracost/examples/terraform",
        "metadata": {
          "path": "examples/terraform",
        },
        /* This contains any resources that are in the prior Terraform state */
        "pastBreakdown": {
          "resources": [],
          "totalHourlyCost": "0",
          "totalMonthlyCost": "0"
        },
        /* This contains the breakdown of resources that are in the planned Terraform state */
        "breakdown": {
          "resources": [
            {
              "name": "aws_instance.web_app",
              "metadata": {},
              "hourlyCost": "1.017315068493150679",
              "monthlyCost": "742.64",
              "costComponents": [
                {
                  "name": "Linux/UNIX usage (on-demand, m5.4xlarge)",
                  "unit": "hours",
                  "hourlyQuantity": "1",
                  "monthlyQuantity": "730",
                  "price": "0.768",
                  "hourlyCost": "0.768",
                  "monthlyCost": "560.64"
                }
              ],
              "subresources": [
                {
                  "name": "root_block_device",
                  "metadata": {},
                  "hourlyCost": "0.00684931506849315",
                  "monthlyCost": "5",
                  "costComponents": [
                    {
                      "name": "General Purpose SSD storage (gp2)",
                      "unit": "GB-months",
                      "hourlyQuantity": "0.0684931506849315",
                      "monthlyQuantity": "50",
                      "price": "0.1",
                      "hourlyCost": "0.00684931506849315",
                      "monthlyCost": "5"
                    }
                  ]
                },
                {
                  "name": "ebs_block_device[0]",
                  "metadata": {},
                  "hourlyCost": "0.242465753424657529",
                  "monthlyCost": "177",
                  "costComponents": [
                    {
                      "name": "Provisioned IOPS SSD storage (io1)",
                      "unit": "GB-months",
                      "hourlyQuantity": "1.3698630136986301",
                      "monthlyQuantity": "1000",
                      "price": "0.125",
                      "hourlyCost": "0.1712328767123287625",
                      "monthlyCost": "125"
                    },
                    {
                      "name": "Provisioned IOPS",
                      "unit": "IOPS-months",
                      "hourlyQuantity": "1.0958904109589041",
                      "monthlyQuantity": "800",
                      "price": "0.065",
                      "hourlyCost": "0.0712328767123287665",
                      "monthlyCost": "52"
                    }
                  ]
                }
              ]
            },
            {
              "name": "aws_lambda_function.hello_world",
              "metadata": {},
              "hourlyCost": null,
              "monthlyCost": null,
              "costComponents": [
                {
                  "name": "Requests",
                  "unit": "1M requests",
                  "hourlyQuantity": null,
                  "monthlyQuantity": null,
                  "price": "0.2",
                  "hourlyCost": null,
                  "monthlyCost": null
                },
                {
                  "name": "Duration",
                  "unit": "GB-seconds",
                  "hourlyQuantity": null,
                  "monthlyQuantity": null,
                  "price": "0.0000166667",
                  "hourlyCost": null,
                  "monthlyCost": null
                }
              ]
            }
          ],
          "totalHourlyCost": "1.017315068493150679",
          "totalMonthlyCost": "742.64"
        },
        /* This contains the diff of the resources between the prior state and planned state */
        "diff": {
          "resources": [
            {
              "name": "aws_instance.web_app",
              "metadata": {},
              "hourlyCost": "1.017315068493150679",
              "monthlyCost": "742.64",
              "costComponents": [
                {
                  "name": "Linux/UNIX usage (on-demand, m5.4xlarge)",
                  "unit": "hours",
                  "hourlyQuantity": "1",
                  "monthlyQuantity": "730",
                  "price": "0.768",
                  "hourlyCost": "0.768",
                  "monthlyCost": "560.64"
                }
              ],
              "subresources": [
                {
                  "name": "root_block_device",
                  "metadata": {},
                  "hourlyCost": "0.00684931506849315",
                  "monthlyCost": "5",
                  "costComponents": [
                    {
                      "name": "General Purpose SSD storage (gp2)",
                      "unit": "GB-months",
                      "hourlyQuantity": "0.0684931506849315",
                      "monthlyQuantity": "50",
                      "price": "0.1",
                      "hourlyCost": "0.00684931506849315",
                      "monthlyCost": "5"
                    }
                  ]
                },
                {
                  "name": "ebs_block_device[0]",
                  "metadata": {},
                  "hourlyCost": "0.242465753424657529",
                  "monthlyCost": "177",
                  "costComponents": [
                    {
                      "name": "Provisioned IOPS SSD storage (io1)",
                      "unit": "GB-months",
                      "hourlyQuantity": "1.3698630136986301",
                      "monthlyQuantity": "1000",
                      "price": "0.125",
                      "hourlyCost": "0.1712328767123287625",
                      "monthlyCost": "125"
                    },
                    {
                      "name": "Provisioned IOPS",
                      "unit": "IOPS-months",
                      "hourlyQuantity": "1.0958904109589041",
                      "monthlyQuantity": "800",
                      "price": "0.065",
                      "hourlyCost": "0.0712328767123287665",
                      "monthlyCost": "52"
                    }
                  ]
                }
              ]
            },
            {
              "name": "aws_lambda_function.hello_world",
              "metadata": {},
              "hourlyCost": "0",
              "monthlyCost": "0",
              "costComponents": [
                {
                  "name": "Requests",
                  "unit": "1M requests",
                  "hourlyQuantity": "0",
                  "monthlyQuantity": "0",
                  "price": "0.2",
                  "hourlyCost": "0",
                  "monthlyCost": "0"
                },
                {
                  "name": "Duration",
                  "unit": "GB-seconds",
                  "hourlyQuantity": "0",
                  "monthlyQuantity": "0",
                  "price": "0.0000166667",
                  "hourlyCost": "0",
                  "monthlyCost": "0"
                }
              ]
            }
          ],
          // The summary format is not finalized and is subject to change
          "summary": {
            "unsupportedResourceCounts": {}
          },
          "totalHourlyCost": "1.017315068493150679",
          "totalMonthlyCost": "742.64"
        }
      }
    ],
    "timeGenerated": "2021-02-17T17:46:51.690235Z",
    // The summary format is not finalized and is subject to change
    "summary": {
      "unsupportedResourceCounts": {}
    },
    "totalHourlyCost": "1.017315068493150679",
    "totalMonthlyCost": "742.64",
  }
  ```

  </TabItem>
  <TabItem value="html">
    <img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
  </TabItem>
</Tabs>

## Diff 

Show diff of monthly costs between current and planned state.

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

---
slug: report
title: Generate reports
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

The `infracost breakdown` command has a `--format json|table|html` flag that can be used to change the output format. The JSON option can be used to generate files from individual projects that can then be consumed by the `infracost output` command to generate a combined report. The output command has a `--format json|diff|table|html` flag that sets the report format.

These reports can be uploaded to object storage such as AWS S3 or Google Cloud Storage and shared with others including team members or management. The HTML report also includes the file names and Terraform tags from the files that were used to generate it.

## Usage

Run `infracost output --help` to see the available options. Example usage:

```shell
infracost breakdown --path /path/to/project1 --format json > project1.json
infracost breakdown --path /path/to/project2 --format json > project2.json

infracost output --path "project*.json" --format html > report.html

infracost output --path "project*.json" --format diff
```

## Examples

<Tabs
  defaultValue="html"
  values={[
    {label: 'Example HTML report', value: 'html'},
    {label: 'JSON format', value: 'json'},
    {label: 'Table format', value: 'table'},
    {label: 'Diff format', value: 'diff'},
  ]}>
  <TabItem value="html">
    <img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
  </TabItem>
  <TabItem value="json">

  **Tip**: You can use `jq` to extract values. For example, to see the total monthly cost increase of a project you can use:

  ```shell
  jq -r '.projects[0].diff.totalMonthlyCost'
  # or to see the sum of all projects:
  jq -r '.diffTotalMonthlyCost'
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
    "pastTotalHourlyCost": "0",
    "pastTotalMonthlyCost": "0",
    "diffTotalHourlyCost": "1.017315068493150679",
    "diffTotalMonthlyCost": "742.64",
  }
  ```

  </TabItem>
  <TabItem value="table">

  ```
  Project: infracost/infracost/examples/terraform

  Name                                     Quantity  Unit                           Monthly Cost

  aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.4xlarge)   730  hours                              $560.64
  ├─ root_block_device
  │  └─ General Purpose SSD storage (gp2)        50  GB                                   $5.00
  └─ ebs_block_device[0]
      ├─ Provisioned IOPS SSD storage (io1)   1,000  GB                                 $125.00
      └─ Provisioned IOPS                       800  IOPS                                $52.00

  aws_lambda_function.hello_world
  ├─ Requests                       Monthly cost depends on usage: $0.20 per 1M requests
  └─ Duration                       Monthly cost depends on usage: $0.0000166667 per GB-seconds

  PROJECT TOTAL                                                               $742.64

  ----------------------------------
  To estimate usage-based resources use --usage-file, see https://infracost.io/usage-file
  ```
  </TabItem>
  <TabItem value="diff">

  ```
  Project: infracost/infracost/examples/terraform

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

## Bulk run

The following bash scripts run Infracost on all subfolders that have `.tf` files and output the combined results using the `infracost output` command. You can customize them based on which folders they should exclude or how you run Infracost (e.g. pass `--terraform-plan-flags`).
  - to run `infracost breakdown`, use [breakdown_all.sh](https://github.com/infracost/infracost/blob/master/scripts/breakdown_all.sh)
  - to run `infracost diff`, use [diff_all.sh](https://github.com/infracost/infracost/blob/master/scripts/breakdown_all.sh)

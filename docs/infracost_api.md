---
slug: infracost_api
title: Infracost API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Terraform plan JSON files can be sent to the Infracost API, which runs the CLI and returns the results. Whilst this API deletes files from the server after they are processed, it is a good security practice to remove secrets from the file before sending it to the API. For example, AWS provides [a grep command](https://gist.github.com/alikhajeh1/f2c3f607c44dabc70c73e04d47bb1307) that can be used to do this. This API can be useful for integrations where it might be easier to use `curl` or an HTTP library instead of installing the Infracost CLI.

To use this API, send an HTTP POST request to `https://pricing.api.infracost.io/tfjson` with the `tfjson` parameter using the multipart/form-data request body format, as shown in the following example curl request. The `x-api-key` header must be set to your [Infracost API key](/docs/#2-get-api-key).

| Parameter | Description | Required? | Notes |
| ---       | ---         | ---       | ---   |
| tfjson | Terraform plan JSON file | Yes | Use '@' to upload the file with curl, e.g. `-F "tfjson=@plan.json"` |
| usage-file | Infracost [usage file](/docs/usage_based_resources) that specifies values for usage-based resources | No | Use '@' to upload the file with curl, e.g. `-F "usage-file=@infracost-usage.yml"` |
| show-skipped | Show unsupported resources, some of which might be free. Only for table and HTML output | No | Defaults to false |
| output | Output format: json, table, html | No | Defaults to table and returns a `text/plain` response. If output is set to `json`, an `application/json` response is returned; and if output is set to `html`, a `text/html` response is returned. |
| no-color | Turn off colored output, useful for table output or Windows users (color output has a bug we need to fix on Windows) | No | Defaults to false |

<Tabs
  defaultValue="request"
  values={[
    {label: 'Example request', value: 'request'},
    {label: 'Table response', value: 'table'},
    {label: 'JSON response', value: 'json'},
    {label: 'HTML response', value: 'html'},
  ]}>
  <TabItem value="request">

  ```sh
  cd path/to/code
  terraform init
  terraform plan -out plan.save .
  terraform show -json plan.save > plan.json

  curl -X POST -H "x-api-key: my-api-key" -F "tfjson=@plan.json" \
    https://pricing.api.infracost.io/tfjson
  ```

  </TabItem>
  <TabItem value="table">

  ```sh
  NAME                                         MONTHLY QTY  UNIT         PRICE   HOURLY COST  MONTHLY COST

  aws_instance.web_app
  ├─ Linux/UNIX usage (on-demand, m5.4xlarge)          730  hours        0.7680       0.7680      560.6400
  ├─ root_block_device
  │  └─ General Purpose SSD storage (gp2)               50  GB-months    0.1000       0.0068        5.0000
  └─ ebs_block_device[0]
     ├─ Provisioned IOPS SSD storage (io1)           1,000  GB-months    0.1250       0.1712      125.0000
     └─ Provisioned IOPS                               800  IOPS-months  0.0650       0.0712       52.0000
  Total                                                                               1.0173      742.6400

  aws_lambda_function.hello_world
  ├─ Requests                                            -  1M requests  0.2000            -             -
  └─ Duration                                            -  GB-seconds    2e-05            -             -
  Total                                                                                    -             -

  OVERALL TOTAL (USD)                                                                 1.0173      742.6400
  ```

  </TabItem>
  <TabItem value="json">

  ```sh
  {
    "resources": [
      {
        "name": "aws_instance.web_app",
        "metadata": null,
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
            "metadata": null,
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
            "metadata": null,
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
        "metadata": null,
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
    "totalMonthlyCost": "742.64",
    "timeGenerated": "2021-01-23T13:06:59.369412325Z",
    "resourceSummary": {
      "unsupportedCounts": {}
    }
  }
  ```
  </TabItem>
  <TabItem value="html">
  <img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
  </TabItem>
</Tabs>

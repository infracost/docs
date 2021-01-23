---
slug: report
title: Generate reports
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

The Infracost command's `--output table|json|html` option can be used to change the output format. The JSON option can be used to generate files that can then be consumed by the `infracost report` command to generate a combined report. The report command can generate table, JSON or HTML reports.

These reports can be uploaded to object storage such as AWS S3 and shared with others including team members or management. The HTML report also includes the file names and Terraform tags from the files that were used to generate it.

Run `infracost report --help` to see the available options.

```sh
infracost --tfdir /path/to/module1 --output json > module1.json
infracost --tfdir /path/to/module2 --output json > module2.json

infracost report --output html module*.json > report.html
```


<Tabs
  defaultValue="html"
  values={[
    {label: 'HTML report', value: 'html'},
    {label: 'JSON report', value: 'json'},
    {label: 'Table report', value: 'table'},
  ]}>
  <TabItem value="html">
    <img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
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
</Tabs>

---
slug: cli_commands
title: CLI commands
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Infracost CLI has the following commands, all of which support `--help`:

- `register`: Register for a free Infracost API key
- `breakdown`: Show full breakdown of costs
- `diff`: Show diff of monthly costs between current and planned state
- `output`: Combine and output Infracost JSON files in different formats
- `configure`: Display or change global configuration, including currency settings
- `completion`: Generate shell completion script

## Breakdown and diff

Infracost `breakdown` and `diff` both have a `--path` flag, so you can point to either your Terraform directory, or plan JSON file.

If your repo has **multiple Terraform projects or workspaces**, use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown or diff output.

### Option 1: Terraform directory

This is the simplest way to run Infracost. As shown below, any required Terraform flags can be passed using `--terraform-plan-flags`. The `--terraform-workspace` flag can be used to define a workspace.

Internally Infracost runs Terraform init, plan and show; [Terraform init](/docs/faq#does-infracost-need-cloud-credentials) requires cloud credentials to be set, e.g. via the usual [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#environment-variables), [Google](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference#full-reference) or [Azure](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret) environment variables or other methods.

  ```shell
  infracost breakdown --path /code --terraform-plan-flags "-var-file=my.tfvars"

  infracost diff --path /code --terraform-plan-flags "-var-file=my.tfvars"
  ```

### Option 2: Terraform plan JSON

If the above method does not work for your use-case, you can use Terraform to generate a plan JSON file (as shown below), and point Infracost to it using `--path`. In this case, cloud credentials are not needed by Infracost.

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary
  terraform show -json tfplan.binary > plan.json

  infracost breakdown --path plan.json

  infracost diff --path plan.json
  ```

See the [advanced usage](/docs/guides/advanced_usage) guide for other usage options.

### Useful flags

The breakdown and diff commands have many useful flags, run with `--help` to see them. For example, breakdown supports:

  ```  
  --terraform-workspace  Terraform workspace to use. Applicable when path is a Terraform directory
  --format               Output format: json, table, html (default "table")
  --config-file          Path to Infracost config file. Cannot be used with path, terraform* or usage-file flags
  --usage-file           Path to Infracost usage file that specifies values for usage-based resources
  --sync-usage-file      Sync usage-file with missing resources, needs usage-file too (experimental)
  --fields               Comma separated list of output fields: all,price,monthlyQuantity,unit,hourlyCost,monthlyCost.
                         Only supported by table output format (default [monthlyQuantity,unit,monthlyCost])
  --show-skipped         Show unsupported resources
  --no-cache             Don't attempt to cache Terraform plans
  --out-file string      Save output to a file, helpful with format flag
  --log-level            Use "debug" to troubleshoot, can be set to "info" or "warn" in CI/CD systems to reduce noise, turns off spinners in output
  --no-color             Turn off colored output
  ```

## Combined output formats

The Infracost CLI can generate cost estimates in many formats: `json`, `diff`, `table`, `html`, `github-comment`, `gitlab-comment` and `slack-comment`.

Please 👍 [this issue](https://github.com/infracost/infracost/issues/1173) for `bitbucket-comment` and [this issue](https://github.com/infracost/infracost/issues/1208) for `azure-repos-comment`.

### Usage

The Infracost CLI tool has a JSON output format, which can be used to generate files from individual projects using the `breakdown` command:

```sh
infracost breakdown --path /project1 --format json --out-file infracost-p1.json
infracost breakdown --path /project2 --format json --out-file infracost-p2.json
```

The Infracost JSON files can then be consumed by the `infracost output` command to generate a combined cost estimate in many formats:

```sh
# Merge above Infracost JSON files, glob patterns need quotes
infracost output --path "infracost-p*.json" --format json --out-file infracost.json

# HTML output
infracost output --path infracost.json --format html --out-file report.html

# Diff output
infracost output --path infracost.json --format diff
```

Run `infracost output --help` to see other options, such as `--fields` and `--show-skipped`. The above formats or reports can be used to integrate Infracost with other tools, or uploaded to object storage such as AWS S3 or Google Cloud Storage and shared with others including team members or management. The HTML report also includes the file names and Terraform tags from the files that were used to generate it.

### Examples

<Tabs
  defaultValue="json"
  values={[
    {label: 'JSON format', value: 'json'},
    {label: 'HTML', value: 'html'},
    {label: 'Table', value: 'table'},
    {label: 'Diff', value: 'diff'},
    {label: 'GitHub/GitLab comment', value: 'github-gitlab-comment'},
    {label: 'Slack message', value: 'slack-message'}
  ]}>
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
  <TabItem value="html">
    <img src={useBaseUrl("img/screenshots/html_report.png")} alt="Infracost HTML report" />
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
  <TabItem value="github-gitlab-comment">
    <img src={useBaseUrl("img/screenshots/github-comment-format.png")} alt="Infracost GitHub comment report" />
  </TabItem>
  <TabItem value="slack-message">
    <img src={useBaseUrl("img/screenshots/slack-message-format.png")} alt="Infracost Slack message report" />
  </TabItem>
</Tabs>

### Bulk run

The following bash scripts run Infracost on all subfolders that have `.tf` files and output the combined results using the `infracost output` command. You can customize them based on which folders they should exclude or how you run Infracost (e.g. pass `--terraform-plan-flags`).
  - to run `infracost breakdown`, use [breakdown_all.sh](https://github.com/infracost/infracost/blob/master/scripts/breakdown_all.sh)
  - to run `infracost diff`, use [diff_all.sh](https://github.com/infracost/infracost/blob/master/scripts/breakdown_all.sh)

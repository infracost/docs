---
slug: usage_based_resources
title: Usage-based resources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost differentiates the **price** of a resource from its **cost**. The price is the per-unit value provided by cloud vendors, while the cost is calculated by multiplying the resource's price by its usage. By default, Infracost displays prices for usage-based resources like AWS S3 or Lambda, providing users with visibility into the few relevant prices (for them) out of the millions of cloud prices.

Furthermore, users have the option to provide usage estimates in a file to calculate costs. This feature also simplifies rapid **what-if analysis**. For example, they can assess how costs would change if their Lambda function gets 2x more requests, or if they optimize the code to reduce the average run time by 25%.

<Tabs
  defaultValue="without-usage-file"
  values={[
    {label: 'Default output', value: 'without-usage-file'},
    {label: 'Output with usage file', value: 'with-usage-file'},
  ]}>
  <TabItem value="without-usage-file">

  ```
  Name                               Quantity  Unit         Monthly Cost

  aws_lambda_function.hi
  ├─ Requests              Cost depends on usage: $0.20 per 1M requests
  └─ Duration              Cost depends on usage: $0.0000166667 per GB-seconds
  ```
  </TabItem>
  <TabItem value="with-usage-file">

  ```
  Name                               Quantity  Unit         Monthly Cost

  aws_lambda_function.hi
  ├─ Requests                             100  1M requests        $20.00
  └─ Duration                      12,500,000  GB-seconds        $208.33

  PROJECT TOTAL                                                  $228.33
  ```
  </TabItem>
</Tabs>

## Usage

Instead of using cloud vendor cost calculators or spreadsheets, you can specify usage estimates in an auto-generated file called `infracost-usage.yml`. The Infracost GitHub/GitLab App integrations will use this file automatically when it is placed at the repo root, or another location specified in the [config file](/docs/features/config_file/). The CLI can also use this file.

### 1. Generate usage file

Assuming you have [installed](/docs/#1-install-infracost) the Infracost CLI, use the `--sync-usage-file` flag to generate a new usage file or update an existing one. You must specify the location of the new or existing usage file using the `--usage-file` flag:
  ```sh
  infracost breakdown --sync-usage-file --usage-file infracost-usage.yml --path /code
  ```

This creates/updates the usage file by:
1. Adding any missing resources or fields as comments with a zero value.
2. Deleting any resources that are not used in the Terraform project.

When using the `--usage-file` flag with the `breakdown` or `output` commands, cost components with a 0 hourly/monthly quantity are not shown so the output is less noisy. These are included in the JSON format.

### 2. Edit usage file

Edit the generated usage file with your usage estimates, for example a Lambda function can have the following parameters. This file can be checked into git alongside other code, and updated when needed.

  ```yaml
  version: 0.1
  resource_usage:
    aws_lambda_function.hi:
      monthly_requests: 100 # Monthly requests to the Lambda function.
      request_duration_ms: 12500000 # Average duration of each request in milliseconds.
  ```

### 3. Run with usage file

The Infracost GitHub/GitLab App integrations will use the `infracost-usage.yml` file automatically when it is placed at the repo root. You can also run `infracost breakdown` or `infracost diff` with the usage file to see monthly cost estimates:

  ```sh
  infracost breakdown --path /code --usage-file infracost-usage.yml

  Name                               Quantity  Unit         Monthly Cost

  aws_lambda_function.hi
  ├─ Requests                             100  1M requests        $20.00
  └─ Duration                      12,500,000  GB-seconds        $208.33

  PROJECT TOTAL                                                  $228.33
  ```

## Usage profiles

You can use the `resource_type_default_usage` section of the usage file and create separate files for different traffic profiles, e.g. low/medium/high shown below. This enables you to get a rough estimate for many projects quickly without defining usage values for each individual resource in those projects, by running `infracost breakdown --path /code --usage-file infracost-usage-medium.yml`.

<Tabs
  defaultValue="infracost-usage-low"
  values={[
    {label: 'infracost-usage-low.yml', value: 'infracost-usage-low'},
    {label: 'infracost-usage-medium.yml', value: 'infracost-usage-medium'},
    {label: 'infracost-usage-high.yml', value: 'infracost-usage-high'}
  ]}>
  <TabItem value="infracost-usage-low">

  ```yml
  version: 0.1
  resource_type_default_usage:
    aws_lambda_function:
      monthly_requests: 1000000
      request_duration_ms: 100

    aws_dynamodb_table:
      storage_gb: 5
      monthly_write_request_units: 20
      monthly_read_request_units: 40

    aws_cloudwatch_log_group:
      storage_gb: 10
      monthly_data_ingested_gb: 10
      monthly_data_scanned_gb: 10
  ```
  </TabItem>
  <TabItem value="infracost-usage-medium">

  ```yml
  version: 0.1
  resource_type_default_usage:
    aws_lambda_function:
      monthly_requests: 5000000
      request_duration_ms: 200

    aws_dynamodb_table:
      storage_gb: 100
      monthly_write_request_units: 50
      monthly_read_request_units: 70

    aws_cloudwatch_log_group:
      storage_gb: 100
      monthly_data_ingested_gb: 100
      monthly_data_scanned_gb: 100
  ```
  </TabItem>
  <TabItem value="infracost-usage-high">

  ```yml
  version: 0.1
  resource_type_default_usage:
    aws_lambda_function:
      monthly_requests: 10000000
      request_duration_ms: 200

    aws_dynamodb_table:
      storage_gb: 500
      monthly_write_request_units: 90
      monthly_read_request_units: 140

    aws_cloudwatch_log_group:
      storage_gb: 500
      monthly_data_ingested_gb: 500
      monthly_data_scanned_gb: 500
  ```
  </TabItem>
</Tabs>

## Supported parameters

### Reference file

The [infracost-usage-example.yml](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) reference file contains the list of all of the available parameters and their descriptions for all resource types. These parameters can be added to either a resource (e.g. `aws_dynamodb_table.mytable`) or a resource type (e.g. `aws_dynamodb_table`) using the resource type defaults mentioned below.

### Resource type defaults

Usage for a resource type, e.g. `aws_dynamodb_table`, can also be defined in the `resource_type_default_usage` section of the usage file. Resource type defaults apply to all resources of that type regardless of the module they reside in.

This is useful when you want to create traffic profiles such as lower/medium/high. Resource type defaults can be overridden on a per-resource basis (shown below); usage keys that are re-defined at a resource level override the default, and new usage keys are merged with the defaults. 

```yaml
version: 0.1
resource_type_default_usage:
  aws_dynamodb_table:
    storage_gb: 1000 # Set in all DynamoDB table resources

resource_usage:
  aws_dynamodb_table.my_table:
    monthly_write_request_units: 200 # Merged with default that defines storage_gb, so both attributes are set for this resource

  aws_dynamodb_table.my_other_table:
    storage_gb: 50 # Overrides the default
```

### Terraform modules

Usage for resources inside modules can be specified using the full path of the resource. This is the same value as Infracost outputs in the Name column, for example:

```yaml
version: 0.1
resource_usage:
  module.my_module.aws_dynamodb_table.my_table:
    storage_gb: 1000

  module.lambda_function.aws_lambda_function.this[0]:
    monthly_requests: 20000
    request_duration_ms: 600
```

### Resource arrays/maps

The wildcard character `[*]` can be used for resource arrays (resources with [`count` meta-argument](https://www.terraform.io/docs/language/meta-arguments/count.html)) and resource maps (resources with [`for_each` meta-argument](https://www.terraform.io/docs/language/meta-arguments/for_each.html)), such as AWS CloudWatch Log Groups. Infracost will apply the usage values individually to each element of the array/map (they all get the same values). If both an array element such as `this[0]` (or map element such as `this["foo"]`) and `[*]` are specified for a resource, only the array/map element's usage will be applied to that resource. This enables you to define default values using `[*]` and override specific elements using their index or key.

When wildcard entries exist in the usage file and `--sync-usage-file` is used:
- values are generated for each element of the wildcard.
- entries are added for each wildcard element when usage data is [fetched from AWS CloudWatch](#fetch-from-cloudwatch), which overrides the wildcard value.

<Tabs
  defaultValue="using-array-wildcard"
  values={[
    {label: 'Using array or map wildcard', value: 'using-array-wildcard'},
    {label: 'Array without wildcard', value: 'array-without-wildcard'},
    {label: 'Map without wildcard', value: 'map-without-wildcard'}
  ]}>
  <TabItem value="using-array-wildcard">

  ```yml
  version: 0.1
  resource_usage:
    aws_cloudwatch_log_group.my_group[*]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200
    mod.my_module[*].aws_cloudwatch_log_group.my_group[*]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200
  ```
  </TabItem>
  <TabItem value="array-without-wildcard">

  ```yml
  version: 0.1
  resource_usage:  
    aws_cloudwatch_log_group.my_group[0]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200

    aws_cloudwatch_log_group.my_group[1]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200

    aws_cloudwatch_log_group.my_group[3]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200

    mod.my_mod[0].aws_cloudwatch_log_group.my_group[0]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200

    mod.my_mod[1].aws_cloudwatch_log_group.my_group[0]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200
  ```
  </TabItem>
  <TabItem value="map-without-wildcard">

  ```yml
  version: 0.1
  resource_usage:
    aws_cloudwatch_log_group.my_group["foo"]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200

    mod.my_mod["bar"].aws_cloudwatch_log_group.my_group["foo"]:
      storage_gb: 1000
      monthly_data_ingested_gb: 1000
      monthly_data_scanned_gb: 200
  ```
  </TabItem>
</Tabs>

### EC2 reserved instances

What-if anlaysis can be done on AWS EC2 Reserved Instances (RI) using the usage file. The RI type, term and payment option can be defined as shown below, to quickly get a monthly cost estimate. This works with `aws_instance` as well as `aws_eks_node_group` and `aws_autoscaling_group` as they also create EC2 instances. Let us know how you'd like Infracost to show the upfront costs by [creating a GitHub issue](https://github.com/infracost/infracost/issues/).

  ```yml
  version: 0.1
  resource_usage: 
    aws_instance.my_instance:
      operating_system: linux # Override the operating system of the instance, can be: linux, windows, suse, rhel.
      reserved_instance_type: standard # Offering class for Reserved Instances. Can be: convertible, standard.
      reserved_instance_term: 1_year # Term for Reserved Instances. Can be: 1_year, 3_year.
      reserved_instance_payment_option: all_upfront # Payment option for Reserved Instances. Can be: no_upfront, partial_upfront, all_upfront.
  ```

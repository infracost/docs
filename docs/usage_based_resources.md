---
slug: usage_based_resources
title: Usage-based resources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost distinguishes the **price** of a resource from its **cost**. Price is the per-unit price published by a cloud vendor. The cost of a resource is calculated by multiplying its price by its usage. For usage-based resources such as AWS Lambda or Google Cloud Storage, Infracost will show prices:

  ```
  Name                             Quantity  Unit                 Monthly Cost

  aws_lambda_function.hi
  ├─ Requests              Cost depends on usage: $0.20 per 1M requests
  └─ Duration              Cost depends on usage: $0.0000166667 per GB-seconds

  PROJECT TOTAL                                                          $0.00
  ```

## Infracost usage file

Infracost enables you to describe usage estimates in a file called [`infracost-usage.yml`](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml), which can be passed to Infracost using the `--usage-file` option so it can calculate costs. This flag should not be confused with the `--config-file` option that is used to [configure](/docs/multi_project/config_file) how Infracost runs.

Instead of using cloud vendor cost calculators, spreadsheets or wiki pages, you can check-in usage estimates into git alongside other code, get cost estimates from them, and adjust them when needed. This enables quick "what-if" analysis to be done too; for example, what happens to the cost estimate if a Lambda function gets 2x more requests.

Follow these simple steps to use this feature:

### 1. Generate usage file

Use the `--sync-usage-file` option to generate a new usage file or update an existing one. You must specify the location of the new or existing usage file using the `--usage-file` flag. The `--sync-usage-file` updates the usage file as below:
1. Attempts to pull usage data from CloudWatch and updates any fields with those values. [See here](#fetch-from-cloudwatch) for more information about which resources and fields are supported.
2. Adds any missing resources or fields as comments with a zero value.
3. Deletes any resources that are not used in the Terraform project.

```sh
infracost breakdown --sync-usage-file --usage-file infracost-usage.yml --path /code
```

When using the `--usage-file` flag with the `breakdown` or `output` commands, cost components with a 0 hourly/monthly quantity are not shown in table and HTML formats so the output is less noisy. These are included in the JSON format.

#### Fetch from CloudWatch

As of Infracost CLI `v0.9.8`, we're experimenting with fetching the following usage file values from CloudWatch or other cloud APIs when `--sync-usage-file` is used (falling back to using 0). This enables you to quickly see what the last 30-day usage for those resources have been and adjust if needed. If the CLI can fetch the following values from CloudWatch, it will overwrite them in the usage file.
- `aws_dynamodb_table`: `storage_gb`, `monthly_read_request_units` and `monthly_write_request_units`
- `aws_lambda_function`: `monthly_requests` and `request_duration_ms`
- `aws_s3_bucket`:
  - Standard storage class: `storage_gb`, `monthly_tier_1_requests`, `monthly_tier_2_requests`, `monthly_select_data_scanned_gb` and `monthly_select_data_returned_gb`
  - Intelligent tiering storage class: `frequent_access_storage_gb`, `infrequent_access_storage_gb`, `archive_access_storage_gb` and `deep_archive_storage_gb`
  - Other storage classes: `storage_gb`
- `aws_instance`, `aws_autoscaling_group`, `aws_eks_node_group`: `operating_system` (based on the AMI, detected as one of: `linux`, `windows`, `suse`, `rhel`)
- `aws_autoscaling_group` and `aws_eks_node_group`: `instances`. If unable to fetch the last 30-day average from CloudWatch this will fetch the current instance count from the AWS API instead.

Please use [this GitHub discussion](https://github.com/infracost/infracost/discussions/985) to let us know if you find this useful or have feedback.

### 2. Edit usage file

Edit the generated usage file with your usage estimates, for example a Lambda function can have the following parameters. You can check-in usage estimates into git alongside other code, get cost estimates from them, and adjust them when needed.

  ```yaml
  version: 0.1

  resource_usage:
    aws_lambda_function.hi:
      monthly_requests: 0 # Monthly requests to the Lambda function.
      request_duration_ms: 0 # Average duration of each request in milliseconds.
  ```

### 3. Run with usage file

Run `infracost breakdown` or `infracost diff` with the usage file to see monthly cost estimates:

  ```sh
  infracost breakdown --path /code --usage-file infracost-usage.yml

  Name                               Quantity  Unit         Monthly Cost

  aws_lambda_function.hi
  ├─ Requests                             100  1M requests        $20.00
  └─ Duration                      12,500,000  GB-seconds        $208.33

  PROJECT TOTAL                                                  $228.33
  ```

## Supported parameters

The reference file [**infracost-usage-example.yml**](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml) contains the list of all of the available parameters and their descriptions.

### Terraform modules

Usage for resources inside modules can be specified using the full path of the resource. This is the same value as Infracost outputs in the Name column, for example:

```yaml
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
  aws_cloudwatch_log_group.my_group[*]:
    storage_gb: 1000
    monthly_data_ingested_gb: 1000
    monthly_data_scanned_gb: 200
  ```
  </TabItem>
  <TabItem value="array-without-wildcard">

  ```yml
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
  ```
  </TabItem>
  <TabItem value="map-without-wildcard">

  ```yml
  aws_cloudwatch_log_group.my_group["foo"]:
    storage_gb: 1000
    monthly_data_ingested_gb: 1000
    monthly_data_scanned_gb: 200
  ```
  </TabItem>
</Tabs>

### EC2 reserved instances

What-if anlaysis can be done on AWS EC2 Reserved Instances (RI) using the usage file. The RI type, term and payment option can be defined as shown below, to quickly get a monthly cost estimate. This works with `aws_instance` as well as `aws_eks_node_group` and `aws_autoscaling_group` as they also create EC2 instances. Let us know how you'd like Infracost to show the upfront costs by [creating a GitHub issue](https://github.com/infracost/infracost/issues/).

  ```yml
  aws_instance.my_instance:
    operating_system: linux # Override the operating system of the instance, can be: linux, windows, suse, rhel.
    reserved_instance_type: standard # Offering class for Reserved Instances. Can be: convertible, standard.
    reserved_instance_term: 1_year # Term for Reserved Instances. Can be: 1_year, 3_year.
    reserved_instance_payment_option: all_upfront # Payment option for Reserved Instances. Can be: no_upfront, partial_upfront, all_upfront.
  ```

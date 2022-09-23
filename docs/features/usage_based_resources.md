---
slug: usage_based_resources
title: Usage-based resources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Infracost distinguishes the **price** of a resource from its **cost**. Price is a per-unit value published by cloud vendors. Cost is calculated by multiplying a resource's price by its usage. Infracost shows prices by default for usage-based resources such as AWS Lambda:

  ```
  Name                             Quantity  Unit                 Monthly Cost

  aws_lambda_function.hi
  ├─ Requests              Cost depends on usage: $0.20 per 1M requests
  └─ Duration              Cost depends on usage: $0.0000166667 per GB-seconds

  PROJECT TOTAL                                                          $0.00
  ```

There are two options for showing costs instead of prices:
1. **Specify usage manually**: for doing what-if analysis. For example, what happens to the cost estimate if a Lambda function gets 2x more requests? Usage can be defined for a resource type (e.g. `aws_lambda_function`) or individual resources (e.g. `aws_lambda_function.hi`).
2. **Fetch usage from Cloud APIs**: provides visibility of usage-based costs in the terminal and CI/CD. This currently only works for AWS.

## Specify usage manually

Instead of using cloud vendor cost calculators, spreadsheets or wiki pages, you can specify usage estimates in a file called [`infracost-usage.yml`](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml), which can be passed to Infracost using the `--usage-file` flag so it can calculate costs.  This enables you to do quick **what-if analysis**; for example, what happens to the cost estimate if a Lambda function gets 2x more requests?

This flag should not be confused with the `--config-file` option that is used to [configure](/docs/features/config_file) how Infracost runs.

### 1. Generate usage file

Use the `--sync-usage-file` option to generate a new usage file or update an existing one. You must specify the location of the new or existing usage file using the `--usage-file` flag:
  ```sh
  infracost breakdown --sync-usage-file --usage-file infracost-usage.yml --path /code
  ```

This updates the usage file by:
1. Attempting to fetch usage data from cloud APIs and updating any fields with those values. [See here](#fetch-from-cloudwatch) for more information about which resources and fields are supported.
2. Adding any missing resources or fields as comments with a zero value.
3. Deleting any resources that are not used in the Terraform project.

When using the `--usage-file` flag with the `breakdown` or `output` commands, cost components with a 0 hourly/monthly quantity are not shown in table and HTML formats so the output is less noisy. These are included in the JSON format.

### 2. Edit usage file

Edit the generated usage file with your usage estimates, for example a Lambda function can have the following parameters. This file can be checked into git alongside other code, and updated when needed.

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

### Supported parameters

The **reference file [infracost-usage-example.yml](https://github.com/infracost/infracost/blob/master/infracost-usage-example.yml)** contains the list of all of the available parameters and their descriptions.

#### Resource type defaults

Usage for a resource type, e.g. `aws_dynamodb_table`, can also be defined in the usage file. Resource type defaults apply to all resources of that type regardless of the module they reside in.

This is useful when you want to create traffic profiles such as small/medium/large. Resource type defaults can be overridden on a per-resource basis (shown below); usage keys that are re-defined at a resource level override the default, and new usage keys are merged with the defaults. 

```yaml
aws_dynamodb_table:
  storage_gb: 1000 # Set in all DynamoDB table resources

aws_dynamodb_table.my_table:
  monthly_write_request_units: 200 # Merged with default that defines storage_gb

aws_dynamodb_table.my_other_table:
  storage_gb: 50 # Overrides the default
```

#### Terraform modules

Usage for resources inside modules can be specified using the full path of the resource. This is the same value as Infracost outputs in the Name column, for example:

```yaml
module.my_module.aws_dynamodb_table.my_table:
  storage_gb: 1000

module.lambda_function.aws_lambda_function.this[0]:
  monthly_requests: 20000
  request_duration_ms: 600
```

#### Resource arrays/maps

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

#### EC2 reserved instances

What-if anlaysis can be done on AWS EC2 Reserved Instances (RI) using the usage file. The RI type, term and payment option can be defined as shown below, to quickly get a monthly cost estimate. This works with `aws_instance` as well as `aws_eks_node_group` and `aws_autoscaling_group` as they also create EC2 instances. Let us know how you'd like Infracost to show the upfront costs by [creating a GitHub issue](https://github.com/infracost/infracost/issues/).

  ```yml
  aws_instance.my_instance:
    operating_system: linux # Override the operating system of the instance, can be: linux, windows, suse, rhel.
    reserved_instance_type: standard # Offering class for Reserved Instances. Can be: convertible, standard.
    reserved_instance_term: 1_year # Term for Reserved Instances. Can be: 1_year, 3_year.
    reserved_instance_payment_option: all_upfront # Payment option for Reserved Instances. Can be: no_upfront, partial_upfront, all_upfront.
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

## Fetch from cloud APIs

We're **experimenting** with fetching usage data from AWS CloudWatch/cloud APIs, which provides you with visibility of usage-based costs in the terminal and CI/CD:
```
infracost breakdown --path /code --sync-usage-file --usage-file /tmp/ignore.yml
```
See the docs for the [usage file](/docs/features/usage_based_resources/#specify-usage-manually) if you're interested in editing it manually.

This currently only works for AWS and enables you to quickly see the last 30-day usage (and costs) for the following resources:
- **aws_dynamodb_table**: storage_gb, monthly_read_request_units and monthly_write_request_units
- **aws_lambda_function**: monthly_requests and request_duration_ms
- **aws_s3_bucket**:
  - Standard storage class: storage_gb, monthly_tier_1_requests, monthly_tier_2_requests, monthly_select_data_scanned_gb and monthly_select_data_returned_gb
  - Intelligent tiering storage class: frequent_access_storage_gb, infrequent_access_storage_gb, archive_access_storage_gb and deep_archive_storage_gb
  - Other storage classes: storage_gb
- **aws_instance**, **aws_autoscaling_group**, **aws_eks_node_group**: operating_system (based on the AMI, detected as one of: linux, windows, suse, rhel)
- **aws_autoscaling_group** and **aws_eks_node_group**: instances. If unable to fetch the last 30-day average from CloudWatch this will fetch the current instance count from the AWS API instead.

### Credentials

This functionality uses the AWS credentials from the default AWS credential provider chain. To set or override these use the `AWS_PROFILE`, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables. These can also be set in a [config-file](/docs/features/config_file/) for multi-project setups.

If you're using AssumeRole, something like the following should work but only for one AWS account. Terraform/Terragrunt projects that use multiple AWS accounts are not supported with this method.

```shell
aws sts assume-role --role-arn <arn> --role-session-name <session name>
# extract the AccessKeyId, SecretAccessKey and SessionToken

export AWS_ACCESS_KEY_ID=<AccessKeyId>
export AWS_SECRET_ACCESS_KEY=<SecretAccessKey>
export AWS_SESSION_TOKEN=<SessionToken>

infracost breakdown --path /code --sync-usage-file --usage-file /tmp/ignore.yml
```

Your AWS credentials need the following IAM permissions for this to work. These are likely to be already defined if you're using the same AWS credentials that you use for generating your Terraform plan JSON file. The following will be updated as we add support for more resources.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "InfracostSyncUsage",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeImages",
                "eks:DescribeNodegroup",
                "dynamodb:DescribeTable",
                "autoscaling:DescribeAutoScalingGroups",
                "s3:GetMetricsConfiguration",
                "cloudwatch:GetMetricStatistics"
            ],
            "Resource": "*"
        }
    ]
}
```

### See usage costs in CI/CD

The following workaround can be used in the terminal or CI/CD systems so a usage file does not need to be created in advance. The `/tmp/ignore.yml` file can simply be ignored; in the future we might make this an optional flag, so usage data can be fetched from CloudWatch/cloud APIs without the need for a usage file.
```sh
# Generate an Infracost JSON file, including usage-based costs
infracost breakdown --path /code \
    --sync-usage-file --usage-file /tmp/ignore.yml \
    --format json --out-file infracost-base.json

# Show a breakdown in text format, from the Infracost JSON file
infracost output --path infracost-base.json --format table

# Post a comment using the Infracost JSON file.
# Run `infracost comment --help` to see the other required flags.
infracost comment github --path infracost-base.json ...
```

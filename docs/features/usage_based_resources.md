---
slug: usage_based_resources
title: Usage costs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost differentiates Baseline costs and Usage costs:

- **Baseline costs** are consistent charges for provisioned resources, like the hourly cost for a virtual machine, which stays constant no matter how much it is used. Infracost estimates these resources assuming they are used for the whole month (730 hours).
- **Usage costs** are charges based on actual usage, like the storage cost for an object storage bucket. Infracost estimates these resources using monthly usage values defined in your [Infracost Cloud](#infracost-cloud) organization or from an [infracost-usage.yml](#infracost-usageyml) file at the root of code repos.

To determine whether a resource incurs baseline or usage costs, you can examine cloud vendor pricing details, paying attention to whether prices are listed hourly. If they are and your Terraform code specifies resource size, it indicates a baseline cost. Alternatively, you can utilize Infracost; costs marked with a `*` denote usage costs, while others represent baseline costs. Infracost exists to make cloud pricing easy to understand!

<img src={useBaseUrl("img/infracost-cloud/pull-request-with-usage-cost.png")} alt="Usage costs in pull requests" />

## How to override & improve estimates

Check out our demo video below to learn how to override and improve estimates for usage-based resources. This can be done from:

- [Infracost Cloud](#infracost-cloud) (recommended): define usage defaults for all repos in a central place. This is a paid feature and enables FinOps, DevOps and Platform teams to set rough values based on historic usage, which lets development teams generate more accurate estimates.
- [infracost-usage.yml](#infracost-usageyml): development teams can also use this file to provide usage values in their repos. This is a free feature. These values are merged with the centrally-defined values and take precedence over them.

<iframe width="90%" height="450" src="https://www.youtube.com/embed/dZxO4XUq7UE" title="Demo of usage costs feature" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>

## Infracost Cloud

### Predefined values

For all resource types, we've predefined values that attempt to set each usage-based cost as $5/month for common configurations, helping engineers understand that these resources are not free. To see the predefined values, go to Org Settings > Usage defaults.

Disabling predefined values means that usage keys not [overridden](#add-overrides) in your usage defaults will not show costs in pull request comments and Infracost Cloud. Therefore, engineers might think these resources are free.

<img src={useBaseUrl("img/infracost-cloud/usage-defaults.png")} alt="Usage defaults in Infracost Cloud" />

### Add overrides

Predefined usage values can be overridden by creating a new usage default; simply search for a resource type and add override values (shown below). You can also set [project](/docs/infracost_cloud/key_concepts/#projects) filters so the overrides only apply to certain projects. This is useful when defining production vs non-production usage values where production values are much higher.

<img src={useBaseUrl("img/infracost-cloud/usage-overrides.png")} alt="Usage overrides in Infracost Cloud" />

## infracost-usage.yml

The `infracost-usage.yml` file lets engineers set usage values in their repos. These are merged with any values defined in [Infracost Cloud](#infracost-cloud) and take precedence over them. To use this method:

1. Copy [this file](https://github.com/infracost/infracost/blob/master/infracost-usage-defaults.small.yml) into your repo and customize the required values. This predefined file attempts to set each usage-based cost as $5/month for common configurations, helping engineers understand that these resources are not free.
2. [GitHub](/docs/integrations/github_app/) and [GitLab](/docs/integrations/gitlab_app/) App users should put this file at the root of repos (or another location specified in the [config file](/docs/features/config_file/)). CLI and CI/CD users should add the `--usage-file=infracost-usage.yml` flag to **both** `infracost breakdown` and `infracost diff` commands:

```sh
infracost breakdown --path /code --usage-file infracost-usage.yml
```

This `infracost-usage.yml` file does not currently support [project filters](/docs/features/usage_based_resources/#add-overrides). However, you can set values for specific resources. For example, you can set values for `aws_lambda_function.my_function` as opposed to the `aws_lambda_function` resource type that applies to all Lambda functions. This is useful when dealing with outlier resources that require customization.

<details>
<summary>Customizing usage values for individual resources</summary>

The following `infracost-usage.yml` file demonstrates how values for individual resources can be customized:

```yml
version: 0.1
# Defaults applied to all resources of this type
resource_type_default_usage:
  aws_dynamodb_table:
    storage_gb: 1000 # Set in all DynamoDB table resources

# Values applied to individual resources
resource_usage:
  aws_dynamodb_table.my_table:
    monthly_write_request_units: 200 # Merged with default that defines storage_gb, so both attributes are set for this resource

  aws_dynamodb_table.my_other_table:
    storage_gb: 50 # Overrides the default

  # Use the full path of the resource for modules (same value that Infracost outputs in the Name column)
  module.my_module.aws_dynamodb_table.my_table:
    storage_gb: 1000
```

#### Resource arrays/maps

The wildcard character `[*]` can be used for resource arrays (resources with [`count` meta-argument](https://www.terraform.io/docs/language/meta-arguments/count.html)) and resource maps (resources with [`for_each` meta-argument](https://www.terraform.io/docs/language/meta-arguments/for_each.html)), such as AWS CloudWatch Log Groups. Infracost will apply the usage values individually to each element of the array/map (they all get the same values). If both an array element such as `this[0]` (or map element such as `this["foo"]`) and `[*]` are specified for a resource, only the array/map element's usage will be applied to that resource. This enables you to define default values using `[*]` and override specific elements using their index or key.

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

#### EC2 reserved instances

What-if analysis can be done on AWS EC2 Reserved Instances (RI) using the usage file. The RI type, term and payment option can be defined as shown below, to quickly get a monthly cost estimate. This works with `aws_instance` as well as `aws_eks_node_group` and `aws_autoscaling_group` as they also create EC2 instances. Let us know how you'd like Infracost to show the upfront costs by [creating a GitHub issue](https://github.com/infracost/infracost/issues/).

```yml
version: 0.1
resource_usage:
  aws_instance.my_instance:
    operating_system: linux # Override the operating system of the instance, can be: linux, windows, suse, rhel.
    reserved_instance_type: standard # Offering class for Reserved Instances. Can be: convertible, standard.
    reserved_instance_term: 1_year # Term for Reserved Instances. Can be: 1_year, 3_year.
    reserved_instance_payment_option: all_upfront # Payment option for Reserved Instances. Can be: no_upfront, partial_upfront, all_upfront.
```

</details>

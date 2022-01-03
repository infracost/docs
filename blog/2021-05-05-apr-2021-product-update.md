---
slug: apr-2021-product-update
title: 'April 2021 update - EC2 reserved instances and Jenkins integration!'
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh
author_image_url: /img/avatars/ali.jpg
description: We shipped major new features - big thanks to the community! Upgrade to pickup the new features.
hide_table_of_contents: true
image: img/blog/apr-2021-update/jenkins.png
Date: "2021-05-05T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Two big milestones to celebrate this month: Infracost now supports **over 100 AWS and Google resources** and we have **over 100 people** in our [community Slack channel](https://www.infracost.io/community-chat).

You can [upgrade](/docs/#1-install-infracost) to the latest version (v0.8.6) to pickup the new features. If you are using v0.7 (or older) please follow the [v0.8 migration guide](/docs/guides/v0.8_migration).

### 📉 EC2 reserved instances

You can now do what-if anlaysis on AWS EC2 Reserved Instances (RI), as we have added support for these in the Infracost [usage file](/docs/features/usage_based_resources#infracost-usage-file). The RI type, term and payment option can be defined as shown below, to quickly get a monthly cost estimate. This works with `aws_instance` as well as `aws_eks_node_group` and `aws_autoscaling_group` as they also create EC2 instances. Let us know how you'd like Infracost to show the upfront costs by [creating a GitHub issue](https://github.com/infracost/infracost/issues/).

  ```yml
  aws_instance.my_instance:
    operating_system: linux # Override the operating system of the instance, can be: linux, windows, suse, rhel.
    reserved_instance_type: standard # Offering class for Reserved Instances. Can be: convertible, standard.
    reserved_instance_term: 1_year # Term for Reserved Instances. Can be: 1_year, 3_year.
    reserved_instance_payment_option: all_upfront # Payment option for Reserved Instances. Can be: no_upfront, partial_upfront, all_upfront.
  ```

### ♾️ Jenkins integration

Our new Jenkins integration enables you to save an HTML page for each pipeline build, which shows the Infracost diff output. Checkout [this demo](https://github.com/infracost/jenkins-demo) that uses Jenkins' Docker agent to run Infracost; the Jenkinsfile can be customized based on your requirements. The integration can also be used to fail a build if its cost estimate crosses a percentage threshold. This safety net is often used to ensure no one breaks the bank 😃

<img src={useBaseUrl("img/blog/apr-2021-update/jenkins.png")} width="80%" alt="Infracost Jenkins integration" />

### ⚙️ Customize output columns

The `infracost breakdown` and `infracost output` commands show the monthly quantity, units, and monthly cost of resources by default. You can now use the new `--fields` flag to customize the columns shown in the table output to include price and hourly cost, or you can set it to only show the monthly cost if you prefer a simplified view (shown below). The HTML output format is [being updated](https://github.com/infracost/infracost/pull/632) to support the same feature. The JSON output format will always include all fields.

  ```sh
  Name                                                  Monthly Cost

  aws_instance.web_app
  ├─ Instance usage (Linux/UNIX, on-demand, m5.4xlarge)      $560.64
  ├─ root_block_device
  │  └─ Storage (general purpose SSD, gp2)                     $5.00
  └─ ebs_block_device[0]
      ├─ Storage (provisioned IOPS SSD, io1)                 $125.00
      └─ Provisioned IOPS                                     $52.00
  ```

### * Array wildcards in usage file

The Infracost [usage file](/docs/features/usage_based_resources#infracost-usage-file) enables you to define resource usage estimates using their resource path, e.g. storage for `aws_dynamodb_table.my_table`. This can be cumbersome for resource arrays, such as AWS CloudWatch Log Groups, since you'd have to define the array items individually.

We've addressed this issue by supporting the wildcard character `[*]` for resource arrays. Infracost will apply the usage values individually to each element of the array (they all get the same values). If an array element (e.g. `this[0]`) and `[*]` are specified for a resource, only the array element's usage will be applied to that resource. This enables you to define default values using `[*]` and override specific elements using their index.

<Tabs
  defaultValue="old-way"
  values={[
    {label: 'Old way', value: 'old-way'},
    {label: 'New way: using array wildcard', value: 'new-way'}
  ]}>
  <TabItem value="old-way">

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
  <TabItem value="new-way">

  ```yml
  aws_cloudwatch_log_group.my_group[*]:
    storage_gb: 1000
    monthly_data_ingested_gb: 1000
    monthly_data_scanned_gb: 200
  ```
  </TabItem>
</Tabs>

### ⛅ New cloud resources

We added support for the following cloud resources:
- **AWS**: Redshift. The CPU-credit usage file params were improved for T2, T3 & T4 instances.
- **Google**: Google SQL and Container Registry.

Thanks for being part of the community! We are always looking forward to your feedback, so please create [GitHub issues here](https://github.com/infracost/infracost/issues/). We read every single one.

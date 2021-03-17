---
slug: infracost-diff
title: Cloud cost diffs
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh1
author_image_url: /img/avatars/ali.jpg
description: Like git diff but for cloud costs!
hide_table_of_contents: true
Date: "2021-03-17T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Recently we [released](/docs/#installation) a new `infracost diff` command inspired by `git diff`. This shows a diff of monthly cloud cost estimates between the current and planned state of Terraform projects. At a high-level this might seems like a simple exercise of subtracting the current state's cost estimate from the planned state, but cloud costs are rarely that simple to deal with. Let's take a look at the following screenshot to understand some of the nuances.

<img src={useBaseUrl("img/blog/infracost-diff/diff-screenshot.png")} alt="Infracost diff command" />

1. The `aws_instance` is being changed, which reduces the cost by $125/month (from $743 to $618).
2. AWS EC2 has **many** different cost components, so to explain what caused the above change, we also flag the sub-resource `ebs_block_device[0]` that changed (the first attached block device). Underneath it, we show the cost component that caused the actual cost diff, Provisioned IOPS SSD Storage (io1); i.e. reducing the size of that volume can save $1500/year. For those who have done this in production, they know it's not a one-click change as you need to create a new EBS volume and copy over the data. What Infracost enables you to do is to quickly tell how much such a change would save you, then decide if it's worth it.
3. A new `aws_lambda_function` is being added. Since we don't know how much it's going to be used, we can't show a cost estimate. But we can still show you the prices you'll be charged for: $0.20 per 1M requests and a tiny amount per GB-second. This is a [usage-based resource](/docs/usage_based_resources), so if you like you can create a yaml file to provide usage estimates and get a cost estimate. It's hard to think in GB-seconds, so we enable you to input the average request duration and we'll do the math to map that to GB-seconds based on the `memory_size` of your function and any rounding rules that AWS applies.
  ```yaml
  version: 0.1

  resource_usage:
    aws_lambda_function.hello_world:
      monthly_requests: 100000000 # Monthly number of requests.
      request_duration_ms: 250 # Average duration of each request in milliseconds.
  ```
4. Finally we show a summary at the bottom: the EC2 instance change reduces the cost by 17%, and you can use the above yaml file to do simple what-if analysis on the Lambda costs.

The new `infracost diff` command is used by our [CI/CD integrations](/docs/integrations/cicd) and as always, we look forward to your hearing your use-cases and [issues](https://github.com/infracost/infracost/issues).

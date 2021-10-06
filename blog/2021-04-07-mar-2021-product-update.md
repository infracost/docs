---
slug: mar-2021-product-update
title: 'March 2021: New diff command and usage file automation!'
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh
author_image_url: /img/avatars/ali.jpg
description: We shipped major new features - big thanks to the community! Upgrade to pickup the new features.
hide_table_of_contents: true
Date: "2021-04-07T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

March was busy as we added major new features and had Y Combinator's demo day, where [Hassan](https://twitter.com/hassankhosseini) (our CEO) delivered an awesome 60 second pitch on a Zoom call with hundreds of investors!

You can [**upgrade**](/docs/#1-install-infracost) to the latest version (v0.8.3) to pickup the new features. If you are using v0.7 (or older) please follow the [v0.8 migration guide](/docs/guides/v0.8_migration).

### 🗒️ See diffs in CLI

A highly requested feature was the ability to see the difference in cost between the current state and the planned state of Terraform projects in the CLI (we already have this feature in CI/CD integrations). Check it out by running `infracost diff --help`. We have also updated the CI output to make it easier to read.

<img src={useBaseUrl("img/blog/infracost-diff/diff-screenshot.png")} alt="Infracost diff command" />

### ⚙️ Automated usage-based resource definitions

Usage-based resources, such as AWS Lambda or Google Cloud Storage, require estimated usage data so Infracost can show costs in the output. You can define these in a YAML file, called a [usage file](/docs/usage_based_resources), and use that to get cost estimates for such resources.

Previously you had to create this file manually. You can now use the `--sync-usage-file` option to generate a new usage file or update an existing one from your Terraform project. This option is a **safe** sync: it adds any missing resources (with zeros for the usage estimates), it does not overwrite any lines that you have changed in the YAML, and it deletes any resources that are not used in the Terraform project.

  ```sh
  > infracost breakdown --sync-usage-file --usage-file infracost-usage.yml --path /code
  [...]
  > cat infracost-usage.yml

  version: 0.1
  resource_usage:
    aws_lambda_function.hi:
      monthly_requests: 0 # Monthly requests to the Lambda function.
      request_duration_ms: 0 # Avg duration of each request in milliseconds.
  ```

### 😃 Simplified inputs, outputs and config file

We like it when things are made easy:

- **Inputs**: a new `path` flag has been introduced to replace the various methods of running Infracost. You can now simply point Infracost to the path of a Terraform directory, plan binary file, or plan JSON file and it'll just work. This lays some of the groundwork for supporting other IaC tools in the future.
- **Outputs**: the dashes (-) in the output have been replaced with price descriptions such as `Cost depends on usage: $0.20 per 1M requests` so you can understand the pricing structure of usage-based resources such as AWS Lambda or Google Cloud Storage.
- **Config file**: the [config file](/docs/multi_project/config_file) has been updated to support infra-as-code repos that have multiple workspaces and projects. This enables you to combine projects into the same breakdown or diff output. So if a Terraform module or variable is used across workspaces/projects, you can quickly see the cost impact of changing it.

### 🚀 New Pull request comment options

We've updated the [CI/CD integrations](/docs/integrations/cicd) to add a new `post_condition` option so you can decide when you'd like cost comments to be shown in pull requests. Options include: always leave a cost comment, only comment when there is a change to the cost, or only comment when a percentage threshold has been reached (e.g. more than 5% increase or decrease in costs).

### ⛅ New cloud resources

We are working on adding Microsoft Azure to Infracost. This has two steps: the first is to add the prices to the Cloud Pricing API, then to add the resources to the CLI. We completed adding around 300,000 prices from Microsoft Azure to the Cloud Pricing API (step one), and now we're looking for volunteers to add resources to the CLI (step two) before the initial release. Please email [ali@infracost.io](mailto:ali@infracost.io) if you are an Azure user and would like to contribute (basic golang knowledge is required).

We also added support for the following cloud resources:
- **AWS**: Elastic File System (EFS), EBS GP3 volumes, DX Connection, Route53 Health checks, RDS Serverless
- **Google**: Memorystore Redis, Cloud Monitoring and Logging, Compute Images and Snapshots

Thanks for being part of the community! We are always looking forward to your [feedback](mailto:hello@infracost.io).

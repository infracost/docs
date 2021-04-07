---
slug: mar-2021-product-update
title: 'Mar 2021 update - new diff command and sync usage file!'
author: Ali Khajeh-Hosseini
author_url: https://twitter.com/alikhajeh
author_image_url: /img/avatars/ali.jpg
description: We shipped major new features - big thanks to the community contributors! Upgrade to pickup these goodies.
hide_table_of_contents: true
Date: "2021-04-07T00:00:00Z"
---

import useBaseUrl from '@docusaurus/useBaseUrl';

March was busy as we shipped major new features and had Y Combinator's demo day, where [Hassan](https://twitter.com/hassankhosseini) (our CEO) delivered an awesome 60 second pitch on a Zoom call with hundreds of investors!

You can [**upgrade**](/docs/#1-install-infracost) to the latest version (v0.8.3) to pickup the new features. Users who are using v0.7 (or older) should follow the [v0.8 migration guide](https://www.infracost.io/docs/guides/v0.8_migration/).

### 🗒️ New diff command

We released a new `infracost diff` command inspired by `git diff`. This shows a diff of monthly cloud cost estimates between the current and planned state of Terraform projects. This was requested by many users as we already provided similar functionality in our CI/CD integrations, but it wasn't available in the CLI, and the CI output could be confusing. We've addressed both issues by adding this new command.

<img src={useBaseUrl("img/blog/infracost-diff/diff-screenshot.png")} alt="Infracost diff command" />

### ⚙️ Sync usage file from Terraform project

Infracost enables you to define resource usage estimates in a YAML file (called the usage file) and use that to get cost estimates for resources such as AWS Lambda or Google Cloud Storage.

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

We like to make things easy for our users and customers:

- **Input**: a new `path` flag has been introduced to replace the various methods of running Infracost. You can now simply point Infracost to the path of a Terraform directory, plan binary file, or plan JSON file and it'll just work. This lays some of the groundwork for supporting other IaC tools in the future.
- **Output**: the dashes (-) have been replaced with price descriptions such as `Cost depends on usage: $0.20 per 1M requests` so you can understand the pricing structure of usage-based resources such as AWS Lambda or Google Cloud Storage.
- **Config file**: the config file has been updated to support infra-as-code repos that have multiple workspaces and projects. This command combines the projects into the same breakdown or diff output. So if a Terraform module or variable is used across workspaces/projects, you can quickly see the cost impact of changing it.

### 🚀 Pull request comments

We've updated the CI/CD integrations to add a new `post_condition` option so you can decide if pull request comments should always be posted, only on diffs, or on a percentage threshold.

### ⛅ New cloud resources

We completed adding around 300,000 prices from Microsoft Azure to the Cloud Pricing API (used by the CLI). Their pricing had quite a few quirks and twists. We're now looking for volunteers to add more resources before the initial release, please email ali@infracost.io if you are an Azure user and would like to contribute (basic golang knowledge is required).

We also shipped support for the following cloud resources:
- **AWS**: Elastic File System (EFS), EBS GP3 volumes, DX Connection, Route53 Health checks, RDS Serverless
- **Google**: Memorystore Redis, Cloud Monitoring and Logging, Compute Images and Snapshots

As always, looking forward to your feedback ([ali@infracost.io](mailto:ali@infracost.io)).

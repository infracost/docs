---
slug: /terragrunt
title: Terragrunt
---

There are currently two methods of using Infracost with Terragrunt:

1. For costs for a single Terragrunt directory you can run infracost with the `INFRACOST_TERRAFORM_BINARY` environment variable set to `terragrunt`. For example:
  ```sh
  INFRACOST_TERRAFORM_BINARY=terragrunt infracost --terraform-dir=/path/to/code
  ```

2. For aggregating costs across multiple Terragrunt directories, i.e. in cases where you would run terragrunt *-all, you can use the `infracost report` command to combine multiple Infracost JSON files into a single table. For an example of a script that does this see [scripts/terragrunt/report_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/report_all.sh).

For CI/CD integrations, our [Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the latest stable versions of terragrunt, see [this section](/docs/environment_variables#terraform_binary).

We'd love to hear feedback from Terragrunt users, specially ones who'd like to use Infracost in CI/CD pipelines. Please join our [community Slack channel](https://www.infracost.io/community-chat) or [create an issue](https://github.com/infracost/infracost/issues/new/choose) if there's anything we can help with.

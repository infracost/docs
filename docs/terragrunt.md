---
slug: /terragrunt
title: Terragrunt
---

There are currently two methods of using Infracost with Terragrunt:

1. For costs for a single Terragrunt directory you can run infracost with the `TERRAFORM_BINARY` environment variable set to `terragrunt`. For example:
    ```sh
    TERRAFORM_BINARY=terragrunt infracost --tfdir=/path/to/code
    ```

2. For aggregating costs across multiple Terragrunt directories, i.e. in cases where you would run terragrunt *-all, you can use the `infracost report` command to combine multiple Infracost JSON files into a single table. For an example of a script that does this see [scripts/terragrunt/report_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/report_all.sh).

If you have any feedback about the above methods, please leave on comment on [this GitHub issue](https://github.com/infracost/infracost/issues/224) or join our [community Slack channel](https://www.infracost.io/community-chat) to chat with us.


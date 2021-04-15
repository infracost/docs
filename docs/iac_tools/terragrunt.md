---
slug: terragrunt
title: Terragrunt
---

There are currently two methods of using Infracost with Terragrunt:

1. For costs for a single Terragrunt directory you can run Infracost with the `INFRACOST_TERRAFORM_BINARY` environment variable set to `terragrunt` as shown below. This can also be set in an Infracost [config file](/docs/multi_project/config_file).

    ```shell
    INFRACOST_TERRAFORM_BINARY=terragrunt infracost breakdown --path /path/to/code
    ```

2. For aggregating costs across multiple Terragrunt directories, i.e. in cases where you would run `terragrunt *-all`, you can use the `infracost output` command to combine multiple Infracost JSON files into different formats. Use and customize the following scripts for this:
    - to run `infracost breakdown`: [breakdown_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/breakdown_all.sh)
    - to run `infracost diff`: [diff_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/breakdown_all.sh)

For [CI/CD integrations](/docs/integrations/cicd), the [infracost/infracost Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the latest stable versions of Terragrunt, see [this section](/docs/integrations/environment_variables#terraform_binary).

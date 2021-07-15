---
slug: terragrunt
title: Terragrunt
---

The simplest way to run Infracost against Terragrunt projects is to:

1. Create/commit an Infracost [config file](/docs/multi_project/config_file), called `infracost.yaml`, at the root of the Terragrunt project with the paths of the individual Terragrunt directories. A path can be repeated multiple times with different parameters as shown in the following example. The `terraform_binary` parameter must be set to the path of your Terragrunt binary (`terragrunt` should work for the majority of cases).

  ```yaml
  version: 0.1

  projects:
    - path: my/module1
      terraform_binary: terragrunt
      terraform_plan_flags: -var-file=prod.tfvars -var-file=us-east.tfvars
    
    - path: my/module1
      terraform_binary: terragrunt
      terraform_plan_flags: -var-file=dev.tfvars
    
    - path: my/module2
      terraform_binary: terragrunt
  ```

2. Run `breakdown` or `diff` using `infracost breakdown --config-file infracost.yaml`.

Config files can also be used with [CI/CD integrations](/docs/integrations/cicd). The [infracost/infracost Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the latest stable versions of Terragrunt, see [this section](/docs/integrations/environment_variables#infracost_terraform_binary) for values you can use in CI/CD. The `terraform_binary` config file parameter is the same as setting the `INFRACOST_TERRAFORM_BINARY` environment variable. This environment variable can also be set in your local environment's Bash/Zsh profiles if you always use Infracost with Terragrunt.

If there are **too many** Terragrunt directories to list in the config file, i.e. in cases where you would run `terragrunt *-all`, you can use the `infracost output` command to combine multiple Infracost JSON files into one output format. Use and customize the following scripts for this. These scripts do not work with our default CI/CD integrations. We recommend you subscribe/comment on [this GitHub issue](https://github.com/infracost/infracost/issues/807); we plan investigate how we can support Terragrunt projects natively so the paths do not need to be provided in advance.
  - to run `infracost breakdown`: [breakdown_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/breakdown_all.sh)
  - to run `infracost diff`: [diff_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/breakdown_all.sh)

---
slug: advanced_usage
title: Advanced usage
---

The following advanced usage methods can be used in addition to the usage methods mentioned in the [Getting started](/docs/#usage) page. These methods can also be used via an Infracost [config file](/docs/multi_project/config_file).

## Terraform plan file

Infracost can be run against a Terraform plan file. This implies that you have already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud credentials or `--terraform-plan-flags` to be set.

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary

  infracost breakdown --path tfplan.binary

  infracost diff --path tfplan.binary
  ```

## Use Terraform state

The `infracost breakdown` command has a `--terraform-use-state` flag that is useful if you want to see the cost breakdown of the current Terraform state. This implies that you have already run Terraform `apply`, thus Infracost just runs Terraform `show`, which does not require cloud credentials or `--terraform-plan-flags` to be set.

  ```shell
  infracost breakdown --path examples/terraform --terraform-use-state
  ```

## Terraform state JSON file

The `infracost breakdown` command can be run against a Terraform state JSON file. This is useful if you want to see the cost breakdown of the current Terraform state. This implies that you have already run Terraform `apply`, thus no cloud creds or `--terraform-plan-flags` is needed.

  ```shell
  cd path/to/code
  terraform show -json > tfstate.json

  infracost breakdown --path tfstate.json
  ```

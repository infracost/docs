---
slug: advanced_usage
title: Advanced usage
---

The following advanced usage methods can be used in addition to the usage methods mentioned in the [Getting started](/docs/#usage) page.

## Cost breakdown of Terraform state

The `infracost breakdown` command has a `--terraform-use-state` flag that is useful if you want to see the cost breakdown of the current Terraform state. This implies that you have already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds or `--terraform-plan-flags` to be set.

  ```shell
  terraform init

  infracost breakdown --path examples/terraform --terraform-use-state
  ```

## Terraform plan file

Infracost can be run against a Terraform plan file. This implies that you have already run Terraform `init`, thus Infracost just runs Terraform `show`, which does not require cloud creds or `--terraform-plan-flags` to be set.

  ```shell
  cd path/to/code
  terraform init
  terraform plan -out tfplan.binary .

  infracost --path path/to/tfplan.binary
  ```

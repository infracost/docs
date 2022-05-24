---
slug: terraform_modules
title: Terraform modules
---

Infracost cost estimates include any modules that are used by your Terraform or Terragrunt projects.

You can run `infracost breakdown --path modules/my-module-a` to get a cost estimate for for an individual module. Module variables can be passed-in using the `--terraform-var-file` or `terraform-var` flags.

To get a combined cost estimates from multiple modules, create a [config-file](/docs/features/config_file/) as follows and run `infracost breakdown --config-file infracost.yml`:
```yaml
version: 0.1

projects:
  - path: my-s3-module
    terraform_var_files:
      - my-s3.tfvars
      - us-east.tfvars

  - path: my-ec2-module
    terraform_var_files:
      - my-ec2.tfvars
```

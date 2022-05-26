---
slug: terraform_modules
title: Terraform modules
---

Infracost cost estimates include any modules that are used by your Terraform or Terragrunt projects.

Usually no extra setup is needed for handling private modules since Infracost downloads these using the same method that Terraform does. That means the same version control credentials (e.g. for github) are used by Infracost to download private modules. You can follow [Terraform's docs](https://www.terraform.io/language/modules/sources) for more information.

In CI/CD integrations, you can an environment variable or secret with your private key so Infracost access private repositories (similar to how Terraform/Terragrunt does):
  ```shell
  mkdir -p .ssh
  echo "$GIT_SSH_KEY" > .ssh/git_ssh_key
  chmod 400 .ssh/git_ssh_key
  export GIT_SSH_COMMAND="ssh -i $(pwd)/.ssh/git_ssh_key -o 'StrictHostKeyChecking=no'"

  # Run Infracost commands as usual
  infracost breakdown --path /code
  ```

### Cost of individual modules

You can run `infracost breakdown --path modules/my-module-a` to get a cost estimate for for an individual module. Module variables can be passed-in using the `--terraform-var-file` or `terraform-var` flags.

### Cost of multiple modules

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

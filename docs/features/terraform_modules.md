---
slug: terraform_modules
title: Terraform modules
---

Infracost cost estimates include any modules that are used by your Terraform or Terragrunt projects.

## Individual modules

You can run `infracost breakdown --path modules/my-module` to get a cost estimate for for an individual module. Module variables can be passed-in using the `--terraform-var-file` or `terraform-var` flags.

## Multiple modules

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

## Private modules

### Terraform directory

When Infracost is used with a [Terraform directory](/docs/features/cli_commands/#option-1-terraform-directory), the CLI supports Git modules and [Terraform Registry modules](https://www.terraform.io/language/modules/sources#terraform-registry).

#### Git modules

Usually no extra setup is needed for handling private git modules since Infracost downloads these using the same method that Terraform does. That means the same version control credentials (e.g. SSH keys for Github) are used by Infracost to download private modules. You can follow [Terraform's docs](https://www.terraform.io/language/modules/sources) for more information.

In CI/CD integrations, you can an environment variable or secret with your private key so Infracost access private repositories (similar to how Terraform/Terragrunt does):
  ```shell
  mkdir -p ~/.ssh
  eval `ssh-add -s`
  echo "$GIT_SSH_KEY" | tr -d '\r' | ssh-add -
  # Update this to github.com, gitlab.com, bitbucket.org, ssh.dev.azure.com or your source control server's domain
  ssh-keyscan github.com >> ~/.ssh/known_hosts

  # Run Infracost commands as usual
  infracost breakdown --path /code
  ```

#### Terraform Registry modules

You can follow either of the following steps so the Infracost CLI can download your private Terraform registry modules:
1. In CI/CD integrations: set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html). `INFRACOST_TERRAFORM_CLOUD_HOST` can also be set for Terraform Enterprise users (e.g. to avoid using app.terraform.io). These environment variables can also be set in the [config file](/docs/features/config_file).
2. In local dev machines: set the [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file. This is more suitable for local dev machines.

### Terraform plan JSON

When Infracost is used with a [Terraform plan JSON](/docs/features/cli_commands/#option-2-terraform-plan-json), the Terraform CLI has already downloaded/processed modules so no extra setup is needed in Infracost.

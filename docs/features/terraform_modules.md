---
slug: terraform_modules
title: Terraform modules
---

Infracost include any modules that are used by your Terraform or Terragrunt projects. Public modules are automatically downloaded; but you need to setup access for private modules so Infracost can process them.

## Private modules

### Git modules

Usually no extra setup is needed for handling private git modules since Infracost downloads these using the same method that Terraform does. That means the same version control credentials (e.g. SSH keys for Github) are used by Infracost to download private modules. You can follow [Terraform's docs](https://www.terraform.io/language/modules/sources) for more information.

In CI/CD integrations, you can an environment variable or secret with your private key so Infracost can access private repositories (similar to how Terraform/Terragrunt does):
  ```shell
  mkdir -p ~/.ssh
  eval `ssh-add -s`
  echo "$GIT_SSH_KEY" | tr -d '\r' | ssh-add -
  # Update this to github.com, gitlab.com, bitbucket.org, ssh.dev.azure.com or your source control server's domain
  ssh-keyscan github.com >> ~/.ssh/known_hosts

  # Run Infracost commands as usual
  infracost breakdown --path /code
  ```

If your SSH key has a passphrase, you can also add an environment variable or secret with your passphrase:
  ```shell
  mkdir -p ~/.ssh
  eval `ssh-add -s`
  echo '#!/bin/sh'> ~/.ssh_askpass
  echo "echo $GIT_SSH_KEY_PASSPHRASE" >> ~/.ssh_askpass && chmod +x ~/.ssh_askpass
  echo "$GIT_SSH_KEY" | tr -d '\r' | DISPLAY=None SSH_ASKPASS=~/.ssh_askpass ssh-add -
  # Update this to github.com, gitlab.com, bitbucket.org, ssh.dev.azure.com or your source control server's domain
  ssh-keyscan github.com >> ~/.ssh/known_hosts

  # Run Infracost commands as usual
  infracost breakdown --path /code
  ```

### Registry modules

Using environment variables, which is more suitable for CI/CD systems:
* **Public Terraform Cloud registry modules:** these are automatically supported so no extra setup is needed in Infracost.
* **Private Terraform Cloud registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
* **Private Terraform Enterprise registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to your TFE hostname and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
* **Private GitLab registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to `gitlab.com` (or your GitLab hostname) and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to your [GitLab token](https://docs.gitlab.com/ee/user/packages/terraform_module_registry/#authenticate-to-the-terraform-module-registry)
* **Other private registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to the hostname of the registry and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to the access token for that registry.
* **Modules from multiple private registries:** use the Terraform CLI config file option below.

Using the Terraform CLI config file, which is more suitable for local dev environments: by default Infracost reads registry credentials from your `~/.terraform.d/credentials.tfrc.json` file or the path specified by the  [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) environment variable. If you're using a custom Terraform CLI config file to specify the credentials make sure you are setting the `TF_CLI_CONFIG_FILE` environment variable to the absolute path of that file.

### S3 modules

If you store your private modules in an S3 bucket, you need to provide readonly AWS IAM credentials so the CLI can download them and estimate their costs. You can do this using the usual `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables, and the following policy for your S3 bucket:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowObjectDownload",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject"
            ],
            "Resource": [
              "arn:aws:s3:::BUCKET_NAME",
              "arn:aws:s3:::BUCKET_NAME/*"
          ]
        }
    ]
}
```

## Running Infracost in module repos

You can run `infracost breakdown --path modules/my-module` to get a cost estimate for an individual module. Module variables can be passed-in using the `--terraform-var-file` or `terraform-var` flags.

To get a combined cost estimate from multiple modules, create a [config-file](/docs/features/config_file/) as follows and run `infracost breakdown --config-file infracost.yml`:
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

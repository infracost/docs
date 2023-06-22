---
slug: terraform_modules
title: Terraform modules
---

Infracost include any modules that are used by your Terraform or Terragrunt projects. Public modules are automatically downloaded; but you need to setup access for private modules so Infracost can process them.

## Private modules

### Git SSH modules

Infracost downloads private git SSH modules using SSH keys (same as Terraform/Terragrunt). Infracost GitHub App users can provide the SSH key in Infracost Cloud. Other CI/CD users can set an environment variable or secret with their private SSH key. The `GIT_SSH_KEY` secret variable usually starts with `-----BEGIN RSA PRIVATE KEY-----`.

  ```shell
  mkdir -p ~/.ssh
  eval `ssh-add -s`
  echo "$GIT_SSH_KEY" | tr -d '\r' | ssh-add -
  # Update this to github.com, gitlab.com, bitbucket.org, ssh.dev.azure.com or your source control server's domain
  ssh-keyscan github.com >> ~/.ssh/known_hosts

  # Run Infracost commands as usual
  infracost breakdown --path /code
  ```

If your SSH key has a passphrase too, you can also add an environment variable or secret with your passphrase:
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

### Git HTTPS modules

#### Option 1: use SSH instead of HTTPS
We suggest tweaking your Terraform code to download modules using [SSH instead of HTTPS](https://developer.hashicorp.com/terraform/language/modules/sources#github). This is usually a 1-line change, and it should be safe as you are just telling Terraform/Infracost to download the module differently (but obviously test it). Here's an example of an HTTPS module being used:

```terraform
# HTTPS module being used
module "my-module" {
  source  = "github.com/my-org/my-terraform-private-module?ref=v1.2.3"
  ...
```

As shown below, if you change the `source` to `git@github.com:my-org/terraform-private-module.git` then SSH will be used to download the module, thus HTTPS credentials will not be necessary. The format is `git@github.com:MY-ORG/MY-MODULE-REPO.git`, check the [Terraform docs](https://developer.hashicorp.com/terraform/language/modules/sources#github) for more details.

```terraform
# Switch the above to use SSH
module "my-module" {
  source  = "git@github.com:my-org/terraform-private-module.git"
  ref = "v1.2.3"
  ...
```

#### Option 2: Provide HTTPS credentials

If you cannot use Option 1, you need to provide HTTPS credentials that can be used to download the private module repos. Infracost GitHub App users can provide these in Infracost Cloud. 

Other CI/CD users can add their HTTPS credentials into the `~/.git-credentials` file.
```bash
echo "https://git:MY-PASSWORD@github.com" >> ~/.git-credentials
```

This tells `git` to download HTTPS repos using the provided credentials (used by Terraform and Infracost internally).

### Registry modules

Public registry modules are automatically supported so no extra setup is needed in Infracost. For private registry modules, Infracost GitHub App users can provide their registry host and token in Infracost Cloud. Other CI/CD users need to set the following environment variables:

* **Private Terraform Cloud registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
* **Private Terraform Enterprise registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to your TFE hostname and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
* **Private GitLab registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to `gitlab.com` (or your GitLab hostname) and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to your [GitLab token](https://docs.gitlab.com/ee/user/packages/terraform_module_registry/#authenticate-to-the-terraform-module-registry).
* **Private JFrog registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to your JFrog hostname and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to your [identity token](https://www.jfrog.com/confluence/display/JFROG/Terraform+Registry#TerraformRegistry-manual-configurationManuallyGeneratinganIdentityToken).
* **Other private registry modules:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to the hostname of the registry and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to the access token for that registry.
* **Modules from multiple private registries:** use the Terraform CLI config file option below.

For local development environments, use the Terraform CLI config file: by default Infracost reads registry credentials from your `~/.terraform.d/credentials.tfrc.json` file or the path specified by the  [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) environment variable. If you're using a custom Terraform CLI config file to specify the credentials make sure you are setting the `TF_CLI_CONFIG_FILE` environment variable to the absolute path of that file.

### S3 modules

If you store your private modules in an S3 bucket, you need to provide readonly AWS IAM credentials so the CLI can download them and estimate their costs. You can do this using the usual `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables, and the following policy for your S3 bucket. Infracost Github App users can define these environment variables in the Org Settings > Integrations > GitHub App > Next page.

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

## Source map

The `INFRACOST_TERRAFORM_SOURCE_MAP` environment variable accepts a comma separated list of `source=dest` pairs, and replaces any matched source URL value found in Terraform `module` or Terragrunt `terraform` blocks. This is useful when you have module URLs that are referenced in your infra-as-code repos one way (e.g. using a private URL), but they should use a different URL when Infracost runs them (e.g. using a public URL).

This works similarly to the [`TERRAGRUNT_SOURCE_MAP` environment variable](https://terragrunt.gruntwork.io/docs/reference/cli-options/#terragrunt-source-map).

For example, to map remote git modules to local module specify:
```
INFRACOST_TERRAFORM_SOURCE_MAP=git::https://github.com/my-org/my-first-module.git=./local/my-first-module,git::https://github.com/my-org/my-second-module.git=./local/my-second-module
```

To map remote git SSH modules to git HTTPS modules specify:
```
INFRACOST_TERRAFORM_SOURCE_MAP=git::ssh://github.com/my-org/my-first-module.git=git::https://github.com/my-org/my-first-module.git,git::ssh://github.com/my-org/my-second-module.git=git::https://github.com/my-org/my-second-module.git
```

When replacing sources using the source map, any entry with a matching `?ref=<version>` takes precedence. If that is not found then it falls back any entry without a `?ref=<version>` specified.

For example, given this source map:
```
INFRACOST_TERRAFORM_SOURCE_MAP=git::https://github.com/my-org/my-module?ref=v1.0.0=./local/my-module-A,git::https://github.com/my-org/my-module=./local/my-module-B
```

The sources will be mapped as follows:

| Source specified in Terraform                         | Mapped source         |
|-------------------------------------------------------|-----------------------|
| `git::https://github.com/my-org/my-module?ref=v1.0.0` | `./local/my-module-A` |
| `git::https://github.com/my-org/my-module?ref=v2.0.0` | `./local/my-module-B` |
| `git::https://github.com/my-org/my-module`            | `./local/my-module-B` |


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

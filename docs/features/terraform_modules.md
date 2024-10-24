---
slug: terraform_modules
title: Terraform modules
---

Infracost processes any modules that are used by your Terraform or Terragrunt projects. Public modules are automatically downloaded; but for private modules, you need to setup access so Infracost can process them.

## Private modules access

See the following two sections for separate instructions on how to setup private module access for source control and CI/CD integrations.

### Source control integrations

If you use the Infracost [GitHub](/docs/integrations/github_app/), [GitLab App](/docs/integrations/gitlab_app/) or [Azure Repos App](/docs/integrations/azure_repos_app/), go to [Infracost Cloud](https://dashboard.infracost.io/) > Settings > Org Settings > Integrations, and click on the GitHub, GitLab or Azure Repos App organization that has the repos with private module access errors. Click on Next to go to the Run configurations page then:

For **git modules**, ensure that the Infracost App has access to the module repos, no further action is needed as Infracost will automatically use that access to process the modules.

For **registry modules**, enter the following information:

* **Terraform Cloud:** set the host to `app.terraform.io` and the token to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) (these tokens do not have permission to read variables marked as Sensitive).
* **Terraform Enterprise:** set the host to your Terraform Enterprise hostname and the token to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) (these tokens do not have permission to read variables marked as Sensitive).
* **GitLab:** set the host to `gitlab.com` (or your GitLab hostname) and the token to your [GitLab token](https://docs.gitlab.com/ee/user/packages/terraform_module_registry/#authenticate-to-the-terraform-module-registry).
* **JFrog:** set the host to your JFrog hostname and the token to an [identity token](https://www.jfrog.com/confluence/display/JFROG/Terraform+Registry#TerraformRegistry-manual-configurationManuallyGeneratinganIdentityToken).
* **Spacelift**: See our dedicated [Spacelift integration](/docs/integrations/spacelift) page for instructions. 
* **Other registries:** set the host to the hostname of the registry and the token to the access token for that registry.
* **Modules from multiple registries:** this could be supported by using the [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) environment variable; contact [hello@infracost.io](mailto:hello@infracost.io) so we can assist you.

For S3 modules, set the [required environment variables](/docs/features/terraform_modules/#s3-modules) in the "Additional environment variables" section of the Run configurations page.

### CI/CD integrations

If you use the Infracost [CI/CD integrations](/docs/integrations/cicd/#cicd-integrations), follow the instructions below to set the required environment variables.

#### Git SSH modules

Infracost downloads private git SSH modules using SSH keys (same as Terraform/Terragrunt). Set an environment variable or secret, such as `GIT_SSH_KEY`, with your private SSH key then use the following code snippets to add it to the SSH agent in your CI/CD runner. The secret variable usually starts with `-----BEGIN RSA PRIVATE KEY-----`.

  ```shell
  mkdir -p ~/.ssh
  eval `ssh-agent -s`
  echo "$GIT_SSH_KEY" | tr -d '\r' | ssh-add -
  # Update this to github.com, gitlab.com, bitbucket.org, ssh.dev.azure.com or your source control server's domain
  ssh-keyscan github.com >> ~/.ssh/known_hosts

  # Run Infracost commands in CI/CD as usual
  infracost breakdown --path /code
  ```

If your SSH key has a passphrase too, you can also add an environment variable or secret with your passphrase:
  ```shell
  mkdir -p ~/.ssh
  eval `ssh-agent -s`
  echo '#!/bin/sh'> ~/.ssh_askpass
  echo "echo $GIT_SSH_KEY_PASSPHRASE" >> ~/.ssh_askpass && chmod +x ~/.ssh_askpass
  echo "$GIT_SSH_KEY" | tr -d '\r' | DISPLAY=None SSH_ASKPASS=~/.ssh_askpass ssh-add -
  # Update this to github.com, gitlab.com, bitbucket.org, ssh.dev.azure.com or your source control server's domain
  ssh-keyscan github.com >> ~/.ssh/known_hosts

  # Run Infracost commands in CI/CD as usual
  infracost breakdown --path /code
  ```

#### Git HTTPS modules

##### Option 1: use SSH instead of HTTPS
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

##### Option 2: Provide HTTPS credentials

If you cannot use Option 1, you need to add HTTPS credentials that can be used to download the private module repos into the `~/.git-credentials` file
  ```bash
  echo "https://git:MY-PASSWORD@github.com" >> ~/.git-credentials
  ```

This tells `git` to download HTTPS repos using the provided credentials (used by Terraform and Infracost internally).

#### Registry modules

Set the following environment variables in your CI/CD pipeline:

* **Terraform Cloud:** set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) (these tokens do not have permission to read variables marked as Sensitive).
* **Terraform Enterprise:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to your Terraform Enterprise hostname and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html) (these tokens do not have permission to read variables marked as Sensitive).
* **GitLab:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to `gitlab.com` (or your GitLab hostname) and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to your [GitLab token](https://docs.gitlab.com/ee/user/packages/terraform_module_registry/#authenticate-to-the-terraform-module-registry).
* **JFrog:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to your JFrog hostname and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to your [identity token](https://www.jfrog.com/confluence/display/JFROG/Terraform+Registry#TerraformRegistry-manual-configurationManuallyGeneratinganIdentityToken).
* **Spacelift**: See our dedicated [Spacelift integration](/docs/integrations/spacelift) page for instructions.
* **Other registries:** set the `INFRACOST_TERRAFORM_CLOUD_HOST` environment variable to the hostname of the registry and `INFRACOST_TERRAFORM_CLOUD_TOKEN` to the access token for that registry.
* **Modules from multiple registries:** this could be supported by using the [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) environment variable; contact [hello@infracost.io](mailto:hello@infracost.io) so we can assist you.

#### S3 modules

If you store your private modules in an S3 bucket, you need to provide readonly AWS IAM credentials so the CLI can download them and estimate their costs. You can do this using the usual `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables, and the following policy for your S3 bucket.

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

For Terragrunt `terraform` blocks, this has the exact same functionality as the [`TERRAGRUNT_SOURCE_MAP` environment variable](https://terragrunt.gruntwork.io/docs/reference/cli-options/#terragrunt-source-map).

For `module` blocks in Terraform, the functionality is similar but supports matching on prefixes as well as the full source URL.

For example, to map remote git modules to local module specify:
```
INFRACOST_TERRAFORM_SOURCE_MAP=git::https://github.com/my-org/my-first-module.git=./local/my-first-module,git::https://github.com/my-org/my-second-module.git=./local/my-second-module
```

To map a single remote git SSH modules to a git HTTPS module specify:
```
INFRACOST_TERRAFORM_SOURCE_MAP=git::ssh://github.com/my-org/my-first-module.git=git::https://github.com/my-org/my-first-module.git,git::ssh://github.com/my-org/my-second-module.git=git::https://github.com/my-org/my-second-module.git
```

To map all git SSH modules to git HTTPS modules for a single GitHub org, you can specify a prefix to match:
```
INFRACOST_TERRAFORM_SOURCE_MAP=git::ssh://github.com/my-org/=git::https://github.com/my-org/
```

:::note
This only works for module URLs, not Terragrunt `terraform` blocks.
:::

When replacing module sources using the source map, the most specific match takes precedence.

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

For local development environments, use the Terraform CLI config file: by default Infracost reads registry credentials from your `~/.terraform.d/credentials.tfrc.json` file or the path specified by the [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) environment variable. If you're using a custom Terraform CLI config file to specify the credentials make sure you are setting the `TF_CLI_CONFIG_FILE` environment variable to the absolute path of that file.

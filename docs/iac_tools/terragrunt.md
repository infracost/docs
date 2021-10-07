---
slug: terragrunt
title: Terragrunt
---

As of Infracost CLI v0.9.7, Terragrunt projects are automatically detected when passed in via the `--path` flag:

```shell
# Show breakdown of costs
infracost breakdown --path=path/to/terragrunt/code

# Show diff of costs
infracost diff --path=path/to/terragrunt/code
```

## Usage

### Terragrunt CLI Options

Standard Terragrunt [CLI options](https://terragrunt.gruntwork.io/docs/reference/cli-options/#cli-options) such as `TERRAGRUNT_PARALLELISM` can be passed as environment variables such as:

```shell
TERRAGRUNT_PARALLELISM=4 infracost breakdown --path=path/to/terragrunt/code
```

### Usage file

If your Terragrunt project has multiple modules and you want to specify different usage files for each module, you will need to add each Terragrunt subdirectory and usage file to the Infracost [config file](/docs/multi_project/config_file#examples).

If you have any feedback about how we should support multiple usage files with Terragrunt in the future, please [comment on or follow this issue](https://github.com/infracost/infracost/issues/934).

### CI/CD

The [infracost/infracost Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the [latest stable version](/docs/integrations/environment_variables#cicd-integrations) of Terragrunt.

By default, that Dockerfile uses Terraform 0.15.5, but you can set the environment variable `TERRAGRUNT_TFPATH` to any of the [supported versions](/docs/integrations/environment_variables#cicd-integrations) so Terragrunt uses that version, e.g. `TERRAGRUNT_TFPATH=terraform_1.0`.

## How the Terragrunt integration works

1. Infracost detects a Terragrunt project by checking for a Terragrunt config file in the specified path, which will be `terragunt.hcl`, `terragrunt.hcl.json` or the value of the `TERRAGRUNT_CONFIG` environment variable. If Infracost does not detect your project as a Terragrunt project, make sure this file exists in the specified path or in any of the subdirectories with a depth less than 5.
2. If Terragrunt is detected Infracost runs `terragrunt run-all plan -out <tmpfile>` against the directory to generate plan files for **all** projects. We use the `--terragrunt-ignore-external-dependencies` flag to limit the cost estimate to only include infrastructure defined in the current directory.
3. Infracost loops through all the Terragrunt modules and runs `terragrunt show <tmpfile>` for each. This currently does not use the `terragrunt run-all` functionality since it's not possible to match the output from that to a specific module.
4. Infracost outputs a diff or breakdown for each Terragrunt module.

## Migrating from pre v0.9.7 Infracost CLI

Pre v0.9.7 Infracost did not have native support for Terragrunt. Old configurations will still work, but can now be simplified.

* You no longer need to set `INFRACOST_TERRAFORM_BINARY` to `terragrunt` unless you are using a non-standard binary path.
* You no longer need to specify multiple Terragrunt modules in your Infracost [config file](/docs/multi_project/config_file), unless you want to specify per-project usage. Infracost will now detect all the Terragrunt modules that exist under the specified `--path`.
* The Terragrunt [breakdown_all.sh](https://github.com/infracost/infracost/blob/v0.9.6/scripts/terragrunt/breakdown_all.sh) and [diff_all.sh](https://github.com/infracost/infracost/blob/v0.9.6/scripts/terragrunt/diff_all.sh) will be deprecated and will no longer be maintained. The functionality provided by these is now supported within the Infracost binary.

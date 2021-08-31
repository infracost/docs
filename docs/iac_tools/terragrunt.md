---
slug: terragrunt
title: Terragrunt
---

As of v0.9.7 Infracost automatically detects if the specified `--path` is a Terragrunt project. To use with Terragrunt simply run:

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

If your Terragrunt project has multiple modules, you can specify per-module usages using the [`projects` array in the usage file](/docs/usage_based_resources#multi-project-setups).

### CI/CD

The [infracost/infracost Docker image](https://hub.docker.com/repository/docker/infracost/infracost) ([Dockerfile](https://github.com/infracost/infracost/blob/master/Dockerfile)) has the latest stable version of Terragrunt.

## Migrating from older versions of Infracost (pre v0.9.7)

Pre v0.9.7 Infracost did not have native support for Terragrunt. Old configurations will still work, but can now be simplified.

* You no longer need to set `INFRACOST_TERRAFORM_BINARY` to `terragrunt` unless you are using a non-standard binary path.
* You no longer need to specify multiple Terragrunt modules in your Infracost [config file](/docs/multi_project/config_file). Infracost will now detect all the Terragrunt modules that exist under the specified `--path`.
* The Terragrunt [breakdown_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/breakdown_all.sh) and [diff_all.sh](https://github.com/infracost/infracost/blob/master/scripts/terragrunt/diff_all.sh) will be deprecated and will no longer be maintained. The functionality provided by these is now supported within the Infracost binary.

## How the Terragrunt integration works

1. Infracost detects a Terragrunt project by running `terragrunt run-all terragrunt-info` which lists any Terragrunt modules in the current directory. Infracost maps each Terragrunt module to an Infracost project.
2. If Terragrunt is detected Infracost runs `terragrunt run-all plan -out <tmpfile>` against the directory to generate plan files for all projects.
3. Infracost loops through all the Terragrunt modules and runs `terragrunt show <tmpfile>` for each. This currently does not use the `terragrunt run-all` functionality since it's not possible to match the output from that to a specific module.
4. Infracost outputs a diff or breakdown for each Terragrunt module.

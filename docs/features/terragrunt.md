---
slug: terragrunt
title: Terragrunt
---

The Infracost `breakdown` and `diff` commands automatically detect Terragrunt projects, though we generally recommend setting up a [config file](/docs/features/config_file/) for Terragrunt repos.

```shell
infracost breakdown --path=path/to/terragrunt/repo
```

The `--exclude-path` flag can be used to exclude any directories/modules that should not be run, for example:

```shell
infracost breakdown --path=. --exclude-path=dev --exclude-path=test
```

## Usage file

If your Terragrunt project has multiple modules and you want to specify different usage files for each module, you will need to add each Terragrunt subdirectory and [usage file](/docs/features/usage_based_resources/) to the Infracost config file, see an [example here](/docs/features/config_file#examples).

If you have any feedback about how we should support multiple usage files with Terragrunt in the future, please [comment on or follow this issue](https://github.com/infracost/infracost/issues/934).

## Source map

The `INFRACOST_TERRAFORM_SOURCE_MAP` environment variable is useful when you want to replace module URLs used by Infracost (e.g. replace private URLs with public ones). See [this docs section](/docs/features/terraform_modules/#source-map) for more details.

## How the Terragrunt integration works

With v0.10, when the CLI's `--path` flag points to a Terragrunt directory:

1. Infracost detects a Terragrunt project by checking for a Terragrunt config file in the specified path, which will be `terragrunt.hcl`, `terragrunt.hcl.json` or the value of the `TERRAGRUNT_CONFIG` environment variable. If Infracost does not detect your project as a Terragrunt project, make sure this file exists in the specified path or in any of the subdirectories with a depth less than 5.

2. If Terragrunt is detected, Infracost downloads any required source files to an `.infracost` cache, detects Terragrunt defined inputs, then parses HCL directly.

3. Infracost outputs a diff or breakdown for each Terragrunt module.

---
slug: terragrunt
title: Terragrunt
---

Terragrunt projects are automatically detected when passed in via the `--path` flag:

```shell
# Show breakdown of costs
infracost breakdown --path=path/to/terragrunt/code

# Show diff of costs
infracost diff --path=path/to/terragrunt/code
```

## Known issues

The following known issues exist with Terragrunt and Infracost **v0.10**:

1. If the CLI crashes when used with Terragrunt, please see [this GitHub issue](https://github.com/infracost/infracost/issues/1695) for a workaround.
2. The `INFRACOST_TERRAGRUNT_FLAGS` environment variable is no longer supported as Infracost parses HCL code directly. Subscribe to [this issue](https://github.com/infracost/infracost/issues/1682) for updates.
3. HCL parsing does not work with modules that have a `source` in a private Terraform registry. Subscribe to [this issue](https://github.com/infracost/infracost/issues/1667) for updates.

We'd like to fix these issues in upcoming releases. To unblock yourself until then, you can either:
- Use the workaround in [this GitHub issue](https://github.com/infracost/infracost/issues/1695).
- [Generate plan JSON files](/docs/troubleshooting/#terragrunt) and pass those to Infracost to get a cost estimate.

## Usage file

If your Terragrunt project has multiple modules and you want to specify different usage files for each module, you will need to add each Terragrunt subdirectory and [usage file](/docs/features/usage_based_resources/) to the Infracost config file, see an [example here](/docs/features/config_file#examples).

If you have any feedback about how we should support multiple usage files with Terragrunt in the future, please [comment on or follow this issue](https://github.com/infracost/infracost/issues/934).

## How the Terragrunt integration works

With v0.10, when the CLI's `--path` flag points to a Terragrunt directory:
1. Infracost detects a Terragrunt project by checking for a Terragrunt config file in the specified path, which will be `terragunt.hcl`, `terragrunt.hcl.json` or the value of the `TERRAGRUNT_CONFIG` environment variable. If Infracost does not detect your project as a Terragrunt project, make sure this file exists in the specified path or in any of the subdirectories with a depth less than 5.

2. If Terragrunt is detected, Infracost downloads any required source files to an `.infracost` cache, detects Terragrunt defined inputs, then parses HCL directly.

3. Infracost outputs a diff or breakdown for each Terragrunt module.

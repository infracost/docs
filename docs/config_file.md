---
slug: /config_file
title: Multi-project config
---

We recommend that you create an `infracost.yml` file in each of your terraform project repos using [this example](https://github.com/infracost/infracost/blob/master/infracost-example.yml). This file can be passed to Infracost using the `--config-file` option. This flag should not be confused with the `--usage-file` option that is used to define resource [usage](/docs/usage_based_resources) estimates.

## Advantages

Using a configuration file has many advantages over CLI flags:
- Not having to remember/specify flags for each run
- Specify multiple terraform directories, JSON/plan files and combine them into a single output
- Specify multiple output formats per run, for example output the table format to the screen and save an HTML report

In the future, we plan to extend the config file so you can select the output columns, level of detail, and breakdown levels (module, project). We might also enable you to specify wildcards to process all projects under a specific directory.

## Supported parameters

TODO:
- path
- usage_file
- terraform_binary
- terraform_plan_flags
- terraform_workspace
- terraform_use_state
- terraform_cloud_host
- terraform_cloud_token

This [infracost-example.yml](https://github.com/infracost/infracost/blob/master/infracost-example.yml) contains the list of all of the available parameters and their descriptions.

## Precedence
Configuration values are chosen in this order:
1. CLI flags (run `infracost --help` to see them)
2. [Environment variables](/docs/environment_variables)
3. Configuration file

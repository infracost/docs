---
slug: troubleshooting
title: CI/CD troubleshooting
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes steps you can follow to troubleshoot [CI/CD integrations](/docs/integrations/cicd/#cicd-integrations). [Contact us](/docs/support/) if you're having problems with [source control integrations](/docs/integrations/cicd/#source-control-integrations-recommended).

## 1. Enable additional logging

If the Infracost CLI fails, re-run it with `--log-level=debug` or the `INFRACOST_LOG_LEVEL=debug` environment variable in case that provides helpful details.

If the Terraform CLI fails, check their [debugging page](https://www.terraform.io/internals/debugging) for help. Likewise, if the Terragrunt CLI fails, check their [debugging page](https://terragrunt.gruntwork.io/docs/features/debugging/) for help.

## 2. Generating plan JSON files

By default, the Infracost CLI parses Terraform HCL code to estimate costs. If that does not work for your use-case, Infracost can also parse the Terraform/Terragrunt [plan JSON file](/docs/features/cli_commands/#option-2-terraform-plan-json).

If you have multiple Terraform plan JSON files, you can
1. run [`infracost breakdown`](/docs/features/cli_commands/#breakdown) with `--path plan-1.json --format json --out-file infracost-1.json` to generate an Infracost JSON file for each.
2. run [`infracost output`](/docs/features/cli_commands/#combined-output-formats) with `--path "infracost-*.json" --format diff` (glob patterns need quotes) to combine the Infracost JSON files into one output format then use that file with `infracost comment`. The `infracost output --help` command shows the other options.

## 3. Check supported versions

Check the Terraform version matches what you expect. Infracost works with Terraform v0.12 and above.
Use `ls -lah` in the CI build to check for any `.terraform*` files/folders that might be confusing Terraform running in CI vs previous runs that were used to create them. Removing those files might help.

## 4. Posting comments

If you're having issues posting pull request comments, please review the troubleshooting section for your version control system:

- [GitHub](https://github.com/infracost/actions/#permissions-issue)
- [GitLab](https://gitlab.com/infracost/infracost-gitlab-ci#troubleshooting)
- [Azure Repos](https://github.com/infracost/infracost-azure-devops#troubleshooting)
- [Bitbucket](https://bitbucket.org/infracost/infracost-bitbucket-pipeline) > see the Troubleshooting section

## 5. Infracost Cloud dashboard

If your pull request comments are being posted but they are **not showing in the dashboard**, ensure that the:
1. In Infracost Cloud's Org settings page, the cost estimate dashboard is enabled.
2. Infracost CLI version (`infracost --version`) being used is latest patch version of v0.10.
3. [Required environment variables](/docs/features/environment_variables/#environment-variables-to-set-metadata) are set before the `infracost breakdown` and `infracost diff` commands are run. You can verify this by running `cat infracost.json | jq .metadata` or `infracost breakdown --path /code --format json | jq .metadata` and checking the Infracost JSON block shows your pull request metadata.
4. Either [`infracost comment`](/docs/features/cli_commands/#comment-on-pull-requests) or [`infracost upload`](/docs/features/cli_commands/#upload-runs) is used in your CI/CD integration. If Infracost Cloud is enabled (step 1 above), these commands send the Infracost JSON data to your organization in Infracost Cloud.

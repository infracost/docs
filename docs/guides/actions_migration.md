---
slug: actions_migration
title: GitHub Actions migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
This is the migration guide for the upcoming v0.10 - which has not been released yet.
A [beta](https://github.com/infracost/infracost/releases/tag/v0.10.0-beta.1) is available if you'd like to try an early version.
:::

Follow this page to migrate your [Infracost GitHub actions](https://github.com/infracost/actions) from v1 to v2. If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## What's new?

The v1 actions used Infracost v0.9.x of the Infracost CLI, whereas the v2 actions use Infracost v0.10.x. With this new release, we'll support two ways to run Infracost with Terraform via `--path`:
1. **Parsing HCL code (recommended)**: this is the default and recommend option as it has [4 key benefits](/docs/guides/v0.10_migration/#1-faster-cli). This page describes how you can migrate to this option.
<!-- TODO: update the example link -->
2. **Parsing plan JSON file**: this will continue to work as before. There are [examples here](https://github.com/infracost/actions/tree/make-consistent-with-gitlab/examples#plan-json-examples) of generating Terraform plan JSON files in GitHub Actions and passing them to Infracost.

## Actions v2 migration guide

Changing your workflow to work with the parse HCL option requires the following changes:

1. Remove the Terraform and Terragrunt dependencies:
    - Delete any `hashicorp/setup-terraform` or `autero1/action-terragrunt` steps as Infracost now parses the HCL code directly, so it does not depend on these.
    - Delete any step that runs `terraform` or `terragrunt`, e.g. "Terraform init", "Terraform plan" and "terraform show" are no longer needed.
    - If you are not using the [fetch usage from CloudWatch](/docs/features/usage_based_resources/#fetch-from-cloudwatch) feature, delete any steps that set cloud credentials.

2. Bump the version of the `infracost/actions/setup` action from `v1` to `v2`:

   ```yaml
         - name: Setup Infracost
           uses: infracost/actions/setup@v2
           with:
             api-key: ${{ secrets.INFRACOST_API_KEY }}
   ```

3. After the "Setup Infracost" step, add the following two steps for generating a cost estimate baseline from the main/master branch.

   ```yaml
   - name: Checkout base branch
     uses: actions/checkout@v2
     with:
       ref: '${{ github.event.pull_request.base.ref }}'

   - name: Generate Infracost cost estimate baseline
     run: |
       infracost breakdown --path=/code \
                           --format=json \
                           --out-file=/tmp/infracost-base.json
   ```

   :::note
   You should replace any `--terraform-plan-flags` flags with either `--terraform-var` to add variables or `--terraform-var-file` to point to var files. These work similarly to Terraform's `-var` and `-var-file` flags and can be repeated.
   :::

   :::note
   If you have variables stored on Terraform Cloud/Enterprise Infracost will pull these in automatically if you add the following environment variables to your job:

   ```yaml
   jobs:
     infracost:
       # ...
       env:
         INFRACOST_TERRAFORM_CLOUD_TOKEN: ${{ secrets.TFC_TOKEN }}
         # Change this if you're using Terraform Enterprise
         INFRACOST_TERRAFORM_CLOUD_HOST: app.terraform.io
   ```
   :::

   <!-- TODO: update the example link -->
   :::note
   If you have a Terraform mono-repo and you want to pass separate variables to each Terraform project you can create a [config file](/docs/features/config_file) and pass that with the `--config-file` flag as per [this example](https://github.com/infracost/actions/tree/make-consistent-with-gitlab/examples/multi-project-config-file#readme)
   :::

4. After the above, add the following two steps for comparing against the Infracost cost estimate baseline. If you added any required variable or config file flags in step 3, also add them to the `infracost diff` command below.

   ```yml
   - name: Checkout PR branch
     uses: actions/checkout@v2

   - name: Run Infracost
     run: |
       infracost diff --path=/code \
                      --format=json \
                      --compare-to=/tmp/infracost-base.json \
                      --out-file=/tmp/infracost.json

    # Post pull request comment in the same was as before by running:
    # infracost comment github --path=/tmp/infracost.json ...
   ```

## Complete examples

<!-- TODO: update the example link -->
We've updated [our examples](https://github.com/infracost/actions/tree/make-consistent-with-gitlab/examples) to use the new parsing HCL option and added examples for generating a Terraform plan JSON file if required. You can find one that is the closest to your use-case and adapt as required.

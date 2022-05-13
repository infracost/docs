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

The v1 actions used Infracost v0.9.x of the Infracost CLI, whereas v2 actions uses [Infracost v0.10.x](/docs/guides/v0.10_migration). With this new release there's two ways Infracost can generate cost estimates:
1. Parsing your Terraform HCL code directly (default and recommended)
2. Parsing a provided Terraform plan JSON file

<!-- TODO: update the example link -->
If the new HCL parsing doesn't work for your use-case, there's [examples here](https://github.com/infracost/actions/tree/make-consistent-with-gitlab/examples#plan-json-examples) of how to generate Terraform plan JSON files in GitHub Actions and pass them to Infracost.

## Actions v2 migration guide

Changing your workflow to work with the parse HCL option requires the following changes:

1. Bump the version of the `infracost/actions/setup` action to `v2`:

   ```yaml
      - name: Setup Infracost
        uses: infracost/actions/setup@v2
        with:
          api-key: ${{ secrets.INFRACOST_API_KEY }}
   ```

2. Remove the Terraform and Terragrunt dependencies. You can remove any `hashicorp/setup-terraform` or `autero1/action-terragrunt` actions as Infracost now parses the HCL code directly so does not depend on these.

3. Add a step for generating Infracost cost estimate baseline from the base branch of the pull request (e.g. main/master). This is needed so Infracost has the current state to compare against.

    ```yaml
      - name: Checkout base branch
        uses: actions/checkout@v2
        with:
          ref: '${{ github.event.pull_request.base.ref }}'

      - name: Generate Infracost cost estimate baseline
        run: |
          infracost breakdown --path path/to/your/terraform \
                              --format json \
                              --out-file /tmp/infracost-base.json
    ```

    :::note
    You should replace any `--terraform-plan-flags` flags with either `--terraform-var` to add variables or `--terraform-var-file` to point to var files. These work similarly to Terraform's `-var` and `-var-file` flags and can be repeated.
    :::

    :::note
    If you have variables stored on Terraform Cloud/Enterprise Infracost will pull these in automatically if you add the following environment variables to your job:

    ```yaml
    jobs:
      infracost:
      ...
        env:
          INFRACOST_TERRAFORM_CLOUD_TOKEN: ${{ secrets.TFC_TOKEN }}
          INFRACOST_TERRAFORM_CLOUD_HOST: app.terraform.io # Change this if you're using Terraform Enterprise
    ```
    :::

    <!-- TODO: update the example link -->
    :::note
    If you have a Terraform mono-repo and you want to pass separate variables to each Terraform project you can create a [config file](/docs/features/config_file) and pass that with the `--config-file` flag as per [this example](https://github.com/infracost/actions/tree/make-consistent-with-gitlab/examples/multi-project-config-file#readme)
    :::


4. Add steps for comparing against the Infracost cost estimate baseline. First make sure you check out the pull request branch, and also add any required variable or config file flags as per step 3 to the `infracost diff` command as well.

    ```yml
    - name: Checkout PR branch
      uses: actions/checkout@v2

    - name: Run Infracost
      run: |
        infracost diff --path path/to/your/terraform \
                       --format json \
                       --compare-to /tmp/infracost-base.json \ # point this to the JSON output we generated in step 2
                       --out-file /tmp/infracost.json
    
    # Post pull request comment in the same was as before by running:
    # infracost comment github --path /tmp/infracost.json ...
    ```

## Examples

<!-- TODO: update the example link -->
We've updated [our examples](https://github.com/infracost/actions/tree/make-consistent-with-gitlab/examples) to use the new parsing HCL option and added examples for generating a Terraform plan JSON file if required. You can find one that is the closest to your use-case and adapt as required.

---
slug: azure_devops_migration
title: Azure DevOps migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
This is the migration guide for the upcoming v0.10 - which has not been released yet.
A [beta](https://github.com/infracost/infracost/releases/tag/v0.10.0-beta.1) is available if you'd like to try an early version.
:::

Follow this page to migrate your [Infracost Azure Pipelines integration](https://github.com/infracost/infracost-azure-devops) to use Infracost v0.10.

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## What's new?

The InfracostSetup@0 task used Infracost v0.9.x of the Infracost CLI, whereas the InfracostSetup@1 task use Infracost v0.10.x. With this new release, we'll support two ways to run Infracost with Terraform via `--path`:
1. **Parsing HCL code (recommended)**: this is the default and recommended option as it has [4 key benefits](/docs/guides/v0.10_migration/#1-faster-cli). This page describes how you can migrate to this option.
    ```shell
    # Terraform variables can be set using --terraform-var-file or --terraform-var
    infracost breakdown --path /code
    ```

<!-- TODO: update the example link -->
2. **Parsing plan JSON file**: this will continue to work as before. There are [examples here](https://github.com/infracost/infracost-azure-devops/tree/v0.10-examples/examples#plan-json-examples) of generating Terraform plan JSON files in Azure Pipelines and passing them to Infracost.
    ```shell
    cd /code
    terraform init
    terraform plan -out tfplan.binary
    terraform show -json tfplan.binary > plan.json

    infracost breakdown --path plan.json
    ```

## Infracost Azure Pipelines migration guide

Changing your workflow to work with the parse HCL option requires the following changes:

1. Remove the Terraform and Terragrunt dependencies:
    - Delete any `TerraformInstaller` steps as Infracost now parses the HCL code directly, so it does not depend on these.
    - Delete any stages and jobs that runs `terraform` or `terragrunt`, e.g. "terraform init", "terraform plan" and "terraform show" are no longer needed.
    - If you are not using the [fetch usage from CloudWatch](/docs/features/usage_based_resources/#fetch-from-cloudwatch) feature, delete any steps that set cloud credentials.

2. Bump the version of the InfracostSetup task from `0` to `1`:

    ```yaml
      - task: InfracostSetup@1
          displayName: Setup Infracost
          inputs:
            apiKey: $(infracostApiKey)
    ```

3. After the "Setup Infracost" step, add the following two steps for generating a cost estimate baseline from the main/master branch.

    ```yaml
      - bash: |
          branch=$(System.PullRequest.TargetBranch)
          branch=${branch#refs/heads/}
          git clone $(Build.Repository.Uri) --branch=${branch} --single-branch /tmp/base
        displayName: Checkout base branch

      - bash: |
          infracost breakdown --path=$(TF_ROOT) \
                              --format=json \
                              --out-file=/tmp/infracost-base.json
        displayName: Generate Infracost cost estimate baseline
    ```

    :::note
    You should replace any `--terraform-plan-flags` flags with either `--terraform-var` to add variables or `--terraform-var-file` to point to var files. These work similarly to Terraform's `-var` and `-var-file` flags and can be repeated.
    :::

    :::note
    If you have variables stored on Terraform Cloud/Enterprise Infracost will pull these in automatically if you add the following environment variables to your job:

    ```yaml
    jobs:
      - job: infracost
        # ...
        env:
          INFRACOST_TERRAFORM_CLOUD_TOKEN: $(tfcToken)
          # Change this if you're using Terraform Enterprise
          INFRACOST_TERRAFORM_CLOUD_HOST: app.terraform.io
    ```
    :::

    <!-- TODO: update the example link -->
    :::note
    If you have a Terraform mono-repo and you want to pass separate variables to each Terraform project you can create a [config file](/docs/features/config_file) and pass that with the `--config-file` flag as per [this example](https://github.com/infracost/infracost-azure-devops/tree/v0.10-examples/examples/multi-project-config-file#readme)
    :::

4. After the above, add the following two steps for comparing against the Infracost cost estimate baseline. If you added any required variable or config file flags in step 3, also add them to the `infracost diff` command below.

    ```yml
      - bash: |
          infracost diff --path=$(TF_ROOT) \
                         --format=json \
                         --compare-to=/tmp/infracost-base.json \
                         --out-file=/tmp/infracost.json
        displayName: Generate Infracost diff

      # Posts a comment in the same way as before
      - bash: |
          infracost comment github --path=/tmp/infracost.json ...
        displayName: Post Infracost comment
    ```

<!-- TODO: update the example link -->
5. See [our full examples](https://github.com/infracost/infracost-azure-devops/tree/v0.10-examples/examples) that use the new parsing HCL option. You can find one that is the closest to your use-case and adapt as required.

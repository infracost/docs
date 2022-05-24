---
slug: gitlab_ci_migration
title: GitLab CI migration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow this page to migrate your [Infracost GitLab CI integration](https://gitlab.com/infracost/infracost-gitlab-ci) to use Infracost v0.10.

If you encounter any issues while migrating, please join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄

## What's new?

With the v0.10 release, we'll support two ways to run Infracost with Terraform via `--path`:
1. **Parsing HCL code (recommended)**: this is the default and recommended option as it has [5 key benefits](/docs/guides/v0.10_migration/#1-faster-cli). This page describes how you can migrate to this option.
    ```shell
    # Terraform variables can be set using --terraform-var-file or --terraform-var
    infracost breakdown --path /code
    ```

2. **Parsing plan JSON file**: this will continue to work as before. There are [examples here](https://gitlab.com/infracost/infracost-gitlab-ci/-/tree/master/examples#plan-json-exampless) of generating Terraform plan JSON files in GitLab CI and passing them to Infracost.
    ```shell
    cd /code
    terraform init
    terraform plan -out tfplan.binary
    terraform show -json tfplan.binary > plan.json

    infracost breakdown --path plan.json
    ```

## Infracost GitLab CI migration guide

Changing your workflow to work with the parse HCL option requires the following changes:

1. Remove the Terraform and Terragrunt dependencies:
    - Delete any stages and jobs that runs `terraform` or `terragrunt`, e.g. "terraform init", "terraform plan" and "terraform show" are no longer needed.
    - If you are not using the [fetch usage from CloudWatch](/docs/features/usage_based_resources/#fetch-from-cloudwatch) feature, delete any steps that set cloud credentials.

2. Bump the version of the Infracost Docker image from `infracost/infracost:ci-0.9` to `infracost/infracost:ci-0.10`:

    ```yaml
    infracost:
      stage: infracost
      image:
        name: infracost/infracost:ci-0.10
        entrypoint: [""]
    ```

3. Update the `infracost` job's script to add the following two steps for generating a cost estimate baseline from the main/master branch.

    ```yaml
    - git clone $CI_REPOSITORY_URL --branch=$CI_MERGE_REQUEST_TARGET_BRANCH_NAME --single-branch /tmp/base

    - |
      infracost breakdown --path=/tmp/base/${TF_ROOT} \
                          --format=json \
                          --out-file=infracost-base.json
    ```

    :::note
    You should replace any `--terraform-plan-flags` flags with either `--terraform-var` to add variables or `--terraform-var-file` to point to var files. These work similarly to Terraform's `-var` and `-var-file` flags and can be repeated.
    :::

    :::note
    If you have variables stored on Terraform Cloud/Enterprise Infracost will pull these in automatically if you add the following environment variables to your job:

    ```yaml
    infracost:
      # ...
      variables:
        INFRACOST_TERRAFORM_CLOUD_TOKEN: $INFRACOST_TERRAFORM_CLOUD_TOKEN
        # Change this if you're using Terraform Enterprise
        INFRACOST_TERRAFORM_CLOUD_HOST: app.terraform.io
    ```
    :::

    :::note
    If you have a Terraform mono-repo and you want to pass separate variables to each Terraform project you can create a [config file](/docs/features/config_file) and pass that with the `--config-file` flag as per [this example](https://gitlab.com/infracost/infracost-gitlab-ci/-/tree/master/examples/multi-project-config-file)
    :::

4. After the above, add the following two steps for comparing against the Infracost cost estimate baseline. If you added any required variable or config file flags in step 3, also add them to the `infracost diff` command below.

    ```yml
      - |
        infracost diff --path=${TF_ROOT} \
                      --compare-to=infracost-base.json \
                      --format=json \
                      --out-file=infracost.json

      # Posts a comment in the same way as before
      - |
        infracost comment gitlab --path=infracost.json ...
    ```

5. See [our full examples](https://gitlab.com/infracost/infracost-gitlab-ci/-/tree/master/examples) that use the new parsing HCL option. You can find one that is the closest to your use-case and adapt as required.

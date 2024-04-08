---
slug: terraform_cloud_enterprise
title: Terraform Cloud/Enterprise
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost is an [official HashiCorp partner](https://www.hashicorp.com/partners/tech/infracost). We work together to ensure that Infracost can be used alongside Terraform Cloud/Enterprise and integrated into your workflow.

## Option 1: CI/CD integrations

Our Source control and CI/CD integrations run the Infracost CLI and parse Terraform HCL code directly. These options can fetch variables and modules hosted on Terraform Cloud. We recommend using these options as they enable you to post pull request comments and use **all** [Infracost Cloud](/docs/infracost_cloud/get_started/) features. See our [CI/CD integrations](/docs/integrations/cicd/) for details.

## Option 2: Terraform Run Tasks

[Terraform Run Tasks](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/settings/run-tasks) can also be used to integrate Infracost with Terraform Cloud directly. In this case, Infracost uses the Terraform plan JSON, which Terraform Cloud generates.

<img src={useBaseUrl("img/screenshots/tfc_integration.png")} alt="Terraform Cloud Run Task integration" width="100%"/>

This integration offers several features to enhance your Terraform Cloud experience:
1. **Cost Estimates and policies**: Easily view cost estimates, tagging, and FinOps policy issues during Terraform Cloud runs. You can access detailed information in Infracost Cloud with just a click.
2. **Policy enforcement**: Automatically block runs that fail tagging and FinOps policies that you've designated as blocking, ensuring compliance with your policies.
3. **Guardrails for pull requests**: guardrails work when executing Run Tasks from pull requests. You can choose to block runs if needed when setting up guardrails. Note that manual runs from Terraform Cloud won't trigger guardrails since they're not associated with pull requests. If you unblock guardrails, remember to click "Retry run" in Terraform Cloud to reflect the updated status.
4. **Usage costs**: simplify the estimation of usage-based resources like object storage buckets by configuring [usage defaults](/docs/features/usage_based_resources/) in Infracost Cloud.

Run Tasks do not run on a repo's main/master branch, therefore this integration does not support seeing costs or tagging/FinOps policy issues in the Infracost Cloud > Visibility > Repos page. Hence the Infracost Cloud dashboard that shows how well you're following FinOps best practices also does not work.

### 1. Generate Infracost Endpoint

Sign up or log in to [Infracost Cloud](https://dashboard.infracost.io) and go to Org Settings > Integrations to enable the Terraform Cloud integration. This creates an Infracost endpoint URL and HMAC key that you'll use in the next step.

### 2. Firewall configuration for TFE

This step is only needed by Terraform Enterprise (TFE) users. You need to allow incoming traffic from `3.133.40.66` to your TFE instance port 443 (or whatever port you use); this is the IP address used by Infracost Cloud services to call your Run Task integration.

If you have restricted out-going traffic from your TFE instance, you need to allow traffic to be sent to [our Outbound domains/IPs](/docs/faq/#how-can-i-whitelist-infracost-ip-addresses).

### 3. Configure a Run Task

Follow the [instructions for configuring a Run Task](https://www.terraform.io/docs/cloud/workspaces/run-tasks.html#configuring-a-run-task) in Terraform Cloud. You should:
- Enable the Run Task as a **post-plan stage** in your workspaces (only this "stage" option is supported by Infracost).
- Set the Run Task to the **Mandatory** enforcement level so you can configure which Tagging or FinOps policies should block runs in Infracost Cloud.

<details><summary>Example Terraform code to create a Run Task for your TFE organization</summary>

  ```
  # You can create Run Tasks for your TFE organization using the Terraform console
  # or inside your Terraform repository:

  resource "tfe_organization_run_task" "example" {
    # Name of your TFE organization
    organization = "org-name"
    # Endpoint URL from Infracost
    url          = "https://dashboard.api.infracost.io/hooks/ABCDE"
    # Name of your Run Task
    name         = "Infracost"
    enabled      = true
    # HMAC Key from Infracost
    hmac_key     = "SUPER_SECRET_KEY"
    description  = "Infracost cost estimation"
  }

  # Now that you have a Run task for your entire Organization,
  # you need to set up individual Run Tasks for each workspace:

  resource "tfe_workspace_run_task" "example" {
    # ID of your workspace
    workspace_id      = resource.tfe_workspace.example.id
    # ID of the organization run task previously created.
    task_id           = resource.tfe_organization_run_task.example.id
    enforcement_level = "mandatory"
  }
  ```
</details>

### 4. Results

After you've setup the integration, and enabled it on one or more of your workspaces, your runs will show the Infracost Run Task output and a link to the details.

## Running Infracost on local dev machines

If you are using Terraform Cloud/Enterprise, or Terraform workspaces, and you'd like to run Infracost locally on your dev machine, please follow the below instructions.

### With Terraform Cloud/Enterprise

When Terraform Cloud/Enterprise's [remote execution mode](https://www.terraform.io/cloud-docs/workspaces/settings#execution-mode) is used, Infracost will use the token in the Terraform CLI config file to automatically retrieve the variables. If that does not satisfy your use-case, you can **either**:
1. Set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html). `INFRACOST_TERRAFORM_CLOUD_HOST` can also be set for Terraform Enterprise users (e.g. to avoid using app.terraform.io). These environment variables can also be set in the [config file](/docs/features/config_file).
2. Set the [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file.

### With Terraform workspaces

Terraform Cloud/Enterprise users who use multiple Terraform workspaces, can use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown or diff output.

If you'd like to select one workspace, you can do so by **either**:
1. using the `--terraform-workspace` flag.
2. setting the `INFRACOST_TERRAFORM_WORKSPACE` environment variable (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally).

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

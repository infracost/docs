---
slug: terraform_cloud_enterprise
title: Terraform Cloud/Enterprise
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost is an [official HashiCorp partner](https://www.hashicorp.com/partners/tech/infracost). We work together to ensure that Infracost can be used alongside Terraform Cloud/Enterprise and integrated into your workflow.

[<img src={useBaseUrl("img/screenshots/hashicorp-infracost-partner-badge.png")} alt="Official Infracost HashiCorp partner badge" width="100px" />](https://www.hashicorp.com/partners/tech/infracost)

## Integration options

### Option 1: Source control systems

Our CI/CD integrations run the Infracost CLI and parse Terraform HCL code directly. We recommend using this option as it enables you to post pull request comments and use **all** Infracost features. See our [CI/CD integrations](/docs/integrations/cicd/) for details.

### Option 2: Terraform Run Tasks

This option uses the Terraform plan JSON that Terraform Cloud/Enterprise generates. The following features are not currently supported by this option: posting pull request comments, multiple currencies, modelling usage-based resources via the usage-file. Please [contact us](mailto:hello@infracost.io) if you need these features.

<a href="https://www.infracost.io/blog/terraform-runtasks-what-why-how/" target="_self" rel="">Terraform Run Tasks</a> can be used to integrate Infracost into Terraform Cloud/Enterprise directly. It sits between the plan and apply stage and shows a cost estimate for the changes that are about to be deployed. There is also a shareable details link that will open a pre-authenticated link with a detailed breakdown of costs per resource.

#### 1. Generate Infracost Endpoint
Sign up or log in to [Infracost Cloud](https://dashboard.infracost.io/tfc-sign-up) and go to the Integrations page to enable the Terraform Cloud integration. This creates an Infracost endpoint URL and HMAC key that you'll use in the next step. You can also create an organization in Infracost to match the organization name you have in Terraform Cloud.

#### 2. Firewall configuration for TFE

This step is only needed by Terraform Enterprise (TFE) users. You need to allow incoming traffic from `3.133.40.66` to your TFE instance port 443 (or whatever port you use); this is the IP address used by Infracost Cloud services to call your Run Task integration.

If you have restricted out-going traffic from your TFE instance, you need to allow traffic to be sent to `dashboard.api.infracost.io:443` too. If you can only do that by IP address (and not domains), you should whitelist `13.58.92.216`, `3.142.138.46` and `13.58.157.166` but we recommend you whitelist the domain as these IP addresses are likely to change.

#### 3. Configure a Run Task
Follow the [instructions for configuring a Run Task](https://www.terraform.io/docs/cloud/workspaces/run-tasks.html#configuring-a-run-task) in Terraform Cloud. There are two steps you need to do: setup the integration, and enable it as a **post-plan stage** in your workspaces.

:::note
Currently, only the post-plan stage is supported when you configure Run Tasks in Terraform Cloud.
:::

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
    enforcement_level = "advisory"
  }
  ```
</details>

#### 4. Results

After you've setup the integration, and enabled it on one or more of your workspaces, your runs will show the Infracost Run Task output and a link to the details.

Infracost is a [verified](https://www.hashicorp.com/partners/tech/infracost) Terraform Cloud integration. Terraform Cloud only sends the plan JSON file to Infracost during cost estimation, no other secrets/logs are sent, and once the cost estimate is generated, the temporary plan file is deleted from our servers.

| Terraform Cloud dashboard | Details link |
|--------------|-----------|
<a href="https://infracost.io/docs/img/screenshots/tfc_integration.png"><img src={useBaseUrl("img/screenshots/tfc_integration.png")} alt="Infracost running as a Run Task" width="550px" /></a> | <a href="https://infracost.io/docs/img/screenshots/infracost_dashboard.png"><img src={useBaseUrl("img/screenshots/infracost_dashboard.png")} alt="Infracost details link" width="550px" /></a>

## Running Infracost on local dev machines

If you are using Terraform Cloud/Enterprise, or Terraform workspaces, and you'd like to run Infracost locally on your dev machine, please follow the below instructions.

#### With Terraform Cloud/Enterprise

When Terraform Cloud/Enterprise's [remote execution mode](https://www.terraform.io/cloud-docs/workspaces/settings#execution-mode) is used, Infracost will use the token in the Terraform CLI config file to automatically retrieve the variables. If that does not satisfy your use-case, you can **either**:
1. Set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html). `INFRACOST_TERRAFORM_CLOUD_HOST` can also be set for Terraform Enterprise users (e.g. to avoid using app.terraform.io). These environment variables can also be set in the [config file](/docs/features/config_file).
2. Set the [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file.

#### With Terraform workspaces

Terraform Cloud/Enterprise users who use multiple Terraform workspaces, can use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown or diff output.

If you'd like to select one workspace, you can do so by **either**:
1. using the `--terraform-workspace` flag.
2. setting the `INFRACOST_TERRAFORM_WORKSPACE` environment variable (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally).

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

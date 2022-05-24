---
slug: terraform_cloud_enterprise
title: Terraform Cloud/Enterprise
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost is an official HashiCorp partner. We work together to ensure that Infracost can be used alongside Terraform Cloud and integrated into your workflow.

If you're a Terraform Cloud user, the best way to integrate Infracost and Terraform is using Terraform Run Tasks. Run Tasks are not yet available in Terraform Enterprise, so you can use the [details below](#terraform-enterprise-users) to integrate using our other [CI/CD integrations](/docs/integrations/cicd/).

[<img src={useBaseUrl("img/screenshots/hashicorp-infracost-partner-badge.png")} alt="Official Infracost HashiCorp partner badge" width="100px" />](https://www.hashicorp.com/partners/tech/infracost)

## Terraform Cloud Run Tasks

[Terraform Run Tasks](https://www.infracost.io/blog/terraform-runtasks-what-why-how/) can be used to integrate Infracost into the Terraform Cloud pipeline directly. It sits between the plan and apply stage and shows the difference between the expected monthly cost before and after the change that is about to be applied. There is also a shareable Details link which will open a pre-authenticated link with a detailed breakdown of costs per resource.

#### 1. Generate HMAC key
[Generate](https://dashboard.infracost.io/tfc-sign-up) a unique Infracost hook endpoint URL and HMAC key. These will be used in the next step.

#### 2. Configure a Run Task
Follow the [instructions for configuring a Run Task](https://www.terraform.io/docs/cloud/workspaces/run-tasks.html#configuring-a-run-task) in Terraform Cloud. There are two steps you need to do: setup the integration, and enable it in your workspaces.

#### 3. Results
After you've setup the integration, and enabled it on one or more of your workspaces, your runs will show the Infracost Run Task output and a link to the details. You can see an example [here](https://dashboard.infracost.io/results/285db4b2-1467-41c0-a162-382ae7f87e89?token=932c8505d6cd3dd7c3cba4d45188eeec9988976ae0d366ccc5ae813ed1b4fc395dfba94d14d54babef943c23042787f66076f04a29a37dced8d0ae963e5cefd5).

Note that as this integration is directly within Terraform Cloud, pull request comments are not posted in your source control system. Our Run Tasks integration also does not yet support multiple currencies and modelling usage-based resources via the usage-file. Please create a GitHub issue or contact us if you're interested in these features. Note that these features can be enabled and used via our [CI/CD integrations](/docs/integrations/cicd/).

Infracost is a [verified](https://www.hashicorp.com/partners/tech/infracost) Terraform Cloud integration. Terraform Cloud only sends the plan JSON file to Infracost during cost estimation, no other secrets/logs are sent, and once the cost estimate is generated, the temporary plan file is deleted from our servers.

| Terraform Cloud dashboard | Details link |
|--------------|-----------|
[<img src={useBaseUrl("img/screenshots/tfc_integration.png")} alt="Infracost running as a Run Task" width="550px" />](/img/screenshots/tfc_integration.png) | [<img src={useBaseUrl("img/screenshots/infracost_dashboard.png")} alt="Infracost details link" width="550px" />](/img/screenshots/infracost_dashboard.png)

## Terraform Enterprise

Run Tasks are not yet available in Terraform Enterprise, so when running Infracost locally or in CI/CD systems, you should set **both** of the following environment variables. This enables the Infracost CLI to fetch the Terraform plan JSON from the Terraform Enterprise APIs. These environment variables can also be set in the [config file](/docs/features/config_file).
1. `INFRACOST_TERRAFORM_CLOUD_TOKEN` to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
2. `INFRACOST_TERRAFORM_CLOUD_HOST` to your backend host, this overrides the default `app.terraform.io` value.

## Running Infracost on local dev machines
If you are using Terraform Cloud, or Terraform workspaces, and you'd like to run Infracost locally on your dev machine, please follow the below instructions.

#### With Terraform Cloud

When Terraform Cloud/Enterprise's [remote execution mode](https://www.terraform.io/cloud-docs/workspaces/settings#execution-mode) is used, Infracost will use the token in the Terraform CLI config file to automatically retrieve the variables. If that does not satisfy your use-case, you can **either**:
1. Set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html). `INFRACOST_TERRAFORM_CLOUD_HOST` can also be set for Terraform Enterprise users (e.g. to avoid using app.terraform.io). These environment variables can also be set in the [config file](/docs/features/config_file).
2. Set the [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file.

#### With Terraform workspaces

Terraform Cloud and Enterprise users who use multiple Terraform workspaces, can use an Infracost [config file](/docs/features/config_file) to define them; their results will be combined into the same breakdown or diff output.

If you'd like to select one workspace, you can do so by **either**:
1. using the `--terraform-workspace` flag.
2. setting the `INFRACOST_TERRAFORM_WORKSPACE` environment variable (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally).

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

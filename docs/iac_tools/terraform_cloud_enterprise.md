---
slug: terraform_cloud_enterprise
title: Terraform Cloud/Enterprise
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost is a HashiCorp partner and we work together to ensure that Infracost can be used alongside Terraform Cloud and integrated into your workflow.

If you're a Terraform Cloud user, we recommend starting with Run Tasks. Run Tasks are currently not available in Terraform Enterprise, thus you can use the details below to integrate using our other CI/CD integrations.

## Terraform Cloud Run Tasks

[Run Tasks](https://www.terraform.io/docs/cloud/workspaces/run-tasks.html) is a beta Terraform Cloud feature that can be used to integrate Infracost into the Terraform Cloud pipeline directly. This enables Infracost to work with Terraform Cloud natively, meaning you do not need to install/upgrade our CLI into your CI/CD systems. As shown in the following screenshot, Infracost adds a comment showing the cost diff in Terraform Cloud's dashboard and you can click on the Details link to see the cost breakdown or diff in the same way you would see it when you run the CLI yourself.

Please email [hello@infracost.io](mailto:hello@infracost.io) if you'd like to get access to the beta program.

To setup the integration:
1. [Generate](https://dashboard.infracost.io/tfc-sign-up) a unique Infracost hook endpoint URL and HMAC key. These will be used in the next step.
2. Follow the [instructions for configuring a Run Task](https://www.terraform.io/docs/cloud/workspaces/run-tasks.html#configuring-a-run-task) in Terraform Cloud. There are two steps you need to do: setup the integration, and enable it in your workspaces.
3. After you've setup the integration, and enabled it on one or more of your workspaces, your runs will show the Infracost Run Task output and a link to the details; see example [here](https://dashboard.infracost.io/results/285db4b2-1467-41c0-a162-382ae7f87e89?token=932c8505d6cd3dd7c3cba4d45188eeec9988976ae0d366ccc5ae813ed1b4fc395dfba94d14d54babef943c23042787f66076f04a29a37dced8d0ae963e5cefd5).

Notes: As this integration is directly within Terraform Cloud, three things are not supported yet: pull request comments are not created; multiple currencies are not supported; the usage-file is not supported. Please create a GitHub issue or contact us if you're interested in these features.

| Terraform Cloud dashboard | Details link |
|--------------|-----------|
<img src={useBaseUrl("img/screenshots/tfc_integration.png")} alt="Infracost running as a Run Task" width="550px" /> | <img src={useBaseUrl("img/screenshots/infracost_dashboard.png")} alt="Infracost details link" width="550px" />

## Terraform Cloud users

This section is only applicable for Terraform Cloud users.

Running Infracost locally requires no additional steps as your Terraform CLI config file is used to access the plan.

When running Infracost in CI/CD systems, you should **either**:
1. Set the `INFRACOST_TERRAFORM_CLOUD_TOKEN` environment variable to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html). This environment variable can also be set in the [config file](/docs/multi_project/config_file).
2. Set the Terraform environment variable [`TF_CLI_CONFIG_FILE`](https://www.terraform.io/docs/commands/environment-variables.html#tf_cli_config_file) to the absolute path of your Terraform CLI config file.

## Terraform Enterprise users

When running Infracost locally or in CI/CD systems, you should set **both** of the following environment variables. These environment variables can also be set in the [config file](/docs/multi_project/config_file).
1. `INFRACOST_TERRAFORM_CLOUD_TOKEN` to a [Team API Token or User API Token](https://www.terraform.io/docs/cloud/users-teams-organizations/api-tokens.html).
2. `INFRACOST_TERRAFORM_CLOUD_HOST` to your backend host, this overrides the default `app.terraform.io` value.

## Terraform workspaces

Terraform Cloud and Enterprise users who use multiple Terraform workspaces, can use an Infracost [config file](/docs/multi_project/config_file) to define them; their results will be combined into the same breakdown or diff output.

If you'd like to select one workspace, you can do so by **either**:
1. using the `--terraform-workspace` flag.
2. setting the `INFRACOST_TERRAFORM_WORKSPACE` environment variable (this sets the [`TF_WORKSPACE`](https://www.terraform.io/docs/cli/config/environment-variables.html#tf_workspace) internally).

Only set this for multi-workspace deployments, otherwise it might result in the Terraform error "workspaces not supported". If you see this error, try running `unset INFRACOST_TERRAFORM_WORKSPACE` and `unset TF_WORKSPACE`.

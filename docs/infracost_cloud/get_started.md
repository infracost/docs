---
slug: get_started
title: Get started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our SaaS product that builds on top of Infracost open source. It enables you to check for best practices such as using latest generation instance types or block storage, e.g. consider switching AWS gp2 volumes to gp3 as they are more performant and cheaper. Team leads, managers and FinOps practitioners can also setup tagging policies and guardrails to help guide the team. See our [demo video](https://www.youtube.com/watch?v=9f4kOy21au8) to learn more.

<img src={useBaseUrl("img/infracost-cloud/dashboard-chart.png")} alt="Team visibility across all changes" />

### 1. Sign up or log in

Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

### 2. Create new organization

Every Infracost user has a default organization for personal use. Create a new organization for your company using the organization dropdown at the top of the page.

<img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

### 3. Setup Infracost Cloud

Follow the onboarding wizard to setup Infracost Cloud. Infracost supports direct integration with GitHub and GitLab. We recommend these integrations as they are much simpler to setup, and faster to run.

:::note
If you do not use the GitHub App or GitLab App integrations, you need to implement [some extra steps](/docs/guides/source_control_benefits/) for Infracost Cloud features to work. If you run into any issues, check the [troubleshooting guide](/docs/troubleshooting/#6-infracost-cloud-dashboard) or join our [community Slack channel](https://www.infracost.io/community-chat), we'll help you very quickly 😄
:::

### 4. Send a pull request

In your code repo, create a new branch and add the following example Terraform code into your `main.tf` file (or equivalent). Commit and push the change, then use the branch to send a new pull request. Infracost should post a pull request comment showing the cost estimate as well as FinOps best practices that could be considered.

<details><summary>Example Terraform code</summary>

```hcl
provider "aws" {
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  access_key                  = "mock_access_key"
  secret_key                  = "mock_secret_key"
}

resource "aws_instance" "web_app" {
  ami           = "ami-674cbc1e"
  instance_type = "m3.xlarge"

  tags = {
    Environment = "production"
    Service = "web-app"
  }

  root_block_device {
    volume_size = 50
  }
}
```
</details>

In the above example, the Infracost pull request comment points out that:
1. The `root_block_device` defaults to AWS `gp2` since `volume_type` has not been specified. You should consider using `gp3` as it enables you to define performance independent of storage capacity, while providing up to 20% lower price per GB.
2. Also, the `m3` instance type is previous generation and should be upgraded to `m5` since that gives you a 27% saving for a more performant machine.

### 5. See cost estimate in Infracost Cloud

Go to [**Infracost Cloud**](https://dashboard.infracost.io) > **your organization** > **Visibility** > **Pull requests** to see all pull requests in a central place. You can also filter and sort them and check their details.

<img src={useBaseUrl("img/infracost-cloud/pull-requests-tab.png")} alt="Infracost Cloud shows pull request cost changes" />

### 6. Add your team members

Use the Members page to [invite](/docs/infracost_cloud/key_concepts/#team-management) your team members to join your organization.

We also recommend setting up [tagging policies](/docs/infracost_cloud/tagging_policies/) and [guardrails](/docs/infracost_cloud/guardrails/). You can also review how well you're following [FinOps best practices](/docs/infracost_cloud/finops_policies/).

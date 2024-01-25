---
slug: get_started
title: Get started
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud is our SaaS product that builds on top of Infracost open source. It enables you to check for best practices such as using latest generation instance types or block storage, e.g. consider switching AWS gp2 volumes to gp3 as they are more performant and cheaper. Team leads, managers and FinOps practitioners can also setup tagging policies and guardrails to help guide the team. See our [demo video](https://www.youtube.com/watch?v=BQeO137DDo8) to learn more.

<img src={useBaseUrl("img/infracost-cloud/dashboard-chart.png")} alt="Team visibility across all changes" />

### 1. Sign up or log in

Go to [Infracost Cloud](https://dashboard.infracost.io) to sign up or log in to start your free trial (no credit card is needed).

### 2. Create new organization

Every Infracost user has a default organization for personal use. From the Org Settings page you can rename this one, or create a new organization for your company using the organization dropdown at the top of the page.

<img src={useBaseUrl("img/infracost-cloud/create-orgs.png")} alt="Create new organization" />

### 3. Setup Infracost Cloud

Follow the onboarding wizard on the dashboard to setup Infracost Cloud. Infracost supports direct source control integration with [GitHub](/docs/integrations/github_app/) and [GitLab](/docs/integrations/gitlab_app/). We recommend these integrations as they are much simpler to setup, and faster to run. You can also use other [CI/CD integrations](/docs/integrations/cicd/).

### 4. Send a pull request

In your code repo, create a new branch. In the test branch, add a new file called "infracost_test.tf" at the repo root with the following example Terraform code. Commit and push the change, then use the branch to send a new pull request. Infracost should post a pull request comment showing the cost estimate as well as FinOps best practices that could be considered.

<details><summary>Example AWS Terraform code</summary>

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "my_web_app" {
  instance_type = "m3.xlarge"     # <<<<< Try changing this to m5.xlarge to compare the costs

  tags = {
    Environment = "production"
    Service = "web-app"
  }

  root_block_device {
    volume_size = 1000             # <<<<< Try adding volume_type="gp3" to compare costs
  }
}

resource "aws_lambda_function" "my_hello_world" {
  runtime = "nodejs12.x"
  memory_size = 512

  tags = {
    Environment = "Prod"
  }
}
```

In the above example, the Infracost pull request comment points out that:
1. The `root_block_device` defaults to AWS `gp2` since `volume_type` has not been specified. You should consider using `gp3` as it enables you to define performance independent of storage capacity, while providing up to 20% lower price per GB.
2. Also, the `m3` instance type is previous generation and should be upgraded to `m5` since that gives you a 27% saving for a more performant machine.

</details>

<details><summary>Example Azure Terraform code</summary>

```hcl
provider "azurerm" {
}

resource "azurerm_linux_virtual_machine" "my_linux_vm" {
  location = "eastus"

  size = "Standard_F16s" # <<<<< Try changing this to Standard_F16s_v2 to compare the costs

  tags = {
    Environment = "production"
    Service = "web-app"
  }

  os_disk {
    caching = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
}

resource "azurerm_app_service_plan" "my_app_service" {
  location = "eastus"

  sku {
    tier     = "PremiumV2"
    size     = "P1v2"
    capacity = 4 # <<<<< Try changing this to 8 to compare the costs
  }

  tags = {
    Environment = "Prod"
    Service = "web-app"
  }
}

resource "azurerm_function_app" "my_function" {
  location                   = "eastus"

  tags = {
    Environment = "Prod"
  }
}
```

In the above example, the Infracost pull request comment points out that:
1. The `Standard_F16s` instance type is previous generation and should be upgraded to `Standard_F16s_v2`, since that gives you a more performant machine at a lower cost.
2. The `PremiumV2` App Service plan should be upgraded to a v3 plan, such as `P0v3` (with `tier=PremiumV3`), since that gives you more performance and is eligible for savings plans and reserved instance pricing, opening opportunities for major savings.

</details>

<details><summary>Example Google Terraform code</summary>

```hcl
provider "google" {
 region      = "us-central1"
}

resource "google_compute_instance" "my_instance" {
  zone         = "us-central1-a"

  machine_type = "n1-standard-16" # <<<<< Try changing this to n1-standard-32 to compare the costs

  scheduling {
    preemptible = true
  }

  guest_accelerator {
    type = "nvidia-tesla-t4" # <<<<< Try changing this to nvidia-tesla-p4 to compare the costs
    count = 4
  }

  labels = {
    Environment = "production"
    Service = "web-app"
  }
}

resource "google_cloudfunctions_function" "my_function" {
  runtime = "nodejs10"
  available_memory_mb = 512

  labels = {
    Environment = "Prod"
  }
}
```

In the above example, the Infracost pull request comment points out that the `n1-standard-16` instance type is previous generation and should be upgraded to something like `n2-standard-16` as that gives you a more performance machine.

</details>

<img src={useBaseUrl("img/infracost-cloud/pull-request-comment.png")} alt="Pull request comment" />

### 5. See cost estimate in Infracost Cloud

Go to [**Infracost Cloud**](https://dashboard.infracost.io) > **your organization** > **Visibility** > **Pull requests** to see all pull requests in a central place. You can also filter and sort them and check their details.

<img src={useBaseUrl("img/infracost-cloud/pull-requests-tab.png")} alt="Infracost Cloud shows pull request cost changes" />

This page also has filters that you can use to only see certain pull requests. Note that the dashboard only includes merged pull requests as those are the ones that impact costs and governance.

### 6. Add your team members

From the Org Settings page, click on the Members page to [invite](/docs/infracost_cloud/key_concepts/#team-management) your team members to join your organization.

We also recommend setting up [tagging policies](/docs/infracost_cloud/tagging_policies/) and [guardrails](/docs/infracost_cloud/guardrails/). You can also review how well you're following [FinOps best practices](/docs/infracost_cloud/finops_policies/).
